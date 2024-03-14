import React from "react";
import { Form, Input, Button, Typography } from "antd";
import useRegistration from "../../../../../stores/useRegistration";
import Title from "antd/es/typography/Title";
import { formItemLayout, tailFormItemLayout } from '../../../../../components/configSizeForm'

const { Paragraph } = Typography;

const PhoneCodeVerification = () => {
  const submitPhoneCode = useRegistration((state) => state.submitPhoneCode);

  const onFinish = (values) => {
    submitPhoneCode(values.phoneCode);
  };

  return (
    <Form
      {...formItemLayout}
      onFinish={onFinish}
    >

      <Title level={5}>Сейчас Вам поступит телефонный звонок, отвечать на него не нужно.</Title>
      <Form.Item
      label="Код подтверждения"
        name="phoneCode"
        rules={[{ required: true, message: "Пожалуйста, введите пин-код!" }, { min: 4, max: 4, message: "4 цифры" }]}
      >
        <Input placeholder="Введите последние 4-е цифры" />
      </Form.Item>
      <Form.Item
        {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Продолжить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PhoneCodeVerification;
