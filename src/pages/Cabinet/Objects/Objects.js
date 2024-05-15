import React, { useEffect, useState } from "react";
import { Typography, Card, Flex, Modal, Button, Image, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SceletonCard from "../../../components/SceletonCard";
import AppHelmet from "../../../components/Global/AppHelmet";
import useObjects from "../../../stores/Cabinet/useObject";
import styles from "./Objects.module.css";
import ModalObject from "../../../components/Objects/ModalObject";
import person from "../../../img/subjects/person3.svg";
import organization from "../../../img/object/object2 (фон удален).png";

const { Title } = Typography;
const { Meta } = Card;

const stylesForCard = {
  body: {
    height: "100%",
    width: 250,
    minHeight: 250,
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  actions: { marginTop: "-20px" },
  header: { backgroundColor: "red" },
};

export default function Objects() {
  // Модалка добавления
  const showModalAdd = useObjects((state) => state.showModalAdd);
  const setShowModalAdd = useObjects((state) => state.setShowModalAdd);

  // Модалка просмотра
  const showModalView = useObjects((state) => state.showModalView);
  const showObject = useObjects((state) => state.showObject);

  const object = useObjects((state) => state.object);
  const objects = useObjects((state) => state.objects);
  const isLoadingObjects = useObjects((state) => state.isLoadingObjects);
  const fetchObjects = useObjects((state) => state.fetchObjects);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      fetchObjects();
    }
  }, [fetchObjects]);

  const handleCategorySelect = (type) => {
    setShowCategoryModal(false);
    setSelectedType(type);
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
          <Tooltip title="Нажмите для просмотра объекта" key={object.id}>
            <Card
              hoverable
              key={object.id}
              style={stylesForCard.body}
              className={styles.objectCard}
              onClick={() => showObject(object.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
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
          </Tooltip>
        ))}
        <Card
          hoverable
          style={stylesForCard.body}
          className={styles.objectCard}
          onClick={() => setShowCategoryModal(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
          }}
        >
          <Flex
            align="stretch"
            justify="center"
            style={{ minHeight: "100%", width: "100%" }}
          >
            <PlusOutlined style={{ fontSize: "24px" }} />
          </Flex>
        </Card>
      </Flex>

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

      <Modal
        title="Просмотр объекта"
        open={showModalView}
        onCancel={() => showObject(false)}
        width={650}
        footer={null}
      >
        {object && object.attributes ? (
          <ModalObject
            read
            value={{ ...object.attributes }}
            setShowModal={showObject}
            type={selectedType}
          />
        ) : (
          <Typography.Text>Данные объекта не найдены</Typography.Text>
        )}
      </Modal>

    </div>
  );
}
