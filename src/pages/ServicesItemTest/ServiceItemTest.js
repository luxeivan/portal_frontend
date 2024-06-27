import React, { useEffect, useState } from "react";
import useServices from "../../stores/useServices";
import useServicesTest from "../../stores/useServicesTest";
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
import styles from "./ServiceItemTest.module.css";
import { motion } from "framer-motion";
import { LeftOutlined, RightOutlined, InfoCircleOutlined } from "@ant-design/icons";
import MarkDownText from "../../components/MarkDownText/MarkDownText";
import { Preloader } from "../../components/Main/Preloader";


const { Title, Text, Paragraph } = Typography;

// const sklonenie = (day) => {
//   if (day === 1) {
//     return 'день'
//   } else if (day > 1 && day < 5) {
//     return 'дня'
//   } else {
//     return 'дней'
//   }
// }

export default function ServiceItemTest() {
  const { colorPrimaryText } = theme.useToken().token;
  const [open, setOpen] = useState(false);
  const [openDrawerSteps, setOpenDrawerSteps] = useState(false);
  const { colorPrimary } = theme.useToken().token;
  const serviceItem = useServicesTest((state) => state.serviceItem);
  const fetchServiceItem = useServicesTest((state) => state.fetchServiceItem);
  const isLoading = useServicesTest((state) => state.isLoading);
  const { level2, key } = useParams();

  const chain = useServicesTest((state) => state.chain);
  const fetchServiceChain = useServicesTest((state) => state.fetchServiceChain);
  useEffect(() => {
    fetchServiceItem(key);
    //fetchServiceChain(key)
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
      {serviceItem &&
        <>

          <Flex className={styles.chainFlex}>

            {chain && chain.map((item, index) => <div key={index}><Link to={`/servicestest/${item.Ref_Key}`}>{item.Description}</Link><RightOutlined style={{ color: colorPrimaryText }} /></div>)}
          </Flex>
          {/* <Link to={`/services/${serviceItem.Parent_Key}`}><Button style={{ marginTop: "20px" }}><LeftOutlined /></Button></Link> */}
          <Title level={1} style={{ marginTop: "10px" }}>
            {/* <span style={{ color: "gray" }}>Услуга:</span><br /> */}
            {serviceItem.Description}
          </Title>
          {/* <Divider /> */}
        </>
      }
      {isLoading &&
        <Flex style={{ height: "300px" }} align="center" justify="center">
          <Preloader />
        </Flex>
      }
      {serviceItem &&
        <>


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
                    <MarkDownText>{serviceItem.fullDescription}</MarkDownText>
                    {serviceItem.DescriptionOfDocumentPreparationPeriod &&
                      <Paragraph>
                        <b>Срок подготовки документов:</b>{" "}
                        {serviceItem.DescriptionOfDocumentPreparationPeriod}
                      </Paragraph>
                    }
                    {serviceItem.DescriptionOfPeriodService &&
                      <Paragraph>
                        <b>Срок оказания услуги:</b>{" "}
                        {serviceItem.DescriptionOfPeriodService}
                      </Paragraph>
                    }
                    {serviceItem.DescriptionOfCost &&
                      <Paragraph>
                        <b>Стоимость:</b> {serviceItem.DescriptionOfCost}
                      </Paragraph>
                    }
                  </div>
                ),
              },
              {
                key: "2",
                label: "Необходимая информация для подачи заявки",
                children: (
                  <>
                    {serviceItem.fields && (
                      serviceItem.fields.filter(item=>item.component_Type.includes('ComponentsDivider')).map((item, index) => 
                        
                           <Flex vertical key={index}>
                            <Typography.Title level={5}>
                              {index+1}. {item.component_Expanded.label}
                            </Typography.Title>
                            <Paragraph>
                              {item.component_Expanded.fullDescription}
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
                    items={serviceItem?.Steps?.map((item, index) => ({
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
              <Link to={`/cabinet/new-claimtest/${serviceItem.Ref_Key}`}>
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
      }

    </div>
  );
}
