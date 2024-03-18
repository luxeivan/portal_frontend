import React, { useState } from "react";
import { Button, Form, Input, Alert, Space, Flex } from "antd";
import useAuth from "../../../../stores/useAuth";
import CodeForm from "./CodeForm";
import styles from "./AuthLoginForm.module.css";
import { formItemLayout, tailFormItemLayout } from '../../../../components/configSizeForm'

export default function AuthLoginForm() {
  const {
    login,
    toggleModal,
    loginError,
    isCodeRequested,
    authTimer,
    startAuthTimer,
  } = useAuth();

  const onFinish = async (values) => {
    login(values.email, values.password);
    startAuthTimer();
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
          onClose={() => toggleModal("isAuthModalOpen", false)}
        />
      )}
      <Form
        {...formItemLayout}
        className={styles.formContainer}
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
          {...tailFormItemLayout}
        >
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
            disabled={authTimer > 0}
          >
            {authTimer > 0 ? `Повторить через ${authTimer} секунд(ы)` : 'Вход'}
          </Button>
        </Form.Item>
      </Form>
      {isCodeRequested && <CodeForm />}
    </>
  );
}
