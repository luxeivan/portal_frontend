// import React from 'react'
// import { Menu } from 'antd';
// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

// const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
//   const key = String(index + 1);
//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,
//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });
// export default function CabinetMenu() {
//   return (
//     <Menu
//       inlineCollapsed={true}
//       mode="inline"
//       defaultSelectedKeys={['1']}
//       defaultOpenKeys={['sub1']}
//       style={{
//         height: '100%',
//       }}
//       items={items2}
//     />
//   )
// }
import React, { useState } from 'react'
import { Button, Menu, Typography } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';

const {Text} = Typography

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
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
});
export default function CabinetMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div>
      <Button
        type="secondary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <Text><MenuUnfoldOutlined />Развернуть</Text> : <Text><MenuFoldOutlined />Свернуть</Text>}
      </Button>

      <Menu
        inlineCollapsed={collapsed}
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{
          height: '100%',
        }}
        items={items2}
      />
    </div>
  )
}