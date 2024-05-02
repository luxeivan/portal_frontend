import React, { useEffect, useState } from "react";
import { Typography, Card, Flex, Modal, Button, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SceletonCard from "../../../components/SceletonCard";
import AppHelmet from "../../../components/Global/AppHelmet";
import person from "../../../img/subjects/person3.svg";
import organization from "../../../img/subjects/organization.svg";
import useObjects from "../../../stores/Cabinet/useObject";
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
  // Модалка добавления физ лица
  const showModalAdd = useObjects((state) => state.showModalAdd);
  const setShowModalAdd = useObjects((state) => state.setShowModalAdd);

  // Модалка просмотра физ лица
  const showModalView = useObjects((state) => state.showModalView);
  const showObject = useObjects((state) => state.showObject);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const object = useObjects((state) => state.object);
  const objects = useObjects((state) => state.objects);
  const isLoadingObjects = useObjects((state) => state.isLoadingObjects);
  const fetchObjects = useObjects((state) => state.fetchObjects);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      fetchObjects();
    }
  }, [fetchObjects]);

  if (isLoadingObjects) {
    return (
      <>
        <Title level={1}>Объекты</Title>
        <SceletonCard />
      </>
    );
  }

  const handleCategorySelect = (type) => {
    setShowCategoryModal(false);
    setSelectedType(type); // Сохраняем выбранный тип
    if (type === "object") {
      setShowModalAdd(true);
    }
  };

  return (
    <div>
      {/* <AppHelmet title={"Объекты"} desc={"Объекты подключения"} />
      <Title level={1}>Объекты подключения</Title>

      <Skeleton active avatar paragraph={{ rows: 2 }} />
      <Skeleton active avatar paragraph={{ rows: 2 }} />
      <Skeleton active avatar paragraph={{ rows: 2 }} /> */}
    </div>
  );
}
