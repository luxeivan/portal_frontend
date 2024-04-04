import React from "react";
import { Button, Form, Input, notification } from "antd";
import useAuth from "../../../../stores/useAuth";
import styles from './CodeForm.js.module.css'
import Title from "antd/es/typography/Title";
import { formItemLayout, tailFormItemLayout } from '../../../../components/configSizeForm'

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
      {...formItemLayout}
      name="codeForm"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles.codeFormContainer}
    >
      <Title level={5}>Сейчас Вам поступит телефонный звонок, отвечать на него не нужно.</Title>
      <Form.Item
        label="Код подтверждения"
        name="pincode"
        rules={[{ required: true, message: "Введите код подтверждения" }]}
        >
        <Input placeholder="Введите последние 4 цифры" />
      </Form.Item>

      <Form.Item 
        {...tailFormItemLayout}
      >
        <Button type="primary" htmlType="submit" className={styles.sendCodeButton}>
          Получить код
        </Button>
      </Form.Item>
    </Form>
  );
}
