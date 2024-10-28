import React from "react";
import { Modal, Button } from "antd";

export default function Summary({ onRestart, gameState }) {
  return (
    <Modal
      title="Игра окончена"
      visible={true}
      footer={[
        <Button key="restart" type="primary" onClick={onRestart}>
          Начать заново
        </Button>,
      ]}
      closable={false}
    >
      <p>Спасибо за игру!</p>
      <p>Дни: {gameState.day}</p>
      <p>Оставшиеся ресурсы:</p>
      <ul>
        <li>Энергия: {gameState.resources.energy}</li>
        <li>Деньги: {gameState.resources.money}</li>
        <li>Персонал: {gameState.resources.personnel}</li>
      </ul>
    </Modal>
  );
}
