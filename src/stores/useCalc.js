import { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import calcData from "../pages/Calc/calcData.json";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const usageCoefficients = {
  "Электроприборы инженерного назначения": 0.6,
  "Электроприборы бытового назначения": 0.3,
  "Прочие электроприборы": 0.3,
};

export default function useCalc() {
  const [totalPower, setTotalPower] = useState(0);
  const [animation, setAnimation] = useState(null);
  const [calculatedData, setCalculatedData] = useState({});
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const handleFinish = (values) => {
    let total = 0;
    const newCalculatedData = {};

    calcData.sections.forEach((section, sectionIndex) => {
      section.items.forEach((item, itemIndex) => {
        const key = `${sectionIndex}-${itemIndex}`;
        const inputValue = parseFloat(values[key].value);
        const countValue = parseInt(values[key].count, 10) || 0;
        const usageCoefficient =
          parseFloat(values[key].usageCoefficient) ||
          usageCoefficients[section.section] ||
          0.3;

        const formula = item.formula;

        if (!isNaN(inputValue) && formula && countValue > 0) {
          // Подставляем все переменные в формулу
          const expr = formula
            .replace("count", countValue)
            .replace("value", inputValue)
            .replace("usageCoefficient", usageCoefficient);

          // Выполняем формулу
          const result = eval(expr);
          const consumedPower = result; // теперь formula уже учитывает usageCoefficient

          total += consumedPower;
          newCalculatedData[key] = {
            consumedPower: consumedPower.toFixed(2),
            usageCoefficient: usageCoefficient.toFixed(2),
          };
        }
      });
    });

    setAnimation({
      Children: { value: total, floatLength: 2, formatMoney: false },
      duration: 3000,
    });

    setTotalPower(`${total.toFixed(2)} кВт`);
    setCalculatedData(newCalculatedData);
    setShowAdditionalInfo(true);
  };

  const generatePDF = (dataSource, totalPower) => {
    const tableData = dataSource
      .filter((item) => !item.isSection)
      .map((item) => [
        item.name,
        item.value.toFixed(2),
        item.count.toFixed(0),
        item.unit,
        item.usageCoefficient.toFixed(2),
        calculatedData[item.key]?.consumedPower || "0.00",
      ]);

    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();

    const docDefinition = {
      content: [
        { text: 'АО "Мособлэнерго"', style: "header" },
        {
          text: "Калькулятор оценочного расчета электрической мощности",
          style: "header",
        },
        {
          text: "Калькулятор мощности позволяет оценить совокупную мощность электрооборудования индивидуального домохозяйства (объекта с бытовым характером нагрузки), необходимую для технологического присоединения к электросети АО `Мособлэнерго`.",
          style: "subheader",
        },
        {
          text: "Для заявителей - физических лиц. Только для некоммерческого применения.",
          bold: true,
        },
        {
          text: `Дата и время расчета: ${formattedDate} ${formattedTime}`,
          style: "subheader",
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto", "auto", "auto", "auto"],
            body: [
              [
                "Название",
                "Мощность (кВт)",
                "Количество",
                "Единица измерения",
                "Коэффициент использования",
                "Требуемая мощность (кВт)",
              ],
              ...tableData,
            ],
          },
        },
        {
          text: [
            `Итого требуемая электрическая мощность (оценочно): ${totalPower}`,
            { text: "*", superscript: true },
          ],
          style: "total",
          margin: [0, 0, 0, 10],
        },
        {
          text: "* Для точного расчета необходимой мощности, рекомендуем обратиться в специализированные проектные организации.",
          fontSize: 10,
          margin: [0, 0, 0, 0],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 14,
          margin: [0, 0, 0, 10],
        },
        total: {
          fontSize: 14,
          margin: [0, 10, 0, 0],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download("Калькулятор мощности.pdf");
  };

  return {
    totalPower,
    animation,
    calculatedData,
    handleFinish,
    showAdditionalInfo,
    generatePDF,
  };
}

// import { useState } from "react";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import calcData from "../pages/Calc/calcData.json";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// const usageCoefficients = {
//   "Электроприборы инженерного назначения": 0.6,
//   "Электроприборы бытового назначения": 0.3,
//   "Прочие электроприборы": 0.3,
// };

// export default function useCalc() {
//   const [totalPower, setTotalPower] = useState(0);
//   const [animation, setAnimation] = useState(null);
//   const [calculatedData, setCalculatedData] = useState({});
//   const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

//   const handleFinish = (values) => {
//     let total = 0;
//     const newCalculatedData = {};

//     calcData.sections.forEach((section, sectionIndex) => {
//       section.items.forEach((item, itemIndex) => {
//         const key = `${sectionIndex}-${itemIndex}`;
//         const inputValue = parseFloat(values[key].value);
//         const countValue = parseInt(values[key].count, 10) || 0;
//         // Ищем коэффициент по названию секции
//         const usageCoefficient =
//           parseFloat(values[key].usageCoefficient) ||
//           usageCoefficients[section.section] ||
//           0.3;

//         const formula = item.formula;

//         if (!isNaN(inputValue) && formula && countValue > 0) {
//           const expr = formula
//             .replace("count", countValue)
//             .replace("value", inputValue);
//           // Выполняем формулу
//           const result = eval(expr);
//           const consumedPower = result * usageCoefficient;
//           total += consumedPower;
//           newCalculatedData[key] = {
//             consumedPower: consumedPower.toFixed(2),
//             usageCoefficient: usageCoefficient.toFixed(2),
//           };
//         }
//       });
//     });

//     setAnimation({
//       Children: { value: total, floatLength: 2, formatMoney: false },
//       duration: 3000,
//     });

//     setTotalPower(`${total.toFixed(2)} кВт`);
//     setCalculatedData(newCalculatedData);
//     setShowAdditionalInfo(true);
//   };

//   const generatePDF = (dataSource, totalPower) => {
//     const tableData = dataSource
//       .filter((item) => !item.isSection)
//       .map((item) => [
//         item.name,
//         item.value.toFixed(2),
//         item.count.toFixed(0),
//         item.unit,
//         item.usageCoefficient.toFixed(2),
//         calculatedData[item.key]?.consumedPower || "0.00",
//       ]);

//     const now = new Date();
//     const formattedDate = now.toLocaleDateString();
//     const formattedTime = now.toLocaleTimeString();

//     const docDefinition = {
//       content: [
//         { text: 'АО "Мособлэнерго"', style: "header" },
//         {
//           text: "Калькулятор оценочного расчета электрической мощности",
//           style: "header",
//         },
//         {
//           text: "Калькулятор мощности позволяет оценить совокупную мощность электрооборудования индивидуального домохозяйства (объекта с бытовым характером нагрузки), необходимую для технологического присоединения к электросети АО `Мособлэнерго`.",
//           style: "subheader",
//         },
//         {
//           text: "Для заявителей - физических лиц. Только для некоммерческого применения.",
//           bold: true,
//         },
//         {
//           text: `Дата и время расчета: ${formattedDate} ${formattedTime}`,
//           style: "subheader",
//         },
//         {
//           table: {
//             headerRows: 1,
//             widths: ["*", "auto", "auto", "auto", "auto", "auto"],
//             body: [
//               [
//                 "Название",
//                 "Мощность (кВт)",
//                 "Количество",
//                 "Единица измерения",
//                 "Коэффициент использования",
//                 "Требуемая мощность (кВт)",
//               ],
//               ...tableData,
//             ],
//           },
//         },
//         {
//           text: [
//             `Итого требуемая электрическая мощность (оценочно): ${totalPower}`,
//             { text: "*", superscript: true },
//           ],
//           style: "total",
//           margin: [0, 0, 0, 10],
//         },
//         {
//           text: "* Для точного расчета необходимой мощности, рекомендуем обратиться в специализированные проектные организации.",
//           fontSize: 10,
//           margin: [0, 0, 0, 0],
//         },
//       ],
//       styles: {
//         header: {
//           fontSize: 18,
//           bold: true,
//           margin: [0, 0, 0, 10],
//         },
//         subheader: {
//           fontSize: 14,
//           margin: [0, 0, 0, 10],
//         },
//         total: {
//           fontSize: 14,
//           margin: [0, 10, 0, 0],
//         },
//       },
//     };

//     pdfMake.createPdf(docDefinition).download("Калькулятор мощности.pdf");
//   };

//   return {
//     totalPower,
//     animation,
//     calculatedData,
//     handleFinish,
//     showAdditionalInfo,
//     generatePDF,
//   };
// }

// import { useState } from "react";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import jsonData from "../pages/Calc/powerData.json";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// const usageCoefficients = {
//   "Электроприборы инженерного назначения": 0.6,
//   "Электроприборы бытового назначения": 0.3,
// };

// export default function useCalc() {
//   const [totalPower, setTotalPower] = useState(0);
//   const [animation, setAnimation] = useState(null);
//   const [calculatedData, setCalculatedData] = useState({});
//   const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

//   // Функция для обработки данных при отправке формы
//   const handleFinish = (values) => {
//     let total = 0;
//     const tableData = [];
//     const newCalculatedData = {};

//     // Перебираем каждый раздел и элемент в jsonData
//     jsonData.forEach((section, sectionIndex) => {
//       section.items.forEach((item, itemIndex) => {
//         const key = `${sectionIndex}-${itemIndex}`;
//         const inputValue = parseFloat(values[key].value);
//         const countValue = parseInt(values[key].count, 10) || 0;
//         const usageCoefficient =
//           parseFloat(values[key].usageCoefficient) ||
//           usageCoefficients[section.section];
//         const formula = item.formula;

//         // Проверяем, что значение введено корректно, есть формула и countValue больше 0
//         if (!isNaN(inputValue) && formula && countValue > 0) {
//           const result = eval(
//             formula.replace("count", countValue).replace("value", inputValue)
//           );
//           const consumedPower = result * usageCoefficient;
//           total += consumedPower;
//           tableData.push([
//             item.name,
//             inputValue.toFixed(2),
//             countValue.toFixed(0),
//             usageCoefficient.toFixed(2),
//             consumedPower.toFixed(2),
//           ]);
//           newCalculatedData[key] = {
//             consumedPower: consumedPower.toFixed(2),
//             usageCoefficient: usageCoefficient.toFixed(2),
//           };
//         }
//       });
//     });

//     // Настраиваем анимацию для отображения итоговой мощности
//     setAnimation({
//       Children: { value: total, floatLength: 2, formatMoney: false },
//       duration: 3000,
//     });

//     // Устанавливаем итоговую мощность
//     setTotalPower(`${total.toFixed(2)} кВт`);

//     setCalculatedData(newCalculatedData);
//     setShowAdditionalInfo(true); // Показываем дополнительную информацию после расчета
//   };

//   // Функция для генерации PDF
//   const generatePDF = (dataSource, totalPower) => {
//     const tableData = dataSource
//       .filter((item) => !item.isSection)
//       .map((item) => [
//         item.name,
//         item.value.toFixed(2),
//         item.count.toFixed(0),
//         item.unit,
//         item.usageCoefficient.toFixed(2),
//         calculatedData[item.key]?.consumedPower || "0.00",
//       ]);

//     const now = new Date();
//     const formattedDate = now.toLocaleDateString();
//     const formattedTime = now.toLocaleTimeString();

//     const docDefinition = {
//       content: [
//         { text: 'АО "Мособлэнерго"', style: "header" },
//         {
//           text: "Калькулятор оценочного расчета электрической мощности",
//           style: "header",
//         },
//         {
//           text: "Калькулятор мощности позволяет оценить совокупную мощность электрооборудования индивидуального домохозяйства (объекта с бытовым характером нагрузки), необходимую для технологического присоединения к электросети АО `Мособлэнерго`.",
//           style: "subheader",
//         },
//         {
//           text: "Для заявителей - физических лиц. Только для некоммерческого применения.",
//           bold: true,
//         },
//         {
//           text: `Дата и время расчета: ${formattedDate} ${formattedTime}`,
//           style: "subheader",
//         },
//         {
//           table: {
//             headerRows: 1,
//             widths: ["*", "auto", "auto", "auto", "auto", "auto"],
//             body: [
//               [
//                 "Название",
//                 "Мощность (кВт)",
//                 "Количество",
//                 "Единица измерения",
//                 "Коэффициент использования",
//                 "Требуемая мощность (кВт)",
//               ],
//               ...tableData,
//             ],
//           },
//         },
//         {
//           text: [
//             `Итого требуемая электрическая мощность (оценочно): ${totalPower}`,
//             { text: "*", superscript: true },
//           ],
//           style: "total",
//           margin: [0, 0, 0, 10], // Добавляем пробел после текста "Итого требуемая электрическая мощность"
//         },
//         {
//           text: "* Для точного расчета необходимой мощности, рекомендуем обратиться в специализированные проектные организации.",
//           fontSize: 10, // Уменьшаем шрифт для звездочки и текста
//           margin: [0, 0, 0, 0],
//         },
//       ],
//       styles: {
//         header: {
//           fontSize: 18,
//           bold: true,
//           margin: [0, 0, 0, 10],
//         },
//         subheader: {
//           fontSize: 14,
//           margin: [0, 0, 0, 10],
//         },
//         total: {
//           fontSize: 14, // Размер шрифта для итогового текста
//           margin: [0, 10, 0, 0], // Добавляем немного пространства сверху
//         },
//       },
//     };

//     // Скачиваем PDF
//     pdfMake.createPdf(docDefinition).download("Калькулятор мощности.pdf");
//   };

//   // Включаем функцию generatePDF в возвращаемый объект
//   return {
//     totalPower,
//     animation,
//     calculatedData,
//     handleFinish,
//     showAdditionalInfo,
//     generatePDF,
//   };
// }
