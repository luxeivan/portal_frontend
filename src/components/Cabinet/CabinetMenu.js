import React, { useState } from "react";
// import { Flex, Menu, Typography } from "antd";
import { Button, Flex, Menu, Typography, ConfigProvider } from "antd";
import {
  UserOutlined,
  ProfileOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  FolderOpenOutlined,
  DownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MenuOutlined
} from "@ant-design/icons";
import styles from "./CabinetMenu.module.css";

const { Text } = Typography;
const styleForIcon = { fontSize: "2rem" }
// Иконки и пункты меню для нижней навигации
const menuItems = [
  {
    key: "apply",
    icon: <FileTextOutlined style={styleForIcon} />,
    label: "Подать заявку",
  },
  {
    key: "profile",
    icon: <ProfileOutlined style={styleForIcon} />,
    label: "Профиль",
  },
  {
    key: "representatives",
    icon: <UserOutlined style={styleForIcon} />,
    label: "Субъекты",
  },
  {
    key: "connection_objects",
    icon: <UserOutlined style={styleForIcon} />,
    label: "Объекты",
  },
  {
    key: "drafts",
    icon: <FolderOpenOutlined style={styleForIcon} />,
    label: "Черновики",
  },
  {
    key: "checking",
    icon: <CheckCircleOutlined style={styleForIcon} />,
    label: "На проверке",
  },
  {
    key: "submenu",
    icon: <DownOutlined style={styleForIcon} />,
    label: 'Заявки от:',
    children: [
      {
        key: "sub1",
        label: "Иванов Иван Иванович",
      },
      {
        key: "sub2",
        label: "ИП Гослинг Райан",
      },
      {
        key: "sub3",
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
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHeight: 60,
          },
        },
      }}
    >

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

        {/* <div className={`${styles.menuContainer} ${collapsed ? "" : styles.active}`}      >

      </div> */}
        <div className={styles.mobile}>

          <Flex vertical >
            <Menu
              selectable={false}
              inlineCollapsed={collapsed}
              mode={"horizontal"}
              items={menuItemsMobile}
              overflowedIndicator={<MenuOutlined />}
            // onClick={toggleCollapsed}
            />
          </Flex>
        </div>
        <div className={styles.desktop}>
          <Flex vertical className={styles.menuItem}>
            <Menu
              selectable={false}
              inlineCollapsed={collapsed}
              mode={"inline"}
              items={menuItems}
            // onClick={toggleCollapsed}
            />
          </Flex>
        </div>
      </div>
    </ConfigProvider>
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
