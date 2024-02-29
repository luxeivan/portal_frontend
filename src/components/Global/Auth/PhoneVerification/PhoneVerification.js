import React from "react";
import { Input, Button, Form, Typography } from "antd";
import useRegistration from "../../../../stores/useRegistration";
import { PhoneOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const PhoneVerification = () => {
  const [form] = Form.useForm();
  const submitPhone = useRegistration((state) => state.submitPhone);

  const onFinish = (values) => {
    submitPhone(values.phone);     
  };
  
  const validatePhone = (_, value) => {
    const regex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
    if (regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Введите номер телефона в формате +7(***)***-**-**'));
  };

  const isPhoneValid = !form.getFieldError('phone').length && form.isFieldTouched('phone');

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
            {
              validator: validatePhone,
            },
          ]}
        >
          <Input addonBefore={<PhoneOutlined />} placeholder="+7(***)***-**-**" />
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
