import React, { useEffect } from "react";
import { Typography, Card } from "antd";
import { PlusOutlined, FileOutlined } from "@ant-design/icons";
import SceletonCard from "../../../components/SceletonCard";
import useDocuments from "../../../stores/Cabinet/useDocuments";
import ModalAddDocument from "../../../components/Cabinet/Documents/ModalAddDocument";
import ModalViewDocument from "../../../components/Cabinet/Documents/ModalViewDocument";

const { Title, Text } = Typography;

const Documents = () => {
  const documents = useDocuments((state) => state.documents);
  const loadingDocuments = useDocuments((state) => state.loadingDocuments);
  const setOpenModalAdd = useDocuments((state) => state.setOpenModalAdd);
  const setOpenModalView = useDocuments((state) => state.setOpenModalView);
  const fetchDocuments = useDocuments((state) => state.fetchDocuments);

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div>
      <Title level={1}>Документы</Title>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {loadingDocuments && <SceletonCard />}
        {documents.map((document, index) => {
          // Ограничиваем количество иконок до 3
          const iconCount = Math.min(document.files.length, 3);
          // Создаем массив иконок
          const icons = Array.from({ length: iconCount }, (_, i) => (
            <FileOutlined
              key={i}
              style={{ fontSize: "24px", margin: "0 4px" }}
            />
          ));

          return (
            <Card
              key={index}
              hoverable
              style={{
                width: 250,
                height: 250,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
              onClick={() => setOpenModalView(document.id)}
            >
              <Text type="secondary" style={{ fontSize: "16px" }}>
                {document.category}
              </Text>
              <Title level={4} style={{ margin: "8px 0" }}>
                {document.documentName}
              </Title>
              <div style={{ margin: "8px 0" }}>{icons}</div>
              <Text type="secondary">
                Количество файлов: {document.files.length}
              </Text>
            </Card>
          );
        })}
        <Card
          hoverable
          style={{
            width: 250,
            height: 250,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setOpenModalAdd(true)}
        >
          <PlusOutlined style={{ fontSize: "24px" }} />
        </Card>
      </div>
      <ModalViewDocument />
      <ModalAddDocument />
    </div>
  );
};

export default Documents;
