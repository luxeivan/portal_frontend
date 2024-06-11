import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  Modal,
  Button,
  Upload,
  message,
  Form,
  Select,
  Spin,
  Progress,
} from "antd";
import SceletonCard from "../../../components/SceletonCard";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import config from "../../../config";
import useDocuments from "../../../stores/Cabinet/useDocuments";
import ModalAddDocument from "../../../components/Cabinet/Documents/ModalAddDocument";
import ModalViewDocument from "../../../components/Cabinet/Documents/ModalViewDocument";

const { Title } = Typography;


const stylesForCard = {
  body: {
    height: "100%",
    width: 250,
    minHeight: 250,
  },
  actions: { marginTop: "-20px" },
  header: { backgroundColor: "red" },
};

const Documents = () => {
  const documents = useDocuments(state => state.documents)
  const loadingDocuments = useDocuments(state => state.loadingDocuments)
  const setOpenModalAdd = useDocuments(state => state.setOpenModalAdd)
  const setOpenModalView = useDocuments(state => state.setOpenModalView)
  const fetchDocuments = useDocuments(state => state.fetchDocuments)
  const nameDocs = useDocuments(state => state.nameDocs)
  const getNameDocs = useDocuments(state => state.getNameDocs)

  useEffect(() => {
    getNameDocs();
    fetchDocuments();
  }, []);
  //console.log(documents)
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
            // cover={<img alt={document.name} src={document.url} />}
            onClick={() => setOpenModalView(document.Ref_Key)}
          >
            <Card.Meta
              title={nameDocs.find(item => item.Ref_Key == document.nameDoc_Key)?.Description}
              //title={document.Description}
              description={`Количество файлов: ${document.files.length}`} />
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
