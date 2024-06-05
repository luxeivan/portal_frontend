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

  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("jwt");

    try {
      const response = await axios.post(
        "/api/upload", // URL вашего бэкенда
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      onSuccess(response.data);
      message.success(`Файл "${file.name}" успешно загружен`);

      // Логируем загруженные файлы в консоль
      const fileUrl = URL.createObjectURL(file);
      console.log("Загруженные файлы:", { name: file.name, url: fileUrl });

      setFileList((prevList) => [
        ...prevList,
        { uid: file.uid, name: file.name, status: "done", url: fileUrl },
      ]);

      setShowModalAdd(false);
    } catch (error) {
      console.error("Ошибка при загрузке файла", error);
      onError(error);
      message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
    }
  };

  const handleSaveDocument = async (values) => {
    console.log("Сохранение документа с данными:", values);
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
