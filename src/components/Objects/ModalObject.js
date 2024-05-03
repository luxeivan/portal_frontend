import { Modal, Form } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useObject from "../../stores/Cabinet/useObject";
import NewForm from "../Subjects/NewForm";
import fieldsJson from "./FormObject.json";
import moment from "moment";
import { useEffect } from "react";
const { confirm } = Modal;

export default function ModalObject({ setShowModal, read = false, value = {}, }) {
  const showModalAdd = useObject((state) => state.showModalAdd);
  const showModalView = useObject((state) => state.showModalView);
  const [form] = Form.useForm();
  const deleteSubjectItem = useObject((store) => store.deleteSubjectItem);
  const submitNewSubject = useObject((store) => store.submitNewSubject);
  useEffect(()=>{
    form.resetFields()
  },[showModalAdd,showModalView])
  const handlerDelete = (id) => {
    confirm({
      title: "Вы уверены что хотите удалить объект?",
      icon: <ExclamationCircleFilled />,
      okText: "Да",
      okType: "danger",
      cancelText: "Нет",
      onOk() {
       // console.log("del", id);
       setShowModal(false);
       deleteSubjectItem(id);
      },
      onCancel() {
        // console.log("Cancel");
      },
    });
  };
  const handlerEdit = (id) => {
     console.log("Обновить",id);
     console.log(form.getFieldValue());
  }
  

  const handlerSubmitForm = (event) => {
    //console.log(event)
    let list = fieldsJson.filter(item => item.type !== "divider")
    const obj = {}
    list.forEach(item => {
      obj[item.name] = event[item.name]
    });
    if (event.matchedWith) {
      obj.addressResidential = obj.addressRegistration
    }
    obj.confirmationDocument.dateIssue = obj.confirmationDocument.dateIssue?.format('DD.MM.YYYY')
    obj.confirmationDocument.dateIssueOtherDoc = obj.confirmationDocument.dateIssueOtherDoc?.format('DD.MM.YYYY')
    obj.type = "Объект"
    console.log(obj)
    submitNewSubject(obj)
    setShowModal(false);
  }
  return (
    <NewForm
      form={form}
      handlerSubmitForm={handlerSubmitForm}
      handlerDelete={handlerDelete}
      handlerEdit={handlerEdit}
      fields={fieldsJson}
      read={read}
      setShowModal={setShowModal}
      value={{ ...value?.attributes?.counterparty[0], id: value.id }}
    />
  );
}
