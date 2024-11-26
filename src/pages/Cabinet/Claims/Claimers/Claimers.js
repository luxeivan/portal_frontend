import React, { useEffect } from "react";
import { Card, Typography, Skeleton, Descriptions, theme } from "antd";
import { Link } from "react-router-dom";
import AppHelmet from "../../../../components/Global/AppHelmet";
import useClaims from "../../../../stores/Cabinet/useClaims";
import styles from "./Claimers.module.css";
import { motion } from "framer-motion";

const { Title } = Typography;

export default function Claimers() {
  const claims = useClaims((state) => state.claims);
  const fetchClaims = useClaims((state) => state.fetchClaims);

  const { token } = theme.useToken();

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

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
            {claims.map((item, index) => (
              <motion.div
                key={index}
                // whileHover={{ scale: 1.05, transition: { duration: .2 } }} // Анимация при наведении
                // whileTap={{ scale: 0.95, transition: { duration: .2 } }} // Анимация при клике
              >
                <Link
                  to={`/cabinet/claimers/${item.element2_Expanded.Ref_Key}`}
                >
                  <Card
                    className={styles.styleCard}
                    hoverable
                    title={`Заявка №${item.element2_Expanded.Number}`}
                    style={{
                      border: `1px solid ${token.colorBorder}`
                    }}
                  >
                    <Descriptions column={1}>
                      <Descriptions.Item label="Создана">
                        {item.element2_Expanded.Date}
                      </Descriptions.Item>
                      <Descriptions.Item label="По услуге">
                        {item.element2_Expanded.template.Description}
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

// import React, { useEffect } from 'react';
// import { Card, Typography, Skeleton, Descriptions } from 'antd';
// import { Link } from 'react-router-dom';
// import AppHelmet from '../../../../components/Global/AppHelmet';
// import useClaims from '../../../../stores/Cabinet/useClaims';
// import styles from "./Claimers.module.css";
// import { motion } from 'framer-motion';

// const { Title } = Typography;

// export default function Claimers() {
//   const claims = useClaims(state => state.claims);
//   const fetchClaims = useClaims(state => state.fetchClaims);

//   useEffect(() => {
//     fetchClaims();
//   }, [fetchClaims]);

//   return (
//     <>
//       {!claims ? (
//         <div>
//           <AppHelmet title={"Список заявок"} desc={"Список поданных заявок"} />
//           <Title level={1}>Список поданных заявок</Title>
//           {/* Отображение скелетонов, пока данные загружаются */}
//           <Skeleton active avatar paragraph={{ rows: 2 }} />
//           <Skeleton active avatar paragraph={{ rows: 2 }} />
//           <Skeleton active avatar paragraph={{ rows: 2 }} />
//         </div>
//       ) : (
//         <div className={styles.claimsContainer}>
//           <Title level={1}>Список поданных заявок</Title>
//           <div className={styles.cardsContainer}>
//             {claims.map((item, index) => (
//               <motion.div
//                 key={index}
//                 whileHover={{ scale: 1.05 }} // Анимация при наведении
//                 whileTap={{ scale: 0.95 }} // Анимация при клике
//               >
//                 <Link to={`/cabinet/claimers/${item.element2_Expanded.Ref_Key}`}>
//                   <Card
//                     className={styles.styleCard}
//                     hoverable
//                     title={`Заявка №${item.element2_Expanded.Number}`}
//                   >
//                     <Descriptions column={1}>
//                       <Descriptions.Item label="Создана">
//                         {item.element2_Expanded.Date}
//                       </Descriptions.Item>
//                       <Descriptions.Item label="По услуге">
//                         {item.element2_Expanded.template.Description}
//                       </Descriptions.Item>
//                     </Descriptions>
//                   </Card>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
// import React, { useEffect } from 'react'
// import { Card, Flex, Typography, Spin, theme, Image, Skeleton,Descriptions } from "antd";
// import Title from 'antd/es/typography/Title'
// import { Link, useParams } from 'react-router-dom'
// import AppHelmet from '../../../components/Global/AppHelmet'
// import useClaims from '../../../stores/Cabinet/useClaims'
// import styles from "./Claimers.module.css";

// export default function Claimers() {
//     const claims = useClaims(state => state.claims)
//     const fetchClaims = useClaims(state => state.fetchClaims)
//     useEffect(() => {
//         fetchClaims()
//     }, [])
//     const { id } = useParams()
//     return (
//         <>
//             {!claims &&
//                 <div>

//                     <AppHelmet title={"В работе"} desc={"Список личных кабинетов заявителей"} />
//                     <Title level={1}>Список поданных заявок</Title>

//                     <Skeleton active avatar paragraph={{ rows: 2 }} />
//                     <Skeleton active avatar paragraph={{ rows: 2 }} />
//                     <Skeleton active avatar paragraph={{ rows: 2 }} />
//                 </div>
//             }
//             {claims &&
//                 <Flex wrap="wrap" gap="large" style={{ width: "100%" }}>
//                     {claims.map((item, index) =>
//                         <Link key={index} to={`/cabinet/claimers/${item.element2_Expanded.Ref_Key}`}>
//                             <Card className={styles.styleCard} hoverable
//                             title={`Заявка №${item.element2_Expanded.Number}`}
//                             >
//                                 {/* <Title level={4}>Заявка №{item.Element2_Expanded.Number}</Title> */}
//                                 <Descriptions
//                                 // title={`Заявка №${item.Element2_Expanded.Number}`}
//                                 column={1} items={[
//                                     {
//                                         key: '1',
//                                         label: 'Создана',
//                                         children: item.element2_Expanded.Date,
//                                     },
//                                     {
//                                         key: '2',
//                                         label: 'По услуге',
//                                         children: item.element2_Expanded.template.Description,
//                                     }
//                                 ]}/>
//                                 {/* <Flex vertical>

//                                     <Typography.Text type="secondary">Создана: {item.Element2_Expanded.Date}</Typography.Text>
//                                     <Typography.Text type="secondary">По услуге: {item.Element2_Expanded.Template.Description}</Typography.Text>
//                                 </Flex> */}
//                             </Card>
//                         </Link>
//                     )}
//                 </Flex>
//             }
//         </>
//     )
// }
