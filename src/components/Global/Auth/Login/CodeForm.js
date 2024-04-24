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
      <Title level={5}>Сейчас Вам поступит телефонный звонок, отвечать на него не нужно.</Title>
      <Typography.Text level={5}>Введите последние 4 цифры:</Typography.Text>
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

// import React from "react";
// import { Button, Form, Input, notification } from "antd";
// import useAuth from "../../../../stores/useAuth";
// import styles from './CodeForm.js.module.css'
// import Title from "antd/es/typography/Title";
// import { formItemLayout, tailFormItemLayout } from '../../../../components/configSizeForm'

// export default function CodeForm() {
//   const { verifyPincode } = useAuth();

//   const onFinish = (values) => {
//     verifyPincode(values.pincode)
//       .then(() => {
//         notification.success({
//           message: "Код подтверждения успешно проверен",
//         });
//       })
//       .catch((error) => {
//         notification.error({
//           message: "Ошибка ввода кода",
//           description: error.message,
//         });
//       });
//   };

//   const onFinishFailed = (errorInfo) => {
//     notification.error({
//       message: "Ошибка ввода кода",
//       description: errorInfo.errorFields
//         .map((field) => field.errors)
//         .join(", "),
//     });
//   };

//   return (
//     <Form
//       {...formItemLayout}
//       name="codeForm"
//       initialValues={{ remember: true }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       autoComplete="off"
//       className={styles.codeFormContainer}
//     >
//       <Title level={5}>Сейчас Вам поступит телефонный звонок, отвечать на него не нужно.</Title>
//       <Form.Item
//         label="Код подтверждения"
//         name="pincode"
//         rules={[{ required: true, message: "Введите код подтверждения" }]}
//         >
//         <Input placeholder="Введите последние 4 цифры" />
//       </Form.Item>

//       <Form.Item
//         {...tailFormItemLayout}
//       >
//         <Button type="primary" htmlType="submit" className={styles.sendCodeButton}>
//           Получить код
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// }
