import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Upload, message, theme } from "antd";
import useGlobal from "../../stores/useGlobal";
import axios from "axios";
import config from "../../config";

const { Dragger } = Upload;

export default function Uploader({ form }) {

  const [fileList, setFileList] = useState([])
  const { colorPrimaryText } = theme.useToken().token
  const onRemove = (event) => {
    console.log(event)
  }
  const uploadProps = {
    onRemove,
    listType: "picture-card",
    fileList,
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    previewFile: (event)=>{
      console.log(event)
    },

    customRequest({ file, onSuccess, onError }) {
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
        .then((response) => {
          const relativePath = response.data.files[0];
          setFileList([...fileList, {
            crossOrigin:'use-credentials',
            uid: relativePath,
            name: file.name,
            status: 'done',
            url: `${config.backServer}/api/cabinet/get-file/${relativePath}`,
          }])
          onSuccess(relativePath, file);
          form.setFieldsValue({ fileDoc: relativePath });
          message.success(
            `${file.name} файл загружен успешно и сохранен по пути: ${relativePath}`
          );
        })
        .catch((error) => {
          console.error("Ошибка при загрузке файла", error);
          onError(error);
          message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
        });
    },
  };

  return (
    <Form.Item
      label="Загрузить файл"
      name="fileDoc"
      rules={[
        {
          required: true,
          message: "Пожалуйста, загрузите файл",
        },
      ]}
    >
      <Dragger {...uploadProps}>
        <div>
          <InboxOutlined style={{ color: colorPrimaryText, fontSize: "48px" }} />
        </div>
        <p className="ant-upload-text">Файл размером не более 10мб</p>
        <p className="ant-upload-hint">поддерживаются форматы PDF, JPEG, JPG</p>
      </Dragger>
    </Form.Item>
  );
}
