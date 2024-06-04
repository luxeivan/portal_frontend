import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Flex,
  Modal,
  Button,
  Upload,
  message,
  Form,
  Select,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import config from "../../../config";

const { Title } = Typography;
const { Option } = Select;

const stylesForCard = {
  body: {
    height: "100%",
    width: 250,
    minHeight: 250,
  },
  actions: { marginTop: "-20px" },
  header: { backgroundColor: "red" },
};

export default function Documents() {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [documentName, setDocumentName] = useState("");

  useEffect(() => {
    // Загружаем существующие документы при монтировании компонента
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    // Загружаем существующие документы с бэкенда и обновляем состояние
    try {
      const response = await axios.get(`${config.backServer}/api/documents`);
      setFileList(response.data.documents);
    } catch (error) {
      console.error("Ошибка при загрузке документов:", error);
      message.error("Не удалось загрузить документы");
    }
  };

  const handleDocumentNameChange = (value) => {
    setDocumentName(value);
  };

  const handleUploadSuccess = (file) => {
    // Логика для обработки успешной загрузки файла
    console.log("Файл успешно загружен:", file);
    message.success(`Файл "${file.name}" успешно загружен`);
  };

  const getFile = async (relativePath) => {
    const fileblob = await axios.get(
      `${config.backServer}/api/cabinet/get-file/${relativePath}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        withCredentials: true,
        responseType: "blob",
      }
    );
    if (!fileblob.data) throw new Error("Ошибка получения файла");

    return window.URL.createObjectURL(fileblob.data);
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    // Своя логика для загрузки файла
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("jwt");

    axios
      .post(`${config.backServer}/api/cabinet/upload-file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then(async (response) => {
        const relativePath = response.data.files[0];
        const fileUrl = await getFile(relativePath);
        setFileList((prev) => [
          ...prev,
          {
            crossOrigin: "use-credentials",
            uid: relativePath,
            name: file.name,
            status: "done",
            url: fileUrl,
          },
        ]);
        onSuccess(relativePath, file);
        message.success(`Файлы успешно загружены`);
        setShowModalAdd(false); // Закрываем модальное окно после успешной загрузки файла
      })
      .catch((error) => {
        console.error("Ошибка при загрузке файла", error);
        onError(error);
        message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
      });
  };

  const handleUploadError = (error, file) => {
    // Логика для обработки ошибок при загрузке файла
    console.error("Ошибка при загрузке файла:", error);
    message.error(`Файл "${file.name}" не удалось загрузить`);
  };

  const handleUpload = (values) => {
    // Логика для отправки данных на бэкэнд
    const formData = new FormData();
    formData.append("documentName", values.documentName);
    formData.append("file", values.files.file);

    const token = localStorage.getItem("jwt");

    axios
      .post(`${config.backServer}/api/documents`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        message.success("Документ успешно загружен");
        setShowModalAdd(false); // Закрываем модальное окно
        fetchDocuments(); // Обновляем список документов
      })
      .catch((error) => {
        console.error("Ошибка при загрузке документа:", error);
        message.error("Не удалось загрузить документ");
      });
  };

  return (
    <div>
      <Title level={1}>Документы</Title>
      <Flex wrap="wrap" gap="large">
        {/* Существующие документы */}
        {fileList.map((document, index) => (
          <Card key={index} hoverable styles={stylesForCard}>
            {/* Отображение информации о документе */}
          </Card>
        ))}
        {/* Карточка для добавления нового документа */}
        <Card
          hoverable
          styles={stylesForCard}
          onClick={() => setShowModalAdd(true)}
        >
          <Flex
            align="stretch"
            justify="center"
            style={{ minHeight: "100%", width: "100%" }}
          >
            <PlusOutlined />
          </Flex>
        </Card>
      </Flex>
      {/* Модальное окно для загрузки нового документа */}
      <Modal
        title="Загрузить новый документ"
        visible={showModalAdd}
        onCancel={() => setShowModalAdd(false)}
        footer={null}
        width={700}
      >
        <Flex gap="large" wrap="wrap" justify="center">
          <Form onFinish={handleUpload}>
            {/* Выпадающий список для выбора названия документа */}
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
              <Select onChange={handleDocumentNameChange}>
                <Option value="Document 1">Паспорт</Option>
                <Option value="Document 2">Доверенность</Option>
              </Select>
            </Form.Item>
            {/* Компонент для загрузки файла */}
            <Form.Item
              label="Загрузить файл"
              name="files"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e && [e.file])}
              rules={[
                { required: true, message: "Пожалуйста, загрузите файлы" },
              ]}
            >
              <Upload
                listType="picture"
                customRequest={customRequest}
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                multiple
              >
                <Button icon={<UploadOutlined />}>Загрузить</Button>
              </Upload>
            </Form.Item>
            {/* Кнопка для отправки формы */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Отправить файлы
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Modal>
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import {
//   Typography,
//   Card,
//   Flex,
//   Modal,
//   Button,
//   Upload,
//   message,
//   Form,
//   Select,
// } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
// import axios from "axios";
// import config from "../../../config";

// const { Title } = Typography;
// const { Option } = Select;

// const stylesForCard = {
//   body: {
//     height: "100%",
//     width: 250,
//     minHeight: 250,
//   },
//   actions: { marginTop: "-20px" },
//   header: { backgroundColor: "red" },
// };

// export default function Documents() {
//   const [showModalAdd, setShowModalAdd] = useState(false);
//   const [fileList, setFileList] = useState([]);
//   const [documentName, setDocumentName] = useState("");

//   useEffect(() => {
//     // Загружаем существующие документы при монтировании компонента
//     fetchDocuments();
//   }, []);

//   const fetchDocuments = async () => {
//     // Загружаем существующие документы с бэкенда и обновляем состояние
//     try {
//       const response = await axios.get(`${config.backServer}/api/documents`);
//       setFileList(response.data.documents);
//     } catch (error) {
//       console.error("Ошибка при загрузке документов:", error);
//       message.error("Не удалось загрузить документы");
//     }
//   };

//   const handleDocumentNameChange = (value) => {
//     setDocumentName(value);
//   };

//   const handleUploadSuccess = (file) => {
//     // Логика для обработки успешной загрузки файла
//     console.log("Файл успешно загружен:", file);
//     message.success(`Файл "${file.name}" успешно загружен`);
//   };

//   const getFile = async (relativePath) => {
//     const fileblob = await axios.get(
//       `${config.backServer}/api/cabinet/get-file/${relativePath}`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//         withCredentials: true,
//         responseType: "blob",
//       }
//     );
//     if (!fileblob.data) throw new Error("Ошибка получения файла");

//     return window.URL.createObjectURL(fileblob.data);
//   };

//   const customRequest = ({ file, onSuccess, onError }) => {
//     // Своя логика для загрузки файла
//     const formData = new FormData();
//     formData.append("file", file);
//     const token = localStorage.getItem("jwt");

//     axios
//       .post(`${config.backServer}/api/cabinet/upload-file`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       })
//       .then(async (response) => {
//         const relativePath = response.data.files[0];
//         const fileUrl = await getFile(relativePath);
//         setFileList((prev) => [
//           ...prev,
//           {
//             crossOrigin: "use-credentials",
//             uid: relativePath,
//             name: file.name,
//             status: "done",
//             url: fileUrl,
//           },
//         ]);
//         onSuccess(relativePath, file);
//         message.success(`Файлы успешно загружены`);
//       })
//       .catch((error) => {
//         console.error("Ошибка при загрузке файла", error);
//         onError(error);
//         message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
//       });
//   };

//   const handleUploadError = (error, file) => {
//     // Логика для обработки ошибок при загрузке файла
//     console.error("Ошибка при загрузке файла:", error);
//     message.error(`Файл "${file.name}" не удалось загрузить`);
//   };

//   const handleUpload = (values) => {
//     // Логика для отправки данных на бэкэнд
//     const formData = new FormData();
//     formData.append("documentName", values.documentName);
//     formData.append("file", values.files.file);

//     const token = localStorage.getItem("jwt");

//     axios
//       .post(`${config.backServer}/api/documents`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       })
//       .then((response) => {
//         message.success("Документ успешно загружен");
//         setShowModalAdd(false); // Закрываем модальное окно
//         fetchDocuments(); // Обновляем список документов
//       })
//       .catch((error) => {
//         console.error("Ошибка при загрузке документа:", error);
//         message.error("Не удалось загрузить документ");
//       });
//   };

//   return (
//     <div>
//       <Title level={1}>Документы</Title>
//       <Flex wrap="wrap" gap="large">
//         {/* Существующие документы */}
//         {fileList.map((document, index) => (
//           <Card key={index} hoverable styles={stylesForCard}>
//             {/* Отображение информации о документе */}
//           </Card>
//         ))}
//         {/* Карточка для добавления нового документа */}
//         <Card
//           hoverable
//           styles={stylesForCard}
//           onClick={() => setShowModalAdd(true)}
//         >
//           <Flex
//             align="stretch"
//             justify="center"
//             style={{ minHeight: "100%", width: "100%" }}
//           >
//             <PlusOutlined />
//           </Flex>
//         </Card>
//       </Flex>
//       {/* Модальное окно для загрузки нового документа */}
//       <Modal
//         title="Загрузить новый документ"
//         visible={showModalAdd}
//         onCancel={() => setShowModalAdd(false)}
//         footer={null}
//         width={700}
//       >
//         <Flex gap="large" wrap="wrap" justify="center">
//           <Form onFinish={handleUpload}>
//             {/* Выпадающий список для выбора названия документа */}
//             <Form.Item
//               label="Название"
//               name="documentName"
//               rules={[
//                 {
//                   required: true,
//                   message: "Пожалуйста, выберите название документа",
//                 },
//               ]}
//             >
//               <Select onChange={handleDocumentNameChange}>
//                 <Option value="Document 1">Паспорт</Option>
//                 <Option value="Document 2">Доверенность</Option>
//               </Select>
//             </Form.Item>
//             {/* Компонент для загрузки файла */}
//             <Form.Item
//               label="Загрузить файл"
//               name="files"
//               valuePropName="fileList"
//               getValueFromEvent={(e) => (Array.isArray(e) ? e : e && [e.file])}
//               rules={[
//                 { required: true, message: "Пожалуйста, загрузите файлы" },
//               ]}
//             >
//               <Upload
//                 listType="picture"
//                 customRequest={customRequest}
//                 onUploadSuccess={handleUploadSuccess}
//                 onUploadError={handleUploadError}
//                 multiple
//               >
//                 <Button icon={<UploadOutlined />}>Загрузить</Button>
//               </Upload>
//             </Form.Item>
//             {/* Кнопка для отправки формы */}
//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Отправить файлы
//               </Button>
//             </Form.Item>
//           </Form>
//         </Flex>
//       </Modal>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import {
//   Typography,
//   Card,
//   Flex,
//   Modal,
//   Button,
//   Upload,
//   message,
//   Form,
//   Select,
// } from "antd";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
// import axios from "axios";
// import config from "../../../config";

// const { Title } = Typography;
// const { Option } = Select;

// const stylesForCard = {
//   body: {
//     height: "100%",
//     width: 250,
//     minHeight: 250,
//   },
//   actions: { marginTop: "-20px" },
//   header: { backgroundColor: "red" },
// };

// export default function Documents() {
//   const [showModalAdd, setShowModalAdd] = useState(false);
//   const [fileList, setFileList] = useState([]);
//   const [documentName, setDocumentName] = useState("");

//   useEffect(() => {
//     // Загружаем существующие документы при монтировании компонента
//     fetchDocuments();
//   }, []);

//   const fetchDocuments = async () => {
//     // Загружаем существующие документы с бэкенда и обновляем состояние
//     try {
//       const response = await axios.get(`${config.backServer}/api/documents`);
//       setFileList(response.data.documents);
//     } catch (error) {
//       console.error("Ошибка при загрузке документов:", error);
//       message.error("Не удалось загрузить документы");
//     }
//   };

//   const handleDocumentNameChange = (value) => {
//     setDocumentName(value);
//   };

//   const handleUploadSuccess = (file) => {
//     // Логика для обработки успешной загрузки файла
//     console.log("Файл успешно загружен:", file);
//     message.success(`Файл "${file.name}" успешно загружен`);
//     // Где-то тут мы попозже добавим логику для обновления состояния новыми загруженными файлами
//     // Где-то тут мы попозже обновим бэк для сохранения информации о файле
//   };

//   const getFile = async (relativePath) => {
//     const fileblob = await axios.get(
//       `${config.backServer}/api/cabinet/get-file/${relativePath}`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//         withCredentials: true,
//         responseType: "blob",
//       }
//     );
//     if (!fileblob.data) throw new Error("Ошибка получения файла");

//     return window.URL.createObjectURL(fileblob.data);
//   };

//   const customRequest = ({ file, onSuccess, onError }) => {
//     // Своя логика для загрузки файла
//     const formData = new FormData();
//     formData.append("file", file);
//     const token = localStorage.getItem("jwt");

//     axios
//       .post(`${config.backServer}/api/cabinet/upload-file`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       })
//       .then(async (response) => {
//         const relativePath = response.data.files[0];
//         const fileUrl = await getFile(relativePath);
//         setFileList((prev) => [
//           ...prev,
//           {
//             crossOrigin: "use-credentials",
//             uid: relativePath,
//             name: file.name,
//             status: "done",
//             url: fileUrl,
//           },
//         ]);
//         onSuccess(relativePath, file);
//         message.success(`Файлы успешно загружены`);
//       })
//       .catch((error) => {
//         console.error("Ошибка при загрузке файла", error);
//         onError(error);
//         message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
//       });
//   };

//   const handleUploadError = (error, file) => {
//     // Логика для обработки ошибок при загрузке файла
//     console.error("Ошибка при загрузке файла:", error);
//     message.error(`Файл "${file.name}" не удалось загрузить`);
//   };

//   const handleUpload = () => {
//     // Логика для загрузки файла
//   };

//   return (
//     <div>
//       <Title level={1}>Документы</Title>
//       <Flex wrap="wrap" gap="large">
//         {/* Существующие документы */}
//         {fileList.map((document, index) => (
//           <Card key={index} hoverable styles={stylesForCard}>
//             {/* Отображение информации о документе */}
//           </Card>
//         ))}
//         {/* Карточка для добавления нового документа */}
//         <Card
//           hoverable
//           styles={stylesForCard}
//           onClick={() => setShowModalAdd(true)}
//         >
//           <Flex
//             align="stretch"
//             justify="center"
//             style={{ minHeight: "100%", width: "100%" }}
//           >
//             <PlusOutlined />
//           </Flex>
//         </Card>
//       </Flex>
//       {/* Модальное окно для загрузки нового документа */}
//       <Modal
//         title="Загрузить новый документ"
//         visible={showModalAdd}
//         onCancel={() => setShowModalAdd(false)}
//         footer={null}
//         width={700}
//       >
//         <Flex gap="large" wrap="wrap" justify="center">
//           <Form onFinish={handleUpload}>
//             {/* Выпадающий список для выбора названия документа */}
//             <Form.Item
//               label="Название"
//               name="documentName"
//               rules={[
//                 {
//                   required: true,
//                   message: "Пожалуйста, выберите название документа",
//                 },
//               ]}
//             >
//               <Select onChange={handleDocumentNameChange}>
//                 <Option value="Document 1">Паспорт</Option>
//                 <Option value="Document 2">Доверенность</Option>
//               </Select>
//             </Form.Item>
//             {/* Компонент для загрузки файла */}
//             <Form.Item
//               label="Загрузить файл"
//               name="files"
//               rules={[
//                 { required: true, message: "Пожалуйста, загрузите файлы" },
//               ]}
//             >
//               <Upload
//                 listType="picture"
//                 customRequest={customRequest}
//                 onUploadSuccess={handleUploadSuccess}
//                 onUploadError={handleUploadError}
//                 multiple
//               >
//                 <Button icon={<UploadOutlined />}>Загрузить</Button>
//               </Upload>
//             </Form.Item>
//             {/* Кнопка для отправки формы */}
//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Отправить файлы
//               </Button>
//             </Form.Item>
//           </Form>
//         </Flex>
//       </Modal>
//     </div>
//   );
// }

//Первый вариант
// import React, { useEffect, useState } from "react";
// import {
//   Typography,
//   Card,
//   Flex,
//   Modal,
//   Button,
//   Image,
//   Upload,
//   message,
//   Input,
//   Form,
// } from "antd";
// import useRelations from "../../../stores/Cabinet/useRelations";
// import styles from "./Documents.module.css";
// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
// import SceletonCard from "../../../components/SceletonCard";
// import AppHelmet from "../../../components/Global/AppHelmet";
// import config from "../../../config";
// import axios from "axios";

// const { Title } = Typography;
// const { Meta } = Card;

// const stylesForCard = {
//   body: {
//     height: "100%",
//     width: 250,
//     minHeight: 250,
//   },
//   actions: { marginTop: "-20px" },
//   header: { backgroundColor: "red" },
// };

// export default function Documents() {
//   const [showModalAdd, setShowModalAdd] = useState(false);
//   const [fileList, setFileList] = useState([
//     {
//       uid: "0",
//       name: "xxx.png",
//       status: "uploading",
//       percent: 33,
//     },
//     {
//       uid: "-1",
//       name: "yyy.png",
//       status: "done",
//       url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//       thumbUrl:
//         "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//     },
//     {
//       uid: "-2",
//       name: "zzz.png",
//       status: "error",
//     },
//   ]);
//   let files = [];
//   const getFile = async (relativePath) => {
//     const fileblob = await axios.get(
//       `${config.backServer}/api/cabinet/get-file/${relativePath}`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//         withCredentials: true,
//         responseType: "blob",
//       }
//     );
//     if (!fileblob.data) throw new Error("Ошибка получения файла");

//     return window.URL.createObjectURL(fileblob.data);
//   };
//   function customRequest({ file, onSuccess, onError }) {
//     const formData = new FormData();
//     formData.append("file", file);
//     const token = localStorage.getItem("jwt");

//     axios
//       .post(`${config.backServer}/api/cabinet/upload-file`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       })
//       .then(async (response) => {
//         const relativePath = response.data.files[0];
//         files.push(relativePath);
//         const fileUrl = await getFile(relativePath);
//         setFileList((prev) => [
//           ...prev,
//           {
//             crossOrigin: "use-credentials",
//             uid: relativePath,
//             name: file.name,
//             status: "done",
//             url: fileUrl,
//           },
//         ]);
//         onSuccess(relativePath, file);
//         // form.setFieldsValue({ fileDoc: files });
//         message.success(`Файлы успешно загружены`);
//       })
//       .catch((error) => {
//         console.error("Ошибка при загрузке файла", error);
//         onError(error);
//         message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
//       });
//   }
//   return (
//     <div>
//       <AppHelmet title={"Документы"} desc={"Документы"} />
//       <Title level={1}>Документы</Title>
//       <Flex wrap="wrap" gap="large">
//         <Card hoverable styles={stylesForCard}></Card>
//         <Card
//           hoverable
//           styles={stylesForCard}
//           className={styles.objectCard}
//           onClick={() => setShowModalAdd(true)}
//         >
//           <Flex
//             align="stretch"
//             justify="center"
//             style={{ minHeight: "100%", width: "100%" }}
//           >
//             <PlusOutlined />
//           </Flex>
//         </Card>
//       </Flex>
//       <Modal
//         title="Загрузить новый документ"
//         open={showModalAdd}
//         onCancel={() => setShowModalAdd(false)}
//         footer={null}
//         width={700}
//         name="type"
//       >
//         <Flex gap="large" wrap="wrap" justify="center">
//           <Form>
//             <Form.Item label={"Наименование документа"} name={"name"}>
//               <Input />
//             </Form.Item>
//             <Form.Item name={"fileName"} hidden>
//               <Input />
//             </Form.Item>

//             <Upload
//               // action={`${config.backServer}/api/cabinet/upload-file`}
//               listType="picture"
//               defaultFileList={[...fileList]}
//               className={styles.uploadListInline}
//               customRequest={customRequest}
//               maxCount={1}
//             >
//               <Button icon={<UploadOutlined />}>Загрузить...</Button>
//             </Upload>
//           </Form>
//         </Flex>
//       </Modal>
//     </div>
//   );
// }
