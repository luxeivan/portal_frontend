import { Skeleton } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'

export default function Relations() {
  return (
    <div>
        <Title level={1}>Доверенности</Title>
        
        <Skeleton active avatar paragraph={{ rows: 2}} />
        <Skeleton active avatar paragraph={{ rows: 2}} />
        <Skeleton active avatar paragraph={{ rows: 2}} />
    </div>
  )
}
