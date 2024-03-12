
import { Skeleton } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'

export default function Profile() {
    return (
        <div>
            <Title level={1}>Профиль</Title>

            <Skeleton.Image active style={{ marginBottom: 30 }} />
            <Skeleton active avatar paragraph={{ rows: 4 }} />
            <Skeleton active avatar paragraph={{ rows: 2 }} />
        </div>
    )
}
