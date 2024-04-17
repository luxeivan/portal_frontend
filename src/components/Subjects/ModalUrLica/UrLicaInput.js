//Для удобства, пока что этот компонент тут, но потом его можно перенсти
import React from "react";
import { Form, Input, Button } from "antd";

export default function UrLicaInput() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Отправленные данные ИНН:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Ошибка при отправке формы:", errorInfo);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="inn"
        label="ИНН"
      >
        <Input maxLength={12} placeholder="Введите ваш ИНН" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
}
