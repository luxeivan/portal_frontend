import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Input,
  List,
  Button,
  Spin,
  message as antdMessage,
  theme,
} from "antd";
import { sendMessageToGigachat } from "./gigachatApi";
import moment from "moment";
import "moment/locale/ru";

import MarkDownText from "../MarkDownText/MarkDownText";
import HotQuestions from "./HotQuestions"; // Импортируем новый компонент

const ModalBot = ({ visible, onClose }) => {
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Здравствуйте! Чем я могу вам помочь?",
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Получаем все токены темы
  const { token } = theme.useToken();

  // Создаем реф для контейнера сообщений
  const messagesContainerRef = useRef(null);

  // Функция для прокрутки до последнего сообщения
  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth", // Плавная прокрутка
      });
    }
  };

  // Используем useEffect для вызова scrollToBottom при добавлении новых сообщений
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    // Добавляем сообщение пользователя в историю сообщений с временем
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userInput, timestamp: new Date() },
    ]);

    const userMessage = userInput;
    setUserInput("");
    setLoading(true);

    try {
      // Отправляем сообщение к GigaChat
      const botResponse = await sendMessageToGigachat(userMessage);

      // Добавляем ответ бота в историю сообщений с временем
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponse, timestamp: new Date() },
      ]);
    } catch (error) {
      console.error("Ошибка при общении с GigaChat:", error);
      antdMessage.error("Ошибка при получении ответа от бота.");
    } finally {
      setLoading(false);
    }
  };

  // Обработчик для горячих вопросов
  const handleHotQuestionClick = (questionObj) => {
    // Добавляем вопрос пользователя
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: questionObj.question, timestamp: new Date() },
    ]);

    // Добавляем предопределенный ответ бота
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: questionObj.answer, timestamp: new Date() },
    ]);
  };

  return (
    <Modal
      title="Помощник"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {/* Область сообщений */}
      <div
        ref={messagesContainerRef}
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          marginBottom: "16px",
          padding: "8px",
          backgroundColor: token.colorBgLayout,
          borderRadius: "4px",
        }}
      >
        <List
          dataSource={chatMessages}
          renderItem={({ sender, text, timestamp }) => (
            <List.Item
              style={{
                justifyContent: sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  backgroundColor:
                    sender === "user"
                      ? token.colorPrimary
                      : token.colorBgContainer,
                  color:
                    sender === "user"
                      ? token.colorTextLightSolid
                      : token.colorText,
                  padding: "8px 12px",
                  borderRadius: "16px",
                  maxWidth: "70%",
                }}
              >
                <MarkDownText>{text}</MarkDownText>
                <div
                  style={{
                    fontSize: "12px",
                    color: token.colorTextSecondary,
                    textAlign: "right",
                    marginTop: "4px",
                  }}
                >
                  {moment(timestamp).format("HH:mm")}
                </div>
              </div>
            </List.Item>
          )}
        />

        {loading && (
          <div style={{ textAlign: "center", padding: "10px" }}>
            <Spin tip="Бот печатает..." />
          </div>
        )}
      </div>
      {/* Кнопки горячих вопросов */}
      <HotQuestions onQuestionClick={handleHotQuestionClick} />

      {/* Поле ввода и кнопка отправки */}
      <div style={{ display: "flex", gap: "8px" }}>
        <Input
          placeholder="Введите сообщение"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onPressEnter={handleSendMessage}
          disabled={loading}
        />
        <Button type="primary" onClick={handleSendMessage} disabled={loading}>
          Отправить
        </Button>
      </div>
    </Modal>
  );
};

export default ModalBot;

// import React, { useState, useRef, useEffect } from "react";
// import {
//   Modal,
//   Input,
//   List,
//   Button,
//   Spin,
//   message as antdMessage,
//   theme,
// } from "antd";
// import { sendMessageToGigachat } from "./gigachatApi";
// import moment from "moment";
// import "moment/locale/ru";

// import MarkDownText from "../MarkDownText/MarkDownText";

// const ModalBot = ({ visible, onClose }) => {
//   const [chatMessages, setChatMessages] = useState([
//     {
//       sender: "bot",
//       text: "Здравствуйте! Чем я могу вам помочь?",
//       timestamp: new Date(),
//     },
//   ]);
//   const [userInput, setUserInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Получаем все токены темы
//   const { token } = theme.useToken();

//   // Создаем реф для контейнера сообщений
//   const messagesContainerRef = useRef(null);

//   // Функция для прокрутки до последнего сообщения
//   const scrollToBottom = () => {
//     const container = messagesContainerRef.current;
//     if (container) {
//       container.scrollTo({
//         top: container.scrollHeight,
//         behavior: "smooth", // Плавная прокрутка
//       });
//     }
//   };

//   // Используем useEffect для вызова scrollToBottom при добавлении новых сообщений
//   useEffect(() => {
//     scrollToBottom();
//   }, [chatMessages]);

//   const handleSendMessage = async () => {
//     if (userInput.trim() === "") return;

//     // Добавляем сообщение пользователя в историю сообщений с временем
//     setChatMessages((prevMessages) => [
//       ...prevMessages,
//       { sender: "user", text: userInput, timestamp: new Date() },
//     ]);

//     const userMessage = userInput;
//     setUserInput("");
//     setLoading(true);

//     try {
//       // Отправляем сообщение к GigaChat
//       const botResponse = await sendMessageToGigachat(userMessage);

//       // Добавляем ответ бота в историю сообщений с временем
//       setChatMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "bot", text: botResponse, timestamp: new Date() },
//       ]);
//     } catch (error) {
//       console.error("Ошибка при общении с GigaChat:", error);
//       antdMessage.error("Ошибка при получении ответа от бота.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal
//       title="Помощник"
//       open={visible}
//       onCancel={onClose}
//       footer={null}
//       width={600}
//       // styles={{ body: { backgroundColor: token.colorBgContainer } }}
//     // bodyStyle={{}}
//     >
//       {/* Область сообщений */}
//       <div
//         ref={messagesContainerRef}
//         style={{
//           maxHeight: "400px",
//           overflowY: "auto",
//           marginBottom: "16px",
//           padding: "8px",
//           backgroundColor: token.colorBgLayout,
//           borderRadius: "4px",
//         }}
//       >
//         <List
//           dataSource={chatMessages}
//           renderItem={({ sender, text, timestamp }) => (
//             <List.Item
//               style={{
//                 justifyContent: sender === "user" ? "flex-end" : "flex-start",
//               }}
//             >
//               <div
//                 style={{
//                   backgroundColor:
//                     sender === "user"
//                       ? token.colorPrimary
//                       : token.colorBgContainer,
//                   color:
//                     sender === "user"
//                       ? token.colorTextLightSolid
//                       : token.colorText,
//                   padding: "8px 12px",
//                   borderRadius: "16px",
//                   maxWidth: "70%",
//                 }}
//               >
//                 <MarkDownText>{text}</MarkDownText>
//                 <div
//                   style={{
//                     fontSize: "12px",
//                     color: token.colorTextSecondary,
//                     textAlign: "right",
//                     marginTop: "4px",
//                   }}
//                 >
//                   {moment(timestamp).format("HH:mm")}
//                 </div>
//               </div>
//             </List.Item>
//           )}
//         />

//         {loading && (
//           <div style={{ textAlign: "center", padding: "10px" }}>
//             <Spin tip="Бот печатает..." />
//           </div>
//         )}
//       </div>
//       {/* Поле ввода и кнопка отправки */}
//       <div style={{ display: "flex", gap: "8px" }}>
//         <Input
//           placeholder="Введите сообщение"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           onPressEnter={handleSendMessage}
//           disabled={loading}
//         />
//         <Button type="primary" onClick={handleSendMessage} disabled={loading}>
//           Отправить
//         </Button>
//       </div>
//     </Modal>
//   );
// };

// export default ModalBot;
