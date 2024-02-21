import React, { useState } from "react";
import { Button, Modal, Tabs } from "antd";
import AuthLoginForm from "./AuthLoginForm";
import AuthRegForm from "./AuthRegForm";
const { TabPane } = Tabs;

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
export default App;
