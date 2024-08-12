import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { Collapse } from "antd";
import GroupInput from "../../components/FormComponentsNew/GroupInput";
import contactCentersData from "./contactCenters.json"; 

const Contacts = () => {
  const [contactCenters, setContactCenters] = useState([]);

  useEffect(() => {
    // Загрузка данных из JSON
    setContactCenters(contactCentersData);
  }, []);

  const [activeKeys, setActiveKeys] = useState([]);

  const handleCollapseChange = (key) => {
    setActiveKeys(key);
  };

  return (
    <div>
      <h1>Контакты Центров обслуживания клиентов</h1>
      <p>
        Центры обслуживания клиентов предоставляют услуги по технологическому
        присоединению и иным видам деятельности (подача заявок, обращений,
        выдача документов и пр.). С перечнем услуг вы можете ознакомиться в{" "}
        <a href="/services">Каталоге услуг</a>.
      </p>

      {contactCenters.map((center, index) => (
        <GroupInput
          key={index}
          name={`center_${index}`}
          label={center.name}
          fields={[
            {
              component_Type: "TextInput",
              idLine: "address",
              label: "Адрес",
              component_Expanded: { initialValue: center.address },
            },
            {
              component_Type: "TextInput",
              idLine: "phone",
              label: "Телефон",
              component_Expanded: { initialValue: center.phone },
            },
            {
              component_Type: "TextInput",
              idLine: "workHours",
              label: "Время работы",
              component_Expanded: { initialValue: center.workHours },
            },
            {
              component_Type: "LinkInput",
              idLine: "mapLink",
              label: "Построить маршрут",
              component_Expanded: { initialValue: center.mapLink },
            },
            // Другие поля могут быть добавлены здесь
          ]}
        />
      ))}

      <YMaps>
        <Map
          defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
          width="100%"
          height="400px"
        >
          {contactCenters.map((center, index) => (
            <Placemark
              key={index}
              geometry={center.coordinates || [55.751574, 37.573856]} // Если нет координат, центр карты
              properties={{
                balloonContent: `<strong>${center.name}</strong><br>${
                  center.address || "Адрес не указан"
                }`,
              }}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};

export default Contacts;

//Вариант первый карточный
// import React from "react";
// import { Link } from "react-router-dom";
// import AppHelmet from "../../components/Global/AppHelmet";
// import { Row, Col, Typography, Card } from "antd";
// import PuzzleGame from "../Games/PuzzleGame";

// const { Title } = Typography;

// const filials = [
//   {
//     id: 1,
//     name: "Домодедовский филиал",
//     departments: [
//       "Дзержинское производственное отделение",
//       "Домодедовское производственное отделение",
//       "Подольское производственное отделение",
//       "Чеховское производственное отделение",
//     ],
//     coordinates: [55.444584, 37.751287],
//     address:
//       "142001, Московская область, г. Домодедово, мкр. Северный, ул. Дачная, д.2",
//   },
//   //  остальные филиалы здесь...
// ];

// export default function Contacts() {
//   return (
//     <>
//       {/* <PuzzleGame/> */}

//       <AppHelmet title={"Контакты"} desc={"Контакты"} />
//       <div>
//         <Title level={1}>Контакты</Title>
//         <Title level={2}>Адреса центров обслуживания клиентов</Title>

//         <Row gutter={[16, 16]}>
//           {filials.map((filial) => (
//             <Col key={filial.id} span={8}>
//               <Link to={`/contacts/${filial.id}`}>
//                 <Card
//                   title={filial.name}
//                   hoverable
//                   style={{
//                     borderRadius: "8px",
//                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                   }}
//                   headStyle={{
//                     backgroundColor: "#f0f2f5",
//                     borderRadius: "8px 8px 0 0",
//                   }}
//                   bodyStyle={{ padding: "16px" }}
//                 >
//                   <ul>
//                     {filial.departments.map((department, index) => (
//                       <li key={index}>{department}</li>
//                     ))}
//                   </ul>
//                 </Card>
//               </Link>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </>
//   );
// }
