import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Alert } from "antd";
import axios from "axios";
import useStore from "../../../stores/GlobalStore";

export default function AuthLoginForm() {
  const { login, global: { isCodeModalOpen, loginError } } = useStore();

  const onFinish = (values) => {
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
          onClose={() => useStore.setState({ global: { ...useStore.getState().global, loginError: "" }})}
        />
      )}
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
