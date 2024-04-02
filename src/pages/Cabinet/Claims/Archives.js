import React from 'react'
import { Skeleton } from 'antd'
import Title from 'antd/es/typography/Title'
import { useParams } from 'react-router-dom'

export default function Archives() {
    const { id } = useParams()
    return (
        <div>
            <Title level={1}>Список завершенных услуг</Title>
            
            <Skeleton active avatar paragraph={{ rows: 2 }} />
            <Skeleton active avatar paragraph={{ rows: 2 }} />
            <Skeleton active avatar paragraph={{ rows: 2 }} />
        </div>
    )
}
