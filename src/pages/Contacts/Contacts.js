import React, { useEffect, useState } from "react";
import { Collapse, Spin, Button } from "antd";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import axios from "axios";

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;
const backPhotoServer = process.env.REACT_APP_BACK_API_SERVER;

const Contacts = () => {
  const [contactCenters, setContactCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({});

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
          console.log("Проверяем contactCenters:", response.data);
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
    if (contactCenters.length > 0) {
      contactCenters.forEach((center, index) => {
        if (center.address) {
          getCoordinates(center.address, index);
        }
      });
    }
  }, [contactCenters]);

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
              {center.telephone || "Информация отсутствует"}
            </div>
            <div style={{ marginBottom: "10px" }}>
              <strong>Время работы:</strong>{" "}
              {center.workingTime || "Информация отсутствует"}
            </div>
            {center.photos && center.photos.ПутьКФайлу ? (
              <div style={{ marginBottom: "10px" }}>
                <strong>Описание маршрута:</strong>{" "}
                <img
                  src={`${backPhotoServer}/public/${center.photos.ПутьКФайлу}`} // Используем ПутьКФайлу с сервера
                  alt={center.name}
                  style={{ width: "100%", maxWidth: "400px" }}
                />
              </div>
            ) : (
              "Фото отсутствует"
            )}
            <div style={{ marginBottom: "10px" }}>
              {coordinates[index] ? (
                <Button
                  type="primary"
                  href={createRouteLink(coordinates[index])}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Построить маршрут
                </Button>
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
