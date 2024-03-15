import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Flex,
  Modal,
  Button,
} from "antd";

import useSubjects from "../../../stores/Cabinet/useSubjects";

import styles from "./Subjects.module.css";

import { PlusOutlined} from "@ant-design/icons";

import SceletonCard from "../../../components/SceletonCard";

import ModalFizLica from "./ModalFizLica";

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

  const handleCategorySelect = (category) => {
    setShowCategoryModal(false);
    if (category === "individual") {
      setShowModalAdd(true);
    } else {
      // Здесь будет логика для ИП или Юр.Лицо, мы её обязательно добавим. Когда-нибудь... Когда-нибудь...
    }
  };

  return (
    <div>
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
        title=""
        visible={showCategoryModal}
        onCancel={() => setShowCategoryModal(false)}
        footer={null}
        width={650}
      >
        <Flex gap="large">
          <Button onClick={() => handleCategorySelect("individual")}>
            Физическое лицо
          </Button>
          <Button onClick={() => handleCategorySelect("soleProprietor")}>
            ИП
          </Button>
          <Button onClick={() => handleCategorySelect("legalEntity")}>
            Юр.Лицо
          </Button>
        </Flex>
      </Modal>

{/* Модалка для Физ.Лиц */}
      <Modal
        title="Добавить физическое лицо"
        visible={showModalAdd}
        onOk={handleOkModalAdd}
        onCancel={handleCancelModalAdd}
        width={650}
      >
        <ModalFizLica />
      </Modal>

      {/* ------------------------------------------------- */}

      <Modal
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
      </Modal>
    </div>
  );
}

//На всякий пожарный рабочая версия
// import React, { useEffect, useState } from "react";
// import {
//   Typography,
//   Card,
//   Flex,
//   Input,
//   Form,
//   Modal,
//   Select,
//   AutoComplete,
//   Checkbox,
//   Button,
//   message,
//   Upload,
//   Space,
//   Divider,
// } from "antd";
// import useSubjects from "../../../stores/Cabinet/useSubjects";
// import useAuth from "../../../stores/useAuth";
// import useRegistration from "../../../stores/useRegistration";

// import styles from "./Subjects.module.css";

// import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

// import SceletonCard from "../../../components/SceletonCard";

// import {
//   formItemLayout,
//   tailFormItemLayout,
// } from "../../../components/configSizeForm";

// const { Title } = Typography;
// const { Meta } = Card;
// const { Option } = Select;

// const stylesForCard = {
//   body: {
//     height: "100%",
//     width: 250,
//     minHeight: 250,
//   },
//   actions: { marginTop: "-20px" },
//   header: { backgroundColor: "red" },
// };

// const props = {
//   name: "file",
//   action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
//   headers: {
//     authorization: "authorization-text",
//   },
//   onChange(info) {
//     if (info.file.status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (info.file.status === "done") {
//       message.success(`${info.file.name} файл загружен успешно`);
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} файл не загрузился, попробуйте ешё раз.`);
//     }
//   },
// };

// export default function Subjects() {
//   const [showModalAdd, setShowModalAdd] = useState(false);
//   const [showModalView, setShowModalView] = useState(false);
//   const [documentType, setDocumentType] = useState("passport");
//   const [autoCompleteData, setAutoCompleteData] = useState([]);
//   const [manualAddressInput, setManualAddressInput] = useState(false);
//   const [showCategoryModal, setShowCategoryModal] = useState(false);

//   const subject = useSubjects((state) => state.subject);
//   const subjects = useSubjects((state) => state.subjects);
//   const isLoadingSubjects = useSubjects((state) => state.isLoadingSubjects);
//   const error = useSubjects((state) => state.error);
//   const fetchSubjects = useSubjects((state) => state.fetchSubjects);
//   const fetchSubjectItem = useSubjects((state) => state.fetchSubjectItem);

//   const authState = useAuth((state) => ({
//     phone: state.phone,
//     email: state.email,
//   }));

//   const registrationState = useRegistration((state) => ({
//     phone: state.phone,
//     email: state.email,
//   }));

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

//   const onDocumentTypeChange = (value) => {
//     setDocumentType(value);
//   };

//   const handleAddressSearch = (searchText) => {
//     // API-вызов для получения предложений адресов
//     const addressSuggestions = getAddressSuggestions(searchText);
//     setAutoCompleteData(addressSuggestions);
//   };

//   const handleManualAddressCheckbox = (e) => {
//     setManualAddressInput(e.target.checked);
//   };

//   const getAddressSuggestions = (searchText) => {
//     // Здесь должен быть API-запрос или временная заглушка для предложений адресов.
//     // Возвращаем простой пример данных для демонстрации:
//     return searchText ? [{ value: "Адрес 1" }, { value: "Адрес 2" }] : [];
//   };

//   const handlePhoneChange = (e) => {
//     console.log("Новый номер телефона:", e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     console.log("Новый email:", e.target.value);
//   };

//   const userPhone = authState.phone || registrationState.phone;
//   const userEmail = authState.email || registrationState.email;

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

//       <Modal
//         title="Добавить физическое лицо"
//         visible={showModalAdd}
//         onOk={handleOkModalAdd}
//         onCancel={handleCancelModalAdd}
//         width={650}
//       >
//         <Form {...formItemLayout}>
//         <Divider orientation="center">ФИО</Divider>

//           <Form.Item label="Фамилия">
//             <Input />
//           </Form.Item>
//           <Form.Item label="Имя">
//             <Input />
//           </Form.Item>
//           <Form.Item label="Отчество">
//             <Input />
//           </Form.Item>
//           <Divider orientation="center">Подтверждающий документ</Divider>

//           <Form.Item label="Тип документа">
//             <Select defaultValue="passport" onChange={onDocumentTypeChange}>
//               <Option value="passport">Паспорт гражданина РФ</Option>
//               <Option value="other">Иной документ</Option>
//             </Select>
//           </Form.Item>
//           {documentType === "passport" && (
//             <>
//               <Flex gap="middle" vertical>
//                 <Form.Item label="Серия паспорта">
//                   <Input maxLength={4} pattern="\d*" />
//                 </Form.Item>
//                 <Form.Item label="Номер паспорта">
//                   <Input maxLength={6} pattern="\d*" />
//                 </Form.Item>
//                 <Form.Item label="Код подразделения">
//                   <Input maxLength={6} pattern="\d*" />
//                 </Form.Item>
//                 <Form.Item label="Кем выдан">
//                   <Input />
//                 </Form.Item>
//               </Flex>
//             </>
//           )}
//           {documentType === "other" && (
//             <>
//               <Form.Item label="Тип документа">
//                 <Select>
//                   <Option value="type1">Тип1</Option>
//                   <Option value="type2">Тип2</Option>
//                 </Select>
//               </Form.Item>
//               <Form.Item label="Реквизиты документа">
//                 <Input />
//               </Form.Item>
//             </>
//           )}
//           <Form.Item label="Загрузить файл">
//             <Upload {...props}>
//               <Button icon={<UploadOutlined />}></Button>
//             </Upload>
//           </Form.Item>
//           <Form.Item label="СНИЛС">
//             <Input />
//           </Form.Item>
//           <Divider orientation="center">Адрес регистрации</Divider>

//           <Form.Item label="Адрес по месту регистрации">
//             {manualAddressInput ? (
//               <Input />
//             ) : (
//               <AutoComplete
//                 options={autoCompleteData}
//                 onSearch={handleAddressSearch}
//                 placeholder="Введите адрес"
//               />
//             )}
//           </Form.Item>
//           <Form.Item>
//             <Checkbox
//               checked={manualAddressInput}
//               onChange={handleManualAddressCheckbox}
//             >
//               Ввести адрес по полям вручную
//             </Checkbox>
//           </Form.Item>
//           <Divider orientation="center">Адрес проживания</Divider>

//           <Form.Item label="Адрес проживания">
//             {manualAddressInput ? (
//               <Input />
//             ) : (
//               <AutoComplete
//                 options={autoCompleteData}
//                 onSearch={handleAddressSearch}
//                 placeholder="Введите адрес"
//               />
//             )}
//           </Form.Item>
//           <Form.Item>
//             <Checkbox
//               checked={manualAddressInput}
//               onChange={handleManualAddressCheckbox}
//             >
//               Ввести адрес по полям вручную
//             </Checkbox>
//           </Form.Item>
//           <Form.Item>
//             <Checkbox>Совпадает с адресом по месту регистрации</Checkbox>
//           </Form.Item>
//           <Divider orientation="center">Другое</Divider>
//           <Form.Item label="Мобильный номер телефона">
//             <Input defaultValue={userPhone} onChange={handlePhoneChange} />
//           </Form.Item>
//           <Form.Item label="Адрес электронной почты">
//             <Input defaultValue={userEmail} onChange={handleEmailChange} />
//           </Form.Item>
//         </Form>
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
