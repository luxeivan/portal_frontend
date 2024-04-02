import React from 'react'
import { Skeleton } from 'antd'
import Title from 'antd/es/typography/Title'
import { useParams } from 'react-router-dom'

export default function Claimers() {
    const { id } = useParams()
    return (
        <div>
            <Title level={1}>Список ЛКЗ</Title>
            
            <Skeleton active avatar paragraph={{ rows: 2 }} />
            <Skeleton active avatar paragraph={{ rows: 2 }} />
            <Skeleton active avatar paragraph={{ rows: 2 }} />
        </div>
    )
}
