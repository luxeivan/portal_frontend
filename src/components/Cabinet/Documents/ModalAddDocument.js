import React, { useState, useEffect } from "react";
import { Modal, Button, message, Form, Select, Input } from "antd";
import axios from "axios";
import useDocuments from "../../../stores/Cabinet/useDocuments";
import UploaderInput from "../../FormComponents/UploaderInput";
import ErrorModal from "../../ErrorModal";
import Preloader from "../../Main/Preloader";
import styles from "./ModalAddDocument.module.css";

const { Option } = Select;
const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

export default function ModalAddDocument({ visible, onClose, categoryKey }) {
  const openModalAdd = useDocuments((state) => state.openModalAdd);
  const setOpenModalAdd = useDocuments((state) => state.setOpenModalAdd);
  const fetchDocuments = useDocuments((state) => state.fetchDocuments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const [uploaderKey, setUploaderKey] = useState(0);

  const [form] = Form.useForm();

  const token = localStorage.getItem("jwt");

  const [categoriesData, setCategoriesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allowedExtensions, setAllowedExtensions] = useState([]);
  const [maxFileSize, setMaxFileSize] = useState(10);
  const [isCategoryDisabled, setIsCategoryDisabled] = useState(false);

  useEffect(() => {
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
        const uniqueCategories = [
          ...new Set(
            response.data.categories.map((item) => item.category.Description)
          ),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Ошибка при загрузке категорий документов:", error);
      }
    };

    fetchCategories();
  }, [token]);

  useEffect(() => {
    if (categoryKey && categoriesData.length > 0 && visible) {
      const selectedCategoryItem = categoriesData.find(
        (item) => item.category.Ref_Key === categoryKey
      );
      if (selectedCategoryItem) {
        const selectedCategory = selectedCategoryItem.category.Description;
        form.setFieldsValue({
          category: selectedCategory,
          documentName: selectedCategory,
          categoryKey: selectedCategoryItem.category.Ref_Key,
        });
        setIsCategoryDisabled(true);
        const extensions = JSON.parse(
          selectedCategoryItem.category.availableExtensionsJSON
        );
        setAllowedExtensions(extensions);
        setMaxFileSize(parseInt(selectedCategoryItem.category.maximumSize));
      }
    } else if (!visible) {
      form.resetFields();
      setAllowedExtensions([]);
      setMaxFileSize(10);
      setUploaderKey((prevKey) => prevKey + 1);
      setIsCategoryDisabled(false);
    }
  }, [categoryKey, categoriesData, form, visible]);

  const handleModalClose = () => {
    if (onClose) {
      onClose();
    } else {
      setOpenModalAdd(false);
    }
  };

  const handleSaveDocument = async (values) => {
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

      files.forEach((file) => {
        formData.append("files", file.originFileObj);
      });

      const token = localStorage.getItem("jwt");

      await axios.post(`${backServer}/api/cabinet/upload-file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      message.success("Документ успешно сохранен");
      fetchDocuments(categoryKey);
      handleModalClose();
      setUploaderKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Ошибка при сохранении документа:", error);
      setError(error.message || "Неизвестная ошибка");
      setErrorVisible(true);
    } finally {
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
        open={openModalAdd || visible}
        onCancel={handleModalClose}
        footer={null}
        destroyOnClose={true}
      >
        <Form form={form} onFinish={handleSaveDocument}>
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
            <Select
              placeholder="Выберите категорию"
              disabled={isCategoryDisabled}
              onChange={(value) => {
                const selectedCategoryItem = categoriesData.find(
                  (item) => item.category.Description === value
                );
                if (selectedCategoryItem) {
                  const selectedCategory =
                    selectedCategoryItem.category.Description;
                  form.setFieldsValue({
                    documentName: selectedCategory,
                    categoryKey: selectedCategoryItem.category.Ref_Key,
                  });
                  const extensions = JSON.parse(
                    selectedCategoryItem.category.availableExtensionsJSON
                  );
                  setAllowedExtensions(extensions);
                  setMaxFileSize(
                    parseInt(selectedCategoryItem.category.maximumSize)
                  );
                }
              }}
            >
              {categories.map((category, index) => (
                <Option key={index} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.category !== currentValues.category ||
              prevValues.documentName !== currentValues.documentName
            }
          >
            {() => {
              const selectedCategory = form.getFieldValue("category");
              const documentName = form.getFieldValue("documentName");

              return (
                <>
                  {(selectedCategory || isCategoryDisabled) && (
                    <>
                      <Form.Item
                        label="Название"
                        name="documentName"
                        rules={[
                          {
                            required: true,
                            message: "Пожалуйста, введите название документа",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item name="categoryKey" hidden>
                        <input type="hidden" />
                      </Form.Item>
                    </>
                  )}
                </>
              );
            }}
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.documentName !== currentValues.documentName
            }
          >
            {() => {
              const documentName = form.getFieldValue("documentName");

              return (
                <>
                  {(documentName || isCategoryDisabled) && (
                    <>
                      <UploaderInput
                        resetTrigger={uploaderKey}
                        allowedExtensions={allowedExtensions}
                        maxFileSize={maxFileSize}
                        loading={loading}
                      />

                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          disabled={loading}
                        >
                          Сохранить файлы
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </>
              );
            }}
          </Form.Item>
        </Form>
        {loading && (
          <div className={styles.overlay}>
            <Preloader />
          </div>
        )}
        <ErrorModal visible={errorVisible} error={error} onClose={closeModal} />
      </Modal>
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import { Modal, Button, message, Form, Select, Input } from "antd";
// import axios from "axios";
// import useDocuments from "../../../stores/Cabinet/useDocuments";
// import UploaderInput from "../../FormComponents/UploaderInput";
// import ErrorModal from "../../ErrorModal";
// import Preloader from "../../Main/Preloader"; // Импортируем ваш прелоадер
// import styles from "./ModalAddDocument.module.css"; // Создайте CSS-модуль для стилей

// const { Option } = Select;
// const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

// export default function ModalAddDocument({ visible, onClose, categoryKey }) {
//   const openModalAdd = useDocuments((state) => state.openModalAdd);
//   const setOpenModalAdd = useDocuments((state) => state.setOpenModalAdd);
//   const fetchDocuments = useDocuments((state) => state.fetchDocuments);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [errorVisible, setErrorVisible] = useState(false);
//   const [uploaderKey, setUploaderKey] = useState(0);

//   const [form] = Form.useForm();

//   const token = localStorage.getItem("jwt");

//   const [categoriesData, setCategoriesData] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [allowedExtensions, setAllowedExtensions] = useState([]);
//   const [maxFileSize, setMaxFileSize] = useState(10); // По умолчанию 10 МБ
//   const [isCategoryDisabled, setIsCategoryDisabled] = useState(false);

//   useEffect(() => {
//     // Получение категорий документов из бэкенда
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           `${backServer}/api/cabinet/documents/categories`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             withCredentials: true,
//           }
//         );
//         setCategoriesData(response.data.categories);
//         // Извлекаем уникальные категории
//         const uniqueCategories = [
//           ...new Set(
//             response.data.categories.map((item) => item.category.Description)
//           ),
//         ];
//         setCategories(uniqueCategories);
//       } catch (error) {
//         console.error("Ошибка при загрузке категорий документов:", error);
//       }
//     };

//     fetchCategories();
//   }, [token]);

//   useEffect(() => {
//     if (categoryKey && categoriesData.length > 0) {
//       const selectedCategoryItem = categoriesData.find(
//         (item) => item.category.Ref_Key === categoryKey
//       );
//       if (selectedCategoryItem) {
//         const selectedCategory = selectedCategoryItem.category.Description;
//         form.setFieldsValue({
//           category: selectedCategory,
//           documentName: selectedCategory,
//           categoryKey: selectedCategoryItem.category.Ref_Key,
//         });
//         setIsCategoryDisabled(true); // Блокируем поле 'category'
//         // Устанавливаем допустимые расширения и максимальный размер файла
//         const extensions = JSON.parse(
//           selectedCategoryItem.category.availableExtensionsJSON
//         );
//         setAllowedExtensions(extensions);
//         setMaxFileSize(parseInt(selectedCategoryItem.category.maximumSize));
//       }
//     } else {
//       setIsCategoryDisabled(false); // Разблокируем поле 'category'
//     }
//   }, [categoryKey, categoriesData, form]);

//   const handleModalClose = () => {
//     if (onClose) {
//       onClose();
//     } else {
//       setOpenModalAdd(false);
//     }
//     form.resetFields();
//     setAllowedExtensions([]);
//     setMaxFileSize(10);
//     setUploaderKey((prevKey) => prevKey + 1);
//     setIsCategoryDisabled(false); // Сбрасываем блокировку поля 'category'
//   };

//   const handleSaveDocument = async (values) => {
//     try {
//       setLoading(true);
//       const files = form.getFieldValue("fileDoc");

//       if (!files || files.length === 0) {
//         message.error("Пожалуйста, загрузите файлы");
//         setLoading(false);
//         return;
//       }

//       const formData = new FormData();
//       formData.append("category", values.category);
//       formData.append("documentName", values.documentName);
//       formData.append("categoryKey", values.categoryKey);

//       files.forEach((file) => {
//         formData.append("files", file.originFileObj);
//       });

//       const token = localStorage.getItem("jwt");

//       await axios.post(`${backServer}/api/cabinet/upload-file`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });

//       message.success("Документ успешно сохранен");
//       fetchDocuments(categoryKey);
//       handleModalClose();
//       setUploaderKey((prevKey) => prevKey + 1);
//     } catch (error) {
//       console.error("Ошибка при сохранении документа:", error);
//       setError(error.message || "Неизвестная ошибка");
//       setErrorVisible(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closeModal = () => {
//     setErrorVisible(false);
//   };

//   return (
//     <>
//       <Modal
//         title="Загрузить новый документ"
//         open={openModalAdd || visible}
//         onCancel={handleModalClose}
//         footer={null}
//         destroyOnClose={true}
//       >
//         <Form form={form} onFinish={handleSaveDocument}>
//           {/* Категория */}
//           <Form.Item
//             label="Категория"
//             name="category"
//             rules={[
//               {
//                 required: true,
//                 message: "Пожалуйста, выберите категорию документа",
//               },
//             ]}
//           >
//             <Select
//               placeholder="Выберите категорию"
//               disabled={isCategoryDisabled}
//               onChange={(value) => {
//                 const selectedCategoryItem = categoriesData.find(
//                   (item) => item.category.Description === value
//                 );
//                 if (selectedCategoryItem) {
//                   const selectedCategory =
//                     selectedCategoryItem.category.Description;
//                   form.setFieldsValue({
//                     documentName: selectedCategory,
//                     categoryKey: selectedCategoryItem.category.Ref_Key,
//                   });
//                   const extensions = JSON.parse(
//                     selectedCategoryItem.category.availableExtensionsJSON
//                   );
//                   setAllowedExtensions(extensions);
//                   setMaxFileSize(
//                     parseInt(selectedCategoryItem.category.maximumSize)
//                   );
//                 }
//               }}
//             >
//               {categories.map((category, index) => (
//                 <Option key={index} value={category}>
//                   {category}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           {/* Название */}
//           <Form.Item
//             noStyle
//             shouldUpdate={(prevValues, currentValues) =>
//               prevValues.category !== currentValues.category ||
//               prevValues.documentName !== currentValues.documentName
//             }
//           >
//             {() => {
//               const selectedCategory = form.getFieldValue("category");
//               const documentName = form.getFieldValue("documentName");

//               return (
//                 <>
//                   {(selectedCategory || isCategoryDisabled) && (
//                     <>
//                       <Form.Item
//                         label="Название"
//                         name="documentName"
//                         rules={[
//                           {
//                             required: true,
//                             message: "Пожалуйста, введите название документа",
//                           },
//                         ]}
//                       >
//                         <Input />
//                       </Form.Item>

//                       <Form.Item name="categoryKey" hidden>
//                         <input type="hidden" />
//                       </Form.Item>
//                     </>
//                   )}
//                 </>
//               );
//             }}
//           </Form.Item>

//           {/* UploaderInput и кнопка сохранения */}
//           <Form.Item
//             noStyle
//             shouldUpdate={(prevValues, currentValues) =>
//               prevValues.documentName !== currentValues.documentName
//             }
//           >
//             {() => {
//               const documentName = form.getFieldValue("documentName");

//               return (
//                 <>
//                   {(documentName || isCategoryDisabled) && (
//                     <>
//                       <UploaderInput
//                         resetTrigger={uploaderKey}
//                         allowedExtensions={allowedExtensions}
//                         maxFileSize={maxFileSize}
//                         loading={loading}
//                       />

//                       <Form.Item>
//                         <Button
//                           type="primary"
//                           htmlType="submit"
//                           disabled={loading}
//                         >
//                           Сохранить файлы
//                         </Button>
//                       </Form.Item>
//                     </>
//                   )}
//                 </>
//               );
//             }}
//           </Form.Item>
//         </Form>
//         {loading && (
//           <div className={styles.overlay}>
//             <Preloader />
//           </div>
//         )}
//         <ErrorModal visible={errorVisible} error={error} onClose={closeModal} />
//       </Modal>
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Modal, Button, message, Form, Select, Input } from "antd";
// import axios from "axios";
// import useDocuments from "../../../stores/Cabinet/useDocuments";
// import UploaderInput from "../../FormComponents/UploaderInput";
// import ErrorModal from "../../ErrorModal";

// const { Option } = Select;
// const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

// export default function ModalAddDocument({ visible, onClose, categoryKey }) {
//   const openModalAdd = useDocuments((state) => state.openModalAdd);
//   const setOpenModalAdd = useDocuments((state) => state.setOpenModalAdd);
//   const fetchDocuments = useDocuments((state) => state.fetchDocuments);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [errorVisible, setErrorVisible] = useState(false);
//   const [uploaderKey, setUploaderKey] = useState(0);

//   const [form] = Form.useForm();

//   const token = localStorage.getItem("jwt");

//   const [categoriesData, setCategoriesData] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [allowedExtensions, setAllowedExtensions] = useState([]);
//   const [maxFileSize, setMaxFileSize] = useState(10); // По умолчанию 10 МБ
//   const [isCategoryDisabled, setIsCategoryDisabled] = useState(false);

//   useEffect(() => {
//     // Получение категорий документов из бэкенда
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           `${backServer}/api/cabinet/documents/categories`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             withCredentials: true,
//           }
//         );
//         setCategoriesData(response.data.categories);
//         // Извлекаем уникальные категории
//         const uniqueCategories = [
//           ...new Set(
//             response.data.categories.map((item) => item.category.Description)
//           ),
//         ];
//         setCategories(uniqueCategories);
//       } catch (error) {
//         console.error("Ошибка при загрузке категорий документов:", error);
//       }
//     };

//     fetchCategories();
//   }, [token]);

//   useEffect(() => {
//     if (categoryKey && categoriesData.length > 0) {
//       const selectedCategoryItem = categoriesData.find(
//         (item) => item.category.Ref_Key === categoryKey
//       );
//       if (selectedCategoryItem) {
//         const selectedCategory = selectedCategoryItem.category.Description;
//         form.setFieldsValue({
//           category: selectedCategory,
//           documentName: selectedCategory,
//           categoryKey: selectedCategoryItem.category.Ref_Key,
//         });
//         setIsCategoryDisabled(true); // Блокируем поле 'category'
//         // Устанавливаем допустимые расширения и максимальный размер файла
//         const extensions = JSON.parse(
//           selectedCategoryItem.category.availableExtensionsJSON
//         );
//         setAllowedExtensions(extensions);
//         setMaxFileSize(parseInt(selectedCategoryItem.category.maximumSize));
//       }
//     } else {
//       setIsCategoryDisabled(false); // Разблокируем поле 'category'
//     }
//   }, [categoryKey, categoriesData, form]);

//   const handleModalClose = () => {
//     if (onClose) {
//       onClose();
//     } else {
//       setOpenModalAdd(false);
//     }
//     form.resetFields();
//     setAllowedExtensions([]);
//     setMaxFileSize(10);
//     setUploaderKey((prevKey) => prevKey + 1);
//     setIsCategoryDisabled(false); // Сбрасываем блокировку поля 'category'
//   };

//   const handleSaveDocument = async (values) => {
//     try {
//       setLoading(true);
//       const files = form.getFieldValue("fileDoc");

//       if (!files || files.length === 0) {
//         message.error("Пожалуйста, загрузите файлы");
//         setLoading(false);
//         return;
//       }

//       const formData = new FormData();
//       formData.append("category", values.category);
//       formData.append("documentName", values.documentName);
//       formData.append("categoryKey", values.categoryKey);

//       files.forEach((file) => {
//         formData.append("files", file.originFileObj);
//       });

//       const token = localStorage.getItem("jwt");

//       await axios.post(`${backServer}/api/cabinet/upload-file`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });

//       message.success("Документ успешно сохранен");
//       fetchDocuments(categoryKey);
//       handleModalClose();
//       setUploaderKey((prevKey) => prevKey + 1);
//     } catch (error) {
//       console.error("Ошибка при сохранении документа:", error);
//       setError(error.message || "Неизвестная ошибка");
//       setErrorVisible(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const closeModal = () => {
//     setErrorVisible(false);
//   };

//   return (
//     <>
//       <Modal
//         title="Загрузить новый документ"
//         open={openModalAdd || visible}
//         onCancel={handleModalClose}
//         footer={null}
//         destroyOnClose={true}
//       >
//         <Form form={form} onFinish={handleSaveDocument}>
//           {/* Категория */}
//           <Form.Item
//             label="Категория"
//             name="category"
//             rules={[
//               {
//                 required: true,
//                 message: "Пожалуйста, выберите категорию документа",
//               },
//             ]}
//           >
//             <Select
//               placeholder="Выберите категорию"
//               disabled={isCategoryDisabled}
//               onChange={(value) => {
//                 const selectedCategoryItem = categoriesData.find(
//                   (item) => item.category.Description === value
//                 );
//                 if (selectedCategoryItem) {
//                   const selectedCategory =
//                     selectedCategoryItem.category.Description;
//                   form.setFieldsValue({
//                     documentName: selectedCategory,
//                     categoryKey: selectedCategoryItem.category.Ref_Key,
//                   });
//                   const extensions = JSON.parse(
//                     selectedCategoryItem.category.availableExtensionsJSON
//                   );
//                   setAllowedExtensions(extensions);
//                   setMaxFileSize(
//                     parseInt(selectedCategoryItem.category.maximumSize)
//                   );
//                 }
//               }}
//             >
//               {categories.map((category, index) => (
//                 <Option key={index} value={category}>
//                   {category}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           {/* Название */}
//           <Form.Item
//             noStyle
//             shouldUpdate={(prevValues, currentValues) =>
//               prevValues.category !== currentValues.category ||
//               prevValues.documentName !== currentValues.documentName
//             }
//           >
//             {() => {
//               const selectedCategory = form.getFieldValue("category");
//               const documentName = form.getFieldValue("documentName");

//               return (
//                 <>
//                   {(selectedCategory || isCategoryDisabled) && (
//                     <>
//                       <Form.Item
//                         label="Название"
//                         name="documentName"
//                         rules={[
//                           {
//                             required: true,
//                             message: "Пожалуйста, введите название документа",
//                           },
//                         ]}
//                       >
//                         <Input />
//                       </Form.Item>

//                       <Form.Item name="categoryKey" hidden>
//                         <input type="hidden" />
//                       </Form.Item>
//                     </>
//                   )}
//                 </>
//               );
//             }}
//           </Form.Item>

//           {/* UploaderInput и кнопка сохранения */}
//           <Form.Item
//             noStyle
//             shouldUpdate={(prevValues, currentValues) =>
//               prevValues.documentName !== currentValues.documentName
//             }
//           >
//             {() => {
//               const documentName = form.getFieldValue("documentName");

//               return (
//                 <>
//                   {(documentName || isCategoryDisabled) && (
//                     <>
//                       <UploaderInput
//                         resetTrigger={uploaderKey}
//                         allowedExtensions={allowedExtensions}
//                         maxFileSize={maxFileSize}
//                         loading={loading}
//                       />

//                       <Form.Item>
//                         <Button
//                           type="primary"
//                           htmlType="submit"
//                           disabled={loading}
//                           loading={loading}
//                         >
//                           Сохранить файлы
//                         </Button>
//                       </Form.Item>
//                     </>
//                   )}
//                 </>
//               );
//             }}
//           </Form.Item>
//         </Form>
//         <ErrorModal visible={errorVisible} error={error} onClose={closeModal} />
//       </Modal>
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Modal, Button, message, Form, Select, Input } from "antd";
// import axios from "axios";
// import useDocuments from "../../../stores/Cabinet/useDocuments";
// import UploaderInput from "../../FormComponents/UploaderInput";
// import ErrorModal from "../../ErrorModal";

// const { Option } = Select;
// const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

// export default function ModalAddDocument({ visible, onClose, categoryKey }) {
//   const openModalAdd = useDocuments((state) => state.openModalAdd);
//   const setOpenModalAdd = useDocuments((state) => state.setOpenModalAdd);
//   const fetchDocuments = useDocuments((state) => state.fetchDocuments);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [errorVisible, setErrorVisible] = useState(false);
//   const [uploaderKey, setUploaderKey] = useState(0);

//   const [form] = Form.useForm();

//   const token = localStorage.getItem("jwt");

//   const [categoriesData, setCategoriesData] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [allowedExtensions, setAllowedExtensions] = useState([]);
//   const [maxFileSize, setMaxFileSize] = useState(10); // По умолчанию 10 МБ
//   const [isCategoryDisabled, setIsCategoryDisabled] = useState(false);

//   useEffect(() => {
//     // Получение категорий документов из бэкенда
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           `${backServer}/api/cabinet/documents/categories`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             withCredentials: true,
//           }
//         );
//         setCategoriesData(response.data.categories);
//         // Извлекаем уникальные категории
//         const uniqueCategories = [
//           ...new Set(
//             response.data.categories.map((item) => item.category.Description)
//           ),
//         ];
//         setCategories(uniqueCategories);
//       } catch (error) {
//         console.error("Ошибка при загрузке категорий документов:", error);
//       }
//     };

//     fetchCategories();
//   }, [token]);

//   useEffect(() => {
//     if (categoryKey && categoriesData.length > 0) {
//       const selectedCategoryItem = categoriesData.find(
//         (item) => item.category.Ref_Key === categoryKey
//       );
//       if (selectedCategoryItem) {
//         const selectedCategory = selectedCategoryItem.category.Description;
//         form.setFieldsValue({
//           category: selectedCategory,
//           documentName: selectedCategory,
//           categoryKey: selectedCategoryItem.category.Ref_Key,
//         });
//         setIsCategoryDisabled(true); // Блокируем поле 'category'
//         // Устанавливаем допустимые расширения и максимальный размер файла
//         const extensions = JSON.parse(
//           selectedCategoryItem.category.availableExtensionsJSON
//         );
//         setAllowedExtensions(extensions);
//         setMaxFileSize(parseInt(selectedCategoryItem.category.maximumSize));
//       }
//     } else {
//       setIsCategoryDisabled(false); // Разблокируем поле 'category'
//     }
//   }, [categoryKey, categoriesData, form]);

//   const handleModalClose = () => {
//     if (onClose) {
//       onClose();
//     } else {
//       setOpenModalAdd(false);
//     }
//     form.resetFields();
//     setAllowedExtensions([]);
//     setMaxFileSize(10);
//     setUploaderKey((prevKey) => prevKey + 1);
//     setIsCategoryDisabled(false); // Сбрасываем блокировку поля 'category'
//   };

//   const handleSaveDocument = async (values) => {
//     try {
//       setLoading(true);
//       const files = form.getFieldValue("fileDoc");

//       if (!files || files.length === 0) {
//         message.error("Пожалуйста, загрузите файлы");
//         setLoading(false);
//         return;
//       }

//       const formData = new FormData();
//       formData.append("category", values.category);
//       formData.append("documentName", values.documentName);
//       formData.append("categoryKey", values.categoryKey);

//       files.forEach((file) => {
//         formData.append("files", file.originFileObj);
//       });

//       const token = localStorage.getItem("jwt");

//       const response = await axios.post(
//         `${backServer}/api/cabinet/upload-file`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );

//       message.success("Документ успешно сохранен");
//       fetchDocuments(categoryKey);
//       handleModalClose();
//       setLoading(false);
//       setUploaderKey((prevKey) => prevKey + 1);
//     } catch (error) {
//       console.error("Ошибка при сохранении документа:", error);
//       setError(error.message || "Неизвестная ошибка");
//       setErrorVisible(true);
//       setLoading(false);
//     }
//   };

//   const closeModal = () => {
//     setErrorVisible(false);
//   };

//   return (
//     <>
//       <Modal
//         title="Загрузить новый документ"
//         open={openModalAdd || visible}
//         onCancel={handleModalClose}
//         footer={null}
//       >
//         <Form form={form} onFinish={handleSaveDocument}>
//           {/* Категория */}
//           <Form.Item
//             label="Категория"
//             name="category"
//             rules={[
//               {
//                 required: true,
//                 message: "Пожалуйста, выберите категорию документа",
//               },
//             ]}
//           >
//             <Select
//               placeholder="Выберите категорию"
//               disabled={isCategoryDisabled}
//               onChange={(value) => {
//                 const selectedCategoryItem = categoriesData.find(
//                   (item) => item.category.Description === value
//                 );
//                 if (selectedCategoryItem) {
//                   const selectedCategory =
//                     selectedCategoryItem.category.Description;
//                   form.setFieldsValue({
//                     documentName: selectedCategory,
//                     categoryKey: selectedCategoryItem.category.Ref_Key,
//                   });
//                   const extensions = JSON.parse(
//                     selectedCategoryItem.category.availableExtensionsJSON
//                   );
//                   setAllowedExtensions(extensions);
//                   setMaxFileSize(
//                     parseInt(selectedCategoryItem.category.maximumSize)
//                   );
//                 }
//               }}
//             >
//               {categories.map((category, index) => (
//                 <Option key={index} value={category}>
//                   {category}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           {/* Название */}
//           <Form.Item
//             noStyle
//             shouldUpdate={(prevValues, currentValues) =>
//               prevValues.category !== currentValues.category ||
//               prevValues.documentName !== currentValues.documentName
//             }
//           >
//             {() => {
//               const selectedCategory = form.getFieldValue("category");
//               const documentName = form.getFieldValue("documentName");

//               return (
//                 <>
//                   {(selectedCategory || isCategoryDisabled) && (
//                     <>
//                       <Form.Item
//                         label="Название"
//                         name="documentName"
//                         rules={[
//                           {
//                             required: true,
//                             message: "Пожалуйста, введите название документа",
//                           },
//                         ]}
//                       >
//                         <Input />
//                       </Form.Item>

//                       <Form.Item name="categoryKey" hidden>
//                         <input type="hidden" />
//                       </Form.Item>
//                     </>
//                   )}
//                 </>
//               );
//             }}
//           </Form.Item>

//           {/* UploaderInput и кнопка сохранения */}
//           <Form.Item
//             noStyle
//             shouldUpdate={(prevValues, currentValues) =>
//               prevValues.documentName !== currentValues.documentName
//             }
//           >
//             {() => {
//               const documentName = form.getFieldValue("documentName");

//               return (
//                 <>
//                   {(documentName || isCategoryDisabled) && (
//                     <>
//                       <UploaderInput
//                         resetTrigger={uploaderKey}
//                         allowedExtensions={allowedExtensions}
//                         maxFileSize={maxFileSize}
//                       />

//                       <Form.Item>
//                         <Button
//                           type="primary"
//                           htmlType="submit"
//                           disabled={loading}
//                         >
//                           Сохранить файлы
//                         </Button>
//                       </Form.Item>
//                     </>
//                   )}
//                 </>
//               );
//             }}
//           </Form.Item>
//         </Form>
//         <ErrorModal visible={errorVisible} error={error} onClose={closeModal} />
//       </Modal>
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Modal, Button, message, Form, Select } from "antd";
// import axios from "axios";
// import useDocuments from "../../../stores/Cabinet/useDocuments";
// import UploaderInput from "../../FormComponents/UploaderInput";
// import ErrorModal from "../../ErrorModal";

// const { Option } = Select;
// const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

// export default function ModalAddDocument({ visible, onClose, categoryKey }) {
//   const openModalAdd = useDocuments((state) => state.openModalAdd);
//   const setOpenModalAdd = useDocuments((state) => state.setOpenModalAdd);
//   const fetchDocuments = useDocuments((state) => state.fetchDocuments);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [errorVisible, setErrorVisible] = useState(false);
//   const [uploaderKey, setUploaderKey] = useState(0);

//   const [form] = Form.useForm();

//   const token = localStorage.getItem("jwt");

//   const [categoriesData, setCategoriesData] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [allowedExtensions, setAllowedExtensions] = useState([]);
//   const [maxFileSize, setMaxFileSize] = useState(10); // По умолчанию 10 МБ
//   const [isCategoryDisabled, setIsCategoryDisabled] = useState(false);

//   useEffect(() => {
//     // Получение категорий документов из бэкенда
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           `${backServer}/api/cabinet/documents/categories`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             withCredentials: true,
//           }
//         );
//         setCategoriesData(response.data.categories);
//         // Извлекаем уникальные категории
//         const uniqueCategories = response.data.categories.map(
//           (item) => item.category.Description
//         );
//         setCategories(uniqueCategories);
//       } catch (error) {
//         console.error("Ошибка при загрузке категорий документов:", error);
//       }
//     };

//     fetchCategories();
//   }, [token]);

//   useEffect(() => {
//     if (categoryKey && categoriesData.length > 0) {
//       const selectedCategoryItem = categoriesData.find(
//         (item) => item.category.Ref_Key === categoryKey
//       );
//       if (selectedCategoryItem) {
//         const selectedCategory = selectedCategoryItem.category.Description;
//         form.setFieldsValue({
//           category: selectedCategory,
//           documentName: selectedCategoryItem.category.label,
//           categoryKey: selectedCategoryItem.category.Ref_Key,
//         });
//         setIsCategoryDisabled(true); // Блокируем поля
//         // Устанавливаем допустимые расширения и максимальный размер файла
//         const extensions = JSON.parse(
//           selectedCategoryItem.category.availableExtensionsJSON
//         );
//         setAllowedExtensions(extensions);
//         setMaxFileSize(parseInt(selectedCategoryItem.category.maximumSize));
//       }
//     } else {
//       setIsCategoryDisabled(false); // Разблокируем поля
//     }
//   }, [categoryKey, categoriesData, form]);

//   const handleModalClose = () => {
//     if (onClose) {
//       onClose();
//     } else {
//       setOpenModalAdd(false);
//     }
//     form.resetFields();
//     setAllowedExtensions([]);
//     setMaxFileSize(10);
//     setUploaderKey((prevKey) => prevKey + 1);
//     setIsCategoryDisabled(false); // Сбрасываем блокировку полей
//   };

//   const handleSaveDocument = async (values) => {
//     try {
//       setLoading(true);
//       const files = form.getFieldValue("fileDoc");

//       if (!files || files.length === 0) {
//         message.error("Пожалуйста, загрузите файлы");
//         setLoading(false);
//         return;
//       }

//       const formData = new FormData();
//       formData.append("category", values.category);
//       formData.append("documentName", values.documentName);
//       formData.append("categoryKey", values.categoryKey);

//       files.forEach((file) => {
//         formData.append("files", file.originFileObj);
//       });

//       const token = localStorage.getItem("jwt");

//       const response = await axios.post(
//         `${backServer}/api/cabinet/upload-file`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );

//       message.success("Документ успешно сохранен");
//       fetchDocuments(categoryKey);
//       handleModalClose();
//       setLoading(false);
//       setUploaderKey((prevKey) => prevKey + 1);
//     } catch (error) {
//       console.error("Ошибка при сохранении документа:", error);
//       setError(error.message || "Неизвестная ошибка");
//       setErrorVisible(true);
//       setLoading(false);
//     }
//   };

//   const closeModal = () => {
//     setErrorVisible(false);
//   };

//   return (
//     <>
//       <Modal
//         title="Загрузить новый документ"
//         open={openModalAdd || visible}
//         onCancel={handleModalClose}
//         footer={null}
//       >
//         <Form form={form} onFinish={handleSaveDocument}>
//           {/* Категория */}
//           <Form.Item
//             label="Категория"
//             name="category"
//             rules={[
//               {
//                 required: true,
//                 message: "Пожалуйста, выберите категорию документа",
//               },
//             ]}
//           >
//             <Select
//               placeholder="Выберите категорию"
//               disabled={isCategoryDisabled}
//             >
//               {categories.map((category, index) => (
//                 <Option key={index} value={category}>
//                   {category}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           {/* Название */}
//           <Form.Item
//             noStyle
//             shouldUpdate={(prevValues, currentValues) =>
//               prevValues.category !== currentValues.category ||
//               prevValues.documentName !== currentValues.documentName
//             }
//           >
//             {() => {
//               const selectedCategory = form.getFieldValue("category");
//               const documentName = form.getFieldValue("documentName");

//               return (
//                 <>
//                   {(selectedCategory || isCategoryDisabled) && (
//                     <Form.Item
//                       label="Название"
//                       name="documentName"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Пожалуйста, выберите название документа",
//                         },
//                       ]}
//                     >
//                       <Select
//                         placeholder={
//                           selectedCategory
//                             ? "Выберите название документа"
//                             : "Сначала выберите категорию"
//                         }
//                         disabled={!selectedCategory || isCategoryDisabled}
//                         onChange={(value, option) => {
//                           // Устанавливаем допустимые расширения и максимальный размер
//                           const filteredDocuments = categoriesData.filter(
//                             (doc) =>
//                               doc.category.Description === selectedCategory
//                           );
//                           const selectedDoc = filteredDocuments.find(
//                             (doc) => doc.category.label === value
//                           );
//                           if (selectedDoc) {
//                             const extensions = JSON.parse(
//                               selectedDoc.category.availableExtensionsJSON
//                             );
//                             setAllowedExtensions(extensions);
//                             setMaxFileSize(
//                               parseInt(selectedDoc.category.maximumSize)
//                             );
//                             form.setFieldsValue({
//                               categoryKey: selectedDoc.category.Ref_Key,
//                             });
//                           }
//                         }}
//                       >
//                         {categoriesData
//                           .filter(
//                             (doc) =>
//                               doc.category.Description === selectedCategory
//                           )
//                           .map((doc) => (
//                             <Option
//                               key={doc.category.Ref_Key}
//                               value={doc.category.label}
//                             >
//                               {doc.category.label}
//                             </Option>
//                           ))}
//                       </Select>
//                     </Form.Item>
//                   )}
//                 </>
//               );
//             }}
//           </Form.Item>

//           {/* UploaderInput и кнопка сохранения */}
//           <Form.Item
//             noStyle
//             shouldUpdate={(prevValues, currentValues) =>
//               prevValues.documentName !== currentValues.documentName
//             }
//           >
//             {() => {
//               const documentName = form.getFieldValue("documentName");

//               return (
//                 <>
//                   {(documentName || isCategoryDisabled) && (
//                     <>
//                       <Form.Item name="categoryKey" hidden>
//                         <input type="hidden" />
//                       </Form.Item>

//                       <UploaderInput
//                         resetTrigger={uploaderKey}
//                         allowedExtensions={allowedExtensions}
//                         maxFileSize={maxFileSize}
//                       />

//                       <Form.Item>
//                         <Button
//                           type="primary"
//                           htmlType="submit"
//                           disabled={loading}
//                         >
//                           Сохранить файлы
//                         </Button>
//                       </Form.Item>
//                     </>
//                   )}
//                 </>
//               );
//             }}
//           </Form.Item>
//         </Form>
//         <ErrorModal visible={errorVisible} error={error} onClose={closeModal} />
//       </Modal>
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Modal, Button, message, Form, Select } from "antd";
// import axios from "axios";
// import useDocuments from "../../../stores/Cabinet/useDocuments";
// import UploaderInput from "../../FormComponents/UploaderInput";
// import ErrorModal from "../../ErrorModal";

// const { Option } = Select;
// const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

// export default function ModalAddDocument({ visible, onClose, categoryKey }) {
//   const openModalAdd = useDocuments((state) => state.openModalAdd);
//   const setOpenModalAdd = useDocuments((state) => state.setOpenModalAdd);
//   const fetchDocuments = useDocuments((state) => state.fetchDocuments);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [errorVisible, setErrorVisible] = useState(false);
//   const [uploaderKey, setUploaderKey] = useState(0);

//   const [form] = Form.useForm();

//   const token = localStorage.getItem("jwt");

//   const [categoriesData, setCategoriesData] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [allowedExtensions, setAllowedExtensions] = useState([]);
//   const [maxFileSize, setMaxFileSize] = useState(10); // По умолчанию 10 МБ
//   const [isCategoryDisabled, setIsCategoryDisabled] = useState(false); // Добавлено

//   useEffect(() => {
//     // Получение категорий документов из бэкенда
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           `${backServer}/api/cabinet/documents/categories`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             withCredentials: true,
//           }
//         );
//         setCategoriesData(response.data.categories);
//         // Извлекаем уникальные категории
//         const uniqueCategories = response.data.categories.map(
//           (item) => item.category.Description
//         );
//         setCategories(uniqueCategories);
//       } catch (error) {
//         console.error("Ошибка при загрузке категорий документов:", error);
//       }
//     };

//     fetchCategories();
//   }, [token]);

//   useEffect(() => {
//     if (categoryKey && categoriesData.length > 0) {
//       const selectedCategoryItem = categoriesData.find(
//         (item) => item.category.Ref_Key === categoryKey
//       );
//       if (selectedCategoryItem) {
//         const selectedCategory = selectedCategoryItem.category.Description;
//         form.setFieldsValue({
//           category: selectedCategory,
//           documentName: selectedCategoryItem.category.label,
//         });
//         setIsCategoryDisabled(true); // Блокируем поля
//         // Устанавливаем допустимые расширения и максимальный размер файла
//         const extensions = JSON.parse(
//           selectedCategoryItem.category.availableExtensionsJSON
//         );
//         setAllowedExtensions(extensions);
//         setMaxFileSize(parseInt(selectedCategoryItem.category.maximumSize));
//         form.setFieldsValue({
//           categoryKey: selectedCategoryItem.category.Ref_Key,
//         });
//       }
//     } else {
//       setIsCategoryDisabled(false); // Разблокируем поля
//     }
//   }, [categoryKey, categoriesData, form]);

//   const handleModalClose = () => {
//     if (onClose) {
//       onClose();
//     } else {
//       setOpenModalAdd(false);
//     }
//     form.resetFields();
//     setAllowedExtensions([]);
//     setMaxFileSize(10);
//     setUploaderKey((prevKey) => prevKey + 1);
//     setIsCategoryDisabled(false); // Сбрасываем блокировку полей
//   };

//   const handleSaveDocument = async (values) => {
//     try {
//       setLoading(true);
//       const files = form.getFieldValue("fileDoc");

//       if (!files || files.length === 0) {
//         message.error("Пожалуйста, загрузите файлы");
//         setLoading(false);
//         return;
//       }

//       const formData = new FormData();
//       formData.append("category", values.category);
//       formData.append("documentName", values.documentName);
//       formData.append("categoryKey", values.categoryKey);

//       files.forEach((file) => {
//         formData.append("files", file.originFileObj);
//       });

//       const token = localStorage.getItem("jwt");

//       const response = await axios.post(
//         `${backServer}/api/cabinet/upload-file`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );

//       message.success("Документ успешно сохранен");
//       fetchDocuments(categoryKey);
//       handleModalClose();
//       setLoading(false);
//       setUploaderKey((prevKey) => prevKey + 1);
//     } catch (error) {
//       console.error("Ошибка при сохранении документа:", error);
//       setError(error.message || "Неизвестная ошибка");
//       setErrorVisible(true);
//       setLoading(false);
//     }
//   };

//   const closeModal = () => {
//     setErrorVisible(false);
//   };

//   return (
//     <>
//       <Modal
//         title="Загрузить новый документ"
//         open={openModalAdd || visible}
//         onCancel={handleModalClose}
//         footer={null}
//       >
//         <Form form={form} onFinish={handleSaveDocument}>
//           {/* Поле выбора категории */}
//           <Form.Item
//             label="Категория"
//             name="category"
//             rules={[
//               {
//                 required: true,
//                 message: "Пожалуйста, выберите категорию документа",
//               },
//             ]}
//           >
//             <Select
//               placeholder="Выберите категорию"
//               disabled={isCategoryDisabled}
//             >
//               {categories.map((category, index) => (
//                 <Option key={index} value={category}>
//                   {category}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>

//           {/* Поле выбора названия документа, зависит от категории */}
//           <Form.Item
//             shouldUpdate={(prevValues, currentValues) =>
//               prevValues.category !== currentValues.category
//             }
//           >
//             {() => {
//               const selectedCategory = form.getFieldValue("category");
//               const filteredDocuments = categoriesData.filter(
//                 (doc) => doc.category.Description === selectedCategory
//               );

//               return (
//                 <Form.Item
//                   label="Название"
//                   name="documentName"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Пожалуйста, выберите название документа",
//                     },
//                   ]}
//                 >
//                   <Select
//                     placeholder={
//                       selectedCategory
//                         ? "Выберите название документа"
//                         : "Сначала выберите категорию"
//                     }
//                     disabled={!selectedCategory || isCategoryDisabled}
//                     onChange={(value, option) => {
//                       // Устанавливаем допустимые расширения и максимальный размер
//                       const selectedDoc = filteredDocuments.find(
//                         (doc) => doc.category.label === value
//                       );
//                       if (selectedDoc) {
//                         const extensions = JSON.parse(
//                           selectedDoc.category.availableExtensionsJSON
//                         );
//                         setAllowedExtensions(extensions);
//                         setMaxFileSize(
//                           parseInt(selectedDoc.category.maximumSize)
//                         );
//                         form.setFieldsValue({
//                           categoryKey: selectedDoc.category.Ref_Key,
//                         });
//                       }
//                     }}
//                   >
//                     {filteredDocuments.map((doc) => (
//                       <Option
//                         key={doc.category.Ref_Key}
//                         value={doc.category.label}
//                       >
//                         {doc.category.label}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//               );
//             }}
//           </Form.Item>

//           <Form.Item name="categoryKey" hidden>
//             <input type="hidden" />
//           </Form.Item>

//           <UploaderInput
//             resetTrigger={uploaderKey}
//             allowedExtensions={allowedExtensions}
//             maxFileSize={maxFileSize}
//           />

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
