import React from "react";
import { Modal } from "antd";
import Documents from "../../pages/Cabinet/Documents/Documents";

const DocumentSelectModal = ({
  visible,
  onClose,
  categoryKey,
  onSelectDocument,
}) => {
  return (
    <Modal visible={visible} onCancel={onClose} footer={null} width="80%">
      <Documents
        categoryKey={categoryKey}
        onSelectDocument={onSelectDocument}
        isModal={true} 
      />
    </Modal>
  );
};

export default DocumentSelectModal;
