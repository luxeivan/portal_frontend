import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import useDocuments from "../../../stores/Cabinet/useDocuments";
import ErrorModal from "../../FormComponentsNew/ErrorModal"; // Импортируем ErrorModal

const { Option } = Select;

export default function ModalUpdateDocument() {
  const openModalUpdate = useDocuments((state) => state.openModalUpdate);
  const setOpenModalUpdate = useDocuments((state) => state.setOpenModalUpdate);
  const fetchDocuments = useDocuments((state) => state.fetchDocuments);
  const document = useDocuments((state) => state.document);
  const nameDocs = useDocuments((state) => state.nameDocs);
  const updateDocument = useDocuments((state) => state.updateDocument);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Состояние для хранения ошибок
  const [errorVisible, setErrorVisible] = useState(false); // Состояние для управления видимостью модального окна с ошибкой

  const [form] = Form.useForm();

  useEffect(() => {
    if (document && document.files) {
      form.setFieldsValue({
        documentName: document.nameDoc_Key,
        fileDoc: document.files.map((file) => ({
          name: file.fileName,
          status: "done",
          uid: file.fileName,
        })),
      });
      setFileList(
        document.files.map((file) => ({
          name: file.fileName,
          status: "done",
          uid: file.fileName,
        }))
      );
    }
  }, [document, form]);

  const handleModalClose = () => {
    setOpenModalUpdate(false);
    form.resetFields();
    setFileList([]);
  };

  const handleUpdateDocument = async (values) => {
    try {
      // throw new Error("Тестовая ошибка"); // Тестовая ошибка
      setLoading(true);
      const updatedData = {
        documentName: values.documentName,
        nameDoc_Key: values.documentName,
        files: fileList.map((file) => ({
          name: file.name,
        })),
      };

      await updateDocument(document.Ref_Key, updatedData);

      message.success("Документ успешно обновлен");

      fetchDocuments();
      setOpenModalUpdate(false);
      form.resetFields();
      setFileList([]);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при обновлении документа:", error);
      setError(error.message || "Неизвестная ошибка"); // Устанавливаем ошибку в состояние
      setErrorVisible(true); // Показываем модальное окно с ошибкой
      setLoading(false);
    }
  };

  const handleRemove = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const closeModal = () => {
    setErrorVisible(false);
  };

  return (
    <>
      <Modal
        title="Редактировать документ"
        open={openModalUpdate}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdateDocument}>
          <Form.Item
            label="Название"
            name="documentName"
            rules={[
              {
                required: true,
                message: "Пожалуйста, выберите название документа",
              },
            ]}
          >
            <Select>
              {nameDocs &&
                nameDocs.map((nameDocs, index) => (
                  <Option key={index} value={nameDocs.Ref_Key}>
                    {nameDocs.Description}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item label="Файлы" name="fileDoc">
            <Upload
              fileList={fileList}
              onRemove={handleRemove}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Добавить файл</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              Сохранить изменения
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <ErrorModal visible={errorVisible} error={error} onClose={closeModal} />
    </>
  );
}


// import React, { useEffect, useState } from "react";
// import { Modal, Button, Form, Select, Upload, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import useDocuments from "../../../stores/Cabinet/useDocuments";
// import axios from "axios";

// const { Option } = Select;

// export default function ModalUpdateDocument() {
//   const openModalUpdate = useDocuments((state) => state.openModalUpdate);
//   const setOpenModalUpdate = useDocuments((state) => state.setOpenModalUpdate);
//   const fetchDocuments = useDocuments((state) => state.fetchDocuments);
//   const document = useDocuments((state) => state.document);
//   const nameDocs = useDocuments((state) => state.nameDocs);
//   const updateDocument = useDocuments((state) => state.updateDocument);
//   const [fileList, setFileList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [form] = Form.useForm();

//   useEffect(() => {
//     if (document && document.files) {
//       form.setFieldsValue({
//         documentName: document.nameDoc_Key,
//         fileDoc: document.files.map((file) => ({
//           name: file.fileName,
//           status: "done",
//           uid: file.fileName,
//         })),
//       });
//       setFileList(
//         document.files.map((file) => ({
//           name: file.fileName,
//           status: "done",
//           uid: file.fileName,
//         }))
//       );
//     }
//   }, [document, form]);

//   const handleModalClose = () => {
//     setOpenModalUpdate(false);
//     form.resetFields();
//     setFileList([]);
//   };

//   const handleUpdateDocument = async (values) => {
//     try {
//       setLoading(true);
//       const updatedData = {
//         documentName: values.documentName,
//         nameDoc_Key: values.documentName,
//         files: fileList.map((file) => ({
//           name: file.name,
//         })),
//       };

//       await updateDocument(document.Ref_Key, updatedData);

//       message.success("Документ успешно обновлен");

//       fetchDocuments();
//       setOpenModalUpdate(false);
//       form.resetFields();
//       setFileList([]);
//       setLoading(false);
//     } catch (error) {
//       console.error("Ошибка при обновлении документа:", error);
//       message.error("Не удалось обновить документ");
//       setLoading(false);
//     }
//   };

//   const handleRemove = (file) => {
//     setFileList(fileList.filter((item) => item.uid !== file.uid));
//   };

//   const handleChange = ({ fileList: newFileList }) => {
//     setFileList(newFileList);
//   };

//   return (
//     <Modal
//       title="Редактировать документ"
//       open={openModalUpdate}
//       onCancel={handleModalClose}
//       footer={null}
//     >
//       <Form form={form} onFinish={handleUpdateDocument}>
//         <Form.Item
//           label="Название"
//           name="documentName"
//           rules={[
//             {
//               required: true,
//               message: "Пожалуйста, выберите название документа",
//             },
//           ]}
//         >
//           <Select>
//             {nameDocs &&
//               nameDocs.map((nameDocs, index) => (
//                 <Option key={index} value={nameDocs.Ref_Key}>
//                   {nameDocs.Description}
//                 </Option>
//               ))}
//           </Select>
//         </Form.Item>
//         <Form.Item label="Файлы" name="fileDoc">
//           <Upload
//             fileList={fileList}
//             onRemove={handleRemove}
//             onChange={handleChange}
//             beforeUpload={() => false}
//           >
//             <Button icon={<UploadOutlined />}>Добавить файл</Button>
//           </Upload>
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" disabled={loading}>
//             Сохранить изменения
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// }
