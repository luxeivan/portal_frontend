import React, { useEffect } from 'react'
import useStore from '../stores/ServicesStore';
import { Link, useParams } from 'react-router-dom';
import { Collapse, Space, Typography } from 'antd';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

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
                            label: 'Требуемые документы',
                            children: <Paragraph>Здесь будут Требуемые документы</Paragraph>,
                        },
                        {
                            key: '3',
                            label: 'Нормативные акты и законодательство',
                            children: <Paragraph>Здесь будут файлы и ссылки на официальные документы</Paragraph>,
                        },
                    ]} />
                   
                </>
            }
        </div>
    )
}
