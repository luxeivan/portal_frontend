import React, { useEffect, useState } from "react";
import { Typography, Card, Flex, Modal, Button } from "antd";
import useSubjects from "../../../stores/Cabinet/useSubjects";
import styles from "./Subjects.module.css";
import { PlusOutlined } from "@ant-design/icons";
import SceletonCard from "../../../components/SceletonCard";
import ModalFizLica from "./ModalFizLica";
import AppHelmet from '../../../components/Global/AppHelmet'

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

  const handleOkModalAdd = () => {
    setShowModalAdd(false);
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
    } else {
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
            <Typography.Text>{subject.attributes.name}</Typography.Text>
            <Meta description={subject.attributes.type} />
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
          <Button className={styles.buttontypenewsubject} onClick={() => handleCategorySelect("individual")}>
            Физическое<br /> лицо
          </Button>
          <Button className={styles.buttontypenewsubject} onClick={() => handleCategorySelect("legalEntity")}>
            Юридическое<br /> лицо
          </Button>
          <Button className={styles.buttontypenewsubject} onClick={() => handleCategorySelect("soleProprietor")}>
            Индивидуальный<br /> предприниматель
          </Button>
        </Flex>
      </Modal>

      <Modal
        title="Добавление физического лица"
        open={showModalAdd}
        onCancel={handleCancelModalAdd}
        width={650}
        footer={null}
      >
        <ModalFizLica
          onSubmit={handleOkModalAdd}
          setShowModalAdd={setShowModalAdd}
          type={selectedType}
        />
      </Modal>
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
           ...subject?.attributes.counterparty[0]
          }}
          onSubmit={handleOkModalAdd}
          setShowModalAdd={setShowModalAdd}
          type={selectedType}
        />
      </Modal>

      {/* ------------------------------------------------- */}

      {/* <Modal
        title={subject && subject.attributes.name}
        open={showModalView}
        onOk={handleOkModalView}
        onCancel={handleCancelModalView}
      >
        <Typography.Paragraph>
          {subject && subject.attributes.type}
        </Typography.Paragraph>
        <Typography.Paragraph>
          Паспорт:{" "}
          {subject && subject.attributes.counterparty[0].serialPassport}{" "}
          {subject && subject.attributes.counterparty[0].numberPassport}
        </Typography.Paragraph>
      </Modal> */}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { Typography, Card, Flex, Modal, Button } from "antd";

// import useSubjects from "../../../stores/Cabinet/useSubjects";

// import styles from "./Subjects.module.css";

// import { PlusOutlined } from "@ant-design/icons";

// import SceletonCard from "../../../components/SceletonCard";

// import ModalFizLica from "./ModalFizLica";

// const { Title } = Typography;
// const { Meta } = Card;

// const stylesForCard = {
//   body: {
//     height: "100%",
//     width: 250,
//     minHeight: 250,
//   },
//   actions: { marginTop: "-20px" },
//   header: { backgroundColor: "red" },
// };

// export default function Subjects() {
//   const [showModalAdd, setShowModalAdd] = useState(false);
//   const [showModalView, setShowModalView] = useState(false);
//   const [showCategoryModal, setShowCategoryModal] = useState(false);
//   const [selectedType, setSelectedType] = useState(null);

//   const subject = useSubjects((state) => state.subject);
//   const subjects = useSubjects((state) => state.subjects);
//   const isLoadingSubjects = useSubjects((state) => state.isLoadingSubjects);
//   const error = useSubjects((state) => state.error);
//   const fetchSubjects = useSubjects((state) => state.fetchSubjects);
//   const fetchSubjectItem = useSubjects((state) => state.fetchSubjectItem);

//   useEffect(() => {
//     const jwt = localStorage.getItem("jwt");
//     if (jwt) {
//       fetchSubjects();
//     }
//   }, [fetchSubjects]);

//   if (isLoadingSubjects) {
//     return (
//       <>
//         <Title level={1}>Субъекты</Title>
//         <SceletonCard />
//       </>
//     );
//   }

//   if (error) {
//     return <p>Ошибка: {error}</p>;
//   }

//   const handleCancelModalAdd = () => {
//     setShowModalAdd(false);
//   };

//   const handleOkModalAdd = () => {
//     setShowModalAdd(false);
//   };

//   const handleCancelModalView = () => {
//     setShowModalView(false);
//   };

//   const handleOkModalView = () => {
//     setShowModalView(false);
//   };

//   const handleAddClick = () => {
//     setShowCategoryModal(true);
//   };

//   const handleCategorySelect = (category) => {
//     setShowCategoryModal(false);
//     if (category === "individual") {
//       setShowModalAdd(true);
//     } else {
//       // Здесь будет логика для ИП или Юр.Лицо, мы её обязательно добавим. Когда-нибудь... Когда-нибудь...
//     }
//   };

//   return (
//     <div>
//       <Title level={1}>Субъекты</Title>

//       <Flex wrap="wrap" gap="large">
//         {subjects.map((subject) => (
//           <Card
//             hoverable
//             key={subject.id}
//             styles={stylesForCard}
//             className={styles.subjectCard}
//             onClick={() => {
//               // console.log(subject.id)
//               fetchSubjectItem(subject.id);
//               setShowModalView(true);
//             }}
//           >
//             <Typography.Text>{subject.attributes.name}</Typography.Text>
//             <Meta description={subject.attributes.type} />
//           </Card>
//         ))}
//         <Card
//           hoverable
//           styles={stylesForCard}
//           className={styles.subjectCard}
//           onClick={handleAddClick}
//         >
//           <Flex
//             align="stretch"
//             justify="center"
//             style={{ minHeight: "100%", width: "100%" }}
//           >
//             <PlusOutlined />
//           </Flex>
//         </Card>
//       </Flex>
//       {subjects.length === 0 && <p>Субъекты не найдены</p>}

//       <Modal
//         title=""
//         visible={showCategoryModal}
//         onCancel={() => setShowCategoryModal(false)}
//         footer={null}
//         width={650}
//         name="type"
//       >
//         <Flex gap="large">
//           <Button onClick={() => handleCategorySelect("individual")}>
//             Физическое лицо
//           </Button>
//           <Button onClick={() => handleCategorySelect("soleProprietor")}>
//             ИП
//           </Button>
//           <Button onClick={() => handleCategorySelect("legalEntity")}>
//             Юр.Лицо
//           </Button>
//         </Flex>
//       </Modal>

//       {/* Модалка для Физ.Лиц */}
//       <Modal
//         title="Добавить физическое лицо"
//         visible={showModalAdd}
//         onOk={handleOkModalAdd}
//         onCancel={handleCancelModalAdd}
//         width={650}
//       >
//         <ModalFizLica />
//       </Modal>

//       {/* ------------------------------------------------- */}

//       <Modal
//         title={subject && subject.attributes.name}
//         open={showModalView}
//         onOk={handleOkModalView}
//         onCancel={handleCancelModalView}
//       >
//         <Typography.Paragraph>
//           {subject && subject.attributes.type}
//         </Typography.Paragraph>
//         <Typography.Paragraph>
//           Паспорт:{" "}
//           {subject && subject.attributes.counterparty[0].serialPassport}{" "}
//           {subject && subject.attributes.counterparty[0].numberPassport}
//         </Typography.Paragraph>
//       </Modal>
//     </div>
//   );
// }
