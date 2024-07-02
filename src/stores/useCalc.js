import { useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import jsonData from "../pages/Calc/powerData.json";

// Инициализируем шрифты для pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Настройка коэффициентов использования
const usageCoefficients = {
  "Электроприборы инженерного назначения": 0.6,
  "Электроприборы бытового назначения": 0.3,
};

export default function useCalc() {
  const [totalPower, setTotalPower] = useState(0);
  const [animation, setAnimation] = useState(null);
  const [calculatedData, setCalculatedData] = useState({});
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  // Функция для обработки данных при отправке формы
  const handleFinish = (values) => {
    let total = 0;
    const tableData = [];
    const newCalculatedData = {};

    // Перебираем каждый раздел и элемент в jsonData
    jsonData.forEach((section, sectionIndex) => {
      section.items.forEach((item, itemIndex) => {
        const key = `${sectionIndex}-${itemIndex}`;
        const inputValue = parseFloat(values[key].value);
        const countValue = parseFloat(values[key].count) || 1;
        const usageCoefficient =
          parseFloat(values[key].usageCoefficient) ||
          usageCoefficients[section.section];
        const formula = item.formula;

        // Проверяем, что значение введено корректно и есть формула
        if (!isNaN(inputValue) && formula) {
          // Вычисляем результат по формуле
          const result = eval(
            formula.replace("count", countValue).replace("value", inputValue)
          );
          // Вычисляем потребляемую мощность
          const consumedPower = inputValue * countValue * usageCoefficient;
          total += consumedPower;
          // Добавляем данные для таблицы
          tableData.push([
            item.name,
            inputValue.toFixed(2),
            countValue.toFixed(0),
            usageCoefficient.toFixed(2),
            consumedPower.toFixed(2),
          ]);
          newCalculatedData[key] = {
            consumedPower: consumedPower.toFixed(2),
            usageCoefficient: usageCoefficient.toFixed(2),
          };
        }
      });
    });

    // Настраиваем анимацию для отображения итоговой мощности
    setAnimation({
      Children: { value: total, floatLength: 2, formatMoney: false },
      duration: 3000,
    });

    // Устанавливаем итоговую мощность
    // setTotalPower(total.toFixed(2));
    setTotalPower(`${total.toFixed(2)} кВт`);

    setCalculatedData(newCalculatedData);
    setShowAdditionalInfo(true); // Показываем дополнительную информацию после расчета
    // Генерируем PDF с результатами (ПОКА ЗАБЛОКИРОВАЛ!!!!)
    // generatePDF(tableData, total);
  };

  // Функция для генерации PDF
  const generatePDF = (tableData, total) => {
    const docDefinition = {
      content: [
        { text: "Калькулятор мощности", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto", "auto", "auto"],
            body: [
              [
                "Название",
                "Мощность (кВт)",
                "Количество",
                "Коэффициент использования",
                "Потребляемая мощность (кВт)",
              ],
              ...tableData,
            ],
          },
        },
        {
          text: `Итого требуемая электрическая мощность (оценочно): ${total} кВт`,
          style: "total",
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        total: {
          margin: [0, 10, 0, 0],
        },
      },
    };

    // Скачиваем PDF
    pdfMake.createPdf(docDefinition).download("Калькулятор мощности.pdf");
  };

  return {
    totalPower,
    animation,
    calculatedData,
    handleFinish,
    showAdditionalInfo,
  };
}
