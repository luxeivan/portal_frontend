import React from "react";
import { Modal, Tabs, Drawer, Flex } from "antd";
import AuthLoginForm from "../Login/AuthLoginForm";
import AuthRegForm from "../Registration/AuthRegForm/AuthRegForm";
import useAuth from "../../../../stores/useAuth";
import styles from './AuthModal.module.css'

const AuthModal = () => {
    const { isAuthModalOpen, toggleModal } = useAuth();

    const tabItems = [
        {
            label: 'Войти',
            key: '1',
            children: <AuthLoginForm />,
        },
        {
            label: 'Регистрация',
            key: '2',
            children: <AuthRegForm />,
        },
    ];

    return (
        <Drawer
            title="Авторизация/Регистрация"
            open={isAuthModalOpen}
            onClose={() => toggleModal('isAuthModalOpen', false)}
        // size="large"
        // footer={null}
        // maskClosable={false}
        // width = "50%"
        // className={styles.auth__modal}
        // bodyStyle={{height: '50vh'}}
        >
            <Flex align="center" style={{ height: "100%" }}>
                <Tabs defaultActiveKey="1" items={tabItems} />
            </Flex>
        </Drawer>
    );
};

export default AuthModal;
