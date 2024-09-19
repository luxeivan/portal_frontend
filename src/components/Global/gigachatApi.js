import axios from "axios";
import { v4 as uuidv4 } from 'uuid';


// Функция для получения токена доступа
export const getAccessToken = async () => {
  const clientId = process.env.REACT_APP_GIGACHAT_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_GIGACHAT_CLIENT_SECRET;

  const authData = `${clientId}:${clientSecret}`;
  const encodedAuthData = btoa(authData);

  try {
    const response = await axios.post(
      "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
      "scope=GIGACHAT_API_PERS", // или другой scope в зависимости от вашего типа доступа
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          RqUID: generateUuid(),
          Authorization: `Basic ${encodedAuthData}`,
        },
      }
    );

    const { access_token, expires_at } = response.data;
    return access_token;
  } catch (error) {
    console.error("Ошибка при получении токена доступа:", error);
    throw error;
  }
};



// Функция для генерации UUID v4
const generateUuid = () => {
    
  // Реализуйте генерацию UUID v4 или используйте пакет uuid
  // Здесь для простоты используем простую функцию
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Функция для отправки сообщения и получения ответа от GigaChat
export const sendMessageToGigachat = async (message) => {
  const accessToken = await getAccessToken();

  try {
    const response = await axios.post(
      "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", 
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const botResponse = response.data.choices[0].message.content;
    return botResponse;
  } catch (error) {
    console.error("Ошибка при отправке сообщения в GigaChat:", error);
    throw error;
  }
};
