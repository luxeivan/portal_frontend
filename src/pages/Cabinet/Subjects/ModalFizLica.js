import React, { useState, useEffect } from "react";

import { Form, Button, message } from "antd";
import moment from "moment";

import useAuth from "../../../stores/./useAuth";
import useRegistration from "../../.././stores/useRegistration";
import useSubjects from "../../../stores/Cabinet/useSubjects";

import { formItemLayout } from "../../.././components/configSizeForm";

import Uploader from "../../../components/FormComponents/Uploader";
import FullName from "../../../components/Subjects/FullName";
import ConfirmationDocument from "../../../components/Subjects/ConfirmationDocument";
import Snils from "../../../components/Subjects/Snils";
import Contacts from "../../../components/Subjects/Contacts";
import AddressRegistration from "../../../components/Subjects/AddressRegistration";
import AddressResidential from "../../../components/Subjects/AddressResidential";

export default function ModalFizLica({
  onSubmit,
  setShowModalAdd,
  read = false,
  value = {},
}) {
  const [searchText] = useState("");
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();
  const { submitNewSubject, debouncedFetchAddresses } = useSubjects();

  const onFinish = async (values) => {
    console.log(values);
    const formData = {
      type: "Физическое лицо",
      firstname: values.firstname,
      lastname: values.lastname,
      secondname: values.secondname,
      snils: values.snils.replace(/[^0-9]/g, ""),
      typeDoc: values.typeDoc,
      serialPassport: values.serialPassport,
      numberPassport: values.numberPassport,
      kodPodrazdelenia: values.kodPodrazdelenia,
      kemVidan: values.kemVidan,
      dateIssue: values.dateIssue,
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
        // typeDoc: "passport",
        dateIssue: value.dateIssue
          ? moment(value.dateIssue, "DD.MM.YYYY")
          : null,
        typeDoc: "Паспорт гражданина РФ",
        date: moment('01.04.2024', 'DD.MM.YYYY'),
      }}
    >
      {/* _______ФИО_______ */}
      <FullName
        read={read}
        value={{
          firstname: value.firstname,
          lastname: value.lastname,
          secondname: value.secondname,
        }}
      />
      {/* _______Подтверждающий документ_______ */}
      <ConfirmationDocument
        read={read}
        value={{
          typeDoc: value.typeDoc,
          serialPassport: value.passport?.serialPassport,
          numberPassport: value.passport?.numberPassport,
          kodPodrazdelenia: value.passport?.kodPodrazdelenia,
          kemVidan: value.passport?.kemVidan,
          dateIssue: value.passport?.dateIssue,
        }}
        form={form}
      />
      {/* _______Блок с адресами_______ */}
      <AddressRegistration read={read} form={form} />
      <AddressResidential read={read} form={form} />
      {/* _______Загрузка_______ */}
      <Uploader
        read={read}
        fileList={fileList}
        onChange={({ fileList: newFileList }) => setFileList(newFileList)}
        form={form}
      />
      {/* _______СНИЛС_______ */}
      <Snils read={read} form={form} />

      {/* _______Блок с телефоном и почтой_______ */}
      <Contacts read={read} form={form} />

      {/* _______Кнопка отправки формы_______ */}
      <Form.Item>
        <Button type="primary" onClick={() => form.submit()}>
          Добавить
        </Button>
      </Form.Item>
    </Form>
  );
}
