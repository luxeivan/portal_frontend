import React, { useState } from "react";
import { Button, Form, Typography } from "antd";
import useRegistration from "../../../../stores/useRegistration";
import InputMask from "react-input-mask";
import PhoneCodeVerification from "../PhoneCodeVerification";

const { Paragraph } = Typography;

const PhoneVerification = () => {
  const [form] = Form.useForm();
  const { phone, setPhone, submitPhone, codeRequested, setCodeRequested } = useRegistration((state) => ({
    phone: state.phone,
    setPhone: state.setPhone,
    submitPhone: state.submitPhone,
    codeRequested: state.codeRequested,
    setCodeRequested: state.setCodeRequested,
  }));
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const onFinish = async (values) => {
    const formattedPhone = values.phone.replace(/[^\d]/g, '');
    const result = await submitPhone(formattedPhone);
    if (result === 'ok') {
      setCodeRequested(true);
    }
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
            value={phone}
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
      {codeRequested && <PhoneCodeVerification />}
    </div>
  );
};

export default PhoneVerification;