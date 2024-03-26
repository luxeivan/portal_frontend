import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import styles from "./PuzzleGame.module.css";

const { Title, Paragraph } = Typography;

const generatePuzzle = () => {
  let puzzle = Array.from({ length: 15 }, (_, i) => i + 1);
  puzzle.push(0); 
  for (let i = puzzle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]]; 
  }
  return puzzle;
};

const PuzzleGame = () => {
  const [puzzle, setPuzzle] = useState([]);

  useEffect(() => {
    setPuzzle(generatePuzzle());
  }, []);

  const movePiece = (index) => {
    const emptyIndex = puzzle.indexOf(0);
    const canMove =
      (index % 4 === emptyIndex % 4 && Math.abs(index - emptyIndex) === 4) ||
      (Math.floor(index / 4) === Math.floor(emptyIndex / 4) &&
        Math.abs(index - emptyIndex) === 1);

    if (canMove) {
      const newPuzzle = [...puzzle];
      [newPuzzle[index], newPuzzle[emptyIndex]] = [
        newPuzzle[emptyIndex],
        newPuzzle[index],
      ];
      setPuzzle(newPuzzle);
    }
  };

  return (
    <div>
      <Title level={2}>Энергосберегающие пятнашки</Title>
      <Paragraph className={styles.gameDescription}>
        Присоединяйтесь к игре и проверьте свои навыки решения головоломок! Ваша
        задача - восстановить исходный порядок частей изображения, используя как
        можно меньше ходов.
      </Paragraph>
      <Paragraph className={styles.gameRules}>
        <strong>Правила:</strong>
        <ul>
          <li>Кликните на фрагмент, который хотите переместить.</li>
          <li>
            Вы можете перемещать фрагменты только рядом с пустым пространством.
          </li>
          <li>
            Постарайтесь восстановить порядок с минимальным количеством ходов.
          </li>
        </ul>
      </Paragraph>
      <div className={styles.puzzleContainer}>
        {puzzle.map((value, index) => (
          <div
            key={index}
            className={`${styles.puzzlePiece} ${
              value === 0 ? styles.emptyPiece : ""
            }`}
            onClick={() => movePiece(index)}
          >
            {value !== 0 && value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuzzleGame;
