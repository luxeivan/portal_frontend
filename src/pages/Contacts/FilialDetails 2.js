import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { YMaps, Map, Placemark, ZoomControl } from "@pbe/react-yandex-maps";
import { Typography, Card } from "antd";

const { Title, Paragraph } = Typography;

// Моковые данные для презентации
const mockFilials = [
  {
    id: 1,
    name: "Домодедовский филиал",
    departments: [
      "Дзержинское производственное отделение",
      "Домодедовское производственное отделение",
      "Подольское производственное отделение",
      "Чеховское производственное отделение",
    ],
    coordinates: [55.444584, 37.751287],
    address:
      "142001, Московская область, г. Домодедово, мкр. Северный, ул. Дачная, д.2",
    phone: "+7 (496) 794-30-32",
    director: "Иванов Иван Иванович",
    engineer: "Петров Петр Петрович",
  },
  // Добавьте остальные филиалы здесь...
];

const mapState = {
  center: [55.76, 37.64],
  zoom: 8,
  behaviors: ['disable("scrollZoom")', "drag"],
};

const FilialDetails = () => {
  const { id } = useParams();
  const [filial, setFilial] = useState(
    mockFilials.find((f) => f.id === parseInt(id))
  );

  // Заменить на реальное получение данных из 1С
  /*
  useEffect(() => {
    fetch(`${addressServer}/api/filialies/${id}?populate=proizvodstvennye_otdeleniyas`)
      .then((response) => response.json())
      .then((data) => setFilial(data))
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
        setFilial(null);
      });
  }, [id]);
  */

  return (
    <div>
      <Card title={filial.name} style={{ margin: "1rem" }}>
        <Title level={3}>Адрес</Title>
        <Paragraph>{filial.address}</Paragraph>
        <Title level={3}>Телефон</Title>
        <Paragraph>{filial.phone}</Paragraph>
        <Title level={3}>Директор</Title>
        <Paragraph>{filial.director}</Paragraph>
        <Title level={3}>Главный инженер</Title>
        <Paragraph>{filial.engineer}</Paragraph>

        <Title level={3}>Производственные отделения</Title>
        <ul>
          {filial.departments.map((department, index) => (
            <li key={index}>{department}</li>
          ))}
        </ul>

        <YMaps>
          <Map state={mapState} width="100%" height="400px">
            <ZoomControl />
            <Placemark
              geometry={filial.coordinates}
              properties={{
                balloonContent: `<div>${filial.name}<br>${filial.address}</div>`,
                hintContent: filial.name,
              }}
              options={{
                preset: "islands#greenDotIconWithCaption",
              }}
            />
          </Map>
        </YMaps>
      </Card>
    </div>
  );
};

export default FilialDetails;
