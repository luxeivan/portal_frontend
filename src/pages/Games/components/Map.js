import React from "react";
import {
  Card,
  Button,
  message,
  Progress,
  Badge,
  Row,
  Col,
  Tooltip,
} from "antd";
import { EnvironmentOutlined, ToolOutlined } from "@ant-design/icons";
import styles from "./Map.module.css";

export default function Map({
  regions,
  setGameState,
  gameState,
  checkGameEnd,
}) {
  const handleUpgrade = (regionId) => {
    setGameState((prevState) => {
      const regionToUpgrade = prevState.regions.find(
        (region) => region.id === regionId
      );

      const upgradeLevel = regionToUpgrade.upgradeLevel || 0;
      const upgradeCost = 500 * (upgradeLevel + 1);
      const requiredPersonnel = 2 * (upgradeLevel + 1);

      if (prevState.resources.money < upgradeCost) {
        message.error("Недостаточно денег для улучшения!");
        return prevState;
      }
      if (prevState.resources.personnel < requiredPersonnel) {
        message.error("Недостаточно персонала для улучшения!");
        return prevState;
      }

      const updatedRegions = prevState.regions.map((region) => {
        if (region.id === regionId) {
          const newUpgradeLevel = upgradeLevel + 1;
          const newProgress = Math.min(100, region.progress + 20);
          const newEnergyConsumption = Math.max(
            0,
            (region.energyConsumption || 20) - 5
          );
          const newEnergyProduction = (region.energyProduction || 10) + 5;
          return {
            ...region,
            upgradeLevel: newUpgradeLevel,
            progress: newProgress,
            energyConsumption: newEnergyConsumption,
            energyProduction: newEnergyProduction,
          };
        }
        return region;
      });

      const updatedResources = {
        ...prevState.resources,
        money: prevState.resources.money - upgradeCost,
        personnel: prevState.resources.personnel - requiredPersonnel,
      };

      message.success(
        `Инфраструктура региона ${regionToUpgrade.name} улучшена до уровня ${
          upgradeLevel + 1
        }!`
      );

      const newState = {
        ...prevState,
        regions: updatedRegions,
        resources: updatedResources,
      };

      return newState;
    });
    checkGameEnd();
  };

  const getProgressColor = (percent) => {
    if (percent < 33) return "#ff4d4f";
    if (percent < 66) return "#faad14";
    return "#52c41a";
  };

  return (
    <div className={styles.mapContainer}>
      <Row gutter={[16, 16]}>
        {regions.map((region) => {
          const upgradeLevel = region.upgradeLevel || 0;
          const progressPercent = Math.floor(region.progress || 30);
          const progressColor = getProgressColor(progressPercent);

          const upgradeCost = 500 * (upgradeLevel + 1);
          const requiredPersonnel = 2 * (upgradeLevel + 1);

          const cardStyle =
            progressPercent >= 100 ? { backgroundColor: "#e6fffb" } : {};

          return (
            <Col xs={24} sm={12} md={8} lg={6} key={region.id}>
              <Card
                className={styles.regionCard}
                hoverable
                style={cardStyle}
                
              >
                <Card.Meta
                  title={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <EnvironmentOutlined style={{ marginRight: 8 }} />
                      {region.name}
                    </div>
                  }
                />
                <div style={{ marginTop: 10 }}>
                  <p>Уровень улучшения: {upgradeLevel}</p>
                  <p>
                    Прогресс:
                    <Progress
                      percent={progressPercent}
                      size="small"
                      strokeColor={progressColor}
                      style={{ marginTop: 5 }}
                    />
                  </p>
                  <p>Потребление энергии: {region.energyConsumption || 20}</p>
                  <p>Выработка энергии: {region.energyProduction || 10}</p>
                  <p>
                    Состояние:{" "}
                    <Badge
                      status={
                        region.status === "Норма" ||
                        region.status === "Улучшено"
                          ? "success"
                          : region.status === "Проблемы"
                          ? "error"
                          : "warning"
                      }
                      text={region.status}
                    />
                  </p>
                  <div style={{ marginTop: 10 }}>
                    <Tooltip
                      title={`Стоимость улучшения: ${upgradeCost} денег, ${requiredPersonnel} персонала`}
                    >
                      <Button
                        type="primary"
                        icon={<ToolOutlined />}
                        onClick={() => handleUpgrade(region.id)}
                        disabled={progressPercent >= 100}
                        block
                      >
                        {progressPercent >= 100
                          ? "Макс. уровень"
                          : `Улучшить (💰${upgradeCost}, 👥${requiredPersonnel})`}
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
