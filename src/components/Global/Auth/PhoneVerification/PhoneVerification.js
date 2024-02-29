import React from "react";
import { Input, Button, Form, Typography } from "antd";
import useRegistration from "../../../../stores/useRegistration";
import { PhoneOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./PhoneVerification.module.css";

const { Title, Text, Paragraph } = Typography;

const PhoneVerification = () => {
  const submitPhone = useRegistration((state) => state.submitPhone);

  const onFinish = (values) => {
    submitPhone(values.phone);
  };

  return (
    <div>
    <Form onFinish={onFinish}>
      <Paragraph>
        Укажите номер мобильного телефона в формате +7(***)***-**-**.
      </Paragraph>
      <Form.Item
        name="phone"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваш номер телефона!",
          },
        ]}
      >
        <Input addonBefore={<PhoneOutlined />} placeholder="Номер телефона" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Получить код
        </Button>
      </Form.Item>
    </Form>
    <Button type="link">*Инструкция по регистрации</Button>
    </div>
  );
};

export default PhoneVerification;
