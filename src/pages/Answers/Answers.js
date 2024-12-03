import React, { useState, useEffect } from "react";
import axios from "axios";
import { Collapse, Button, Typography, Card } from "antd";
import { RightOutlined } from "@ant-design/icons";
import ModalBot from "../../components/Global/ModalBot";
import MarkDownText from "../../components/MarkDownText/MarkDownText";
import AppHelmet from "../../components/Global/AppHelmet";

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

export default function Answers() {
  const [questions, setQuestions] = useState([]);
  const [chatModalVisible, setChatModalVisible] = useState(false);

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

  const items = sortedQuestions.map((q, index) => (
    {
      key: index,
      label: q.question,
      children: <MarkDownText>{q.answer}</MarkDownText>,
    })
  )

  return (
    <div style={{ padding: "20px", maxWidth: "1600px",margin:"0 auto" }}>
      <AppHelmet title={"Часто задаваемые вопросы"} desc={"Часто задаваемые вопросы"} />
      <Title level={2}>Часто задаваемые вопросы</Title>

      
        <Collapse
          accordion
          // bordered={false}
          // expandIcon={({ isActive }) => (
          //   <RightOutlined rotate={isActive ? 90 : 0} />
          // )}
          // expandIconPosition="right"
          items={items}
        />
         

      <Button
        type="primary"
        onClick={() => setChatModalVisible(true)}
        style={{ marginTop: "20px" }}
        size="large"
      >
        Задать вопрос
      </Button>

      <ModalBot
        visible={chatModalVisible}
        onClose={() => setChatModalVisible(false)}
      />
    </div>
  );
}
