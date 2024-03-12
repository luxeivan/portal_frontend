import React, { useState } from "react";
// import { Flex, Menu, Typography } from "antd";
import { Button, Flex, Menu, Typography, ConfigProvider } from "antd";
import {
  UserOutlined,
  ProfileOutlined,
  EnvironmentOutlined,
  PlusSquareOutlined,
  RetweetOutlined,
  CheckCircleOutlined,
  FolderOpenOutlined,
  DownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MenuOutlined
} from "@ant-design/icons";
import styles from "./CabinetMenu.module.css";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
// Иконки и пункты меню для нижней навигации
// const styleForIcon = { fontSize: "2rem" }
const menuItems = [
  {
    key: "/services",
    icon: <PlusSquareOutlined className={styles.icon} />,
    label: "Новая",
  },
  {
    key: "/cabinet/profile",
    icon: <ProfileOutlined className={styles.icon} />,
    label: "Профиль",
  },
  {
    key: "/cabinet/subjects",
    icon: <UserOutlined className={styles.icon} />,
    label: "Субъекты",
  },
  {
    key: "/cabinet/relations",
    icon: <RetweetOutlined  className={styles.icon} />,
    label: "Доверенности",
  },
  {
    key: "/cabinet/objects",
    icon: <EnvironmentOutlined  className={styles.icon} />,
    label: "Объекты",
  },
  {
    key: "/cabinet/drafts",
    icon: <FolderOpenOutlined className={styles.icon} />,
    label: "Черновики",
  },
  {
    key: "/cabinet/checking",
    icon: <CheckCircleOutlined className={styles.icon} />,
    label: "На проверке",
  },
  {
    key: "submenu",
    icon: <DownOutlined className={styles.icon} />,
    label: 'Заявки от:',
    children: [
      {
        key: "/cabinet/claimer/1",
        label: "Иванов Иван Иванович",
      },
      {
        key: "/cabinet/claimer/2",
        label: "ИП Гослинг Райан",
      },
      {
        key: "/cabinet/claimer/3",
        label: "ООО Драйв",
      },
    ],
  },
];
const menuItemsMobile = menuItems.map(item => ({
  key: item.key,
  label: <Flex vertical align="center" justify="center" className={styles.menuItem}>
    <div>
      <Text>{item.icon}</Text>
    </div>
    <Text>{item.label}</Text>
  </Flex>,
  children: item.children,
}))

export default function CabinetMenu() {
  // let mobile = false;
  // if (
  //   /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
  //   mobile = true;
  // }
  const navigator = useNavigate()
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handlerMenu = ({ item, key, keyPath, domEvent }) => {
    // console.log(key)
    navigator(key)
  }

  return (


    <div className={styles.menuContainer}>

      <div className={styles.desktop}>
        <Button
          type="secondary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
          }}
        >
          {collapsed ? (
            <Text>
              <MenuUnfoldOutlined />
              Развернуть
            </Text>
          ) : (
            <Text>
              <MenuFoldOutlined />
              Свернуть
            </Text>
          )}
        </Button>
      </div>
      {/* ----------------------------------------------------------------------- */}
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemHeight: 60,
              iconSize: 30,
              itemPaddingInline: 10,
              dropdownWidth: 100
            },
          },
        }}
      >
        <div className={styles.mobile}>
          <Flex vertical >
            <Menu
              style={{ justifyContent: "space-between" }}
              selectable={false}
              inlineCollapsed={collapsed}
              mode={"horizontal"}
              items={menuItemsMobile}
              overflowedIndicator={<Flex vertical align="center" justify="center" className={styles.menuItem}>
                <div>
                  <Text><MenuOutlined /></Text>
                </div>
                <Text>Еще</Text>
              </Flex>}
              onClick={handlerMenu}
            />
          </Flex>
        </div>
      </ConfigProvider>
      {/* ----------------------------------------------------------------------- */}
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemHeight: 50,
              iconSize: 24,
              collapsedWidth: 60,
              collapsedIconSize: 24,
              itemPaddingInline: 10,
            },
          },
        }}
      >

        <div className={styles.desktop}>
          <Flex vertical className={styles.menuItem}>
            <Menu
              selectable={false}
              inlineCollapsed={collapsed}
              mode={"inline"}
              items={menuItems}
              onClick={handlerMenu}
              />
          </Flex>
        </div>
      </ConfigProvider>
    </div>
  );
}


//Второй вариант
// import React, { useState } from "react";
// import { Button, Flex, Menu, Typography } from "antd";
// import {
//   LaptopOutlined,
//   NotificationOutlined,
//   UserOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
// } from "@ant-design/icons";
// import styles from "./CabinetMenu.module.css";

// const { Text } = Typography;

// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     // const key = String(index + 1);
//     return {
//       // key: `sub${key}`,
//       // icon: React.createElement(icon),
//       label: (
//         <Flex
//           vertical
//           align="center"
//           justify="center"
//           style={{ lineHeight: "25px" }}
//         >
//           <div>
//             <UserOutlined />
//           </div>
//           <Text>Подать заявку</Text>
//         </Flex>

//       ),
//       children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: `Опция ${subKey}`,
//         };
//       }),
//     };
//   }
// );

// export default function CabinetMenu() {
//   const [collapsed, setCollapsed] = useState(false);
//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   let mobile = false;
//   if (
//     /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
//       navigator.userAgent
//     )
//   ) {
//     mobile = true;
//   }

//   return (
// <div className={styles.menuContainer}>
//   <Button
//     type="secondary"
//     onClick={toggleCollapsed}
//     style={{
//       marginBottom: 16,
//     }}
//   >
//     {collapsed ? (
//       <Text>
//         <MenuUnfoldOutlined />
//         Развернуть
//       </Text>
//     ) : (
//       <Text>
//         <MenuFoldOutlined />
//         Свернуть
//       </Text>
//     )}
//   </Button>
//   <div
//     className={`${styles.menuContainer} ${collapsed ? "" : styles.active}`}
//   >
//         <Menu
//           inlineCollapsed={collapsed}
//           mode="horizontal"
//           defaultSelectedKeys={["1"]}
//           defaultOpenKeys={["sub1"]}
//           style={{
//             height: "100%",
//           }}
//           items={items2}
//         />
//       </div>
//     </div>
//   );
// }

//Старый вариант до моих правок
// import React, { useState } from 'react'
// import { Button, Menu, Typography } from 'antd';
// import { LaptopOutlined, NotificationOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';

// const {Text} = Typography

// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
//   const key = String(index + 1);
//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `Меню ${key}`,
//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `Опция ${subKey}`,
//       };
//     }),
//   };
// });
// export default function CabinetMenu() {
//   const [collapsed, setCollapsed] = useState(false);
//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };
//   return (
//     <div>
//       <Button
//         type="secondary"
//         onClick={toggleCollapsed}
//         style={{
//           marginBottom: 16,
//         }}
//       >
//         {collapsed ? <Text><MenuUnfoldOutlined />Развернуть</Text> : <Text><MenuFoldOutlined />Свернуть</Text>}
//       </Button>

//       <Menu
//         inlineCollapsed={collapsed}
//         mode="inline"
//         defaultSelectedKeys={['1']}
//         defaultOpenKeys={['sub1']}
//         style={{
//           height: '100%',
//         }}
//         items={items2}
//       />
//     </div>
//   )
// }
