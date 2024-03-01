import React from 'react';
import { Input, Button, Form } from 'antd';
import useRegistration from '../../../stores/useRegistration';

const PhoneVerification = () => {
  const submitPhone = useRegistration((state) => state.submitPhone);

  const onFinish = (values) => {
    submitPhone(values.phone);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Пожалуйста, введите ваш номер телефона!' }]}
      >
        <Input placeholder="Номер телефона" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PhoneVerification;
