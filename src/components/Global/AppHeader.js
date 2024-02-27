import React from 'react'
import { Button, Dropdown, Layout, Menu, Space, Switch, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import logoWhite from '../../img/header/logoWhite.svg'
import logoBlue from '../../img/header/logoBlue.svg'
import useStore from '../../stores/GlobalStore';
import { MenuOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import styles from './AppHeader.module.css'

const { Header } = Layout;


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
  const openAuthModal = useStore((state) => state.openAuthModal)
  const toggleDarkMode = useStore((state) => state.toggleDarkMode)
  const logout = useStore((state) => state.logout);

  const global = useStore((state) => state.global)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
  };
 
  const { toggleModal } = useStore();

  const handlerChangeAuth = () => {
    toggleModal('isAuthModalOpen', true); 
  };

  const handlerDarkMode = () => {
    toggleDarkMode()
  }
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgElevated, colorText },
  } = theme.useToken();

  // const rightMenuArea = <Space size={'small'}>
  //   <SunOutlined style={{fontSize:"12px"}}/>
  //   <Switch size="small" onChange={handlerDarkMode} />
  //   <MoonOutlined style={{fontSize:"12px"}}/>
  //   <Button onClick={handlerChangeAuth}>Кабинет</Button>
  // </Space>

  const rightMenuArea = global.auth ? (
    <Space size={'small'}>
      {/* <SunOutlined style={{ fontSize: "12px" }} /> */}
      <Switch  onChange={handlerDarkMode} checkedChildren={<SunOutlined style={{fontSize:"12px"}}/>} unCheckedChildren={<MoonOutlined style={{fontSize:"12px"}}/>} />
      {/* <MoonOutlined style={{ fontSize: "12px" }} /> */}
      <Button onClick={handleLogout}>Выйти</Button>
    </Space>
  ) : (
    <Space size={'small'}>
      {/* <SunOutlined style={{ fontSize: "12px" }} /> */}
      <Switch  onChange={handlerDarkMode} checkedChildren={<SunOutlined style={{fontSize:"12px"}}/>} unCheckedChildren={<MoonOutlined style={{fontSize:"12px"}}/>} />
      {/* <MoonOutlined style={{ fontSize: "12px" }} /> */}
      <Button onClick={handlerChangeAuth}>Кабинет</Button>
    </Space>
  );
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
          <img src={global.darkMode ? logoWhite : logoBlue} height={40} alt="Логотип компании"/>
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
