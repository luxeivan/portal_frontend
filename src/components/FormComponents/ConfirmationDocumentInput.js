import React, { useState } from "react";
import { Form, ConfigProvider, DatePicker, Typography, Input } from "antd";
import locale from "antd/locale/ru_RU";
import TextArea from "antd/es/input/TextArea";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import localePicker from "antd/es/date-picker/locale/ru_RU";

const documentOptions = [
  { value: "Паспорт гражданина РФ", label: "Паспорт гражданина РФ" },
  { value: "Иной документ", label: "Иной документ" },
];

export default function ConfirmationDocument({ form, read, edit, value, name, }) {
  const [kodPodrazdelenia, setKodPodrazdelenia] = useState("");
  Form.useWatch([name, 'typeDoc'], form)
  console.log(value)

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
    <Form.List name={name} initialValue={{ typeDoc: "Паспорт гражданина РФ" }}>
      {() => (
        <>
          <SelectInput
            read={read}
            edit={edit}
            value={value?.typeDoc}
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
                value={value?.serialPassport}
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
                value={value?.numberPassport}
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
              {/* <Form.Item label="Код подразделения" name="kodPodrazdelenia" required={read ? false : true}
                rules={[
                  () => ({
                    validator(_, value) {
                      if (!value || /^\d{3}-\d{3}$/.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Формат кода подразделения должен быть XXX-XXX")
                      );
                    },
                  }),
                ]}>
                {!read && <Input
                  placeholder="XXX-XXX"
                  maxLength={7}
                  value={kodPodrazdelenia}
                  onChange={handleKodPodrazdeleniaChange}
                />}
                {read && <Typography.Text>{value.kodPodrazdelenia}</Typography.Text>}
              </Form.Item> */}
              <TextInput
                read={read}
                edit={edit}
                value={value?.kodPodrazdelenia}
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
                {!read && <TextArea placeholder="..." rows={2} />}
                {read && <Typography.Text>{value.kemVidan}</Typography.Text>}
              </Form.Item>

              {/* _______Когда выдан_______ */}
              <Form.Item label="Когда выдан" name="dateIssue" required={read ? false : true} >
                {read && <Typography.Text>{value.dateIssue}</Typography.Text>}
                {!read && <ConfigProvider locale={locale}>
                  <DatePicker
                    format="DD.MM.YYYY"
                    locale={localePicker}
                    style={{ width: "100%" }}
                  />
                </ConfigProvider>}
              </Form.Item>

            </>
          }

          {/* _______Иной документ_______ */}
          {form.getFieldValue([name, 'typeDoc']) === "Иной документ" && (
            <>
              <TextInput
                displayName="Тип иного документа"
                read={read}
                edit={edit}
                value={value?.typeOtherDoc}
                name="typeOtherDoc"
                required={true}
                shortDescription="..."
                inputType="textarea"
              />
              {/* Реквизиты документа */}

              <Form.Item label="Реквизиты документа" name="recvizityOthetDoc" required={true}>
                {!read && <TextArea
                  placeholder="..."
                  rows={2}
                />}
                {read && < Typography.Text > {value.recvizityOthetDoc}</Typography.Text>}
              </Form.Item>

              {/* _______Кем выдан_______ */}

              <Form.Item label="Кем выдан" name="kemVidanOthetDoc" required={true}>
                {!read && <TextArea
                  placeholder="..."
                  style={{
                    height: 60,
                  }}
                />}
                {read && <Typography.Text>{value.kemVidanOthetDoc}</Typography.Text>}
              </Form.Item>

              {/* _______Когда выдан_______ */}

              <Form.Item label="Когда выдан" name="dateIssueOthetDoc" valuePropName="value" required={true}>
                {!read && <ConfigProvider locale={locale}>
                  <DatePicker
                    locale={localePicker}
                    format="DD.MM.YYYY"
                    style={{ width: "100%" }}
                  />
                </ConfigProvider>}
                {read && <Typography.Text>{value.dateIssueOthetDoc}</Typography.Text>}
                {/* <DatePicker format="DD.MM.YYYY" style={{ width: "100%" }} /> */}
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
