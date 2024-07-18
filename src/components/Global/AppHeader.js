import React, { useState, useEffect } from "react";
import { Button, Dropdown, Layout, Menu, Space, Switch, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import logoWhite from "../../img/header/logoWhite.svg";
import logoBlue from "../../img/header/logoBlue.svg";
import useGlobal from "../../stores/useGlobal";
import useAuth from "../../stores/useAuth";
import { MenuOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import styles from "./AppHeader.module.css";
import ErrorModal from "../FormComponentsNew/ErrorModal";

const { Header } = Layout;

const items = [
  {
    key: 1,
    label: `О нас`,
    url: "/about",
  },
  {
    key: 2,
    label: `Каталог услуг`,
    url: "/services",
  },
  {
    key: 3,
    label: `Калькулятор`,
    url: "/calc",
  },
  {
    key: 4,
    label: `Контакты`,
    url: "/contacts",
  },
  {
    key: 5,
    label: `Документация`,
    url: "/docs",
  },
];

export default function AppHeader() {
  const { darkMode, toggleDarkMode } = useGlobal();
  const { toggleAuth, auth, logout, toggleModal } = useAuth();
  const navigate = useNavigate();

  const [clickCount, setClickCount] = useState(0);
  const [showPaw, setShowPaw] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [error, setError] = useState(null); // Состояние для хранения ошибок
  const [errorVisible, setErrorVisible] = useState(false); // Состояние для управления видимостью модального окна с ошибкой

  useEffect(() => {
    try {
      if (clickCount >= 1) {
        setShowPaw(true);
        setShowSpeechBubble(true);
        setTimeout(() => {
          toggleDarkMode();
          setShowPaw(false);
          setShowSpeechBubble(false);
          setClickCount(0);
        }, 2000); // Задержка для анимации лапки и диалогового окна
      }
    } catch (err) {
      setError(err.message); // Устанавливаем ошибку в состояние
      setErrorVisible(true); // Показываем модальное окно с ошибкой
    }
  }, [clickCount, toggleDarkMode]);

  const handleLogout = () => {
    try {
      logout();
      navigate("/");
    } catch (err) {
      setError(err.message); // Устанавливаем ошибку в состояние
    }
  };

  const handlerChangeAuth = () => {
    try {
      toggleModal("isAuthModalOpen", true);
    } catch (err) {
      setError(err.message); // Устанавливаем ошибку в состояние
      setErrorVisible(true); // Показываем модальное окно с ошибкой
    }
  };

  const handlerDarkMode = () => {
    try {
      setClickCount(clickCount + 1);
      if (clickCount < 10) {
        toggleDarkMode();
      }
    } catch (err) {
      setError(err.message); // Устанавливаем ошибку в состояние
      setErrorVisible(true); // Показываем модальное окно с ошибкой
    }
  };

  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();

  const rightMenuArea = auth ? (
    <Space size={"small"}>
      <Switch
        onChange={handlerDarkMode}
        checkedChildren={<SunOutlined />}
        unCheckedChildren={<MoonOutlined />}
        checked={darkMode}
      />
      <Button onClick={handleLogout}>Выйти</Button>
    </Space>
  ) : (
    <Space size={"small"}>
      <Switch
        onChange={handlerDarkMode}
        checkedChildren={<SunOutlined />}
        unCheckedChildren={<MoonOutlined />}
        checked={darkMode}
      />
      <Button onClick={handlerChangeAuth}>Войти</Button>
    </Space>
  );

  const itemsMobile = [
    {
      label: <Link to="/about">О нас</Link>,
      key: "0",
    },
    {
      label: <Link to="/services">Каталог услуг</Link>,
      key: "1",
    },
    {
      label: <Link to="/calc">Калькулятор</Link>,
      key: "2",
    },
    {
      label: <Link to="/contacts">Контакты</Link>,
      key: "3",
    },
    {
      type: "divider",
    },
    {
      label: rightMenuArea,
      key: "4",
    },
  ];

  const closeModal = () => {
    setErrorVisible(false);
  };

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
            to={"/"}
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
          selectable={false}
          onClick={(item, key) => {
            navigate(item.item.props.url);
          }}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />

        <div className={styles.rightMenu}>
          {rightMenuArea}
          {showPaw && (
            <>
              <div className={styles.catPaw}></div>
              {showSpeechBubble && (
                <div className={styles.speechBubble}>
                  МосОблЭнерго никогда не отключают свет
                </div>
              )}
            </>
          )}
        </div>
        <div className={styles.mobileMenu}>
          <Dropdown menu={{ items: itemsMobile }} trigger={["click"]}>
            <a
              onClick={(e) => e.preventDefault()}
              style={{ fontSize: "2.5rem", color: colorText, height: 100 }}
            >
              <Space>
                <MenuOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>
      <ErrorModal visible={errorVisible} error={error} onClose={closeModal} />
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import { Button, Dropdown, Layout, Menu, Space, Switch, theme } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// import logoWhite from "../../img/header/logoWhite.svg";
// import logoBlue from "../../img/header/logoBlue.svg";
// import useGlobal from "../../stores/useGlobal";
// import useAuth from "../../stores/useAuth";
// import { MenuOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
// import styles from "./AppHeader.module.css";
// import ErrorModal from "../FormComponentsNew/ErrorModal";

// const { Header } = Layout;

// const items = [
//   {
//     key: 1,
//     label: `О нас`,
//     url: "/about",
//   },
//   {
//     key: 2,
//     label: `Каталог услуг`,
//     url: "/services",
//   },
//   {
//     key: 3,
//     label: `Калькулятор`,
//     url: "/calc",
//   },
//   {
//     key: 4,
//     label: `Контакты`,
//     url: "/contacts",
//   },
//   {
//     key: 5,
//     label: `Документация`,
//     url: "/docs",
//   },
// ];

// export default function AppHeader() {
//   const { darkMode, toggleDarkMode } = useGlobal();
//   const { toggleAuth, auth, logout, toggleModal } = useAuth();
//   const navigate = useNavigate();

//   const [clickCount, setClickCount] = useState(0);
//   const [showPaw, setShowPaw] = useState(false);
//   const [error, setError] = useState(null); // Состояние для хранения ошибок
//   const [errorVisible, setErrorVisible] = useState(false); // Состояние для управления видимостью модального окна с ошибкой

//   useEffect(() => {
//     try {
//       if (clickCount >= 1) {
//         setShowPaw(true);
//         setTimeout(() => {
//           toggleDarkMode();
//           setShowPaw(false);
//           setClickCount(0);
//         }, 2000); // Задержка для анимации лапки
//       }
//     } catch (err) {
//       setError(err.message); // Устанавливаем ошибку в состояние
//       setErrorVisible(true); // Показываем модальное окно с ошибкой
//     }
//   }, [clickCount, toggleDarkMode]);

//   const handleLogout = () => {
//     try {
//       logout();
//       navigate("/");
//     } catch (err) {
//       setError(err.message); // Устанавливаем ошибку в состояние
//     }
//   };

//   const handlerChangeAuth = () => {
//     try {
//       toggleModal("isAuthModalOpen", true);
//     } catch (err) {
//       setError(err.message); // Устанавливаем ошибку в состояние
//       setErrorVisible(true); // Показываем модальное окно с ошибкой
//     }
//   };

//   const handlerDarkMode = () => {
//     try {
//       setClickCount(clickCount + 1);
//       if (clickCount < 10) {
//         toggleDarkMode();
//       }
//     } catch (err) {
//       setError(err.message); // Устанавливаем ошибку в состояние
//       setErrorVisible(true); // Показываем модальное окно с ошибкой
//     }
//   };

//   const {
//     token: { colorBgContainer, colorText },
//   } = theme.useToken();

//   const rightMenuArea = auth ? (
//     <Space size={"small"}>
//       <Switch
//         onChange={handlerDarkMode}
//         checkedChildren={<SunOutlined />}
//         unCheckedChildren={<MoonOutlined />}
//         checked={darkMode}
//       />
//       <Button onClick={handleLogout}>Выйти</Button>
//     </Space>
//   ) : (
//     <Space size={"small"}>
//       <Switch
//         onChange={handlerDarkMode}
//         checkedChildren={<SunOutlined />}
//         unCheckedChildren={<MoonOutlined />}
//         checked={darkMode}
//       />
//       <Button onClick={handlerChangeAuth}>Войти</Button>
//     </Space>
//   );

//   const itemsMobile = [
//     {
//       label: <Link to="/about">О нас</Link>,
//       key: "0",
//     },
//     {
//       label: <Link to="/services">Каталог услуг</Link>,
//       key: "1",
//     },
//     {
//       label: <Link to="/calc">Калькулятор</Link>,
//       key: "2",
//     },
//     {
//       label: <Link to="/contacts">Контакты</Link>,
//       key: "3",
//     },
//     {
//       type: "divider",
//     },
//     {
//       label: rightMenuArea,
//       key: "4",
//     },
//   ];

//   const closeModal = () => {
//     setErrorVisible(false);
//   };

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
//           zIndex:1000
//         }}
//       >
//         <div className="demo-logo" style={{ padding: 10, marginRight: 20 }}>
//           <Link
//             to={"/"}
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
//           selectable={false}
//           onClick={(item, key) => {
//             navigate(item.item.props.url);
//           }}
//           items={items}
//           style={{
//             flex: 1,
//             minWidth: 0,
//           }}
//         />

//         <div className={styles.rightMenu}>
//           {rightMenuArea}
//           {showPaw && <div className={styles.catPaw}></div>}
//         </div>
//         <div className={styles.mobileMenu}>
//           <Dropdown menu={{ items: itemsMobile }} trigger={["click"]}>
//             <a
//               onClick={(e) => e.preventDefault()}
//               style={{ fontSize: "2.5rem", color: colorText, height: 100 }}
//             >
//               <Space>
//                 <MenuOutlined />
//               </Space>
//             </a>
//           </Dropdown>
//         </div>
//       </Header>
//       <ErrorModal visible={errorVisible} error={error} onClose={closeModal} />
//     </>
//   );
// }
