import React, { useState } from "react";
import AppHelmet from "../../components/Global/AppHelmet";
import { Typography, InputNumber, Button, Form, Table, Tooltip } from "antd";
import TweenOne from "rc-tween-one";
import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";
import jsonData from "./powerData.json";
import useCalc from "../../stores/useCalc";
import styles from "./Calc.module.css";
import { formItemLayoutForCalc } from "../../components/configSizeForm";

// Добавляем плагин для анимации чисел
TweenOne.plugins.push(Children);

const { Title, Paragraph } = Typography;

const formItemLayout = formItemLayoutForCalc;

export default function Calc() {
  const [form] = Form.useForm();
  const { totalPower, animation, calculatedData, handleFinish } = useCalc();
  const [showInfo, setShowInfo] = useState(true); // Состояние для управления видимостью информации

  const onFinish = (values) => {
    handleFinish(values);
    setShowInfo(false); // Скрыть Tooltip и показать текст информации после нажатия кнопки "Рассчитать"
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
        usageCoefficient:
          section.section === "Электроприборы инженерного назначения"
            ? 0.6
            : 0.3,
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
    {
      title: "Коэффициент использования",
      dataIndex: "usageCoefficient",
      key: "usageCoefficient",
      render: (text, record) =>
        !record.isSection && <span>{record.usageCoefficient.toFixed(1)}</span>,
    },
    {
      title: "Потребляемая мощность (кВт)",
      dataIndex: "consumedPower",
      key: "consumedPower",
      render: (text, record) => {
        if (record.isSection) {
          return null;
        }
        const key = `${record.key}`;
        return calculatedData[key] || null;
      },
    },
  ];

  return (
    <>
      <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
      <div className={styles.container}>
        {showInfo ? (
          <Tooltip
            title="Предлагаемый расчет выполнен для подключения к электрическим сетям по III категории надежности. Для электроприемников третьей категории электроснабжение может выполняться от одного источника питания при условии, что перерывы электроснабжения, необходимые для ремонта или замены поврежденного элемента системы электроснабжения, не превышают 1 суток.
Электроприемники второй категории в нормальных режимах должны обеспечиваться электроэнергией от двух независимых взаимно резервирующих источников питания. Для электроприемников второй категории при нарушении электроснабжения от одного из источников питания допустимы перерывы электроснабжения на время, необходимое для включения резервного питания действиями дежурного персонала или выездной оперативной бригад"
          >
            <span>
              <Title level={2}>Калькулятор мощности ℹ️</Title>
            </span>
          </Tooltip>
        ) : (
          <Title level={2}>Калькулятор мощности</Title>
        )}
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
        <Form form={form} onFinish={onFinish} {...formItemLayout} labelWrap>
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
        {!showInfo && (
          <Paragraph style={{ textAlign: "justify", marginTop: "20px" }}>
            Предлагаемый расчет выполнен для подключения к электрическим сетям
            по III категории надежности. Для электроприемников третьей категории
            электроснабжение может выполняться от одного источника питания при
            условии, что перерывы электроснабжения, необходимые для ремонта или
            замены поврежденного элемента системы электроснабжения, не превышают
            1 суток. Электроприемники второй категории в нормальных режимах
            должны обеспечиваться электроэнергией от двух независимых взаимно
            резервирующих источников питания. Для электроприемников второй
            категории при нарушении электроснабжения от одного из источников
            питания допустимы перерывы электроснабжения на время, необходимое
            для включения резервного питания действиями дежурного персонала или
            выездной оперативной бригад.
          </Paragraph>
        )}
      </div>
    </>
  );
}

// import React from "react";
// import AppHelmet from "../../components/Global/AppHelmet";
// import { Typography, InputNumber, Button, Form, Table, Tooltip } from "antd";
// import TweenOne from "rc-tween-one";
// import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";
// import jsonData from "./powerData.json";
// import useCalc from "../../stores/useCalc";
// import styles from "./Calc.module.css";
// import { formItemLayoutForCalc } from "../../components/configSizeForm";

// // Добавляем плагин для анимации чисел
// TweenOne.plugins.push(Children);

// const { Title, Paragraph } = Typography;

// const formItemLayout = formItemLayoutForCalc;

// export default function Calc() {
//   const [form] = Form.useForm();
//   const { totalPower, animation, calculatedData, handleFinish } = useCalc();

//   // Подготавливаем данные для таблицы и сортируем элементы в каждом разделе по алфавиту
//   const dataSource = jsonData.reduce((acc, section, sectionIndex) => {
//     const sectionItems = section.items
//       .sort((a, b) => a.name.localeCompare(b.name))
//       .map((item, itemIndex) => ({
//         key: `${sectionIndex}-${itemIndex}`,
//         name: item.name,
//         value: item.defaultValue,
//         count: 1,
//         usageCoefficient:
//           section.section === "Электроприборы инженерного назначения"
//             ? 0.6
//             : 0.3,
//         formula: item.formula,
//         description: item.description,
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

//   // Настраиваем столбцы для таблицы
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
//     {
//       title: "Коэффициент использования",
//       dataIndex: "usageCoefficient",
//       key: "usageCoefficient",
//       render: (text, record) =>
//         !record.isSection && <span>{record.usageCoefficient.toFixed(1)}</span>,
//     },
//     {
//       title: "Потребляемая мощность (кВт)",
//       dataIndex: "consumedPower",
//       key: "consumedPower",
//       render: (text, record) => {
//         if (record.isSection) {
//           return null;
//         }
//         const key = `${record.key}`;
//         return calculatedData[key] || null;
//       },
//     },
//   ];

//   return (
//     <>
//       <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
//       <div className={styles.container}>
//         <Tooltip
//           title="Предлагаемый    расчет выполнен для подключения к электрическим сетям по III категории надежности. Для электроприемников третьей категории электроснабжение может выполняться от одного источника питания при условии, что перерывы электроснабжения, необходимые для ремонта или замены поврежденного элемента системы электроснабжения, не превышают 1 суток.
// Электроприемники второй категории в нормальных режимах должны обеспечиваться электроэнергией от двух независимых взаимно резервирующих источников питания. Для электроприемников второй категории при нарушении электроснабжения от одного из источников питания допустимы перерывы электроснабжения на время, необходимое для включения резервного питания действиями дежурного персонала или выездной оперативной бригад"
//         >
//           <span>
//             <Title level={2}>Калькулятор мощности ℹ️</Title>{" "}
//           </span>
//         </Tooltip>
//         <Paragraph style={{ textAlign: "justify", marginBottom: "20px" }}>
//           Только для некоммерческого применения. Для заявителей - физических
//           лиц. Результата расчёта является ориентировочным. Позволяет оценить
//           мощность электрооборудования индивидуального домохозяйства (объекта с
//           бытовым характером нагрузки), необходимую для технологического
//           присоединения к электросети АО "Мособлэнерго". Для получения
//           результата указать основные параметры домохозяйства и количество
//           имеющихся электроприборов. Предложенное значение паспортной мощности
//           электроприбора является средней величиной. Для уточнения можно
//           установить свою величину паспортной мощности электроприбора. Расчет
//           производится с применением коэффициентов использования
//           электроприборов.
//         </Paragraph>
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
