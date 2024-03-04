import React, { useEffect,useState} from 'react'
import useServices from '../stores/useServices';
import { useParams } from 'react-router-dom';
import { Button, Collapse, Divider, Drawer, Flex, Steps, Typography, theme } from 'antd';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import ListDocs from '../components/ServiceItem/ListDocs';
import StrapiRichText from '../components/StrapiRichText';
import { UserOutlined } from '@ant-design/icons';
import styles from './ServicesItem.module.css'

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
                    <Text>{serviceItem.attributes.shortDescription}</Text>
                    <Divider />
                    <Steps
                        style={{ marginBottom: "20px" }}
                        // size="small"
                        // type="inline"
                        current={100}
                        items={serviceItem.attributes.steps.map(item => ({
                            icon: <div className={styles.icon} style={{ border: `2px solid ${colorPrimary}` }}><Text className={styles.iconText}>{item.id}</Text></div>,
                            title: item.name,
                            description: item.shortDescription,
                            subTitle: `${item.planDays} дней`,
                        }))}
                    />
                    <Collapse accordion items={[
                        {
                            key: '1',
                            label: 'Описание',
                            children: <StrapiRichText content={serviceItem.attributes.description} />,
                        },
                        {
                            key: '2',
                            label: 'Информация которая потребуется при подаче заявления',
                            children: <Paragraph>
                                {serviceItem.attributes.fields && <ListDocs list={serviceItem.attributes.fields.filter(item => item.common.showInSpecification)} />}
                            </Paragraph>,
                        },
                        {
                            key: '3',
                            label: 'Нормативные акты и законодательство',
                            children: <Paragraph>Здесь будут файлы и ссылки на официальные документы</Paragraph>,
                        },
                    ]} />

                    <Flex align="center" style={{ padding: "20px" }}>
                        <Button type="primary" size="large" onClick={showDrawer}>Подать заявку</Button>
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
