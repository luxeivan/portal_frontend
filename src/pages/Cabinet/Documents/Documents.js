import React, { useState } from "react";
import {
  Typography,
  Card,
  Modal,
  Button,
  Upload,
  message,
  Form,
  Select,
  Spin,
  Progress,
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

const Documents = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [uploadPercent, setUploadPercent] = useState(0);
  const [form] = Form.useForm();

  let files = [];

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

  function customRequest({ file, onSuccess, onError }) {
    setLoading(true);
    setLoadingMessage("Пожалуйста, подождите, файл загружается");

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
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadPercent(percent);
        },
      })
      .then(async (response) => {
        const relativePath = response.data.files[0];
        files.push(relativePath);

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
        setLoading(false);
        setLoadingMessage("");
        setUploadPercent(0);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке файла", error);
        onError(error);
        message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
        setLoading(false);
        setLoadingMessage("");
        setUploadPercent(0);
      });
  }

  const handleSaveDocument = async (values) => {
    try {
      setLoading(true);
      setLoadingMessage("Пожалуйста, подождите, файл сохраняется");

      const formData = {
        documentName: values.documentName,
        files: fileList.map((file) => ({
          name: file.name,
          originFileObj: file.originFileObj,
        })),
      };

      const token = localStorage.getItem("jwt");

      const response = await axios.post(
        `${config.backServer}/api/cabinet/documents`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("response", response);
      message.success("Документ успешно сохранен");

      setShowModalAdd(false);
      form.resetFields();
      setFileList([]);
      setLoading(false);
      setLoadingMessage("");
    } catch (error) {
      console.error("Ошибка при сохранении документа:", error);
      message.error("Не удалось сохранить документ");
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const handleModalClose = () => {
    setShowModalAdd(false);
    form.resetFields();
  };

  return (
    <div>
      <Title level={1}>Документы</Title>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {fileList.map((file) => (
          <Card
            key={file.uid}
            hoverable
            style={{ width: 250, height: 250 }}
            cover={<img alt={file.name} src={file.url} />}
          >
            <Card.Meta title={file.name} />
          </Card>
        ))}
        <Card
          hoverable
          style={{
            width: 250,
            height: 250,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowModalAdd(true)}
        >
          <PlusOutlined style={{ fontSize: "24px" }} />
        </Card>
      </div>
      <Modal
        title="Загрузить новый документ"
        visible={showModalAdd}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form form={form} onFinish={handleSaveDocument}>
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
              <Option value="passport">Паспорт</Option>
              <Option value="authorization">Доверенность</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Загрузить файл"
            name="files"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && [e.file])}
            rules={[{ required: true, message: "Пожалуйста, загрузите файлы" }]}
          >
            <Upload
              listType="picture"
              customRequest={customRequest}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              multiple
            >
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
            {loading && (
              <div style={{ marginTop: 16 }}>
                <Spin tip={loadingMessage} />
                <Progress percent={uploadPercent} />
              </div>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              Сохранить файлы
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Documents;

// import React, { useState } from "react";
// import {
//   Typography,
//   Card,
//   Modal,
//   Button,
//   Upload,
//   message,
//   Form,
//   Select,
//   Spin,
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

// const Documents = () => {
//   const [showModalAdd, setShowModalAdd] = useState(false);
//   const [fileList, setFileList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingMessage, setLoadingMessage] = useState("");
//   const [form] = Form.useForm();

//   let files = [];

//   const getFile = async (relativePath) => {
//     // Асинхронная функция для получения файла по относительному пути.

//     const fileblob = await axios.get(
//       `${config.backServer}/api/cabinet/get-file/${relativePath}`,
//       // Используем интерполяцию строк для вставки относительного пути в URL запроса.
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           // В заголовки запроса добавляем токен авторизации, полученный из локального хранилища.
//         },
//         withCredentials: true,
//         // Этот параметр нужен для отправки запросов с учетными данными (например, куки).
//         responseType: "blob",
//         // Указываем, что ожидаем получить бинарные данные (blob) в ответе.
//       }
//     );

//     if (!fileblob.data) throw new Error("Ошибка получения файла");
//     // Если в ответе нет данных, выбрасываем ошибку с соответствующим сообщением.

//     return window.URL.createObjectURL(fileblob.data);
//     // Возвращаем объект URL, созданный из бинарных данных, для использования в качестве источника файла.
//   };

//   function customRequest({ file, onSuccess, onError }) {
//     setLoading(true); // Устанавливаем состояние загрузки в true для отображения прелоадера
//     setLoadingMessage("Пожалуйста, подождите, файл загружается"); // Устанавливаем сообщение о загрузке

//     const formData = new FormData();
//     formData.append("file", file); // Добавляем файл в formData
//     const token = localStorage.getItem("jwt"); // Получаем токен авторизации из локального хранилища

//     axios
//       .post(`${config.backServer}/api/cabinet/upload-file`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data", // Указываем тип контента
//           Authorization: `Bearer ${token}`, // Добавляем токен авторизации в заголовки
//         },
//         withCredentials: true, // Отправляем запрос с учетными данными
//       })
//       .then(async (response) => {
//         const relativePath = response.data.files[0]; // Получаем относительный путь файла из ответа сервера
//         files.push(relativePath); // Добавляем путь файла в массив files

//         const fileUrl = await getFile(relativePath); // Получаем URL файла
//         setFileList((prev) => [
//           ...prev,
//           {
//             crossOrigin: "use-credentials",
//             uid: relativePath,
//             name: file.name,
//             status: "done",
//             url: fileUrl,
//           },
//         ]); // Обновляем состояние fileList новыми данными о файле

//         onSuccess(relativePath, file); // Сообщаем об успешной загрузке файла
//         message.success(`Файлы успешно загружены`); // Показываем сообщение об успешной загрузке файлов
//         setLoading(false); // Устанавливаем состояние загрузки в false
//         setLoadingMessage(""); // Очищаем сообщение о загрузке
//       })
//       .catch((error) => {
//         console.error("Ошибка при загрузке файла", error); // Выводим ошибку в консоль
//         onError(error); // Сообщаем об ошибке загрузки файла
//         message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`); // Показываем сообщение об ошибке загрузки файла
//         setLoading(false); // Устанавливаем состояние загрузки в false
//         setLoadingMessage(""); // Очищаем сообщение о загрузке
//       });
//   }

//   const handleSaveDocument = async (values) => {
//     try {
//       setLoading(true); // Устанавливаем состояние загрузки в true для отображения прелоадера
//       setLoadingMessage("Пожалуйста, подождите, файл сохраняется"); // Устанавливаем сообщение о сохранении

//       const formData = {
//         documentName: values.documentName, // Извлекаем название документа из значений формы
//         files: fileList.map((file) => ({
//           name: file.name,
//           originFileObj: file.originFileObj, // Из списка файлов извлекаем имя файла и его исходный объект
//         })),
//       };

//       const token = localStorage.getItem("jwt"); // Получаем токен авторизации из локального хранилища

//       const response = await axios.post(
//         `${config.backServer}/api/cabinet/documents`, // Отправляем POST-запрос на сервер для сохранения документа
//         formData, // В тело запроса передаем данные формы (название документа и файлы)
//         {
//           headers: {
//             "Content-Type": "application/json", // Указываем, что данные передаются в формате JSON
//             Authorization: `Bearer ${token}`, // Добавляем токен авторизации в заголовки запроса
//           },
//           withCredentials: true, // Отправляем запрос с учетными данными
//         }
//       );

//       console.log("response", response); // Выводим ответ сервера в консоль
//       message.success("Документ успешно сохранен"); // Показываем сообщение об успешном сохранении

//       setShowModalAdd(false); // Закрываем модальное окно
//       form.resetFields(); // Сбрасываем поля формы
//       setFileList([]); // Очищаем список файлов
//       setLoading(false); // Устанавливаем состояние загрузки в false
//       setLoadingMessage(""); // Очищаем сообщение о сохранении
//     } catch (error) {
//       console.error("Ошибка при сохранении документа:", error); // Выводим ошибку в консоль
//       message.error("Не удалось сохранить документ"); // Показываем сообщение об ошибке сохранения
//       setLoading(false); // Устанавливаем состояние загрузки в false
//       setLoadingMessage(""); // Очищаем сообщение о сохранении
//     }
//   };

//   const handleModalClose = () => {
//     // Функция для закрытия модального окна и сброса формы.
//     setShowModalAdd(false);
//     // Закрываем модальное окно.

//     form.resetFields();
//     // Сбрасываем поля формы.
//   };

//   return (
//     <div>
//       <Title level={1}>Документы</Title>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {fileList.map((file) => (
//           <Card
//             key={file.uid}
//             hoverable
//             style={{ width: 250, height: 250 }}
//             cover={<img alt={file.name} src={file.url} />}
//           >
//             <Card.Meta title={file.name} />
//           </Card>
//         ))}
//         <Card
//           hoverable
//           style={{
//             width: 250,
//             height: 250,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//           onClick={() => setShowModalAdd(true)}
//         >
//           <PlusOutlined style={{ fontSize: "24px" }} />
//         </Card>
//       </div>
//       <Modal
//         title="Загрузить новый документ"
//         visible={showModalAdd}
//         onCancel={handleModalClose}
//         footer={null}
//       >
//         {loading ? (
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Spin tip={loadingMessage} />
//           </div>
//         ) : (
//           <Form form={form} onFinish={handleSaveDocument}>
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
//               <Select>
//                 <Option value="passport">Паспорт</Option>
//                 <Option value="authorization">Доверенность</Option>
//               </Select>
//             </Form.Item>
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
//                 onChange={({ fileList: newFileList }) =>
//                   setFileList(newFileList)
//                 }
//                 multiple
//               >
//                 <Button icon={<UploadOutlined />}>Загрузить</Button>
//               </Upload>
//             </Form.Item>
//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Сохранить файлы
//               </Button>
//             </Form.Item>
//           </Form>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default Documents;
