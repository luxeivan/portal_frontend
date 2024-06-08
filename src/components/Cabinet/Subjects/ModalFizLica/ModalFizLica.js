import { Modal, Form } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useSubjects from "../../../../stores/Cabinet/useSubjects";
import NewForm from "../../../NewForm";
import fieldsJson from "./FormFizLica.json";
import moment from "moment";
import { useEffect } from "react";
const { confirm } = Modal;

export default function ModalFizLica({ setShowModal, read = false, value = {}, }) {
  const showModalAdd = useSubjects((state) => state.showModalAdd);
  const showModalView = useSubjects((state) => state.showModalView);
  const [form] = Form.useForm();
  const deleteSubjectItem = useSubjects((store) => store.deleteSubjectItem);
  const submitNewSubject = useSubjects((store) => store.submitNewSubject);
  useEffect(()=>{
    form.resetFields()
  },[showModalAdd,showModalView])
  const handlerDelete = (id) => {
    confirm({
      title: "Вы уверены что хотите удалить субъект?",
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
    obj.type = "Физическое лицо"
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
