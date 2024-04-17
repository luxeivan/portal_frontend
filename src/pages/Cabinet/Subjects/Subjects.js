import React, { useEffect, useState } from "react";
import { Typography, Card, Flex, Modal, Button } from "antd";
import useSubjects from "../../../stores/Cabinet/useSubjects";
import styles from "./Subjects.module.css";
import { PlusOutlined } from "@ant-design/icons";
import SceletonCard from "../../../components/SceletonCard";
import ModalFizLica from "../../../components/Subjects/ModalFizLica/ModalFizLica";
import AppHelmet from "../../../components/Global/AppHelmet";
import ModalUrLica from "../../../components/Subjects/ModalUrLica/ModalUrLica";

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

export default function Subjects() {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [showModalUrAdd, setShowModalUrAdd] = useState(false);
  const [showModalUrView, setShowModalUrView] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const subject = useSubjects((state) => state.subject);
  const subjects = useSubjects((state) => state.subjects);
  const isLoadingSubjects = useSubjects((state) => state.isLoadingSubjects);
  const error = useSubjects((state) => state.error);
  const fetchSubjects = useSubjects((state) => state.fetchSubjects);
  const fetchSubjectItem = useSubjects((state) => state.fetchSubjectItem);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      fetchSubjects();
    }
  }, [fetchSubjects]);

  if (isLoadingSubjects) {
    return (
      <>
        <Title level={1}>Субъекты</Title>
        <SceletonCard />
      </>
    );
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  const handleCancelModalAdd = () => {
    setShowModalAdd(false);
  };

  const handleCancelModalUrAdd = () => {
    setShowModalUrAdd(false);
  };

  const handleOkModalAdd = () => {
    setShowModalAdd(false);
  };

  const handleOkModalUrAdd = () => {
    setShowModalUrAdd(false);
  };

  const handleCancelModalView = () => {
    setShowModalView(false);
  };

  const handleOkModalView = () => {
    setShowModalView(false);
  };

  const handleAddClick = () => {
    setShowCategoryModal(true);
  };

  const handleCategorySelect = (type) => {
    setShowCategoryModal(false);
    setSelectedType(type); // Сохраняем выбранный тип
    if (type === "individual") {
      setShowModalAdd(true);
    } else if (type === "legalEntity") {
      setShowModalUrAdd(true);
      // Для других типов (ИП, Юр.Лицо) может быть своя логика
    }
  };

  const handleClose = () => {
    // Здесь меняем состояние, которое контролирует отображение модального окна
    setShowModalAdd(false); // предполагаемое имя состояния для модального окна
  };

  return (
    <div>
      <AppHelmet title={"Субъекты"} desc={"Субъекты"} />
      <Title level={1}>Субъекты</Title>

      <Flex wrap="wrap" gap="large">
        {subjects.map((subject) => (
          <Card
            hoverable
            key={subject.id}
            styles={stylesForCard}
            className={styles.subjectCard}
            onClick={() => {
              // console.log(subject.id)
              fetchSubjectItem(subject.id);
              setShowModalView(true);
            }}
          >
            <Typography.Text>{subject?.attributes.name}</Typography.Text>
            <Meta description={subject?.attributes.type} />
          </Card>
        ))}
        <Card
          hoverable
          styles={stylesForCard}
          className={styles.subjectCard}
          onClick={handleAddClick}
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
      {subjects.length === 0 && <p>Субъекты не найдены</p>}

      <Modal
        title="Выберите тип субъекта"
        open={showCategoryModal}
        onCancel={() => setShowCategoryModal(false)}
        footer={null}
        width={700}
        name="type"
      >
        <Flex gap="large" wrap="wrap" justify="center">
          <Button
            className={styles.buttontypenewsubject}
            onClick={() => handleCategorySelect("individual")}
          >
            Физическое
            <br /> лицо
          </Button>
          <Button
            className={styles.buttontypenewsubject}
            onClick={() => handleCategorySelect("legalEntity")}
          >
            Юридическое
            <br /> лицо
          </Button>
          <Button
            className={styles.buttontypenewsubject}
            onClick={() => handleCategorySelect("soleProprietor")}
          >
            Индивидуальный
            <br /> предприниматель
          </Button>
        </Flex>
      </Modal>

      {/* Модалка для добавления физ.лица */}
      <Modal
        title="Добавление физического лица"
        open={showModalAdd}
        onCancel={handleCancelModalAdd}
        width={650}
        footer={null}
      >
        <ModalFizLica
          onSubmit={handleOkModalAdd}
          setShowModal={setShowModalAdd}
          type={selectedType}
        />
      </Modal>
      {/* Модалка для просмотра физ.лица */}
      <Modal
        title="Просмотр физического лица"
        open={showModalView}
        onCancel={handleCancelModalView}
        width={650}
        footer={null}
      >
        <ModalFizLica
          read
          value={{
            ...subject,
          }}
          onSubmit={handleOkModalAdd}
          setShowModal={setShowModalView}
          type={selectedType}
        />
      </Modal>

      {/* Модалка для добавления юр.лица */}
      <Modal
        title="Добавление юридического лица"
        open={showModalUrAdd}
        onCancel={handleCancelModalUrAdd}
        width={650}
        footer={null}
      >
        <ModalUrLica
          onSubmit={handleOkModalUrAdd}
          setShowModal={setShowModalUrAdd}
          type={selectedType}
        />
      </Modal>
    </div>
  );
}
