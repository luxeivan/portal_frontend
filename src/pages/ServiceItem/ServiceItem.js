import React, { useEffect, useState } from "react";
import useServices from "../../stores/useServices";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Collapse,
  Drawer,
  Flex,
  Steps,
  Typography,
  theme,
  Breadcrumb,
} from "antd";
import styles from "./ServicesItem.module.css";
import { motion } from "framer-motion";
import { InfoCircleOutlined } from "@ant-design/icons";
import MarkDownText from "../../components/MarkDownText/MarkDownText";
import Preloader from "../../components/Main/Preloader";
import Law from "../../components/Documentation/Law";
import ErrorModal from "../../components/ErrorModal"; // Подключаем модалку с ошибкой

const { Title, Text, Paragraph } = Typography;

const sklonenie = (day) => {
  if (day === 1) {
    return "день";
  } else if (day > 1 && day < 5) {
    return "дня";
  } else {
    return "дней";
  }
};

export default function ServiceItem() {
  const { colorPrimaryText } = theme.useToken().token;
  const [open, setOpen] = useState(false);
  const [openDrawerSteps, setOpenDrawerSteps] = useState(false);
  const { colorPrimary } = theme.useToken().token;
  const serviceItem = useServices((state) => state.serviceItem);
  const fetchServiceItem = useServices((state) => state.fetchServiceItem);
  const isLoading = useServices((state) => state.isLoading);
  const { level2, key } = useParams();

  const chain = useServices((state) => state.chain);
  const fetchServiceChain = useServices((state) => state.fetchServiceChain);

  const [error, setError] = useState(null); // Состояние для хранения ошибок

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchServiceItem(key);
      } catch (err) {
        setError(
          err.message || "Произошла ошибка при загрузке данных об услуге"
        );
      }
    };

    fetchData();
  }, [level2, key, fetchServiceItem]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {serviceItem && (
        <>
          <Breadcrumb
            items={
              chain &&
              chain.map((item) => ({
                href: `/services/${item.Ref_Key}`,
                title: item.Description,
              }))
            }
          />
          <Title level={1} style={{ marginTop: "10px" }}>
            {serviceItem.Description}
          </Title>
        </>
      )}
      {isLoading && (
        <Flex style={{ height: "300px" }} align="center" justify="center">
          <Preloader />
        </Flex>
      )}
      {!isLoading && !error && serviceItem && (
        <>
          <Collapse
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Описание",
                children: (
                  <div>
                    <Paragraph>{serviceItem.shortDescription}</Paragraph>
                    <MarkDownText>{serviceItem.fullDescription}</MarkDownText>
                    {serviceItem.descriptionOfDocumentPreparationPeriod && (
                      <Paragraph>
                        <b>Срок подготовки документов:</b>{" "}
                        {serviceItem.descriptionOfDocumentPreparationPeriod}
                      </Paragraph>
                    )}
                    {serviceItem.descriptionOfPeriodService && (
                      <Paragraph>
                        <b>Срок оказания услуги:</b>{" "}
                        {serviceItem.descriptionOfPeriodService}
                      </Paragraph>
                    )}
                    {serviceItem.descriptionOfCost && (
                      <Paragraph>
                        <b>Стоимость:</b> {serviceItem.descriptionOfCost}
                      </Paragraph>
                    )}
                  </div>
                ),
              },
              {
                key: "2",
                label: "Необходимая информация для подачи заявки",
                children: (
                  <>
                    <MarkDownText>
                      {serviceItem.requiredInformation}
                    </MarkDownText>
                  </>
                ),
              },
              {
                key: "3",
                label: "Этапы выполнения",
                children: (
                  <Steps
                    direction="vertical"
                    current={100}
                    items={serviceItem?.steps?.map((item, index) => ({
                      icon: (
                        <div
                          className={styles.icon}
                          style={{ border: `2px solid ${colorPrimary}` }}
                        >
                          <Text className={styles.iconText}>{index + 1}</Text>
                        </div>
                      ),
                      title: (
                        <>
                          <span>{item.name}</span>
                          <InfoCircleOutlined
                            onClick={() => {
                              setOpenDrawerSteps(index + 1);
                            }}
                            style={{
                              marginLeft: 2,
                              color: "rgba(0, 0, 0, 0.45)",
                            }}
                          />
                        </>
                      ),
                      description: (
                        <>
                          <span>{item.shortDescription}</span>
                          <Drawer
                            title={item.name}
                            placement="right"
                            onClose={() => {
                              setOpenDrawerSteps(false);
                            }}
                            open={openDrawerSteps === index + 1}
                          >
                            <MarkDownText>
                              {item.fullDescription || "Нет описания"}
                            </MarkDownText>
                          </Drawer>
                        </>
                      ),
                      subTitle: item.periodDescription,
                    }))}
                  />
                ),
              },
              {
                key: "4",
                label: "Нормативные акты и законодательство",
                children: <Law />,
              },
            ]}
          />

          <Flex align="center" justify="center" style={{ padding: "20px" }}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to={`/cabinet/new-claim/${serviceItem.Ref_Key}`}>
                <Button type="primary" size="large" onClick={showDrawer}>
                  {serviceItem.buttonText || "Получить услугу"}
                </Button>
              </Link>
            </motion.div>
          </Flex>

          <Drawer
            title="Вы почти подали заявку"
            placement="bottom"
            closable={false}
            onClose={onClose}
            open={open}
            key="bottom"
          >
            <Paragraph>Скоро механизм подачи заявок заработает</Paragraph>
          </Drawer>
        </>
      )}
      {error && ( // Показываем модалку с ошибкой
        <ErrorModal
          visible={!!error}
          error={error}
          onClose={() => setError(null)} // Закрываем модалку при клике на крестик
        />
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import useServices from "../../stores/useServices";
// import { Link, useParams } from "react-router-dom";
// import {
//   Button,
//   Collapse,
//   Drawer,
//   Flex,
//   Steps,
//   Typography,
//   theme,
//   Breadcrumb,
// } from "antd";
// import styles from "./ServicesItem.module.css";
// import { motion } from "framer-motion";
// import { InfoCircleOutlined } from "@ant-design/icons";
// import MarkDownText from "../../components/MarkDownText/MarkDownText";
// import Preloader from "../../components/Main/Preloader";
// import Law from "../../components/Documentation/Law";

// const { Title, Text, Paragraph } = Typography;

// const sklonenie = (day) => {
//   if (day === 1) {
//     return "день";
//   } else if (day > 1 && day < 5) {
//     return "дня";
//   } else {
//     return "дней";
//   }
// };

// export default function ServiceItem() {
//   const { colorPrimaryText } = theme.useToken().token;
//   const [open, setOpen] = useState(false);
//   const [openDrawerSteps, setOpenDrawerSteps] = useState(false);
//   const { colorPrimary } = theme.useToken().token;
//   const serviceItem = useServices((state) => state.serviceItem);
//   const fetchServiceItem = useServices((state) => state.fetchServiceItem);
//   const isLoading = useServices((state) => state.isLoading);
//   const { level2, key } = useParams();

//   const chain = useServices((state) => state.chain);
//   const fetchServiceChain = useServices((state) => state.fetchServiceChain);
//   useEffect(() => {
//     fetchServiceItem(key);
//   }, [level2, key]);
//   const showDrawer = () => {
//     setOpen(true);
//   };
//   const onClose = () => {
//     setOpen(false);
//   };
//   console.log(serviceItem);

//   return (
//     <div>
//       {serviceItem && (
//         <>
//           <Breadcrumb
//             items={
//               chain &&
//               chain.map((item) => ({
//                 href: `/services/${item.Ref_Key}`,
//                 title: item.Description,
//               }))
//             }
//           />
//           <Title level={1} style={{ marginTop: "10px" }}>
//             {serviceItem.Description}
//           </Title>
//         </>
//       )}
//       {isLoading && (
//         <Flex style={{ height: "300px" }} align="center" justify="center">
//           <Preloader />
//         </Flex>
//       )}
//       {serviceItem && (
//         <>
//           <Collapse
//             defaultActiveKey={["1"]}
//             items={[
//               {
//                 key: "1",
//                 label: "Описание",
//                 children: (
//                   <div>
//                     <Paragraph>{serviceItem.shortDescription}</Paragraph>
//                     <MarkDownText>{serviceItem.fullDescription}</MarkDownText>
//                     {serviceItem.descriptionOfDocumentPreparationPeriod && (
//                       <Paragraph>
//                         <b>Срок подготовки документов:</b>{" "}
//                         {serviceItem.descriptionOfDocumentPreparationPeriod}
//                       </Paragraph>
//                     )}
//                     {serviceItem.descriptionOfPeriodService && (
//                       <Paragraph>
//                         <b>Срок оказания услуги:</b>{" "}
//                         {serviceItem.descriptionOfPeriodService}
//                       </Paragraph>
//                     )}
//                     {serviceItem.descriptionOfCost && (
//                       <Paragraph>
//                         <b>Стоимость:</b> {serviceItem.descriptionOfCost}
//                       </Paragraph>
//                     )}
//                   </div>
//                 ),
//               },
//               {
//                 key: "2",
//                 label: "Необходимая информация для подачи заявки",
//                 children: (
//                   <>
//                     <MarkDownText>
//                       {serviceItem.requiredInformation}
//                     </MarkDownText>
//                     {}
//                   </>
//                 ),
//               },
//               {
//                 key: "3",
//                 label: "Этапы выполнения",
//                 children: (
//                   <Steps
//                     direction="vertical"
//                     current={100}
//                     items={serviceItem?.steps?.map((item, index) => ({
//                       icon: (
//                         <div
//                           className={styles.icon}
//                           style={{ border: `2px solid ${colorPrimary}` }}
//                         >
//                           <Text className={styles.iconText}>{index + 1}</Text>
//                         </div>
//                       ),
//                       title: (
//                         <>
//                           <span>{item.name}</span>
//                           <InfoCircleOutlined
//                             onClick={() => {
//                               setOpenDrawerSteps(index + 1);
//                             }}
//                             style={{
//                               marginLeft: 2,
//                               color: "rgba(0, 0, 0, 0.45)",
//                             }}
//                           />
//                         </>
//                       ),
//                       description: (
//                         <>
//                           <span>{item.shortDescription}</span>
//                           <Drawer
//                             title={item.name}
//                             placement="right"
//                             onClose={() => {
//                               setOpenDrawerSteps(false);
//                             }}
//                             open={openDrawerSteps === index + 1}
//                           >
//                             <MarkDownText>
//                               {item.fullDescription || "Нет описания"}
//                             </MarkDownText>
//                           </Drawer>
//                         </>
//                       ),
//                       subTitle: item.periodDescription,
//                     }))}
//                   />
//                 ),
//               },
//               {
//                 key: "4",
//                 label: "Нормативные акты и законодательство",
//                 children: <Law />,
//               },
//             ]}
//           />

//           <Flex align="center" justify="center" style={{ padding: "20px" }}>
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             >
//               <Link to={`/cabinet/new-claim/${serviceItem.Ref_Key}`}>
//                 <Button type="primary" size="large" onClick={showDrawer}>
//                   Получить услугу
//                 </Button>
//               </Link>
//             </motion.div>
//           </Flex>

//           <Drawer
//             title="Вы почти подали заявку"
//             placement="bottom"
//             closable={false}
//             onClose={onClose}
//             open={open}
//             key="bottom"
//           >
//             <Paragraph>Скоро механизм подачи заявок заработает</Paragraph>
//           </Drawer>
//         </>
//       )}
//     </div>
//   );
// }
