import React, { useState, useEffect } from "react";
import { Form, Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons';
import useSubjects from "../../../stores/Cabinet/useSubjects";
import NewForm from "../../../components/Subjects/NewForm";
import fieldsFizLica from "./FormFizLica.json";
const { confirm } = Modal;

export default function ModalFizLica({
  onSubmit,
  setShowModal,
  read = false,
  value = {},
}) {
  const deleteSubjectItem = useSubjects(store => store.deleteSubjectItem)
  const handlerDelete = (id) => {
    confirm({
      title: 'Вы уверены что хотите удалить субъект?',
      icon: <ExclamationCircleFilled />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk() {
        console.log('del', id)
        setShowModal(false)
        deleteSubjectItem(id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    // console.log('del', id)
    // setShowModal(false)
    // deleteSubjectItem(id)
  }
  //console.log(value)
  // let fields = fieldsFizLica
  // if (value.attributes.type === "Физическое лицо") {
  //   fields = fieldsFizLica
  // } else if ((value.attributes.type === "Юридическое лицо")) {
  //   fields = fieldsFizLica
  // } else if ((value.attributes.type === "Индивидуальный предприниматель")) {
  //   fields = fieldsFizLica
  // }
  // const [searchText] = useState("");
  // const form = Form.useForm();
  // const { submitNewSubject, debouncedFetchAddresses } = useSubjects();

  // useEffect(() => {
  //   debouncedFetchAddresses(searchText);
  // }, [searchText, debouncedFetchAddresses]);

  return (
    <NewForm
      handlerDelete={handlerDelete}
      // form={form}
      fields={fieldsFizLica}
      read={read}
      setShowModal={setShowModal}
      value={{ ...value?.attributes?.counterparty[0], id: value.id }}
    />
  );
}
