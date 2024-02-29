import React, { useState, useCallback } from "react";
import { Input, Button, Form, Typography } from "antd";
import useRegistration from "../../../../stores/useRegistration";
import { PhoneOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const PhoneVerification = () => {
  const [form] = Form.useForm();
  const submitPhone = useRegistration((state) => state.submitPhone);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const onFinish = (values) => {
    submitPhone(values.phone);
  };

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const validatePhone = useCallback(
    debounce((value) => {
      const regex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
      setIsPhoneValid(regex.test(value));
    }, 800),
    []
  );

  const onPhoneChange = (event) => {
    validatePhone(event.target.value);
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
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
          <Input
            addonBefore={<PhoneOutlined />}
            placeholder="+7(***)***-**-**"
            onChange={onPhoneChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!isPhoneValid}>
            Получить код
          </Button>
        </Form.Item>
      </Form>
      <Button type="link">*Инструкция по регистрации</Button>
    </div>
  );
};

export default PhoneVerification;

