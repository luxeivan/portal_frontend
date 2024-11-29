import React, { useState, useEffect } from "react";
import axios from "axios";
import { Collapse, Button, Typography, Card } from "antd";
import { RightOutlined } from "@ant-design/icons";
import ModalBot from "../../components/Global/ModalBot";

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

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Часто задаваемые вопросы</Title>

      <Card>
        <Collapse
          accordion
          bordered={false}
          expandIcon={({ isActive }) => (
            <RightOutlined rotate={isActive ? 90 : 0} />
          )}
          expandIconPosition="right"
        >
          {questions.map((q, index) => (
            <Panel
              header={<Text strong>{q.question}</Text>}
              key={index}
              style={{ borderBottom: "1px solid #f0f0f0" }}
            >
              <Paragraph>{q.answer}</Paragraph>
            </Panel>
          ))}
        </Collapse>
      </Card>

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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Collapse, Button, Typography } from "antd";
// import { RightOutlined } from "@ant-design/icons";
// import ModalBot from "../../components/Global/ModalBot";

// const { Text, Title } = Typography;

// const { Panel } = Collapse;

// const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

// export default function Answers() {
//   const [questions, setQuestions] = useState([]);
//   const [chatModalVisible, setChatModalVisible] = useState(false);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(`${backServer}/api/hotquestions`);
//         setQuestions(response.data);
//       } catch (error) {
//         console.error("Ошибка при получении вопросов/ответов:", error);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <Title level={2}>Часто задаваемые вопросы</Title>

//       <Collapse
//         accordion
//         expandIcon={({ isActive }) => (
//           <RightOutlined rotate={isActive ? 90 : 0} />
//         )}
//       >
//         {questions.map((q, index) => (
//           <Panel header={q.question} key={index}>
//             <Text>{q.answer}</Text>
//           </Panel>
//         ))}
//       </Collapse>

//       {/* Кнопка для открытия чат-бота */}
//       <Button
//         type="primary"
//         onClick={() => setChatModalVisible(true)}
//         style={{ marginTop: "20px" }}
//       >
//         Задать вопрос
//       </Button>

//       {/* Модальное окно чат-бота */}
//       <ModalBot
//         visible={chatModalVisible}
//         onClose={() => setChatModalVisible(false)}
//       />
//     </div>
//   );
// }
