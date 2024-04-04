import React from "react";

import { Input, Form, Divider } from "antd";
import TextInput from "../../FormComponents/TextInput";

export default function Contacts({ form }) {
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(
      /^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2}).*/,
      "+$1 ($2) $3-$4-$5"
    );
    value = value.substring(0, 18);
    form.setFieldsValue({ phone: value });
  };

  const handleEmailChange = (e) => {
    console.log("Новый email:", e.target.value);
  };

  return (
    <>
      <Divider orientation="center">Другое</Divider>
      {/* _______Телефон_______ */}


      <Form.Item
        label="Мобильный телефон"
        name="phone"
        rules={[{ required: true, message: "Введите номер телефона" }]}
      >
        <Input
          onChange={handlePhoneChange}
          placeholder="Начните вводить номер с цифры 7..."
          maxLength={18}
        />
      </Form.Item>
      {/* _______Почта_______ */}
      <Form.Item
        label="Электронная почта"
        name="email"
        rules={[
          { required: true, message: "Введите email" },
          {
            type: "email",
            message: "Пожалуйста, введите корректный email",
          },
        ]}
      >
        <Input onChange={handleEmailChange} placeholder="ivanov@yandex.ru" />
      </Form.Item>
    </>
  );
}


// import React from "react";
// import { Divider } from "antd";
// import TextInput from "../../FormComponents/TextInput";

// export default function Contacts({ form }) {

//   // Функция для форматирования номера телефона
//   const formatPhoneValue = (value) => {
//     let newValue = value.replace(/\D/g, "");
//     if (newValue.length > 1) {
//       newValue = newValue.replace(/^8/, "7");
//     }
//     newValue = newValue.replace(
//       /^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2}).*/,
//       "+$1 ($2) $3-$4-$5"
//     );
//     newValue = newValue.substring(0, 18);
//     return newValue;
//   };

//   // Правило валидации номера телефона
//   const phoneValidationRule = {
//     validator(_, value) {
//       if (!value || /^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)) {
//         return Promise.resolve();
//       }
//       return Promise.reject(new Error('Введите номер в формате +7 (999) 999-99-99'));
//     }
//   };

//   // Функция для изменения номера телефона
//   const handlePhoneChange = (e) => {
//     const formattedValue = formatPhoneValue(e.target.value);
//     form.setFieldsValue({ phone: formattedValue });
//   };

//   // Функция для изменения email
//   const handleEmailChange = (e) => {
//     // В данном случае просто выводим в консоль новое значение
//     console.log("Новый email:", e.target.value);
//   };

//   return (
//     <>
//       <Divider orientation="center">Контакты</Divider>

//       {/* Мобильный телефон */}
//       <TextInput
//         displayName="Мобильный телефон"
//         name="phone"
//         required={true}
//         shortDescription="Начните вводить номер с цифры 7..."
//         inputProps={{
//           onChange: handlePhoneChange,
//           maxLength: 18,
//         }}
//         rules={[
//           { required: true, message: "Введите номер телефона" },
//           phoneValidationRule
//         ]}
//       />

//       {/* Электронная почта */}
//       <TextInput
//         displayName="Электронная почта"
//         name="email"
//         required={true}
//         shortDescription="ivanov@yandex.ru"
//         inputProps={{
//           onChange: handleEmailChange,
//         }}
//         rules={[
//           { required: true, message: "Введите email" },
//           {
//             type: "email",
//             message: "Пожалуйста, введите корректный email",
//           },
//         ]}
//       />
//     </>
//   );
// }


// import React from "react";

// import { Input, Form, Divider } from "antd";
// import TextInput from "../../FormComponents/TextInput";

// export default function Contacts({ form }) {
//   const handlePhoneChange = (e) => {
//     let value = e.target.value.replace(/\D/g, "");
//     value = value.replace(
//       /^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2}).*/,
//       "+$1 ($2) $3-$4-$5"
//     );
//     value = value.substring(0, 18);
//     form.setFieldsValue({ phone: value });
//   };

//   const handleEmailChange = (e) => {
//     console.log("Новый email:", e.target.value);
//   };

//   return (
//     <>
//       <Divider orientation="center">Контакты</Divider>
//       <TextInput
//         displayName="Мобильный телефон"
//         name="phone"
//         required={true}
//         shortDescription="Начните вводить номер с цифры 7..."
//         inputProps={{
//           maxLength: 18,
//           onChange: (e) => {
//             let value = e.target.value.replace(/\D/g, "");
//             value = value.replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2}).*/, "+$1 ($2) $3-$4-$5");
//             value = value.substring(0, 18);
//             form.setFieldsValue({ phone: value });
//           }
//         }}
//         rules={[
//           {
//             required: true,
//             message: "Введите номер телефона",
//           },
//           () => ({
//             validator(_, value) {
//               if (!value || /^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)) {
//                 return Promise.resolve();
//               }
//               return Promise.reject(new Error('Введите номер в формате +7 (999) 999-99-99'));
//             }
//           }),
//         ]}
//       />
//       <TextInput
//         displayName="Электронная почта"
//         name="email"
//         required={true}
//         shortDescription="ivanov@yandex.ru"
//         rules={[
//           {
//             required: true,
//             message: "Введите email",
//           },
//           {
//             type: "email",
//             message: "Введите корректный email",
//           },
//         ]}
//       />
//     </>
//     // <>
//     //   <Divider orientation="center">Другое</Divider>
//     //   {/* _______Телефон_______ */}


//     //   <Form.Item
//     //     label="Мобильный телефон"
//     //     name="phone"
//     //     rules={[{ required: true, message: "Введите номер телефона" }]}
//     //   >
//     //     <Input
//     //       onChange={handlePhoneChange}
//     //       placeholder="Начните вводить номер с цифры 7..."
//     //       maxLength={18}
//     //     />
//     //   </Form.Item>
//     //   {/* _______Почта_______ */}
//     //   <Form.Item
//     //     label="Электронная почта"
//     //     name="email"
//     //     rules={[
//     //       { required: true, message: "Введите email" },
//     //       {
//     //         type: "email",
//     //         message: "Пожалуйста, введите корректный email",
//     //       },
//     //     ]}
//     //   >
//     //     <Input onChange={handleEmailChange} placeholder="ivanov@yandex.ru" />
//     //   </Form.Item>
//     // </>
//   );
// }

