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
        // form.setFieldsValue({ fileDoc: files });
        message.success(`Файлы успешно загружены`);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке файла", error);
        onError(error);
        message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
      });
  }

  const handleSaveDocument = async (values) => {
    console.log("values", values);
    console.log("fileList", fileList);
    message.success("Документ успешно сохранен");
    setShowModalAdd(false);
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
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Сохранить файлы
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Documents;

// import React, { useEffect, useState } from "react";
// import { Typography, Card, Flex, Modal, Button, Image, Upload, message, Input, Form } from "antd";
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
// }

// export default function Documents() {
//   const [showModalAdd, setShowModalAdd] = useState(false)
//   const [fileList, setFileList] = useState([
//     {
//       uid: '0',
//       name: 'xxx.png',
//       status: 'uploading',
//       percent: 33,
//     },
//     {
//       uid: '-1',
//       name: 'yyy.png',
//       status: 'done',
//       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     },
//     {
//       uid: '-2',
//       name: 'zzz.png',
//       status: 'error',
//     },
//   ])
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
//   }
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
//         const fileUrl = await getFile(relativePath)
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

//         <Card
//         hoverable
//           styles={stylesForCard}
//         >

//         </Card>
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
//             <Form.Item
//               label={'Наименование документа'}
//               name={'name'}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item

//               name={'fileName'}
//               hidden
//             >
//               <Input />
//             </Form.Item>

//             <Upload
//               listType="picture"
//               defaultFileList={[...fileList]}
//               className={styles.uploadListInline}
//               customRequest={customRequest}
//               maxCount={1}
//             >

//               <Button icon={<UploadOutlined />}>Загрузить...</Button>
//             </Upload>
//             <Button icon={<UploadOutlined />}>Добавить документ(ы)</Button>
//           </Form>
//         </Flex>
//       </Modal>
//     </div>
//   )
// }
