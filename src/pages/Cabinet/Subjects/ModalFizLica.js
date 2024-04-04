import React, { useState, useEffect } from "react";

import { Form, Button, message } from "antd";

import useAuth from "../../../stores/./useAuth";
import useRegistration from "../../.././stores/useRegistration";
import useSubjects from "../../../stores/Cabinet/useSubjects";

import { formItemLayout } from "../../.././components/configSizeForm";

import Uploader from "../../../components/FormComponents/Uploader";
import FullName from "../../../components/Global/User/FullName";
import ConfirmationDocument from "../../../components/Global/User/ConfirmationDocument";
import Snils from "../../../components/Global/User/Snils";
import Contacts from "../../../components/Global/User/Contacts";
import AddressRegistration from "../../../components/Global/User/AddressRegistration";
import AddressResidential from "../../../components/Global/User/AddressResidential";

export default function ModalFizLica({ onSubmit, setShowModalAdd }) {
  const [searchText] = useState("");
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();
  const { submitNewSubject, debouncedFetchAddresses } = useSubjects();

  const onFinish = async (values) => {
    const formData = {
      type: "Физическое лицо",
      firstname: values.firstname,
      lastname: values.lastname,
      secondname: values.secondname,
      snils: values.snils.replace(/[^0-9]/g, ""),
      typeDoc: values.typedocuments,
      serialPassport: values.serialPassport,
      numberPassport: values.numberPassport,
      fileDoc: values.fileDoc,
      addressRegistration: values.addressRegistration,
      addressResidential: values.addressResidential,
      addressRegistrationFias: values.addressRegistrationFias,
      addressResidentialFias: values.addressResidentialFias,
    };

    try {
      await submitNewSubject(formData);
      message.success("Субъект успешно создан");
      form.resetFields();
      setShowModalAdd(false);
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Состояние авторизации пользователя
  const authState = useAuth((state) => ({
    phone: state.phone,
    email: state.email,
  }));

  // Состояние регистрации пользователя
  const registrationState = useRegistration((state) => ({
    phone: state.phone,
    email: state.email,
  }));

  useEffect(() => {
    debouncedFetchAddresses(searchText);
  }, [searchText, debouncedFetchAddresses]);

  const userPhone = authState.phone || registrationState.phone;
  const userEmail = authState.email || registrationState.email;

  return (
    <Form
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        phone: userPhone,
        email: userEmail,
        typedocuments: "passport",
      }}
    >
      {/* _______ФИО_______ */}
      <FullName />
      {/* _______Подтверждающий документ_______ */}
      <ConfirmationDocument form={form} />
      {/* _______Блок с адресами_______ */}
      <AddressRegistration form={form} />
      <AddressResidential form={form} />
      {/* _______Загрузка_______ */}
      <Uploader
        fileList={fileList}
        onChange={({ fileList: newFileList }) => setFileList(newFileList)}
        form={form}
      />
      {/* _______СНИЛС_______ */}
      <Snils form={form} />

      {/* _______Блок с телефоном и почтой_______ */}
      <Contacts form={form} />

      {/* _______Кнопка отправки формы_______ */}
      <Form.Item>
        <Button type="primary" onClick={() => form.submit()}>
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
}
