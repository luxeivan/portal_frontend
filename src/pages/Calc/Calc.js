import React, { useState } from "react";
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
import styles from "./Calc.module.css";
import { formItemLayoutForCalc } from "../../components/configSizeForm";

TweenOne.plugins.push(Children);

const { Title } = Typography;
const { Option } = Select;

const formItemLayout = formItemLayoutForCalc;

export default function Calc() {
  const [form] = Form.useForm();
  const [totalPower, setTotalPower] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [animation, setAnimation] = useState(null);

  const handleFinish = (values) => {
    let total = 0;
    selectedItems.forEach((item) => {
      const inputValue = parseFloat(values[item.key].value);
      const countValue = parseFloat(values[item.key].count) || 1;
      const formula = item.formula;

      if (!isNaN(inputValue) && formula) {
        const result = eval(
          formula.replace("count", countValue).replace("value", inputValue)
        );
        total += result;
      }
    });

    setAnimation({
      Children: { value: total, floatLength: 2, formatMoney: false },
      duration: 3000,
    });

    setTotalPower(total.toFixed(2));
  };

  const handleAddDevice = () => {
    if (selectedCategory !== null && selectedDevice !== null) {
      const device = jsonData[selectedCategory].items[selectedDevice];
      setSelectedItems([
        ...selectedItems,
        {
          key: `${selectedCategory}-${selectedDevice}-${selectedItems.length}`,
          name: device.name,
          formula: device.formula,
          defaultValue: device.defaultValue,
          description: device.description,
        },
      ]);
      setSelectedCategory(null);
      setSelectedDevice(null);
    }
  };

  const columns = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
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
      render: (_, record) => (
        <Form.Item
          name={[record.key, "value"]}
          initialValue={record.defaultValue}
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
      render: (_, record) => (
        <Form.Item name={[record.key, "count"]} initialValue={1} noStyle>
          <InputNumber min={0} step={1} stringMode />
        </Form.Item>
      ),
    },
  ];

  const categoryOptions = jsonData.map((section, sectionIndex) => ({
    label: section.section,
    options: section.items.map((item, itemIndex) => ({
      label: item.name,
      value: `${sectionIndex}-${itemIndex}`,
    })),
  }));

  return (
    <>
      <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
      <div>
        <Title level={1}>Калькулятор мощности</Title>
        <Form form={form} onFinish={handleFinish} {...formItemLayout} labelWrap>
          <Form.Item label="Выберите категорию и устройство">
            <Select
              value={
                selectedCategory !== null && selectedDevice !== null
                  ? `${selectedCategory}-${selectedDevice}`
                  : undefined
              }
              onChange={(value) => {
                const [category, device] = value.split("-");
                setSelectedCategory(category);
                setSelectedDevice(device);
              }}
              options={categoryOptions}
              placeholder="Выберите устройство"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleAddDevice}>
              Добавить устройство
            </Button>
          </Form.Item>
          <Table
            columns={columns}
            dataSource={selectedItems}
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
//   Spin,
// } from "antd";
// import jsonData from "./powerData.json";
// import styles from "./Calc.module.css";
// import { formItemLayoutForCalc } from "../../components/configSizeForm";

// const { Title } = Typography;
// const { Option } = Select;

// const formItemLayout = formItemLayoutForCalc;

// export default function Calc() {
//   const [form] = Form.useForm();
//   const [totalPower, setTotalPower] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedDevice, setSelectedDevice] = useState(null);

//   const handleFinish = (values) => {
//     setLoading(true);
//     setTimeout(() => {
//       let total = 0;
//       selectedItems.forEach((item) => {
//         const inputValue = parseFloat(values[item.key].value);
//         const countValue = parseFloat(values[item.key].count) || 1;
//         const formula = item.formula;

//         if (!isNaN(inputValue) && formula) {
//           const result = eval(
//             formula.replace("count", countValue).replace("value", inputValue)
//           );
//           total += result;
//         }
//       });
//       setTotalPower(total.toFixed(2));
//       setLoading(false);
//     }, 2000);
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
//           />
//           <Form.Item>
//             <Button type="primary" htmlType="submit" disabled={loading}>
//               {loading ? <Spin /> : "Рассчитать"}
//             </Button>
//           </Form.Item>
//         </Form>
//         <div className={styles.totalPower}>
//           <Title level={4}>
//             Итого требуемая электрическая мощность (оценочно): {totalPower} кВт
//           </Title>
//         </div>
//       </div>
//     </>
//   );
// }

// import React, { useState } from "react";
// import AppHelmet from "../../components/Global/AppHelmet";
// import { Typography, InputNumber, Button, Form, Collapse, Select, Tooltip } from "antd";
// import jsonData from "./powerData.json";
// import styles from "./Calc.module.css";
// import { formItemLayoutForCalc } from '../../components/configSizeForm';

// const { Title } = Typography;
// const { Panel } = Collapse;
// const { Option } = Select;
// const formItemLayout = formItemLayoutForCalc;

// export default function Calc() {
//   const [form] = Form.useForm();
//   const [totalPower, setTotalPower] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const handleFinish = (values) => {
//     setLoading(true);
//     setTimeout(() => {
//       let total = 0;
//       Object.keys(values).forEach((key) => {
//         const [sectionIndex, itemIndex] = key.split("-");
//         const item = jsonData[sectionIndex].items[itemIndex];
//         const inputValue = parseFloat(values[key]);
//         const countKey = `${key}-count`;
//         const countValue = parseFloat(values[countKey]) || 1;

//         if (!isNaN(inputValue) && item.formula) {
//           const result = eval(
//             item.formula
//               .replace("count", countValue)
//               .replace("area", inputValue)
//               .replace("length", inputValue)
//           );
//           total += result;
//         }
//       });
//       setTotalPower(total.toFixed(2));
//       setLoading(false);
//     }, 2000);
//   };

//   const handleCategoryChange = (value) => {
//     setSelectedCategory(value);
//     setSelectedItem(null);
//     form.resetFields();
//   };

//   const handleItemChange = (value) => {
//     setSelectedItem(value);
//   };

//   const selectedItems = selectedCategory !== null ? jsonData[selectedCategory].items : [];

//   return (
//     <>
//       <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
//       <div>
//         <Title level={1}>Калькулятор мощности</Title>
//         <Form form={form} onFinish={handleFinish} {...formItemLayout} labelWrap>
//           <Form.Item label="Выберите категорию">
//             <Select onChange={handleCategoryChange} placeholder="Категория">
//               {jsonData.map((section, index) => (
//                 <Option key={index} value={index}>
//                   {section.section}
//                 </Option>
//               ))}
//             </Select>
//           </Form.Item>
//           {selectedCategory !== null && (
//             <Form.Item label="Выберите тип">
//               <Select onChange={handleItemChange} placeholder="Тип">
//                 {selectedItems.map((item, index) => (
//                   <Option key={index} value={index}>
//                     {item.name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           )}
//           {selectedItem !== null && (
//             <Collapse>
//               <Panel header={selectedItems[selectedItem].name} key={selectedItem}>
//                 <div className={styles.inputGroup}>
//                   <Tooltip title={selectedItems[selectedItem].description || ""}>
//                     <Form.Item
//                       label={selectedItems[selectedItem].name}
//                       name={`${selectedCategory}-${selectedItem}`}
//                       initialValue={selectedItems[selectedItem].defaultValue}
//                     >
//                       <InputNumber min={0} step={0.01} stringMode />
//                     </Form.Item>
//                   </Tooltip>
//                   <Form.Item
//                     label="Количество"
//                     name={`${selectedCategory}-${selectedItem}-count`}
//                     initialValue={1}
//                   >
//                     <InputNumber min={0} step={1} stringMode />
//                   </Form.Item>
//                 </div>
//               </Panel>
//             </Collapse>
//           )}
//           <Form.Item>
//             <Button type="primary" htmlType="submit" disabled={loading}>
//               {loading ? "Рассчитываю..." : "Рассчитать"}
//             </Button>
//           </Form.Item>
//         </Form>
//         <div className={styles.totalPower}>
//           <Title level={4}>
//             Итого требуемая электрическая мощность (оценочно): {totalPower} кВт
//           </Title>
//         </div>
//       </div>
//     </>
//   );
// }

//Старый калькулятор
// import React, { useState } from "react";
// import AppHelmet from "../../components/Global/AppHelmet";
// import { Typography, InputNumber, Button, Form, Collapse, Spin } from "antd";
// import jsonData from "./powerData.json";
// import styles from "./Calc.module.css";
// import { formItemLayoutForCalc } from '../../components/configSizeForm'

// const { Title } = Typography;
// const { Panel } = Collapse;
// const formItemLayout = formItemLayoutForCalc
// export default function Calc() {
//   const [form] = Form.useForm();
//   const [totalPower, setTotalPower] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const handleFinish = (values) => {
//     setLoading(true);
//     setTimeout(() => {
//       let total = 0;
//       Object.keys(values).forEach((key) => {
//         const [sectionIndex, itemIndex] = key.split("-");
//         const item = jsonData[sectionIndex].items[itemIndex];
//         const inputValue = parseFloat(values[key]);
//         const countKey = `${key}-count`;
//         const countValue = parseFloat(values[countKey]) || 1;

//         if (!isNaN(inputValue) && item.formula) {
//           const result = eval(
//             item.formula
//               .replace("count", countValue)
//               .replace("area", inputValue)
//               .replace("length", inputValue)
//           );
//           total += result;
//         }
//       });
//       setTotalPower(total.toFixed(2));
//       setLoading(false);
//     }, 2000); // Задержка для имитации расчета
//   };

//   return (
//     <>
//       <AppHelmet title={"Калькулятор"} desc={"Калькулятор мощности"} />
//       <div>
//         <Title level={1}>Калькулятор мощности</Title>
//         <Form form={form} onFinish={handleFinish} {...formItemLayout} labelWrap>
//           <Collapse>
//             {jsonData.map((section, sectionIndex) => (
//               <Panel header={section.section} key={sectionIndex}>
//                 {section.items.map((item, itemIndex) => (
//                   <div
//                     key={`${sectionIndex}-${itemIndex}`}
//                     className={styles.inputGroup}
//                   >
//                     <Form.Item
//                       label={item.name}
//                       name={`${sectionIndex}-${itemIndex}`}
//                       key={`${sectionIndex}-${itemIndex}`}
//                     >
//                       <InputNumber min={0} step={0.01} stringMode />
//                     </Form.Item>
//                     <Form.Item
//                       label="Количество"
//                       name={`${sectionIndex}-${itemIndex}-count`}
//                       key={`${sectionIndex}-${itemIndex}-count`}
//                     >
//                       <InputNumber min={0} step={1} stringMode />
//                     </Form.Item>
//                   </div>
//                 ))}
//               </Panel>
//             ))}
//           </Collapse>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" disabled={loading}>
//               {loading ? <Spin /> : "Рассчитать"}
//             </Button>
//           </Form.Item>
//         </Form>
//         <div className={styles.totalPower}>
//           <Title level={4}>
//             Итого требуемая электрическая мощность (оценочно): {totalPower} кВт
//           </Title>
//         </div>
//       </div>
//     </>
//   );
// }
