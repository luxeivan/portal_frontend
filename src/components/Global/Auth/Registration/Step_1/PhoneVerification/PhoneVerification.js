import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, Typography, Space } from "antd";
import useRegistration from "../../../../../../stores/useRegistration";
import InputMask from "react-input-mask";
import PhoneCodeVerification from "../PhoneCodeVerification";
import './PhoneVerification.module.css';

const { Paragraph } = Typography;

const PhoneVerification = React.memo(({ submitPhoneCode }) => {
  const [form] = Form.useForm();
  const { phone, setPhone, submitPhone, codeRequested, setCodeRequested } = useRegistration((state) => ({
    phone: state.phone,
    setPhone: state.setPhone,
    submitPhone: state.submitPhone,
    codeRequested: state.codeRequested,
    setCodeRequested: state.setCodeRequested,
  }));
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [timer, setTimer] = useState(0);
  const [hasAttempted, setHasAttempted] = useState(false);
  const [buttonText, setButtonText] = useState("Подтвердить");

  useEffect(() => {
    if (timer === 0 && hasAttempted) {
      setButtonText("Отправить код повторно");
    }
  }, [timer, hasAttempted]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prevTimer) => prevTimer - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const onFinish = useCallback(async (values) => {
    const formattedPhone = values.phone.replace(/[^\d]/g, "");
    setCodeRequested(false);
    await submitPhone(formattedPhone);
    setCodeRequested(true);
    setTimer(10); 
    setHasAttempted(true);
  }, [submitPhone]); 
  

  const onPhoneChange = useCallback((event) => {
    const value = event.target.value;
    const isComplete = !value.includes("_");
    setIsPhoneValid(isComplete);
    setPhone(value);
  }, [setPhone]);

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Paragraph>
          Укажите номер мобильного телефона в формате +7(XXX)XXX-XX-XX.
        </Paragraph>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Пожалуйста, введите ваш номер телефона!" }]}
        >
          <InputMask
            mask="+7(999)999-99-99"
            value={phone}
            onChange={onPhoneChange}
            placeholder="+7(___)___-__-__"
            className="ant-input"
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" disabled={!isPhoneValid || timer > 0}>
              {buttonText}
            </Button>
            {timer > 0 && <span className="timer">{timer} сек.</span>}
          </Space>
        </Form.Item>
      </Form>
      {codeRequested && <PhoneCodeVerification />}
    </div>
  );
});

export default PhoneVerification;
