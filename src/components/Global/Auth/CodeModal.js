// import React from 'react'
// import { Modal, Tabs } from "antd";
// import useStore from "../../../stores/GlobalStore"
// import CodeForm from './CodeForm';

// export default function CodeModal() {
//     const isModalOpen = useStore((state) => state.global.isCodeModalOpen);
//     const closeCodeModal = useStore((state) => state.closeCodeModal);


//   return (
//     <>
//     <Modal
//         title=""
//         open={isModalOpen}
//         onOk={closeCodeModal}
//         onCancel={closeCodeModal}
//         footer={null}
//         maskClosable={false}
//     >
//      <CodeForm />
//     </Modal>
// </>
//   )
// }

import React from 'react';
import { Modal } from "antd";
import CodeForm from './CodeForm';
import useStore from "../../../stores/GlobalStore";

const CodeModal = () => {
    const toggleModal = useStore(state => state.toggleModal);
    const isCodeModalOpen = useStore(state => state.global.isCodeModalOpen);

    return (
        <Modal
            title="Введите код подтверждения"
            open={isCodeModalOpen}
            onCancel={() => toggleModal('isCodeModalOpen', false)}
            footer={null}
            maskClosable={false}
        >
            <CodeForm />
        </Modal>
    );
}

export default CodeModal;
