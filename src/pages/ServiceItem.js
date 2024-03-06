import React, { useEffect, useState } from 'react'
import useServices from '../stores/useServices';
import { Link, useParams } from 'react-router-dom';
import { Button, Collapse, Divider, Drawer, Flex, Steps, Typography, theme } from 'antd';
import ListDocs from '../components/ServiceItem/ListDocs';
import StrapiRichText from '../components/StrapiRichText';
import styles from './ServicesItem.module.css'
import { motion } from "framer-motion"

const { Title, Text, Paragraph } = Typography

export default function ServiceItem() {
    const [open, setOpen] = useState(false);
    const { colorPrimary } = theme.useToken().token;
    const serviceItem = useServices(state => state.serviceItem)
    const fetchServiceItem = useServices(state => state.fetchServiceItem)
    const { level2, level3, id } = useParams()
    useEffect(() => {
        fetchServiceItem(level2, id)
    }, [level2, level3, id])
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    // console.log(serviceItem)
    return (
        <div>
            {serviceItem &&
                <>

                    <Title level={1}>{serviceItem.attributes.type} - {serviceItem.attributes.name}</Title>
                    <Paragraph>{serviceItem.attributes.shortDescription}</Paragraph>
                    <Divider />

                    <Collapse
                        defaultActiveKey={['1']}
                        items={[
                            {
                                key: '1',
                                label: 'Описание',
                                children: <div>
                                    <StrapiRichText content={serviceItem.attributes.description} />
                                    <Paragraph><b>Срок подготовки документов:</b> {serviceItem.attributes.periodPreparationDocuments}</Paragraph>
                                    <Paragraph><b>Срок оказания услуги:</b> {serviceItem.attributes.periodServiceProvision}</Paragraph>
                                    <Paragraph><b>Стоимость:</b> {serviceItem.attributes.price}</Paragraph>
                                </div>,
                            },
                            {
                                key: '2',
                                label: 'Этапы',
                                children: <Steps

                                    // size="small"
                                    direction="vertical"
                                    current={100}
                                    items={serviceItem.attributes.steps.map(item => ({
                                        icon: <div className={styles.icon} style={{ border: `2px solid ${colorPrimary}` }}><Text className={styles.iconText}>{item.id}</Text></div>,
                                        title: item.name,
                                        description: item.shortDescription,
                                        subTitle: `${item.planDays} ${item.typeDay} дн.`,
                                    }))}
                                />,
                            },
                            {
                                key: '3',
                                label: 'Информация которая потребуется при подаче заявления',
                                children: <Paragraph>
                                    {serviceItem.attributes.fields && <ListDocs list={serviceItem.attributes.fields.filter(item => item.common.showInSpecification)} />}
                                </Paragraph>,
                            },
                            {
                                key: '4',
                                label: 'Нормативные акты и законодательство',
                                children: <Paragraph>Здесь будут файлы и ссылки на официальные документы</Paragraph>,
                            },
                        ]} />

                    <Flex align="center" justify="center" style={{ padding: "20px" }}>
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                            <Link to={`/cabinet/new-claim/${level2}/${serviceItem.id}`}>
                                <Button type="primary" size="large" onClick={showDrawer}>Подать заявку</Button>
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
    )
}
