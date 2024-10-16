import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Upload, message, theme, Image } from "antd";
import iconPdf from "../../img/pdf.svg";

const { Dragger } = Upload;

export default function UploaderInput({
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

// import React, { useEffect, useState } from "react";
// import { InboxOutlined } from "@ant-design/icons";
// import { Form, Upload, message, theme, Image, Flex } from "antd";
// import axios from "axios";
// import iconPdf from "../../img/pdf.svg";

// const backServer = process.env.REACT_APP_BACK_BACK_SERVER;
// const { Dragger } = Upload;

// export default function UploaderInput({
//   read,
//   edit,
//   value,
//   depends,
//   required = false,
// }) {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [fileList, setFileList] = useState([]);
//   const { colorPrimaryText } = theme.useToken().token;
//   const form = Form.useFormInstance();

//   const uploadProps = {
//     multiple: true,
//     beforeUpload: (file) => {
//       const isSupported =
//         file.type === "image/jpeg" ||
//         file.type === "image/png" ||
//         file.type === "application/pdf";
//       if (!isSupported) {
//         message.error(`${file.name} не поддерживающего формата`);
//       }
//       return isSupported || Upload.LIST_IGNORE;
//     },
//     listType: "text",
//     fileList,
//     name: "file",
//     headers: {
//       authorization: "authorization-text",
//     },
//     onRemove: (event) => {
//       setFileList(fileList.filter((item) => item.uid !== event.uid));
//     },
//     onPreview: async (file) => {
//       if (file?.name.includes(".pdf")) return window.open(file.url, "_blank");
//       if (!file.url && !file.preview) {
//         const reader = new FileReader();
//         reader.readAsDataURL(file.originFileObj);
//         reader.onload = () => {
//           setPreviewImage(reader.result);
//           setPreviewOpen(true);
//         };
//       } else {
//         setPreviewImage(file.url || file.preview);
//         setPreviewOpen(true);
//       }
//     },
//     customRequest({ file, onSuccess, onError }) {
//       const formData = new FormData();
//       formData.append("file", file);
//       const token = localStorage.getItem("jwt");
//       axios
//         .post(`${backServer}/api/cabinet/upload-file`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         })
//         .then((response) => {
//           const relativePath = response.data.file; // Получаем объединенный файл
//           setFileList([
//             {
//               uid: relativePath,
//               name: `Объединенный документ.pdf`,
//               status: "done",
//               url: `${backServer}/api/cabinet/get-file/${relativePath}`,
//             },
//           ]);
//           onSuccess(relativePath, file);
//           message.success(`Файлы успешно загружены и объединены в PDF`);
//         })
//         .catch((error) => {
//           console.error("Ошибка при загрузке файла", error);
//           onError(error);
//           message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
//         });
//     },
//   };

//   return (
//     <Form.Item
//       label={read ? "Файлы" : "Загрузить файлы"}
//       name={"fileDoc"}
//       rules={[
//         {
//           required: required,
//           message: "Пожалуйста, загрузите файл",
//         },
//       ]}
//     >
//       {!read && (
//         <Dragger {...uploadProps}>
//           <div>
//             <InboxOutlined
//               style={{ color: colorPrimaryText, fontSize: "48px" }}
//             />
//           </div>
//           <p className="ant-upload-text">Файлы размером не более 10МБ</p>
//           <p className="ant-upload-hint">форматы PDF, JPEG, PNG</p>
//         </Dragger>
//       )}
//       {read && (
//         <Flex gap={"small"} wrap="wrap">
//           {fileList.map((item, index) =>
//             item.name.includes(".pdf") ? (
//               <a
//                 key={index}
//                 target="_blank"
//                 href={item.url}
//                 rel="noopener noreferrer"
//               >
//                 <Flex
//                   style={{
//                     boxSizing: "border-box",
//                     width: 150,
//                     height: 150,
//                     border: "1px solid gray",
//                   }}
//                   align="center"
//                   justify="center"
//                 >
//                   <Image preview={false} src={iconPdf} />
//                 </Flex>
//               </a>
//             ) : (
//               <Image key={index} width={150} src={item.url} />
//             )
//           )}
//         </Flex>
//       )}
//     </Form.Item>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { InboxOutlined } from "@ant-design/icons";
// import { Form, Upload, message, theme, Image, Divider, Flex } from "antd";
// import axios from "axios";
// import iconPdf from '../../img/pdf.svg'
// const backServer = process.env.REACT_APP_BACK_BACK_SERVER
// const { Dragger } = Upload;
// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

// export default function UploaderInput({ read, edit, value, depends, required = false }) {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [fileList, setFileList] = useState([]);
//   const [fileListForRead, setFileListForRead] = useState([]);
//   const { colorPrimaryText } = theme.useToken().token;
//   // ----------------------------------------
//   const form = Form.useFormInstance();
//   let show = true
//   let showTemp = Form.useWatch(depends?.showIf?.nameField, form) === depends?.showIf?.eq;
//   if (depends && showTemp)
//     show = true
//   else if (!depends)
//     show = true
//   else show = false
//   // ----------------------------------------
//   const getFile = async (relativePath) => {
//     const fileblob = await axios.get(
//       `${backServer}/api/cabinet/get-file/${relativePath}`,
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
//   // ----------------------------------------
//   let files = [];
//   //console.log(value.fileDoc)
//   useEffect(() => {
//     setFileList([])
//     setFileListForRead([])
//     if (value?.fileDoc) {
//       value.fileDoc.forEach(async item => {
//         const extension = item.substring(item.lastIndexOf('.') + 1);
//         const file = await getFile(item)
//         //console.log(file)
//         setFileListForRead(prev => [...prev, { type: extension, file }])
//       })

//     }

//   }, [value?.fileDoc])
//   useEffect(() => {
//     form.setFieldsValue({ fileDoc: fileList.map(item => item.uid) });
//   }, [fileList])

//   const previewFile = async (file) => {
//     //console.log(file);
//     if (file?.name.includes(".pdf")) return window.open(file.url, "_blank");
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setPreviewImage(file.url || file.preview);
//     setPreviewOpen(true);
//   };
//   const onRemove = (event) => {
//     //console.log(event);
//     //console.log(fileList);
//     setFileList(fileList.filter((item) => item.uid !== event.uid));
//   };
//   const uploadProps = {
//     multiple: true,
//     beforeUpload: (file) => {
//       const isPNG =
//         file.type === "image/jpeg" ||
//         file.type === "image/png" ||
//         file.type === "application/pdf";
//       if (!isPNG) {
//         message.error(`${file.name} не поддерживающего формата`);
//       }
//       return isPNG || Upload.LIST_IGNORE;
//     },

//     onRemove,
//     listType: "text",
//     fileList,
//     name: "file",
//     headers: {
//       authorization: "authorization-text",
//     },
//     onPreview: previewFile,

//     customRequest({ file, onSuccess, onError }) {
//       const formData = new FormData();
//       formData.append("file", file);
//       const token = localStorage.getItem("jwt");
//       axios
//         .post(`${backServer}/api/cabinet/upload-file`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         })
//         .then(async (response) => {
//           const relativePath = response.data.files[0];
//           files.push(relativePath);
//           const fileUrl = await getFile(relativePath)
//           setFileList((prev) => [
//             ...prev,
//             {
//               crossOrigin: "use-credentials",
//               uid: relativePath,
//               name: file.name,
//               status: "done",
//               url: fileUrl,
//             },
//           ]);
//           onSuccess(relativePath, file);
//           // form.setFieldsValue({ fileDoc: files });
//           message.success(`Файлы успешно загружены`);
//         })
//         .catch((error) => {
//           console.error("Ошибка при загрузке файла", error);
//           onError(error);
//           message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
//         });
//     },
//   };

//   if (show) {
//     return (
//       <>
//         <Form.Item
//           label={read ? "Файлы" : "Загрузить файлы"}
//           name={"fileDoc"}
//           rules={read ? false : [
//             {
//               required: required,
//               message: "Пожалуйста, загрузите файл",
//             },
//           ]}
//         >
//           {read &&
//             <Flex gap={'small'} wrap="wrap">
//               {fileListForRead.map((item, index) =>
//                 item.type !== 'pdf' ?
//                   <Image
//                     key={index}
//                     width={150}
//                     fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
//                     src={item.file}
//                   /> : <a target="_blank" href={item.file}><Flex style={{ boxSizing: "border-box", width: 150, height: 150, border: "1px solid gray" }} align="center" justify="center"><Image preview={false} src={iconPdf} /></Flex></a>
//               )}
//             </Flex>
//           }
//           {!read &&
//             <Dragger {...uploadProps}>
//               <div>
//                 <InboxOutlined
//                   style={{ color: colorPrimaryText, fontSize: "48px" }}
//                 />
//               </div>
//               <p className="ant-upload-text">Файлы размером не более 10МБ</p>
//               <p className="ant-upload-hint">форматы PDF, JPEG, PNG</p>
//             </Dragger>
//           }
//         </Form.Item>
//           {previewImage && (
//             <Image
//               wrapperStyle={{
//                 display: "none",
//               }}
//               preview={{
//                 visible: previewOpen,
//                 onVisibleChange: (visible) => setPreviewOpen(visible),
//                 afterOpenChange: (visible) => !visible && setPreviewImage(""),
//               }}
//               src={previewImage}
//             />
//           )}
//       </>
//     );
//   }
// }
