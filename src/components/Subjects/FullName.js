import React from "react";
import { Divider, Typography } from "antd";
import TextInput from "../FormComponents/TextInput";

export default function FullName({ read, edit, value }) {
  return (
    <>
      <Divider orientation="center">ФИО</Divider>
      <TextInput
        read={read}
        edit={edit}
        value={value?.lastname}
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
        read={read}
        edit={edit}
        value={value?.firstname}
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
        read={read}
        edit={edit}
        value={value?.secondname}
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
