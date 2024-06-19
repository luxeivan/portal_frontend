import { Divider } from 'antd'
import React from 'react'

export default function DividerForm({ label = '' }) {
  return (
    <Divider>{label}</Divider>
  )
}
