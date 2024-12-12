import React, { useState, useEffect } from "react";
import axios from "axios";
import { Collapse, Button, Typography, Row, Col, Image } from "antd";

import ModalBot from "../../components/Global/ModalBot";
import MarkDownText from "../../components/MarkDownText/MarkDownText";
import AppHelmet from "../../components/Global/AppHelmet";



import useGlobal from "../../stores/useGlobal";

import QuickAnswers from "../../components/Answers/QuickAnswers";

const { Title } = Typography;

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

export default function Answers() {
  

  return (
    <div style={{ padding: "20px", maxWidth: "1600px", margin: "0 auto" }}>
      <AppHelmet title={"Вопрос - Ответ"} desc={"Часто задаваемые вопросы"} />
      <Title level={2} style={{ marginBottom: "16px" }}>
      Вопрос - Ответ
      </Title>
      <QuickAnswers />

    </div>
  );
}
