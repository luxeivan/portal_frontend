import React from "react";
import { Modal, Form, Input, message, Typography } from "antd";

const { Paragraph } = Typography;

// Модалка для изменения телефона
export const PhoneModal = ({ isVisible, onCancel, onSubmit, form }) => {
  return (
    <Modal
      title="Изменить номер телефона"
      visible={isVisible}
      onOk={onSubmit}
      onCancel={onCancel}
      okText="Сохранить"
      cancelText="Назад"
    >
      <Form form={form}>
        <Form.Item
          label="Новый номер телефона"
          name="phone"
          rules={[
            {
              required: true,
              message: "Это поле обязательно",
            },
          ]}
        >
          <Input placeholder="79999999999" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

// Валидация для паролей
const validatePasswordsMatch = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Пароли не совпадают"));
  },
});

// Модалка для изменения пароля
export const PasswordModal = ({ isVisible, onCancel, onSubmit, form }) => {
  return (
    <Modal
      title="Изменить пароль"
      visible={isVisible}
      onOk={onSubmit}
      onCancel={onCancel}
      okText="Сохранить"
      cancelText="Назад"
    >
      <Form form={form} onFinish={onSubmit}>
        <Paragraph>
          Пароль должен содержать минимум 8 символов, заглавную букву, цифры,
          латинские буквы.
        </Paragraph>
        <Form.Item
          label="Новый пароль"
          name="password"
          rules={[
            {
              required: true,
              message: "Это поле обязательно",
            },
            {
              min: 8,
              message: "Минимальная длина пароля 8 символов",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Повторите пароль"
          name="repeat_password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Это поле обязательно",
            },
            validatePasswordsMatch,
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};
