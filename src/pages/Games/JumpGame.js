import React, { useState, useEffect } from "react";
import {
  RobotOutlined,
  ThunderboltOutlined,
  CloudOutlined,
} from "@ant-design/icons";
import styles from "./JumpGame.module.css";

export default function JumpGame() {
  const [playerPos, setPlayerPos] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Начать новую игру
  const startGame = () => {
    setIsActive(true);
    setGameStarted(true);
    setScore(0);
    setObstacles([]);
    // Спавн препятствий
    const interval = setInterval(() => {
      const id = Math.random().toString(36).substring(7);
      const newObstacle = {
        id: id,
        type: Math.random() < 0.5 ? "thunder" : "cloud",
        position: window.innerWidth,
      };
      setObstacles((prevObstacles) => [...prevObstacles, newObstacle]);
    }, 2000);

    setTimeout(() => {
      clearInterval(interval);
    }, 10000); // Останавливаем спавн после 10 секунд для примера
  };

  // Обработка нажатия клавиши
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" && playerPos === 0) {
        setPlayerPos(150);
        setTimeout(() => {
          setPlayerPos(0);
        }, 500);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerPos]);

  // Обновление и удаление препятствий
  useEffect(() => {
    const moveObstacles = () => {
      setObstacles((oldObstacles) =>
        oldObstacles
          .map((obstacle) => ({ ...obstacle, position: obstacle.position - 5 }))
          .filter((obstacle) => obstacle.position > -30)
      );
      setScore((prevScore) => prevScore + 1);
    };

    let interval = setInterval(moveObstacles, 50);

    return () => clearInterval(interval);
  }, []);

  // Проверка столкновений
  useEffect(() => {
    const checkCollisions = () => {
      obstacles.forEach((obstacle) => {
        if (
          obstacle.position < 80 &&
          obstacle.position > 30 &&
          playerPos < 100
        ) {
          clearInterval(interval); // Остановка движения препятствий
          setGameStarted(false); // Окончание игры
        }
      });
    };

    let interval = setInterval(checkCollisions, 50);

    return () => clearInterval(interval);
  }, [obstacles, playerPos]);

  return (
    <div
      className={`${styles.gameContainer} ${isActive ? "active" : ""}`}
      onClick={!isActive ? startGame : null}
    >
      <div className={styles.background}></div>
      <div className={styles.horizon}></div>
      <div className={styles.ground}></div>
      {!gameStarted && <div>Click to start!</div>}
      <RobotOutlined className={styles.player} style={{ bottom: playerPos }} />
      {obstacles.map((obstacle) => (
        <div
          key={obstacle.id}
          className={styles.obstacle}
          style={{
            left: obstacle.position,
            bottom:
              obstacle.type === "thunder" ? 30 : 130 /* Высота препятствий */,
          }}
        >
          {obstacle.type === "thunder" ? (
            <ThunderboltOutlined />
          ) : (
            <CloudOutlined />
          )}
        </div>
      ))}
    </div>
  );
}
