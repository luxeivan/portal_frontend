import { Skeleton } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'

export default function Objects() {
  return (
    <div>
        <Title level={1}>Объекты подключения</Title>
        
        <Skeleton active avatar paragraph={{ rows: 2}} />
        <Skeleton active avatar paragraph={{ rows: 2}} />
        <Skeleton active avatar paragraph={{ rows: 2}} />
    </div>
  )
}
