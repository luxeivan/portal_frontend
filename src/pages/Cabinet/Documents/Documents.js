import React, { useEffect, useState } from "react";
import { Typography, Card, Flex, Modal, Button, Image } from "antd";
import useRelations from "../../../stores/Cabinet/useRelations";
import styles from "./Relations.module.css";
import { PlusOutlined } from "@ant-design/icons";
import SceletonCard from "../../../components/SceletonCard";
import AppHelmet from "../../../components/Global/AppHelmet";

const { Title } = Typography;
const { Meta } = Card;

const stylesForCard = {
  body: {
    height: "100%",
    width: 250,
    minHeight: 250,
  },
  actions: { marginTop: "-20px" },
  header: { backgroundColor: "red" },
};

console.log("")

export default function Documents() {
  return (
    <div>
      <AppHelmet title={"Документы"} desc={"Документы"} />
      <Title level={1}>Документы</Title>  
    </div>
  )
}
