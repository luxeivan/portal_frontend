import React from 'react';
import { Form, Input, Button } from 'antd';
import useRegistration from '../../../stores/useRegistration';

const PhoneCodeVerification = () => {
  const submitPhoneCode = useRegistration((state) => state.submitPhoneCode);

  const onFinish = (values) => {
    submitPhoneCode(values.phoneCode);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="phoneCode"
        rules={[{ required: true, message: 'Пожалуйста, введите пин-код!' }]}
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

export default PhoneCodeVerification;
