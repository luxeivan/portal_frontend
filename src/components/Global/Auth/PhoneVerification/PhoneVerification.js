import React, { useState } from "react";
import { Button, Form, Typography } from "antd";
import useRegistration from "../../../../stores/useRegistration";
import InputMask from "react-input-mask";
import { PhoneOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const PhoneVerification = () => {
  const [form] = Form.useForm();
  const { phone, setPhone, submitPhone } = useRegistration((state) => ({
    phone: state.phone,
    setPhone: state.setPhone,
    submitPhone: state.submitPhone,
  }));
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const onFinish = (values) => {
    const formattedPhone = values.phone.replace(/[^\d]/g, '');
    submitPhone(formattedPhone);
  };

  const onPhoneChange = (event) => {
    const value = event.target.value;
    const isComplete = value.includes("_") ? false : true;
    setIsPhoneValid(isComplete);
    setPhone(value);
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
          {/* <PhoneOutlined /> */}
          <InputMask
            mask="+7(999)999-99-99"
            value={phone || ''} 
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
    </div>
  );
};

export default PhoneVerification;
