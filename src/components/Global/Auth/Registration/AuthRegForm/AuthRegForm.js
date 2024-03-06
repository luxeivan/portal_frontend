import React from "react";
import { Steps, Button } from "antd";
import useRegistration from "../../../../../stores/useRegistration";
import PhoneVerification from "../Step_1/PhoneVerification/PhoneVerification";
import EmailVerification from "../Step_2/EmailVerification/EmailVerification";
import PasswordRegForm from "../Step_3/PasswordRegForm";

const { Step } = Steps;

const AuthRegForm = () => {
  const { registrationStep } = useRegistration((state) => ({
    registrationStep: state.registrationStep,
  }));

  return (
    <div>
      <Steps current={registrationStep}>
        <Step title="Номер телефона" />
        <Step title="Почта" />
        <Step title="Пароль" />
      </Steps>
      {registrationStep === 0 && <PhoneVerification />}
      {registrationStep === 1 && <EmailVerification />}
      {registrationStep === 2 && <PasswordRegForm />}
      <Button type="link">*Инструкция по регистрации</Button>
    </div>
  );
};

export default AuthRegForm;
