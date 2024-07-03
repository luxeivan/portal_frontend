import React from "react";
import { Form, InputNumber, Select, Table, Tooltip } from "antd";
import styles from "./Calc.module.css";

const { Option } = Select;

const CalcTable = ({ dataSource, calculatedData, onValuesChange }) => {
  const renderColumns = [
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
    {
      title: (
        <Tooltip title="Усредненная паспортная мощность электроприбора или удельная мощность на единицу измерения">
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
        <Tooltip title="Суммарное количество электроприборов по типу объекта">
          <span>Количествоℹ️</span>
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
        !record.isSection &&
        (record.fixedUnit ? (
          <span>{record.unit}</span>
        ) : (
          <Form.Item
            name={[record.key, "unit"]}
            initialValue={record.unit || "Штук"}
            noStyle
          >
            <Select dropdownMatchSelectWidth={false} onChange={onValuesChange}>
              <Option value="Штук">Штук</Option>
              <Option value="Квадратные метры">Квадратные метры</Option>
              <Option value="Погонные метры">Погонные метры</Option>
            </Select>
          </Form.Item>
        )),
    },
    {
      title: (
        <Tooltip title="Коэффициент одновременного использования электроприборов может иметь значения от 0 до 1, где 1 постоянная работа электрооборудования">
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
      title: "Требуемая мощность (кВт)",
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
