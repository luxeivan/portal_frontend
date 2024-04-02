import { Skeleton } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import AppHelmet from '../../../components/Global/AppHelmet'

export default function Objects() {
  return (
    <div>
      <AppHelmet title={"Объекты"} desc={"Объекты подключения"} />
      <Title level={1}>Объекты подключения</Title>

      <Skeleton active avatar paragraph={{ rows: 2 }} />
      <Skeleton active avatar paragraph={{ rows: 2 }} />
      <Skeleton active avatar paragraph={{ rows: 2 }} />
    </div>
  )
}
