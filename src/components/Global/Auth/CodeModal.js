import React from 'react'
import { Modal, Tabs } from "antd";
import useStore from "../../../stores/GlobalStore"
import CodeForm from './CodeForm';

const { TabPane } = Tabs;

export default function CodeModal() {
    const isModalOpen = useStore((state) => state.global.isCodeModalOpen);
    const closeCodeModal = useStore((state) => state.closeCodeModal);


  return (
    <>
    <Modal
        title=""
        open={isModalOpen}
        onOk={closeCodeModal}
        onCancel={closeCodeModal}
        footer={null}
        maskClosable={false}
    >
     <CodeForm />
    </Modal>
</>
  )
}
