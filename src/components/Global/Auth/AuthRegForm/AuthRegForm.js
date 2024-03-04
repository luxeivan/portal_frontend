// import React from "react";
// import { Steps } from "antd";
// import useRegistration from "../../../../stores/useRegistration";
// import PhoneVerification from "../PhoneVerification/PhoneVerification";
// import PhoneCodeVerification from "../PhoneCodeVerification";

// const { Step } = Steps;

// const AuthRegForm = () => {
//   const { registrationStep, phoneSubmitted } = useRegistration((state) => ({
//     registrationStep: state.registrationStep,
//     phoneSubmitted: state.phoneSubmitted,
//   }));

//   return (
//     <div>
//       <Steps current={registrationStep}>
//         <Step title="Номер телефона" />
//         <Step title="Почта" />
//         <Step title="Пароль" />
//       </Steps>
//       {registrationStep === 0 && !phoneSubmitted && <PhoneVerification />}
//       {registrationStep === 0 && phoneSubmitted && <PhoneCodeVerification />}
//     </div>
//   );
// };

// export default AuthRegForm;

//Рабочий 2 вариант
// import React from "react";
// import { Steps, Button } from "antd";
// import useRegistration from "../../../../stores/useRegistration";
// import PhoneVerification from "../PhoneVerification/PhoneVerification";
// import PhoneCodeVerification from "../PhoneCodeVerification";

// const { Step } = Steps;

// const AuthRegForm = () => {
//   const { registrationStep, codeRequested } = useRegistration((state) => ({
//     registrationStep: state.registrationStep,
//     codeRequested: state.codeRequested,
//   }));

//   return (
//     <div>
//       <Steps current={registrationStep}>
//         <Step title="Номер телефона" />
//         <Step title="Почта" />
//         <Step title="Пароль" />
//       </Steps>
//       {registrationStep === 0 && !codeRequested && <PhoneVerification />}
//       {codeRequested && <PhoneCodeVerification />}
//       <Button type="link">*Инструкция по регистрации</Button>
//     </div>
//   );
// };

// export default AuthRegForm;

import React from "react";
import { Steps, Button } from "antd";
import useRegistration from "../../../../stores/useRegistration";
import PhoneVerification from "../PhoneVerification/PhoneVerification";
import PhoneCodeVerification from "../PhoneCodeVerification";
import EmailVerification from "../EmailVerification/EmailVerification";

const { Step } = Steps;

const AuthRegForm = () => {
  const { registrationStep, phoneVerified, codeRequested  } = useRegistration((state) => ({
    registrationStep: state.registrationStep,
    phoneVerified: state.phoneVerified,
    codeRequested: state.codeRequested,
  }));

  return (
    <div>
      <Steps current={registrationStep}>
        <Step title="Номер телефона" />
        <Step title="Почта" />
        <Step title="Пароль" />
      </Steps>
      {registrationStep === 0 && !codeRequested && <PhoneVerification />}
      {codeRequested && <PhoneCodeVerification />}
      {registrationStep === 1 && <EmailVerification />}
      <Button type="link">*Инструкция по регистрации</Button>
    </div>
  );
};


export default AuthRegForm;
