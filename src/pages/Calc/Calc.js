import React, { useState, useEffect } from "react";
import AppHelmet from "../../components/Global/AppHelmet";
import { Typography, Button, Form, Tooltip, Flex } from "antd";
import TweenOne from "rc-tween-one";
import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";
import {
  topTooltipText,
  additionalInfoText,
  mainParagraphText,
} from "./textConstants";
import { prepareDataSource } from "./helpers";
import useCalc from "../../stores/useCalc";
import styles from "./Calc.module.css";
import { formItemLayoutForCalc } from "../../components/configSizeForm";
import CalcTable from "./CalcTable";
import { InfoCircleOutlined } from "@ant-design/icons";
import pdf from "../../../src/img/pdf.svg";

// Добавляем плагин для анимации чисел
TweenOne.plugins.push(Children);

const { Title, Paragraph } = Typography;

const formItemLayout = formItemLayoutForCalc;

export default function Calc() {
  const [form] = Form.useForm();
  const [isCalculateButtonDisabled, setIsCalculateButtonDisabled] =
    useState(false);
  const [isPdfButtonDisabled, setIsPdfButtonDisabled] = useState(true);
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

  const dataSource = prepareDataSource();

  const handleFinishWithLock = (values) => {
    setIsCalculateButtonDisabled(true);
    setIsPdfButtonDisabled(false);
    handleFinish(values);
  };

  return (
    <>
      <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
      <div className={styles.container}>
        {/* <span>
          <Title level={2}>АО "Мособлэнерго"</Title>{" "}
        </span> */}
        <span>
          <Title level={2}>
            Калькулятор оценочного расчета электрической мощности
          </Title>{" "}
        </span>
        <Paragraph style={{ textAlign: "justify", marginBottom: "20px" }}>
          Калькулятор мощности позволяет оценить совокупную мощность
          электрооборудования индивидуального домохозяйства (объекта с бытовым
          характером нагрузки), необходимую для технологического присоединения к
          электросети АО `Мособлэнерго`.
        </Paragraph>
        <Paragraph>
          <b>
            Для заявителей - физических лиц. Только для некоммерческого
            применения
          </b>
          .
        </Paragraph>
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
            <Flex gap={10}>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isCalculateButtonDisabled}
              >
                Рассчитать
              </Button>
              <Button
                type="default"
                onClick={() => generatePDF(dataSource, totalPower)}
                disabled={!showAdditionalInfo}
              >
                Выгрузить PDF
              </Button>
            </Flex>
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
            <sup>*</sup> {/* Добавляем звездочку */}
          </Title>
          <Paragraph style={{ textAlign: "justify", marginTop: "20px" }}>
            {additionalInfoText}
          </Paragraph>
          <Paragraph style={{ textAlign: "justify", marginTop: "10px" }}>
            <sup>*</sup> Для точного расчета необходимой мощности, рекомендуем
            обратиться в специализированные проектные организации.
          </Paragraph>{" "}
          {/* Добавляем текст под звездочкой */}
        </div>
      </div>
      <div className={styles.documentsSection}>
        <Title level={4}>Нормативные документы:</Title>
        <ul className={styles.noBulletList}>
          <li>
            <a href={require("./LegalActs/1.pdf")} download>
              <img src={pdf} alt="PDF" className={styles.pdfIcon} /> Инструкция
              по проектированию городских электрических сетей. РД 34.20.185-94
              (утв. Минтопэнерго России 07.07.1994, РАО "ЕЭС России" 31.05.1994)
              (с изм. от 29.06.1999)
            </a>
          </li>
          <li>
            <a href={require("./LegalActs/2.pdf")} download>
              <img src={pdf} alt="PDF" className={styles.pdfIcon} /> СП
              256.1325800.2016. Свод правил. Электроустановки жилых и
              общественных зданий. Правила проектирования и монтажа (утв.
              Приказом Минстроя России от 29.08.2016 N 602/пр) (ред. от
              28.12.2023)
            </a>
          </li>
          <li>
            <a href={require("./LegalActs/3.pdf")} download>
              <img src={pdf} alt="PDF" className={styles.pdfIcon} /> СП
              31-110-2003. Свод правил по проектированию и строительству.
              Проектирование и монтаж электроустановок жилых и общественных
              зданий (одобрен и рекомендован к применению Постановлением
              Госстроя РФ от 26.10.2003 N 194)
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.mobileMessage}>
        Произвести расчет калькулятора вы сможете на полной версии нашего сайта.
      </div>
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import AppHelmet from "../../components/Global/AppHelmet";
// import { Typography, Button, Form, Tooltip, Flex } from "antd";
// import TweenOne from "rc-tween-one";
// import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";
// import {
//   topTooltipText,
//   additionalInfoText,
//   mainParagraphText,
// } from "./textConstants";
// import { prepareDataSource } from "./helpers";
// import useCalc from "../../stores/useCalc";
// import styles from "./Calc.module.css";
// import { formItemLayoutForCalc } from "../../components/configSizeForm";
// import CalcTable from "./CalcTable";
// import { InfoCircleOutlined } from "@ant-design/icons";

// // Добавляем плагин для анимации чисел
// TweenOne.plugins.push(Children);

// const { Title, Paragraph } = Typography;

// const formItemLayout = formItemLayoutForCalc;

// export default function Calc() {
//   const [form] = Form.useForm();
//   const [isCalculateButtonDisabled, setIsCalculateButtonDisabled] =
//     useState(false);
//   const [isPdfButtonDisabled, setIsPdfButtonDisabled] = useState(true);
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

//   const dataSource = prepareDataSource();

//   const handleFinishWithLock = (values) => {
//     setIsCalculateButtonDisabled(true);
//     setIsPdfButtonDisabled(false);
//     handleFinish(values);
//   };

//   return (
//     <>
//       <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
//       <div className={styles.container}>
//         {/* <Tooltip title={topTooltipText}> */}
//         <span>
//           <Title level={2}>
//             {/* Калькулятор мощности <InfoCircleOutlined /> */}
//             АО "Мособлэнерго"
//           </Title>{" "}
//         </span>
//         <span>
//           <Title level={2}>
//             {/* Калькулятор мощности <InfoCircleOutlined /> */}
//             Калькулятор оценочного расчета электрической мощности
//           </Title>{" "}
//         </span>
//         {/* </Tooltip> */}
//         <Paragraph style={{ textAlign: "justify", marginBottom: "20px" }}>
//           Калькулятор мощности позволяет оценить совокупную мощность
//           электрооборудования индивидуального домохозяйства (объекта с бытовым
//           характером нагрузки), необходимую для технологического присоединения к
//           электросети АО `Мособлэнерго`.{" "}
//           {/* <b>
//             Для заявителей - физических лиц. Только для некоммерческого
//             применения
//           </b>
//           . */}
//         </Paragraph>
//         <Paragraph>
//           <b>
//             Для заявителей - физических лиц. Только для некоммерческого
//             применения
//           </b>
//           .
//         </Paragraph>
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
//             <Flex gap={10}>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 // className={styles.calculateButton}
//                 disabled={isCalculateButtonDisabled}
//               >
//                 Рассчитать
//               </Button>
//               <Button
//                 type="default"
//                 onClick={() => generatePDF(dataSource, totalPower)}
//                 // className={styles.calculateButton}
//                 disabled={!showAdditionalInfo}
//                 // style={{ position: "absolute", right: "-140px", top: "11px" }}
//               >
//                 Выгрузить PDF
//               </Button>
//             </Flex>
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
