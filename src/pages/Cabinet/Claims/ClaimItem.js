import React, { useEffect, useState, useCallback } from "react";
import {
  Skeleton,
  Typography,
  Descriptions,
  Button,
  Modal,
  message,
  Tabs,
} from "antd";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useClaims from "../../../stores/Cabinet/useClaims";
import ChatComponent from "./ChatComponent";
import styles from "./ClaimItem.module.css";
import { FilePdfOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { motion } from "framer-motion"; // Для анимаций

const { Title } = Typography;
const { TabPane } = Tabs;

export default function ClaimItem() {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfVisible, setPdfVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const claim = useClaims((state) => state.claim);
  const fetchClaimItem = useClaims((state) => state.fetchClaimItem);
  const { id } = useParams();

  useEffect(() => {
    console.log("Claim ID:", id);
    fetchClaimItem(id);
  }, [fetchClaimItem, id]);

  useEffect(() => {
    fetchClaimItem(id);
  }, [fetchClaimItem, id]);

  useEffect(() => {
    fetchClaimItem(id);
  }, [fetchClaimItem, id]);

  console.log("Claim object:", claim);

  // Функция для получения и отображения PDF файла
  // Функция для получения и отображения PDF файла
  const handleViewPDF = useCallback(async () => {
    setPdfLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      const backendServer = process.env.REACT_APP_BACK_BACK_SERVER;
      const pdfEndpoint = `/api/cabinet/get-claim-pdf/${id}`;
      const pdfUrl = `${backendServer}${pdfEndpoint}`;
      console.log("Claim ID:", id);
      console.log("Requesting PDF from:", pdfUrl);
      console.log("JWT Token:", token);

      const response = await axios.get(pdfUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
        withCredentials: true,
      });

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      setPdfUrl(fileURL);
      setPdfVisible(true);
    } catch (error) {
      console.error("Ошибка при загрузке PDF:", error);
      message.error("Не удалось загрузить PDF-файл.");
    } finally {
      setPdfLoading(false);
    }
  }, [id]);

  // Функция для закрытия модального окна с PDF
  const handlePdfCancel = () => {
    setPdfVisible(false);
    setPdfUrl(null);
  };

  return (
    <>
      {!claim ? (
        <div>
          <Title level={1}>Заявка</Title>
          <Skeleton active avatar paragraph={{ rows: 2 }} />
          <Skeleton active avatar paragraph={{ rows: 2 }} />
          <Skeleton active avatar paragraph={{ rows: 2 }} />
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <Link to="/cabinet/claimers">
              <Button type="primary" icon={<ArrowLeftOutlined />}>
                Назад
              </Button>
            </Link>
            <Title level={1} className={styles.title}>
              Заявка №{claim.Number}
            </Title>
            <Button
              type="primary"
              icon={<FilePdfOutlined />}
              loading={pdfLoading}
              onClick={handleViewPDF}
            >
              Просмотреть PDF
            </Button>
          </div>

          <Descriptions
            bordered
            column={1}
            className={styles.descriptions}
            labelStyle={{ fontWeight: "bold" }}
          >
            <Descriptions.Item label="Создана">{claim.Date}</Descriptions.Item>
            <Descriptions.Item label="По услуге">
              {claim.template.Description}
            </Descriptions.Item>
            <Descriptions.Item label="Статус">{claim.Status}</Descriptions.Item>
          </Descriptions>

          <Tabs defaultActiveKey="1">
            <TabPane tab="Данные заявки" key="1">
              <Descriptions
                title="Поля с данными по заявке"
                bordered
                column={1}
                className={styles.descriptions}
                labelStyle={{ fontWeight: "bold" }}
              >
                {claim.fields.map((item, index) => (
                  <Descriptions.Item key={index} label={item.name_Key}>
                    {item.value}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </TabPane>
            <TabPane tab="Чат по заявке" key="2">
              {/* Компонент чата с уведомлениями и статусами */}
              <ChatComponent claimId={id} />
            </TabPane>
          </Tabs>

          {/* Модальное окно для отображения PDF файла */}
          <Modal
            visible={pdfVisible}
            title="Просмотр PDF"
            footer={null}
            onCancel={handlePdfCancel}
            width="80%"
            style={{ top: 20 }}
          >
            {pdfUrl && (
              <iframe
                src={pdfUrl}
                title="PDF Viewer"
                width="100%"
                height="600px"
                style={{ border: "none" }}
              />
            )}
          </Modal>
        </>
      )}
    </>
  );
}
// import { Skeleton, Typography, Descriptions, Button } from 'antd'
// import Title from 'antd/es/typography/Title'
// import React, { useEffect } from 'react'
// import { useParams,Link } from 'react-router-dom'
// import useClaims from '../../../stores/Cabinet/useClaims'

// export default function ClaimItem() {
//     const claim = useClaims(state => state.claim)
//     const fetchClaimItem = useClaims(state => state.fetchClaimItem)
//     const { id } = useParams()
//     useEffect(() => {
//         fetchClaimItem(id)
//     }, [])
//     console.log(claim)
//     return (
//         <>
//             {!claim &&

//                 <div>
//                     <Title level={1}>Заявка</Title>

//                     <Skeleton active avatar paragraph={{ rows: 2 }} />
//                     <Skeleton active avatar paragraph={{ rows: 2 }} />
//                     <Skeleton active avatar paragraph={{ rows: 2 }} />
//                 </div>
//             }
//             {claim &&
//                 <>
//                     <Link to="/cabinet/claimers"><Button>Назад</Button></Link>
//                     <Typography.Title level={1}>Заявка №{claim.Number}</Typography.Title>
//                     <Descriptions
//                         // title={`Заявка №${item.Element2_Expanded.Number}`}
//                         column={1} items={[
//                             {
//                                 key: '1',
//                                 label: 'Создана',
//                                 children: claim.Date,
//                             },
//                             {
//                                 key: '2',
//                                 label: 'По услуге',
//                                 children: claim.template.Description,
//                             }
//                         ]} />
//                     <Descriptions title="Поля с данными по заявке"
//                         bordered
//                         column={1}
//                         items={claim.fields.map((item, index) => ({
//                             key: index + 1,
//                             label: item.name_Key,
//                             children: item.value,
//                         }))}
//                     />
//                 </>
//             }
//         </>
//     )
// }
