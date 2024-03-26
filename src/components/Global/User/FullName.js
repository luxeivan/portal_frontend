import React from "react";
import { Input, Form, Divider } from "antd";

export default function FullName({ onSubmit, setShowModalAdd }) {
  return (
    <>
      <Divider orientation="center">ФИО</Divider>

      {/* _______Фамилия_______ */}
      <Form.Item
        label="Фамилия"
        name="lastname"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите вашу фамилию",
          },
        ]}
      >
        <Input placeholder="Иванов" />
      </Form.Item>

      {/* _______Имя_______ */}
      <Form.Item
        label="Имя"
        name="firstname"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваше имя",
          },
        ]}
      >
        <Input placeholder="Иван" />
      </Form.Item>

      {/* _______Отчество_______ */}
      <Form.Item label="Отчество" name="secondname">
        <Input placeholder="Иванович" />
      </Form.Item>
    </>
  );
}
