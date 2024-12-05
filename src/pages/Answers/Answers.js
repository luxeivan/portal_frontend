import React, { useState, useEffect } from "react";
import axios from "axios";
import { Collapse, Button, Typography, Row, Col, Image } from "antd";
import { GiFlashlight } from "react-icons/gi";

import ModalBot from "../../components/Global/ModalBot";
import MarkDownText from "../../components/MarkDownText/MarkDownText";
import AppHelmet from "../../components/Global/AppHelmet";

import mosoblikImage from "../../img/answers/mosoblik.png";
import mosoblikDarkImage from "../../img/answers/mosoblik_dark.png";

import useGlobal from "../../stores/useGlobal";
import styles from "./Answers.module.css";

const { Title } = Typography;

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

export default function Answers() {
  const [questions, setQuestions] = useState([]);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const { darkMode } = useGlobal();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${backServer}/api/hotquestions`);
        setQuestions(response.data);
      } catch (error) {
        console.error("Ошибка при получении вопросов/ответов:", error);
      }
    };
    fetchQuestions();
  }, []);

  const sortedQuestions = [...questions].sort((a, b) =>
    a.question.localeCompare(b.question)
  );

  const items = sortedQuestions.map((q, index) => ({
    key: index,
    label: q.question,
    children: <MarkDownText>{q.answer}</MarkDownText>,
  }));

  return (
    <div style={{ padding: "20px", maxWidth: "1600px", margin: "0 auto" }}>
      <AppHelmet
        title={"Часто задаваемые вопросы"}
        desc={"Часто задаваемые вопросы"}
      />
      <Title level={2} style={{ marginBottom: "16px" }}>
        Часто задаваемые вопросы
      </Title>

      <Row gutter={[32, 32]} align="middle">
        {/* Левая колонка: Вопросы и кнопка */}
        <Col xs={24} md={16}>
          <Collapse accordion items={items} />
          <Button
            type="primary"
            onClick={() => setChatModalVisible(true)}
            style={{ marginTop: "20px" }}
            size="large"
          >
            Задать вопрос
          </Button>
        </Col>

        {/* Правая колонка: Изображение и Фонарик */}
        <Col xs={24} md={8} className={styles.imageContainer}>
          <Image
            src={darkMode ? mosoblikDarkImage : mosoblikImage}
            alt="Мособлик"
            style={{ width: "70%", height: "auto" }}
            preview={false}
          />
          {/* {darkMode && <GiFlashlight className={styles.flashlight} />} */}
        </Col>
      </Row>

      <ModalBot
        visible={chatModalVisible}
        onClose={() => setChatModalVisible(false)}
      />
    </div>
  );
}
