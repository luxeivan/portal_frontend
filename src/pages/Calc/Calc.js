import React, { useState, useEffect } from "react";
import AppHelmet from "../../components/Global/AppHelmet";
import {
  Typography,
  InputNumber,
  Button,
  Form,
  Table,
  Tooltip,
  Select,
} from "antd";
import TweenOne from "rc-tween-one";
import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";
import jsonData from "./powerData.json";
import useCalc from "../../stores/useCalc";
import styles from "./Calc.module.css";
import { formItemLayoutForCalc } from "../../components/configSizeForm";

// Добавляем плагин для анимации чисел
TweenOne.plugins.push(Children);

const { Title, Paragraph } = Typography;
const { Option } = Select;

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
const mainParagraphText = `Для получения результата вы можете скорректировать основные параметры
по мощности, количеству и коэффициенту одновременного использования
электроприборов. Предложенное значение паспортной мощности
электроприбора является средней величиной. Для уточнения можно
установить свою величину паспортной мощности электроприбора.`;

export default function Calc() {
  const [form] = Form.useForm();
  const [isCalculateButtonDisabled, setIsCalculateButtonDisabled] =
    useState(false);
  const {
    totalPower,
    animation,
    calculatedData,
    handleFinish,
    showAdditionalInfo,
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
        unit: "Штук",
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
        <Tooltip title="Средняя удельная мощность электроприбора">
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
            <InputNumber
              min={0}
              step={0.01}
              stringMode
              onChange={onValuesChange}
            />
          </Form.Item>
        ),
    },
    {
      title: (
        <Tooltip title="Суммарное количество электроприборов по типу объектов">
          <span>Количество (кВт) ℹ️</span>
        </Tooltip>
      ),
      dataIndex: "count",
      key: "count",
      render: (_, record) =>
        !record.isSection && (
          <Form.Item name={[record.key, "count"]} initialValue={1} noStyle>
            <InputNumber
              min={0}
              step={1}
              stringMode
              onChange={onValuesChange}
            />
          </Form.Item>
        ),
    },
    {
      title: (
        <Tooltip title="Единица измерения">
          <span>Единица измерения ℹ️</span>
        </Tooltip>
      ),
      dataIndex: "unit",
      key: "unit",
      render: (_, record) =>
        !record.isSection && (
          <Form.Item
            name={[record.key, "unit"]}
            initialValue={record.unit || "Штук"}
            noStyle
          >
            <Select dropdownMatchSelectWidth={false} onChange={onValuesChange}>
              <Select.Option value="Штук">Штук</Select.Option>
              <Select.Option value="Квадратные метры">
                Квадратные метры
              </Select.Option>
              <Select.Option value="Погонные метры">
                Погонные метры
              </Select.Option>
              <Select.Option value="По площади">По площади</Select.Option>
            </Select>
          </Form.Item>
        ),
    },
    {
      title: (
        <Tooltip title="Коэффициент одновременного использования электроприборов">
          <span>Коэффициент использования ℹ️</span>
        </Tooltip>
      ),
      dataIndex: "usageCoefficient",
      key: "usageCoefficient",
      render: (_, record) =>
        !record.isSection && (
          <Form.Item
            name={[record.key, "usageCoefficient"]}
            initialValue={record.usageCoefficient || 0.3}
            noStyle
          >
            <InputNumber
              min={0}
              max={1}
              step={0.01}
              stringMode
              onChange={onValuesChange}
            />
          </Form.Item>
        ),
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
        return calculatedData[key]?.consumedPower || null;
      },
    },
  ];

  const handleFinishWithLock = (values) => {
    setIsCalculateButtonDisabled(true);
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
              disabled={isCalculateButtonDisabled}
            >
              Рассчитать
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

          {showAdditionalInfo && (
            <Paragraph style={{ textAlign: "justify", marginTop: "20px" }}>
              {additionalInfoText}
            </Paragraph>
          )}
          {/* {showAdditionalInfo && (
            <Button
              type="primary"
              onClick={() => generatePDF()}
              className={styles.downloadButton}
            >
              Выгрузить PDF
            </Button>
          )} */}
        </div>
      </div>
    </>
  );
}

// import React from "react";
// import AppHelmet from "../../components/Global/AppHelmet";
// import {
//   Typography,
//   InputNumber,
//   Button,
//   Form,
//   Table,
//   Tooltip,
//   Select,
// } from "antd";
// import TweenOne from "rc-tween-one";
// import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";
// import jsonData from "./powerData.json";
// import useCalc from "../../stores/useCalc";
// import styles from "./Calc.module.css";
// import { formItemLayoutForCalc } from "../../components/configSizeForm";

// // Добавляем плагин для анимации чисел
// TweenOne.plugins.push(Children);

// const { Title, Paragraph } = Typography;
// const { Option } = Select;

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
// 1 суток. Электроприемники второй категории в нормальных режимах
// должны обеспечиваться электроэнергией от двух независимых взаимно
// резервирующих источников питания. Для электроприемников второй
// категории при нарушении электроснабжения от одного из источников
// питания допустимы перерывы электроснабжения на время, необходимое
// для включения резервного питания действиями дежурного персонала или
// выездной оперативной бригад.`;

// // Текст для параграфа под заголовком
// const mainParagraphText = `Для получения результата вы можете скорректировать основные параметры
// по мощности, количеству и коэффициенту одновременного использования
// электроприборов. Предложенное значение паспортной мощности
// электроприбора является средней величиной. Для уточнения можно
// установить свою величину паспортной мощности электроприбора.`;

// export default function Calc() {
//   const [form] = Form.useForm();
//   const {
//     totalPower,
//     animation,
//     calculatedData,
//     handleFinish,
//     showAdditionalInfo,
//   } = useCalc();

//   // Подготавливаем данные для таблицы и сортируем элементы в каждом разделе по алфавиту
//   const dataSource = jsonData.reduce((acc, section, sectionIndex) => {
//     const sectionItems = section.items
//       .sort((a, b) => a.name.localeCompare(b.name))
//       .map((item, itemIndex) => ({
//         key: `${sectionIndex}-${itemIndex}`,
//         name: item.name,
//         value: item.defaultValue,
//         count: 1,
//         unit: "Штук",
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
//         <Tooltip title="Средняя удельная мощность электроприбора">
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
//       title: (
//         <Tooltip title="Суммарное количество электроприборов по типу объектов">
//           <span>Количество (кВт) ℹ️</span>
//         </Tooltip>
//       ),
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
//       title: (
//         <Tooltip title="Единица измерения">
//           <span>Единица измерения ℹ️</span>
//         </Tooltip>
//       ),
//       dataIndex: "unit",
//       key: "unit",
//       render: (_, record) =>
//         !record.isSection && (
//           <Form.Item
//             name={[record.key, "unit"]}
//             initialValue={record.unit || "Штук"}
//             noStyle
//           >
//             <Select dropdownMatchSelectWidth={false}>
//               <Select.Option value="Штук">Штук</Select.Option>
//               <Select.Option value="Квадратные метры">Квадратные метры</Select.Option>
//               <Select.Option value="Погонные метры">Погонные метры</Select.Option>
//               <Select.Option value="По площади">По площади</Select.Option>
//             </Select>
//           </Form.Item>
//         ),
//     },
//     {
//       title: (
//         <Tooltip title="Коэффициент одновременного использования электроприборов">
//           <span>Коэффициент использования ℹ️</span>
//         </Tooltip>
//       ),
//       dataIndex: "usageCoefficient",
//       key: "usageCoefficient",
//       render: (_, record) =>
//         !record.isSection && (
//           <Form.Item
//             name={[record.key, "usageCoefficient"]}
//             initialValue={record.usageCoefficient || 0.3}
//             noStyle
//           >
//             <InputNumber min={0} max={1} step={0.01} stringMode />
//           </Form.Item>
//         ),
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
//         return calculatedData[key]?.consumedPower || null;
//       },
//     },
//   ];

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
//           {showAdditionalInfo && (
//             <Paragraph style={{ textAlign: "justify", marginTop: "20px" }}>
//               {additionalInfoText}
//             </Paragraph>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
