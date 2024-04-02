import React from "react";
import { Divider } from "antd";
import TextInput from "../../FormComponents/TextInput"; 

export default function FullName() {
  return (
    <>
      <Divider orientation="center">ФИО</Divider>
      <TextInput
        displayName="Фамилия"
        name="lastname"
        required={true}
        shortDescription="Иванов"
        description={["Введите вашу фамилию полностью"]} 
      />

      <TextInput
        displayName="Имя"
        name="firstname"
        required={true}
        shortDescription="Иван"
        description={["Введите ваше имя полностью"]} 
      />

      <TextInput
        displayName="Отчество"
        name="secondname"
        shortDescription="Иванович"
        description={["Введите ваше отчество полностью (если имеется)"]} 
      />
    </>
  );
}

// import React from "react";
// import { Input, Form, Divider } from "antd";

// export default function FullName() {
//   return (
//     <>
//       <Divider orientation="center">ФИО</Divider>

//       {/* _______Фамилия_______ */}
//       <Form.Item
//         label="Фамилия"
//         name="lastname"
//         rules={[
//           {
//             required: true,
//             message: "Пожалуйста, введите вашу фамилию",
//           },
//         ]}
//       >
//         <Input placeholder="Иванов" />
//       </Form.Item>

//       {/* _______Имя_______ */}
//       <Form.Item
//         label="Имя"
//         name="firstname"
//         rules={[
//           {
//             required: true,
//             message: "Пожалуйста, введите ваше имя",
//           },
//         ]}
//       >
//         <Input placeholder="Иван" />
//       </Form.Item>

//       {/* _______Отчество_______ */}
//       <Form.Item label="Отчество" name="secondname">
//         <Input placeholder="Иванович" />
//       </Form.Item>
//     </>
//   );
// }
