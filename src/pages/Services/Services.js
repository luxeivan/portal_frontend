import React, { useEffect, useState } from "react";
import AppHelmet from "../../components/Global/AppHelmet";
import { Card, Flex, Typography, theme, Image, Breadcrumb, Tag } from "antd";
import { Link, useParams, useLocation } from "react-router-dom";
import useServices from "../../stores/useServices";
import styles from "./Services.module.css";
import folder from "../../img/catalog/folder.png";
import element from "../../img/catalog/element.png";
import Container from "../../components/Container";
import Preloader from "../../components/Main/Preloader";
import ErrorModal from "../../components/ErrorModal";
import { IconConnect } from "../../components/icons/IconConnect";

const { Title } = Typography;
const backPhotoServer = process.env.REACT_APP_BACK_API_SERVER;

export default function Services() {
  const [isHoverCard, setIsHoverCard] = useState({})
  const location = useLocation();
  const { colorPrimaryText } = theme.useToken().token;
  const isLoading = useServices((state) => state.isLoading);
  const services = useServices((state) => state.services);
  const chain = useServices((state) => state.chain);
  const error = useServices((state) => state.error);
  const fetchServiceChain = useServices((state) => state.fetchServiceChain);
  const serviceItem = useServices((state) => state.serviceItem);
  const fetchServices = useServices((state) => state.fetchServices);
  const { level2 } = useParams();

  // const [error, setError] = useState(null); // Состояние для хранения ошибок

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchServices(level2);
      } catch (err) {
        console.error("Ошибка при загрузке услуг:", err); // Логирование ошибки
        // setError(err.message || "Произошла ошибка при загрузке услуг");
      }
    };

    fetchData();
  }, [level2, fetchServices, fetchServiceChain]);
  // console.log(services)
  return (
    <>
      <AppHelmet
        title={serviceItem ? serviceItem.Description : "Каталог услуг"}
        desc="Услуги компании"
      />
      <Container>
        {serviceItem && (
          <>
            <Breadcrumb
              itemRender={(currentRoute) => {
                return <Link to={currentRoute.href}>{currentRoute.title}</Link>
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
                {services
                  .sort((a, b) => a.order - b.order)
                  .map((item, index) => (
                    <Link
                      key={index}
                      to={
                        item.IsFolder
                          ? `/services/${item.Ref_Key}`
                          : `/services/item/${item.Ref_Key}`
                      }
                      className={styles.styleLink}
                    >
                      <Card
                        onMouseEnter={() => setIsHoverCard({ ...isHoverCard, [index]: true })}
                        onMouseLeave={() => setIsHoverCard({ ...isHoverCard, [index]: false })}
                        className={styles.styleCard}
                        // style={{ backgroundImage: `url(${item.IsFolder ? folder : (item.picture ? `${backPhotoServer}/public/${item.picture['ПутьКФайлу']}` : element)})` }}
                        hoverable
                      // styles={{ body: { backgroundImage: folder } }}
                      //styles={{body:{ backgroundImage: `url(${item.IsFolder ? folder : (item.picture ? `${backPhotoServer}/public/${item.picture['ПутьКФайлу']}` : element)})` }}}
                      >
                        <Title level={4} className={styles.cardTitle}>{item.Description}</Title>

                        <Flex
                          justify={!item.IsFolder ? "space-between" : "flex-end"}
                          align="center"
                          // justify="flex-end"
                          gap={20}
                          // className={styles.cardImage}
                          style={{ width: "100%" }}
                        >
                          {!item.IsFolder &&
                            <Flex vertical gap={10} >
                              <Tag className={styles.tags} color="red">до 15 кВт</Tag>
                              <Tag className={styles.tags} color="blue">I Категории</Tag>
                              <Tag className={styles.tags} color="blue">II Категории</Tag>
                              <Tag className={styles.tags} color="blue">III Категории</Tag>
                              <Tag className={styles.tags} color="green">для бытовых нужд</Tag>
                            </Flex>
                          }
                          <Flex align="center" justify="center" style={{ width: !item.IsFolder ? "50%" : "20%" }}>
                            {/* <Flex
                              align="center"
                              justify="center"
                              style={{
                                border: "2px solid #f37021",
                                background: "rgba(255,120,0,.3)",
                                width: 120,
                                height: 120,
                                borderRadius: 20, boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)"
                              }}
                            >
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="60" version="1.1" viewBox="0 0 83.99 118.06">
                                    <polygon className={styles.svg} points="51.39,2.48 2.48,65.64 31.63,65.32 32.14,115.58 81.51,51.7 51.57,51.84 " />                                 
                                </svg>
                              </div>
                            </Flex> */}
                            <IconConnect
                              isHover={isHoverCard[index]}
                              style={{ textAlign: "center", width: "100%", height: 200 }}
                            />
                            {/* <Image
                              style={{ textAlign: "center", width: "100%" }}
                              // width={"50%"}
                              src={item.IsFolder ? folder : (item.picture ? `${backPhotoServer}/public/${item.picture['ПутьКФайлу']}` : element)}
                              preview={false}
                            /> */}
                          </Flex>
                        </Flex>
                      </Card>
                    </Link>
                  ))}
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

// import React, { useEffect } from "react";
// import AppHelmet from "../../components/Global/AppHelmet";
// import { Card, Flex, Typography, Spin, theme, Image, Breadcrumb } from "antd";
// import { Link, useParams, useLocation } from "react-router-dom";
// import useServices from "../../stores/useServices";
// import styles from "./Services.module.css";
// import folder from '../../img/catalog/folder.png'
// import element from '../../img/catalog/element.png'
// import {
//   FolderOutlined,
//   FileTextOutlined,
//   RightOutlined,
// } from "@ant-design/icons";
// import Container from "../../components/Container";
// import Preloader from "../../components/Main/Preloader";
// const { Title, Text } = Typography;

// export default function Services() {
//   const location = useLocation();
//   const { colorPrimaryText } = theme.useToken().token;
//   const isLoading = useServices((state) => state.isLoading);
//   const services = useServices((state) => state.services);
//   const chain = useServices((state) => state.chain);
//   const fetchServiceChain = useServices((state) => state.fetchServiceChain);
//   const serviceItem = useServices((state) => state.serviceItem);
//   const fetchServices = useServices((state) => state.fetchServices);
//   const { level2 } = useParams();

//   useEffect(() => {
//     fetchServices(level2);
//   }, [level2, fetchServices, fetchServiceChain]);
// console.log(services)
//   return (
//     <>
//       <AppHelmet
//         title={serviceItem ? serviceItem.Description : "Каталог услуг"}
//         desc="Услуги компании"
//       />
//       <Container>
//         {serviceItem &&
//           <>
//             <Breadcrumb items={!(location.pathname == '/services'||location.pathname == '/services/') && chain && chain.map(item => ({
//               href: `/services/${item.Ref_Key}`,
//               title: item.Description
//             }))} />
//           </>
//         }
//         {isLoading &&
//           <Flex style={{ height: "300px" }} align="center" justify="center">
//             <Preloader />
//           </Flex>
//         }
//         {!isLoading &&
//           <>
//             <Title level={1} className={styles.title}>
//               {serviceItem ? serviceItem.Description : 'Каталог услуг'}
//             </Title>
//             {services.length > 0 &&
//               <Flex wrap="wrap" gap="large" style={{ width: "100%" }}>
//                 {services.sort((a, b) => a.order - b.order).map((item, index) => (
//                   <Link
//                     key={index}
//                     to={item.IsFolder ? `/services/${item.Ref_Key}` : `/services/item/${item.Ref_Key}`}
//                     className={styles.styleLink}
//                   >
//                     <Card className={styles.styleCard} hoverable>
//                       <Title level={4}>{item.Description}</Title>
//                       <Flex
//                         justify="flex-end"
//                         gap={20}
//                         className={styles.cardImage}
//                       >
//                         <Image
//                           style={{ textAlign: "center" }}
//                           width={"30%"}
//                           src={item.IsFolder ? folder : element}
//                           preview={false}
//                         />
//                       </Flex>
//                     </Card>
//                   </Link>
//                 ))}
//               </Flex>
//             }
//             {services.length < 1 &&
//               <Title level={2} className={styles.title} style={{ color: "#999" }}>
//                 Услуг в данной категории не найдено
//               </Title>
//             }
//           </>
//         }
//       </Container>
//     </>
//   );
// }
