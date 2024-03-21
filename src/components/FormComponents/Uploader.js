import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import config from "../../config";
import axios from "axios";

const { Dragger } = Upload;

const uploadProps = {
  name: "file",
  multiple: false,
  action: `${config.backServer}/api/cabinet/upload-file`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
  withCredentials: true,
  customRequest(options) {
    const formData = new FormData();
    formData.append("file", options.file);

    axios
      .post(options.action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...options.headers,
        },
      })
      .then((response) => {
        console.log("Ответ сервера", response.data);
        options.onSuccess(response.data, options.file);
        message.success(`${options.file.name} файл успешно загружен.`);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке файла", error);
        options.onError(error);
        message.error(`${options.file.name} не удалось загрузить файл.`);
      });
  },
  onChange(info) {
    const { status } = info.file;
    if (status === "done") {
      message.success(`${info.file.name} файл успешно загружен.`);
    } else if (status === "error") {
      message.error(`${info.file.name} не удалось загрузить файл.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

//На всякий пожарный старый загрузчик
// const uploadProps = {
//   name: "file",
//   headers: {
//     authorization: "authorization-text",
//   },

//   customRequest({ file, onSuccess, onError }) {
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
//       .then((response) => {
//         console.log("Ответ сервера", response.data);
//         const relativePath = response.data.files[0];
//         console.log("relativePath", relativePath);
//         onSuccess(relativePath, file);
//         message.success(
//           `${file.name} файл загружен успешно и сохранен по пути: ${relativePath}`
//         );
//       })
//       .catch((error) => {
//         console.error("Ошибка при загрузке файла", error);
//         onError(error);
//         message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
//       });
//   },
// };

export default function Uploader() {
  return (
    <Dragger {...uploadProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Нажмите или перетащите файл в эту область для загрузки
      </p>
      <p className="ant-upload-hint">
        Поддерживается загрузка одного или нескольких файлов.
      </p>
    </Dragger>
  );
}
