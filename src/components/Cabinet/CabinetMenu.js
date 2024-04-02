import React, { useState } from "react";
import { Button, Flex, Menu, Typography, ConfigProvider, theme } from "antd";
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
  FileSearchOutlined,
  MenuOutlined,
  FileSyncOutlined,
  FileZipOutlined,
  FileUnknownOutlined,
  FileAddOutlined
} from "@ant-design/icons";
import styles from "./CabinetMenu.module.css";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function CabinetMenu() {
  const { colorPrimaryText } = theme.useToken().token
const iconStyle = {
  // color: "rgb(227, 112, 33)"
  color: "gray"
}
const menuItems = [
  {
    type: 'group', 
    label: 'Услуги',
  },
  {
    key: "/services",
    icon: <FileAddOutlined  className={styles.icon} style={iconStyle} />,
    label: <Text className={styles.labelSizeMobile}>Новая</Text>,
  },
  {
    key: "/cabinet/claimers",
    icon: <FileSyncOutlined className={styles.icon} style={iconStyle}  />,
    label: <Text className={styles.labelSizeMobile}>В работе</Text>,
  },
  {
    key: "/cabinet/archives",
    icon: <FileZipOutlined  className={styles.icon} style={iconStyle}  />,
    label: <Text className={styles.labelSizeMobile}>Архив</Text>,
  },
  {
    type: 'group', 
    label: 'Заявки',
  },
  {
    key: "/cabinet/drafts",
    icon: <FileUnknownOutlined className={styles.icon} style={iconStyle}  />,
    label: <Text className={styles.labelSizeMobile}>Черновики</Text>,
  },
  {
    key: "/cabinet/checking",
    icon: <FileSearchOutlined  className={styles.icon} style={iconStyle}  />,
    label: <Text className={styles.labelSizeMobile}>На проверке</Text>,
  },
  {
    type: 'group', 
    label: 'Мои данные',
  },
  {
    key: "/cabinet/subjects",
    icon: <UserOutlined className={styles.icon} style={iconStyle}  />,
    label: <Text className={styles.labelSizeMobile}>Субъекты</Text>,
  },
  {
    key: "/cabinet/relations",
    icon: <RetweetOutlined className={styles.icon} style={iconStyle}  />,
    label: <Text className={styles.labelSizeMobile}>Доверенности</Text>,
  },
  {
    key: "/cabinet/objects",
    icon: <EnvironmentOutlined className={styles.icon} style={iconStyle}  />,
    label: <Text className={styles.labelSizeMobile}>Объекты</Text>,
  },
  {
    type: 'group', 
    label: 'Настройки',
  },
  {
    key: "/cabinet/profile",
    icon: <ProfileOutlined className={styles.icon} style={iconStyle}  />,
    label: <Text className={styles.labelSizeMobile}>Профиль</Text>,
  },
];
const menuItemsMobile = menuItems.map(item => {
  if (!item.type) {

    return ({
      key: item.key,
      label: <Flex vertical align="center" justify="center" className={styles.menuItem}>
        <div>
          <Text>{item.icon}</Text>
        </div>
        <Text>{item.label}</Text>
      </Flex>,
      children: item.children,
    })
  }
})

  const navigator = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handlerMenu = ({ item, key, keyPath, domEvent }) => {
    navigator(key)
  }

  return (


    <div className={styles.menuContainer}>

      <div >
      </div>
      {/* ----------------------------------------------------------------------- */}
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemHeight: 60,
              iconSize: 24,
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
              // inlineCollapsed={collapsed}
              mode={"horizontal"}
              items={menuItemsMobile}
              overflowedIndicator={<Flex vertical align="center" justify="center" className={styles.menuItem}>
                <div>
                  <Text><MenuOutlined style={iconStyle}/></Text>
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
              {/* <Button
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
              </Button> */}
            <Menu
              selectable={false}
              inlineCollapsed={collapsed}
              mode={"inline"}
              items={menuItems}
              onClick={handlerMenu}
              style={{height:"100%"}}
            />
          </Flex>
        </div>
      </ConfigProvider>
    </div>
  );
}
