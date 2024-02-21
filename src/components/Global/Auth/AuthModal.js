import React from "react";
import { Modal, Tabs } from "antd";
import AuthLoginForm from "./AuthLoginForm";
import AuthRegForm from "./AuthRegForm";
import useStore from "../../../stores/GlobalStore";

const { TabPane } = Tabs;

const AuthModal = () => {
    const isModalOpen = useStore((state) => state.global.isAuthModalOpen);
    const closeAuthModal = useStore((state) => state.closeAuthModal);

    return (
        <>
            <Modal
                title=""
                open={isModalOpen}
                onOk={closeAuthModal}
                onCancel={closeAuthModal}
                footer={null}
                maskClosable={false}
            >
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="Войти" key="1">
                        <AuthLoginForm />
                    </TabPane>
                    <TabPane tab="Регистрация" key="2">
                        <AuthRegForm />
                    </TabPane>
                </Tabs>
            </Modal>
        </>
    );
};
export default AuthModal;
