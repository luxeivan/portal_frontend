import { Skeleton } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'

export default function Drafts() {
  return (
    <div>
        <Title level={1}>Черновики заявок на услуги</Title>
        
        <Skeleton active  paragraph={{ rows: 2}} />
        <Skeleton active  paragraph={{ rows: 2}} />
        <Skeleton active  paragraph={{ rows: 2}} />
        <Skeleton active  paragraph={{ rows: 2}} />
    </div>
  )
}
