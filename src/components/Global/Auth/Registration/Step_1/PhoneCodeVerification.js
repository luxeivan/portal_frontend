import React from "react";
import { Form, Input, Button, Typography } from "antd";
import useRegistration from "../../../../../stores/useRegistration";

const { Paragraph } = Typography;

const PhoneCodeVerification = () => {
  const submitPhoneCode = useRegistration((state) => state.submitPhoneCode);

  const onFinish = (values) => {
    submitPhoneCode(values.phoneCode);
  };

  return (
    <Form onFinish={onFinish}>
      <Paragraph>Cейчас Вам поступит звонок, НЕ отвечайте на него</Paragraph>
      <Form.Item
        name="phoneCode"
        rules={[{ required: true, message: "Пожалуйста, введите пин-код!" }]}
      >
        <Input placeholder="Введите последние 4-е цифры входящего звонка" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Продолжить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PhoneCodeVerification;
