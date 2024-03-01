import React from "react";
import { Modal, Tabs } from "antd";
import AuthLoginForm from "./AuthLoginForm";
import AuthRegForm from "./AuthRegForm";
import useAuth from "../../../stores/useAuth";

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
        <Modal
            title=""
            open={isAuthModalOpen}
            onCancel={() => toggleModal('isAuthModalOpen', false)}
            footer={null}
            maskClosable={false}
        >
            <Tabs defaultActiveKey="1" items={tabItems} />
        </Modal>
    );
};

export default AuthModal;
