import * as React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import styles from './IconConnect.module.css'
import { useState } from "react";

export const IconConnect = ({ isHover = false }) => {
    // const [isHover, setIsHover] = useState(false)
    console.log(isHover);

    const draw = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            transition: {
                pathLength: { type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay: .5, duration: 1 }
            },

            // duration: 1.5
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            transition: {
                pathLength: { type: "spring", duration: 1.5, bounce: 0 },
                opacity: { duration: 0.01 }
            },
            // fill: "rgba(227, 112, 33, 1)",
            // duration: 1.5
        },
    };
    const unDraw = {
        hidden: {
            opacity: 1,
        },
        visible: {
            opacity: 0,
            transition: {
                pathLength: { type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay: 1.5, duration: .5, }
            },
        },
    };

    // const draw = {
    //     hidden: { pathLength: 0, opacity: 0 },
    //     visible: (i) => {
    //       const delay = 1 + i * 0.5;
    //       return {
    //         pathLength: 1,
    //         opacity: 1,
    //         transition: {
    //           pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
    //           opacity: { delay, duration: 0.01 }
    //         }
    //       };
    //     }
    //   };

    return (
        <motion.div

        // className={styles.box}
        >
            <motion.svg
                width={"100%"}
                height={"100%"}
                viewBox="0 0 97.06 97.06"
                style={{
                    strokeWidth: 7.23,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fill: "transparent",
                }}
            >
                <motion.g
                    stroke="#0061aa"
                    animate={isHover ? "visible" : "hidden"}
                    initial="hidden"
                >
                    <motion.g >
                        <motion.path variants={unDraw} d="M50.76 77.17l-30.87 -30.87 -6.72 6.72c-7.04,7.04 -7.04,18.55 0,25.58l5.29 5.29c7.03,7.03 18.54,7.03 25.57,0l6.73 -6.72z" />
                        <motion.line variants={unDraw} x1="15.81" y1="81.25" x2="3.62" y2="93.44" />
                    </motion.g>
                    <motion.g >
                        <motion.path variants={unDraw} d="M77.17 50.76l-30.87 -30.87 6.72 -6.72c7.04,-7.04 18.55,-7.04 25.58,0l5.29 5.29c7.03,7.03 7.03,18.54 0,25.57l-6.72 6.73z" />
                        <motion.line variants={unDraw} x1="81.25" y1="15.81" x2="93.44" y2="3.62" />
                        <motion.line variants={unDraw} x1="70.56" y1="44.24" x2="54.46" y2="60.35" />
                        <motion.line variants={unDraw} x1="52.99" y1="26.66" x2="37.05" y2="42.6" />
                    </motion.g>
                </motion.g>
                <motion.g
                    animate={isHover ? "visible" : "hidden"}
                    stroke="#e37021"
                    initial="hidden"
                >
                    <motion.g >
                        <motion.path variants={draw} d="M50.76 77.17l-30.87 -30.87 -6.72 6.72c-7.04,7.04 -7.04,18.55 0,25.58l5.29 5.29c7.03,7.03 18.54,7.03 25.57,0l6.73 -6.72z" />
                        <motion.line variants={draw} x1="15.81" y1="81.25" x2="3.62" y2="93.44" />
                    </motion.g>
                    <motion.g >
                        <motion.path variants={draw} d="M77.17 50.76l-30.87 -30.87 6.72 -6.72c7.04,-7.04 18.55,-7.04 25.58,0l5.29 5.29c7.03,7.03 7.03,18.54 0,25.57l-6.72 6.73z" />
                        <motion.line variants={draw} x1="81.25" y1="15.81" x2="93.44" y2="3.62" />
                        <motion.line variants={draw} x1="70.56" y1="44.24" x2="54.46" y2="60.35" />
                        <motion.line variants={draw} x1="52.99" y1="26.66" x2="37.05" y2="42.6" />
                    </motion.g>
                </motion.g>


            </motion.svg>


        </motion.div>
    );
};


// const arrBlue = [{
//     path: "M4489.32 4773.86c-111.47,0 -142.26,-74.41 -142.26,-158.07 0,-89.74 219.06,-274.39 312.19,-367.52 86.13,-86.13 266.85,-286.98 351.72,-343.81l193.48 185.9c-22.23,72.83 -115.39,139.1 -165.82,189.53 -110.51,110.51 -457.87,493.98 -549.31,493.98zm3604.1 -4317.1l0 89.6c-10.37,116.03 -61.83,235.8 -169.7,343.05l-762.94 754.58c23.76,101.98 87,205.6 120.1,322.51 95.14,336.06 76.44,786.66 -62.14,1094.89 -131,291.36 -154.57,296.83 -340.14,529.27 -51.38,64.36 -371.03,385.53 -429.15,424.45 123.09,528.34 -520.61,804.98 -842.01,478.44 -63.41,-64.42 -148.46,-163.76 -217.09,-209.71 -63.22,94.41 -302.14,310.04 -399.14,407.04 -205.54,205.54 -265.88,335.91 -549.31,335.91 -274.62,0 -527.08,-403.2 -233.31,-691.73 122.12,-119.94 565.43,-549.24 616.57,-624.17l-446.49 -438.73c-74.82,50.1 -505.98,496.64 -628.09,620.71 -266.56,270.83 -683.94,50.02 -683.94,-241.33l0 -79.04c0,-268.77 575.37,-634.96 742.95,-885.22 -66.4,-44.46 -155.1,-146.71 -217.74,-209.06 -134.04,-133.43 -130.02,-251.37 -130.02,-407.43 0,-209.19 258.84,-510.13 616.49,-426.81 59.06,-88.19 439.28,-451.16 552.94,-537.77 417.41,-318.08 984.78,-446.56 1507.9,-290.09l310.28 116.52 501.89 -509.79c292.24,-292.24 349.23,-422.85 699.48,-422.85 220,0 420.6,209.25 442.61,456.75zm-4615.78 3289.62c-92.43,0 -158.07,-39.12 -158.07,-126.46 0,-106.87 211.64,-282.78 312.2,-383.33 86.12,-86.13 266.85,-286.98 351.71,-343.81 54.34,14.51 173.45,141.83 205.5,189.69 -46.07,68.8 -403.19,411.08 -509.79,517.69 -49.86,49.86 -115.72,146.22 -201.54,146.22zm237.11 -1612.36c0,-164.37 120.91,-237.12 284.53,-237.12 119.45,0 482.52,411.38 580.92,509.79l1375.25 1375.25c132.87,132.87 241.07,185.35 241.07,359.62 0,135.61 -108.19,237.11 -237.11,237.11 -142.02,0 -249.31,-146.56 -328.01,-225.26l-1683.49 -1683.5c-80.02,-80.01 -233.16,-192.24 -233.16,-335.9zm1944.32 -1122.33c1108.7,0 1834.97,1246.34 1166.82,2225.92 -69.46,101.84 -427.34,479.21 -518.71,540.39l-1987.81 -1995.68c42.78,-65.83 183.94,-191.83 252.94,-260.84 99.3,-99.3 164.9,-173.03 283.52,-253.94 201.21,-137.24 471.83,-255.85 803.24,-255.85zm1343.64 410.99c-83.68,-124.95 -207.01,-248.28 -331.96,-331.95 53.07,-79.26 506.29,-514.2 636.25,-644.16 133.36,-133.36 120.74,-177.83 328.01,-177.83 121.32,0 189.69,110.63 189.69,252.92 0,135.48 -98.45,185.39 -169.94,256.87l-652.05 644.15z",
//     fill: "rgba(227, 112, 33, 1)"
//   },
//   // {
//   //   path: "M1288.57 4593.64c208.29,-231.22 418.26,-150.04 496.82,-788.74 30.38,-246.99 321.71,-334.26 548.17,-94.18 107.68,114.16 470.61,348.67 606.6,591.99 142.37,254.74 835.74,658.18 1199.74,1172.83 178.55,252.45 423.65,305.65 348.66,668.1 -289.65,75.56 -184.49,82.33 -508.96,122.24 -6.34,0.78 -490.86,520.9 -605.44,570.85 -525.77,229.2 -437.8,331.74 -1147.07,331.74 -407.03,0 -815.47,-333.98 -1049.43,-628.89 -369.85,-466.19 -382.43,-1325.76 -9.99,-1819.79 14.19,-18.82 116.88,-119.72 120.92,-126.15z",
//   //   fill: "rgba(255, 255, 255, 1)"
//   // },
//   {
//     path: "M521.65 7824.7c-171.44,0 -252.92,-81.49 -252.92,-252.92 0,-135.48 98.44,-185.39 169.93,-256.88 74.99,-75 138.4,-138.4 213.4,-213.4l438.66 -430.75c83.67,124.95 207,248.28 331.95,331.96 -53.07,79.26 -506.29,514.19 -636.25,644.15 -71.51,71.51 -131.71,177.83 -264.77,177.83zm-521.65 -186.86l0 -92.4c10.8,-115.96 62.96,-235.29 169.7,-341.41l506.07 -505.61c68.9,-68.9 186.12,-201.59 256.88,-248.97 -14.87,-63.82 -81.02,-185.72 -120.08,-322.54 -132.75,-465 -41.69,-996.21 214.7,-1384.89 109.04,-165.3 490.24,-579 616.72,-663.69l-15.8 -126.46c0,-265.84 244.37,-490.03 442.61,-490.03 288.82,0 314.51,37.87 509.79,233.16l1825.76 1825.76c168.98,168.97 225.26,211.37 225.26,470.27 0,273.74 -276.41,537.65 -616.49,458.41 -83.77,125.1 -493.32,508.19 -682.74,629.28 -274.98,175.77 -658.73,297.64 -1011.29,258.66 -550.04,-60.82 -476.86,-129.96 -677.09,-176.6 -47.38,70.75 -180.07,187.97 -248.97,256.87 -88.16,88.16 -164.75,164.75 -252.92,252.92 -255.21,255.21 -352.04,422.85 -667.86,422.85 -248.06,0 -451.31,-209.2 -474.22,-455.59zm1011.68 -1947.15c0,-866.69 567.87,-1090.18 758.76,-1375.25l2011.48 2003.61c-252.85,173.78 -772.41,1108.76 -1946.36,634.34 -206.05,-83.27 -441.26,-289.42 -568.03,-475.26 -152.25,-223.22 -255.85,-489.26 -255.85,-787.44zm885.22 -1691.4c0,-163.62 72.74,-284.53 237.12,-284.53 142.01,0 249.3,146.55 328,225.25 98.7,98.71 185.82,185.83 284.53,284.53 190.91,190.91 370.24,370.25 561.16,561.16l837.79 837.8c80.02,80.01 233.17,192.24 233.17,335.91 0,164.37 -120.92,237.11 -284.53,237.11 -119.46,0 -482.52,-411.38 -580.93,-509.79l-1375.25 -1375.25c-67.53,-67.53 -241.07,-201.55 -241.07,-312.19z",
//     fill: "rgba(227, 112, 33, 1)"
//   }]
//   const icon = (fill) => ({
//     hidden: {
//       opacity: 0,
//       pathLength: 0,
//       fill: "rgba(227, 112, 33, 0)",
//     },
//     visible: {
//       opacity: 1,
//       pathLength: 1,
//       fill: fill,
//     },
//   });

{/* <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 8093.43 8093.43"
          className={styles.item}
          height={300}
          width={500}
        >
          <motion.path
            d={
              "M1288.57 4593.64c208.29,-231.22 418.26,-150.04 496.82,-788.74 30.38,-246.99 321.71,-334.26 548.17,-94.18 107.68,114.16 470.61,348.67 606.6,591.99 142.37,254.74 835.74,658.18 1199.74,1172.83 178.55,252.45 423.65,305.65 348.66,668.1 -289.65,75.56 -184.49,82.33 -508.96,122.24 -6.34,0.78 -490.86,520.9 -605.44,570.85 -525.77,229.2 -437.8,331.74 -1147.07,331.74 -407.03,0 -815.47,-333.98 -1049.43,-628.89 -369.85,-466.19 -382.43,-1325.76 -9.99,-1819.79 14.19,-18.82 116.88,-119.72 120.92,-126.15z"
            }
            fill={"rgba(255, 255, 255, 1)"}
            strokeWidth={0}
          />
          {arrBlue.map((item, index) => (
            <motion.path
              key={index}
              d={item.path}
               variants={icon(item.fill)}
              // initial="hidden"
              // animate={{
              //   scale: [1, 1.1, 1],
              //   fill: [
              //     "rgba(227, 112, 33, 1)",
              //     "rgba(227, 112, 33, 0.5)",
              //     "rgba(227, 112, 33, 1)",
              //   ],
              //   pathLength: [0, 1, 0],
              // }}
              whileHover={{
                
                scale: 1.1,
                rotate:180,
                transition: { duration: .2, },
              }}
              // transition={{
              //   delay: index / 2,
              //   duration: 2,
              //   ease: "easeInOut",
              //   times: [0, 0.5, 1],
              //   repeat: Infinity,
              //   repeatDelay: 1,
              // }}
            />
          ))}
        </motion.svg> */}