import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Col,
  Row,
  Typography,
  Button,
  message,
  Form,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import AppHelmet from "../../../components/Global/AppHelmet";
import useProfile from "../../../stores/Cabinet/useProfile";
import useGlobal from "../../../stores/useGlobal";
import { PhoneModal, PasswordModal } from "./Modals"; 
import styles from "./Profile.module.css";
import TweenOne from "rc-tween-one";
import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";

TweenOne.plugins.push(Children);

const { Title, Text } = Typography;

export default function Profile() {
  const profile = useProfile((store) => store.profile);
  const fetchProfile = useProfile((store) => store.fetchProfile);
  const updatePhone = useProfile((store) => store.updatePhone); 
  const updatePassword = useProfile((store) => store.updatePassword);
  const darkMode = useGlobal((state) => state.darkMode);

  const [leftPanelVisible, setLeftPanelVisible] = useState(false);
  const [rightPanelVisible, setRightPanelVisible] = useState(false);
  const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  const [form] = Form.useForm(); 

  useEffect(() => {
    fetchProfile();
    setTimeout(() => setLeftPanelVisible(true), 300);
    setTimeout(() => setRightPanelVisible(true), 800);
  }, [fetchProfile]);

  const showPhoneModal = () => {
    setIsPhoneModalVisible(true);
  };

  const showPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };

  const handlePhoneModalOk = async () => {
    try {
      const values = await form.validateFields();
      await updatePhone(values.phone);
      message.success("Телефон успешно обновлён");
    } catch (error) {
      message.error("Ошибка при обновлении телефона");
    }
    setIsPhoneModalVisible(false);
  };

  const handlePasswordModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (values.password !== values.repeat_password) {
        message.error("Пароли не совпадают");
        return;
      }
      await updatePassword(values.password);
      message.success("Пароль успешно обновлён");
      form.resetFields();
    } catch (error) {
      message.error("Ошибка при обновлении пароля");
    }
    setIsPasswordModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsPhoneModalVisible(false);
    setIsPasswordModalVisible(false);
    form.resetFields();
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
              <Row gutter={16} align="middle">
                <Col>
                  <Text strong>Email</Text>
                  <div className={styles.emailDisplay}>
                    {profile.email || ""}
                  </div>
                </Col>

                <Col>
                  <Text strong>Телефон</Text>
                  <div className={styles.phoneDisplay}>
                    {profile.phone || ""}
                    <Button type="link" onClick={showPhoneModal}>
                      Изменить телефон
                    </Button>
                  </div>
                </Col>

                <Col>
                  <Button
                    type="link"
                    onClick={showPasswordModal}
                    style={{ paddingTop: "35px" }}
                    className={styles.changePasswordButton}
                  >
                    Изменить пароль
                  </Button>
                </Col>
              </Row>
            </Card>
          </TweenOne>
        </Col>
      </Row>

      {/* Модалка для изменения номера телефона */}
      <PhoneModal
        isVisible={isPhoneModalVisible}
        onCancel={handleModalCancel}
        onSubmit={handlePhoneModalOk}
        form={form}
      />

      {/* Модалка для изменения пароля */}
      <PasswordModal
        isVisible={isPasswordModalVisible}
        onCancel={handleModalCancel}
        onSubmit={handlePasswordModalOk}
        form={form}
      />
    </div>
  );
}

// import {
//   Avatar,
//   Card,
//   Col,
//   Row,
//   Typography,
//   Button,
//   Modal,
//   message,
// } from "antd";
// import { useEffect, useState } from "react";
// import {
//   UserOutlined,
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

// export default function Profile() {
//   const profile = useProfile((store) => store.profile);
//   const fetchProfile = useProfile((store) => store.fetchProfile);
//   const darkMode = useGlobal((state) => state.darkMode);

//   const [leftPanelVisible, setLeftPanelVisible] = useState(false);
//   const [rightPanelVisible, setRightPanelVisible] = useState(false);
//   const [isPhoneModalVisible, setIsPhoneModalVisible] = useState(false);
//   const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

//   useEffect(() => {
//     fetchProfile();
//     setTimeout(() => setLeftPanelVisible(true), 300);
//     setTimeout(() => setRightPanelVisible(true), 800);
//   }, [fetchProfile]);

//   const showPhoneModal = () => {
//     setIsPhoneModalVisible(true);
//   };

//   const showPasswordModal = () => {
//     setIsPasswordModalVisible(true);
//   };

//   const handlePhoneModalOk = () => {
//     message.info("Модалка для изменения номера");
//     setIsPhoneModalVisible(false);
//   };

//   const handlePasswordModalOk = () => {
//     message.info("Модалка для изменения пароля");
//     setIsPasswordModalVisible(false);
//   };

//   const handleModalCancel = () => {
//     setIsPhoneModalVisible(false);
//     setIsPasswordModalVisible(false);
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
//               <Row gutter={16} align="middle">
//                 <Col >
//                   <Text strong>Email</Text>
//                   <div className={styles.emailDisplay}>
//                     {profile.email || ""}
//                   </div>
//                 </Col>

//                 <Col>
//                   <Text strong>Телефон</Text>
//                   <div className={styles.phoneDisplay}>
//                     {profile.phone || ""}
//                     <Button
//                       type="link"
//                       onClick={showPhoneModal}
//                       // style={{ marginLeft: "10px" }}
//                     >
//                       Изменить телефон
//                     </Button>
//                   </div>
//                 </Col>

//                 <Col >
//                   <Button
//                     type="link"
//                     onClick={showPasswordModal}
//                     style={{ paddingTop: "35px" }}
//                     className={styles.changePasswordButton}
//                   >
//                     Изменить пароль
//                   </Button>
//                 </Col>
//               </Row>
//             </Card>
//           </TweenOne>
//         </Col>
//       </Row>

//       {/* Модалка для изменения номера телефона */}
//       <Modal
//         title="Изменить номер телефона"
//         visible={isPhoneModalVisible}
//         onOk={handlePhoneModalOk}
//         onCancel={handleModalCancel}
//       >
//         <p>Модалка для изменения номера</p>
//       </Modal>

//       {/* Модалка для изменения пароля */}
//       <Modal
//         title="Изменить пароль"
//         visible={isPasswordModalVisible}
//         onOk={handlePasswordModalOk}
//         onCancel={handleModalCancel}
//       >
//         <p>Модалка для изменения пароля</p>
//       </Modal>
//     </div>
//   );
// }

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

// TweenOne.plugins.push(Children);

// const { Title, Text } = Typography;
// const { TabPane } = Tabs;

// export default function Profile() {
//   const profile = useProfile((store) => store.profile);
//   const fetchProfile = useProfile((store) => store.fetchProfile);
//   const updatePhone = useProfile((store) => store.updatePhone);
//   const updatePassword = useProfile((store) => store.updatePassword);
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

//   const handleSave = async () => {
//     try {
//       if (phone !== profile.phone) {
//         await updatePhone(phone);
//         message.success("Телефон успешно обновлен");
//       }
//       if (password) {
//         await updatePassword(password);
//         message.success("Пароль успешно обновлен");
//       }
//     } catch (error) {
//       message.error("Ошибка при обновлении профиля");
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
//                       onClick={handleSave}
//                     >
//                       Сохранить
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
