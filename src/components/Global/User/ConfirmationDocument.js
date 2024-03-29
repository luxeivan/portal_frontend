import React, { useState } from "react";

import { Flex, Input, Form, Select, Divider } from "antd";

import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

export default function ConfirmationDocument() {
  const [documentType, setDocumentType] = useState("passport");
  const [kodPodrazdelenia, setKodPodrazdelenia] = useState("");

  // Изменяет тип документа в зависимости от выбора пользователя
  const onDocumentTypeChange = (value) => {
    setDocumentType(value);
  };

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
      <Divider orientation="center">Подтверждающий документ</Divider>

      {/* _______Тип подтверждающего документа_______ */}
      <Form.Item label="Тип документа" name="typedocuments">
        <Select onChange={onDocumentTypeChange}>
          <Option value="passport">Паспорт гражданина РФ</Option>
          <Option value="other">Иной документ</Option>
        </Select>
      </Form.Item>

      {/* _______Паспорт_______ */}
      {documentType === "passport" && (
        <>
          <Flex gap="middle" vertical>
            {/* _______Серия паспорта_______ */}
            <Form.Item
              label="Серия паспорта"
              name="serialPassport"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, укажите серию паспорта",
                },
              ]}
            >
              <Input maxLength={4} pattern="\d*" placeholder="1234" />
            </Form.Item>

            {/* _______Номер паспорта_______ */}
            <Form.Item
              label="Номер паспорта"
              name="numberPassport"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, укажите номер паспорта",
                },
              ]}
            >
              <Input maxLength={6} pattern="\d*" placeholder="567890" />
            </Form.Item>

            {/* _______Код подразделения_______ */}
            <Form.Item
              label="Код подразделения"
              name="kodpodrazdelenia"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, укажите код подразделения",
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
            >
              <Input
                maxLength={7}
                placeholder="123-456"
                value={kodPodrazdelenia}
                onChange={handleKodPodrazdeleniaChange}
              />
            </Form.Item>

            {/* _______Кем выдан_______ */}
            <Form.Item
              label="Кем выдан"
              name="kemvidan"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, укажите кем выдан паспорт",
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
          </Flex>
        </>
      )}

      {/* _______Иной документ_______ */}
      {documentType === "other" && (
        <>
          {/* _______Тип документа_______ */}
          <Form.Item label="Тип документа">
            <Select>
              <Option value="type1">Тип1</Option>
              <Option value="type2">Тип2</Option>
            </Select>
          </Form.Item>

          {/* _______Реквизиты документа_______ */}
          <Form.Item
            label="Реквизиты документа"
            name="recvizitydocumenta"
            rules={[
              {
                required: true,
                message: "Пожалуйста, укажите реквизиты документа",
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
        </>
      )}
    </>
  );
}
