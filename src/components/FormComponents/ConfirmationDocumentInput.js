import React, { useEffect, useState } from "react";
import { Form, ConfigProvider, DatePicker, Typography, Input, AutoComplete } from "antd";
import locale from "antd/locale/ru_RU";
import TextArea from "antd/es/input/TextArea";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import localePicker from "antd/es/date-picker/locale/ru_RU";
import axios from "axios";
import config from "../../config";
import moment from "moment";

const documentOptions = [
  { value: "Паспорт гражданина РФ", label: "Паспорт гражданина РФ" },
  { value: "Иной документ", label: "Иной документ" },
];
locale.DatePicker.lang = {
  ...locale.DatePicker.lang, shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  shortMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек',],
}

export default function ConfirmationDocument({ form, read, edit, value, name, }) {
  const [kodPodrazdelenia, setKodPodrazdelenia] = useState("");
  const [kemVidanOptions, setKemVidanOptions] = useState([]);
  Form.useWatch([name, 'typeDoc'], form)
  //console.log(value)
  if (form.getFieldValue[name, 'typeDoc'] === "Иной документ") {
    form.setFieldsValue({
      [name]: {
        serialPassport: null,
        numberPassport: null,
        kodPodrazdelenia: null,
        kemVidan: null,
        dateIssue: null,
      }
    })
  } else if (form.getFieldValue[name, 'typeDoc'] === "Паспорт гражданина РФ") {
    form.setFieldsValue({
      [name]: {
        typeOtherDoc: null,
        recvizityOthetDoc: null,
        kemVidanOthetDoc: null,
        dateIssueOtherDoc: null,
      }
    })
  }
  if (read && value?.[name]?.typeDoc === "Иной документ") {
    form.setFieldValue([name, 'typeDoc'], "Иной документ")
  }
  
  useEffect(() => {
    if(edit){
      setKodPodrazdelenia(value?.[name]?.kodPodrazdelenia)
    }
    if (kodPodrazdelenia.length === 7) {
      //console.log('Заполнено')
      axios.get(`${config.backServer}/api/cabinet/get-fms`, {
        params: { searchString: kodPodrazdelenia },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Предполагается, что токен есть в localStorage
        },
      }).then(response => {
        setKemVidanOptions(response.data.data.map(item => ({
          label: (
            <Typography.Text style={{ width: "100%", whiteSpace: "normal" }}>
              {item.value}
            </Typography.Text>
          ),
          value: item.value,
        })))
        //console.log(response.data)
      })
    }
  }, [kodPodrazdelenia])

  // Обрабатывает изменения в коде подразделения, форматируя его
  const handleKodPodrazdeleniaChange = (e) => {
    const { value } = e.target;
    const onlyNums = value.replace(/[^\d]/g, "");
    let formattedKod = "";

    if (onlyNums.length <= 3) {
      formattedKod = onlyNums;
    } else if (onlyNums.length > 3 && onlyNums.length <= 6) {
      formattedKod = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    }
    setKodPodrazdelenia(formattedKod);
  };

  return (
    <Form.List name={name}
      initialValue={{ typeDoc: "Паспорт гражданина РФ" }}
    >
      {() => (
        <>
          <SelectInput
            read={read}
            edit={edit}
            value={value?.[name]?.typeDoc}
            displayName="Тип документа"
            name="typeDoc"
            description={["Выберите тип документа из списка"]}
            options={documentOptions}
          />

          {form.getFieldValue([name, 'typeDoc']) === "Паспорт гражданина РФ" &&
            <>
              {/* Серия паспорта */}
              <TextInput
                read={read}
                edit={edit}
                value={value?.[name]?.serialPassport}
                displayName="Серия паспорта"
                name="serialPassport"
                required={true}
                placeholder={"XXXX"}
                shortDescription="1234"
                inputProps={{
                  maxLength: 4,
                  pattern: "\\d*",
                }}
              />
              {/* Номер паспорта */}
              <TextInput
                read={read}
                edit={edit}
                value={value?.[name]?.numberPassport}
                displayName="Номер паспорта"
                name="numberPassport"
                required={true}
                placeholder={"XXXXXX"}
                shortDescription="567890"
                inputProps={{
                  maxLength: 6,
                  pattern: "\\d*",
                }}
              />
              {/* Код подразделения */}
              <TextInput
                read={read}
                edit={edit}
                value={value?.[name]?.kodPodrazdelenia}
                displayName="Код подразделения"
                name="kodPodrazdelenia"
                required={true}
                placeholder={"XXX-XXX"}
                shortDescription="123-456"
                inputProps={{
                  maxLength: 7,
                  value: kodPodrazdelenia,
                  onChange: handleKodPodrazdeleniaChange,
                }}
                rules={[
                  () => ({
                    validator(_, value) {
                      if (!value || /^\d{3}-\d{3}$/.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Формат кода подразделения должен быть 111-111")
                      );
                    },
                  }),
                ]}
              />
              {/* _______Кем выдан_______ */}
              <Form.Item label="Кем выдан" name="kemVidan" required={read ? false : true}>
                {!read &&
                  // <TextArea placeholder="..." rows={2} defaultValue={value?.[name]?.kemVidan} />
                  <AutoComplete
                    defaultValue={value?.[name]?.kemVidan}
                    options={kemVidanOptions}
                    //onSelect={onSelect}
                    // onSearch={() => setKemVidanOptions([])}
                    style={{ width: "100%" }}
                  >
                    <TextArea
                      placeholder="Начните вводить адрес"
                      style={{ height: 60 }}
                    />
                  </AutoComplete>
                }
                {read && <Typography.Text>{value?.[name]?.kemVidan}</Typography.Text>}
              </Form.Item>

              {/* _______Когда выдан_______ */}
              {/* <ConfigProvider locale={locale}> */}

              <Form.Item label="Когда выдан" name="dateIssue" required={read ? false : true} >
                {read && <Typography.Text>{value?.[name]?.dateIssue}</Typography.Text>}
                {!read &&
                  <DatePicker
                    defaultValue={moment(value?.[name]?.dateIssue, 'DD.MM.YYYY')}
                    required={true}
                    format="DD.MM.YYYY"
                    locale={locale.DatePicker}
                    style={{ width: "100%" }}
                  // onPanelChange={(event) => console.log(event)}
                  />
                }
              </Form.Item>
              {/* </ConfigProvider> */}

            </>
          }

          {/* _______Иной документ_______ */}
          {form.getFieldValue([name, 'typeDoc']) === "Иной документ" && (
            <>
              <TextInput
                displayName="Тип иного документа"
                read={read}
                edit={edit}
                value={value?.[name]?.typeOtherDoc}
                name="typeOtherDoc"
                required={true}
                shortDescription="..."
                inputType="textarea"
              />
              {/* Реквизиты документа */}

              <Form.Item label="Реквизиты документа" name="recvizityOthetDoc" required={read ? false : true}>
                {!read && <TextArea
                  placeholder="..."
                  rows={2}
                  defaultValue={value?.[name]?.recvizityOthetDoc}
                />}
                {read && < Typography.Text > {value?.[name]?.recvizityOthetDoc}</Typography.Text>}
              </Form.Item>

              {/* _______Кем выдан_______ */}

              <Form.Item label="Кем выдан" name="kemVidanOthetDoc" required={read ? false : true}>
                {!read && <TextArea
                  defaultValue={value?.[name]?.kemVidanOthetDoc}
                  placeholder="..."
                  style={{
                    height: 60,
                  }}
                />}
                {read && <Typography.Text>{value?.[name]?.kemVidanOthetDoc}</Typography.Text>}
              </Form.Item>

              {/* _______Когда выдан_______ */}

              <Form.Item label="Когда выдан" name="dateIssueOtherDoc" valuePropName="value" required={read ? false : true}>
                {!read &&
                  <DatePicker
                    defaultValue={moment(value?.[name]?.dateIssueOtherDoc, 'DD.MM.YYYY')}
                    locale={locale.DatePicker}
                    format="DD.MM.YYYY"
                    style={{ width: "100%" }}
                  />}
                {read && <Typography.Text>{value?.[name]?.dateIssueOthetDoc}</Typography.Text>}
              </Form.Item>

            </>
          )
          }
        </>
      )
      }
    </Form.List >
  );
}
