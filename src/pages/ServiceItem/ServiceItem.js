import React, { useEffect, useState } from "react";
import useServices from "../../stores/useServices";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Collapse,
  Divider,
  Drawer,
  Flex,
  Space,
  Steps,
  Table,
  Typography,
  theme,
} from "antd";
import ListDocs from "../../components/ServiceItem/ListDocs";
import StrapiRichText from "../../components/StrapiRichText";
import styles from "./ServicesItem.module.css";
import { motion } from "framer-motion";
import { LeftOutlined, RightOutlined, InfoCircleOutlined } from "@ant-design/icons";
import MarkDownText from "../../components/MarkDownText/MarkDownText";


const { Title, Text, Paragraph } = Typography;

const sklonenie = (day) => {
  if (day === 1) {
    return 'день'
  } else if (day > 1 && day < 5) {
    return 'дня'
  } else {
    return 'дней'
  }
}

export default function ServiceItem() {
  const [open, setOpen] = useState(false);
  const [openDrawerSteps, setOpenDrawerSteps] = useState(false);
  const { colorPrimary } = theme.useToken().token;
  const serviceItem = useServices((state) => state.serviceItem);
  const fetchServiceItem = useServices((state) => state.fetchServiceItem);
  const { level2, key } = useParams();

  const chain = useServices((state) => state.chain);
  const fetchServiceChain = useServices((state) => state.fetchServiceChain);
  useEffect(() => {
    fetchServiceItem(key);
    fetchServiceChain(key)
  }, [level2, key]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  console.log(serviceItem)

  return (
    <div>
      {serviceItem && (
        <>
          <Flex style={{ margin: "20px 0" }}>
            {chain && chain.map((item, index) => <><Link to={`/services/${item.Ref_Key}`} key={index}>{item.Description}</Link><RightOutlined /></>)}
          </Flex>
          {/* <Link to={`/services/${serviceItem.Parent_Key}`}><Button style={{ marginTop: "20px" }}><LeftOutlined /></Button></Link> */}
          <Title level={1} style={{ marginTop: "10px" }}>
            {/* <span style={{ color: "gray" }}>Услуга:</span><br /> */}
            {serviceItem.Description}
          </Title>
          {/* <Divider /> */}

          <Collapse
            defaultActiveKey={["1"]}
            items={[
              {
                key: "1",
                label: "Описание",
                children: (
                  <div>
                    <Paragraph>{serviceItem.ShortDescription}</Paragraph>
                    {/* <StrapiRichText content={serviceItem.attributes.description} /> */}
                    <MarkDownText>{serviceItem.FullDescription}</MarkDownText>
                    <Paragraph>
                      <b>Срок подготовки документов:</b>{" "}
                      {serviceItem.DescriptionOfDocumentPreparationPeriod}
                    </Paragraph>
                    <Paragraph>
                      <b>Срок оказания услуги:</b>{" "}
                      {serviceItem.DescriptionOfPeriodService}
                    </Paragraph>
                    <Paragraph>
                      <b>Стоимость:</b> {serviceItem.DescriptionOfCost}
                    </Paragraph>
                  </div>
                ),
              },
              {
                key: "2",
                label: "Необходимая информация для подачи заявки",
                children: (
                  <>
                    {serviceItem.Fields && (
                      serviceItem.Fields.map((item, index) =>
                        <Flex vertical key={index}>
                          <Paragraph>
                            {item.Value}
                          </Paragraph>
                          <Paragraph>
                            {item.ShortDescription}
                          </Paragraph>
                        </Flex>
                      )
                    )}
                  </>
                ),
              },
              {
                key: "3",
                label: "Этапы выполнения",
                children: (
                  <Steps
                    // size="small"
                    direction="vertical"
                    current={100}
                    items={serviceItem.Steps.map((item, index) => ({
                      icon: (
                        <div
                          className={styles.icon}
                          style={{ border: `2px solid ${colorPrimary}` }}
                        >
                          <Text className={styles.iconText}>{index + 1}</Text>
                        </div>
                      ),
                      title: <><span>{item.Name}</span><InfoCircleOutlined onClick={() => { setOpenDrawerSteps(index + 1) }} style={{ marginLeft: 2, color: "rgba(0, 0, 0, 0.45)" }} /></>,
                      description: <>
                        <span>{item.ShortDescription}</span>
                        <Drawer
                          title={item.Name}
                          placement="right"
                          onClose={() => { setOpenDrawerSteps(false) }}
                          open={openDrawerSteps === (index + 1)}
                        >
                           <MarkDownText>{item.FullDescription || "Нет описания"}</MarkDownText>
                        </Drawer>
                      </>,
                      subTitle: item.PeriodDescription,
                    }))}
                  />
                ),
              },
              {
                key: "4",
                label: "Нормативные акты и законодательство",
                children: (
                  <Paragraph>
                    Здесь будут файлы и ссылки на официальные документы
                  </Paragraph>
                ),
              },
            ]}
          />

          <Flex align="center" justify="center" style={{ padding: "20px" }}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to={`/cabinet/new-claim/${level2}/${serviceItem.id}`}>
                <Button type="primary" size="large" onClick={showDrawer}>
                  Получить услугу
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
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import useServices from "../../stores/useServices";
// import { Link, useParams } from "react-router-dom";
// import {
//   Button,
//   Collapse,
//   Divider,
//   Drawer,
//   Flex,
//   Steps,
//   Table,
//   Typography,
//   theme,
// } from "antd";
// import ListDocs from "../../components/ServiceItem/ListDocs";
// import StrapiRichText from "../../components/StrapiRichText";
// import styles from "./ServicesItem.module.css";
// import { motion } from "framer-motion";
// import { LeftOutlined } from "@ant-design/icons";
// import MarkDownText from "../../components/MarkDownText/MarkDownText";


// const { Title, Text, Paragraph } = Typography;

// export default function ServiceItem() {
//   const [open, setOpen] = useState(false);
//   const { colorPrimary } = theme.useToken().token;
//   const serviceItem = useServices((state) => state.serviceItem);
//   const fetchServiceItem = useServices((state) => state.fetchServiceItem);
//   const { level2, id } = useParams();
//   useEffect(() => {
//     fetchServiceItem(level2, id);
//   }, [level2, id]);
//   const showDrawer = () => {
//     setOpen(true);
//   };
//   const onClose = () => {
//     setOpen(false);
//   };
//   console.log(serviceItem)
//   return (
//     <div>
//       {serviceItem && (
//         <>

//           <Link to={`/services/${level2}`}><Button style={{ marginTop: "20px" }}><LeftOutlined /></Button></Link>
//           <Title level={1} style={{ marginTop: "10px" }}>
//             <span style={{ color: "gray" }}>Услуга:</span><br />{serviceItem.attributes.name}
//           </Title>
//           {/* <Divider /> */}

//           <Collapse
//             defaultActiveKey={["1"]}
//             items={[
//               {
//                 key: "1",
//                 label: "Описание",
//                 children: (
//                   <div>
//                     <Paragraph>{serviceItem.attributes.shortDescription}</Paragraph>
//                     {/* <StrapiRichText content={serviceItem.attributes.description} /> */}
//                     <MarkDownText>{serviceItem.attributes.description}</MarkDownText>
//                     <Paragraph>
//                       <b>Срок подготовки документов:</b>{" "}
//                       {serviceItem.attributes.periodPreparationDocuments}
//                     </Paragraph>
//                     <Paragraph>
//                       <b>Срок оказания услуги:</b>{" "}
//                       {serviceItem.attributes.periodServiceProvision}
//                     </Paragraph>
//                     <Paragraph>
//                       <b>Стоимость:</b> {serviceItem.attributes.price}
//                     </Paragraph>
//                   </div>
//                 ),
//               },
//               {
//                 key: "2",
//                 label: "Необходимая информация для подачи заявки",
//                 children: (
//                   <Paragraph>
//                     {serviceItem.attributes.fields && (
//                       <ListDocs
//                         list={serviceItem.attributes.fields.filter(
//                           (item) => item.common.showInSpecification
//                         )}
//                       />
//                     )}
//                   </Paragraph>
//                 ),
//               },
//               {
//                 key: "3",
//                 label: "Этапы выполнения",
//                 children: (
//                   <Steps
//                     // size="small"
//                     direction="vertical"
//                     current={100}
//                     items={serviceItem.attributes.steps.map((item, index) => ({
//                       icon: (
//                         <div
//                           className={styles.icon}
//                           style={{ border: `2px solid ${colorPrimary}` }}
//                         >
//                           <Text className={styles.iconText}>{index + 1}</Text>
//                         </div>
//                       ),
//                       title: item.name,
//                       description: item.shortDescription,
//                       subTitle: `${item.period ? item.period : ''}`,
//                     }))}
//                   />
//                 ),
//               },
//               {
//                 key: "4",
//                 label: "Нормативные акты и законодательство",
//                 children: (
//                   <Paragraph>
//                     Здесь будут файлы и ссылки на официальные документы
//                   </Paragraph>
//                 ),
//               },
//             ]}
//           />

//           <Flex align="center" justify="center" style={{ padding: "20px" }}>
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             >
//               <Link to={`/cabinet/new-claim/${level2}/${serviceItem.id}`}>
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
