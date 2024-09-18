import React from "react";
import { Collapse, Spin, Button, Skeleton, BackTop, Card, Alert, Flex, Image, Typography } from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { ColumnsPhotoAlbum, RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/styles.css";
import { useContacts } from "../../stores/useContacts";
import styles from "./Contacts.module.css";
import Preloader from "../../components/Main/Preloader";
const Text = Typography.Text

const Contacts = () => {
  // Используем наш кастомный хук
  const { contactCenters, loading } = useContacts();

  // Функция для создания ссылки на маршрут
  const createRouteLink = (coords) => {
    const [lat, lon] = coords;
    return `https://yandex.ru/maps/?rtext=~${lat},${lon}&rtt=auto`;
  };

  if (loading) {
    // Пока всё грузится, показываем спиннер
    return <Flex justify="center"><Preloader /></Flex>;
  }

  if (!contactCenters || contactCenters.length === 0) {
    // Если данных нет, сообщаем об этом
    return <div>Нет данных для отображения</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Контакты Центров обслуживания клиентов</h1>
      <p>
        Центры обслуживания клиентов предоставляют услуги по технологическому
        присоединению и иным видам деятельности (подача заявок, обращений,
        выдача документов и пр.). С перечнем услуг вы можете ознакомиться в{" "}
        <a href="/services">Каталоге услуг</a>.
      </p>

      <Collapse defaultActiveKey={[]} style={{ marginBottom: 24 }}>
        {contactCenters.map((center, index) => (
          // Используем Collapse.Panel для каждого центра
          <Collapse.Panel header={center.name} key={index}>
            {/* Карточка с информацией о центре */}
            <Card bordered={false} className={styles.card}>
              <div style={{ marginBottom: "10px" }}>
                <EnvironmentOutlined /> <strong>Адрес:</strong>{" "}
                {center.address || "Информация отсутствует"}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <PhoneOutlined /> <strong>Телефон:</strong>{" "}
                {center.telephone ? (
                  <a href={`tel:${center.telephone}`}>{center.telephone}</a>
                ) : (
                  "Информация отсутствует"
                )}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <ClockCircleOutlined /> <strong>Время работы:</strong>{" "}
                {center.workingTime || "Информация отсутствует"}
              </div>



              {center.coordinates ? (
                <>
                  {/* Кнопка для построения маршрута */}
                  <div style={{ marginBottom: "10px" }}>
                    <Button
                      type="primary"
                      href={createRouteLink(center.coordinates)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Построить маршрут
                    </Button>
                  </div>
                  {/* Карта с меткой центра */}
                  <YMaps>
                    <Map
                      defaultState={{
                        center: center.coordinates,
                        zoom: 15,
                      }}
                      width="100%"
                      height="200px"
                    >
                      <Placemark geometry={center.coordinates} />
                    </Map>
                  </YMaps>
                </>
              ) : (
                // Если координат нет, выводим сообщение
                <Alert
                  message="Информация о координатах отсутствует"
                  description="Пока тут нет широты и долготы, чтобы построить маршрут и отрисовать карту. Они скоро появятся и всё красиво заработает!"
                  type="info"
                  showIcon
                />
              )}

              {center.images && center.images.length > 0 ? (
                <div style={{ margin: "20px 0" }}>
                  <Text strong>Описание маршрута:</Text>
                  <div style={{ width: "100%", overflow: "hidden" }}>
                    <Flex align="center" gap={10} wrap="wrap" >

                      {center.images.map((item, index) => <div className={styles.cardContainer}><Image key={index} src={item.src} /></div>)}

                    </Flex>


                  </div>
                </div>
              ) : (
                "Фото отсутствует"
              )}

            </Card>
          </Collapse.Panel>
        ))}
      </Collapse>
      {/* Кнопка для быстрого возврата наверх */}
      <BackTop />
    </div>
  );
};

export default Contacts;

// import React from "react";
// import { Collapse, Spin, Button, Skeleton, BackTop, Card } from "antd";
// import {
//   EnvironmentOutlined,
//   PhoneOutlined,
//   ClockCircleOutlined,
// } from "@ant-design/icons";
// import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
// import { ColumnsPhotoAlbum } from "react-photo-album";
// import "react-photo-album/styles.css";
// import { useContacts } from "../../stores/useContacts";
// import styles from "./Contacts.module.css";
// const Contacts = () => {
//   // Используем наш кастомный хук
//   const { contactCenters, loading } = useContacts();

//   // Функция для создания ссылки на маршрут
//   const createRouteLink = (coords) => {
//     const [lat, lon] = coords;
//     return `https://yandex.ru/maps/?rtext=~${lat},${lon}&rtt=auto`;
//   };

//   if (loading) {
//     // Пока всё грузится, показываем спиннер
//     return <Spin size="large" />;
//   }

//   if (!contactCenters || contactCenters.length === 0) {
//     // Если данных нет, сообщаем об этом
//     return <div>Нет данных для отображения</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <h1>Контакты Центров обслуживания клиентов</h1>
//       <p>
//         Центры обслуживания клиентов предоставляют услуги по технологическому
//         присоединению и иным видам деятельности (подача заявок, обращений,
//         выдача документов и пр.). С перечнем услуг вы можете ознакомиться в{" "}
//         <a href="/services">Каталоге услуг</a>.
//       </p>

//       <Collapse defaultActiveKey={[]} style={{ marginBottom: 24 }}>
//         {contactCenters.map((center, index) => (
//           // Используем Collapse.Panel для каждого центра
//           <Collapse.Panel header={center.name} key={index}>
//             {/* Карточка с информацией о центре */}
//             <Card bordered={false} className={styles.card}>
//               <div style={{ marginBottom: "10px" }}>
//                 <EnvironmentOutlined /> <strong>Адрес:</strong>{" "}
//                 {center.address || "Информация отсутствует"}
//               </div>
//               <div style={{ marginBottom: "10px" }}>
//                 <PhoneOutlined /> <strong>Телефон:</strong>{" "}
//                 {center.telephone ? (
//                   <a href={`tel:${center.telephone}`}>{center.telephone}</a>
//                 ) : (
//                   "Информация отсутствует"
//                 )}
//               </div>
//               <div style={{ marginBottom: "10px" }}>
//                 <ClockCircleOutlined /> <strong>Время работы:</strong>{" "}
//                 {center.workingTime || "Информация отсутствует"}
//               </div>

//               {center.images && center.images.length > 0 ? (
//                 <div style={{ marginBottom: "10px" }}>
//                   <strong>Описание маршрута:</strong>
//                   <div style={{ width: "100%", overflow: "hidden" }}>
//                     {/* Если всё ещё грузится, показываем скелетон */}
//                     {loading ? (
//                       <Skeleton.Image active />
//                     ) : (
//                       // Иначе показываем галерею фоток
//                       <ColumnsPhotoAlbum
//                         photos={center.images}
//                         columns={(containerWidth) => {
//                           if (containerWidth < 600) return 1;
//                           if (containerWidth < 900) return 2;
//                           if (containerWidth < 1200) return 3;
//                           return 4;
//                         }}
//                         spacing={10}
//                       />
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 "Фото отсутствует"
//               )}

//               <div style={{ marginBottom: "10px" }}>
//                 {center.coordinates ? (
//                   // Кнопка для построения маршрута
//                   <Button
//                     type="primary"
//                     href={createRouteLink(center.coordinates)}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Построить маршрут
//                   </Button>
//                 ) : (
//                   "Информация о маршруте отсутствует"
//                 )}
//               </div>
//               {center.coordinates ? (
//                 // Карта с меткой центра
//                 <YMaps>
//                   <Map
//                     defaultState={{ center: center.coordinates, zoom: 15 }}
//                     width="100%"
//                     height="200px"
//                   >
//                     <Placemark geometry={center.coordinates} />
//                   </Map>
//                 </YMaps>
//               ) : (
//                 <Spin
//                   size="small"
//                   style={{ display: "block", margin: "0 auto" }}
//                 />
//               )}
//             </Card>
//           </Collapse.Panel>
//         ))}
//       </Collapse>
//       {/* Кнопка для быстрого возврата наверх */}
//       <BackTop />
//     </div>
//   );
// };

// export default Contacts;
