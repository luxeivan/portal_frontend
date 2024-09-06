import React, { useState } from "react";
import { Modal, Form, Input, message, Typography, Button } from "antd";
import PhoneCodeVerification from "../../../components/Global/Auth/Registration/Step_1/PhoneCodeVerification";
import useRegistration from "../../../stores/useRegistration"; // Используем стор регистрации для отправки СМС

const { Paragraph } = Typography;

// Модалка для изменения телефона с кодом подтверждения
export const PhoneModal = ({ isVisible, onCancel, onSubmit, form }) => {
  const [codeRequested, setCodeRequested] = useState(false);
  const { submitPhone, setCodeRequested: setRegistrationCodeRequested } =
    useRegistration();

  const handleRequestCode = async () => {
    try {
      const values = await form.validateFields(["phone"]);
      await submitPhone(values.phone);
      setCodeRequested(true);
      setRegistrationCodeRequested(true); // Активируем состояние для запроса кода
      message.info("Код подтверждения отправлен на указанный номер");
    } catch (error) {
      message.error("Ошибка при отправке кода подтверждения");
    }
  };

  return (
    <Modal
      title="Изменить номер телефона"
      visible={isVisible}
      onOk={onSubmit}
      onCancel={onCancel}
      okText="Сохранить"
      cancelText="Назад"
      footer={null}
    >
      <Form form={form} onFinish={onSubmit}>
        <Form.Item
          label="Новый номер телефона"
          name="phone"
          rules={[
            {
              required: true,
              message: "Это поле обязательно",
            },
          ]}
        >
          <Input placeholder="79999999999" />
        </Form.Item>
        {!codeRequested && (
          <Button onClick={handleRequestCode}>
            Отправить код подтверждения
          </Button>
        )}
        {codeRequested && <PhoneCodeVerification />}
      </Form>
    </Modal>
  );
};

// Валидация для паролей
const validatePasswordsMatch = ({ getFieldValue }) => ({
  validator(_, value) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Пароли не совпадают"));
  },
});

// Модалка для изменения пароля с кодом подтверждения
export const PasswordModal = ({ isVisible, onCancel, onSubmit, form }) => {
  const [codeRequested, setCodeRequested] = useState(false);
  const { submitPhone, setCodeRequested: setRegistrationCodeRequested } =
    useRegistration(); // Можно использовать ту же логику для отправки СМС

  const handleRequestCode = async () => {
    try {
      const phone = form.getFieldValue("phone");
      await submitPhone(phone); // Отправляем код на номер телефона
      setCodeRequested(true);
      setRegistrationCodeRequested(true); // Активируем состояние для запроса кода
      message.info("Код подтверждения отправлен на указанный номер телефона");
    } catch (error) {
      message.error("Ошибка при отправке кода подтверждения");
    }
  };

  return (
    <Modal
      title="Изменить пароль"
      visible={isVisible}
      onOk={onSubmit}
      onCancel={onCancel}
      okText="Сохранить"
      cancelText="Назад"
      footer={null}
    >
      <Form form={form} onFinish={onSubmit}>
        <Paragraph>
          Пароль должен содержать минимум 8 символов, заглавную букву, цифры,
          латинские буквы.
        </Paragraph>
        <Form.Item
          label="Новый пароль"
          name="password"
          rules={[
            {
              required: true,
              message: "Это поле обязательно",
            },
            {
              min: 8,
              message: "Минимальная длина пароля 8 символов",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Повторите пароль"
          name="repeat_password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Это поле обязательно",
            },
            validatePasswordsMatch,
          ]}
        >
          <Input.Password />
        </Form.Item>
        {!codeRequested && (
          <Button onClick={handleRequestCode}>
            Отправить код подтверждения
          </Button>
        )}
        {codeRequested && <PhoneCodeVerification />}
      </Form>
    </Modal>
  );
};

// import React, { useState } from "react";
// import { Modal, Form, Input, message, Typography, Button } from "antd";
// import PhoneCodeVerification from "../../../components/Global/Auth/Registration/Step_1/PhoneCodeVerification";

// const { Paragraph } = Typography;

// // Модалка для изменения телефона с кодом подтверждения
// export const PhoneModal = ({ isVisible, onCancel, onSubmit, form }) => {
//   const [codeRequested, setCodeRequested] = useState(false);

//   const handleRequestCode = () => {
//     // Логика отправки кода подтверждения на новый номер телефона
//     setCodeRequested(true);
//     message.info("Код подтверждения отправлен на указанный номер");
//   };

//   return (
//     <Modal
//       title="Изменить номер телефона"
//       visible={isVisible}
//       onOk={onSubmit}
//       onCancel={onCancel}
//       okText="Сохранить"
//       cancelText="Назад"
//       footer={null}
//     >
//       <Form form={form} onFinish={onSubmit}>
//         <Form.Item
//           label="Новый номер телефона"
//           name="phone"
//           rules={[
//             {
//               required: true,
//               message: "Это поле обязательно",
//             },
//           ]}
//         >
//           <Input placeholder="79999999999" />
//         </Form.Item>
//         {!codeRequested && (
//           <Button onClick={handleRequestCode}>
//             Отправить код подтверждения
//           </Button>
//         )}
//         {codeRequested && <PhoneCodeVerification />}
//       </Form>
//     </Modal>
//   );
// };

// // Валидация для паролей
// const validatePasswordsMatch = ({ getFieldValue }) => ({
//   validator(_, value) {
//     if (!value || getFieldValue("password") === value) {
//       return Promise.resolve();
//     }
//     return Promise.reject(new Error("Пароли не совпадают"));
//   },
// });

// // Модалка для изменения пароля с кодом подтверждения
// export const PasswordModal = ({ isVisible, onCancel, onSubmit, form }) => {
//   const [codeRequested, setCodeRequested] = useState(false);

//   const handleRequestCode = () => {
//     // Логика отправки кода подтверждения на номер телефона
//     setCodeRequested(true);
//     message.info("Код подтверждения отправлен на указанный номер телефона");
//   };

//   return (
//     <Modal
//       title="Изменить пароль"
//       visible={isVisible}
//       onOk={onSubmit}
//       onCancel={onCancel}
//       okText="Сохранить"
//       cancelText="Назад"
//       footer={null}
//     >
//       <Form form={form} onFinish={onSubmit}>
//         <Paragraph>
//           Пароль должен содержать минимум 8 символов, заглавную букву, цифры,
//           латинские буквы.
//         </Paragraph>
//         <Form.Item
//           label="Новый пароль"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Это поле обязательно",
//             },
//             {
//               min: 8,
//               message: "Минимальная длина пароля 8 символов",
//             },
//           ]}
//         >
//           <Input.Password />
//         </Form.Item>
//         <Form.Item
//           label="Повторите пароль"
//           name="repeat_password"
//           dependencies={["password"]}
//           rules={[
//             {
//               required: true,
//               message: "Это поле обязательно",
//             },
//             validatePasswordsMatch,
//           ]}
//         >
//           <Input.Password />
//         </Form.Item>
//         {!codeRequested && (
//           <Button onClick={handleRequestCode}>
//             Отправить код подтверждения
//           </Button>
//         )}
//         {codeRequested && <PhoneCodeVerification />}
//       </Form>
//     </Modal>
//   );
// };
