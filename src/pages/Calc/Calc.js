import React, { useState } from "react";
import AppHelmet from "../../components/Global/AppHelmet";
import { Typography, InputNumber, Button, Form, Collapse, Spin } from "antd";
import jsonData from "./powerData.json";
import styles from "./Calc.module.css";

const { Title } = Typography;
const { Panel } = Collapse;

const formulaCalculation = {
  "area": (inputValue, formula) => eval(formula.replace('area', inputValue)),
  "count": (inputValue, formula) => eval(formula.replace('count', inputValue)),
  "length": (inputValue, formula) => eval(formula.replace('length', inputValue))
};

export default function Calc() {
  const [form] = Form.useForm();
  const [totalPower, setTotalPower] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      let total = 0;
      Object.keys(values).forEach((key) => {
        const [sectionIndex, itemIndex] = key.split("-");
        const item = jsonData[sectionIndex].items[itemIndex];
        const inputValue = parseFloat(values[key]);
        if (!isNaN(inputValue) && item.formula) {
          const formulaType = item.formula.includes('area') ? 'area' : (item.formula.includes('count') ? 'count' : 'length');
          total += formulaCalculation[formulaType](inputValue, item.formula);
        }
      });
      setTotalPower(total.toFixed(2));
      setLoading(false);
    }, 2000); // Задержка для имитации расчета
  };

  return (
    <>
      <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
      <div>
        <Title level={1}>Калькулятор мощности</Title>
        <Form form={form} onFinish={handleFinish}>
          <Collapse>
            {jsonData.map((section, sectionIndex) => (
              <Panel header={section.section} key={sectionIndex}>
                {section.items.map((item, itemIndex) => (
                  <div key={`${sectionIndex}-${itemIndex}`} className={styles.inputGroup}>
                    <Form.Item
                      label={item.name}
                      name={`${sectionIndex}-${itemIndex}`}
                      key={`${sectionIndex}-${itemIndex}`}
                    >
                      <InputNumber min={0} step={0.01} stringMode />
                    </Form.Item>
                    <Form.Item
                      label="Количество"
                      name={`${sectionIndex}-${itemIndex}-count`}
                      key={`${sectionIndex}-${itemIndex}-count`}
                    >
                      <InputNumber min={0} step={1} stringMode />
                    </Form.Item>
                  </div>
                ))}
              </Panel>
            ))}
          </Collapse>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              {loading ? <Spin /> : "Рассчитать"}
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.totalPower}>
          <Title level={4}>
            Итого требуемая электрическая мощность (оценочно): {totalPower} кВт
          </Title>
        </div>
      </div>
    </>
  );
}


//Старый калькулятор
// import React, { useState } from "react";
// import AppHelmet from "../../components/Global/AppHelmet";
// import { Image, Typography } from "antd";
// import imgCalc from "../../img/calc/calculator.webp";
// import styles from "./Calc.module.css";

// const { Title } = Typography;

// export default function Calc() {
//   const [input, setInput] = useState("");

//   const handleInput = (e) => {
//     setInput(input + e.target.name);
//   };

//   const calculate = () => {
//     try {
//       setInput((eval(input) || "") + "");
//     } catch (e) {
//       setInput("error");
//     }
//   };

//   const clearInput = () => {
//     setInput("");
//   };

//   const backspaceInput = () => {
//     setInput(input.slice(0, -1));
//   };

//   return (
//     <>
//       <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
//       <div>
//         {/* <Title level={1}>Калькулятор мощности</Title>

//                 <Image
//                      width={300}
//                     preview={false}
//                     src={imgCalc}
//                 /> */}

//         <Title level={1}>Калькулятор мощности</Title>

//         <div className={styles.calculator}>
//           <div className={styles.screen}>{input}</div>
//           <div className={styles.button_row}>
//             <button className={styles.button} onClick={clearInput}>
//               C
//             </button>
//             <button className={styles.button} onClick={backspaceInput}>
//               &larr;
//             </button>
//             <button className={styles.button} name="/" onClick={handleInput}>
//               &divide;
//             </button>
//           </div>
//           <div className={styles.button_row}>
//             <button className={styles.button} name="7" onClick={handleInput}>
//               7
//             </button>
//             <button className={styles.button} name="8" onClick={handleInput}>
//               8
//             </button>
//             <button className={styles.button} name="9" onClick={handleInput}>
//               9
//             </button>
//             <button className={styles.button} name="*" onClick={handleInput}>
//               &times;
//             </button>
//           </div>
//           <div className={styles.button_row}>
//             <button className={styles.button} name="4" onClick={handleInput}>
//               4
//             </button>
//             <button className={styles.button} name="5" onClick={handleInput}>
//               5
//             </button>
//             <button className={styles.button} name="6" onClick={handleInput}>
//               6
//             </button>
//             <button className={styles.button} name="-" onClick={handleInput}>
//               &ndash;
//             </button>
//           </div>
//           <div className={styles.button_row}>
//             <button className={styles.button} name="1" onClick={handleInput}>
//               1
//             </button>
//             <button className={styles.button} name="2" onClick={handleInput}>
//               2
//             </button>
//             <button className={styles.button} name="3" onClick={handleInput}>
//               3
//             </button>
//             <button className={styles.button} name="+" onClick={handleInput}>
//               +
//             </button>
//           </div>
//           <div className={styles.button_row}>
//             <button className={styles.button} name="0" onClick={handleInput}>
//               0
//             </button>
//             <button className={styles.button} name="." onClick={handleInput}>
//               .
//             </button>
//             <button className={styles.button_equals} onClick={calculate}>
//               =
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
