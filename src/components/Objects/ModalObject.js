import { Modal, Form } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useObject from "../../stores/Cabinet/useObject";
import NewForm from "../NewForm";
import fieldsJson from "./FormObject.json";
import { useEffect } from "react";
const { confirm } = Modal;

export default function ModalObject({
  setShowModal,
  read = false,
  value = {},
}) {
  const showModalAdd = useObject((state) => state.showModalAdd);
  const showModalView = useObject((state) => state.showModalView);
  const [form] = Form.useForm();
  const deleteObjectItem = useObject((store) => store.deleteObjectItem);
  const submitNewObject = useObject((store) => store.submitNewObject);

  useEffect(() => {
    form.resetFields();
  }, [showModalAdd, showModalView]);

  const handlerDelete = (id) => {
    confirm({
      title: "Вы уверены что хотите удалить объект?",
      icon: <ExclamationCircleFilled />,
      okText: "Да",
      okType: "danger",
      cancelText: "Нет",
      onOk() {
        setShowModal(false);
        deleteObjectItem(id);
      },
      onCancel() {},
    });
  };
  const handlerEdit = (id) => {
    console.log("Обновить", id);
    console.log(form.getFieldValue());
  };

  const handlerSubmitForm = (event) => {
    let list = fieldsJson.filter((item) => item.type !== "new_divider");
    const obj = {};
    list.forEach((item) => {
      obj[item.name] = event[item.name];
    });
    console.log("Data:", obj);
    submitNewObject(obj);
    setShowModal(false);
  };

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
