import { Modal, Form, Typography } from "antd";
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
  const [form] = Form.useForm();
  const deleteObjectItem = useObject((store) => store.deleteObjectItem);
  const submitNewObject = useObject((store) => store.submitNewObject);
  const fetchObjects = useObject((store) => store.fetchObjects);
  const updateObjectItem = useObject((store) => store.updateObjectItem);

  // useEffect(() => {
  //   form.resetFields();
  //   form.setFieldsValue({ ...value });
  // }, [read, value]);

  useEffect(() => {
    if (value && Object.keys(value).length > 0) {
      form.setFieldsValue(value);
    } else {
      form.resetFields();
    }
  }, [form, value]);

  const handlerDelete = (id) => {
    confirm({
      title: "Вы уверены что хотите удалить объект?",
      icon: <ExclamationCircleFilled />,
      okText: "Да",
      okType: "danger",
      cancelText: "Нет",
      onOk() {
        setShowModal(false);

        deleteObjectItem(id)
          .then(() => {
            fetchObjects();
          })
          .catch((error) => {
            console.error("Ошибка при удалении объекта:", error);
          });
      },
      onCancel() {},
    });
  };

  const handlerEdit = async (id) => {
    try {
      const formData = form.getFieldsValue();
      console.log("Обновление данных для объекта с ID:", id, formData);
      await updateObjectItem(id, formData);
      setShowModal(false);
    } catch (error) {
      console.error("Ошибка при обновлении объекта:", error);
    }
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
      value={{ ...value?.attributes, id: value.id }}
    />
  );
}

// import { Modal, Form } from "antd";
// import { ExclamationCircleFilled } from "@ant-design/icons";
// import useObject from "../../stores/Cabinet/useObject";
// import NewForm from "../NewForm";
// import fieldsJson from "./FormObject.json";
// import { useEffect } from "react";
// const { confirm } = Modal;

// export default function ModalObject({
//   setShowModal,
//   read = false,
//   value = {},
// }) {
//   const [form] = Form.useForm();
//   const deleteObjectItem = useObject((store) => store.deleteObjectItem);
//   const submitNewObject = useObject((store) => store.submitNewObject);
//   const fetchObjects = useObject((store) => store.fetchObjects);
//   const updateObjectItem = useObject((store) => store.updateObjectItem);

//   useEffect(() => {
//     form.resetFields();
//   }, [read, value]);

//   const handlerDelete = (id) => {
//     confirm({
//       title: "Вы уверены что хотите удалить объект?",
//       icon: <ExclamationCircleFilled />,
//       okText: "Да",
//       okType: "danger",
//       cancelText: "Нет",
//       onOk() {
//         setShowModal(false);

//         deleteObjectItem(id)
//           .then(() => {
//             fetchObjects();
//           })
//           .catch((error) => {
//             console.error("Ошибка при удалении объекта:", error);
//           });
//       },
//       onCancel() {},
//     });
//   };

//   // const handlerEdit = (id) => {
//   //   console.log("Обновить", id);
//   //   console.log(form.getFieldValue());
//   // };

//   const handlerEdit = async (id) => {
//     try {
//       const formData = form.getFieldsValue();
//       console.log("Обновление данных для объекта с ID:", id, formData);
//       await updateObjectItem(id, formData);
//       setShowModal(false);
//     } catch (error) {
//       console.error("Ошибка при обновлении объекта:", error);
//     }
//   };

//   const handlerSubmitForm = (event) => {
//     let list = fieldsJson.filter((item) => item.type !== "new_divider");
//     const obj = {};
//     list.forEach((item) => {
//       obj[item.name] = event[item.name];
//     });
//     console.log("Data:", obj);
//     submitNewObject(obj);
//     setShowModal(false);
//   };

//   return (
//     <NewForm
//       form={form}
//       handlerSubmitForm={handlerSubmitForm}
//       handlerDelete={handlerDelete}
//       handlerEdit={handlerEdit}
//       fields={fieldsJson}
//       read={read}
//       setShowModal={setShowModal}
//       // value={value}
//       value={{ ...value?.attributes, id: value.id }}
//     />
//   );
// }
