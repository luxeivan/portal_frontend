import React from "react";
import { Form, Select, Table, Tooltip, Slider, InputNumber } from "antd";
import styles from "./Calc.module.css";
import tableData from "./tableData.json";
import { InfoCircleOutlined } from "@ant-design/icons";

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
              {text}{" "}
              {record.description && (
                <span>
                  <InfoCircleOutlined />
                </span>
              )}
            </span>
          </Tooltip>
        ),
    },
    // Остальные столбцы
    ...tableData.columns.map((column) => ({
      title: (
        <Tooltip title={column.tooltip}>
          <span>
            {column.title}
            <InfoCircleOutlined />
          </span>
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
              <Select
                dropdownMatchSelectWidth={false}
                onChange={onValuesChange}
              >
                {column.options.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );
        }
        if (column.dataIndex === "usageCoefficient") {
          return (
            <Form.Item
              name={[record.key, column.dataIndex]}
              initialValue={record[column.dataIndex] || column.defaultValue}
              noStyle
            >
              <Slider
                min={0}
                max={1}
                step={0.01}
               
                onChange={onValuesChange}
                tooltipVisible
              />
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
// import { InfoCircleOutlined } from "@ant-design/icons";

// const { Option } = Select;

// const CalcTable = ({ dataSource, calculatedData, onValuesChange }) => {
//   const renderColumns = [
//     // Столбец для названий
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
//               {text} {record.description && <span><InfoCircleOutlined/></span>}
//             </span>
//           </Tooltip>
//         ),
//     },
//     // Остальные столбцы
//     ...tableData.columns.map((column) => ({
//       title: (
//         <Tooltip title={column.tooltip}>
//           <span>{column.title}<InfoCircleOutlined/></span>
//         </Tooltip>
//       ),
//       dataIndex: column.dataIndex,
//       key: column.dataIndex,
//       render: (_, record) => {
//         if (record.isSection) return null;
//         if (column.dataIndex === "unit") {
//           return record.fixedUnit ? (
//             <span>{record.unit}</span>
//           ) : (
//             <Form.Item
//               name={[record.key, "unit"]}
//               initialValue={record.unit || "Штук"}
//               noStyle
//             >
//               <Select dropdownMatchSelectWidth={false} onChange={onValuesChange}>
//                 {column.options.map((option) => (
//                   <Option key={option} value={option}>
//                     {option}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           );
//         }
//         if (column.type === "number") {
//           return (
//             <Form.Item
//               name={[record.key, column.dataIndex]}
//               initialValue={record[column.dataIndex] || column.defaultValue}
//               noStyle
//             >
//               <InputNumber
//                 min={0}
//                 step={0.01}
//                 stringMode
//                 onChange={onValuesChange}
//               />
//             </Form.Item>
//           );
//         }
//         return null;
//       },
//     })),
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
