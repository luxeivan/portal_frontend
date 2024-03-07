import React from "react";
import { Button, Form, Input, notification } from "antd";
import useAuth from "../../../../stores/useAuth";

export default function CodeForm() {
  const { verifyPincode } = useAuth();

  const onFinish = (values) => {
    verifyPincode(values.pincode)
      .then(() => {
        notification.success({
          message: "Код подтверждения успешно проверен",
        });
      })
      .catch((error) => {
        notification.error({
          message: "Ошибка ввода кода",
          description: error.message,
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: "Ошибка ввода кода",
      description: errorInfo.errorFields
        .map((field) => field.errors)
        .join(", "),
    });
  };

  return (
    <Form
      name="codeForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Код подтверждения"
        name="pincode"
        rules={[{ required: true, message: "Введите код подтверждения" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Отправить код
        </Button>
      </Form.Item>
    </Form>
  );
}
