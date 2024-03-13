import { Skeleton } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function Claims() {
    const { id } = useParams()
    return (
        <div>
            <Title level={1}>Заявки ЛКЗ №{id}</Title>
            
            <Skeleton active avatar paragraph={{ rows: 2 }} />
            <Skeleton active avatar paragraph={{ rows: 2 }} />
            <Skeleton active avatar paragraph={{ rows: 2 }} />
        </div>
    )
}
