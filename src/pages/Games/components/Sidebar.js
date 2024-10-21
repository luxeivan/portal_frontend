import React, { useState } from "react";
import { Layout, Menu, Button, Modal, Tooltip } from "antd";
import {
  ThunderboltOutlined,
  DollarOutlined,
  TeamOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
  CalendarOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

import Markdown from 'markdown-to-jsx';

const { Sider } = Layout;

export default function Sidebar({
  gameState,
  nextTurn,
  netEnergyChange,
  netMoneyChange,
  personnelGain,
}) {
  const { day, week, resources, regions, achievements } = gameState;
  const [isRulesVisible, setIsRulesVisible] = useState(false);

  const showRules = () => {
    setIsRulesVisible(true);
  };

  const handleRulesClose = () => {
    setIsRulesVisible(false);
  };

  const rulesText = `...`; // Содержимое правил

  const goals = [
    "Улучшить все регионы до максимального уровня",
    "Поддерживать положительный баланс ресурсов",
    "Реагировать на события своевременно",
  ];

  const totalProgress = regions.reduce(
    (sum, region) => sum + (region.progress || 0),
    0
  );
  const averageProgress = Math.floor(totalProgress / regions.length);

  const isEnergyLow = resources.energy <= 2000;

  return (
    <Sider width={300} theme="light">
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>
          <CalendarOutlined /> День {day} (Неделя {week})
        </h2>
        <Menu mode="inline">
          <Menu.Item
            key="1"
            icon={<ThunderboltOutlined />}
            style={isEnergyLow ? { color: 'red' } : {}}
          >
            Энергия: {resources.energy}
          </Menu.Item>
          <Menu.Item key="2" icon={<DollarOutlined />}>
            Деньги: {resources.money}
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />}>
            Персонал: {resources.personnel}
          </Menu.Item>
          <Menu.Item key="4" icon={<BarChartOutlined />}>
            Средний прогресс: {averageProgress}%
          </Menu.Item>
          <Menu.Item key="5" icon={<TrophyOutlined />}>
            Достижения: {achievements.length}
          </Menu.Item>
        </Menu>
        <Tooltip
          title={
            <div style={{ textAlign: "left" }}>
              <p>
                <ThunderboltOutlined /> Энергия: {netEnergyChange > 0 ? "+" : ""}
                {netEnergyChange}
              </p>
              <p>
                <DollarOutlined /> Деньги: {netMoneyChange > 0 ? "+" : ""}
                {netMoneyChange}
              </p>
              <p>
                <TeamOutlined /> Персонал: +{personnelGain}
              </p>
            </div>
          }
        >
          <Button
            type="primary"
            style={{ marginTop: "20px" }}
            onClick={nextTurn}
          >
            Следующий день
          </Button>
        </Tooltip>
        <Button
          icon={<InfoCircleOutlined />}
          style={{ marginTop: "20px", marginLeft: "10px" }}
          onClick={showRules}
        >
          Правила
        </Button>
        <h3 style={{ marginTop: "20px" }}>Цели:</h3>
        <ul style={{ textAlign: "left" }}>
          {goals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>
        {achievements.length > 0 && (
          <>
            <h3 style={{ marginTop: "20px" }}>Достижения:</h3>
            <ul style={{ textAlign: "left" }}>
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <Modal
        title="Правила игры"
        visible={isRulesVisible}
        onOk={handleRulesClose}
        onCancel={handleRulesClose}
        footer={[
          <Button key="close" type="primary" onClick={handleRulesClose}>
            Закрыть
          </Button>,
        ]}
      >
        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <Markdown>{rulesText}</Markdown>
        </div>
      </Modal>
    </Sider>
  );
}
