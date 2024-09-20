import React, { useEffect, useState } from "react";
import AppHelmet from "../../components/Global/AppHelmet";
import { Card, Flex, Typography, theme, Image, Breadcrumb } from "antd";
import { Link, useParams, useLocation } from "react-router-dom";
import useServices from "../../stores/useServices";
import styles from "./Services.module.css";
import folder from "../../img/catalog/folder.png";
import element from "../../img/catalog/element.png";
import Container from "../../components/Container";
import Preloader from "../../components/Main/Preloader";
import ErrorModal from "../../components/ErrorModal";

const { Title } = Typography;
const backPhotoServer = process.env.REACT_APP_BACK_API_SERVER;

export default function Services() {
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
                      <Card className={styles.styleCard} hoverable>
                        <Title level={4}>{item.Description}</Title>
                        <Flex
                          justify="flex-end"
                          gap={20}
                          className={styles.cardImage}
                        >
                          <Image
                            style={{ textAlign: "center" }}
                            width={"30%"}
                            src={item.IsFolder ? folder : (item.picture ? `${backPhotoServer}/public/${item.picture['ПутьКФайлу']}` : element)}
                            preview={false}
                          />
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
