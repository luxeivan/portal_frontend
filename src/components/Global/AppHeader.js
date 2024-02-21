import React from 'react'
import { Breadcrumb, Button, Dropdown, Layout, Menu, Space, Switch, Typography, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import logoWhite from '../../img/header/logoWhite.svg'
import logoBlue from '../../img/header/logoBlue.svg'
import useStore from '../../stores/GlobalStore';
import { MenuOutlined, MoonOutlined, SunOutlined, DownOutlined } from '@ant-design/icons';
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
    token: { colorBgContainer, borderRadiusLG, colorBgElevated, colorText },
  } = theme.useToken();

  const rightMenuArea = <Space size={'small'}>
    <SunOutlined />
    <Switch onChange={handlerDarkMode} />
    <MoonOutlined />
    <Button onClick={handlerChangeAuth}>Сменить авторизацию</Button>
  </Space>
  const itemsMobile = [
    {
      label: <Link to="/services">Услуги</Link>,
      key: '0',
    },
    {
      label: <Link to="/about">О нас</Link>,
      key: '1',
    },
    {
      label: <Link to="/calc">Калькулятор</Link>,
      key: '2',
    },
    {
      type: 'divider',
    },
    {
      label: rightMenuArea,
      key: '4',
    },
  ];

  return (
    <Header
      className={styles.header}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: colorBgContainer
      }}
    >
      <div className="demo-logo" style={{ padding: 10, marginRight: 20 }}>
        <Link to={'/'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <img src={global.darkMode ? logoWhite : logoBlue} height={40} />
        </Link>
      </div>


      <Menu
        className={styles.mainMenu}
        theme="light"
        mode="horizontal"
        overflowedIndicator={<MenuOutlined />}

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
        {rightMenuArea}
      </div>
      <div className={styles.mobileMenu}>

        <Dropdown menu={{ items: itemsMobile }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()} style={{ fontSize: "2.5rem", color: colorText, height: 100 }}>
            <Space>
              <MenuOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  )
}
