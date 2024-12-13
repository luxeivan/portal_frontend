import React from "react";
import { Tabs, Drawer, Flex } from "antd";
import AuthLoginForm from "../Login/AuthLoginForm";
import AuthRegForm from "../Registration/AuthRegForm/AuthRegForm";
import useAuth from "../../../../stores/useAuth";

const AuthModal = () => {
  const { isAuthModalOpen, toggleModal, authTab, setAuthTab } = useAuth(
    (state) => ({
      isAuthModalOpen: state.isAuthModalOpen,
      toggleModal: state.toggleModal,
      authTab: state.authTab,
      setAuthTab: state.setAuthTab,
    })
  );

  const tabItems = [
    {
      label: "Войти",
      key: "1",
      children: <AuthLoginForm />,
    },
    {
      label: "Регистрация",
      key: "2",
      children: <AuthRegForm />,
    },
  ];

  return (
    <Drawer
      title="Авторизация/Регистрация"
      open={isAuthModalOpen}
      onClose={() => toggleModal("isAuthModalOpen", false)}
    >
      <Flex align="center" style={{ height: "100%" }}>
        <Tabs
          activeKey={authTab}
          onChange={(key) => setAuthTab(key)}
          items={tabItems}
        />
      </Flex>
    </Drawer>
  );
};

export default AuthModal;

// import React from "react";
// import { Tabs, Drawer, Flex } from "antd";
// import AuthLoginForm from "../Login/AuthLoginForm";
// import AuthRegForm from "../Registration/AuthRegForm/AuthRegForm";
// import useAuth from "../../../../stores/useAuth";

// const AuthModal = () => {
//   const { isAuthModalOpen, toggleModal } = useAuth();

//   const tabItems = [
//     {
//       label: "Войти",
//       key: "1",
//       children: <AuthLoginForm />,
//     },
//     {
//       label: "Регистрация",
//       key: "2",
//       children: <AuthRegForm />,
//     },
//   ];

//   return (
//     <Drawer
//       title="Авторизация/Регистрация"
//       open={isAuthModalOpen}
//       onClose={() => toggleModal("isAuthModalOpen", false)}
//     >
//       <Flex align="center" style={{ height: "100%" }}>
//         <Tabs defaultActiveKey="1" items={tabItems} />
//       </Flex>
//     </Drawer>
//   );
// };

// export default AuthModal;
