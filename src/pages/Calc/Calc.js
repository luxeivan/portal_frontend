import React, { useState } from "react";
import AppHelmet from "../../components/Global/AppHelmet";
import { Typography, InputNumber, Button, Form, Table, Tooltip } from "antd";
import TweenOne from "rc-tween-one";
import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import jsonData from "./powerData.json";
import styles from "./Calc.module.css";
import { formItemLayoutForCalc } from "../../components/configSizeForm";

// Добавляем плагин для анимации чисел
TweenOne.plugins.push(Children);

// Инициализируем шрифты для pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const { Title, Paragraph } = Typography;

const formItemLayout = formItemLayoutForCalc;

export default function Calc() {
  const [form] = Form.useForm();
  const [totalPower, setTotalPower] = useState(0);
  const [animation, setAnimation] = useState(null);

  // Функция, которая вызывается при отправке формы
  const handleFinish = (values) => {
    let total = 0;
    const tableData = [];

    // Перебираем каждый раздел и элемент в jsonData
    jsonData.forEach((section, sectionIndex) => {
      section.items.forEach((item, itemIndex) => {
        const key = `${sectionIndex}-${itemIndex}`;
        const inputValue = parseFloat(values[key].value);
        const countValue = parseFloat(values[key].count) || 1;
        const formula = item.formula;

        // Проверяем, что значение введено корректно и есть формула
        if (!isNaN(inputValue) && formula) {
          // Вычисляем результат по формуле
          const result = eval(
            formula.replace("count", countValue).replace("value", inputValue)
          );
          total += result;
          // Добавляем данные для таблицы
          tableData.push([
            item.name,
            inputValue.toFixed(2),
            countValue.toFixed(0),
            result.toFixed(2),
          ]);
        }
      });
    });

    // Настраиваем анимацию для отображения итоговой мощности
    setAnimation({
      Children: { value: total, floatLength: 2, formatMoney: false },
      duration: 3000,
    });

    // Устанавливаем итоговую мощность
    setTotalPower(total.toFixed(2));
    // Генерируем PDF с результатами
    generatePDF(tableData, total);
  };

  // Функция для генерации PDF
  const generatePDF = (tableData, total) => {
    const docDefinition = {
      content: [
        { text: "Калькулятор мощности", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto", "auto"],
            body: [
              ["Название", "Мощность (кВт)", "Количество", "Результат (кВт)"],
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

  // Подготавливаем данные для таблицы и сортируем элементы в каждом разделе по алфавиту
  const dataSource = jsonData.reduce((acc, section, sectionIndex) => {
    const sectionItems = section.items
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((item, itemIndex) => ({
        key: `${sectionIndex}-${itemIndex}`,
        name: item.name,
        value: item.defaultValue,
        count: 1,
        formula: item.formula,
        description: item.description,
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

  // Настраиваем столбцы для таблицы
  const renderColumns = [
    {
      title: "Название электрооборудования",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        record.isSection ? (
          <strong>{record.section}</strong>
        ) : (
          <Tooltip title={record.description || ""}>
            <span>
              {text} {record.description && <span>ℹ️</span>}
            </span>
          </Tooltip>
        ),
    },
    {
      title: (
        <Tooltip title="Средняя/удельная мощность (кВт)">
          <span>Мощность (кВт) ℹ️</span>
        </Tooltip>
      ),
      dataIndex: "value",
      key: "value",
      render: (_, record) =>
        !record.isSection && (
          <Form.Item
            name={[record.key, "value"]}
            initialValue={record.value || record.defaultValue}
            noStyle
          >
            <InputNumber min={0} step={0.01} stringMode />
          </Form.Item>
        ),
    },
    {
      title: "Количество",
      dataIndex: "count",
      key: "count",
      render: (_, record) =>
        !record.isSection && (
          <Form.Item name={[record.key, "count"]} initialValue={1} noStyle>
            <InputNumber min={0} step={1} stringMode />
          </Form.Item>
        ),
    },
  ];

  return (
    <>
      <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
      <div className={styles.container}>
        <Title level={2}>Калькулятор мощности</Title>
        <Paragraph style={{ textAlign: "justify", marginBottom: "20px" }}>
          Только для некоммерческого применения. Для заявителей - физических
          лиц. Результата расчёта является ориентировочным. Позволяет оценить
          мощность электрооборудования индивидуального домохозяйства (объекта с
          бытовым характером нагрузки), необходимую для технологического
          присоединения к электросети АО "Мособлэнерго". Для получения
          результата указать основные параметры домохозяйства и количество
          имеющихся электроприборов. Предложенное значение паспортной мощности
          электроприбора является средней величиной. Для уточнения можно
          установить свою величину паспортной мощности электроприбора. Расчет
          производится с применением коэффициентов использования
          электроприборов.
        </Paragraph>
        <Form form={form} onFinish={handleFinish} {...formItemLayout} labelWrap>
          <Table
            columns={renderColumns}
            dataSource={dataSource}
            pagination={false}
            locale={{ emptyText: "Нет данных" }}
            className={styles.table}
          />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.calculateButton}
            >
              Рассчитать
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.totalPowerContainer}>
          <Title level={4}>
            Итого требуемая электрическая мощность (оценочно):{" "}
            <TweenOne animation={animation} style={{ fontSize: 24 }}>
              {totalPower} кВт
            </TweenOne>
          </Title>
        </div>
      </div>
    </>
  );
}

// import React, { useState } from "react";
// import AppHelmet from "../../components/Global/AppHelmet";
// import { Typography, InputNumber, Button, Form, Table, Tooltip } from "antd";
// import TweenOne from "rc-tween-one";
// import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import jsonData from "./powerData.json";
// import styles from "./Calc.module.css";
// import { formItemLayoutForCalc } from "../../components/configSizeForm";

// TweenOne.plugins.push(Children);

// const { Title } = Typography;

// const formItemLayout = formItemLayoutForCalc;

// export default function Calc() {
//   const [form] = Form.useForm();
//   const [totalPower, setTotalPower] = useState(0);
//   const [animation, setAnimation] = useState(null);

//   const handleFinish = (values) => {
//     let total = 0;
//     const tableData = [];
//     jsonData.forEach((section, sectionIndex) => {
//       section.items.forEach((item, itemIndex) => {
//         const key = `${sectionIndex}-${itemIndex}`;
//         const inputValue = parseFloat(values[key].value);
//         const countValue = parseFloat(values[key].count) || 1;
//         const formula = item.formula;

//         if (!isNaN(inputValue) && formula) {
//           const result = eval(
//             formula.replace("count", countValue).replace("value", inputValue)
//           );
//           total += result;
//           tableData.push({
//             name: item.name,
//             value: inputValue.toFixed(2),
//             count: countValue.toFixed(0),
//             result: result.toFixed(2)
//           });
//         }
//       });
//     });

//     setAnimation({
//       Children: { value: total, floatLength: 2, formatMoney: false },
//       duration: 3000,
//     });

//     setTotalPower(total.toFixed(2));
//     generatePDF(tableData, total);
//   };

//   const generatePDF = (tableData, total) => {
//     const doc = new jsPDF();

//     doc.text("Калькулятор мощности", 14, 20);
//     doc.autoTable({
//       head: [['Название', 'Мощность (кВт)', 'Количество', 'Результат (кВт)']],
//       body: tableData.map(item => [item.name, item.value, item.count, item.result]),
//       startY: 30
//     });
//     doc.text(`Итого требуемая электрическая мощность (оценочно): ${total} кВт`, 14, doc.autoTable.previous.finalY + 10);

//     doc.save("calculation.pdf");
//   };

//   const dataSource = jsonData.reduce((acc, section, sectionIndex) => {
//     const sectionItems = section.items.map((item, itemIndex) => ({
//       key: `${sectionIndex}-${itemIndex}`,
//       name: item.name,
//       value: item.defaultValue,
//       count: 1,
//       formula: item.formula,
//       description: item.description,
//     }));
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

//   const renderColumns = [
//     {
//       title: "Название электрооборудования",
//       dataIndex: "name",
//       key: "name",
//       render: (text, record) =>
//         record.isSection ? (
//           <strong>{record.section}</strong>
//         ) : (
//           <Tooltip title={record.description || ""}>
//             <span>
//               {text} {record.description && <span>ℹ️</span>}
//             </span>
//           </Tooltip>
//         ),
//     },
//     {
//       title: (
//         <Tooltip title="Средняя/удельная мощность (кВт)">
//           <span>Мощность (кВт) ℹ️</span>
//         </Tooltip>
//       ),
//       dataIndex: "value",
//       key: "value",
//       render: (_, record) =>
//         !record.isSection && (
//           <Form.Item
//             name={[record.key, "value"]}
//             initialValue={record.value || record.defaultValue}
//             noStyle
//           >
//             <InputNumber min={0} step={0.01} stringMode />
//           </Form.Item>
//         ),
//     },
//     {
//       title: "Количество",
//       dataIndex: "count",
//       key: "count",
//       render: (_, record) =>
//         !record.isSection && (
//           <Form.Item name={[record.key, "count"]} initialValue={1} noStyle>
//             <InputNumber min={0} step={1} stringMode />
//           </Form.Item>
//         ),
//     },
//   ];

//   return (
//     <>
//       <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
//       <div className={styles.container}>
//         <Title level={1}>Калькулятор мощности</Title>
//         <Form form={form} onFinish={handleFinish} {...formItemLayout} labelWrap>
//           <Table
//             columns={renderColumns}
//             dataSource={dataSource}
//             pagination={false}
//             locale={{ emptyText: "Нет данных" }}
//             className={styles.table}
//           />
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               className={styles.calculateButton}
//             >
//               Рассчитать
//             </Button>
//           </Form.Item>
//         </Form>
//         <div className={styles.totalPowerContainer}>
//           <Title level={4}>
//             Итого требуемая электрическая мощность (оценочно):{" "}
//             <TweenOne animation={animation} style={{ fontSize: 24 }}>
//               {totalPower} кВт
//             </TweenOne>
//           </Title>
//         </div>
//       </div>
//     </>
//   );
// }
