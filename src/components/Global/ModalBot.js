import React, { useState } from "react";
import { Modal, Input, List, Button, Spin, message as antdMessage } from "antd";
import { sendMessageToGigachat } from "./gigachatApi";
import MarkDownText from "../MarkDownText/MarkDownText";

const ModalBot = ({ visible, onClose }) => {
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Здравствуйте! Чем я могу вам помочь?" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    // Добавляем сообщение пользователя в историю сообщений
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userInput },
    ]);

    const userMessage = userInput;
    setUserInput("");
    setLoading(true);

    try {
      // Отправляем сообщение к GigaChat
      const botResponse = await sendMessageToGigachat(userMessage);

      // Добавляем ответ бота в историю сообщений
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botResponse },
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
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {/* Область сообщений */}
      <div
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
                <MarkDownText>{item.text}</MarkDownText>
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
