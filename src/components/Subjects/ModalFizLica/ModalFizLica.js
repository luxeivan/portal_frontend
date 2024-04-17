import { Modal, Form } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useSubjects from "../../../stores/Cabinet/useSubjects";
import NewForm from "../NewForm";
import fieldsJson from "./FormFizLica.json";
const { confirm } = Modal;

export default function ModalFizLica({ setShowModal, read = false, value = {}, }) {
  const [form] = Form.useForm();
  const deleteSubjectItem = useSubjects((store) => store.deleteSubjectItem);
  const submitNewSubject = useSubjects((store) => store.submitNewSubject);
  const handlerDelete = (id) => {
    confirm({
      title: "Вы уверены что хотите удалить субъект?",
      icon: <ExclamationCircleFilled />,
      okText: "Да",
      okType: "danger",
      cancelText: "Нет",
      onOk() {
        console.log("del", id);
        setShowModal(false);
        deleteSubjectItem(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handlerSubmitForm = (event) => {
    let list = fieldsJson.filter(item => item.type !== "divider")
    const obj = {}
    list.forEach(item => {
      obj[item.name] = event[item.name]
    });
    console.log(obj)
    obj.type = "Физическое лицо"
    submitNewSubject(obj)
  }
  return (
    <NewForm
      form={form}
      handlerSubmitForm={handlerSubmitForm}
      handlerDelete={handlerDelete}
      fields={fieldsJson}
      read={read}
      setShowModal={setShowModal}
      value={{ ...value?.attributes?.counterparty[0], id: value.id }}
    />
  );
}
