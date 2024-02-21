import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import useStore from "../../../stores/GlobalStore";



export default function AuthLoginForm() {
  const openCodeModal = useStore((state) => state.openCodeModal);

  // const handlerContinueAuth = () => {
  //   openCodeModal();
  // };

  const onFinish = (values) => {
    openCodeModal();
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Почта"
        name="email"
        rules={[
          {
            required: true,
            message: "Это поля обязательно",
          },
          {
            message: "Пожалуйста введите email",
            type: "email",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Это поля обязательно",
          },
          {
            min: 10,
            message: "Минимальная длинна пароля 10 символов",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Запомнить меня</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Продолжить
        </Button>
      </Form.Item>
    </Form>
  );
}
