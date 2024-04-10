import React, { useState, useEffect } from "react";
import { Button, Typography } from "antd";
import styles from "./PuzzleGame.module.css";

import moveSoundFile from "../../assets/sounds/Movie.mp3";
import characterImage from "../../../src/img/about/mosoblik.png";

const { Title, Paragraph } = Typography;

const generatePuzzle = (size) => {
  let puzzle = Array.from({ length: size * size - 1 }, (_, i) => i + 1);
  puzzle.push(0);
  for (let i = puzzle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]];
  }
  return puzzle;
};


const PuzzleGame = () => {
  const moveSound = new Audio(moveSoundFile);
  const [level, setLevel] = useState(1); 
  const [puzzle, setPuzzle] = useState(generatePuzzle(level === 1 ? 4 : 5)); 
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [dialogueStep, setDialogueStep] = useState(0);

  
  useEffect(() => {
    setPuzzle(generatePuzzle(level === 1 ? 4 : 5)); 
  }, [level]);

  const startGame = () => {
    setIsGameStarted(true);
  };

  const nextDialogue = () => {
    setDialogueStep((prevStep) => prevStep + 1);
  };

  const checkIfLevelCompleted = (currentPuzzle) => {
    const isCompleted = currentPuzzle.slice(0, -1).every((item, index) => item === index + 1);
    if (isCompleted && level === 1) {
      setLevel(2); 
      setPuzzle(generatePuzzle(5)); 
    }
  };

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
      //moveSound.play();
      checkIfLevelCompleted(newPuzzle);
    }
  };

  if (!isGameStarted) {
    return (
      <div className={styles.introScreen}>
        <div className={styles.characterContainer}>
          <img
            src={characterImage}
            alt="Character"
            className={styles.character}
          />
          <div className={styles.speechBubble}>
            <p>
              {dialogueStep === 0
                ? "Привет! Я Энергетик!"
                : "Давай сыграем в мини-игру и поможем планете!"}
            </p>
            {dialogueStep < 1 ? (
              <Button type="primary" onClick={nextDialogue}>
                Далее
              </Button>
            ) : (
              <Button type="primary" onClick={startGame}>
                Начать
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Title level={2}>Энергосберегающие пятнашки</Title>
      <Paragraph className={styles.gameDescription}>
        <b> Уложитесь в минимум ходов, сберегите максимум ресурсов! </b> Каждый
        ваш ход в "пятнашках" может помочь сэкономить энергию! Присоединяйтесь к
        игре от МосОблЭнерго и отражайте на практике, как внимательное и
        осознанное использование ресурсов способствует их сохранению.
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



// import React, { useState, useEffect } from "react";
// import { Button, Typography } from "antd";
// import styles from "./PuzzleGame.module.css";

// import moveSoundFile from "../../assets/sounds/Movie.mp3";
// import characterImage from "../../../src/img/about/mosoblik.png";

// const { Title, Paragraph } = Typography;

// const generatePuzzle = () => {
//   let puzzle = Array.from({ length: 15 }, (_, i) => i + 1);
//   puzzle.push(0);
//   for (let i = puzzle.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]];
//   }
//   return puzzle;
// };

// const PuzzleGame = () => {
//   const moveSound = new Audio(moveSoundFile);
//   const [puzzle, setPuzzle] = useState([]);
//   const [isGameStarted, setIsGameStarted] = useState(false);
//   const [dialogueStep, setDialogueStep] = useState(0);

//   useEffect(() => {
//     setPuzzle(generatePuzzle());
//   }, []);

//   const startGame = () => {
//     setIsGameStarted(true);
//   };

//   const nextDialogue = () => {
//     setDialogueStep((prevStep) => prevStep + 1);
//   };

//   const movePiece = (index) => {
//     const emptyIndex = puzzle.indexOf(0);
//     const canMove =
//       (index % 4 === emptyIndex % 4 && Math.abs(index - emptyIndex) === 4) ||
//       (Math.floor(index / 4) === Math.floor(emptyIndex / 4) &&
//         Math.abs(index - emptyIndex) === 1);

//     if (canMove) {
//       const newPuzzle = [...puzzle];
//       [newPuzzle[index], newPuzzle[emptyIndex]] = [
//         newPuzzle[emptyIndex],
//         newPuzzle[index],
//       ];
//       setPuzzle(newPuzzle);
//       moveSound.play();
//     }
//   };

//   if (!isGameStarted) {
//     return (
//       <div className={styles.introScreen}>
//         <div className={styles.characterContainer}>
//           <img
//             src={characterImage}
//             alt="Character"
//             className={styles.character}
//           />
//           <div className={styles.speechBubble}>
//             <p>
//               {dialogueStep === 0
//                 ? "Привет! Я МосОблик!"
//                 : "Давай сыграем в мини-игру и поможем планете!"}
//             </p>
//             {dialogueStep < 1 ? (
//               <Button type="primary" onClick={nextDialogue}>
//                 Далее
//               </Button>
//             ) : (
//               <Button type="primary" onClick={startGame}>
//                 Начать
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Title level={2}>Энергосберегающие пятнашки</Title>
//       <Paragraph className={styles.gameDescription}>
//         <b> Уложитесь в минимум ходов, сберегите максимум ресурсов! </b> Каждый
//         ваш ход в "пятнашках" может помочь сэкономить энергию! Присоединяйтесь к
//         игре от МосОблЭнерго и отражайте на практике, как внимательное и
//         осознанное использование ресурсов способствует их сохранению.
//       </Paragraph>
//       <Paragraph className={styles.gameRules}>
//         <strong>Правила:</strong>
//         <ul>
//           <li>Кликните на фрагмент, который хотите переместить.</li>
//           <li>
//             Вы можете перемещать фрагменты только рядом с пустым пространством.
//           </li>
//           <li>
//             Постарайтесь восстановить порядок с минимальным количеством ходов.
//           </li>
//         </ul>
//       </Paragraph>
//       <div className={styles.puzzleContainer}>
//         {puzzle.map((value, index) => (
//           <div
//             key={index}
//             className={`${styles.puzzlePiece} ${
//               value === 0 ? styles.emptyPiece : ""
//             }`}
//             onClick={() => movePiece(index)}
//           >
//             {value !== 0 && value}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PuzzleGame;
