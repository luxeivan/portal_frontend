import { Flex, Modal, Spin, Descriptions, Image } from "antd";
import React, { useEffect, useState } from "react";
import useDocuments from "../../../stores/Cabinet/useDocuments";
import axios from "axios";
import config from "../../../config";

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
      console.log("Файл загружен:", url); // Лог для отладки
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
          console.log("Все файлы загружены:", urls); // Лог для отладки
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
              <Descriptions.Item key={index} label={`Имя файла №${index + 1}`}>
                {item.fileName.endsWith(".pdf") ? (
                  <a
                    href={fileUrls[index]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Открыть PDF
                  </a>
                ) : (
                  <Image
                    src={fileUrls[index]}
                    alt={item.fileName}
                    style={{ maxWidth: "100%" }}
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

// import { Flex, Modal, Spin, Typography, Descriptions } from "antd";
// import React, { useEffect } from "react";
// import useDocuments from "../../../stores/Cabinet/useDocuments";

// export default function ModalViewDocument() {
//   const openModalView = useDocuments((state) => state.openModalView);
//   const setOpenModalView = useDocuments((state) => state.setOpenModalView);
//   const loadingDocument = useDocuments((state) => state.loadingDocument);
//   const fetchDocument = useDocuments((state) => state.fetchDocument);
//   const nameDocs = useDocuments((state) => state.nameDocs);
//   const document = useDocuments((state) => state.document);

//   useEffect(() => {
//     if (openModalView) {
//       fetchDocument(openModalView);
//     }
//   }, [openModalView]);

//   return (
//     <Modal
//       open={openModalView}
//       title="Документ"
//       onCancel={() => setOpenModalView()}
//       footer={null}
//     >
//       {loadingDocument && (
//         <Flex
//           style={{ width: "100%", height: "100px" }}
//           align="center"
//           justify="center"
//         >
//           <div>
//             <Spin size="large" />
//           </div>
//         </Flex>
//       )}
//       {!loadingDocument && document.files && (
//         <Descriptions
//           column={{
//             xs: 1,
//             sm: 1,
//             md: 1,
//             lg: 1,
//             xl: 1,
//             xxl: 1,
//           }}
//           title={
//             nameDocs.find((item) => item.Ref_Key == document.nameDoc_Key)
//               ?.Description
//           }
//         >
//           {document.files.map((item, index) => (
//             <Descriptions.Item key={index} label={`Имя файла №${index + 1}`}>
//               {item.fileName}
//             </Descriptions.Item>
//           ))}
//         </Descriptions>
//       )}
//     </Modal>
//   );
// }
