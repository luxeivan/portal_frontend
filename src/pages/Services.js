import React, { useEffect } from "react";
import AppHelmet from "../components/Global/AppHelmet";
import { Card, Flex, Typography, Image } from "antd";
import { Link, useParams } from "react-router-dom";
import useServices from "../stores/useServices";
import styles from "./Services.module.css";
import config from "../config";
const { Title, Text } = Typography;

export default function Services() {
  const services = useServices((state) => state.services);
  const fetchServices = useServices((state) => state.fetchServices);
  const { level2, level3 } = useParams();
  useEffect(() => {
    if (level2 && level3) {
      fetchServices(level2, level3);
    }
  }, [level2, level3]);
  //console.log(services)
  return (
    <>
      <AppHelmet title={"Услуги"} desc={"Услуги компании"} />
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
                    to={`/services/${
                      serviceDetailsData.find((item) => item.url === level2).url
                    }/${item.title}`}
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
              {serviceDetailsData.find((item) => item.url === level2).title} -{" "}
              {level3}
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

const serviceDetailsData = [
  {
    url: "uslugi-tehnologicheskogo-prisoedineniyas",
    title: "Услуги технологического присоединения",
    content: "Приказ Минэнерго от 15.04.2014 № 186 (ред. от 07.07.2021 № 541)",
    subServices: [
      { title: "Физические лица" },
      { title: "Юридические лица" },
      { title: "Индивидуальные предприниматели" },
      { title: "Энергосбытовая организация" },
    ],
  },
  {
    url: "kommercheskie-uslugis",
    title: "Коммерческие услуги",
    subServices: [
      { title: "Ремонт, техническое и оперативное обслуживание" },
      { title: "Услуги аренды" },
      { title: "Обслуживание приборов учёта" },
      {
        title: "Дополнительные услуги в рамках технологического присоединения",
      },
      { title: "Освобождение земельного участка от электрических сетей" },
    ],
  },
  {
    url: "uchet-elektricheskoj-energiis",
    title: "Учёт электрической энергии",
    content:
      "Приказ Минзнерго от 15.04.2014 Nº 186 (ред. от 07.07.2021 Nº 541)",
    subServices: [
      { title: "Физические лица" },
      { title: "Юридические лица" },
      { title: "Индивидуальные предприниматели" },
      { title: "Сетевые организации" },
      { title: "Энергосбытовая организация" },
    ],
  },
  {
    url: "servisnye-uslugis",
    title: "Сервисные услуги",
    subServices: [
      { title: "Актуальная информация профиля" },
      { title: "Подписка на информационные сообщения" },
      { title: "Прочее" },
    ],
  },
];
