import React from "react";
import { Steps, Button } from "antd";
import { useNavigate } from "react-router-dom"; // <-- Импортируем хук навигации
import useRegistration from "../../../../../stores/useRegistration";
import PhoneVerification from "../Step_1/PhoneVerification/PhoneVerification";
import EmailVerification from "../Step_2/EmailVerification/EmailVerification";
import PasswordRegForm from "../Step_3/PasswordRegForm";
import styles from "./AuthRegForm.module.css";
import { LockTwoTone, MailTwoTone, PhoneTwoTone } from "@ant-design/icons";

const { Step } = Steps;

const AuthRegForm = () => {
  const { registrationStep } = useRegistration((state) => ({
    registrationStep: state.registrationStep,
  }));
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate("/docs?tab=3");
  };

  return (
    <div>
      <Steps
        current={registrationStep}
        className={styles.steps}
        direction="vertical"
      >
        <Step
          title="Номер мобильного телефона"
          icon={<PhoneTwoTone />}
          status={registrationStep === 0 ? "process" : "finish"}
        />
        <Step
          title="Электронная почта"
          icon={<MailTwoTone />}
          status={
            registrationStep === 1
              ? "process"
              : registrationStep <= 1
              ? "wait"
              : "finish"
          }
        />
        <Step
          title="Пароль"
          icon={<LockTwoTone />}
          status={registrationStep === 2 ? "process" : "wait"}
        />
      </Steps>
      {registrationStep === 0 && <PhoneVerification />}
      {registrationStep === 1 && <EmailVerification />}
      {registrationStep === 2 && <PasswordRegForm />}
      <Button type="link" onClick={handleClick}>
        Инструкция по регистрации
      </Button>
    </div>
  );
};

export default AuthRegForm;

// import React from "react";
// import { Steps, Button } from "antd";
// import useRegistration from "../../../../../stores/useRegistration";
// import PhoneVerification from "../Step_1/PhoneVerification/PhoneVerification";
// import EmailVerification from "../Step_2/EmailVerification/EmailVerification";
// import PasswordRegForm from "../Step_3/PasswordRegForm";
// import styles from "./AuthRegForm.module.css"
// import { LockTwoTone, MailTwoTone, PhoneTwoTone } from "@ant-design/icons";

// const { Step } = Steps;

// const AuthRegForm = () => {
//   const { registrationStep } = useRegistration((state) => ({
//     registrationStep: state.registrationStep,
//   }));

//   return (
//     <div>
//        <Steps current={registrationStep} className={styles.steps} direction="vertical">
//         <Step title="Номер мобильного телефона" icon={<PhoneTwoTone />} status={registrationStep === 0 ? "process" : "finish"} />
//         <Step title="Электронная почта" icon={<MailTwoTone />} status={registrationStep === 1 ? "process" : registrationStep <= 1 ? "wait" : "finish"} />
//         <Step title="Пароль" icon={<LockTwoTone />} status={registrationStep === 2 ? "process" : "wait"} />
//       </Steps>
//       {registrationStep === 0 && <PhoneVerification />}
//       {registrationStep === 1 && <EmailVerification />}
//       {registrationStep === 2 && <PasswordRegForm />}
//       <Button type="link">*Инструкция по регистрации</Button>
//     </div>
//   );
// };

// export default AuthRegForm;
