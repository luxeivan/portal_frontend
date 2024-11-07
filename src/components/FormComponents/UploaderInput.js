import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Upload, message, theme, Image } from "antd";
import iconPdf from "../../img/pdf.svg";

const { Dragger } = Upload;

export default function UploaderInput({
  resetTrigger, // Добавлено
  read,
  edit,
  value,
  depends,
  required = false,
  allowedExtensions = [],
  maxFileSize = 10, // По умолчанию 10 МБ
}) {
  const [fileList, setFileList] = useState([]);
  const { colorPrimaryText } = theme.useToken().token;
  const form = Form.useFormInstance();

  const uploadProps = {
    multiple: true,
    beforeUpload: (file) => {
      const fileExtension = file.name.split(".").pop().toUpperCase();
      const isSupported = allowedExtensions.includes(fileExtension);
      if (!isSupported) {
        message.error(`${file.name} не поддерживается`);
        return Upload.LIST_IGNORE;
      }
      const isSizeOk = file.size / 1024 / 1024 < maxFileSize;
      if (!isSizeOk) {
        message.error(
          `${file.name} превышает максимальный размер ${maxFileSize} МБ`
        );
        return Upload.LIST_IGNORE;
      }
      return false; // Предотвращаем автоматическую загрузку
    },
    onChange: ({ fileList }) => {
      setFileList(fileList);
      form.setFieldsValue({ fileDoc: fileList });
    },
    listType: "text",
    fileList,
    onRemove: (file) => {
      const updatedFileList = fileList.filter((item) => item.uid !== file.uid);
      setFileList(updatedFileList);
      form.setFieldsValue({ fileDoc: updatedFileList });
    },
  };

  // Добавленный эффект для сброса fileList при изменении resetTrigger
  useEffect(() => {
    setFileList([]);
    form.setFieldsValue({ fileDoc: [] }); // Сбрасываем значение поля в форме
  }, [resetTrigger]);

  useEffect(() => {
    // При смене допустимых расширений или размера очищаем список файлов
    setFileList([]);
    form.setFieldsValue({ fileDoc: [] });
  }, [allowedExtensions, maxFileSize]);

  return (
    <Form.Item
      label={read ? "Файлы" : "Загрузить файлы"}
      name={"fileDoc"}
      rules={[
        {
          required: required,
          message: "Пожалуйста, загрузите файл",
        },
      ]}
    >
      {!read && (
        <Dragger {...uploadProps}>
          <div>
            <InboxOutlined
              style={{ color: colorPrimaryText, fontSize: "48px" }}
            />
          </div>
          <p className="ant-upload-text">
            Файлы размером не более {maxFileSize} МБ
          </p>
          <p className="ant-upload-hint">
            Форматы: {allowedExtensions.join(", ")}
          </p>
        </Dragger>
      )}
      {read && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {fileList.map((item, index) =>
            item.name.includes(".pdf") ? (
              <a
                key={index}
                target="_blank"
                href={item.url}
                rel="noopener noreferrer"
              >
                <div
                  style={{
                    boxSizing: "border-box",
                    width: 150,
                    height: 150,
                    border: "1px solid gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image preview={false} src={iconPdf} />
                </div>
              </a>
            ) : (
              <Image key={index} width={150} src={item.url} />
            )
          )}
        </div>
      )}
    </Form.Item>
  );
}
