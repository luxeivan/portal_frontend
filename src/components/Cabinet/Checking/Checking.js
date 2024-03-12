import { Skeleton } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'

export default function Checking() {
  return (
    <div>
        <Title level={1}>Заявки на проверке</Title>
        
        <Skeleton active  paragraph={{ rows: 2}} />
        <Skeleton active  paragraph={{ rows: 2}} />
        <Skeleton active  paragraph={{ rows: 2}} />
        <Skeleton active  paragraph={{ rows: 2}} />
    </div>
  )
}
