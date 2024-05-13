import React, { useEffect, useState } from "react";
import { Typography, Card, Flex, Modal, Button, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SceletonCard from "../../../components/SceletonCard";
import AppHelmet from "../../../components/Global/AppHelmet";
import person from "../../../img/subjects/person3.svg";
import organization from "../../../img/object/object2 (фон удален).png";
import useObjects from "../../../stores/Cabinet/useObject";
import styles from "./Objects.module.css";
import ModalObject from "../../../components/Objects/ModalObject";

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
  // Модалка добавления
  const showModalAdd = useObjects((state) => state.showModalAdd);
  const setShowModalAdd = useObjects((state) => state.setShowModalAdd);

  // Модалка просмотра
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

  const handleCategorySelect = (type) => {
    setShowCategoryModal(false);
    setSelectedType(type); // Сохраняем выбранный тип
    if (type === "object") {
      setShowModalAdd(true);
    }
  };

  return (
    <div>
      <AppHelmet title={"Объекты"} desc={"Объекты подключения"} />
      <Title level={1}>Объекты присоединения</Title>
      {isLoadingObjects && <SceletonCard />}

      <Flex wrap="wrap" gap="large">
        {objects.map((object) => (
          <Card
            hoverable
            key={object.id}
            styles={stylesForCard}
            className={styles.objectCard}
            onClick={() => {
              showObject(object.id);
            }}
          >
            <Typography.Title level={5} className={styles.objectCardTitle}>
              {object?.attributes.fullName}
            </Typography.Title>
            <Meta description={object?.attributes.type} />
            <Flex justify="flex-end" className={styles.objectCardImage}>
              <Image
                width={"50%"}
                src={
                  object?.attributes.type === "Объект" ? person : organization
                }
                preview={false}
              />
            </Flex>
          </Card>
        ))}
        <Card
          hoverable
          styles={stylesForCard}
          className={styles.objectCard}
          onClick={() => setShowCategoryModal(true)}
        >
          <Flex
            align="stretch"
            justify="center"
            style={{ minHeight: "100%", width: "100%" }}
          >
            <PlusOutlined />
          </Flex>
        </Card>
      </Flex>
      {/* {objects.length === 0 && <p>Объекты не найдены</p>} */}

      <Modal
        title="Выберите тип объекта(если есть)"
        open={showCategoryModal}
        onCancel={() => setShowCategoryModal(false)}
        footer={null}
        width={700}
        name="type"
      >
        <Flex gap="large" wrap="wrap" justify="center">
          <Button
            className={styles.buttontypenewobject}
            onClick={() => handleCategorySelect("object")}
          >
            Объект
            <br />
          </Button>
        </Flex>
      </Modal>

      {/* Модалка для добавления объекта */}
      <Modal
        title="Добавление объекта"
        open={showModalAdd}
        onCancel={() => setShowModalAdd(false)}
        width={650}
        footer={null}
      >
        <ModalObject
          onSubmit={() => setShowModalAdd(false)}
          setShowModal={setShowModalAdd}
          type={selectedType}
        />
      </Modal>
    </div>
  );
}
