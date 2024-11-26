import React, { useState } from "react";
import { Button, Flex, Menu, Typography, ConfigProvider, theme } from "antd";
import {
  UserOutlined,
  ProfileOutlined,
  EnvironmentOutlined,
  FileSearchOutlined,
  MenuOutlined,
  FileSyncOutlined,
  FileZipOutlined,
  FileUnknownOutlined,
  FileAddOutlined,
  FileOutlined
} from "@ant-design/icons";
import styles from "./CabinetMenu.module.css";
import { useNavigate,Link } from "react-router-dom";
import cabinetMenuBack from '../../img/cabinetMenu/cabinet-menu-back.webp'
import useGlobal from "../../stores/useGlobal";

const { Text } = Typography;

export default function CabinetMenu() {
  const { colorPrimaryText } = theme.useToken().token
  const { currentPage, setCurrentPage } = useGlobal()
  const iconStyle = {
    // color: "rgb(227, 112, 33)"
    color: "gray"
  }
  const menuItems = [
    // {
    //   type: 'group',
    //   label: 'Услуги',
    // },
    {
      key: "/services",
      icon: <FileAddOutlined className={styles.icon} style={iconStyle} />,
      label: <Link to={"/services"} className={styles.labelSizeMobile}>Новая услуга</Link>,
    },
    {
      key: "/cabinet/claimers",
      icon: <FileSyncOutlined className={styles.icon} style={iconStyle} />,
      label: <Link to={"/cabinet/claimers"} className={styles.labelSizeMobile}>Заявки</Link>,
    },
    // {
    //   key: "/cabinet/archives",
    //   icon: <FileZipOutlined className={styles.icon} style={iconStyle} />,
    //   label: <Link to={"/cabinet/archives"} className={styles.labelSizeMobile}>Архив</Link>,
    // },
    // {
    //   type: 'group',
    //   label: 'Заявки',
    // },
    // {
    //   key: "/cabinet/drafts",
    //   icon: <FileUnknownOutlined className={styles.icon} style={iconStyle} />,
    //   label: <Link to={"/cabinet/drafts"} className={styles.labelSizeMobile}>Черновики</Link>,
    // },
    // {
    //   key: "/cabinet/checking",
    //   icon: <FileSearchOutlined className={styles.icon} style={iconStyle} />,
    //   label: <Link to={"/cabinet/checking"} className={styles.labelSizeMobile}>На проверке</Link>,
    // },
    // {
    //   type: 'group',
    //   label: 'Мои данные',
    // },
    // {
    //   key: "/cabinet/subjects",
    //   icon: <UserOutlined className={styles.icon} style={iconStyle} />,
    //   label: <Link to={"/cabinet/subjects"} className={styles.labelSizeMobile}>Субъекты</Link>,
    // },
    // {
    //   key: "/cabinet/objects",
    //   icon: <EnvironmentOutlined className={styles.icon} style={iconStyle} />,
    //   label: <Link to={"/cabinet/objects"} className={styles.labelSizeMobile}>Объекты</Link>,
    // },
    {
      key: "/cabinet/documents",
      icon: <FileOutlined className={styles.icon} style={iconStyle} />,
      label: <Link to={"/cabinet/documents"} className={styles.labelSizeMobile}>Мои документы</Link>,
    },
    // {
    //   type: 'group',
    //   label: 'Настройки',
    // },
    {
      key: "/cabinet/profile",
      icon: <ProfileOutlined className={styles.icon} style={iconStyle} />,
      label: <Link to={"/cabinet/profile"} className={styles.labelSizeMobile}>Мой профиль</Link>,
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
  const handlerMenu = ({ key }) => {
    setCurrentPage(key)
    // navigator(key)
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
              // selectable={false}
              // inlineCollapsed={collapsed}
              mode={"horizontal"}
              items={menuItemsMobile}
              overflowedIndicator={
              <Flex vertical align="center" justify="center" className={styles.menuItemMobile}>
                <div>
                  <Text><MenuOutlined style={iconStyle} /></Text>
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
          <Flex
            vertical
            className={styles.menuItem}
          // style={{ backgroundImage: `url(${cabinetMenuBack})` }}
          >
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
              // selectable={false}
              inlineCollapsed={collapsed}
              mode={"inline"}
              items={menuItems}
              onClick={handlerMenu}
              className={styles.menu}
              selectedKeys={[currentPage]}
            // style={{background:"inherit"}}
            />
          </Flex>
        </div>
      </ConfigProvider>
    </div>
  );
}
