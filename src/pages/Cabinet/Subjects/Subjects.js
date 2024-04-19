// import React, { useEffect, useState } from "react";
// import { Typography, Card, Flex, Modal, Button, Image } from "antd";
// import useSubjects from "../../../stores/Cabinet/useSubjects";
// import styles from "./Subjects.module.css";
// import { PlusOutlined } from "@ant-design/icons";
// import SceletonCard from "../../../components/SceletonCard";
// import ModalFizLica from "../../../components/Subjects/ModalFizLica/ModalFizLica";
// import AppHelmet from "../../../components/Global/AppHelmet";
// import ModalUrLica from "../../../components/Subjects/ModalUrLica/ModalUrLica";
// import person from '../../../img/subjects/person3.svg'
// import organization from '../../../img/subjects/organization.svg'
// import ModalSubject from "../../../components/Subjects/ModalSubject";

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
//   const modal = useSubjects((state) => ({
//     showModal:state.showModal,
//     setShowModal:state.setShowModal,
//     typeModal:state.typeModal,
//     setTypeModal:state.setTypeModal,
//     methodModal:state.methodModal,
//     setMethodModal:state.setMethodModal,
//   }));
//   const setShowModalAdd = useSubjects((state) => state.setShowModalAdd);
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
//   useEffect(() => {
//     setShowCategoryModal(false)
//     //setShowModal(true)
//   }, [selectedType]);

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
//   const handlerOpenModalSubjectRead = async (subject)=>{
//      console.log(subject.id)
//      await fetchSubjectItem(subject.id);
//      await modal.setMethodModal("read");
//      await modal.setTypeModal(subject.attributes.type);
//      await modal.setShowModal(true);
//   }
//   const handlerOpenModalSubjectAdd = async(type)=>{
//       setShowCategoryModal(false)
//       await modal.setMethodModal("add");
//       await modal.setTypeModal(type);
//       await modal.setShowModal(true)
//   }

//   return (
//     <>
//       <AppHelmet title={"Субъекты"} desc={"Субъекты"} />
//       <Title level={1}>Субъекты</Title>

//       <Flex wrap="wrap" gap="large">
//         {subjects.map((subject) => (
//           <Card
//             hoverable
//             key={subject.id}
//             styles={stylesForCard}
//             className={styles.subjectCard}
//             onClick={()=>handlerOpenModalSubjectRead(subject)}
//           >
//             <Typography.Title level={5} className={styles.subjectCardTitle}>{subject?.attributes.name}</Typography.Title>
//             <Meta description={subject?.attributes.type} />
//             <Flex
//               justify="flex-end"
//               className={styles.subjectCardImage}
//             >
//               <Image
//                 width={"50%"}
//                 src={subject?.attributes.type === "Физическое лицо" ? person : organization}
//                 preview={false}
//               />
//             </Flex>

//           </Card>
//         ))}
//         <Card
//           hoverable
//           styles={stylesForCard}
//           className={styles.subjectCard}
//           onClick={()=>setShowCategoryModal(true)}
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
// {/* --------------------------------------------------------------- */}
//       <Modal
//         title="Выберите тип субъекта"
//         open={showCategoryModal}
//         onCancel={() => setShowCategoryModal(false)}
//         footer={null}
//         width={700}
//         name="type"
//         >
//         <Flex gap="large" wrap="wrap" justify="center">
//           <Button
//             className={styles.buttontypenewsubject}
//             onClick={() => handlerOpenModalSubjectAdd("fiz")}
//             >
//             Физическое
//             <br /> лицо
//           </Button>
//           <Button
//             className={styles.buttontypenewsubject}
//             onClick={() => handlerOpenModalSubjectAdd("yur")}
//             >
//             Юридическое
//             <br /> лицо
//           </Button>
//           <Button
//             className={styles.buttontypenewsubject}
//             onClick={() => handlerOpenModalSubjectAdd("ip")}
//           >
//             Индивидуальный
//             <br /> предприниматель
//           </Button>
//         </Flex>
//       </Modal>
// {/* --------------------------------------------------------------- */}


//       {/* Модалка*/}
//       <Modal
//         title={modal.methodModal==="read"?"Просмотр":"Добавление физического лица"}
//         open={modal.showModal}
//         onCancel={() => modal.setShowModal(false)}
//         width={650}
//         footer={null}
//       >
//         <ModalSubject
//           // onSubmit={() => setShowModal(false)}
//           setShowModal={modal.setShowModal}
//           type={modal.typeModal}
//           read={modal.methodModal==="read"}
//         />
//       </Modal>
//       {/* Модалка для просмотра физ.лица */}
     
//     </ >
//   );
// }

import React, { useEffect, useState } from "react";
import { Typography, Card, Flex, Modal, Button, Image } from "antd";
import useSubjects from "../../../stores/Cabinet/useSubjects";
import styles from "./Subjects.module.css";
import { PlusOutlined } from "@ant-design/icons";
import SceletonCard from "../../../components/SceletonCard";
import ModalFizLica from "../../../components/Subjects/ModalFizLica/ModalFizLica";
import AppHelmet from "../../../components/Global/AppHelmet";
import ModalUrLica from "../../../components/Subjects/ModalUrLica/ModalUrLica";
import person from '../../../img/subjects/person3.svg'
import organization from '../../../img/subjects/organization.svg'

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
  const [showModalUrAdd, setShowModalUrAdd] = useState(false);
  const [showModalUrView, setShowModalUrView] = useState(false);
  const showModalAdd = useSubjects((state) => state.showModalAdd);
  const showModalView = useSubjects((state) => state.showModalView);
  const setShowModalAdd = useSubjects((state) => state.setShowModalAdd);
  const setShowModalView = useSubjects((state) => state.setShowModalView);
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
            onClick={async () => {
              // console.log(subject.id)
              await fetchSubjectItem(subject.id);
              setShowModalView(true);
            }}
          >
            <Typography.Title level={5} className={styles.subjectCardTitle}>{subject?.attributes.name}</Typography.Title>
            <Meta description={subject?.attributes.type} />
            <Flex
              justify="flex-end"
              className={styles.subjectCardImage}
            >
              <Image

                width={"50%"}
                src={subject?.attributes.type === "Физическое лицо" ? person : organization}
                preview={false}
              />
            </Flex>

          </Card>
        ))}
        <Card
          hoverable
          styles={stylesForCard}
          className={styles.subjectCard}
          onClick={()=>setShowCategoryModal(true)}
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
        onCancel={() => setShowModalAdd(false)}
        width={650}
        footer={null}
      >
        <ModalFizLica
          onSubmit={() => setShowModalAdd(false)}
          setShowModal={setShowModalAdd}
          type={selectedType}
        />
      </Modal>
      {/* Модалка для просмотра физ.лица */}
      <Modal
        title="Просмотр физического лица"
        open={showModalView}
        onCancel={() => setShowModalView(false)}
        width={650}
        footer={null}
      >
        <ModalFizLica
          read
          value={{
            ...subject,
          }}
          onSubmit={() => setShowModalAdd(false)}
          setShowModal={setShowModalView}
          type={selectedType}
        />
      </Modal>

      {/* Модалка для добавления юр.лица */}
      <Modal
        title="Добавление юридического лица"
        open={showModalUrAdd}
        onCancel={() => setShowModalUrAdd(false)}
        width={650}
        footer={null}
      >
        <ModalUrLica
          onSubmit={() => setShowModalUrAdd(false)}
          setShowModal={setShowModalUrAdd}
          type={selectedType}
        />
      </Modal>
    </div >
  );
}
