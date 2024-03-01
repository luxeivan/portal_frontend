// import React from "react";
// import { Steps } from "antd";
// import useRegistration from "../../../../stores/useRegistration";
// import PhoneVerification from "../PhoneVerification/PhoneVerification";
// import PhoneCodeVerification from "../PhoneCodeVerification";
// import styles from "./AuthRegForm.module.css";
// const { Step } = Steps;

// const AuthRegForm = () => {
//   const registrationStep = useRegistration((state) => state.registrationStep);

//   return (
//     <div>
//       <Steps current={registrationStep}>
//         <Step title="Номер телефона" />
//         <Step title="Почта" />
//         <Step title="Пароль" />
//       </Steps>
//       <div className={styles.steps__parts__div}>
//         {registrationStep === 0 ? (
//           <PhoneVerification className={styles.phoneVerification__form} />
//         ) : null}
//         {registrationStep === 1 ? <PhoneCodeVerification /> : null}
//       </div>
//     </div>
//   );
// };

// export default AuthRegForm;

import React from "react";
import { Button, Steps } from "antd";
import useRegistration from "../../../../stores/useRegistration";
import PhoneVerification from "../PhoneVerification/PhoneVerification";
import PhoneCodeVerification from "../PhoneCodeVerification";
import styles from "./AuthRegForm.module.css";
const { Step } = Steps;

const AuthRegForm = () => {
  const registrationStep = useRegistration((state) => state.registrationStep);

  return (
    <div>
      <Steps current={registrationStep}>
        <Step title="Номер телефона" />
        <Step title="Почта" />
        <Step title="Пароль" />
      </Steps>
      <div className={styles.steps__parts__div}>
        {registrationStep === 0 && <PhoneVerification />}
        {(registrationStep === 1 || registrationStep === 0) && <PhoneCodeVerification />}
      </div>
      <Button type="link">*Инструкция по регистрации</Button>
    </div>
  );
  
};

export default AuthRegForm;
