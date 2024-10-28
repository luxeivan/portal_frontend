// /Users/yanutstas/Desktop/Project/portal_frontend/src/pages/Games/Game.js

import React, { useState, useEffect } from "react";
import { Layout, notification } from "antd";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import EventModal from "./components/EventModal";
import Summary from "./components/Summary";
import regionsData from "./data/regions.json";
import eventsData from "./data/events.json";
import achievementsData from "./data/achievements.json";
import { getRandomInt } from "./utils";
import MobilePlaceholder from "./components/MobilePlaceholder";

const { Content } = Layout;

export default function Game() {
  // Загружаем состояние игры из localStorage или инициализируем новое
  const [gameState, setGameState] = useState(() => {
    const savedState = localStorage.getItem("gameState");
    return savedState
      ? JSON.parse(savedState)
      : {
          day: 1,
          week: 1,
          resources: {
            energy: 8000,
            money: 8000,
            personnel: 80,
          },
          regions: regionsData,
          events: eventsData,
          achievements: [],
          currentEvent: null,
        };
  });

  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // Сохраняем состояние игры в localStorage при каждом изменении
    localStorage.setItem("gameState", JSON.stringify(gameState));
    checkGameEnd();
    checkAchievements();
  }, [gameState]);

  const nextTurn = () => {
    const newDay = gameState.day + 1;
    const newWeek = Math.ceil(newDay / 7);

    const energyProduction = gameState.regions.reduce(
      (total, region) => total + (region.energyProduction || 10),
      0
    );

    const energyConsumption = gameState.regions.reduce(
      (total, region) => total + (region.energyConsumption || 20),
      0
    );

    const income = 1000;
    const expenses = 0;

    const personnelGain = 10;

    const updatedResources = {
      ...gameState.resources,
      money: gameState.resources.money + income - expenses,
      energy: gameState.resources.energy + energyProduction - energyConsumption,
      personnel: gameState.resources.personnel + personnelGain,
    };

    let event = null;
    const isEvent = Math.random() < 0.5;
    if (isEvent && gameState.events.length > 0) {
      const randomIndex = getRandomInt(0, gameState.events.length - 1);
      event = gameState.events[randomIndex];
    }

    if (event) {
      setGameState((prevState) => ({
        ...prevState,
        day: newDay,
        week: newWeek,
        resources: updatedResources,
        currentEvent: event,
      }));
    } else {
      setGameState((prevState) => ({
        ...prevState,
        day: newDay,
        week: newWeek,
        resources: updatedResources,
      }));
    }
  };

  const handleEventResolve = (action) => {
    const eventEffect = gameState.currentEvent.effect;
    let updatedRegions = [...gameState.regions];
    let updatedResources = { ...gameState.resources };

    if (action === "accept") {
      if (eventEffect.regionId) {
        updatedRegions = updatedRegions.map((region) => {
          if (region.id === eventEffect.regionId) {
            if (eventEffect.progressLoss) {
              region.progress = Math.max(
                0,
                (region.progress || 30) - eventEffect.progressLoss
              );
              region.status = "Проблемы";
            }
            if (eventEffect.progressGain) {
              region.progress = Math.min(
                100,
                (region.progress || 30) + eventEffect.progressGain
              );
              region.status = "Улучшено";
            }
            if (eventEffect.energyLoss) {
              updatedResources.energy = Math.max(
                0,
                updatedResources.energy - eventEffect.energyLoss
              );
            }
            if (eventEffect.energyGain) {
              updatedResources.energy += eventEffect.energyGain;
            }
            if (eventEffect.personnelLoss) {
              updatedResources.personnel = Math.max(
                0,
                updatedResources.personnel - eventEffect.personnelLoss
              );
            }
            if (eventEffect.personnelGain) {
              updatedResources.personnel += eventEffect.personnelGain;
            }
          }
          return region;
        });
      }

      if (eventEffect.regionsAffected) {
        updatedRegions = updatedRegions.map((region) => {
          if (eventEffect.regionsAffected.includes(region.id)) {
            if (eventEffect.progressLoss) {
              region.progress = Math.max(
                0,
                (region.progress || 30) - eventEffect.progressLoss
              );
              region.status = "Проблемы";
            }
            if (eventEffect.progressGain) {
              region.progress = Math.min(
                100,
                (region.progress || 30) + eventEffect.progressGain
              );
              region.status = "Улучшено";
            }
          }
          return region;
        });
      }

      if (eventEffect.allRegions) {
        updatedRegions = updatedRegions.map((region) => {
          if (eventEffect.progressLoss) {
            region.progress = Math.max(
              0,
              (region.progress || 30) - eventEffect.progressLoss
            );
            region.status = "Проблемы";
          }
          if (eventEffect.progressGain) {
            region.progress = Math.min(
              100,
              (region.progress || 30) + eventEffect.progressGain
            );
            region.status = "Улучшено";
          }
          return region;
        });
      }

      if (eventEffect.moneyGain) {
        updatedResources.money += eventEffect.moneyGain;
      }
      if (eventEffect.moneyLoss) {
        updatedResources.money = Math.max(
          0,
          updatedResources.money - eventEffect.moneyLoss
        );
      }
      if (eventEffect.personnelGain) {
        updatedResources.personnel += eventEffect.personnelGain;
      }
      if (eventEffect.personnelLoss) {
        updatedResources.personnel = Math.max(
          0,
          updatedResources.personnel - eventEffect.personnelLoss
        );
      }
      notification.success({ message: "Эффекты события применены" });
    } else {
      notification.info({ message: "Вы проигнорировали событие" });
    }

    setGameState((prevState) => ({
      ...prevState,
      regions: updatedRegions,
      resources: updatedResources,
      currentEvent: null,
    }));
  };

  const checkGameEnd = () => {
    const { resources, regions } = gameState;

    if (
      resources.money <= 0 ||
      resources.energy <= 0 ||
      resources.personnel <= 0
    ) {
      notification.error({
        message: "Игра окончена",
        description: "Вы исчерпали все ресурсы. Попробуйте снова!",
      });
      setIsGameOver(true);
      // Очищаем сохраненное состояние игры
      localStorage.removeItem("gameState");
      return;
    }

    if (!regions || regions.length === 0) {
      return;
    }

    const allRegionsUpgraded = regions.every(
      (region) => (region.progress || 30) >= 100
    );

    if (allRegionsUpgraded) {
      notification.success({
        message: "Поздравляем!",
        description: "Вы успешно улучшили инфраструктуру всех регионов!",
      });
      setIsGameOver(true);
      // Очищаем сохраненное состояние игры
      localStorage.removeItem("gameState");
    }
  };

  const checkAchievements = () => {
    const { achievements, regions, resources, day } = gameState;
    let newAchievements = [...achievements];

    achievementsData.forEach((achievement) => {
      if (
        !achievements.includes(achievement.name) &&
        eval(achievement.condition)
      ) {
        newAchievements.push(achievement.name);
        notification.info({
          message: "Новое достижение!",
          description: achievement.description,
        });
      }
    });

    if (newAchievements.length > achievements.length) {
      setGameState((prevState) => ({
        ...prevState,
        achievements: newAchievements,
      }));
    }
  };

  const onRestart = () => {
    // Очищаем сохраненное состояние игры
    localStorage.removeItem("gameState");
    window.location.reload();
  };

  const energyProduction = gameState.regions.reduce(
    (total, region) => total + (region.energyProduction || 10),
    0
  );
  const energyConsumption = gameState.regions.reduce(
    (total, region) => total + (region.energyConsumption || 20),
    0
  );
  const netEnergyChange = energyProduction - energyConsumption;

  const income = 1000;
  const expenses = 0;
  const netMoneyChange = income - expenses;

  const personnelGain = 10;

  const isMobile = window.innerWidth <= 768;

  return isMobile ? (
    <MobilePlaceholder />
  ) : (
    <Layout style={{ height: "100vh" }}>
      <Sidebar
        gameState={gameState}
        nextTurn={nextTurn}
        netEnergyChange={netEnergyChange}
        netMoneyChange={netMoneyChange}
        personnelGain={personnelGain}
      />
      <Content>
        <Map
          regions={gameState.regions}
          setGameState={setGameState}
          gameState={gameState}
          checkGameEnd={checkGameEnd}
        />
      </Content>
      {gameState.currentEvent && (
        <EventModal
          event={gameState.currentEvent}
          onResolve={handleEventResolve}
        />
      )}
      {isGameOver && <Summary onRestart={onRestart} gameState={gameState} />}
    </Layout>
  );
}
