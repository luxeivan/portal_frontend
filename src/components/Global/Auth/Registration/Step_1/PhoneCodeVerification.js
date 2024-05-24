import React, { useEffect, useRef } from "react";
import { Form, Input, Typography } from "antd";
import useRegistration from "../../../../../stores/useRegistration";
import styles from "./PhoneCodeVerification.module.css";

const PhoneCodeVerification = () => {
  const { submitPhoneCode } = useRegistration();
  const formRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onFinish = (values) => {
    const phoneCode = values.otp;
    submitPhoneCode(phoneCode);
  };

  const handleChange = (value) => {
    if (value.length === 4) {
      formRef.current.submit();
    }
  };

  return (
    <>
      <Typography.Text level={5}>Введите код из СМС:</Typography.Text>
      <Form
        ref={formRef}
        name="phoneCodeForm"
        onFinish={onFinish}
        className={styles.codeFormContainer}
      >
        <Form.Item
          name="otp"
          rules={[
            { required: true, message: "Пожалуйста, введите код из СМС" },
          ]}
        >
          <Input.OTP
            ref={inputRef}
            onChange={handleChange}
            length={4}
            formatter={(str) => str.toUpperCase()}
            className={styles.codeInput}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default PhoneCodeVerification;


// import React, { useRef } from "react";
// import { Form, Input, Button, Typography } from "antd";
// import Title from "antd/es/typography/Title";
// import useRegistration from "../../../../../stores/useRegistration";
// import styles from "./PhoneCodeVerification.module.css"; 

// const PhoneCodeVerification = () => {
//   const { submitPhoneCode } = useRegistration();
//   const formRef = useRef(null);
//   const inputRef1 = useRef(null);
//   const inputRef2 = useRef(null);
//   const inputRef3 = useRef(null);
//   const inputRef4 = useRef(null);

//   const onFinish = (values) => {
//     const phoneCode = Object.values(values).join('');
//     submitPhoneCode(phoneCode);
//   };

//   const handleInputChange = (e, nextRef) => {
//     if (e.target.value.length === 1 && nextRef) {
//       nextRef.current.focus();
//     }
//   };

//   const handleInput4Change = (e) => {
//     if (e.target.value.length === 1) {
//       formRef.current.submit();
//     }
//   };

//   return (
//     <>
//     <Typography.Text level={5}>Введите код из СМС:</Typography.Text>
//     <Form
//       ref={formRef}
//       onFinish={onFinish}
//       className={styles.codeFormContainer}
//       >
//       <Form.Item
//         name="pin1"
//         rules={[{ required: true, message: "Цифра 1" }]}
//         >
//         <Input
//           className={styles.codeInput}
//           ref={inputRef1}
//           maxLength={1}
//           onChange={(e) => handleInputChange(e, inputRef2)}
//           />
//       </Form.Item>
//       <Form.Item
//         name="pin2"
//         rules={[{ required: true, message: "Цифра 2" }]}
//         >
//         <Input
//           className={styles.codeInput}
//           ref={inputRef2}
//           maxLength={1}
//           onChange={(e) => handleInputChange(e, inputRef3)}
//           />
//       </Form.Item>
//       <Form.Item
//         name="pin3"
//         rules={[{ required: true, message: "Цифра 3" }]}
//         >
//         <Input
//           className={styles.codeInput}
//           ref={inputRef3}
//           maxLength={1}
//           onChange={(e) => handleInputChange(e, inputRef4)}
//           />
//       </Form.Item>
//       <Form.Item
//         name="pin4"
//         rules={[{ required: true, message: "Цифра 4" }]}
//         >
//         <Input
//           className={styles.codeInput}
//           ref={inputRef4}
//           maxLength={1}
//           onChange={handleInput4Change}
//           />
//       </Form.Item>

//     </Form>
//   </>
//   );
// };

// export default PhoneCodeVerification;
