import React, { useEffect } from 'react'
import useServices from '../stores/useServices';
import { useParams } from 'react-router-dom';
import { Button, Collapse, Divider, Flex, Typography } from 'antd';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import ListDocs from '../components/ServiceItem/ListDocs';
import StrapiRichText from '../components/StrapiRichText';

const { Title, Text, Paragraph } = Typography

export default function ServiceItem() {
    const serviceItem = useServices(state => state.serviceItem)
    const fetchServiceItem = useServices(state => state.fetchServiceItem)
    const { level2, level3, id } = useParams()
    useEffect(() => {
        fetchServiceItem(level2, id)
    }, [level2, level3, id])
    console.log(serviceItem)
    return (
        <div>
            {serviceItem &&
                <>

                    <Title level={1}>{serviceItem.attributes.type} - {serviceItem.attributes.name}</Title>
                    <Text>{serviceItem.attributes.shortDescription}</Text>
                    <Divider />
                    <Collapse accordion items={[
                        {
                            key: '1',
                            label: 'Описание',
                            children: <StrapiRichText content={serviceItem.attributes.description}/>,
                        },
                        {
                            key: '2',
                            label: 'Информация которая потребуется при подаче заявления',
                            children: <Paragraph>
                                {serviceItem.attributes.fields && <ListDocs list={serviceItem.attributes.fields.filter(item=>item.common.showInSpecification)} />}
                            </Paragraph>,
                        },
                        {
                            key: '3',
                            label: 'Нормативные акты и законодательство',
                            children: <Paragraph>Здесь будут файлы и ссылки на официальные документы</Paragraph>,
                        },
                    ]} />

                    <Flex  align="center" style={{ padding: "20px" }}>
                        <Button type="primary" size="large">Подать заявку</Button>
                    </Flex>
                </>
            }
        </div>
    )
}
