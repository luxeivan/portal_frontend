
//ТУТ НУЖНА ВАНИНА ПОМОЩЬ (РАСКОМЕНТИ, РАЗЛОГИНЬСЯ НА САЙТЕ И ЗАПРОСИ КОД ПОДТВЕРЖДЕНИЯ, ДАЛЬШЕ БУДЕТ ОШИБКА, ВОТ КАК С НЕЙ ЖИТЬ - НЕПОНЯТНО)
// import React, { useRef } from "react";
// import { Form, Input, Typography } from "antd";
// import useAuth from "../../../../stores/useAuth";
// import styles from "./CodeForm.module.css";

// export default function CodeForm() {
//   const { verifyPincode } = useAuth();
//   const formRef = useRef(null);

//   const onFinish = (values) => {
//     const pincode = values.otp;
//     verifyPincode(pincode);
//   };

//   const handleChange = (value) => {
//     if (value.length === 4) {
//       formRef.current.submit();
//     }
//   };

//   return (
//     <>
//       <Typography.Text level={5}>Введите код из СМС:</Typography.Text>
//       <Form
//         name="codeForm"
//         onFinish={onFinish}
//         className={styles.codeFormContainer}
//       >
//         <Form.Item
//           name="otp"
//           rules={[
//             { required: true, message: "Пожалуйста, введите код из СМС" },
//           ]}
//         >
//           <Input.OTP
//             onChange={handleChange}
//             maxLength={4}
//             formatter={(str) => str.toUpperCase()}
//           />
//         </Form.Item>
//       </Form>
//     </>
//   );
// }

import React, { useRef } from "react";
import { Form, Input, Typography } from "antd";
import Title from "antd/es/typography/Title";
import useAuth from "../../../../stores/useAuth";
import styles from "./CodeForm.module.css";

export default function CodeForm() {
  const { verifyPincode } = useAuth();
  const formRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

  const onFinish = (values) => {
    const pincode = Object.values(values).join("");
    verifyPincode(pincode);
  };

  const handleInputChange = (e, nextRef) => {
    if (e.target.value.length === 1 && nextRef) {
      nextRef.current.focus();
    }
  };

  const handleInput4Change = (e) => {
    if (e.target.value.length === 1) {
      formRef.current.submit();
    }
  };

  return (
    <>
      {/* <Title level={5}>Сейчас Вам поступит телефонный звонок, отвечать на него не нужно.</Title> */}
      <Typography.Text level={5}>Введите код из СМС:</Typography.Text>
      <Form
        ref={formRef}
        name="codeForm"
        onFinish={onFinish}
        className={styles.codeFormContainer}
      >
              <Form.Item name="pin1" rules={[{ required: true }]}>
          <Input
            className={styles.codeInput}
            ref={inputRef1}
            maxLength={1}
            onChange={(e) => handleInputChange(e, inputRef2)}
          />
        </Form.Item>
        <Form.Item name="pin2" rules={[{ required: true }]}>
          <Input
            className={styles.codeInput}
            ref={inputRef2}
            maxLength={1}
            onChange={(e) => handleInputChange(e, inputRef3)}
          />
        </Form.Item>
        <Form.Item name="pin3" rules={[{ required: true }]}>
          <Input
            className={styles.codeInput}
            ref={inputRef3}
            maxLength={1}
            onChange={(e) => handleInputChange(e, inputRef4)}
          />
        </Form.Item>
        <Form.Item name="pin4" rules={[{ required: true }]}>
          <Input
            className={styles.codeInput}
            ref={inputRef4}
            maxLength={1}
            onChange={handleInput4Change}
          />
        </Form.Item>
      </Form>
    </>
  );
}
