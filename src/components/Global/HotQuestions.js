import React from "react";
import { Button } from "antd";

const HotQuestions = ({ onQuestionClick }) => {
  const questions = [
    {
      text: "Как мне подключить электричество?",
      response:
        "Заявку на технологическое присоединение можно подать сразу на нашем сайте. Для этого зарегистрируйтесь или авторизуйтесь. затем нажмите на кнопку 'Каталог услуг', выберете от кого вы будете подавать заявку. После перейдите на вкладку 'Технологическое присоединение'...",
    },
    {
      text: "У меня отключили свет",
      response:
        "Проверьте, есть ли задолженность по оплате. Если нет, обратитесь в нашу службу поддержки по номеру 8-800-123-45-67.",
    },
  ];

  return (
    <div style={{ marginBottom: "16px" }}>
      {questions.map((q, index) => (
        <Button
          key={index}
          onClick={() => onQuestionClick(q)}
          style={{ marginRight: "8px", marginBottom: "8px" }}
        >
          {q.text}
        </Button>
      ))}
    </div>
  );
};

export default HotQuestions;
