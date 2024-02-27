import React, { useEffect } from 'react'
import useStore from '../stores/ServicesStore';
import { useParams } from 'react-router-dom';
import { Button, Collapse, Divider, Flex, Typography } from 'antd';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import ListDocs from '../components/ServiceItem/ListDocs';

const { Title, Text, Paragraph } = Typography

export default function ServiceItem() {
    const serviceItem = useStore(state => state.serviceItem)
    const fetchServiceItem = useStore(state => state.fetchServiceItem)
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
                            children: <BlocksRenderer
                                blocks={{
                                    paragraph: ({ children }) => <Paragraph className="text-neutral900 max-w-prose">{children}</Paragraph>,
                                }}
                                content={serviceItem.attributes.description} />,
                        },
                        {
                            key: '2',
                            label: 'Информация которая потребуется при подаче заявления',
                            children: <Paragraph>
                                {serviceItem.attributes.fields && <ListDocs list={serviceItem.attributes.fields} />}
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
