import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Alert } from "antd";
import axios from "axios";
import useStore from "../../../stores/GlobalStore";

export default function AuthLoginForm() {
  const openCodeModal = useStore((state) => state.openCodeModal);
  const [loginError, setLoginError] = useState("");

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://5.35.9.42:5000/api/auth/login",
        values
      );
      if (response.data && response.status === 200) {
        console.log("Login Success:", response.data);
        setLoginError("");
        openCodeModal();
      }
    } catch (error) {
      if (error.response) {
        setLoginError(
          error.response.data.message || "Неверный логин или пароль."
        );
      } else {
        setLoginError("Произошла ошибка при попытке входа.");
      }
      console.error("Login Error:", error);
    }
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
          onClose={() => setLoginError("")}
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
