import React, { useEffect, useState, useCallback } from "react";
import { Typography, Button, Steps, message } from "antd";
import { useParams } from "react-router-dom";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import useClaims from "../../../../stores/Cabinet/useClaims";
import ChatComponent from "../ChatComponent/ChatComponent";
import styles from "./ClaimItem.module.css";
import { FileTextOutlined } from "@ant-design/icons";
import zayavka from "../../../../assets/zayavka.pdf";

const { Title } = Typography;
const { Step } = Steps;

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function ClaimItem() {
  const [pdfLoading, setPdfLoading] = useState(false);

  const claim = useClaims((state) => state.claim);
  const fetchClaimItem = useClaims((state) => state.fetchClaimItem);
  const { id } = useParams();

  useEffect(() => {
    fetchClaimItem(id);
  }, [fetchClaimItem, id]);

  // Моковые статусы заявки
  const statuses = [
    "Заявка на проверке",
    "Заявка принята",
    "Подпишите и/или оплатите договор ТП",
    "Ожидание оплаты",
    "Договор заключен",
    "Акт о ТП",
  ];

  // Текущий статус заявки (для примера выбираем 2-й статус)
  const currentStatusIndex = 2; // Индекс текущего статуса в массиве статусов

  // Функция для генерации и открытия PDF с заглушкой
  const handleViewPDF = useCallback(() => {
    setPdfLoading(true);
    try {
      const documentDefinition = {
        content: [
          { text: `Заявка №${claim.Number}`, style: "header" },
          {
            text: "Здесь будет отображаться информация о заявке.",
            margin: [0, 20, 0, 0],
          },
          {
            text: "Содержимое заявки:",
            style: "subheader",
            margin: [0, 20, 0, 10],
          },
          // Добавьте необходимое содержимое
          { text: "Это заглушка для демонстрации PDF-файла." },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
          },
        },
      };

      pdfMake.createPdf(documentDefinition).open();
    } catch (error) {
      console.error("Ошибка при генерации PDF:", error);
      message.error("Не удалось сгенерировать заявку.");
    } finally {
      setPdfLoading(false);
    }
  }, [claim]);

  return (
    <>
      {!claim ? (
        <div>
          <Title level={1}>Заявка</Title>
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <Title level={1} className={styles.title}>
              Заявка №{claim.Number}
            </Title>
            <a target="_blank" href={zayavka}>
              <Button
                type="primary"
                icon={<FileTextOutlined />}
                loading={pdfLoading}
                // onClick={handleViewPDF}
              >
                Просмотреть заявку
              </Button>
            </a>
          </div>

          {/* Статусы заявки */}
          <Steps
            current={currentStatusIndex}
            className={styles.steps}
            progressDot
          >
            {statuses.map((status, index) => (
              <Step key={index} title={status} />
            ))}
          </Steps>

          {/* Чат с уведомлениями и возможностью отправить обращение */}
          <ChatComponent
            claimId={id}
            statuses={statuses}
            currentStatusIndex={currentStatusIndex}
          />
        </>
      )}
    </>
  );
}
