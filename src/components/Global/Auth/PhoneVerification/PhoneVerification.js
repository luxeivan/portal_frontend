import React, { useState } from "react";
import { Button, Form, Typography, Input } from "antd";
import useRegistration from "../../../../stores/useRegistration";
import InputMask from "react-input-mask";

const { Paragraph } = Typography;

const PhoneVerification = () => {
  const [form] = Form.useForm();
  const submitPhone = useRegistration((state) => state.submitPhone);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const onFinish = (values) => {
    const formattedPhone = values.phone.replace(/[^\d]/g, '');
    submitPhone(formattedPhone);
  };

  const onPhoneChange = (event) => {
    const value = event.target.value;
    const isComplete = value.includes("_") ? false : true;
    setIsPhoneValid(isComplete);
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Paragraph>
          Укажите номер мобильного телефона в формате +7(XXX)XXX-XX-XX.
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
          <InputMask
            mask="+7(999)999-99-99"
            onChange={onPhoneChange}
            placeholder="+7(___)___-__-__"
            className="ant-input"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!isPhoneValid}>
            Получить код
          </Button>
        </Form.Item>
      </Form>
      {/* <Button type="link">*Инструкция по регистрации</Button> */}
    </div>
  );
};

export default PhoneVerification;
