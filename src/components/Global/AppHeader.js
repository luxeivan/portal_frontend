import React from 'react'
import { Breadcrumb, Button, Layout, Menu, Space, Switch, Typography, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import logoWhite from '../../img/header/logoWhite.svg'
import logoBlue from '../../img/header/logoBlue.svg'
import useStore from '../../stores/GlobalStore';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import styles from './AppHeader.module.css'

const { Header, Content, Footer, Sider } = Layout;


const items = [
  {
    key: 1,
    label: `Услуги`,
    url: '/services'
  },
  {
    key: 2,
    label: `О нас`,
    url: '/about'
  },
  {
    key: 3,
    label: `Калькулятор`,
    url: '/calc'
  },
]

export default function AppHeader() {
  const toggleAuth = useStore((state) => state.toggleAuth)
  const toggleDarkMode = useStore((state) => state.toggleDarkMode)
  const global = useStore((state) => state.global)
  const navigate = useNavigate()
  const handlerChangeAuth = () => {
    toggleAuth()
  }
  const handlerDarkMode = () => {
    toggleDarkMode()
  }
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgElevated },
  } = theme.useToken();

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        background: colorBgContainer
      }}
    >
      <div className="demo-logo" style={{ padding: 10, marginRight: 20 }}>
        <Link to={'/'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <img src={global.darkMode ? logoWhite : logoBlue} height={40} />
        </Link>
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        selectable={false}
        onClick={(item, key) => {
          navigate(item.item.props.url)
        }}
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      />
      <div className={styles.rightMenu}>
        <Space size={'large'}>
          <Typography.Text><SunOutlined /></Typography.Text>
          <Switch onChange={handlerDarkMode} />
          <MoonOutlined />
          <Button onClick={handlerChangeAuth}>Авторизоваться</Button>
        </Space>
      </div>
    </Header>
  )
}
