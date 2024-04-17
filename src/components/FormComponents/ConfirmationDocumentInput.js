import React, { useEffect, useState } from "react";

import {
  Form,
  Divider,
  ConfigProvider,
  DatePicker,
  Typography,
  Input,
  Select,
} from "antd";
import locale from "antd/locale/ru_RU";
import localePicker from "antd/es/date-picker/locale/ru_RU";

import TextArea from "antd/es/input/TextArea";

import SelectInput from "./SelectInput";
import TextInput from "./TextInput";

import ruRU from "antd/lib/locale/ru_RU";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

export default function ConfirmationDocument({
  form,
  read,
  edit,
  value,
  name,
}) {
  // const [documentType, setDocumentType] = useState("Паспорт гражданина РФ");
  const [documentType, setDocumentType] = useState(
    value.typeDoc || "Паспорт гражданина РФ"
  );
  // console.log(localePicker)
  const [kodPodrazdelenia, setKodPodrazdelenia] = useState("");

  //Здесь надо реализовать формирование поля в зависимости от выбранного документа
  form.setFieldsValue({
    [`${name}`]: {
      passport: {
        serial: "123",
        number: "123123",
      },
    },
  });
  // Изменяет тип документа в зависимости от выбора пользователя
  const onDocumentTypeChange = (value) => {
    setDocumentType(value);
    form.setFieldsValue({ typeDoc: value });
  };

  const documentOptions = [
    { value: "Паспорт гражданина РФ", label: "Паспорт гражданина РФ" },
    { value: "Иной документ", label: "Иной документ" },
  ];

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

  useEffect(() => {
    if (value.typeDoc) {
      setDocumentType(value.typeDoc);
    }
  }, [value.typeDoc]);

  return (
    <>
      {/* <Divider orientation="center">Удостоверяющий документ</Divider> */}

      {/* _______Тип подтверждающего документа_______ */}
      {/* <Select options={documentOptions} onChange={onDocumentTypeChange} /> */}
      <SelectInput
        read={read}
        edit={edit}
        value={value?.typeDoc}
        displayName="Тип документа"
        name="typeDoc"
        defaultValue="Паспорт гражданина РФ"
        // required={true}
        description={["Выберите тип документа из списка"]}
        options={documentOptions}
        onChange={onDocumentTypeChange}
      />

      <Form.Item name={`${name}`} noStyle>
        <Input type="hidden" />
      </Form.Item>
      {/* _______Паспорт_______ */}
      {documentType === "Паспорт гражданина РФ" && (
        <>
          {/* Серия паспорта */}
          <TextInput
            read={read}
            edit={edit}
            value={value?.serialPassport}
            displayName="Серия паспорта"
            name="serialPassport"
            // required={true}
            shortDescription="1234"
            inputProps={{
              maxLength: 4,
              pattern: "\\d*",
            }}
            // rules={[
            //   {
            //     required: true,
            //     message: "",
            //   },
            // ]}
          />
          {/* Номер паспорта */}
          <TextInput
            read={read}
            edit={edit}
            value={value?.numberPassport}
            displayName="Номер паспорта"
            name="numberPassport"
            // required={true}
            shortDescription="567890"
            inputProps={{
              maxLength: 6,
              pattern: "\\d*",
            }}
            // rules={[
            //   {
            //     required: true,
            //     message: "",
            //   },
            // ]}
          />
          {/* Код подразделения */}
          <TextInput
            read={read}
            edit={edit}
            value={value?.kodPodrazdelenia}
            displayName="Код подразделения"
            name="kodPodrazdelenia"
            // required={true}
            shortDescription="123-456"
            inputProps={{
              maxLength: 7,
              value: kodPodrazdelenia,
              onChange: handleKodPodrazdeleniaChange,
            }}
            rules={[
              // {
              //   required: true,
              //   message: "",
              // },
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
          {read ? (
            <Form.Item label="Кем выдан" name="kemVidan">
              <Typography.Text>{value.kemVidan}</Typography.Text>
            </Form.Item>
          ) : (
            <Form.Item
              label="Кем выдан"
              name="kemVidan"
              // rules={[
              //   {
              //     required: true,
              //     message: "т",
              //   },
              // ]}
            >
              <TextArea
                placeholder="..."
                style={{
                  height: 60,
                }}
              />
            </Form.Item>
          )}
          {/* _______Когда выдан_______ */}
          {read ? (
            <Form.Item label="Когда выдан" name="dateIssue">
              <Typography.Text>
                {moment(value.dateIssue).format("DD.MM.YYYY")}
              </Typography.Text>
            </Form.Item>
          ) : (
            <Form.Item
              label="Когда выдан"
              name="dateIssue"
              // rules={[
              //   {
              //     required: true,
              //     message: "",
              //   },
              // ]}
              valuePropName="value"
            >
              <ConfigProvider locale={locale}>
                <DatePicker
                  format="DD.MM.YYYY"
                  locale={localePicker}
                  style={{ width: "100%" }}
                />
              </ConfigProvider>
            </Form.Item>
          )}
        </>
      )}

      {/* _______Иной документ_______ */}
      {documentType === "Иной документ" && (
        <>
          <TextInput
            displayName="Тип иного документа"
            read={read}
            edit={edit}
            value={value?.typeOtherDoc}
            name="typeOtherDoc"
            // required={true}
            shortDescription="..."
            inputType="textarea"
            // rules={[
            //   {
            //     required: true,
            //     message: "",
            //   },
            // ]}
          />
          {/* Реквизиты документа */}
          {read ? (
            <Form.Item label="Реквизиты документа" name="recvizityOthetDoc">
              <Typography.Text>{value.recvizityOthetDoc}</Typography.Text>
            </Form.Item>
          ) : (
            <Form.Item
              label="Реквизиты документа"
              name="recvizityOthetDoc"
              // rules={[
              //   {
              //     required: true,
              //     message: "",
              //   },
              // ]}
            >
              <TextArea
                placeholder="..."
                style={{
                  height: 60,
                }}
              />
            </Form.Item>
          )}
          {/* _______Кем выдан_______ */}
          {read ? (
            <Form.Item label="Кем выдан" name="kemVidanOthetDoc">
              <Typography.Text>{value.kemVidanOthetDoc}</Typography.Text>
            </Form.Item>
          ) : (
            <Form.Item
              label="Кем выдан"
              name="kemVidanOthetDoc"
              // rules={[
              //   {
              //     required: true,
              //     message: "",
              //   },
              // ]}
            >
              <TextArea
                placeholder="..."
                style={{
                  height: 60,
                }}
              />
            </Form.Item>
          )}
          {/* _______Когда выдан_______ */}
          {read ? (
            <Form.Item label="Когда выдан" name="dateIssueOthetDoc">
              <Typography.Text>
                {moment(value.dateIssueOthetDoc).format("DD.MM.YYYY")}
              </Typography.Text>
            </Form.Item>
          ) : (
            <Form.Item
              label="Когда выдан"
              name="dateIssueOthetDoc"
              // rules={[
              //   {
              //     required: true,
              //     message: "",
              //   },
              // ]}
              valuePropName="value"
            >
              <DatePicker format="DD.MM.YYYY" style={{ width: "100%" }} />
            </Form.Item>
          )}
        </>
      )}
    </>
  );
}
