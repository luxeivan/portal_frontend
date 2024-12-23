import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Typography, Card, Modal } from "antd";
import AppHelmet from "../../../components/Global/AppHelmet";
import { PlusOutlined } from "@ant-design/icons";
import SceletonCard from "../../../components/SceletonCard";
import useDocuments from "../../../stores/Cabinet/useDocuments";
import axios from "axios";
import ModalAddDocument from "../../../components/Cabinet/Documents/ModalAddDocument";
import DocumentCard from "./DocumentCard";

const { Title } = Typography;

const Documents = ({ categoryKey, onSelectDocument, isModal }) => {
  const [modalCategoryKey, setModalCategoryKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const documents = useDocuments((state) => state.documents);
  const loadingDocuments = useDocuments((state) => state.loadingDocuments);
  const openModalAdd = useDocuments((state) => state.openModalAdd);
  const setOpenModalAdd = useDocuments((state) => state.setOpenModalAdd);
  const fetchDocuments = useDocuments((state) => state.fetchDocuments);
  const deleteDocument = useDocuments((state) => state.deleteDocument);

  useEffect(() => {
    fetchDocuments(categoryKey);
  }, [categoryKey, fetchDocuments]);

  const openDocument = useCallback((document) => {
    const backServer = process.env.REACT_APP_BACK_BACK_SERVER;
    const newWindow = window.open("", "_blank");
    let fileUrl;

    if (document.ПутьКФайлу) {
      const fileName = document.ПутьКФайлу.split("/")[1];
      fileUrl = `${backServer}/api/cabinet/get-file/by-filename/${fileName}`;
    } else {
      const fileId = document.Ref_Key;
      fileUrl = `${backServer}/api/cabinet/get-file/by-id/${fileId}`;
    }

    axios
      .get(fileUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        responseType: "blob",
        withCredentials: true,
      })
      .then((response) => {
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        newWindow.location.href = fileURL;
      })
      .catch((error) => {
        console.error("Ошибка при открытии документа:", error);
        newWindow.document.write("<p>Не удалось загрузить документ.</p>");
      });
  }, []);

  const handleDocumentClick = (document) => {
    if (onSelectDocument) {
      onSelectDocument(document);
      console.log("onSelectDocument", onSelectDocument);
    } else {
      openDocument(document);
    }
  }


  const confirmDelete = useCallback(
    (id) => {
      Modal.confirm({
        title: "Вы уверены, что хотите удалить этот документ?",
        okText: "Да",
        okType: "danger",
        cancelText: "Отмена",
        onOk() {
          deleteDocument(id);
        },
      });
    },
    [deleteDocument]
  );

  const handleAddDocument = useCallback(() => {
    setOpenModalAdd(true);
    setIsModalOpen(true);
    if (isModal) {
      setModalCategoryKey(categoryKey);
    } else {
      setModalCategoryKey(null);
    }
  }, [setOpenModalAdd, isModal, categoryKey]);

  const handleCloseModal = () => {
    setOpenModalAdd(false);
    setIsModalOpen(false);
    setModalCategoryKey(null);
  };

  const documentCards = useMemo(() => {
    return documents.map((document, index) => (
      <DocumentCard
        key={index}
        document={document}
        isModal={isModal}
        handleDocumentClick={handleDocumentClick}
        confirmDelete={confirmDelete}
        openDocument={openDocument}
      />
    ));
  }, [documents, isModal, handleDocumentClick, confirmDelete, openDocument]);

  return (
    <div>
      <AppHelmet title={"Документы"} desc={"Документы"} />
      <Title level={1}>Документы</Title>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {loadingDocuments && <SceletonCard />}
        {documentCards}
        <Card
          hoverable={!isModalOpen}
          style={{
            width: 250,
            height: 250,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: isModalOpen ? 0.5 : 1,
            cursor: isModalOpen ? "not-allowed" : "pointer",
          }}
          onClick={!isModalOpen ? handleAddDocument : undefined}
        >
          <PlusOutlined style={{ fontSize: "24px" }} />
        </Card>
      </div>
      <ModalAddDocument

        visible={openModalAdd}
        onClose={handleCloseModal}
        categoryKey={modalCategoryKey}
      />
    </div>
  );
};

export default React.memo(Documents);

// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { Typography, Card, Button, Modal } from "antd";
// import AppHelmet from "../../../components/Global/AppHelmet";
// import {
//   PlusOutlined,
//   FilePdfOutlined,
//   DeleteOutlined,
//   EyeOutlined,
// } from "@ant-design/icons";
// import SceletonCard from "../../../components/SceletonCard";
// import useDocuments from "../../../stores/Cabinet/useDocuments";
// import axios from "axios";
// import ModalAddDocument from "../../../components/Cabinet/Documents/ModalAddDocument";
// import DocumentCard from "./DocumentCard";

// const { Title, Text } = Typography;

// const Documents = ({ categoryKey, onSelectDocument, isModal }) => {
//   const [modalCategoryKey, setModalCategoryKey] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const documents = useDocuments((state) => state.documents);
//   const loadingDocuments = useDocuments((state) => state.loadingDocuments);
//   const openModalAdd = useDocuments((state) => state.openModalAdd);
//   const setOpenModalAdd = useDocuments((state) => state.setOpenModalAdd);
//   const fetchDocuments = useDocuments((state) => state.fetchDocuments);
//   const deleteDocument = useDocuments((state) => state.deleteDocument);

//   useEffect(() => {
//     fetchDocuments(categoryKey);
//   }, [categoryKey, fetchDocuments]);

//   const openDocument = useCallback((document) => {
//     const backServer = process.env.REACT_APP_BACK_BACK_SERVER;
//     const newWindow = window.open("", "_blank");
//     let fileUrl;

//     if (document.ПутьКФайлу) {
//       const fileName = document.ПутьКФайлу.split("/")[1];
//       fileUrl = `${backServer}/api/cabinet/get-file/by-filename/${fileName}`;
//     } else {
//       const fileId = document.Ref_Key;
//       fileUrl = `${backServer}/api/cabinet/get-file/by-id/${fileId}`;
//     }

//     axios
//       .get(fileUrl, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//         responseType: "blob",
//         withCredentials: true,
//       })
//       .then((response) => {
//         const file = new Blob([response.data], { type: "application/pdf" });
//         const fileURL = URL.createObjectURL(file);
//         newWindow.location.href = fileURL;
//       })
//       .catch((error) => {
//         console.error("Ошибка при открытии документа:", error);
//         newWindow.document.write("<p>Не удалось загрузить документ.</p>");
//       });
//   }, []);

//   const handleDocumentClick = useCallback(
//     (document) => {
//       if (onSelectDocument) {
//         onSelectDocument(document);
//       } else {
//         openDocument(document);
//       }
//     },
//     [onSelectDocument, openDocument]
//   );

//   const confirmDelete = useCallback(
//     (id) => {
//       Modal.confirm({
//         title: "Вы уверены, что хотите удалить этот документ?",
//         okText: "Да",
//         okType: "danger",
//         cancelText: "Отмена",
//         onOk() {
//           deleteDocument(id);
//         },
//       });
//     },
//     [deleteDocument]
//   );

//   const handleAddDocument = useCallback(() => {
//     setOpenModalAdd(true);
//     setIsModalOpen(true);
//     if (isModal) {
//       setModalCategoryKey(categoryKey);
//     } else {
//       setModalCategoryKey(null);
//     }
//   }, [setOpenModalAdd, isModal, categoryKey]);

//   const handleCloseModal = () => {
//     setOpenModalAdd(false);
//     setIsModalOpen(false);
//   };

//   const documentCards = useMemo(() => {
//     return documents.map((document, index) => (
//       <DocumentCard
//         key={index}
//         document={document}
//         isModal={isModal}
//         handleDocumentClick={handleDocumentClick}
//         confirmDelete={confirmDelete}
//         openDocument={openDocument}
//       />
//     ));
//   }, [documents, isModal, handleDocumentClick, confirmDelete, openDocument]);

//   return (
//     <div>
//       <AppHelmet title={"Документы"} desc={"Документы"} />
//       <Title level={1}>Документы</Title>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {loadingDocuments && <SceletonCard />}
//         {documentCards}
//         <Card
//           hoverable={!isModalOpen}
//           style={{
//             width: 250,
//             height: 250,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             opacity: isModalOpen ? 0.5 : 1,
//             cursor: isModalOpen ? "not-allowed" : "pointer",
//           }}
//           onClick={!isModalOpen ? handleAddDocument : undefined}
//         >
//           <PlusOutlined style={{ fontSize: "24px" }} />
//         </Card>
//       </div>
//       <ModalAddDocument
//         visible={openModalAdd}
//         onClose={handleCloseModal}
//         categoryKey={modalCategoryKey}
//       />
//     </div>
//   );
// };

// export default React.memo(Documents);

// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { Typography, Card, Modal } from "antd";
// import AppHelmet from "../../../components/Global/AppHelmet";
// import {
//   PlusOutlined,
// } from "@ant-design/icons";
// import SceletonCard from "../../../components/SceletonCard";
// import useDocuments from "../../../stores/Cabinet/useDocuments";
// import axios from "axios";
// import ModalAddDocument from "../../../components/Cabinet/Documents/ModalAddDocument";
// import DocumentCard from "./DocumentCard"; // Предполагается, что вы создадите этот компонент

// const { Title} = Typography;

// const Documents = ({ categoryKey, onSelectDocument, isModal }) => {
//   const [modalCategoryKey, setModalCategoryKey] = useState(null);
//   const documents = useDocuments((state) => state.documents);
//   const loadingDocuments = useDocuments((state) => state.loadingDocuments);
//   const openModalAdd = useDocuments((state) => state.openModalAdd);
//   const setOpenModalAdd = useDocuments((state) => state.setOpenModalAdd);
//   const fetchDocuments = useDocuments((state) => state.fetchDocuments);
//   const deleteDocument = useDocuments((state) => state.deleteDocument);

//   useEffect(() => {
//     fetchDocuments(categoryKey);
//   }, [categoryKey, fetchDocuments]);

//   const openDocument = useCallback((document) => {
//     const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

//     const newWindow = window.open("", "_blank");

//     let fileUrl;

//     if (document.ПутьКФайлу) {
//       const fileName = document.ПутьКФайлу.split("/")[1]; // Извлекаем имя файла
//       fileUrl = `${backServer}/api/cabinet/get-file/by-filename/${fileName}`;
//     } else {
//       const fileId = document.Ref_Key;
//       fileUrl = `${backServer}/api/cabinet/get-file/by-id/${fileId}`;
//     }

//     axios
//       .get(fileUrl, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//         responseType: "blob",
//         withCredentials: true,
//       })
//       .then((response) => {
//         const file = new Blob([response.data], { type: "application/pdf" });
//         const fileURL = URL.createObjectURL(file);
//         newWindow.location.href = fileURL;
//       })
//       .catch((error) => {
//         console.error("Ошибка при открытии документа:", error);
//         newWindow.document.write("<p>Не удалось загрузить документ.</p>");
//       });
//   }, []);

//   const handleDocumentClick = useCallback(
//     (document) => {
//       if (onSelectDocument) {
//         onSelectDocument(document);
//       } else {
//         openDocument(document);
//       }
//     },
//     [onSelectDocument, openDocument]
//   );

//   const confirmDelete = useCallback(
//     (id) => {
//       Modal.confirm({
//         title: "Вы уверены, что хотите удалить этот документ?",
//         okText: "Да",
//         okType: "danger",
//         cancelText: "Отмена",
//         onOk() {
//           deleteDocument(id);
//         },
//       });
//     },
//     [deleteDocument]
//   );

//   const handleAddDocument = useCallback(() => {
//     setOpenModalAdd(true);
//     if (isModal) {
//       setModalCategoryKey(categoryKey);
//     } else {
//       setModalCategoryKey(null);
//     }
//   }, [setOpenModalAdd, isModal, categoryKey]);

//   const documentCards = useMemo(() => {
//     return documents.map((document, index) => (
//       <DocumentCard
//         key={index}
//         document={document}
//         isModal={isModal}
//         handleDocumentClick={handleDocumentClick}
//         confirmDelete={confirmDelete}
//         openDocument={openDocument}
//       />
//     ));
//   }, [documents, isModal, handleDocumentClick, confirmDelete, openDocument]);

//   return (
//     <div>
//       <AppHelmet title={"Документы"} desc={"Документы"} />
//       <Title level={1}>Документы</Title>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {loadingDocuments && <SceletonCard />}
//         {documentCards}
//         <Card
//           hoverable
//           style={{
//             width: 250,
//             height: 250,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//           onClick={handleAddDocument}
//         >
//           <PlusOutlined style={{ fontSize: "24px" }} />
//         </Card>
//       </div>
//       <ModalAddDocument
//         visible={openModalAdd}
//         onClose={() => setOpenModalAdd(false)}
//         categoryKey={modalCategoryKey}
//       />
//     </div>
//   );
// };

// export default React.memo(Documents);

// import React, { useEffect, useState, useMemo } from "react";
// import { Typography, Card, Button, Modal} from "antd";
// import AppHelmet from "../../../components/Global/AppHelmet";
// import {
//   PlusOutlined,
//   FilePdfOutlined,
//   DeleteOutlined,
//   EyeOutlined,
// } from "@ant-design/icons";
// import SceletonCard from "../../../components/SceletonCard";
// import useDocuments from "../../../stores/Cabinet/useDocuments";
// import axios from "axios";
// import ModalAddDocument from "../../../components/Cabinet/Documents/ModalAddDocument";

// const { Title, Text } = Typography;

// const Documents = ({ categoryKey, onSelectDocument, isModal }) => {
//   const [modalCategoryKey, setModalCategoryKey] = useState(null);
//   const documents = useDocuments((state) => state.documents);
//   console.log("documents", documents);

//   const loadingDocuments = useDocuments((state) => state.loadingDocuments);
//   const openModalAdd = useDocuments((state) => state.openModalAdd);
//   const setOpenModalAdd = useDocuments((state) => state.setOpenModalAdd);
//   const fetchDocuments = useDocuments((state) => state.fetchDocuments);
//   const deleteDocument = useDocuments((state) => state.deleteDocument);

//   useEffect(() => {
//     fetchDocuments(categoryKey);
//   }, [categoryKey, fetchDocuments]);

//   const openDocument = (document) => {
//     const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

//     if (document.ПутьКФайлу) {
//       // Если есть ПутьКФайлу, используем маршрут по имени файла
//       const fileName = document.ПутьКФайлу.split("/")[1]; // Извлекаем имя файла
//       const fileUrl = `${backServer}/api/cabinet/get-file/by-filename/${fileName}`;
//       console.log("fileUrl", fileUrl);

//       // Открываем новое окно сразу, чтобы избежать блокировки
//       const newWindow = window.open("", "_blank");

//       axios
//         .get(fileUrl, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//           responseType: "blob",
//           withCredentials: true,
//         })
//         .then((response) => {
//           const file = new Blob([response.data], { type: "application/pdf" });
//           const fileURL = URL.createObjectURL(file);
//           newWindow.location.href = fileURL;
//         })
//         .catch((error) => {
//           console.error("Ошибка при открытии документа:", error);
//           newWindow.document.write("<p>Не удалось загрузить документ.</p>");
//         });
//     } else {
//       // Иначе используем маршрут по ID
//       const fileId = document.Ref_Key;
//       const fileUrl = `${backServer}/api/cabinet/get-file/by-id/${fileId}`;
//       console.log("fileUrl", fileUrl);

//       const newWindow = window.open("", "_blank");

//       axios
//         .get(fileUrl, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//           responseType: "blob",
//           withCredentials: true,
//         })
//         .then((response) => {
//           const file = new Blob([response.data], { type: "application/pdf" });
//           const fileURL = URL.createObjectURL(file);
//           newWindow.location.href = fileURL;
//         })
//         .catch((error) => {
//           console.error("Ошибка при открытии документа:", error);
//           newWindow.document.write("<p>Не удалось загрузить документ.</p>");
//         });
//     }
//   };

//   const handleDocumentClick = (document) => {
//     if (onSelectDocument) {
//       onSelectDocument(document);
//     } else {
//       openDocument(document);
//     }
//   };

//   const confirmDelete = (id) => {
//     Modal.confirm({
//       title: "Вы уверены, что хотите удалить этот документ?",
//       okText: "Да",
//       okType: "danger",
//       cancelText: "Отмена",
//       onOk() {
//         deleteDocument(id);
//       },
//     });
//   };

//   const handleAddDocument = () => {
//     setOpenModalAdd(true);
//     if (isModal) {
//       setModalCategoryKey(categoryKey);
//     } else {
//       setModalCategoryKey(null);
//     }
//   };

//   return (
//     <div>
//       <AppHelmet title={"Документы"} desc={"Документы"} />
//       <Title level={1}>Документы</Title>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {loadingDocuments && <SceletonCard />}
//         {documents &&
//           documents.map((document, index) => {
//             return (
//               <Card
//                 key={index}
//                 hoverable
//                 style={{
//                   width: 250,
//                   height: 250,
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   textAlign: "center",
//                   position: "relative",
//                 }}
//                 onClick={() => {
//                   console.log(
//                     "Открываем документ с ПутьКФайлу:",
//                     document.ПутьКФайлу
//                   );
//                   handleDocumentClick(document);
//                 }}
//               >
//                 {/* Показываем кнопку удаления только если не в модалке */}
//                 {!isModal && (
//                   <Button
//                     type="primary"
//                     shape="circle"
//                     icon={<DeleteOutlined />}
//                     size="small"
//                     style={{ position: "absolute", top: 10, right: 10 }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       confirmDelete(document.Ref_Key);
//                     }}
//                   />
//                 )}

//                 {/* Добавляем иконку предпросмотра в модалке */}
//                 {isModal && (
//                   <Button
//                     type="primary"
//                     shape="circle"
//                     icon={<EyeOutlined />}
//                     size="small"
//                     style={{ position: "absolute", top: 10, right: 10 }}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       openDocument(document);
//                     }}
//                   />
//                 )}

//                 <Text type="secondary" style={{ fontSize: "16px" }}>
//                   Название:
//                 </Text>
//                 <Title level={5} style={{ margin: "8px 0" }}>
//                   {document.Description}
//                 </Title>
//                 <div style={{ margin: "8px 0" }}>
//                   <FilePdfOutlined
//                     style={{ fontSize: "48px", color: "#e37020" }}
//                   />
//                 </div>
//                 <Text type="secondary">
//                   Размер файла: {Math.round(document.Размер / 1024)} КБ
//                 </Text>
//               </Card>
//             );
//           })}
//         <Card
//           hoverable
//           style={{
//             width: 250,
//             height: 250,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//           onClick={handleAddDocument}
//         >
//           <PlusOutlined style={{ fontSize: "24px" }} />
//         </Card>
//       </div>
//       <ModalAddDocument
//         visible={openModalAdd}
//         onClose={() => setOpenModalAdd(false)}
//         categoryKey={modalCategoryKey}
//       />
//     </div>
//   );
// };

// export default Documents;
