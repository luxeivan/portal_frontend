import { Skeleton } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'

export default function Subjects() {
  return (
    <div>
        <Title level={1}>Субъекты</Title>
        
        <Skeleton active avatar paragraph={{ rows: 2}} />
        <Skeleton active avatar paragraph={{ rows: 2}} />
        <Skeleton active avatar paragraph={{ rows: 2}} />
        <Skeleton active avatar paragraph={{ rows: 2}} />
        <Skeleton active avatar paragraph={{ rows: 2}} />
    </div>
  )
}
