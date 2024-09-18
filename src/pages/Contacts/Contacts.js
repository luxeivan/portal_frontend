import {
  Collapse,
  Spin,
  Button,
  Skeleton,
  FloatButton,
  Card,
  Alert,
  Row,
  Col,
  Image,
} from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useContacts } from "../../stores/useContacts";
import styles from "./Contacts.module.css";

const Contacts = () => {
  const { contactCenters, loading } = useContacts();

  // Функция для создания ссылки на маршрут
  const createRouteLink = (coords) => {
    const [lat, lon] = coords;
    return `https://yandex.ru/maps/?rtext=~${lat},${lon}&rtt=auto`;
  };

  if (loading) {
    // Пока всё грузится, показываем спиннер
    return <Spin size="large" />;
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

      <Collapse
        items={contactCenters.map((center, index) => ({
          key: index,
          label: center.name,
          children: (
            <Card bordered={false} className={styles.card}>
              {/* Адрес */}
              <div style={{ marginBottom: "10px" }}>
                <EnvironmentOutlined /> <strong>Адрес:</strong>{" "}
                {center.address || "Информация отсутствует"}
              </div>

              {/* Кнопка для построения маршрута */}
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

              {/* Телефон */}
              <div style={{ marginBottom: "10px" }}>
                <PhoneOutlined /> <strong>Телефон:</strong>{" "}
                {center.telephone ? (
                  <a href={`tel:${center.telephone}`}>{center.telephone}</a>
                ) : (
                  "Информация отсутствует"
                )}
              </div>

              {/* Время работы */}
              <div style={{ marginBottom: "10px" }}>
                <ClockCircleOutlined /> <strong>Время работы:</strong>{" "}
                {center.workingTime || "Информация отсутствует"}
              </div>

              {/* Карта или сообщение об отсутствии координат */}
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
                // Если координат нет, выводим сообщение
                <Alert
                  message="Информация о координатах отсутствует"
                  description="Пока тут нет широты и долготы, чтобы построить маршрут и отрисовать карту. Они скоро появятся и всё красиво заработает!"
                  type="info"
                  showIcon
                />
              )}

              {/* Описание маршрута и фотографии */}
              {center.images && center.images.length > 0 ? (
                <div style={{ marginBottom: "10px" }}>
                  <strong>Описание маршрута:</strong>
                  <div style={{ width: "100%", overflow: "hidden" }}>
                    {loading ? (
                      <Skeleton.Image active />
                    ) : (
                      <Image.PreviewGroup>
                        <Row gutter={[16, 16]}>
                          {center.images.map((img, idx) => (
                            <Col key={idx} xs={24} sm={12} md={8} lg={6} xl={6}>
                              <Image
                                src={img.src}
                                alt={`Фото ${idx + 1}`}
                                width="100%"
                                height="auto"
                                style={{
                                  borderRadius: "5px",
                                }}
                                placeholder={
                                  <div
                                    style={{
                                      backgroundColor: "#f0f0f0",
                                      width: "100%",
                                      paddingBottom: "75%", // Соотношение сторон 4:3
                                    }}
                                  />
                                }
                              />
                            </Col>
                          ))}
                        </Row>
                      </Image.PreviewGroup>
                    )}
                  </div>
                </div>
              ) : (
                "Фото отсутствует"
              )}
            </Card>
          ),
        }))}
      />

      {/* Кнопка для быстрого возврата наверх */}
      <FloatButton />
    </div>
  );
};

export default Contacts;
