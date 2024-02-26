import React from "react";
import { Button, Form, Input, Alert } from "antd";
import useStore from "../../../stores/GlobalStore";

export default function AuthLoginForm() {
  const login = useStore(state => state.login);
  const toggleModal = useStore(state => state.toggleModal);
  const loginError = useStore(state => state.global.loginError);

  const onFinish = async (values) => {
    login(values.email, values.password);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {loginError && (
        <Alert
          message={loginError}
          type="error"
          showIcon
          closable
          onClose={() => toggleModal('isAuthModalOpen', true)}
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

