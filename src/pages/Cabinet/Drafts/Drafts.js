import { Skeleton } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import AppHelmet from '../../../components/Global/AppHelmet'

export default function Drafts() {
  return (
    <div>
      
      <AppHelmet title={"Черновики"} desc={"Черновики заявок на услуги"} />
      <Title level={1}>Черновики заявок на услуги</Title>

      <Skeleton active paragraph={{ rows: 2 }} />
      <Skeleton active paragraph={{ rows: 2 }} />
      <Skeleton active paragraph={{ rows: 2 }} />
      <Skeleton active paragraph={{ rows: 2 }} />
    </div>
  )
}
