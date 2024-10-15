import { Modal, Spin, Typography, Button } from "antd";
import React, { useEffect, useState } from "react";
import useDocuments from "../../../stores/Cabinet/useDocuments";
import axios from "axios";
import ErrorModal from "../../ErrorModal"; 

const { Title } = Typography;

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

export default function ModalViewDocument() {
  const openModalView = useDocuments((state) => state.openModalView);
  const setOpenModalView = useDocuments((state) => state.setOpenModalView);
  const loadingDocument = useDocuments((state) => state.loadingDocument);
  const fetchDocument = useDocuments((state) => state.fetchDocument);
  const document = useDocuments((state) => state.document);

  const [fileUrl, setFileUrl] = useState(null);
  const [loadingFile, setLoadingFile] = useState(false);
  const [error, setError] = useState(null); // Состояние для хранения ошибки
  const [errorVisible, setErrorVisible] = useState(false); // Состояние для управления видимостью модального окна с ошибкой

  const getFile = async (refKey) => {
    try {
      console.log("Запрашиваем файл для Ref_Key:", refKey); // Логируем Ref_Key
      const response = await axios.get(
        `${backServer}/api/cabinet/get-file/${refKey}`,
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
      console.log("Получен URL файла:", url); // Логируем URL файла
      return url;
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
      setError(error.message); // Устанавливаем ошибку в состояние
      setErrorVisible(true); // Показываем модальное окно с ошибкой
      throw error;
    }
  };

  useEffect(() => {
    if (openModalView) {
      console.log("Открыт модал с документом Ref_Key:", openModalView); // Логируем открытие модала
      fetchDocument(openModalView);
    }
  }, [openModalView, fetchDocument]);

  useEffect(() => {
    if (document && document.Ref_Key) {
      const fetchFile = async () => {
        setLoadingFile(true);
        try {
          const url = await getFile(document.Ref_Key);
          setFileUrl(url);
        } catch (error) {
          console.error("Ошибка загрузки файла:", error);
          setError(error.message); // Устанавливаем ошибку в состояние
          setErrorVisible(true); // Показываем модальное окно с ошибкой
        } finally {
          setLoadingFile(false);
        }
      };
      fetchFile();
    }
  }, [document]);

  const closeModal = () => {
    setErrorVisible(false);
  };

  return (
    <>
      <Modal
        open={!!openModalView}
        title="Документ"
        onCancel={() => setOpenModalView(null)}
        footer={null}
        width={800}
      >
        {loadingDocument || loadingFile ? (
          <div
            style={{
              width: "100%",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          document && (
            <div>
              <Title level={4}>{document.Description}</Title>
              {fileUrl && (
                <iframe
                  src={fileUrl}
                  title="PDF Document"
                  width="100%"
                  height="600px"
                />
              )}
              {!fileUrl && <p>Файл недоступен</p>}
              <Button
                type="primary"
                onClick={() => {
                  if (fileUrl) {
                    const link = document.createElement("a");
                    link.href = fileUrl;
                    link.download = document.Description || "document.pdf";
                    link.click();
                  }
                }}
              >
                Скачать
              </Button>
            </div>
          )
        )}
      </Modal>
      <ErrorModal visible={errorVisible} error={error} onClose={closeModal} />
    </>
  );
}
