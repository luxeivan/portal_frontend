import React, { useEffect, useState } from "react";
import AppHelmet from "../../components/Global/AppHelmet";
import { Card, Flex, Typography, theme, Breadcrumb, Tag } from "antd";
import { Link, useParams, useLocation } from "react-router-dom";
import { motion, MotionConfig } from "framer-motion";
import useServices from "../../stores/useServices";
import styles from "./Services.module.css";
import Container from "../../components/Container";
import Preloader from "../../components/Main/Preloader";
import ErrorModal from "../../components/ErrorModal";

import { IconPowerUp } from "../../components/icons/IconPowerUp";
import { IconPowerUpArrow } from "../../components/icons/IconPowerUpArrow";
import { IconConnectNew } from "../../components/icons/IconConnectNew";
import { IconDocument } from "../../components/icons/IconDocument";
import { IconFolder } from "../../components/icons/IconFolder";
import { IconService } from "../../components/icons/IconService";

const { Title } = Typography;

export default function Services() {
  const [isHoverCard, setIsHoverCard] = useState({});
  const location = useLocation();
  const { token } = theme.useToken();
  const isLoading = useServices((state) => state.isLoading);
  const services = useServices((state) => state.services);
  const chain = useServices((state) => state.chain);
  const error = useServices((state) => state.error);
  const fetchServiceChain = useServices((state) => state.fetchServiceChain);
  const serviceItem = useServices((state) => state.serviceItem);
  const fetchServices = useServices((state) => state.fetchServices);
  const { level2 } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchServices(level2);
      } catch (err) {
        console.error("Ошибка при загрузке услуг:", err);
      }
    };

    fetchData();
  }, [level2, fetchServices, fetchServiceChain]);
  return (
    <>
      <AppHelmet
        title={
          location.pathname === "/services" ||
          location.pathname === "/services/"
            ? "Каталог услуг"
            : serviceItem?.Description
        }
        desc="Услуги компании"
      />
      <Container>
        {serviceItem && (
          <>
            <Breadcrumb
              separator=">"
              itemRender={(currentRoute) => {
                return <Link to={currentRoute.href}>{currentRoute.title}</Link>;
              }}
              items={
                !(
                  location.pathname === "/services" ||
                  location.pathname === "/services/"
                ) &&
                chain &&
                chain.map((item) => ({
                  href: `/services/${item.Ref_Key}`,
                  title: item.Description,
                }))
              }
            />
          </>
        )}
        {isLoading ? (
          <Flex style={{ height: "300px" }} align="center" justify="center">
            <Preloader />
          </Flex>
        ) : error ? (
          <ErrorModal
            visible={!!error}
            error={error}
            onClose={() => error(null)}
          />
        ) : (
          <>
            <Title level={1} className={styles.title}>
              {serviceItem ? serviceItem.Description : "Каталог услуг"}
            </Title>
            {services.length > 0 ? (
              <Flex wrap="wrap" gap="large" style={{ width: "100%" }}>
                <MotionConfig transition={{ duration: 0.2 }}>
                  {services
                    .sort((a, b) => a.order - b.order)
                    .map((item, index) => (
                      <motion.div key={index} className={styles.styleLink}>
                        <Link
                          key={index}
                          to={
                            item.IsFolder
                              ? `/services/${item.Ref_Key}`
                              : `/services/item/${item.Ref_Key}`
                          }
                        >
                          <Card
                            onMouseEnter={() =>
                              setIsHoverCard((prev) => ({
                                ...prev,
                                [index]: true,
                              }))
                            }
                            onMouseLeave={() =>
                              setIsHoverCard((prev) => ({
                                ...prev,
                                [index]: false,
                              }))
                            }
                            onClick={() =>
                              setIsHoverCard((prev) => ({
                                ...prev,
                                [index]: false,
                              }))
                            }
                            className={styles.styleCard}
                            style={{
                              border: `1px solid ${token.colorBorder}`,
                            }}
                            styles={{
                              body: {
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                height: "100%",
                                background:
                                  "linear-gradient(-30deg, rgba(0,97,170,.1) 0%, rgba(255,255,255,0) 50%)",
                              },
                            }}
                            hoverable
                          >
                            <Title level={4} className={styles.cardTitle}>
                              {item.label}
                            </Title>

                            <Flex
                              justify={
                                !item.IsFolder ? "space-between" : "flex-end"
                              }
                              align="flex-start"
                              gap={20}
                              style={{ width: "100%", flex: 1 }}
                            >
                              {!item.IsFolder && (
                                <Flex vertical gap={10}>
                                  {item.tags.map((item, index) => (
                                    <Tag
                                      key={index}
                                      className={styles.tags}
                                      color={item.tag?.color?.Имя}
                                    >
                                      {item.tag?.Description}
                                    </Tag>
                                  ))}
                                </Flex>
                              )}
                              <Flex
                                align="center"
                                justify="center"
                                style={{
                                  width: !item.IsFolder ? "35%" : "35%",
                                  alignSelf: "flex-end",
                                }}
                              >
                                {!item.IsFolder && (
                                  <div className={styles.iconDiv}>
                                    {index === 0 && (
                                      <IconDocument
                                        isHover={isHoverCard[index]}
                                      />
                                    )}
                                    {index === 1 && (
                                      <IconPowerUpArrow
                                        isHover={isHoverCard[index]}
                                      />
                                    )}
                                    {index === 2 && (
                                      <IconConnectNew
                                        isHover={isHoverCard[index]}
                                      />
                                    )}

                                    {index === 3 && (
                                      <IconPowerUp
                                        isHover={isHoverCard[index]}
                                      />
                                    )}
                                    {index === 4 && (
                                      <IconService
                                        isHover={isHoverCard[index]}
                                      />
                                    )}
                                  </div>
                                )}
                                {item.IsFolder && (
                                  <div className={styles.iconDiv}>
                                    <IconFolder isHover={isHoverCard[index]} />
                                  </div>
                                )}
                              </Flex>
                            </Flex>
                          </Card>
                        </Link>
                      </motion.div>
                    ))}
                </MotionConfig>
              </Flex>
            ) : (
              <Title
                level={2}
                className={styles.title}
                style={{ color: "#999" }}
              >
                Услуг в данной категории не найдено
              </Title>
            )}
          </>
        )}
      </Container>
    </>
  );
}
