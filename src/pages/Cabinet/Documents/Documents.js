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
    // Асинхронная функция для получения файла по относительному пути.

    const fileblob = await axios.get(
      `${config.backServer}/api/cabinet/get-file/${relativePath}`,
      // Используем интерполяцию строк для вставки относительного пути в URL запроса.
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          // В заголовки запроса добавляем токен авторизации, полученный из локального хранилища.
        },
        withCredentials: true,
        // Этот параметр нужен для отправки запросов с учетными данными (например, куки).
        responseType: "blob",
        // Указываем, что ожидаем получить бинарные данные (blob) в ответе.
      }
    );

    if (!fileblob.data) throw new Error("Ошибка получения файла");
    // Если в ответе нет данных, выбрасываем ошибку с соответствующим сообщением.

    return window.URL.createObjectURL(fileblob.data);
    // Возвращаем объект URL, созданный из бинарных данных, для использования в качестве источника файла.
  };

  function customRequest({ file, onSuccess, onError }) {
    // Функция для обработки пользовательского запроса на загрузку файла.
    const formData = new FormData();
    formData.append("file", file);
    // Создаем объект FormData и добавляем в него файл для отправки.

    const token = localStorage.getItem("jwt");
    // Получаем токен авторизации из локального хранилища.

    axios
      .post(`${config.backServer}/api/cabinet/upload-file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Указываем, что данные передаются в формате multipart/form-data.
          Authorization: `Bearer ${token}`,
          // Добавляем токен авторизации в заголовки запроса.
        },
        withCredentials: true,
        // Этот параметр нужен для отправки запросов с учетными данными (например, куки).
      })
      .then(async (response) => {
        const relativePath = response.data.files[0];
        files.push(relativePath);
        // Обновляем список файлов, добавляя путь к новому файлу.

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
        // Обновляем состояние fileList новыми данными о файле.

        onSuccess(relativePath, file);
        // Сообщаем об успешной загрузке файла.

        message.success(`Файлы успешно загружены`);
        // Показываем сообщение об успешной загрузке файлов.
      })
      .catch((error) => {
        console.error("Ошибка при загрузке файла", error);
        onError(error);
        message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
        // Обрабатываем ошибки при загрузке файла.
      });
  }

  const handleSaveDocument = async (values) => {
    // Асинхронная функция для сохранения документа.

    try {
      const formData = {
        documentName: values.documentName,
        // Извлекаем название документа из значений формы.
        files: fileList.map((file) => ({
          name: file.name,
          originFileObj: file.originFileObj,
          // Из списка файлов извлекаем имя файла и его исходный объект.
        })),
      };

      const token = localStorage.getItem("jwt");
      // Получаем токен авторизации из локального хранилища.

      const response = await axios.post(
        `${config.backServer}/api/cabinet/documents`,
        // Отправляем POST-запрос на сервер для сохранения документа.
        formData,
        // В тело запроса передаем данные формы (название документа и файлы).
        {
          headers: {
            "Content-Type": "application/json",
            // Указываем, что данные передаются в формате JSON.
            Authorization: `Bearer ${token}`,
            // Добавляем токен авторизации в заголовки запроса.
          },
          withCredentials: true,
          // Этот параметр нужен для отправки запросов с учетными данными (например, куки).
        }
      );

      console.log("response", response);
      // Выводим ответ сервера в консоль.

      message.success("Документ успешно сохранен");
      // Показываем сообщение об успешном сохранении.

      setShowModalAdd(false);
      form.resetFields();
      setFileList([]);
      // Закрываем модальное окно, сбрасываем поля формы и очищаем список файлов.
    } catch (error) {
      console.error("Ошибка при сохранении документа:", error);
      message.error("Не удалось сохранить документ");
      // В случае ошибки выводим ее в консоль и показываем сообщение об ошибке.
    }
  };

  const handleModalClose = () => {
    // Функция для закрытия модального окна и сброса формы.
    setShowModalAdd(false);
    // Закрываем модальное окно.

    form.resetFields();
    // Сбрасываем поля формы.
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
