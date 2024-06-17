import { Flex, Modal, Spin, Descriptions, Image, Card } from "antd";
import React, { useEffect, useState } from "react";
import useDocuments from "../../../stores/Cabinet/useDocuments";
import axios from "axios";
import config from "../../../config";
import pdf from "../../../img/docs/pdf.svg";

export default function ModalViewDocument() {
  const openModalView = useDocuments((state) => state.openModalView);
  const setOpenModalView = useDocuments((state) => state.setOpenModalView);
  const loadingDocument = useDocuments((state) => state.loadingDocument);
  const fetchDocument = useDocuments((state) => state.fetchDocument);
  const nameDocs = useDocuments((state) => state.nameDocs);
  const document = useDocuments((state) => state.document);

  const [fileUrls, setFileUrls] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);

  const getFile = async (relativePath) => {
    try {
      const response = await axios.get(
        `${config.backServer}/api/cabinet/get-file/${relativePath}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          withCredentials: true,
          responseType: "blob",
        }
      );
      if (!response.data) throw new Error("Ошибка получения файла");

      const url = window.URL.createObjectURL(response.data);
      return url;
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (openModalView) {
      fetchDocument(openModalView);
    }
  }, [openModalView, fetchDocument]);

  useEffect(() => {
    if (document.files) {
      const fetchFiles = async () => {
        setLoadingFiles(true);
        try {
          const urls = await Promise.all(
            document.files.map(async (file) => {
              const url = await getFile(file.fileName);
              return url;
            })
          );
          setFileUrls(urls);

        } catch (error) {
          console.error("Ошибка загрузки файлов:", error);
        } finally {
          setLoadingFiles(false);
        }
      };
      fetchFiles();
    }
  }, [document]);

  return (
    <Modal
      open={openModalView}
      title="Документ"
      onCancel={() => setOpenModalView()}
      footer={null}
      bodyStyle={{ padding: 0 }}
    >
      {loadingDocument || loadingFiles ? (
        <Flex
          style={{ width: "100%", height: "100px" }}
          align="center"
          justify="center"
        >
          <Spin size="large" />
        </Flex>
      ) : (
        document.files && (
          <Descriptions
            column={{
              xs: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 1,
              xxl: 1,
            }}
            title={
              nameDocs.find((item) => item.Ref_Key === document.nameDoc_Key)
                ?.Description
            }
          >
            {document.files.map((item, index) => (
              <Descriptions.Item key={index} style={{ textAlign: "center" }}>
                {item.fileName.endsWith(".pdf") ? (
                  <a
                    href={fileUrls[index]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#e37020", fontSize: "16px", width: "100%" }}
                  >
                    <Card
                      hoverable
                      style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginBottom: 16 }}
                    >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100px",
                          }}
                        >
                          <img
                            src={pdf}
                            alt="PDF"
                            style={{ width: "64px", color: "#ff4d4f" }}
                          />
                        </div>
                    </Card>
                  </a>
                ) : (
                  <Image
                    src={fileUrls[index]}
                    alt={item.fileName}
                    style={{
                      maxWidth: "50%",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                )}
              </Descriptions.Item>
            ))}
          </Descriptions>
        )
      )}
    </Modal>
  );
}