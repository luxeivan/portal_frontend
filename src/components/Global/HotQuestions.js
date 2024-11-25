import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

const HotQuestions = ({ onQuestionClick }) => {
  // questions — это состояние, в котором будут храниться вопросы, полученные с бэкенда.
  // setQuestions — функция для обновления состояния questions.

  const [questions, setQuestions] = useState([]);

  useEffect(
    () => {
      const fetchQuestions = async () => {
        try {
          //Делаем запрос к серваку для получения данных
          const response = await axios.get(`${backServer}/api/hotquestions`);
          // console.log("Проверяем что пришло", response);
          const data = response.data;
          // console.log("Проверяем что пришло", data);
          setQuestions(data);
          // console.log("Проверяем что пришло", setQuestions);
        } catch (error) {
          console.log("Ошибка при получении вопросов/ответов:", error);
        }
      };
      // fetchQuestions(); — это вызов функции fetchQuestions, который запускает процесс получения данных с сервера.
      // Без этого вызова функция просто была бы объявлена, но никогда не выполнялась.
      // Вызов находится внутри useEffect, поэтому выполняется при монтировании компонента.
      fetchQuestions();
    },
    //useEffect выполняется один раз из-за пустого массива зависимостей [].
    []
  );

  return (
    <div style={{ marginBottom: "16px" }}>
      {questions.map((q, index) => (
        <Button
          key={index}
          onClick={() => onQuestionClick(q)}
          style={{ marginRight: "8px", marginBottom: "8px" }}
        >
          {q.question}
        </Button>
      ))}
    </div>
  );
};

export default HotQuestions;
