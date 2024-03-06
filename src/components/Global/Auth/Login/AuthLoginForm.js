import React from "react";
import { Button, Form, Input, Alert } from "antd";
import useAuth from "../../../../stores/useAuth";

export default function AuthLoginForm() {
  const { login, toggleModal, loginError } = useAuth();

  const onFinish = async (values) => {
    login(values.email, values.password);
  };

  const onFinishFailed = ({ values, errorFields }) => {
    console.log("Failed:", errorFields);
  };

  return (
    <>
      {loginError && (
        <Alert
          message={loginError}
          type="error"
          showIcon
          closable
          onClose={() => toggleModal('isAuthModalOpen', false)}
        />
      )}
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Это поле обязательно",
            },
            {
              type: "email",
              message: "Пожалуйста, введите корректный email",
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
              message: "Это поле обязательно",
            },
            {
              min: 10,
              message: "Минимальная длина пароля 10 символов",
            },
          ]}
        >
          <Input.Password />
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
    </>
  );
}
