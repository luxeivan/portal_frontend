import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Upload, message } from "antd";
import useGlobal from "../../stores/useGlobal";
import axios from "axios";
import config from "../../config";

const { Dragger } = Upload;

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

export default function Uploader({ form }) {
  const uploadProps = {
  name: "file",
  headers: {
    authorization: "authorization-text",
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
      name="uploader"
      rules={[
        {
          required: true,
          message: "Пожалуйста, загрузите файл",
        },
      ]}
    >
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Файл размером не более 10мб</p>
        <p className="ant-upload-hint">поддерживаются форматы JPEG.JPG</p>
      </Dragger>
    </Form.Item>
  );
}


// import React from "react";
// import { InboxOutlined } from "@ant-design/icons";
// import { Form, Upload } from "antd";
// import useGlobal from "../../stores/useGlobal";

// const { Dragger } = Upload;

// //На всякий пожарный старый загрузчик
// // const uploadProps = {
// //   name: "file",
// //   headers: {
// //     authorization: "authorization-text",
// //   },

// //   customRequest({ file, onSuccess, onError }) {
// //     const formData = new FormData();
// //     formData.append("file", file);
// //     const token = localStorage.getItem("jwt");
// //     axios
// //       .post(`${config.backServer}/api/cabinet/upload-file`, formData, {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         withCredentials: true,
// //       })
// //       .then((response) => {
// //         console.log("Ответ сервера", response.data);
// //         const relativePath = response.data.files[0];
// //         console.log("relativePath", relativePath);
// //         onSuccess(relativePath, file);
// //         message.success(
// //           `${file.name} файл загружен успешно и сохранен по пути: ${relativePath}`
// //         );
// //       })
// //       .catch((error) => {
// //         console.error("Ошибка при загрузке файла", error);
// //         onError(error);
// //         message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
// //       });
// //   },
// // };

// export default function Uploader() {
//   const uploadProps = {
//     name: "file",
//     multiple: false,
//     customRequest: async ({ file, onSuccess, onError }) => {
//       try {
//         const response = await useGlobal.getState().uploadFile(file);
//         onSuccess(response, file);
//       } catch (error) {
//         onError(error);
//       }
//     },
//     onDrop(e) {
//       console.log("Dropped files", e.dataTransfer.files);
//     },
//   };

//   return (
//     <Form.Item
//       label="Загрузить файл"
//       name="uploader"
//       rules={[
//         {
//           required: true,
//           message: "Пожалуйста, загрузите файл",
//         },
//       ]}
//     >
//       <Dragger {...uploadProps}>
//         <p className="ant-upload-drag-icon">
//           <InboxOutlined />
//         </p>
//         <p className="ant-upload-text">Файл размером не более 10мб</p>
//         <p className="ant-upload-hint">поддерживаются форматы JPEG.JPG</p>
//       </Dragger>
//     </Form.Item>
//   );
// }
