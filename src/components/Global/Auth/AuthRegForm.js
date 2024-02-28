import React from 'react';
import { Steps } from 'antd';
import useRegistration from '../../../stores/useRegistration';
import PhoneVerification from './PhoneVerification';
import PhoneCodeVerification from './PhoneCodeVerification';
const { Step } = Steps;

const AuthRegForm = () => {
  const registrationStep = useRegistration((state) => state.registrationStep);
  return (
    <div>
      <Steps current={registrationStep}>
        <Step title="Проверка телефонного номера" />
        <Step title="Проверка пин-кода" />
        <Step title="Ввод пароля" />
      </Steps>
      {registrationStep === 0 && <PhoneVerification />}
      {registrationStep === 0 && <PhoneCodeVerification />}
    </div>
  );
};

export default AuthRegForm;

