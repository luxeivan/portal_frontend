import React, { useState, useEffect } from "react";

import { Form, Button, message } from "antd";
import moment from "moment";

import useAuth from "../../../stores/./useAuth";
import useRegistration from "../../.././stores/useRegistration";
import useSubjects from "../../../stores/Cabinet/useSubjects";

import { formItemLayout } from "../../.././components/configSizeForm";

import UploaderInput from "../../../components/FormComponents/UploaderInput";
import FullName from "../../../components/Subjects/FullName";
import ConfirmationDocument from "../../../components/Subjects/ConfirmationDocument";
import Snils from "../../../components/Subjects/Snils";
import Contacts from "../../../components/Subjects/Contacts";
import AddressRegistration from "../../../components/Subjects/AddressRegistration";
import AddressResidential from "../../../components/Subjects/AddressResidential";
import NewForm from "../../../components/Subjects/NewForm";

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
  //console.log(value)
  const onFinish = async (values) => {
    console.log(values);

    const addressRegistration = {
      fias: {
        fullAddress: values.fullAddressRegistration,
        fiasId: values.fiasIdRegistration,
      },
    };

    const addressResidential = {
      fias: {
        fullAddress: values.fullAddressResidential,
        fiasId: values.fiasIdResidential,
      },
    };

    const formData = {
      type: "Физическое лицо",
      firstname: values.firstname,
      lastname: values.lastname,
      secondname: values.secondname,
      snils: values.snils,
      typeDoc: values.typeDoc,
      serialPassport: values.serialPassport,
      numberPassport: values.numberPassport,
      kodPodrazdelenia: values.kodPodrazdelenia,
      kemVidan: values.kemVidan,
      dateIssue: values.dateIssue,
      typeOtherDoc: values.typeOtherDoc,
      recvizityOthetDoc: values.recvizityOthetDoc,
      kemVidanOthetDoc: values.kemVidanOthetDoc,
      dateIssueOthetDoc: values.dateIssueOthetDoc,
      fileDoc: values.fileDoc,
      addressRegistration,
      addressResidential,
      phone: values.phone,
      email: values.email,
    };
    console.log(formData);

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
    // <Form
    //   form={form}
    //   {...formItemLayout}
    //   onFinish={onFinish}
    //   initialValues={{
    //     phone: userPhone || "",
    //     email: userEmail || "",
    //     dateIssue: value.dateIssue
    //       ? moment(value.dateIssue, "DD.MM.YYYY")
    //       : null,
    //     dateIssueOthetDoc: value.dateIssueOthetDoc
    //       ? moment(value.dateIssueOthetDoc, "DD.MM.YYYY")
    //       : null,
    //     typeDoc: "Паспорт гражданина РФ",
    //   }}
    // >
    //   {/* _______ФИО_______ */}
    //   <FullName
    //     read={read}
    //     value={{
    //       firstname: value.firstname,
    //       lastname: value.lastname,
    //       secondname: value.secondname,
    //     }}
    //   />
    //   {/* _______Подтверждающий документ_______ */}
    //   <ConfirmationDocument
    //     read={read}
    //     value={{
    //       typeDoc: value.typeDoc,
    //       serialPassport: value.passport?.serialPassport,
    //       numberPassport: value.passport?.numberPassport,
    //       kodPodrazdelenia: value.passport?.kodPodrazdelenia,
    //       kemVidan: value.passport?.kemVidan,
    //       dateIssue: value.passport?.dateIssue,
    //       typeOtherDoc: value.otherDoc?.typeOtherDoc,
    //       recvizityOthetDoc: value.otherDoc?.recvizityOthetDoc,
    //       kemVidanOthetDoc: value.otherDoc?.kemVidanOthetDoc,
    //       dateIssueOthetDoc: value.otherDoc?.dateIssueOthetDoc,
    //     }}
    //     form={form}
    //   />
    //   {/* _______Блок с адресами_______ */}
    //   <AddressRegistration
    //     read={read}
    //     form={form}
    //     value={value.addressRegistration}
    //   />
    //   <AddressResidential
    //     read={read}
    //     form={form}
    //     value={value.addressResidential}
    //   />
    //   {/* _______Загрузка_______ */}
    //   <UploaderInput
    //     read={read}
    //     fileList={fileList}
    //     onChange={({ fileList: newFileList }) => setFileList(newFileList)}
    //     form={form}
    //     value={{
    //       fileDoc: value?.fileDoc,
    //     }}
    //   />
    //   {/* _______СНИЛС_______ */}
    //   <Snils
    //     read={read}
    //     form={form}
    //     value={{
    //       snils: value.snils,
    //     }}
    //   />

    //   {/* _______Блок с телефоном и почтой_______ */}
    //   <Contacts
    //     read={read}
    //     form={form}
    //     value={{
    //       phone: value.phone,
    //       email: value.email,
    //     }}
    //   />

    //   {/* _______Кнопка отправки формы_______ */}
    //   {!read && (
    //     <Form.Item>
    //       <Button type="primary" onClick={() => form.submit()}>
    //         Добавить
    //       </Button>
    //     </Form.Item>
    //   )}
    // </Form>
    
      
      <NewForm  setShowModal={setShowModalAdd}/>
    
  );
}