import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useSubjects from "../../../stores/Cabinet/useSubjects";
import NewForm from "../../../components/Subjects/NewForm";
import fieldsFizLica from "./FormFizLica.json";
const { confirm } = Modal;

export default function ModalFizLica({
  setShowModal,
  read = false,
  value = {},
}) {
  const deleteSubjectItem = useSubjects((store) => store.deleteSubjectItem);
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
  return (
    <NewForm
      handlerDelete={handlerDelete}
      fields={fieldsFizLica}
      read={read}
      setShowModal={setShowModal}
      value={{ ...value?.attributes?.counterparty[0], id: value.id }}
    />
  );
}
