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
  const [savePercent, setSavePercent] = useState(0);
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

      // Имитация процесса сохранения
      let percent = 0;
      const interval = setInterval(() => {
        percent += 20; // Увеличиваем процент на 20 каждый раз
        setSavePercent(percent);
        if (percent >= 100) {
          clearInterval(interval);
        }
      }, 200); // Обновляем каждые 200 миллисекунд

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

      clearInterval(interval); // Останавливаем имитацию
      setSavePercent(100); // Устанавливаем прогресс на 100%

      console.log("response", response);
      message.success("Документ успешно сохранен");

      setShowModalAdd(false);
      form.resetFields();
      setFileList([]);
      setLoading(false);
      setLoadingMessage("");
      setSavePercent(0); // Сбрасываем процент сохранения
    } catch (error) {
      console.error("Ошибка при сохранении документа:", error);
      message.error("Не удалось сохранить документ");
      setLoading(false);
      setLoadingMessage("");
      setSavePercent(0); // Сбрасываем процент сохранения
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
                <Progress
                  percent={
                    loadingMessage === "Пожалуйста, подождите, файл загружается"
                      ? uploadPercent
                      : savePercent
                  }
                />
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
