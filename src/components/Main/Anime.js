import * as React from "react";
import { TypeAnimation } from 'react-type-animation';
import { motion } from "framer-motion";
import styles from './Anime.module.css'
import { Typography, theme } from "antd";
const arr = [
  "M24.01,0 27.42,9.4 26.27,9.4 24.01,4.14 21.75,9.4 20.6,9.4 z",
  "M12.72,3.76 19.15,10.04 18.22,10.49 14.34,7.11 14.57,12.23 13.64,12.68 z",
  "M4.63,11.03 12.15,13.61 11.58,14.31 7.2,13.09 9.34,17.08 8.77,17.78 z",
  "M0.2,20.55 7.72,19.72 7.51,20.6 3.4,21.33 6.65,24.05 6.43,24.92 z",
  "M35.86,3.9 29.35,10.11 30.27,10.56 34.2,7.23 33.9,12.35 34.82,12.8 z",
  "M43.64,11.02 36.12,13.6 36.69,14.3 41.07,13.07 38.93,17.07 39.5,17.77 z",
  "M47.96,20.12 40.43,19.43 40.66,20.3 44.78,20.96 41.58,23.74 41.81,24.61 z",
  "M24.3 10.04c8.81,0 15.96,7.1 15.96,15.86 0,8.76 -7.15,15.86 -15.96,15.86 -8.81,0 -15.96,-7.1 -15.96,-15.86 0,-8.76 7.15,-15.86 15.96,-15.86zm0 3.27c-6.99,0 -12.66,5.63 -12.66,12.58 0,6.95 5.67,12.59 12.66,12.59 6.99,0 12.66,-5.64 12.66,-12.59 0,-6.95 -5.67,-12.58 -12.66,-12.58z",
  "M24.01,52.62 27.42,43.22 26.27,43.22 24.01,48.48 21.75,43.22 20.6,43.22 z",
  "M13.15,49.06 19.48,42.67 18.54,42.24 14.72,45.69 14.86,40.56 13.93,40.13 z",
  "M4.14,40.98 11.74,38.64 11.19,37.92 6.78,39 9.04,35.08 8.5,34.36 z",
  "M35.13,49.06 28.8,42.67 29.73,42.24 33.56,45.69 33.42,40.56 34.35,40.13 z",
  "M44.1,41.03 36.5,38.67 37.05,37.95 41.47,39.05 39.21,35.12 39.76,34.4 z",
  "M48.2,31.59 40.69,32.57 40.89,31.69 44.98,30.87 41.68,28.23 41.88,27.34 z",
  "M0,31.24 7.49,32.33 7.3,31.45 3.23,30.57 6.57,27.97 6.38,27.09 z",
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
          viewBox="0 0 48.2 52.62"
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
                fill: { duration: 3, ease: [1, 0, 0.8, 1] },
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
        <Typography.Title style={{ textTransform: "uppercase", color: colorPrimary, textAlign: "center" }}>
          Портал цифровых услуг
        </Typography.Title>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1, delay: 3.5 }}
      >
        <Typography.Title style={{ textTransform: "uppercase", color: colorPrimary, textAlign: "center",marginTop:"-20px" }}>

          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed once, initially
              'Технологическое присоединение',
              1000,
              'Коммерческие услуги',
              1000,
              'Учёт электрической энергии',
              1000,
              'Сервисные услуги',
              1000,
            ]}
            speed={50}
            style={{ textTransform: "uppercase", color: colorPrimary, fontSize: "1.5rem" }}
            repeat={Infinity}
          />
        </Typography.Title>
      </motion.div>
    </>
  )
};
