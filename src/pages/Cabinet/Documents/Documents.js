import React, { useEffect } from "react";
import { Typography, Card } from "antd";
import AppHelmet from "../../../components/Global/AppHelmet";
import { PlusOutlined, FilePdfOutlined } from "@ant-design/icons";
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

  useEffect(() => {
    console.log("Документы загружены:", documents); // Выводим загруженные документы
  }, [documents]);

  return (
    <div>
      <AppHelmet title={"Документы"} desc={"Документы"} />
      <Title level={1}>Документы</Title>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {loadingDocuments && <SceletonCard />}
        {documents &&
          documents.map((document, index) => {
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
                onClick={() => {
                  console.log(
                    "Открываем документ с Ref_Key:",
                    document.Ref_Key
                  );
                  setOpenModalView(document.Ref_Key);
                }}
              >
                {/* <Text type="secondary" style={{ fontSize: "16px" }}>
                  Категория: {document.ВидФайла}
                </Text> */}
                <Title level={5} style={{ margin: "8px 0" }}>
                  {document.Description}
                </Title>
                <div style={{ margin: "8px 0" }}>
                  <FilePdfOutlined
                    style={{ fontSize: "48px", color: "#e37020" }}
                  />
                </div>
                {/* <Text type="secondary">
                  Размер файла: {Math.round(document.Размер / 1024)} КБ
                </Text> */}
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
