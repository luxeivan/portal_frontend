import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Upload, message, theme, Image, Divider } from "antd";
import axios from "axios";
import config from "../../config";

const { Dragger } = Upload;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function Uploader({ form, read, edit, value }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const { colorPrimaryText } = theme.useToken().token;
  let files = [];

  const previewFile = async (file) => {
    console.log(file);
    if (file?.name.includes(".pdf")) return window.open(file.url, "_blank");
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const onRemove = (event) => {
    console.log(event);
    console.log(fileList);
    setFileList(fileList.filter((item) => item.uid !== event.uid));
  };
  const uploadProps = {
    multiple: true,
    beforeUpload: (file) => {
      const isPNG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "application/pdf";
      if (!isPNG) {
        message.error(`${file.name} не поддерживающего формата`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },

    onRemove,
    listType: "text",
    fileList,
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    onPreview: previewFile,

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
        .then(async (response) => {
          const relativePath = response.data.files[0];
          files.push(relativePath);
          const fileblob = await axios.get(
            `${config.backServer}/api/cabinet/get-file/${relativePath}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
              responseType: "blob",
            }
          );
          if (!fileblob.data) throw new Error("Ошибка загрузка файла");
          const objectURL = window.URL.createObjectURL(fileblob.data);
          setFileList((prev) => [
            ...prev,
            {
              crossOrigin: "use-credentials",
              uid: relativePath,
              name: file.name,
              status: "done",
              url: objectURL,
            },
          ]);
          onSuccess(relativePath, file);
          form.setFieldsValue({ fileDoc: files });
          message.success(`Файлы успешно загружены`);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке файла", error);
          onError(error);
          message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
        });
    },
  };

  return (
    // <>
    //   <Divider orientation="center">Файлы</Divider>
    //   {read && value?.files && Array.isArray(value.files) ? (
    //     value.files.map((file, index) => (
    //       <div key={index} style={{ marginBottom: "10px" }}>
    //         <a href={file.url} target="_blank" rel="noopener noreferrer">
    //           {file.name}
    //         </a>
    //       </div>
    //     ))
    //   ) : (
    //     // Код для загрузки файлов (Dragger и прочее), как у вас уже реализовано
    //     <Dragger {...uploadProps}>
    //       <p className="ant-upload-drag-icon">
    //         <InboxOutlined
    //           style={{ color: colorPrimaryText, fontSize: "48px" }}
    //         />
    //       </p>
    //       <p className="ant-upload-text">
    //         Нажмите или перетащите файл в эту область для загрузки
    //       </p>
    //       <p className="ant-upload-hint">
    //         Поддерживается загрузка нескольких файлов. Строго в форматах PDF,
    //         JPEG, PNG.
    //       </p>
    //     </Dragger>
    //   )}
    //   {previewImage && (
    //     <Image
    //       wrapperStyle={{
    //         display: "none",
    //       }}
    //       preview={{
    //         visible: previewOpen,
    //         onVisibleChange: (visible) => setPreviewOpen(visible),
    //         afterOpenChange: (visible) => !visible && setPreviewImage(""),
    //       }}
    //       src={previewImage}
    //     />
    //   )}
    // </>

    <>
      <Divider orientation="center">Файлы</Divider>
      <Form.Item
        label="Загрузить документ"
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
            <InboxOutlined
              style={{ color: colorPrimaryText, fontSize: "48px" }}
            />
          </div>
          <p className="ant-upload-text">Файл размером не более 10МБ</p>
          <p className="ant-upload-hint">форматы PDF, JPEG, PNG</p>
        </Dragger>
        {previewImage && (
          <Image
            wrapperStyle={{
              display: "none",
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </Form.Item>
    </>
  );
}
