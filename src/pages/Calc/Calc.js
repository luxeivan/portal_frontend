import React, { useState, useEffect } from "react";
import AppHelmet from "../../components/Global/AppHelmet";
import { Typography, Button, Form, Tooltip } from "antd";
import TweenOne from "rc-tween-one";
import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";
import jsonData from "./powerData.json";
import useCalc from "../../stores/useCalc";
import styles from "./Calc.module.css";
import { formItemLayoutForCalc } from "../../components/configSizeForm";
import CalcTable from "./CalcTable";

// Добавляем плагин для анимации чисел
TweenOne.plugins.push(Children);

const { Title, Paragraph } = Typography;

const formItemLayout = formItemLayoutForCalc;

// Текст для верхней подсказки
const topTooltipText = `Калькулятор мощности позволяет оценить совокупную мощность электрооборудования индивидуального домохозяйства (объекта с бытовым характером нагрузки), необходимую для технологического присоединения к электросети АО "Мособлэнерго". Для заявителей - физических лиц. 
Только для некоммерческого применения.`;

// Текст для дополнительной информации, который будет отображаться после расчета
const additionalInfoText = `Предлагаемый расчет выполнен для подключения к электрическим сетям
по III категории надежности. Для электроприемников третьей категории
электроснабжение может выполняться от одного источника питания при
условии, что перерывы электроснабжения, необходимые для ремонта или
замены поврежденного элемента системы электроснабжения, не превышают
1 сутки. Электроприемники второй категории в нормальных режимах
должны обеспечиваться электроэнергией от двух независимых взаимно
резервирующих источников питания. Для электроприемников второй
категории при нарушении электроснабжения от одного из источников
питания допустимы перерывы электроснабжения на время, необходимое
для включения резервного питания действиями дежурного персонала или
выездной оперативной бригад.`;

// Текст для параграфа под заголовком
const mainParagraphText = `Для расчета можно скорректировать основные параметры
по мощности, количеству и коэффициенту одновременного использования
электроприбора. Предложенное значение паспортной мощности
электроприбора является усреднённой величиной. Для уточнения можно
установить значение паспортной мощности электроприбора.`;

export default function Calc() {
  const [form] = Form.useForm();
  const [isCalculateButtonDisabled, setIsCalculateButtonDisabled] =
    useState(false);
  const [isPdfButtonDisabled, setIsPdfButtonDisabled] = useState(true); // новое состояние для управления активностью кнопки PDF
  const {
    totalPower,
    animation,
    calculatedData,
    handleFinish,
    showAdditionalInfo,
    generatePDF,
  } = useCalc();

  useEffect(() => {
    form.setFieldsValue(calculatedData);
  }, [calculatedData]);

  const onValuesChange = () => {
    setIsCalculateButtonDisabled(false);
  };

  // Подготавливаем данные для таблицы и сортируем элементы в каждом разделе по алфавиту
  const dataSource = jsonData.reduce((acc, section, sectionIndex) => {
    const sectionItems = section.items
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((item, itemIndex) => ({
        key: `${sectionIndex}-${itemIndex}`,
        name: item.name,
        value: item.defaultValue,
        count: 1,
        unit: item.unit || item.defaultUnit || "Штук", // Добавляем unit из JSON или дефолтное значение
        usageCoefficient:
          section.section === "Электроприборы инженерного назначения"
            ? 0.6
            : 0.3,
        formula: item.formula,
        description: item.description,
        fixedUnit: !!item.unit, // Устанавливаем флаг, если unit задан в JSON
      }));
    return [
      ...acc,
      {
        key: `section-${sectionIndex}`,
        section: section.section,
        isSection: true,
      },
      ...sectionItems,
    ];
  }, []);

  const handleFinishWithLock = (values) => {
    setIsCalculateButtonDisabled(true);
    setIsPdfButtonDisabled(false); // активируем кнопку PDF после расчета
    handleFinish(values);
  };

  return (
    <>
      <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
      <div className={styles.container}>
        <Tooltip title={topTooltipText}>
          <span>
            <Title level={2}>Калькулятор мощности ℹ️</Title>{" "}
          </span>
        </Tooltip>
        <Paragraph style={{ textAlign: "justify", marginBottom: "20px" }}>
          {mainParagraphText}
        </Paragraph>
        <Form
          form={form}
          onFinish={handleFinishWithLock}
          onValuesChange={onValuesChange}
          {...formItemLayout}
          labelWrap
        >
          <CalcTable
            dataSource={dataSource}
            calculatedData={calculatedData}
            onValuesChange={onValuesChange}
          />
          <Form.Item className={styles.buttonContainer}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.calculateButton}
              disabled={isCalculateButtonDisabled}
            >
              Рассчитать
            </Button>
            <Button
              type="default"
              onClick={() => generatePDF(dataSource, totalPower)}
              className={styles.downloadButton}
              disabled={!showAdditionalInfo}
              style={{
                position: "absolute", 
                right: "-140px", 
                top: "11px",
              }}
            >
              Выгрузить PDF
            </Button>
          </Form.Item>

        </Form>
        <div className={styles.totalPowerContainer}>
          <Title level={4}>
            Итого требуемая электрическая мощность (оценочно) в кВт:{" "}
            <TweenOne
              animation={animation}
              style={{ fontSize: 24, display: "inline-block" }}
            >
              <span>{totalPower !== "0" ? totalPower : "0"}</span>
            </TweenOne>
          </Title>

          <Paragraph style={{ textAlign: "justify", marginTop: "20px" }}>
            {additionalInfoText}
          </Paragraph>
        </div>
      </div>
      <div className={styles.mobileMessage}>
        Произвести расчет калькулятора вы сможете на полной версии нашего сайта.
      </div>
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import AppHelmet from "../../components/Global/AppHelmet";
// import { Typography, Button, Form, Tooltip } from "antd";
// import TweenOne from "rc-tween-one";
// import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";
// import jsonData from "./powerData.json";
// import useCalc from "../../stores/useCalc";
// import styles from "./Calc.module.css";
// import { formItemLayoutForCalc } from "../../components/configSizeForm";
// import CalcTable from "./CalcTable";

// // Добавляем плагин для анимации чисел
// TweenOne.plugins.push(Children);

// const { Title, Paragraph } = Typography;

// const formItemLayout = formItemLayoutForCalc;

// // Текст для верхней подсказки
// const topTooltipText = `Калькулятор мощности позволяет оценить совокупную мощность электрооборудования индивидуального домохозяйства (объекта с бытовым характером нагрузки), необходимую для технологического присоединения к электросети АО "Мособлэнерго". Для заявителей - физических лиц.
// Только для некоммерческого применения.`;

// // Текст для дополнительной информации, который будет отображаться после расчета
// const additionalInfoText = `Предлагаемый расчет выполнен для подключения к электрическим сетям
// по III категории надежности. Для электроприемников третьей категории
// электроснабжение может выполняться от одного источника питания при
// условии, что перерывы электроснабжения, необходимые для ремонта или
// замены поврежденного элемента системы электроснабжения, не превышают
// 1 сутки. Электроприемники второй категории в нормальных режимах
// должны обеспечиваться электроэнергией от двух независимых взаимно
// резервирующих источников питания. Для электроприемников второй
// категории при нарушении электроснабжения от одного из источников
// питания допустимы перерывы электроснабжения на время, необходимое
// для включения резервного питания действиями дежурного персонала или
// выездной оперативной бригады.`;

// // Текст для параграфа под заголовком
// const mainParagraphText = `Для расчета можно скорректировать основные параметры
// по мощности, количеству и коэффициенту одновременного использования
// электроприбора. Предложенное значение паспортной мощности
// электроприбора является усреднённой величиной. Для уточнения можно
// установить значение паспортной мощности электроприбора.`;

// export default function Calc() {
//   const [form] = Form.useForm();
//   const [isCalculateButtonDisabled, setIsCalculateButtonDisabled] =
//     useState(false);
//   const {
//     totalPower,
//     animation,
//     calculatedData,
//     handleFinish,
//     showAdditionalInfo,
//     generatePDF,
//   } = useCalc();

//   useEffect(() => {
//     form.setFieldsValue(calculatedData);
//   }, [calculatedData]);

//   const onValuesChange = () => {
//     setIsCalculateButtonDisabled(false);
//   };

//   // Подготавливаем данные для таблицы и сортируем элементы в каждом разделе по алфавиту
//   const dataSource = jsonData.reduce((acc, section, sectionIndex) => {
//     const sectionItems = section.items
//       .sort((a, b) => a.name.localeCompare(b.name))
//       .map((item, itemIndex) => ({
//         key: `${sectionIndex}-${itemIndex}`,
//         name: item.name,
//         value: item.defaultValue,
//         count: 1,
//         unit: item.unit || item.defaultUnit || "Штук", // Добавляем unit из JSON или дефолтное значение
//         usageCoefficient:
//           section.section === "Электроприборы инженерного назначения"
//             ? 0.6
//             : 0.3,
//         formula: item.formula,
//         description: item.description,
//         fixedUnit: !!item.unit, // Устанавливаем флаг, если unit задан в JSON
//       }));
//     return [
//       ...acc,
//       {
//         key: `section-${sectionIndex}`,
//         section: section.section,
//         isSection: true,
//       },
//       ...sectionItems,
//     ];
//   }, []);

//   const handleFinishWithLock = (values) => {
//     setIsCalculateButtonDisabled(true);
//     handleFinish(values);
//   };

//   return (
//     <>
//       <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
//       <div className={styles.container}>
//         <Tooltip title={topTooltipText}>
//           <span>
//             <Title level={2}>Калькулятор мощности ℹ️</Title>{" "}
//           </span>
//         </Tooltip>
//         <Paragraph style={{ textAlign: "justify", marginBottom: "20px" }}>
//           {mainParagraphText}
//         </Paragraph>
//         <Form
//           form={form}
//           onFinish={handleFinishWithLock}
//           onValuesChange={onValuesChange}
//           {...formItemLayout}
//           labelWrap
//         >
//           <CalcTable
//             dataSource={dataSource}
//             calculatedData={calculatedData}
//             onValuesChange={onValuesChange}
//           />
//           <Form.Item className={styles.buttonContainer}>
//             <Button
//               type="primary"
//               htmlType="submit"
//               className={styles.calculateButton}
//               disabled={isCalculateButtonDisabled}
//             >
//               Рассчитать
//             </Button>

//             {showAdditionalInfo && (
//               <Button
//                 type="default"
//                 onClick={() => generatePDF(dataSource, totalPower)}
//                 className={styles.downloadButton}
//               >
//                 Выгрузить PDF
//               </Button>
//             )}
//           </Form.Item>
//         </Form>
//         <div className={styles.totalPowerContainer}>
//           <Title level={4}>
//             Итого требуемая электрическая мощность (оценочно) в кВт:{" "}
//             <TweenOne
//               animation={animation}
//               style={{ fontSize: 24, display: "inline-block" }}
//             >
//               <span>{totalPower !== "0" ? totalPower : "0"}</span>
//             </TweenOne>
//           </Title>

//           <Paragraph style={{ textAlign: "justify", marginTop: "20px" }}>
//             {additionalInfoText}
//           </Paragraph>
//         </div>
//       </div>
//       <div className={styles.mobileMessage}>
//         Произвести расчет калькулятора вы сможете на полной версии нашего сайта.
//       </div>
//     </>
//   );
// }
