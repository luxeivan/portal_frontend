import {
  Avatar,
  Card,
  Col,
  Row,
  Typography,
  Input,
  Button,
  Tabs,
  message,
} from "antd";
import { useEffect, useState } from "react";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";
import AppHelmet from "../../../components/Global/AppHelmet";
import useProfile from "../../../stores/Cabinet/useProfile";
import useGlobal from "../../../stores/useGlobal";
import styles from "./Profile.module.css";
import TweenOne from "rc-tween-one";
import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";
import axios from "axios";

TweenOne.plugins.push(Children);

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function Profile() {
  const profile = useProfile((store) => store.profile);
  const fetchProfile = useProfile((store) => store.fetchProfile);
  const darkMode = useGlobal((state) => state.darkMode);

  const [leftPanelVisible, setLeftPanelVisible] = useState(false);
  const [rightPanelVisible, setRightPanelVisible] = useState(false);
  const [phone, setPhone] = useState(profile.phone || "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchProfile();
    setTimeout(() => setLeftPanelVisible(true), 300);
    setTimeout(() => setRightPanelVisible(true), 800);
  }, [fetchProfile]);

  useEffect(() => {
    setPhone(profile.phone || "");
  }, [profile]);

  const handleSave = async () => {
    try {
      if (phone !== profile.phone) {
        await axios.post(
          `${process.env.REACT_APP_BACK_BACK_SERVER}/api/cabinet/profile/newphone`,
          { phone }
        );
        message.success("Телефон успешно обновлен");
      }
      if (password) {
        await axios.post(
          `${process.env.REACT_APP_BACK_BACK_SERVER}/api/cabinet/profile/newpassword`,
          { password }
        );
        message.success("Пароль успешно обновлен");
      }
    } catch (error) {
      message.error("Ошибка при обновлении профиля");
    }
  };

  return (
    <div
      className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
    >
      <AppHelmet title="Профиль" desc="Профиль пользователя" />
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} md={8}>
          <TweenOne
            animation={{
              opacity: leftPanelVisible ? 1 : 0,
              translateX: leftPanelVisible ? 0 : -50,
              duration: 800,
              ease: "easeOutCubic",
            }}
            style={{ opacity: 0, transform: "translateX(-50px)" }}
          >
            <Card
              className={`${styles.profileCard} ${
                darkMode ? styles.profileCardDark : ""
              }`}
              bordered={false}
            >
              <TweenOne
                animation={{
                  opacity: leftPanelVisible ? 1 : 0,
                  translateY: leftPanelVisible ? 0 : -20,
                  duration: 500,
                  delay: 200,
                  ease: "easeOutCubic",
                }}
                style={{ opacity: 0, transform: "translateY(-20px)" }}
              >
                <Avatar
                  size={120}
                  icon={<UserOutlined />}
                  className={styles.avatar}
                />
                <Title level={3} className={styles.emailTitle}>
                  {profile.email || "Имя пользователя"}
                </Title>

                <div className={styles.socialIcons}>
                  <MailOutlined />
                  <PhoneOutlined />
                  <LockOutlined />
                </div>
              </TweenOne>
            </Card>
          </TweenOne>
        </Col>

        <Col xs={24} md={14}>
          <TweenOne
            animation={{
              opacity: rightPanelVisible ? 1 : 0,
              translateX: rightPanelVisible ? 0 : 50,
              duration: 800,
              ease: "easeOutCubic",
            }}
            style={{ opacity: 0, transform: "translateX(50px)" }}
          >
            <Card
              className={`${styles.profileDetailsCard} ${
                darkMode ? styles.profileDetailsCardDark : ""
              }`}
              bordered={false}
            >
              <Tabs defaultActiveKey="1">
                <TabPane tab="Профиль" key="1">
                  <TweenOne
                    animation={{
                      opacity: rightPanelVisible ? 1 : 0,
                      translateY: rightPanelVisible ? 0 : -20,
                      duration: 500,
                      delay: 200,
                      ease: "easeOutCubic",
                    }}
                    style={{ opacity: 0, transform: "translateY(-20px)" }}
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Text strong>Email</Text>
                        <div className={styles.emailDisplay}>
                          {profile.email || ""}
                        </div>
                      </Col>
                      <Col span={12}>
                        <Text strong>Телефон</Text>
                        <Input
                          placeholder="+7 999 999 9999"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Col>
                      <Col span={12}>
                        <Text strong>Пароль</Text>
                        <Input.Password
                          placeholder="Введите новый пароль"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </TweenOne>
                  <Row justify="end" style={{ marginTop: "20px" }}>
                    <Button
                      type="primary"
                      style={{ marginRight: "10px" }}
                      onClick={handleSave}
                    >
                      Сохранить
                    </Button>
                  </Row>
                </TabPane>
                <TabPane tab="Настройки" key="2">
                  <Text>
                    Дополнительные настройки профиля будут доступны здесь.
                  </Text>
                </TabPane>
              </Tabs>
            </Card>
          </TweenOne>
        </Col>
      </Row>
    </div>
  );
}

// import {
//   Avatar,
//   Card,
//   Col,
//   Row,
//   Typography,
//   Input,
//   Button,
//   Tabs,
//   message,
// } from "antd";
// import { useEffect, useState } from "react";
// import {
//   UserOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   LockOutlined,
// } from "@ant-design/icons";
// import AppHelmet from "../../../components/Global/AppHelmet";
// import useProfile from "../../../stores/Cabinet/useProfile";
// import useGlobal from "../../../stores/useGlobal";
// import styles from "./Profile.module.css";
// import TweenOne from "rc-tween-one";
// import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";
// import axios from "axios";

// TweenOne.plugins.push(Children);

// const { Title, Text } = Typography;
// const { TabPane } = Tabs;

// export default function Profile() {
//   const profile = useProfile((store) => store.profile);
//   const fetchProfile = useProfile((store) => store.fetchProfile);
//   const darkMode = useGlobal((state) => state.darkMode);

//   const [leftPanelVisible, setLeftPanelVisible] = useState(false);
//   const [rightPanelVisible, setRightPanelVisible] = useState(false);
//   const [phone, setPhone] = useState(profile.phone || "");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     fetchProfile();
//     setTimeout(() => setLeftPanelVisible(true), 300);
//     setTimeout(() => setRightPanelVisible(true), 800);
//   }, [fetchProfile]);

//   useEffect(() => {
//     setPhone(profile.phone || "");
//   }, [profile]);

//   const handleSavePhone = async () => {
//     try {
//       await axios.post("/api/cabinet/profile/newphone", { phone });
//       message.success("Телефон успешно обновлен");
//     } catch (error) {
//       message.error("Ошибка при обновлении телефона");
//     }
//   };

//   const handleSavePassword = async () => {
//     try {
//       await axios.post("/api/cabinet/profile/newpassword", { password });
//       message.success("Пароль успешно обновлен");
//     } catch (error) {
//       message.error("Ошибка при обновлении пароля");
//     }
//   };

//   return (
//     <div
//       className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
//     >
//       <AppHelmet title="Профиль" desc="Профиль пользователя" />
//       <Row gutter={[16, 16]} justify="center">
//         <Col xs={24} md={8}>
//           <TweenOne
//             animation={{
//               opacity: leftPanelVisible ? 1 : 0,
//               translateX: leftPanelVisible ? 0 : -50,
//               duration: 800,
//               ease: "easeOutCubic",
//             }}
//             style={{ opacity: 0, transform: "translateX(-50px)" }}
//           >
//             <Card
//               className={`${styles.profileCard} ${
//                 darkMode ? styles.profileCardDark : ""
//               }`}
//               bordered={false}
//             >
//               <TweenOne
//                 animation={{
//                   opacity: leftPanelVisible ? 1 : 0,
//                   translateY: leftPanelVisible ? 0 : -20,
//                   duration: 500,
//                   delay: 200,
//                   ease: "easeOutCubic",
//                 }}
//                 style={{ opacity: 0, transform: "translateY(-20px)" }}
//               >
//                 <Avatar
//                   size={120}
//                   icon={<UserOutlined />}
//                   className={styles.avatar}
//                 />
//                 <Title level={3} className={styles.emailTitle}>
//                   {profile.email || "Имя пользователя"}
//                 </Title>

//                 <div className={styles.socialIcons}>
//                   <MailOutlined />
//                   <PhoneOutlined />
//                   <LockOutlined />
//                 </div>
//               </TweenOne>
//             </Card>
//           </TweenOne>
//         </Col>

//         <Col xs={24} md={14}>
//           <TweenOne
//             animation={{
//               opacity: rightPanelVisible ? 1 : 0,
//               translateX: rightPanelVisible ? 0 : 50,
//               duration: 800,
//               ease: "easeOutCubic",
//             }}
//             style={{ opacity: 0, transform: "translateX(50px)" }}
//           >
//             <Card
//               className={`${styles.profileDetailsCard} ${
//                 darkMode ? styles.profileDetailsCardDark : ""
//               }`}
//               bordered={false}
//             >
//               <Tabs defaultActiveKey="1">
//                 <TabPane tab="Профиль" key="1">
//                   <TweenOne
//                     animation={{
//                       opacity: rightPanelVisible ? 1 : 0,
//                       translateY: rightPanelVisible ? 0 : -20,
//                       duration: 500,
//                       delay: 200,
//                       ease: "easeOutCubic",
//                     }}
//                     style={{ opacity: 0, transform: "translateY(-20px)" }}
//                   >
//                     <Row gutter={16}>
//                       <Col span={12}>
//                         <Text strong>Email</Text>
//                         <div className={styles.emailDisplay}>
//                           {profile.email || ""}
//                         </div>
//                       </Col>
//                       <Col span={12}>
//                         <Text strong>Телефон</Text>
//                         <Input
//                           placeholder="+7 999 999 9999"
//                           value={phone}
//                           onChange={(e) => setPhone(e.target.value)}
//                         />
//                       </Col>
//                       <Col span={12}>
//                         <Text strong>Пароль</Text>
//                         <Input.Password
//                           placeholder="Введите новый пароль"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                         />
//                       </Col>
//                     </Row>
//                   </TweenOne>
//                   <Row justify="end" style={{ marginTop: "20px" }}>
//                     <Button
//                       type="primary"
//                       style={{ marginRight: "10px" }}
//                       onClick={handleSavePhone}
//                     >
//                       Сохранить телефон
//                     </Button>
//                     <Button type="primary" onClick={handleSavePassword}>
//                       Сохранить пароль
//                     </Button>
//                   </Row>
//                 </TabPane>
//                 <TabPane tab="Настройки" key="2">
//                   <Text>
//                     Дополнительные настройки профиля будут доступны здесь.
//                   </Text>
//                 </TabPane>
//               </Tabs>
//             </Card>
//           </TweenOne>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// import { Avatar, Card, Col, Row, Typography, Input, Button, Tabs } from "antd";
// import { useEffect, useState } from "react";
// import {
//   UserOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   LockOutlined,
// } from "@ant-design/icons";
// import AppHelmet from "../../../components/Global/AppHelmet";
// import useProfile from "../../../stores/Cabinet/useProfile";
// import useGlobal from "../../../stores/useGlobal";
// import styles from "./Profile.module.css";
// import TweenOne from "rc-tween-one";
// import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";

// TweenOne.plugins.push(Children);

// const { Title, Text } = Typography;
// const { TabPane } = Tabs;

// export default function Profile() {
//   const profile = useProfile((store) => store.profile);
//   const fetchProfile = useProfile((store) => store.fetchProfile);
//   const darkMode = useGlobal((state) => state.darkMode);

//   const [leftPanelVisible, setLeftPanelVisible] = useState(false);
//   const [rightPanelVisible, setRightPanelVisible] = useState(false);

//   useEffect(() => {
//     fetchProfile();
//     setTimeout(() => setLeftPanelVisible(true), 300);
//     setTimeout(() => setRightPanelVisible(true), 800);
//   }, [fetchProfile]);

//   return (
//     <div
//       className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
//     >
//       <AppHelmet title="Профиль" desc="Профиль пользователя" />
//       <Row gutter={[16, 16]} justify="center">
//         <Col xs={24} md={8}>
//           <TweenOne
//             animation={{
//               opacity: leftPanelVisible ? 1 : 0,
//               translateX: leftPanelVisible ? 0 : -50,
//               duration: 800,
//               ease: "easeOutCubic",
//             }}
//             style={{ opacity: 0, transform: "translateX(-50px)" }}
//           >
//             <Card
//               className={`${styles.profileCard} ${
//                 darkMode ? styles.profileCardDark : ""
//               }`}
//               bordered={false}
//             >
//               <TweenOne
//                 animation={{
//                   opacity: leftPanelVisible ? 1 : 0,
//                   translateY: leftPanelVisible ? 0 : -20,
//                   duration: 500,
//                   delay: 200,
//                   ease: "easeOutCubic",
//                 }}
//                 style={{ opacity: 0, transform: "translateY(-20px)" }}
//               >
//                 <Avatar
//                   size={120}
//                   icon={<UserOutlined />}
//                   className={styles.avatar}
//                 />
//                 <Title level={3}>{profile.email || "Имя пользователя"}</Title>

//                 {/* <Text type="secondary">Физическое лицо</Text> */}

//                 <div className={styles.socialIcons}>
//                   <MailOutlined />
//                   <PhoneOutlined />
//                   <LockOutlined />
//                 </div>
//               </TweenOne>
//             </Card>
//           </TweenOne>
//         </Col>

//         <Col xs={24} md={14}>
//           <TweenOne
//             animation={{
//               opacity: rightPanelVisible ? 1 : 0,
//               translateX: rightPanelVisible ? 0 : 50,
//               duration: 800,
//               ease: "easeOutCubic",
//             }}
//             style={{ opacity: 0, transform: "translateX(50px)" }}
//           >
//             <Card
//               className={`${styles.profileDetailsCard} ${
//                 darkMode ? styles.profileDetailsCardDark : ""
//               }`}
//               bordered={false}
//             >
//               <Tabs defaultActiveKey="1">
//                 <TabPane tab="Профиль" key="1">
//                   <TweenOne
//                     animation={{
//                       opacity: rightPanelVisible ? 1 : 0,
//                       translateY: rightPanelVisible ? 0 : -20,
//                       duration: 500,
//                       delay: 200,
//                       ease: "easeOutCubic",
//                     }}
//                     style={{ opacity: 0, transform: "translateY(-20px)" }}
//                   >
//                     <Row gutter={16}>
//                       <Col span={12}>
//                         <Text strong>Email</Text>
//                         <Input
//                           placeholder="email@example.com"
//                           value={profile.email || ""}
//                         />
//                       </Col>
//                       <Col span={12}>
//                         <Text strong>Телефон</Text>
//                         <Input
//                           placeholder="+7 999 999 9999"
//                           value={profile.phone || ""}
//                         />
//                       </Col>
//                       <Col span={12}>
//                         <Text strong>Пароль</Text>
//                         <Input.Password
//                           placeholder="******"
//                           defaultValue="********"
//                         />
//                       </Col>
//                     </Row>
//                   </TweenOne>
//                   <Row justify="end" style={{ marginTop: "20px" }}>
//                     <Button type="primary" style={{ marginRight: "10px" }}>
//                       Сохранить
//                     </Button>
//                     <Button type="default">Отмена</Button>
//                   </Row>
//                 </TabPane>
//                 <TabPane tab="Настройки" key="2">
//                   <Text>
//                     Дополнительные настройки профиля будут доступны здесь.
//                   </Text>
//                 </TabPane>
//               </Tabs>
//             </Card>
//           </TweenOne>
//         </Col>
//       </Row>
//     </div>
//   );
// }
