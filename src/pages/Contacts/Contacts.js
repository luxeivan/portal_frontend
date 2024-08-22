import React, { useEffect, useState } from "react";
import { Collapse, Spin } from "antd";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import contactCentersData from "./contactCenters.json";
import axios from "axios";

const Contacts = () => {
  const [contactCenters, setContactCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    setContactCenters(contactCentersData);

    // При наличии API заменить этот код на загрузку данных с сервера
    /*
    const fetchData = async () => {
      try {
        const response = await axios.get('URL_API'); 
        setContactCenters(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных из API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    */
  }, []);

  const getCoordinates = async (address, index) => {
    try {
      const response = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=fd781d3b-b40d-4f6a-a236-865c242547cb&format=json&geocode=${encodeURIComponent(
          address
        )}`
      );
      const point =
        response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
          " "
        );
      const coords = [parseFloat(point[1]), parseFloat(point[0])];
      setCoordinates((prevState) => ({ ...prevState, [index]: coords }));
    } catch (error) {
      console.error("Ошибка при получении координат:", error);
    }
  };

  useEffect(() => {
    contactCenters.forEach((center, index) => {
      if (center.address) {
        getCoordinates(center.address, index);
      }
    });
    setLoading(false);
  }, [contactCenters]);

  const createRouteLink = (coords) => {
    const [lat, lon] = coords;
    return `https://yandex.ru/maps/?rtext=~${lat},${lon}&rtt=auto`;
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <h1>Контакты Центров обслуживания клиентов</h1>
      <p>
        Центры обслуживания клиентов предоставляют услуги по технологическому
        присоединению и иным видам деятельности (подача заявок, обращений,
        выдача документов и пр.). С перечнем услуг вы можете ознакомиться в{" "}
        <a href="/services">Каталоге услуг</a>.
      </p>

      <Collapse defaultActiveKey={[]} style={{ marginBottom: 24 }}>
        {contactCenters.map((center, index) => (
          <Collapse.Panel header={center.name} key={index}>
            <div style={{ marginBottom: "10px" }}>
              <strong>Адрес:</strong>{" "}
              {center.address || "Информация отсутствует"}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Телефон:</strong>{" "}
              {center.phone || "Информация отсутствует"}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Время работы:</strong>{" "}
              {center.workHours || "Информация отсутствует"}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Построить маршрут:</strong>{" "}
              {coordinates[index] ? (
                <a
                  href={createRouteLink(coordinates[index])}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ссылка
                </a>
              ) : (
                "Информация отсутствует"
              )}
            </div>
            {coordinates[index] ? (
              <YMaps>
                <Map
                  defaultState={{ center: coordinates[index], zoom: 15 }}
                  width="100%"
                  height="200px"
                >
                  <Placemark geometry={coordinates[index]} />
                </Map>
              </YMaps>
            ) : (
              <Spin
                size="small"
                style={{ display: "block", margin: "0 auto" }}
              />
            )}
          </Collapse.Panel>
        ))}
      </Collapse>
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
