import React, { useEffect } from "react";
import { Typography, Card } from "antd";
import SceletonCard from "../../../components/SceletonCard";
import { PlusOutlined } from "@ant-design/icons";
import useDocuments from "../../../stores/Cabinet/useDocuments";
import ModalAddDocument from "../../../components/Cabinet/Documents/ModalAddDocument";
import ModalViewDocument from "../../../components/Cabinet/Documents/ModalViewDocument";

const { Title } = Typography;

const Documents = () => {
  const documents = useDocuments((state) => state.documents);
  const loadingDocuments = useDocuments((state) => state.loadingDocuments);
  const setOpenModalAdd = useDocuments((state) => state.setOpenModalAdd);
  const setOpenModalView = useDocuments((state) => state.setOpenModalView);
  const fetchDocuments = useDocuments((state) => state.fetchDocuments);
  const nameDocs = useDocuments((state) => state.nameDocs);
  const getNameDocs = useDocuments((state) => state.getNameDocs);

  useEffect(() => {
    getNameDocs();
    fetchDocuments();
  }, []);
  
  return (
    <div>
      <Title level={1}>Документы</Title>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {loadingDocuments && <SceletonCard />}
        {documents.map((document, index) => (
          <Card
            key={index}
            hoverable
            style={{ width: 250, height: 250 }}
            onClick={() => setOpenModalView(document.Ref_Key)}
          >
            <Card.Meta
              title={
                nameDocs.find((item) => item.Ref_Key == document.nameDoc_Key)
                  ?.Description
              }
              description={`Количество файлов: ${document.files.length}`}
            />
          </Card>
        ))}
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