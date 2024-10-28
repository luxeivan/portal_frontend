import React from "react";
import { Modal, Button } from "antd";

export default function EventModal({ event, onResolve }) {
  return (
    <Modal
      title={event.name}
      visible={true}
      footer={null}
      onCancel={() => onResolve("ignore")}
    >
      <p>{event.description}</p>
      <div style={{ textAlign: "right" }}>
        <Button
          type="primary"
          onClick={() => onResolve("accept")}
          style={{ marginRight: 10 }}
        >
          Принять
        </Button>
        <Button onClick={() => onResolve("ignore")}>Игнорировать</Button>
      </div>
    </Modal>
  );
}
