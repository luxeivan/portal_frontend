import React, { useEffect, useState } from "react";
import AppHelmet from "../../components/Global/AppHelmet";
import { Card, Flex, Typography, Image, Tag, Button, List, Layout, theme,Spin } from "antd";
import { Link, useParams } from "react-router-dom";
import useServices from "../../stores/useServices";
import styles from "./Services.module.css";
import config from "../../config";
import TagFilters from "../../components/Filters/TagFilters";
import { LeftOutlined,FolderOutlined,FileTextOutlined,RightOutlined} from "@ant-design/icons";
import Container from "../../components/Container";
const { Title, Text } = Typography;

export default function Services() {
  const isLoading = useServices((state) => state.isLoading);
  const services = useServices((state) => state.services);
  const chain = useServices((state) => state.chain);
  const fetchServiceChain = useServices((state) => state.fetchServiceChain);
  const serviceItem = useServices((state) => state.serviceItem);
  const fetchServices = useServices((state) => state.fetchServices);
  const { level2 } = useParams();
  useEffect(()=>{
    fetchServices(level2)
    fetchServiceChain(level2)
  },[level2])
  return (
    <>
      <AppHelmet title={serviceItem?serviceItem.Description:'Каталог услуг'} desc={"Услуги компании"} />
      <Container>
        {serviceItem&&
        <>
        <Flex style={{ margin: "20px 0" }}>

        {chain && chain.map((item,index)=><><Link to={`/services/${item.Ref_Key}`} key={index}>{item.Description}</Link><RightOutlined /></>)}
        </Flex>
        {/* <Link to={`/services/${serviceItem&&serviceItem.Parent_Key}`}><Button style={{ margin: "20px 0" }}><LeftOutlined /></Button></Link> */}
        </>
        }       
        {isLoading&&
        <Flex style={{height:"300px"}} align="center" justify="center">

        <Spin size="large" />
        </Flex>
        }    
        {!isLoading&&
        <>
        <Title level={1} className={styles.title}>
          {serviceItem?serviceItem.Description:'Каталог услуг'}
        </Title>
        
        <Flex wrap="wrap" gap="large" style={{ width: "100%" }}>
            {services.map((item, index) => (
            <Link
            key={index}
              to={item.IsFolder?`/services/${item.Ref_Key}`:`/services/item/${item.Ref_Key}`}
              className={styles.styleLink}
            >
              <Card className={styles.styleCard} hoverable>
                <Title level={4}>{item.Description}</Title>
                <Text>{item.IsFolder?<FolderOutlined style={{fontSize:"50px"}}/>:<FileTextOutlined style={{fontSize:"50px"}}/>}</Text>
              </Card>
            </Link>
          ))}
        </Flex>
          </>
          }    
      </Container>
    </>
  );
}


// import React, { useEffect, useState } from "react";
// import AppHelmet from "../../components/Global/AppHelmet";
// import { Card, Flex, Typography, Image, Tag, Button, List, Layout, theme } from "antd";
// import { Link, useParams } from "react-router-dom";
// import useServices from "../../stores/useServices";
// import styles from "./Services.module.css";
// import config from "../../config";
// import TagFilters from "../../components/Filters/TagFilters";
// import { LeftOutlined } from "@ant-design/icons";
// import Container from "../../components/Container";
// const { Title, Text } = Typography;

// const serviceDetailsData = [
//   {
//     url: "uslugi-tehnologicheskogo-prisoedineniyas",
//     title: "Услуги технологического присоединения",
//     content: "Подключение энергопринимающих устройств к электрическим сетям",
//     subServices: [
//       {
//         title: "Для физических лиц",
//         name: "Физические лица",
//         url: "fiz-lica"
//       },
//       {
//         title: "Для юридических лиц",
//         name: "Юридические лица",
//         url: "yur-lica"
//       },
//       {
//         title: "Для индивидуальных предпринимателей",
//         name: "Индивидуальные предприниматели",
//         url: "individual"
//       },
//       {
//         title: "Для энергосбытовых организаций",
//         name: "Энергосбытовая организация",
//         url: "energo-org"
//       },
//     ],
//   },
//   {
//     url: "kommercheskie-uslugis",
//     title: "Коммерческие услуги",
//     content: "Аренда, обслуживание, ремонт, проектирование, строительство",
//     subServices: [
//       {
//         title: "Ремонт, техническое и оперативное обслуживание",
//         name: "Ремонт, техническое и оперативное обслуживание",
//         url: "remont"
//       },
//       {
//         title: "Услуги аренды",
//         name: "Услуги аренды",
//         url: "uslugi"
//       },
//       {
//         title: "Обслуживание приборов учёта",
//         name: "Обслуживание приборов учёта",
//         url: "obslujivanie"
//       },
//       {
//         title: "Дополнительные услуги в рамках технологического присоединения",
//         name: "Дополнительные услуги в рамках технологического присоединения",
//         url: "dopuslugi"
//       },
//       {
//         title: "Освобождение земельного участка от электрических сетей",
//         name: "Освобождение земельного участка от электрических сетей",
//         url: "osvobojdenie"
//       },
//     ],
//   },
//   {
//     url: "uchet-elektricheskoj-energiis",
//     title: "Учёт электрической энергии",
//     content: "Установка и замена приборов учета",
//     subServices: [
//       {
//         title: "Для физических лиц",
//         name: "Физические лица",
//         url: "fiz-lica"
//       },
//       {
//         title: "Для юридических лиц",
//         name: "Юридические лица",
//         url: "yur-lica"
//       },
//       {
//         title: "Для индивидуальных предпринимателей",
//         name: "Индивидуальные предприниматели",
//         url: "individual"
//       },
//       {
//         title: "Сетевые организации",
//         name: "Сетевые организации",
//         url: "setevie"
//       },
//       {
//         title: "Для энергосбытовых организаций",
//         name: "Энергосбытовая организация",
//         url: "energo-org"
//       },
//     ],
//   },
//   {
//     url: "servisnye-uslugis",
//     title: "Сервисные услуги",
//     content: "Техническая поддержка пользователей",
//     subServices: [
//       {
//         title: "Актуальная информация профиля",
//         name: "Актуальная информация профиля",
//         url: "info"
//       },
//       {
//         title: "Подписка на информационные сообщения",
//         name: "Подписка на информационные сообщения",
//         url: "subscribe"
//       },
//       {
//         title: "Прочее",
//         name: "Прочее",
//         url: "other"
//       },
//     ],
//   },
// ];


// export default function Services() {
//   const { colorFill } = theme.useToken().token
//   const services = useServices((state) => state.services);
//   const fetchServices = useServices((state) => state.fetchServices);
//   const [servicesFiltered, setServicesFiltered] = useState([])
//   const [notFounded, setNotFounded] = useState(false)

//   const { level2 } = useParams();

//   const handlerFilter = (arrayForFilter,) => {
//     let tempFiltered = services
//     if (Object.keys(arrayForFilter).length == 0) return setServicesFiltered(services)
//     let temp = services.filter(service => {
//       let found = 0
//       arrayForFilter.forEach(filterItem => {
//         let serviceArr = service.attributes.filters.filter(serviceFilter => serviceFilter.__component === filterItem.component)
//         if (serviceArr.length > 0) {
//           serviceArr.forEach(item => {
//             if (filterItem.value.includes(item.value)) {
//               found = found + 1
//               console.log(item.value)
//             }
//           })
//         }
//       })
//       if (found >= arrayForFilter.length) return true
//     })
//     if (temp.length > 0) {
//       setServicesFiltered(temp)
//       setNotFounded(false)
//     } else {
//       setServicesFiltered(temp)
//       setNotFounded(true)
//     }
    
//   }

//   useEffect(() => {
//     setServicesFiltered(services)
//     //console.log(services)
//   }, [services])

//   useEffect(() => {
//     if (level2) {
//       fetchServices(level2);
//     }
//   }, [level2]);
//   return (
//     <>
//       <AppHelmet title={"Каталог услуг"} desc={"Услуги компании"} />
//       <div>
//         {!level2 && (
//           <>
//             <Container>
//               <Title level={1} className={styles.title} style={{ marginTop: "65px" }}>
//                 Каталог услуг
//               </Title>
//               <Flex wrap="wrap" gap="large" style={{ width: "100%" }}>
//                 {serviceDetailsData.map((item, index) => (
//                   <Link
//                     key={index}
//                     to={`/services/${item.url}`}
//                     className={styles.styleLink}
//                   >
//                     <Card className={styles.styleCard} hoverable>
//                       <Title level={4}>{item.title}</Title>
//                       <Text>{item.content}</Text>
//                     </Card>
//                   </Link>
//                 ))}
//               </Flex>
//             </Container>
//           </>
//         )}
//         {level2 && (
//           <>
//             <Flex gap={"middle"}>

//               <div className={styles.filters}>
//                 <TagFilters array={services} handlerFilter={handlerFilter} />
//               </div>
//               <Container>
//                 <Link to={`/services`}><Button style={{ marginTop: "20px" }}><LeftOutlined /></Button></Link>
//                 <Title level={1} className={styles.title} style={{ marginTop: "10px" }}>
//                   {serviceDetailsData.find((item) => item.url === level2).title}
//                 </Title>

//                 {notFounded && <Typography.Title style={{ color: colorFill }}>По заданному фильтру услуг не найдено</Typography.Title>}
//                 <Flex wrap="wrap" gap="large" style={{ flex: 1 }}>
//                   {servicesFiltered &&
//                     servicesFiltered.map((item) => (
//                       <Link
//                         key={item.id}
//                         to={`/services/${level2}/${item.id}`}
//                         className={styles.styleLink}
//                       >
//                         <Card key={item.id} className={styles.styleCard} hoverable>
//                           <div className={styles.cardContent}>
//                             <Title level={4}>{item.attributes.name}</Title>
//                             {item.attributes.filters.length > 0 &&
//                               <List
//                                 size="small"
//                                 dataSource={item.attributes.filters}
//                                 renderItem={(item) => <Typography.Paragraph><span style={{ fontWeight: 700 }}>{item.name}:</span> <span>{item.value}</span> {item.value1?.map((val, index) => <span>{val + (index === item.value1.length - 1 ? '' : ',')} </span>)}</Typography.Paragraph>}
//                               />
//                             }
//                           </div>
//                           {item.attributes.icon.data && (
//                             <Flex
//                               justify="flex-end"
//                               gap={20}
//                               className={styles.cardImage}
//                             >
//                               <Image
//                                 style={{ textAlign: "center" }}
//                                 width={"50%"}
//                                 src={`${config.apiServer}${item.attributes.icon?.data?.attributes?.url}`}
//                                 preview={false}
//                               />
//                             </Flex>
//                           )}
//                         </Card>
//                       </Link>
//                     ))}
//                 </Flex>
//               </Container>

//             </Flex>

//           </>
//         )}
//       </div>
//     </>
//   );
// }