import React, { useEffect } from "react";
import AppHelmet from "../../components/Global/AppHelmet";
import { Card, Flex, Typography, Image, Divider } from "antd";
import { Link, useParams } from "react-router-dom";
import useServices from "../../stores/useServices";
import styles from "./Services.module.css";
import config from "../../config";
const { Title, Text } = Typography;


const serviceDetailsData = [
  {
    url: "uslugi-tehnologicheskogo-prisoedineniyas",
    title: "Услуги технологического присоединения",
    content: "Подключение энергопринимающих устройств к электрическим сетям",
    subServices: [
      {
        title: "Для физических лиц",
        name: "Физические лица",
        url: "fiz-lica"
      },
      {
        title: "Для юридических лиц",
        name: "Юридические лица",
        url: "yur-lica"
      },
      {
        title: "Для индивидуальных предпринимателей",
        name: "Индивидуальные предприниматели",
        url: "individual"
      },
      {
        title: "Для энергосбытовых организаций",
        name: "Энергосбытовая организация",
        url: "energo-org"
      },
    ],
  },
  {
    url: "kommercheskie-uslugis",
    title: "Коммерческие услуги",
    content: "Аренда, Строительство, Ремонт",
    subServices: [
      {
        title: "Ремонт, техническое и оперативное обслуживание",
        name: "Ремонт, техническое и оперативное обслуживание",
        url: "remont"
      },
      {
        title: "Услуги аренды",
        name: "Услуги аренды",
        url: "uslugi"
      },
      {
        title: "Обслуживание приборов учёта",
        name: "Обслуживание приборов учёта",
        url: "obslujivanie"
      },
      {
        title: "Дополнительные услуги в рамках технологического присоединения",
        name: "Дополнительные услуги в рамках технологического присоединения",
        url: "dopuslugi"
      },
      {
        title: "Освобождение земельного участка от электрических сетей",
        name: "Освобождение земельного участка от электрических сетей",
        url: "osvobojdenie"
      },
    ],
  },
  {
    url: "uchet-elektricheskoj-energiis",
    title: "Учёт электрической энергии",
    content: "Установка, замена и поверка приборов учета",
    subServices: [
      {
        title: "Для физических лиц",
        name: "Физические лица",
        url: "fiz-lica"
      },
      {
        title: "Для юридических лиц",
        name: "Юридические лица",
        url: "yur-lica"
      },
      {
        title: "Для индивидуальных предпринимателей",
        name: "Индивидуальные предприниматели",
        url: "individual"
      },
      {
        title: "Сетевые организации",
        name: "Сетевые организации",
        url: "setevie"
      },
      {
        title: "Для энергосбытовых организаций",
        name: "Энергосбытовая организация",
        url: "energo-org"
      },
    ],
  },
  {
    url: "servisnye-uslugis",
    title: "Сервисные услуги",
    content: "Техническая поддержка пользователей",
    subServices: [
      {
        title: "Актуальная информация профиля",
        name: "Актуальная информация профиля",
        url: "info"
      },
      {
        title: "Подписка на информационные сообщения",
        name: "Подписка на информационные сообщения",
        url: "subscribe"
      },
      {
        title: "Прочее",
        name: "Прочее",
        url: "other"
      },
    ],
  },
];


export default function Services() {
  const services = useServices((state) => state.services);
  const fetchServices = useServices((state) => state.fetchServices);
  const { level2, level3 } = useParams();
  useEffect(() => {
    if (level2 && level3) {
      fetchServices(level2, serviceDetailsData.find(item => item.url === level2).subServices.find(item => item.url === level3).name);
    }
  }, [level2, level3]);
  //console.log(services)
  return (
    <>
      <AppHelmet title={"Каталог услуг"} desc={"Услуги компании"} />
      <div>
        {!level2 && !level3 && (
          <>
            <Title level={1} className={styles.title}>
              Каталог услуг
            </Title>
            <Flex wrap="wrap" gap="large">
              {serviceDetailsData.map((item, index) => (
                <Link
                  key={index}
                  to={`/services/${item.url}`}
                  className={styles.styleLink}
                >
                  <Card className={styles.styleCard}>
                    <Title level={4}>{item.title}</Title>
                    <Text>{item.content}</Text>
                  </Card>
                </Link>
              ))}
            </Flex>
          </>
        )}
        {level2 && !level3 && (
          <>
            <Title level={1} className={styles.title}>
              {serviceDetailsData.find((item) => item.url === level2).title}
            </Title>
            <Flex wrap="wrap" gap="large">
              {serviceDetailsData
                .find((item) => item.url === level2)
                .subServices.map((item, index) => (
                  <Link
                    key={index}
                    to={`/services/${serviceDetailsData.find((item) => item.url === level2).url
                      }/${item.url}`}
                    className={styles.styleLink}
                  >
                    <Card className={styles.styleCard}>
                      <Title level={4}>{item.title}</Title>
                      <Text>{item.content}</Text>
                    </Card>
                  </Link>
                ))}
            </Flex>
          </>
        )}
        {level2 && level3 && (
          <>
            <Title level={1} className={styles.title}>
            {serviceDetailsData.find((item) => item.url === level2).title}: <span style={{textTransform:"lowercase"}}>{serviceDetailsData.find(item => item.url === level2).subServices.find(item => item.url === level3).title}</span>
            </Title>
            
            <Flex wrap="wrap" gap="large">
              {services &&
                services.map((item) => (
                  <Link
                    key={item.id}
                    to={`/services/${level2}/${level3}/${item.id}`}
                    className={styles.styleLink}
                  >
                    <Card className={styles.styleCard}>
                      <div className={styles.cardContent}>
                        <Title level={4}>{item.attributes.name}</Title>
                        <Text>{item.attributes.shortDescription}</Text>
                      </div>
                      {item.attributes.icon.data && (
                        <Flex
                          justify="flex-end"
                          gap={20}
                          className={styles.cardImage}
                        >
                          <Image
                            style={{ textAlign: "center" }}
                            width={"50%"}
                            src={`${config.apiServer}${item.attributes.icon?.data?.attributes?.url}`}
                            preview={false}
                          />
                        </Flex>
                      )}
                    </Card>
                  </Link>
                ))}
            </Flex>
          </>
        )}
      </div>
    </>
  );
}

