import React, { useState } from "react";

import { Form, Divider, ConfigProvider, DatePicker, Typography } from "antd";

import TextArea from "antd/es/input/TextArea";

import SelectInput from "../FormComponents/SelectInput";
import TextInput from "../FormComponents/TextInput";

import ruRU from "antd/lib/locale/ru_RU";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");

export default function ConfirmationDocument({ form, read, edit, value }) {
  const [documentType, setDocumentType] = useState("Паспорт гражданина РФ");
  const [kodPodrazdelenia, setKodPodrazdelenia] = useState("");

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

  return (
    <>
      <Divider orientation="center">Удостоверяющий документ</Divider>

      {/* _______Тип подтверждающего документа_______ */}
      <SelectInput
        read={read}
        edit={edit}
        value={value?.typeDoc}
        displayName="Тип документа"
        name="typeDoc"
        defaultValue="Паспорт гражданина РФ"
        required={true}
        description={["Выберите тип документа из списка"]}
        options={documentOptions}
        onChange={onDocumentTypeChange}
      />

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
            required={true}
            shortDescription="1234"
            inputProps={{
              maxLength: 4,
              pattern: "\\d*",
            }}
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          />
          {/* Номер паспорта */}
          <TextInput
            read={read}
            edit={edit}
            value={value?.numberPassport}
            displayName="Номер паспорта"
            name="numberPassport"
            required={true}
            shortDescription="567890"
            inputProps={{
              maxLength: 6,
              pattern: "\\d*",
            }}
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          />
          {/* Код подразделения */}
          <TextInput
            read={read}
            edit={edit}
            value={value?.kodPodrazdelenia}
            displayName="Код подразделения"
            name="kodPodrazdelenia"
            required={true}
            shortDescription="123-456"
            inputProps={{
              maxLength: 7,
              value: kodPodrazdelenia,
              onChange: handleKodPodrazdeleniaChange,
            }}
            rules={[
              {
                required: true,
                message: "",
              },
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
          {/* <Form.Item
            label="Кем выдан"
            name="kemVidan"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <TextArea
              placeholder="..."
              style={{
                height: 60,
              }}
            />
          </Form.Item> */}
          {read ? (
            <Form.Item label="Кем выдан" name="kemVidan">
              <Typography.Text>{value.kemVidan}</Typography.Text>
            </Form.Item>
          ) : (
            <Form.Item
              label="Кем выдан"
              name="kemVidan"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, укажите, кем был выдан документ",
                },
              ]}
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
          <Form.Item
            name="dateIssue"
            label="Когда выдан"
            rules={[{ required: true, message: "" }]}
            valuePropName="value"
          >
            <DatePicker format="DD.MM.YYYY" />
          </Form.Item>
        </>
      )}

      {/* _______Иной документ_______ */}
      {documentType === "Иной документ" && (
        <>
          <TextInput
            displayName="Тип иного документа"
            name="otherTypeDoc"
            required={true}
            shortDescription="..."
            inputType="textarea"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          />

          {/* Реквизиты документа */}
          <Form.Item
            label="Реквизиты документа"
            name="recvizitydocumenta"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <TextArea
              placeholder="..."
              style={{
                height: 60,
              }}
            />
          </Form.Item>
          {/* _______Кем выдан_______ */}
          <Form.Item
            label="Кем выдан"
            name="kemvidanOther"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <TextArea
              placeholder="..."
              style={{
                height: 60,
              }}
            />
          </Form.Item>
          {/* _______Когда выдан_______ */}
          <Form.Item
            label="Когда выдан"
            name="dateOther"
            rules={[{ required: true, message: "" }]}
          >
            <ConfigProvider locale={ruRU}>
              <DatePicker format="DD.MM.YYYY" style={{ width: "100%" }} />
            </ConfigProvider>
          </Form.Item>
        </>
      )}
    </>
  );
}
