import React, { useEffect, useState } from "react";
import { Collapse, Spin, Button } from "antd";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import axios from "axios";

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;
const backPhotoServer = process.env.REACT_APP_BACK_API_SERVER;

const Contacts = () => {
  const [contactCenters, setContactCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backServer}/api/contacts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          withCredentials: true,
        });
        console.log("Полученные данные с API:", response.data);

        if (Array.isArray(response.data)) {
          setContactCenters(response.data);
        } else {
          console.error("Некорректные данные с бэка");
        }
      } catch (error) {
        console.error("Ошибка при получении данных из API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createRouteLink = (coords) => {
    const [lat, lon] = coords;
    return `https://yandex.ru/maps/?rtext=~${lat},${lon}&rtt=auto`;
  };

  if (loading) {
    return <Spin size="large" />;
  }

  if (!contactCenters || contactCenters.length === 0) {
    return <div>Нет данных для отображения</div>;
  }

  return (
    <div style={{ width: "1000px", margin: "0 auto" }}>
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
              {center.telephone || "Информация отсутствует"}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Время работы:</strong>{" "}
              {center.workingTime || "Информация отсутствует"}
            </div>
            {center.photos && center.photos.length > 0 ? (
              <div style={{ marginBottom: "10px" }}>
                <strong>Описание маршрута:</strong>
                <div>
                  {center.photos.map((photo, photoIndex) => (
                    <img
                      key={photoIndex}
                      src={`${backPhotoServer}/public/${photo.ПутьКФайлу}`}
                      alt={`${center.name} - ${photoIndex + 1}`}
                      style={{
                        width: "100%",
                        maxWidth: "400px",
                        marginBottom: "10px",
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              "Фото отсутствует"
            )}
            <div style={{ marginBottom: "10px" }}>
              {center.coordinates ? (
                <Button
                  type="primary"
                  href={createRouteLink(center.coordinates)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Построить маршрут
                </Button>
              ) : (
                "Информация отсутствует"
              )}
            </div>
            {center.coordinates ? (
              <YMaps>
                <Map
                  defaultState={{ center: center.coordinates, zoom: 15 }}
                  width="100%"
                  height="200px"
                >
                  <Placemark geometry={center.coordinates} />
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
