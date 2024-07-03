import React from "react";
import { Form, InputNumber, Select, Table, Tooltip } from "antd";
import styles from "./Calc.module.css";
import tableData from "./tableData.json";

const { Option } = Select;

const CalcTable = ({ dataSource, calculatedData, onValuesChange }) => {
  const renderColumns = [
    // Столбец для названий
    {
      title: "Название электрооборудования",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        record.isSection ? (
          <strong className={styles.sectionHeader}>{record.section}</strong>
        ) : (
          <Tooltip title={record.description || ""}>
            <span>
              {text} {record.description && <span>ℹ️</span>}
            </span>
          </Tooltip>
        ),
    },
    // Остальные столбцы
    ...tableData.columns.map((column) => ({
      title: (
        <Tooltip title={column.tooltip}>
          <span>{column.title} ℹ️</span>
        </Tooltip>
      ),
      dataIndex: column.dataIndex,
      key: column.dataIndex,
      render: (_, record) => {
        if (record.isSection) return null;
        if (column.dataIndex === "unit") {
          return record.fixedUnit ? (
            <span>{record.unit}</span>
          ) : (
            <Form.Item
              name={[record.key, "unit"]}
              initialValue={record.unit || "Штук"}
              noStyle
            >
              <Select dropdownMatchSelectWidth={false} onChange={onValuesChange}>
                {column.options.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );
        }
        if (column.type === "number") {
          return (
            <Form.Item
              name={[record.key, column.dataIndex]}
              initialValue={record[column.dataIndex] || column.defaultValue}
              noStyle
            >
              <InputNumber
                min={0}
                step={0.01}
                stringMode
                onChange={onValuesChange}
              />
            </Form.Item>
          );
        }
        return null;
      },
    })),
  ];

  return (
    <Table
      columns={renderColumns}
      dataSource={dataSource}
      pagination={false}
      locale={{ emptyText: "Нет данных" }}
      className={styles.table}
    />
  );
};

export default CalcTable;


// import React from "react";
// import { Form, InputNumber, Select, Table, Tooltip } from "antd";
// import styles from "./Calc.module.css";
// import tableData from "./tableData.json";

// const { Option } = Select;

// const renderInputComponent = (column, record, onValuesChange) => {
//   switch (column.type) {
//     case "number":
//       return (
//         <Form.Item
//           name={[record.key, column.dataIndex]}
//           initialValue={
//             record[column.dataIndex] !== undefined
//               ? record[column.dataIndex]
//               : column.defaultValue
//           }
//           noStyle
//         >
//           <InputNumber
//             min={0}
//             step={column.dataIndex === "usageCoefficient" ? 0.01 : 1}
//             stringMode
//             onChange={onValuesChange}
//           />
//         </Form.Item>
//       );
//     case "select":
//       return (
//         <Form.Item
//           name={[record.key, column.dataIndex]}
//           initialValue={
//             record[column.dataIndex] !== undefined
//               ? record[column.dataIndex]
//               : column.defaultValue
//           }
//           noStyle
//         >
//           <Select dropdownMatchSelectWidth={false} onChange={onValuesChange}>
//             {column.options.map((option) => (
//               <Option key={option} value={option}>
//                 {option}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>
//       );
//     default:
//       return null;
//   }
// };

// const CalcTable = ({ dataSource, calculatedData, onValuesChange }) => {
//   const renderColumns = tableData.columns.map((column) => ({
//     title: column.tooltip ? (
//       <Tooltip title={column.tooltip}>
//         <span>{column.title} ℹ️</span>
//       </Tooltip>
//     ) : (
//       column.title
//     ),
//     dataIndex: column.dataIndex,
//     key: column.dataIndex,
//     render: (text, record) => {
//       if (record.isSection) {
//         if (column.dataIndex === "name") {
//           return (
//             <strong className={styles.sectionHeader}>{record.section}</strong>
//           );
//         }
//         return null;
//       }
//       if (column.type === "text") {
//         if (column.dataIndex === "name") {
//           return (
//             <Tooltip title={record.description || ""}>
//               <span>
//                 {text} {record.description && <span>ℹ️</span>}
//               </span>
//             </Tooltip>
//           );
//         }
//         if (column.dataIndex === "consumedPower") {
//           const key = `${record.key}`;
//           return calculatedData[key]?.consumedPower || null;
//         }
//         return text;
//       }
//       return renderInputComponent(column, record, onValuesChange);
//     },
//   }));

//   return (
//     <Table
//       columns={renderColumns}
//       dataSource={dataSource}
//       pagination={false}
//       locale={{ emptyText: "Нет данных" }}
//       className={styles.table}
//     />
//   );
// };

// export default CalcTable;

// import React from "react";
// import { Form, InputNumber, Select, Table, Tooltip } from "antd";
// import styles from "./Calc.module.css";

// const { Option } = Select;

// const CalcTable = ({ dataSource, calculatedData, onValuesChange }) => {
//   const renderColumns = [
//     //Столбец 1
//     {
//       title: "Название электрооборудования",
//       dataIndex: "name",
//       key: "name",
//       render: (text, record) =>
//         record.isSection ? (
//           <strong className={styles.sectionHeader}>{record.section}</strong>
//         ) : (
//           <Tooltip title={record.description || ""}>
//             <span>
//               {text} {record.description && <span>ℹ️</span>}
//             </span>
//           </Tooltip>
//         ),
//     },
//     //Столбец 2
//     {
//       title: (
//         <Tooltip title="Усредненная паспортная мощность электроприбора или удельная мощность на единицу измерения">
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
//             <InputNumber
//               min={0}
//               step={0.01}
//               stringMode
//               onChange={onValuesChange}
//             />
//           </Form.Item>
//         ),
//     },
//     //Столбец 3
//     {
//       title: (
//         <Tooltip title="Суммарное количество электроприборов по типу электрооборудования">
//           <span>Количествоℹ️</span>
//         </Tooltip>
//       ),
//       dataIndex: "count",
//       key: "count",
//       render: (_, record) =>
//         !record.isSection && (
//           <Form.Item name={[record.key, "count"]} initialValue={1} noStyle>
//             <InputNumber
//               min={0}
//               step={1}
//               stringMode
//               onChange={onValuesChange}
//             />
//           </Form.Item>
//         ),
//     },
//     //Столбец 4
//     {
//       title: (
//         <Tooltip title="Единица измерения">
//           <span>Единица измерения ℹ️</span>
//         </Tooltip>
//       ),
//       dataIndex: "unit",
//       key: "unit",
//       render: (_, record) =>
//         !record.isSection &&
//         (record.fixedUnit ? (
//           <span>{record.unit}</span>
//         ) : (
//           <Form.Item
//             name={[record.key, "unit"]}
//             initialValue={record.unit || "Штук"}
//             noStyle
//           >
//             <Select dropdownMatchSelectWidth={false} onChange={onValuesChange}>
//               <Option value="Штук">Штук</Option>
//               <Option value="Квадратные метры">Квадратные метры</Option>
//               <Option value="Погонные метры">Погонные метры</Option>
//             </Select>
//           </Form.Item>
//         )),
//     },
//     //Столбец 5
//     {
//       title: (
//         <Tooltip title="Коэффициент одновременного использования электроприборов может иметь значения от 0 до 1, где 1 - постоянная работа электроприбора">
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
//             <InputNumber
//               min={0}
//               max={1}
//               step={0.01}
//               stringMode
//               onChange={onValuesChange}
//             />
//           </Form.Item>
//         ),
//     },
//     //Столбец 6
//     {
//       title: (<Tooltip title="Оценочное значение на основе усредненных величин. Для точного расчета требуемой мощности обращаетесь в специализированные проектные организации.">
//         <span>Требуемая мощность (кВт) ℹ️</span>
//       </Tooltip>),
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
//     <Table
//       columns={renderColumns}
//       dataSource={dataSource}
//       pagination={false}
//       locale={{ emptyText: "Нет данных" }}
//       className={styles.table}
//     />
//   );
// };

// export default CalcTable;
