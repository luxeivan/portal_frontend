import React, { useRef } from "react";
import { Form, Input, Button, Typography } from "antd";
import Title from "antd/es/typography/Title";
import useRegistration from "../../../../../stores/useRegistration";
import styles from "./PhoneCodeVerification.module.css"; 

const PhoneCodeVerification = () => {
  const { submitPhoneCode } = useRegistration();
  const formRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);

  const onFinish = (values) => {
    const phoneCode = Object.values(values).join('');
    submitPhoneCode(phoneCode);
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
      onFinish={onFinish}
      className={styles.codeFormContainer}
      >
      <Form.Item
        name="pin1"
        rules={[{ required: true, message: "Цифра 1" }]}
        >
        <Input
          className={styles.codeInput}
          ref={inputRef1}
          maxLength={1}
          onChange={(e) => handleInputChange(e, inputRef2)}
          />
      </Form.Item>
      <Form.Item
        name="pin2"
        rules={[{ required: true, message: "Цифра 2" }]}
        >
        <Input
          className={styles.codeInput}
          ref={inputRef2}
          maxLength={1}
          onChange={(e) => handleInputChange(e, inputRef3)}
          />
      </Form.Item>
      <Form.Item
        name="pin3"
        rules={[{ required: true, message: "Цифра 3" }]}
        >
        <Input
          className={styles.codeInput}
          ref={inputRef3}
          maxLength={1}
          onChange={(e) => handleInputChange(e, inputRef4)}
          />
      </Form.Item>
      <Form.Item
        name="pin4"
        rules={[{ required: true, message: "Цифра 4" }]}
        >
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
};

export default PhoneCodeVerification;


// import React from "react";
// import { Form, Input, Button, Typography } from "antd";
// import useRegistration from "../../../../../stores/useRegistration";
// import Title from "antd/es/typography/Title";
// import { formItemLayout, tailFormItemLayout } from '../../../../../components/configSizeForm'

// const { Paragraph } = Typography;

// const PhoneCodeVerification = () => {
  //   const submitPhoneCode = useRegistration((state) => state.submitPhoneCode);
  
  //   const onFinish = (values) => {
    //     submitPhoneCode(values.phoneCode);
    //   };

//   return (
//     <Form
//       {...formItemLayout}
//       onFinish={onFinish}
//     >

//       <Title level={5}>Сейчас Вам поступит телефонный звонок, отвечать на него не нужно.</Title>
//       <Form.Item
//       label="Код подтверждения"
//         name="phoneCode"
//         rules={[{ required: true, message: "Пожалуйста, введите пин-код!" }, { min: 4, max: 4, message: "4 цифры" }]}
//       >
//         <Input placeholder="Введите последние 4-е цифры" />
//       </Form.Item>
//       <Form.Item
//         {...tailFormItemLayout}>
//         <Button type="primary" htmlType="submit">
//           Продолжить
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default PhoneCodeVerification;
