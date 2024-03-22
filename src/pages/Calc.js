import React, { useState } from "react";
import AppHelmet from "../components/Global/AppHelmet";
import { Image, Typography } from "antd";
import imgCalc from "../img/calc/calculator.webp";
import styles from "./Calc.module.css";

const { Title } = Typography;

export default function Calc() {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(input + e.target.name);
  };

  const calculate = () => {
    try {
      setInput((eval(input) || "") + "");
    } catch (e) {
      setInput("error");
    }
  };

  const clearInput = () => {
    setInput("");
  };

  const backspaceInput = () => {
    setInput(input.slice(0, -1));
  };

  return (
    <>
      <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
      <div>
        {/* <Title level={1}>Калькулятор мощности</Title>
                
                <Image
                     width={300}
                    preview={false}
                    src={imgCalc}
                /> */}

        <Title level={1}>Калькулятор мощности</Title>

        <div className={styles.calculator}>
          <div className={styles.screen}>{input}</div>
          <div className={styles.button_row}>
            <button className={styles.button} onClick={clearInput}>
              C
            </button>
            <button className={styles.button} onClick={backspaceInput}>
              &larr;
            </button>
            <button className={styles.button} name="/" onClick={handleInput}>
              &divide;
            </button>
          </div>
          <div className={styles.button_row}>
            <button className={styles.button} name="7" onClick={handleInput}>
              7
            </button>
            <button className={styles.button} name="8" onClick={handleInput}>
              8
            </button>
            <button className={styles.button} name="9" onClick={handleInput}>
              9
            </button>
            <button className={styles.button} name="*" onClick={handleInput}>
              &times;
            </button>
          </div>
          <div className={styles.button_row}>
            <button className={styles.button} name="4" onClick={handleInput}>
              4
            </button>
            <button className={styles.button} name="5" onClick={handleInput}>
              5
            </button>
            <button className={styles.button} name="6" onClick={handleInput}>
              6
            </button>
            <button className={styles.button} name="-" onClick={handleInput}>
              &ndash;
            </button>
          </div>
          <div className={styles.button_row}>
            <button className={styles.button} name="1" onClick={handleInput}>
              1
            </button>
            <button className={styles.button} name="2" onClick={handleInput}>
              2
            </button>
            <button className={styles.button} name="3" onClick={handleInput}>
              3
            </button>
            <button className={styles.button} name="+" onClick={handleInput}>
              +
            </button>
          </div>
          <div className={styles.button_row}>
            <button className={styles.button} name="0" onClick={handleInput}>
              0
            </button>
            <button className={styles.button} name="." onClick={handleInput}>
              .
            </button>
            <button className={styles.button_equals} onClick={calculate}>
              =
            </button>
          </div>
        </div>
      </div>
    </>
  );
}