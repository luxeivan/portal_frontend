// import React, { useState } from "react";
// import { Button, Form, Typography } from "antd";
// import useRegistration from"../../../../../../stores/useRegistration"
// import InputMask from "react-input-mask";
// import PhoneCodeVerification from "../PhoneCodeVerification";

// const { Paragraph } = Typography;

// const PhoneVerification = () => {
//   const [form] = Form.useForm();
//   const { phone, setPhone, submitPhone, codeRequested, setCodeRequested } =
//     useRegistration((state) => ({
//       phone: state.phone,
//       setPhone: state.setPhone,
//       submitPhone: state.submitPhone,
//       codeRequested: state.codeRequested,
//       setCodeRequested: state.setCodeRequested,
//     }));
//   const [isPhoneValid, setIsPhoneValid] = useState(false);

//   const onFinish = async (values) => {
//     const formattedPhone = values.phone.replace(/[^\d]/g, "");
//     const result = await submitPhone(formattedPhone);
//     if (result === "ok") {
//       setCodeRequested(true);
//     }
//   };

//   const onPhoneChange = (event) => {
//     const value = event.target.value;
//     const isComplete = value.includes("_") ? false : true;
//     setIsPhoneValid(isComplete);
//     setPhone(value);
//   };

//   return (
//     <div>
//       <Form form={form} onFinish={onFinish}>
//         <Paragraph>
//           Укажите номер мобильного телефона в формате +7(XXX)XXX-XX-XX.
//         </Paragraph>
//         <Form.Item
//           name="phone"
//           rules={[
//             {
//               required: true,
//               message: "Пожалуйста, введите ваш номер телефона!",
//             },
//           ]}
//         >
//           {/* <PhoneOutlined /> */}
//           <InputMask
//             mask="+7(999)999-99-99"
//             value={phone}
//             onChange={onPhoneChange}
//             placeholder="+7(___)___-__-__"
//             className="ant-input"
//           />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" disabled={!isPhoneValid}>
//             Потвердить
//           </Button>
//         </Form.Item>
//       </Form>
//       {codeRequested && <PhoneCodeVerification />}
//     </div>
//   );
// };

// export default PhoneVerification;

//Второй рабочий вариант
// import React, { useState } from "react";
// import { Button, Form, Typography } from "antd";
// import useRegistration from "../../../../../../stores/useRegistration";
// import InputMask from "react-input-mask";
// import PhoneCodeVerification from "../PhoneCodeVerification";

// const { Paragraph } = Typography;

// const PhoneVerification = () => {
//   const [form] = Form.useForm();
//   const { phone, setPhone, submitPhone, codeRequested, setCodeRequested } =
//     useRegistration((state) => ({
//       phone: state.phone,
//       setPhone: state.setPhone,
//       submitPhone: state.submitPhone,
//       codeRequested: state.codeRequested,
//       setCodeRequested: state.setCodeRequested,
//     }));
//   const [isPhoneValid, setIsPhoneValid] = useState(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);

//   const onFinish = async (values) => {
//     setIsButtonDisabled(true);
//     const formattedPhone = values.phone.replace(/[^\d]/g, "");
//     await submitPhone(formattedPhone);

//   };

//   const onPhoneChange = (event) => {
//     const value = event.target.value;
//     const isComplete = value.includes("_") ? false : true;
//     setIsPhoneValid(isComplete);
//     setPhone(value);
//     if (isButtonDisabled && !isComplete) {
//       setIsButtonDisabled(false);
//     }
//   };

//   return (
//     <div>
//       <Form form={form} onFinish={onFinish}>
//         <Paragraph>
//           Укажите номер мобильного телефона в формате +7(XXX)XXX-XX-XX.
//         </Paragraph>
//         <Form.Item
//           name="phone"
//           rules={[
//             {
//               required: true,
//               message: "Пожалуйста, введите ваш номер телефона!",
//             },
//           ]}
//         >
//           <InputMask
//             mask="+7(999)999-99-99"
//             value={phone}
//             onChange={onPhoneChange}
//             placeholder="+7(___)___-__-__"
//             className="ant-input"
//           />
//         </Form.Item>
//         <Form.Item>
//           <Button 
//             type="primary" 
//             htmlType="submit" 
//             disabled={!isPhoneValid || isButtonDisabled}
//           >
//             Подтвердить
//           </Button>
//         </Form.Item>
//       </Form>
//       {codeRequested && <PhoneCodeVerification />}
//     </div>
//   );
// };

// export default PhoneVerification;

import React, { useState, useEffect } from "react";
import { Button, Form, Typography, Space } from "antd";
import useRegistration from "../../../../../../stores/useRegistration";
import InputMask from "react-input-mask";
import PhoneCodeVerification from "../PhoneCodeVerification";
import './PhoneVerification.module.css'; 

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
  const [timer, setTimer] = useState(0);
  const [buttonText, setButtonText] = useState("Подтвердить");

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (buttonText !== "Подтвердить") {
        setButtonText("Отправить код повторно");
      }
    }
    return () => clearInterval(interval);
  }, [timer, buttonText]);

  const onFinish = async (values) => {
    const formattedPhone = values.phone.replace(/[^\d]/g, "");
    setCodeRequested(false);
    await submitPhone(formattedPhone);
    setCodeRequested(true);
    setTimer(5);
    setButtonText("Подтвердить");
  };

  const onResendClick = () => {
    onFinish({ phone });
  };

  const onPhoneChange = (event) => {
    const value = event.target.value;
    const isComplete = !value.includes("_");
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
            {timer > 0 && (
              <span className="timer">{timer} сек.</span>
            )}
          </Space>
        </Form.Item>
      </Form>
      {codeRequested && <PhoneCodeVerification />}
    </div>
  );
};

export default PhoneVerification;
