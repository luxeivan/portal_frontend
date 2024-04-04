import React from "react";

import { Input, Form, Divider } from "antd";
import TextInput from "../../FormComponents/TextInput";

export default function Contacts({ form }) {
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(
      /^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2}).*/,
      "+$1 ($2) $3-$4-$5"
    );
    value = value.substring(0, 18);
    form.setFieldsValue({ phone: value });
  };

  const handleEmailChange = (e) => {
    console.log("Новый email:", e.target.value);
  };

  return (
    <>
      <Divider orientation="center">Другое</Divider>
      {/* _______Телефон_______ */}

      <Form.Item
        label="Мобильный телефон"
        name="phone"
        rules={[{ required: true, message: "Введите номер телефона" }]}
      >
        <Input
          onChange={handlePhoneChange}
          placeholder="Начните вводить номер с цифры 7..."
          maxLength={18}
        />
      </Form.Item>
      {/* _______Почта_______ */}
      <Form.Item
        label="Электронная почта"
        name="email"
        rules={[
          { required: true, message: "Введите email" },
          {
            type: "email",
            message: "Пожалуйста, введите корректный email",
          },
        ]}
      >
        <Input onChange={handleEmailChange} placeholder="ivanov@yandex.ru" />
      </Form.Item>
    </>
  );
}
