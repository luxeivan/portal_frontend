import React, { useState, useEffect } from "react";
import { Input, Button, List, Avatar, message } from "antd";
import axios from "axios";
import { SendOutlined } from "@ant-design/icons";
import styles from "./ChatComponent.module.css";
import { motion } from "framer-motion";

export default function ChatComponent({ claimId }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);

  // Функция для получения сообщений чата
  useEffect(() => {
    const fetchMessages = async () => {
      setLoadingMessages(true);
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_BACK_SERVER}/api/chat/${claimId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Ошибка при загрузке сообщений:", error);
        message.error("Не удалось загрузить сообщения чата.");
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [claimId]);

  // Функция для отправки сообщения
  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      setSendingMessage(true);
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.post(
          `${process.env.REACT_APP_BACK_BACK_SERVER}/api/chat/${claimId}`,
          { message: inputValue },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setMessages((prevMessages) => [...prevMessages, response.data.message]);
        setInputValue("");
      } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
        message.error("Не удалось отправить сообщение.");
      } finally {
        setSendingMessage(false);
      }
    }
  };

  return (
    <div className={styles.chatContainer}>
      <List
        className={styles.messageList}
        loading={loadingMessages}
        dataSource={messages}
        renderItem={(item) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={item.id}
          >
            <List.Item
              className={
                item.sender === "Вы" ? styles.myMessage : styles.otherMessage
              }
            >
              <List.Item.Meta
                avatar={<Avatar>{item.sender[0]}</Avatar>}
                title={item.sender}
                description={item.message}
              />
            </List.Item>
          </motion.div>
        )}
      />
      <Input.TextArea
        rows={4}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите сообщение..."
        className={styles.messageInput}
      />
      <Button
        type="primary"
        icon={<SendOutlined />}
        loading={sendingMessage}
        onClick={handleSendMessage}
        className={styles.sendButton}
      >
        Отправить
      </Button>
    </div>
  );
}
