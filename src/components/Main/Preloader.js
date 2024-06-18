import * as React from "react";
import { motion } from "framer-motion";
import styles from './Anime.module.css'
const arr = [
    "M137.6,0.1L157,53.7h-6.6l-12.9-30l-12.9,30h-6.6L137.6,0.1z",
    "M205.1,22.4L168,57.8l5.2,2.6l22.4-19l-1.7,29.2l5.2,2.6L205.1,22.4z",
    "M73.2,21.6l36.7,35.8l-5.3,2.6L82.4,40.7l1.3,29.2l-5.3,2.6L73.2,21.6z",
    "M27.1,63l42.9,14.7l-3.2,4l-25-7l12.2,22.7l-3.2,4L27.1,63z",
    "M1.8,117.3l42.9-4.7l-1.2,5l-23.4,4.2l18.5,15.5l-1.3,5L1.8,117.3z",
    "M249.5,63l-42.9,14.7l3.2,4l25-7l-12.2,22.8l3.2,4L249.5,63z",
    "M274.1,114.8l-42.9-3.9l1.3,5l23.5,3.8l-18.2,15.8l1.3,5L274.1,114.8z",
    "M137.6,300.1l19.4-53.6h-6.6l-12.9,30l-12.9-30h-6.6L137.6,300.1z",
    "M75.6,279.8l36.1-36.4l-5.4-2.5l-21.8,19.7l0.8-29.2l-5.3-2.5L75.6,279.8z",
    "M24.3,233.8l43.3-13.3l-3.1-4.1l-25.1,6.2l12.9-22.3l-3.1-4.1L24.3,233.8z",
    "M201,279.8l-36.1-36.4l5.3-2.5l21.8,19.7l-0.8-29.2l5.3-2.5L201,279.8z",
    "M252.1,234.1l-43.3-13.5l3.1-4.1l25.2,6.3l-12.9-22.4l3.1-4.1L252.1,234.1z",
    "M275.5,180.2l-42.8,5.6l1.1-5l23.3-4.7l-18.8-15.1l1.1-5.1L275.5,180.2z",
    "M0.7,178.2l42.7,6.2l-1.1-5l-23.2-5l19-14.8l-1.1-5L0.7,178.2z",
];


export const Preloader = () => {    
    return (        
        // <div className={styles.container}>
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 275.8 300.5"
                className={styles.item}
                height={150}
                width={150}
                animate={{
                    opacity: [0, 1]
                }}
                transition={{
                    duration: .5
                }}
                >
                <motion.path
                    d={"M138.1,59.7c50.2,0,91,40.5,91,90.4s-40.8,90.4-91,90.4s-91-40.5-91-90.4S87.8,59.7,138.1,59.7L138.1,59.7z M138.1,78.4 c-39.9,0-72.2,32.1-72.2,71.7s32.3,71.8,72.2,71.8s72.2-32.2,72.2-71.8S177.9,78.4,138.1,78.4z"}
                    fill={"rgba(227, 112, 33, 1)"}
                    strokeWidth={0}
                />
                {arr.map((item, index) => (
                    <motion.path
                        key={index}
                        d={item}
                        strokeWidth={0}
                        pathLength={0}
                        animate={{
                            scale: [1, 1.3, 1],
                            fill: [
                                "rgba(227, 112, 33, 1)", 
                                "rgba(227, 112, 33, .5)", 
                                "rgba(227, 112, 33, 1)"
                            ],
                            pathLength: [0, 1, 0]
                        }}
                        transition={{
                            delay: index / 7,
                            duration: 1,
                            ease: "easeInOut",
                            times: [0, 0.5, 1],
                            repeat: Infinity,
                            repeatDelay: 1
                        }}
                    />
                ))}
            </motion.svg>
        // </div>

    )
};
