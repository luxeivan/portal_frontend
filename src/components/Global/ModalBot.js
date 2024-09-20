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

moment.locale("ru");

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
  const { colorPrimaryText } = theme.useToken().token;

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

  return (
    <Modal
      title="Помощник"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {/* Область сообщений */}
      <div
        ref={messagesContainerRef} // Привязываем реф к контейнеру
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          marginBottom: "16px",
          padding: "8px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
        }}
      >
        <List
          dataSource={chatMessages}
          renderItem={(item) => (
            <List.Item
              style={{
                justifyContent:
                  item.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  backgroundColor:
                    item.sender === "user" ? "#1890ff" : "#e6f7ff",
                  color: item.sender === "user" ? "#fff" : "#000",
                  padding: "8px 12px",
                  borderRadius: "16px",
                  maxWidth: "70%",
                }}
              >
                <div>{item.text}</div>
                <div
                  style={{
                    fontSize: "12px",
                    color: item.sender === "user" ? "#d9d9d9" : "#8c8c8c",
                    textAlign: "right",
                    marginTop: "4px",
                  }}
                >
                  {moment(item.timestamp).format("HH:mm")}
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

// import React, { useState } from "react";
// import { Modal, Input, List, Button, Spin, message as antdMessage, theme } from "antd";
// import { sendMessageToGigachat } from "./gigachatApi";

// const ModalBot = ({ visible, onClose }) => {
//   const [chatMessages, setChatMessages] = useState([
//     { sender: "bot", text: "Здравствуйте! Чем я могу вам помочь?" },
//   ]);
//   const [userInput, setUserInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { colorPrimaryText } = theme.useToken().token

//   const handleSendMessage = async () => {
//     if (userInput.trim() === "") return;

//     // Добавляем сообщение пользователя в историю сообщений
//     setChatMessages((prevMessages) => [
//       ...prevMessages,
//       { sender: "user", text: userInput },
//     ]);

//     const userMessage = userInput;
//     setUserInput("");
//     setLoading(true);

//     try {
//       // Отправляем сообщение к GigaChat
//       const botResponse = await sendMessageToGigachat(userMessage);

//       // Добавляем ответ бота в историю сообщений
//       setChatMessages((prevMessages) => [
//         ...prevMessages,
//         { sender: "bot", text: botResponse },
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
//       visible={visible}
//       onCancel={onClose}
//       footer={null}
//       width={600}
//     >
//       {/* Область сообщений */}
//       <div
//         style={{
//           maxHeight: "400px",
//           overflowY: "auto",
//           marginBottom: "16px",
//           padding: "8px",
//           backgroundColor: "#f5f5f5",
//           borderRadius: "4px",
//         }}
//       >
//         <List
//           dataSource={chatMessages}
//           renderItem={(item) => (
//             <List.Item
//               style={{
//                 justifyContent:
//                   item.sender === "user" ? "flex-end" : "flex-start",
//               }}
//             >
//               <div
//                 style={{
//                   backgroundColor:
//                     item.sender === "user" ? "#1890ff" : "#e6f7ff",
//                   color: item.sender === "user" ? "#fff" : "#000",
//                   // color: colorPrimaryText,
//                   padding: "8px 12px",
//                   borderRadius: "16px",
//                   maxWidth: "70%",
//                 }}
//               >
//                 {item.text}
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
