// import React from "react";
// import { Button, Form, Input, Alert } from "antd";
// // import sha256 from "crypto-js/sha256";
// import useStore from "../../../stores/GlobalStore";

// export default function AuthLoginForm() {
//   const {
//     login,
//     global: { loginError },
//   } = useStore();

//   const onFinish = (values) => {
//     login(values.email, values.password);
//     // Ниже потом раскоментить, если сделаем хэш на регистрации, а выше законменить
//     // const passwordHash = sha256(values.password).toString();
//     // login(values.email, passwordHash);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <>
//       {loginError && (
//         <Alert
//           message={loginError}
//           type="error"
//           showIcon
//           closable
//           onClose={() =>
//             useStore.setState({
//               global: { ...useStore.getState().global, loginError: "" },
//             })
//           }
//         />
//       )}
//       <Form
//         name="basic"
//         labelCol={{
//           span: 8,
//         }}
//         wrapperCol={{
//           span: 16,
//         }}
//         style={{
//           maxWidth: 600,
//         }}
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <Form.Item
//           label="Почта"
//           name="email"
//           rules={[
//             {
//               required: true,
//               message: "Это поля обязательно",
//             },
//             {
//               message: "Пожалуйста введите email",
//               type: "email",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Пароль"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Это поля обязательно",
//             },
//             {
//               min: 10,
//               message: "Минимальная длинна пароля 10 символов",
//             },
//           ]}
//         >
//           <Input.Password />
//         </Form.Item>
//         <Form.Item
//           wrapperCol={{
//             offset: 8,
//             span: 16,
//           }}
//         >
//           <Button type="primary" htmlType="submit">
//             Продолжить
//           </Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// }

import React from "react";
import { Button, Form, Input, Alert } from "antd";
import useStore from "../../../stores/GlobalStore";

export default function AuthLoginForm() {
  const {
    login,
    global: { loginError },
  } = useStore();

  const onFinish = async (values) => {
    try {
      useStore.setState({
        global: {
          ...useStore.getState().global,
          email: values.email,
          password: values.password,
        }
      });
      login(values.email, values.password);
    } catch (error) {
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {loginError && (
        <Alert
          message={loginError}
          type="error"
          showIcon
          closable
          onClose={() =>
            useStore.setState({
              global: { ...useStore.getState().global, loginError: "" },
            })
          }
        />
      )}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Почта"
          name="email"
          rules={[
            {
              required: true,
              message: "Это поля обязательно",
            },
            {
              message: "Пожалуйста введите email",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: "Это поля обязательно",
            },
            {
              min: 10,
              message: "Минимальная длинна пароля 10 символов",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Продолжить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

