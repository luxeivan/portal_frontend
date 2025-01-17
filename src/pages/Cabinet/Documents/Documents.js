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
  };

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
