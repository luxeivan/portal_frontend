import React, { useState } from "react";
import {
  Collapse,
  Button,
  Card,
  Alert,
  FloatButton,
  Image,
  Typography,
  Input,
} from "antd";
import { createFromIconfontCN } from "@ant-design/icons";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useContacts } from "../../stores/useContacts";
import styles from "./Contacts.module.css";
import Preloader from "../../components/Main/Preloader";
import Rekvizity from "../../components/Rekvizity/Rekvizity";

const { Text, Title } = Typography;
const { Search } = Input;


const Contacts = () => {
  const { contactCenters, loading } = useContacts();
  const [searchTerm, setSearchTerm] = useState("");

  // Фильтрация по названию
  const filteredCenters = contactCenters.filter((center) =>
    center.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Функция для создания ссылки на маршрут
  const createRouteLink = (coords) => {
    const [lat, lon] = coords;
    return `https://yandex.ru/maps/?rtext=~${lat},${lon}&rtt=auto`;
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Preloader />
      </div>
    );
  }

  if (!contactCenters || contactCenters.length === 0) {
    return <div>Нет данных для отображения</div>;
  }

  return (
    <div className={styles.container}>

      <Rekvizity />

      {/* <IconFont type="green-energy" /> */}
      <Title level={2}>Контакты Центров обслуживания клиентов</Title>
      
      <p>
        Центры обслуживания клиентов предоставляют услуги по технологическому
        присоединению и иным видам деятельности (подача заявок, обращений,
        выдача документов и пр.). С перечнем услуг вы можете ознакомиться в{" "}
        <a href="/services">Каталоге услуг</a>.
      </p>

      {/* Добавляем строку поиска */}
      <Search
        placeholder="Введите название центра или города"
        onChange={(e) => setSearchTerm(e.target.value)}
        enterButton
        style={{ marginBottom: "20px" }}
      />

      <Collapse
        items={filteredCenters.map((center) => ({
          key: center.id,
          label: center.name,
          children: (
            <Card bordered={false} className={styles.card}>
              <div style={{ marginBottom: "10px" }}>
                <EnvironmentOutlined /> <strong>Адрес:</strong>{" "}
                {center.address || "Информация отсутствует"}
              </div>

              {center.coordinates && (
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
              )}

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
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                    >
                      {center.images.map((item, index) => (
                        <div className={styles.cardContainer} key={index}>
                          <Image
                            src={item.src}
                            alt={`Фото ${index + 1}`}
                            height={200}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                "Фото отсутствует"
              )}
            </Card>
          ),
        }))}
      />

      <FloatButton />
    </div>
  );
};

export default Contacts;
