import React, { useState } from "react";
import AppHelmet from "../../components/Global/AppHelmet";
import { Typography, InputNumber, Button, Form, Table, Tooltip } from "antd";
import TweenOne from "rc-tween-one";
import Children from "rc-tween-one/lib/plugin/ChildrenPlugin";
import jsonData from "./powerData.json";
import styles from "./Calc.module.css";
import { formItemLayoutForCalc } from "../../components/configSizeForm";

TweenOne.plugins.push(Children);

const { Title } = Typography;

const formItemLayout = formItemLayoutForCalc;

export default function Calc() {
  const [form] = Form.useForm();
  const [totalPower, setTotalPower] = useState(0);
  const [animation, setAnimation] = useState(null);

  const handleFinish = (values) => {
    let total = 0;
    jsonData.forEach((section, sectionIndex) => {
      section.items.forEach((item, itemIndex) => {
        const key = `${sectionIndex}-${itemIndex}`;
        const inputValue = parseFloat(values[key].value);
        const countValue = parseFloat(values[key].count) || 1;
        const formula = item.formula;

        if (!isNaN(inputValue) && formula) {
          const result = eval(
            formula.replace("count", countValue).replace("value", inputValue)
          );
          total += result;
        }
      });
    });

    setAnimation({
      Children: { value: total, floatLength: 2, formatMoney: false },
      duration: 3000,
    });

    setTotalPower(total.toFixed(2));
  };

  const dataSource = jsonData.reduce((acc, section, sectionIndex) => {
    const sectionItems = section.items.map((item, itemIndex) => ({
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

  const renderColumns = [
    {
      title: "Название",
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
      title: "Паспортная мощность (кВт)",
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
      <div>
        <Title level={1}>Калькулятор мощности</Title>
        <Form form={form} onFinish={handleFinish} {...formItemLayout} labelWrap>
          <Table
            columns={renderColumns}
            dataSource={dataSource}
            pagination={false}
            locale={{ emptyText: "Нет данных" }}
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
        <div className={styles.totalPower}>
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

//Старый калькулятор на 27.06 13:40
// import React, { useState } from "react";
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
// import styles from "./Calc.module.css";
// import { formItemLayoutForCalc } from "../../components/configSizeForm";

// TweenOne.plugins.push(Children);

// const { Title } = Typography;
// const { Option } = Select;

// const formItemLayout = formItemLayoutForCalc;

// export default function Calc() {
//   const [form] = Form.useForm();
//   const [totalPower, setTotalPower] = useState(0);
//   console.log(totalPower);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedDevice, setSelectedDevice] = useState(null);
//   const [animation, setAnimation] = useState(null);

//   const handleFinish = (values) => {
//     let total = 0;
//     selectedItems.forEach((item) => {
//       const inputValue = parseFloat(values[item.key].value);
//       const countValue = parseFloat(values[item.key].count) || 1;
//       const formula = item.formula;

//       if (!isNaN(inputValue) && formula) {
//         const result = eval(
//           formula.replace("count", countValue).replace("value", inputValue)
//         );
//         total += result;
//       }
//     });

//     setAnimation({
//       Children: { value: total, floatLength: 2, formatMoney: false },
//       duration: 3000,
//     });

//     setTotalPower(total.toFixed(2));
//   };

//   const handleAddDevice = () => {
//     if (selectedCategory !== null && selectedDevice !== null) {
//       const device = jsonData[selectedCategory].items[selectedDevice];
//       setSelectedItems([
//         ...selectedItems,
//         {
//           key: `${selectedCategory}-${selectedDevice}-${selectedItems.length}`,
//           name: device.name,
//           formula: device.formula,
//           defaultValue: device.defaultValue,
//           description: device.description,
//         },
//       ]);
//       setSelectedCategory(null);
//       setSelectedDevice(null);
//     }
//   };

//   const columns = [
//     {
//       title: "Название",
//       dataIndex: "name",
//       key: "name",
//       render: (text, record) => (
//         <Tooltip title={record.description || ""}>
//           <span>
//             {text} {record.description && <span>ℹ️</span>}
//           </span>
//         </Tooltip>
//       ),
//     },
//     {
//       title: "Паспортная мощность (кВт)",
//       dataIndex: "value",
//       key: "value",
//       render: (_, record) => (
//         <Form.Item
//           name={[record.key, "value"]}
//           initialValue={record.defaultValue}
//           noStyle
//         >
//           <InputNumber min={0} step={0.01} stringMode />
//         </Form.Item>
//       ),
//     },
//     {
//       title: "Количество",
//       dataIndex: "count",
//       key: "count",
//       render: (_, record) => (
//         <Form.Item name={[record.key, "count"]} initialValue={1} noStyle>
//           <InputNumber min={0} step={1} stringMode />
//         </Form.Item>
//       ),
//     },
//   ];

//   const categoryOptions = jsonData.map((section, sectionIndex) => ({
//     label: section.section,
//     options: section.items.map((item, itemIndex) => ({
//       label: item.name,
//       value: `${sectionIndex}-${itemIndex}`,
//     })),
//   }));

//   return (
//     <>
//       <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
//       <div>
//         <Title level={1}>Калькулятор мощности</Title>
//         <Form form={form} onFinish={handleFinish} {...formItemLayout} labelWrap>
//           <Form.Item label="Выберите категорию и устройство">
//             <Select
//               value={
//                 selectedCategory !== null && selectedDevice !== null
//                   ? `${selectedCategory}-${selectedDevice}`
//                   : undefined
//               }
//               onChange={(value) => {
//                 const [category, device] = value.split("-");
//                 setSelectedCategory(category);
//                 setSelectedDevice(device);
//               }}
//               options={categoryOptions}
//               placeholder="Выберите устройство"
//             />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" onClick={handleAddDevice}>
//               Добавить устройство
//             </Button>
//           </Form.Item>
//           <Table
//             columns={columns}
//             dataSource={selectedItems}
//             pagination={false}
//             locale={{ emptyText: "Нет данных" }}
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
//         <div className={styles.totalPower}>
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
