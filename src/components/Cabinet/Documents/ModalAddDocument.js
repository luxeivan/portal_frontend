import React, { useState, useEffect } from "react";
import { Modal, Button, message, Form, Select } from "antd";
import axios from "axios";
import useDocuments from "../../../stores/Cabinet/useDocuments";
import UploaderInput from "../../FormComponents/UploaderInput";
import ErrorModal from "../../ErrorModal";

const { Option } = Select;
const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

export default function ModalAddDocument() {
  const openModalAdd = useDocuments((state) => state.openModalAdd);
  const setOpenModalAdd = useDocuments((state) => state.setOpenModalAdd);
  const fetchDocuments = useDocuments((state) => state.fetchDocuments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorVisible, setErrorVisible] = useState(false);

  const [form] = Form.useForm();

  const token = localStorage.getItem("jwt");

  const [categoriesData, setCategoriesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allowedExtensions, setAllowedExtensions] = useState([]);
  const [maxFileSize, setMaxFileSize] = useState(10); // По умолчанию 10 МБ

  useEffect(() => {
    // Получение категорий документов из бэкенда
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${backServer}/api/cabinet/documents/categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setCategoriesData(response.data.categories);
        // Извлекаем уникальные категории
        const uniqueCategories = response.data.categories.map(
          (item) => item.category.Description
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Ошибка при загрузке категорий документов:", error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleModalClose = () => {
    setOpenModalAdd(false);
    form.resetFields();
    setAllowedExtensions([]);
    setMaxFileSize(10);
  };

  const handleSaveDocument = async (values) => {
    console.log("Значения перед отправкой:", values); // Логируем значения
    try {
      setLoading(true);
      const files = form.getFieldValue("fileDoc");

      if (!files || files.length === 0) {
        message.error("Пожалуйста, загрузите файлы");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("category", values.category);
      formData.append("documentName", values.documentName);
      formData.append("categoryKey", values.categoryKey);
      console.log("FormData categoryKey:", values.categoryKey); // Логируем categoryKey

      files.forEach((file) => {
        formData.append("files", file.originFileObj);
      });

      const token = localStorage.getItem("jwt");

      const response = await axios.post(
        `${backServer}/api/cabinet/upload-file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Ответ от сервера после загрузки файла:", response.data); // Логируем ответ от сервера

      message.success("Документ успешно сохранен");
      fetchDocuments();
      setOpenModalAdd(false);
      form.resetFields();
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при сохранении документа:", error);
      setError(error.message || "Неизвестная ошибка");
      setErrorVisible(true);
      setLoading(false);
    }
  };

  const closeModal = () => {
    setErrorVisible(false);
  };

  return (
    <>
      <Modal
        title="Загрузить новый документ"
        open={openModalAdd}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form form={form} onFinish={handleSaveDocument}>
          {/* Поле выбора категории */}
          <Form.Item
            label="Категория"
            name="category"
            rules={[
              {
                required: true,
                message: "Пожалуйста, выберите категорию документа",
              },
            ]}
          >
            <Select placeholder="Выберите категорию">
              {categories.map((category, index) => (
                <Option key={index} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Поле выбора названия документа, зависит от категории */}
          <Form.Item
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.category !== currentValues.category
            }
          >
            {() => {
              const selectedCategory = form.getFieldValue("category");
              const filteredDocuments = categoriesData.filter(
                (doc) => doc.category.Description === selectedCategory
              );

              return (
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
                  <Select
                    placeholder={
                      selectedCategory
                        ? "Выберите название документа"
                        : "Сначала выберите категорию"
                    }
                    disabled={!selectedCategory}
                    onChange={(value, option) => {
                      // Устанавливаем допустимые расширения и максимальный размер
                      const selectedDoc = filteredDocuments.find(
                        (doc) => doc.category.label === value
                      );
                      if (selectedDoc) {
                        const extensions = JSON.parse(
                          selectedDoc.category.availableExtensionsJSON
                        );
                        setAllowedExtensions(extensions);
                        setMaxFileSize(
                          parseInt(selectedDoc.category.maximumSize)
                        );
                        form.setFieldsValue({
                          categoryKey: selectedDoc.category.Ref_Key,
                        });
                        console.log("Допустимые расширения:", extensions); // Логируем допустимые расширения
                        console.log(
                          "Максимальный размер файла:",
                          selectedDoc.category.maximumSize
                        ); // Логируем максимальный размер
                        console.log(
                          "Выбранный categoryKey:",
                          selectedDoc.category.Ref_Key
                        ); // Логируем categoryKey
                      }
                    }}
                  >
                    {filteredDocuments.map((doc) => (
                      <Option
                        key={doc.category.Ref_Key}
                        value={doc.category.label}
                      >
                        {doc.category.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              );
            }}
          </Form.Item>

          <Form.Item name="categoryKey" hidden>
            <input type="hidden" />
          </Form.Item>

          <UploaderInput
            allowedExtensions={allowedExtensions}
            maxFileSize={maxFileSize}
          />

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              Сохранить файлы
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <ErrorModal visible={errorVisible} error={error} onClose={closeModal} />
    </>
  );
}

// import React, { useState } from "react";
// import { Modal, Button, message, Form, Select } from "antd";
// import axios from "axios";
// import useDocuments from "../../../stores/Cabinet/useDocuments";
// import UploaderInput from "../../FormComponents/UploaderInput";
// import ErrorModal from "../../ErrorModal";

// const { Option } = Select;
// const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

// export default function ModalAddDocument() {
//   const openModalAdd = useDocuments((state) => state.openModalAdd);
//   const setOpenModalAdd = useDocuments((state) => state.setOpenModalAdd);
//   const fetchDocuments = useDocuments((state) => state.fetchDocuments);
//   const nameDocs = useDocuments((state) => state.nameDocs);
//   const [fileList, setFileList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingMessage, setLoadingMessage] = useState("");
//   const [uploadPercent, setUploadPercent] = useState(0);
//   const [savePercent, setSavePercent] = useState(0);
//   const [error, setError] = useState(null);
//   const [errorVisible, setErrorVisible] = useState(false);

//   const [form] = Form.useForm();
//   const handleModalClose = () => {
//     setOpenModalAdd(false);
//     form.resetFields();
//   };

//   const handleSaveDocument = async (values) => {
//     console.log(form.getFieldValue("fileDoc"));
//     try {
//       // throw new Error("Тестовая ошибка");
//       setLoading(true);
//       setLoadingMessage("Пожалуйста, подождите, файл сохраняется");

//       const formData = {
//         documentName: values.documentName,
//         nameDoc_Key: values.documentName,
//         files: form.getFieldValue("fileDoc").map((file) => ({
//           name: file,
//         })),
//       };

//       const token = localStorage.getItem("jwt");

//       // Имитация процесса сохранения
//       let percent = 0;
//       const interval = setInterval(() => {
//         percent += 20;
//         setSavePercent(percent);
//         if (percent >= 100) {
//           clearInterval(interval);
//         }
//       }, 200);

//       const response = await axios.post(
//         `${backServer}/api/cabinet/documents`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );

//       clearInterval(interval);
//       setSavePercent(100);
//       console.log("response", response);
//       message.success("Документ успешно сохранен");
//       fetchDocuments();
//       setOpenModalAdd(false);
//       form.resetFields();
//       setFileList([]);
//       setLoading(false);
//       setLoadingMessage("");
//       setSavePercent(0);
//     } catch (error) {
//       console.error("Ошибка при сохранении документа:", error);
//       setError(error.message || "Неизвестная ошибка");
//       setErrorVisible(true);
//       setLoading(false);
//       setLoadingMessage("");
//       setSavePercent(0);
//     }
//   };

//   const closeModal = () => {
//     setErrorVisible(false);
//   };

//   return (
//     <>
//       <Modal
//         title="Загрузить новый документ"
//         open={openModalAdd}
//         onCancel={handleModalClose}
//         footer={null}
//       >
//         <Form form={form} onFinish={handleSaveDocument}>
//           <Form.Item
//             label="Название"
//             name="documentName"
//             rules={[
//               {
//                 required: true,
//                 message: "Пожалуйста, выберите название документа",
//               },
//             ]}
//           >
//             <Select>
//               {nameDocs &&
//                 nameDocs.map((nameDocs, index) => (
//                   <Option key={index} value={nameDocs.Ref_Key}>
//                     {nameDocs.Description}
//                   </Option>
//                 ))}
//             </Select>
//           </Form.Item>
//           <UploaderInput />
//           <Form.Item>
//             <Button type="primary" htmlType="submit" disabled={loading}>
//               Сохранить файлы
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//       <ErrorModal visible={errorVisible} error={error} onClose={closeModal} />
//     </>
//   );
// }
