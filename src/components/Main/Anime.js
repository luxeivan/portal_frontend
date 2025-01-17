import * as React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import styles from "./Anime.module.css";
import { Typography, theme } from "antd";
const arr = [
  "M137.6,0.1L157,53.7h-6.6l-12.9-30l-12.9,30h-6.6L137.6,0.1z",
  "M73.2,21.6l36.7,35.8l-5.3,2.6L82.4,40.7l1.3,29.2l-5.3,2.6L73.2,21.6z",
  "M27.1,63l42.9,14.7l-3.2,4l-25-7l12.2,22.7l-3.2,4L27.1,63z",
  "M1.8,117.3l42.9-4.7l-1.2,5l-23.4,4.2l18.5,15.5l-1.3,5L1.8,117.3z",
  "M205.1,22.4L168,57.8l5.2,2.6l22.4-19l-1.7,29.2l5.2,2.6L205.1,22.4z",
  "M249.5,63l-42.9,14.7l3.2,4l25-7l-12.2,22.8l3.2,4L249.5,63z",
  "M274.1,114.8l-42.9-3.9l1.3,5l23.5,3.8l-18.2,15.8l1.3,5L274.1,114.8z",
  "M137.6,300.1l19.4-53.6h-6.6l-12.9,30l-12.9-30h-6.6L137.6,300.1z",
  "M75.6,279.8l36.1-36.4l-5.4-2.5l-21.8,19.7l0.8-29.2l-5.3-2.5L75.6,279.8z",
  "M24.3,233.8l43.3-13.3l-3.1-4.1l-25.1,6.2l12.9-22.3l-3.1-4.1L24.3,233.8z",
  "M201,279.8l-36.1-36.4l5.3-2.5l21.8,19.7l-0.8-29.2l5.3-2.5L201,279.8z",
  "M252.1,234.1l-43.3-13.5l3.1-4.1l25.2,6.3l-12.9-22.4l3.1-4.1L252.1,234.1z",
  "M275.5,180.2l-42.8,5.6l1.1-5l23.3-4.7l-18.8-15.1l1.1-5.1L275.5,180.2z",
  "M0.7,178.2l42.7,6.2l-1.1-5l-23.2-5l19-14.8l-1.1-5L0.7,178.2z",
  "M138.1,59.7c50.2,0,91,40.5,91,90.4s-40.8,90.4-91,90.4s-91-40.5-91-90.4S87.8,59.7,138.1,59.7L138.1,59.7z M138.1,78.4 c-39.9,0-72.2,32.1-72.2,71.7s32.3,71.8,72.2,71.8s72.2-32.2,72.2-71.8S177.9,78.4,138.1,78.4z",
];

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(227, 112, 33, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(227, 112, 33, 1)",
  },
};

export const Anime = () => {
  const { colorPrimary } = theme.useToken().token;

  return (
    <>
      <div className={styles.container}>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 275.8 300.5"
          className={styles.item}
          height={300}
          width={500}
        >
          {arr.map((item, index) => (
            <motion.path
              key={index}
              d={item}
              variants={icon}
              initial="hidden"
              animate="visible"
              transition={{
                default: { duration: 3, ease: "easeInOut" },
                fill: { duration: 3, ease: [1, 0, 0.8, 1], delay: 1 },
              }}
            />
          ))}
        </motion.svg>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1, delay: 2.5 }}
      >
        <Typography.Title
          style={{
            textTransform: "uppercase",
            color: colorPrimary,
            textAlign: "center",
          }}
        >
          Портал цифровых услуг
        </Typography.Title>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 3, delay: 3.5 }}
      >
        <Typography.Title
          style={{
            textTransform: "uppercase",
            color: colorPrimary,
            textAlign: "center",
            marginTop: "-20px",
          }}
        >
          <TypeAnimation
            sequence={[
              "Технологическое присоединение",
              1000,
              "Коммерческие услуги",
              1000,
              "Учёт электрической энергии",
              1000,
              "Сервисные услуги",
              1000,
            ]}
            speed={50}
            style={{
              textTransform: "uppercase",
              color: colorPrimary,
              fontSize: "1.5rem",
            }}
            repeat={Infinity}
          />
        </Typography.Title>
      </motion.div>
    </>
  );
};
