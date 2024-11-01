import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Space,
  Switch,
  Badge,
  Drawer,
  Button,
  Tooltip,
  theme,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  MenuOutlined,
  MoonOutlined,
  SunOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logoWhite from "../../img/header/logoWhite.svg";
import logoBlue from "../../img/header/logoBlue.svg";
import useGlobal from "../../stores/useGlobal";
import useAuth from "../../stores/useAuth";
import useNotifications from "../../stores/useNotifications";
import useProfile from "../../stores/Cabinet/useProfile"; // Import profile store
import NotificationList from "../../components/FormComponentsNew/Notifications/NotificationPanel";
import ModalBot from "./ModalBot";
import styles from "./AppHeader.module.css";
import ErrorModal from "../ErrorModal";

const { Header } = Layout;

const items = [
  {
    key: "/about",
    label: <Link to={"/about"}>О нас</Link>,
  },
  {
    key: "/services",
    label: <Link to={"/services"}>Каталог услуг</Link>,
  },
  {
    key: "/calc",
    label: <Link to={"/calc"}>Калькулятор</Link>,
  },
  {
    key: "/contacts",
    label: <Link to={"/contacts"}>Контакты</Link>,
  },
  {
    key: "/docs",
    label: <Link to={"/docs"}>Документация</Link>,
  },
];

export default function AppHeader() {
  const { darkMode, toggleDarkMode, currentPage, setCurrentPage } = useGlobal();
  const { auth, logout, toggleModal } = useAuth();
  const { getUnreadCount } = useNotifications();
  const { profile, fetchProfile } = useProfile(); // Access profile and fetchProfile

  const navigate = useNavigate();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const [errorVisible, setErrorVisible] = useState(false);

  useEffect(() => {
    if (auth) {
      fetchProfile();
    }
  }, [auth, fetchProfile]);

  const handleLogout = () => {
    try {
      logout();
      setCurrentPage("/");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handlerChangeAuth = () => {
    try {
      toggleModal("isAuthModalOpen", true);
    } catch (err) {
      setError(err.message);
      setErrorVisible(true);
    }
  };

  const handlerDarkMode = () => {
    try {
      toggleDarkMode();
    } catch (err) {
      setError(err.message);
      setErrorVisible(true);
    }
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const closeModal = () => {
    setErrorVisible(false);
  };

  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();

  const rightMenuArea = (
    <div className={styles.rightMenu}>
      <QuestionCircleOutlined
        style={{ fontSize: "20px", cursor: "pointer", color: colorText }}
        onClick={() => setChatModalVisible(true)}
      />
      <Switch
        onChange={handlerDarkMode}
        checkedChildren={<SunOutlined />}
        unCheckedChildren={<MoonOutlined />}
        checked={darkMode}
        style={{ background: !darkMode && colorText }}
      />
      <Badge count={getUnreadCount()} overflowCount={9}>
        <BellOutlined
          style={{ fontSize: "20px", cursor: "pointer", color: colorText }}
          onClick={showDrawer}
        />
      </Badge>
      {auth ? (
        <div className={styles.userInfo}>
          <Tooltip title={profile.email}>
            <UserOutlined style={{ fontSize: "20px", color: colorText }} />
            <span className={styles.userEmail}>
              {profile.email ? profile.email : "Пользователь"}
            </span>
          </Tooltip>
          <Button type="primary" onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      ) : (
        <Button type="primary" onClick={handlerChangeAuth}>
          Войти
        </Button>
      )}
    </div>
  );

  const itemsMobile = [
    {
      label: (
        <Space size="middle">
          <Link to="/about">О нас</Link>
        </Space>
      ),
      key: "/about",
    },
    {
      label: <Link to="/services">Каталог услуг</Link>,
      key: "/services",
    },
    {
      label: <Link to="/calc">Калькулятор</Link>,
      key: "/calc",
    },
    {
      label: <Link to="/contacts">Контакты</Link>,
      key: "/contacts",
    },
    {
      label: (
        <Space size="middle">
          <Link to="/docs">Документация</Link>
        </Space>
      ),
      key: "/docs",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Space size="middle">
          <Switch
            onChange={handlerDarkMode}
            checkedChildren={<SunOutlined />}
            unCheckedChildren={<MoonOutlined />}
            checked={darkMode}
          />
          {auth ? (
            <Button type="primary" onClick={handleLogout}>
              Выйти
            </Button>
          ) : (
            <Button type="primary" onClick={handlerChangeAuth}>
              Войти
            </Button>
          )}
        </Space>
      ),
      key: "auth",
    },
  ];

  return (
    <>
      <Header
        className={styles.header}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: colorBgContainer,
          position: "fixed",
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <div className="demo-logo" style={{ padding: 10, marginRight: 20 }}>
          <Link
            to="/"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={darkMode ? logoWhite : logoBlue}
              height={40}
              alt="Логотип компании"
            />
          </Link>
        </div>

        <Menu
          className={styles.mainMenu}
          theme="light"
          mode="horizontal"
          overflowedIndicator={<MenuOutlined />}
          selectedKeys={[currentPage]}
          onClick={({ key }) => {
            setCurrentPage(key);
          }}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />

        <div className={styles.rightMenu}>{rightMenuArea}</div>
        <div className={styles.mobileMenu}>
          <Menu
            mode="horizontal"
            overflowedIndicator={<MenuOutlined />}
            items={itemsMobile}
            selectedKeys={[currentPage]}
            onClick={({ key }) => {
              if (key !== "auth") setCurrentPage(key);
            }}
          />
        </div>
      </Header>

      <Drawer
        title="Уведомления"
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
      >
        <NotificationList />
      </Drawer>

      <ModalBot
        visible={chatModalVisible}
        onClose={() => setChatModalVisible(false)}
      />

      <ErrorModal visible={errorVisible} error={error} onClose={closeModal} />
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import {
//   Layout,
//   Menu,
//   Space,
//   Switch,
//   Badge,
//   Drawer,
//   Button,
//   theme,
//   Flex,
// } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   MenuOutlined,
//   MoonOutlined,
//   SunOutlined,
//   BellOutlined,
//   QuestionCircleOutlined,
// } from "@ant-design/icons";
// import logoWhite from "../../img/header/logoWhite.svg";
// import logoBlue from "../../img/header/logoBlue.svg";
// import useGlobal from "../../stores/useGlobal";
// import useAuth from "../../stores/useAuth";
// import useNotifications from "../../stores/useNotifications";
// import NotificationList from "../../components/FormComponentsNew/Notifications/NotificationPanel";
// import ModalBot from "./ModalBot"; // Импортируем компонент ModalBot
// import styles from "./AppHeader.module.css";
// import ErrorModal from "../ErrorModal";

// const { Header } = Layout;

// const items = [
//   {
//     key: "/about",
//     label: <Link to={"/about"}>О нас</Link>,
//   },
//   {
//     key: "/services",
//     label: <Link to={"/services"}>Каталог услуг</Link>,
//   },
//   {
//     key: "/calc",
//     label: <Link to={"/calc"}>Калькулятор</Link>,
//   },
//   {
//     key: "/contacts",
//     label: <Link to={"/contacts"}>Контакты</Link>,
//   },
//   {
//     key: "/docs",
//     label: <Link to={"/docs"}>Документация</Link>,
//   },
// ];

// export default function AppHeader() {
//   const { darkMode, toggleDarkMode, currentPage, setCurrentPage } = useGlobal();
//   const { auth, logout, toggleModal } = useAuth();
//   const { getUnreadCount } = useNotifications();

//   const navigate = useNavigate();

//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [chatModalVisible, setChatModalVisible] = useState(false); // Состояние для модального окна чата
//   const [error, setError] = useState(null);
//   const [errorVisible, setErrorVisible] = useState(false);

//   useEffect(() => {}, [currentPage]);

//   const handleLogout = () => {
//     try {
//       logout();
//       setCurrentPage("/");
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handlerChangeAuth = () => {
//     try {
//       toggleModal("isAuthModalOpen", true);
//     } catch (err) {
//       setError(err.message);
//       setErrorVisible(true);
//     }
//   };

//   const handlerDarkMode = () => {
//     try {
//       toggleDarkMode();
//     } catch (err) {
//       setError(err.message);
//       setErrorVisible(true);
//     }
//   };

//   const showDrawer = () => {
//     setDrawerVisible(true);
//   };

//   const closeDrawer = () => {
//     setDrawerVisible(false);
//   };

//   const closeModal = () => {
//     setErrorVisible(false);
//   };

//   const {
//     token: { colorBgContainer, colorText },
//   } = theme.useToken();

//   const rightMenuArea = (
//     <Flex gap={15} align="center">
//       <QuestionCircleOutlined
//         style={{ fontSize: "20px", cursor: "pointer", color: colorText }}
//         onClick={() => setChatModalVisible(true)}
//       />
//       <Switch
//         onChange={handlerDarkMode}
//         checkedChildren={<SunOutlined />}
//         unCheckedChildren={<MoonOutlined />}
//         checked={darkMode}
//         style={{ background: !darkMode && colorText }}
//       />
//       <Badge count={getUnreadCount()} overflowCount={9}>
//         <BellOutlined
//           style={{ fontSize: "20px", cursor: "pointer", color: colorText }}
//           onClick={showDrawer}
//         />
//       </Badge>
//       {auth ? (
//         <Button type="primary" onClick={handleLogout}>
//           Выйти
//         </Button>
//       ) : (
//         <Button type="primary" onClick={handlerChangeAuth}>
//           Войти
//         </Button>
//       )}
//     </Flex>
//   );

//   const itemsMobile = [
//     {
//       label: (
//         <Space size="middle">
//           <Link to="/about">О нас</Link>
//         </Space>
//       ),
//       key: "/about",
//     },
//     {
//       label: <Link to="/services">Каталог услуг</Link>,
//       key: "/services",
//     },
//     {
//       label: <Link to="/calc">Калькулятор</Link>,
//       key: "/calc",
//     },
//     {
//       label: <Link to="/contacts">Контакты</Link>,
//       key: "/contacts",
//     },
//     {
//       label: (
//         <Space size="middle">
//           <Link to="/docs">Документация</Link>
//         </Space>
//       ),
//       key: "/docs",
//     },
//     {
//       type: "divider",
//     },
//     {
//       label: (
//         <Space size="middle">
//           <Switch
//             onChange={handlerDarkMode}
//             checkedChildren={<SunOutlined />}
//             unCheckedChildren={<MoonOutlined />}
//             checked={darkMode}
//           />
//           {auth ? (
//             <Button type="primary" onClick={handleLogout}>
//               Выйти
//             </Button>
//           ) : (
//             <Button type="primary" onClick={handlerChangeAuth}>
//               Войти
//             </Button>
//           )}
//         </Space>
//       ),
//       key: "auth",
//     },
//   ];

//   return (
//     <>
//       <Header
//         className={styles.header}
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           background: colorBgContainer,
//           position: "fixed",
//           left: 0,
//           right: 0,
//           zIndex: 1000,
//         }}
//       >
//         <div className="demo-logo" style={{ padding: 10, marginRight: 20 }}>
//           <Link
//             to="/"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <img
//               src={darkMode ? logoWhite : logoBlue}
//               height={40}
//               alt="Логотип компании"
//             />
//           </Link>
//         </div>

//         <Menu
//           className={styles.mainMenu}
//           theme="light"
//           mode="horizontal"
//           overflowedIndicator={<MenuOutlined />}
//           selectedKeys={[currentPage]}
//           onClick={({ key }) => {
//             setCurrentPage(key);
//           }}
//           items={items}
//           style={{
//             flex: 1,
//             minWidth: 0,
//           }}
//         />

//         <div className={styles.rightMenu}>{rightMenuArea}</div>
//         <div className={styles.mobileMenu}>
//           <Menu
//             mode="horizontal"
//             overflowedIndicator={<MenuOutlined />}
//             items={itemsMobile}
//             selectedKeys={[currentPage]}
//             onClick={({ key }) => {
//               if (key !== "auth") setCurrentPage(key);
//             }}
//           />
//         </div>
//       </Header>

//       <Drawer
//         title="Уведомления"
//         placement="right"
//         onClose={closeDrawer}
//         open={drawerVisible}
//       >
//         <NotificationList />
//       </Drawer>

//       {/* Используем компонент ModalBot */}
//       <ModalBot
//         visible={chatModalVisible}
//         onClose={() => setChatModalVisible(false)}
//       />

//       <ErrorModal visible={errorVisible} error={error} onClose={closeModal} />
//     </>
//   );
// }
