import React from "react";
import { Form, Input, Button } from "antd";
import useRegistration from "../../../../../stores/useRegistration";

const EmailCodeVerification = () => {
  const submitEmailCode = useRegistration((state) => state.submitEmailCode);

  const onFinish = (values) => {
    submitEmailCode(values.emailCode);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="emailCode"
        rules={[{ required: true, message: "Пожалуйста, введите пин-код!" }]}
      >
        <Input placeholder="Пин-код" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Подтвердить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmailCodeVerification;
