import React from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


export default function AppFooter() {
  return (
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      АО Мособлэнерго ©{new Date().getFullYear()} Создано Шишкин & Януть
    </Footer>
  )
}
