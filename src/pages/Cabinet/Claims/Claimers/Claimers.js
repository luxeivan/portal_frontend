import React, { useEffect } from "react";
import { Card, Typography, Skeleton, Descriptions, theme } from "antd";
import { Link } from "react-router-dom";
import AppHelmet from "../../../../components/Global/AppHelmet";
import useClaims from "../../../../stores/Cabinet/useClaims";
import styles from "./Claimers.module.css";
import { motion } from "framer-motion";
import moment from "moment/moment";

const { Title } = Typography;

export default function Claimers() {
  const claims = useClaims((state) => state.claims);
  const fetchClaims = useClaims((state) => state.fetchClaims);

  const { token } = theme.useToken();

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);
console.log("claims",claims)
  return (
    <>
      {!claims ? (
        <div>
          <AppHelmet title={"Список заявок"} desc={"Список поданных заявок"} />
          <Title level={1}>Список поданных заявок</Title>
          {/* Отображение скелетонов, пока данные загружаются */}
          <Skeleton active avatar paragraph={{ rows: 2 }} />
          <Skeleton active avatar paragraph={{ rows: 2 }} />
          <Skeleton active avatar paragraph={{ rows: 2 }} />
        </div>
      ) : (
        <div className={styles.claimsContainer}>
          <Title level={1}>Список поданных заявок</Title>
          <div className={styles.cardsContainer}>
            {claims.claimsProject?.map((item, index) => (
              <motion.div
                key={index}
                // whileHover={{ scale: 1.05, transition: { duration: .2 } }} // Анимация при наведении
                // whileTap={{ scale: 0.95, transition: { duration: .2 } }} // Анимация при клике
              >
                <Link
                  to={`/cabinet/claimers/${item.Ref_Key}`}
                >
                  <Card
                    className={styles.styleCard}
                    hoverable
                    title={`Заявка №${item.number}`}
                    style={{
                      border: `1px solid ${token.colorBorder}`
                    }}
                  >
                    <Descriptions column={1}>
                      <Descriptions.Item label="Создана">
                        {moment(item.date).format('DD.MM.YYYY HH:mm')}
                      </Descriptions.Item>
                      <Descriptions.Item label="По услуге">
                        {item.service.description}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
