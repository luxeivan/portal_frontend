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
      <AppHelmet title={"Объекты"} desc={"Объекты подключения"} />
      <Title level={1}>Объекты подключения</Title>

      
      <Flex wrap="wrap" gap="large">
        {objects.map((object) => (
          <Card
            hoverable
            key={object.id}
            styles={stylesForCard}
            className={styles.objectCard}
            onClick={() => {
              showObject(object.id);
              // await fetchSubjectItem(subject.id);
              //setShowModalView(true);
            }}
          >
            <Typography.Title level={5} className={styles.objectCardTitle}>
              {object?.attributes.name}
            </Typography.Title>
            <Meta description={object?.attributes.type} />
            <Flex justify="flex-end" className={styles.objectCardImage}>
              <Image
                width={"50%"}
                src={
                  object?.attributes.type === "Объект"
                    ? person
                    : organization
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
      {objects.length === 0 && <p>Объекты не найдены</p>}

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

    </div>
  );
}
