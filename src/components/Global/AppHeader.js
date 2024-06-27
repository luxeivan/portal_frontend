import React, { useState, useEffect } from 'react';
import { Button, Dropdown, Layout, Menu, Space, Switch, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import logoWhite from '../../img/header/logoWhite.svg';
import logoBlue from '../../img/header/logoBlue.svg';
import useGlobal from '../../stores/useGlobal';
import useAuth from '../../stores/useAuth';
import { MenuOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import styles from './AppHeader.module.css';

const { Header } = Layout;

const items = [
  {
    key: 1,
    label: `О нас`,
    url: '/about'
  },
  {
    key: 2,
    label: `Каталог услуг`,
    url: '/services'
  },
  {
    key: 3,
    label: `Калькулятор`,
    url: '/calc'
  },
  {
    key: 4,
    label: `Контакты`,
    url: '/contacts'
  },
  {
    key: 5,
    label: `Документация`,
    url: '/docs'
  },
  {
    key: 6,
    label: `Каталог услуг(тест)`,
    url: '/servicestest'
  },
];

export default function AppHeader() {
  const { darkMode, toggleDarkMode } = useGlobal();
  const { toggleAuth, auth, logout, toggleModal } = useAuth();
  const navigate = useNavigate();
  
  const [clickCount, setClickCount] = useState(0);
  const [showPaw, setShowPaw] = useState(false);

  useEffect(() => {
    if (clickCount >= 10) {
      setShowPaw(true);
      setTimeout(() => {
        toggleDarkMode();
        setShowPaw(false);
        setClickCount(0);
      }, 1000); // Задержка для анимации лапки
    }
  }, [clickCount, toggleDarkMode]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlerChangeAuth = () => {
    toggleModal('isAuthModalOpen', true); 
  };

  const handlerDarkMode = () => {
    setClickCount(clickCount + 1);
    if (clickCount < 10) {
      toggleDarkMode();
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG, colorBgElevated, colorText },
  } = theme.useToken();

  const rightMenuArea = auth ? (
    <Space size={'small'}>
      <Switch onChange={handlerDarkMode} checkedChildren={<SunOutlined />} unCheckedChildren={<MoonOutlined />} checked={darkMode}/>
      <Button onClick={handleLogout}>Выйти</Button>
    </Space>
  ) : (
    <Space size={'small'}>
      <Switch onChange={handlerDarkMode} checkedChildren={<SunOutlined />} unCheckedChildren={<MoonOutlined />} checked={darkMode}/>
      <Button onClick={handlerChangeAuth}>Войти</Button>
    </Space>
  );

  const itemsMobile = [
    {
      label: <Link to="/about">О нас</Link>,
      key: '0',
    },
    {
      label: <Link to="/services">Каталог услуг</Link>,
      key: '1',
    },
    {
      label: <Link to="/calc">Калькулятор</Link>,
      key: '2',
    },
    {
      label: <Link to="/contacts">Контакты</Link>,
      key: '3',
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
          <img src={darkMode ? logoWhite : logoBlue} height={40} alt="Логотип компании"/>
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
        {showPaw && <div className={styles.catPaw}></div>}
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


// import React from 'react'
// import { Button, Dropdown, Layout, Menu, Space, Switch, theme } from 'antd';
// import { Link, useNavigate } from 'react-router-dom';
// import logoWhite from '../../img/header/logoWhite.svg'
// import logoBlue from '../../img/header/logoBlue.svg'
// import useGlobal from '../../stores/useGlobal';
// import useAuth from '../../stores/useAuth';
// import { MenuOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
// import styles from './AppHeader.module.css'

// const { Header } = Layout;


// const items = [
//   {
//     key: 1,
//     label: `О нас`,
//     url: '/about'
//   },
//   {
//     key: 2,
//     label: `Каталог услуг`,
//     url: '/services'
//   },
//   {
//     key: 3,
//     label: `Калькулятор`,
//     url: '/calc'
//   },
//   {
//     key: 4,
//     label: `Контакты`,
//     url: '/contacts'
//   },
//   {
//     key: 5,
//     label: `Документация`,
//     url: '/docs'
//   },
// ]


// export default function AppHeader() {
//   const { darkMode, toggleDarkMode } = useGlobal();
//   const { toggleAuth, auth, logout, toggleModal } = useAuth();

//   const navigate = useNavigate()

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };
 
//   const handlerChangeAuth = () => {
//     toggleModal('isAuthModalOpen', true); 
//   };

//   const handlerDarkMode = () => {
//     toggleDarkMode()
//   }
//   const {
//     token: { colorBgContainer, borderRadiusLG, colorBgElevated, colorText },
//   } = theme.useToken();
//   const rightMenuArea = auth ? (
//     <Space size={'small'}>
//       <Switch onChange={toggleDarkMode} checkedChildren={<SunOutlined />} unCheckedChildren={<MoonOutlined />} value={darkMode}/>
//       <Button onClick={handleLogout}>Выйти</Button>
//     </Space>
//   ) : (
//     <Space size={'small'}>
//       <Switch onChange={toggleDarkMode} checkedChildren={<SunOutlined />} unCheckedChildren={<MoonOutlined />} value={darkMode}/>
//       <Button onClick={handlerChangeAuth}>Войти</Button>
//     </Space>
//   );
//   const itemsMobile = [
//     {
//       label: <Link to="/about">О нас</Link>,
//       key: '0',
//     },
//     {
//       label: <Link to="/services">Каталог услуг</Link>,
//       key: '1',
//     },
//     {
//       label: <Link to="/calc">Калькулятор</Link>,
//       key: '2',
//     },
//     {
//       label: <Link to="/contacts">Контакты</Link>,
//       key: '3',
//     },
//     {
//       type: 'divider',
//     },
//     {
//       label: rightMenuArea,
//       key: '4',
//     },
//   ];

//   return (
//     <Header
//       className={styles.header}
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         background: colorBgContainer
//       }}
//     >
//       <div className="demo-logo" style={{ padding: 10, marginRight: 20 }}>
//         <Link to={'/'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
//           <img src={darkMode ? logoWhite : logoBlue} height={40} alt="Логотип компании"/>
//         </Link>
//       </div>


//       <Menu
//         className={styles.mainMenu}
//         theme="light"
//         mode="horizontal"
//         overflowedIndicator={<MenuOutlined />}

//         selectable={false}
//         onClick={(item, key) => {
//           navigate(item.item.props.url)
//         }}
//         items={items}
//         style={{
//           flex: 1,
//           minWidth: 0,
//         }}
//       />

//       <div className={styles.rightMenu}>
//         {rightMenuArea}
//       </div>
//       <div className={styles.mobileMenu}>

//         <Dropdown menu={{ items: itemsMobile }} trigger={['click']}>
//           <a onClick={(e) => e.preventDefault()} style={{ fontSize: "2.5rem", color: colorText, height: 100 }}>
//             <Space>
//               <MenuOutlined />
//             </Space>
//           </a>
//         </Dropdown>
//       </div>
//     </Header>
//   )
// }
