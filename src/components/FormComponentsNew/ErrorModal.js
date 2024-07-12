import React from "react";
import { Modal, Typography } from "antd";

const { Text } = Typography;

const ErrorModal = ({ visible, error, onClose }) => {
  return (
    <Modal
      visible={visible}
      title="Ошибка"
      onCancel={onClose}
      footer={null}
      centered
    >
      <Text type="danger">
        Извините, наш сайт немного устал и приболел, пожалуйста, подождите пару
        минут и попробуйте обновить страничку.
      </Text>
      <br />
      <Text type="secondary">{error?.message || "Неизвестная ошибка"}</Text>
    </Modal>
  );
};

export default ErrorModal;
