import React, { useEffect, useState } from "react";
import { Typography, Card, Flex, Modal, Button, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SceletonCard from "../../../components/SceletonCard";
import AppHelmet from "../../../components/Global/AppHelmet";
import person from "../../../img/subjects/person3.svg";
import organization from "../../../img/subjects/organization.svg";
import useSubjects from "../../../stores/Cabinet/useObject";
import styles from "./Objects.module.css";

// import ModalFizLica from "../../../components/Subjects/ModalFizLica/ModalFizLica";
// import ModalUrLica from "../../../components/Subjects/ModalUrLica/ModalUrLica";
// import ModalIP from "../../../components/Subjects/ModalIP/ModalIP";

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

export default function Objects() {
  return (
    <div>
      {/* <AppHelmet title={"Объекты"} desc={"Объекты подключения"} />
      <Title level={1}>Объекты подключения</Title>

      <Skeleton active avatar paragraph={{ rows: 2 }} />
      <Skeleton active avatar paragraph={{ rows: 2 }} />
      <Skeleton active avatar paragraph={{ rows: 2 }} /> */}
    </div>
  )
}
