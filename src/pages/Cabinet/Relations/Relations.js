import { Skeleton } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import AppHelmet from '../../../components/Global/AppHelmet'

export default function Relations() {
  return (
    <div>

      <AppHelmet title={"Доверенности"} desc={"Доверенности"} />
      <Title level={1}>Доверенности</Title>

      <Skeleton active avatar paragraph={{ rows: 2 }} />
      <Skeleton active avatar paragraph={{ rows: 2 }} />
      <Skeleton active avatar paragraph={{ rows: 2 }} />
    </div>
  )
}
