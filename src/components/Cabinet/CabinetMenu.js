import React, { useState } from "react";
import { Flex, Menu, Typography } from "antd";
import {
  UserOutlined,
  ProfileOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  FolderOpenOutlined,
  DownOutlined,
} from "@ant-design/icons";
import styles from "./CabinetMenu.module.css";

const { Text } = Typography;

// Иконки и пункты меню для нижней навигации
const menuItems = [
  {
    key: "apply",
    icon: <FileTextOutlined />,
    label: "Подать заявку",
  },
  {
    key: "profile",
    icon: <ProfileOutlined />,
    label: "Профиль",
  },
  {
    key: "representatives",
    icon: <UserOutlined />,
    label: "Заявитель",
  },
  {
    key: "sub_presentatives",
    icon: <UserOutlined />,
    label: "Представители",
  },
  {
    key: "connection_objects",
    icon: <UserOutlined />,
    label: "Объекты Подключения",
  },
  {
    key: "drafts",
    icon: <FolderOpenOutlined />,
    label: "Черновики",
  },
  {
    key: "checking",
    icon: <CheckCircleOutlined />,
    label: "Заявки на проверке",
  },
  {
    key: "submenu",
    icon: <DownOutlined />,
    label: "Заявки",
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

export default function CabinetMenu() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={styles.menuContainer}>
      <Flex vertical>
        <Menu
          inlineCollapsed={collapsed}
          mode="horizontal"
          items={menuItems}
          onClick={toggleCollapsed}
        />
      </Flex>
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
//     <div className={styles.menuContainer}>
//       <Button
//         type="secondary"
//         onClick={toggleCollapsed}
//         style={{
//           marginBottom: 16,
//         }}
//       >
//         {collapsed ? (
//           <Text>
//             <MenuUnfoldOutlined />
//             Развернуть
//           </Text>
//         ) : (
//           <Text>
//             <MenuFoldOutlined />
//             Свернуть
//           </Text>
//         )}
//       </Button>
//       <div
//         className={`${styles.menuContainer} ${collapsed ? "" : styles.active}`}
//       >
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
