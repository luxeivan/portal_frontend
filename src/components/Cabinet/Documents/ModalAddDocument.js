import React, { useState } from "react";
import { Modal, Button, Form, Select, Spin, Progress, message } from "antd";
import config from "../../../config";
import axios from "axios";
import useDocuments from "../../../stores/Cabinet/useDocuments";
import UploaderInput from "../../FormComponents/UploaderInput";
const { Option } = Select;

export default function ModalAddDocument() {
  const openModalAdd = useDocuments((state) => state.openModalAdd);
  const setOpenModalAdd = useDocuments((state) => state.setOpenModalAdd);
  const fetchDocuments = useDocuments((state) => state.fetchDocuments);
  const nameDocs = useDocuments((state) => state.nameDocs);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [uploadPercent, setUploadPercent] = useState(0);
  const [savePercent, setSavePercent] = useState(0);

  const [form] = Form.useForm();

  const handleModalClose = () => {
    setOpenModalAdd(false);
    form.resetFields();
    setUploadPercent(0);
    setSavePercent(0);
  };

  // В ModalAddDocument.js
  const handleSaveDocument = async (values) => {
    try {
      setLoading(true);
      setLoadingMessage("Пожалуйста, подождите, файл сохраняется");

      const files = form.getFieldValue("fileDoc").map((file) => ({
        path: file.uid,
        name: file.name,
      }));

      const formData = {
        documentName: values.documentName,
        nameDoc_Key: values.documentName,
        files,
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

      clearInterval(interval);
      setSavePercent(100);

      console.log("response", response);
      message.success("Документ успешно сохранен");

      fetchDocuments();

      setOpenModalAdd(false);
      form.resetFields();
      setLoading(false);
      setLoadingMessage("");
      setSavePercent(0);
    } catch (error) {
      console.error("Ошибка при сохранении документа:", error);
      message.error("Не удалось сохранить документ");
      setLoading(false);
      setLoadingMessage("");
      setSavePercent(0);
    }
  };

  return (
    <Modal
      title="Загрузить новый документ"
      open={openModalAdd}
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
            {nameDocs &&
              nameDocs.map((nameDocs, index) => (
                <Option key={index} value={nameDocs.Ref_Key}>
                  {nameDocs.Description}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <UploaderInput />
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Сохранить файлы
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}