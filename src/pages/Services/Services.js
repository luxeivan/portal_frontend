import React, { useEffect } from "react";
import AppHelmet from "../../components/Global/AppHelmet";
import { Card, Flex, Typography, Spin, theme } from "antd";
import { Link, useParams } from "react-router-dom";
import useServices from "../../stores/useServices";
import styles from "./Services.module.css";
import {
  FolderOutlined,
  FileTextOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Container from "../../components/Container";
const { Title, Text } = Typography;

export default function Services() {
  const { colorPrimaryText } = theme.useToken().token;
  const isLoading = useServices((state) => state.isLoading);
  const services = useServices((state) => state.services);
  const filteredServices = useServices((state) => state.filteredServices) || [];
  const chain = useServices((state) => state.chain);
  const fetchServiceChain = useServices((state) => state.fetchServiceChain);
  const serviceItem = useServices((state) => state.serviceItem);
  const fetchServices = useServices((state) => state.fetchServices);
  const filterServices = useServices((state) => state.filterServices);
  const { level2 } = useParams();

  useEffect(() => {
    fetchServices(level2);
    fetchServiceChain(level2);
  }, [level2, fetchServices, fetchServiceChain]);

  useEffect(() => {
    filterServices();
  }, [services, filterServices]);

  return (
    <>
      <AppHelmet
        title={serviceItem ? serviceItem.Description : "Каталог услуг"}
        desc="Услуги компании"
      />
      <Container>
        {serviceItem && (
          <>
            <Flex style={{ margin: "20px 0" }}>
              {chain &&
                chain.map((item, index) => (
                  <div key={index}>
                    <Link to={`/services/${item.Ref_Key}`}>
                      {item.Description}
                    </Link>
                    <RightOutlined style={{ color: colorPrimaryText }} />
                  </div>
                ))}
            </Flex>
          </>
        )}
        {isLoading && (
          <Flex style={{ height: "300px" }} align="center" justify="center">
            <Spin size="large" />
          </Flex>
        )}
        {!isLoading && (
          <>
            <Title level={1} className={styles.title}>
              {serviceItem ? serviceItem.Description : "Каталог услуг"}
            </Title>
            {filteredServices.length > 0 && (
              <Flex wrap="wrap" gap="large" style={{ width: "100%" }}>
                {filteredServices
                  .sort((a, b) => a.Order - b.Order)
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
                        <Text>
                          {item.IsFolder ? (
                            <FolderOutlined style={{ fontSize: "50px" }} />
                          ) : (
                            <FileTextOutlined style={{ fontSize: "50px" }} />
                          )}
                        </Text>
                      </Card>
                    </Link>
                  ))}
              </Flex>
            )}
            {filteredServices.length < 1 && (
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
// import { Card, Flex, Typography, theme, Spin } from "antd";
// import { Link, useParams } from "react-router-dom";
// import useServices from "../../stores/useServices";
// import styles from "./Services.module.css";
// import {
//   FolderOutlined,
//   FileTextOutlined,
//   RightOutlined,
// } from "@ant-design/icons";
// import Container from "../../components/Container";
// const { Title, Text } = Typography;

// export default function Services() {
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
//     fetchServiceChain(level2);
//   }, [level2]);
//   console.log(services)

//   return (
//     <>
//       <AppHelmet
//         title={serviceItem ? serviceItem.Description : "Каталог услуг"}
//         desc={"Услуги компании"}
//       />
//       <Container>
//         {serviceItem && (
//           <>
//             <Flex style={{ margin: "20px 0" }}>
//               {chain &&
//                 chain.map((item, index) => (
//                   <div key={index}>
//                     <Link to={`/services/${item.Ref_Key}`}>
//                       {item.Description}
//                     </Link>
//                     <RightOutlined style={{ color: colorPrimaryText }} />
//                   </div>
//                 ))}
//             </Flex>
//           </>
//         )}
//         {isLoading && (
//           <Flex style={{ height: "300px" }} align="center" justify="center">
//             <Spin size="large" />
//           </Flex>
//         )}
//         {!isLoading && (
//           <>
//             <Title level={1} className={styles.title}>
//               {serviceItem ? serviceItem.Description : "Каталог услуг"}
//             </Title>
//     {services.length > 0 && (
//       <Flex wrap="wrap" gap="large" style={{ width: "100%" }}>
//         {services
//           .sort((a, b) => a.Order - b.Order)
//           .map((item, index) => (
//             <Link
//               key={index}
//               to={
//                 item.IsFolder
//                   ? `/services/${item.Ref_Key}`
//                   : `/services/item/${item.Ref_Key}`
//               }
//               className={styles.styleLink}
//             >
//               <Card className={styles.styleCard} hoverable>
//                 <Title level={4}>{item.Description}</Title>
//                 <Text>
//                   {item.IsFolder ? (
//                     <FolderOutlined style={{ fontSize: "50px" }} />
//                   ) : (
//                     <FileTextOutlined style={{ fontSize: "50px" }} />
//                   )}
//                 </Text>
//               </Card>
//             </Link>
//           ))}
//       </Flex>
//     )}
//     {services.length < 1 && (
//       <Title
//         level={2}
//         className={styles.title}
//         style={{ color: "#999" }}
//       >
//         Услуг в данной категории не найдено
//       </Title>
//     )}
//   </>
// )}
//       </Container>
//     </>
//   );
// }
