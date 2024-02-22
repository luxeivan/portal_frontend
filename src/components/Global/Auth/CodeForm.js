// import React from "react";
// import { Button, Form, Input } from "antd";

// const onFinish = (values) => {
//   console.log("Success:", values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

// export default function CodeForm() {
//   return (
//     <Form
//       name="basic"
//       labelCol={{
//         span: 8,
//       }}
//       wrapperCol={{
//         span: 16,
//       }}
//       style={{
//         maxWidth: 600,
//       }}
//       initialValues={{
//         remember: true,
//       }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       autoComplete="off"
//     >
//       <Form.Item></Form.Item>

//       <Form.Item
//         label="Код подтверждения"
//         name="email"
//         rules={[
//           {
//             required: true,
//             message: "Please input your username!",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         wrapperCol={{
//           offset: 8,
//           span: 16,
//         }}
//       >
//         <Button type="primary" htmlType="submit">
//           Отправить код
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// }


// Вторая часть рабочая
// import React from "react";
// import { Button, Form, Input } from "antd";
// import useStore from "../../../stores/GlobalStore";

// const onFinish = (values) => {
//   console.log("Success:", values);
// };

// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };

// export default function CodeForm() {
//   const { login, global: { email, password } } = useStore();
//   const onFinish = (values) => {
//     login(email, password, values.pincode);
//   };

//   return (
//     <Form
//       name="basic"
//       labelCol={{
//         span: 8,
//       }}
//       wrapperCol={{
//         span: 16,
//       }}
//       style={{
//         maxWidth: 600,
//       }}
//       initialValues={{
//         remember: true,
//       }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       autoComplete="off"
//     >
//       <Form.Item></Form.Item>

//       <Form.Item
//         label="Код подтверждения"
//         name="email"
//         rules={[
//           {
//             required: true,
//             message: "Please input your username!",
//           },
//         ]}
//       >
//         <Input />
//       </Form.Item>

//       <Form.Item
//         wrapperCol={{
//           offset: 8,
//           span: 16,
//         }}
//       >
//         <Button type="primary" htmlType="submit">
//           Отправить код
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// }

import React from "react";
import { Button, Form, Input, notification } from "antd";
import useStore from "../../../stores/GlobalStore";

export default function CodeForm() {
  const { login, global: { email, password } } = useStore();
  const onFinish = (values) => {
    login(email, password, values.pincode);
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: 'Ошибка ввода кода',
      description: errorInfo.errorFields.map(field => field.errors).join(' '),
    });
  };

  return (
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
      <Form.Item></Form.Item>

      <Form.Item
        label="Код подтверждения"
        name="pincode"
        rules={[
          {
            required: true,
            message: "Введите код подтверждения",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Отправить код
        </Button>
      </Form.Item>
    </Form>
  );
}
