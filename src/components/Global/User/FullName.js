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
        rules={[
          {
            required: true,
            message: "", 
          },
        ]}
      />

      <TextInput
        displayName="Имя"
        name="firstname"
        required={true}
        shortDescription="Иван"
        description={["Введите ваше имя полностью"]}
        rules={[
          {
            required: true,
            message: "", 
          },
        ]}
      />

      <TextInput
        displayName="Отчество"
        name="secondname"
        shortDescription="Иванович"
        description={["Введите ваше отчество полностью (если имеется)"]}
        rules={[
          {
            required: true,
            message: "", 
          },
        ]}
      />
    </>
  );
}
