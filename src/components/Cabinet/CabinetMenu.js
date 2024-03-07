// import React, { useState } from 'react'
// import { Button, Menu, Typography } from 'antd';
// import { LaptopOutlined, NotificationOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
// import styles from './CabinetMenu.module.css'

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
//     <div className={styles.menuContainer}>
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

import React, { useState } from "react";
import { Button, Menu, Typography } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import styles from "./CabinetMenu.module.css";
const { Text } = Typography;
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `Меню ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `Опция ${subKey}`,
        };
      }),
    };
  }
);
export default function CabinetMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className={styles.menuContainer}>
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
      <div
        className={`${styles.menuContainer} ${collapsed ? "" : styles.active}`}
      >
        <Menu
          inlineCollapsed={collapsed}
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{
            height: "100%",
          }}
          items={items2}
        />
      </div>
    </div>
  );
}