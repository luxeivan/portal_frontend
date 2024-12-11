import React from "react";
import { Form, Select, Table, Tooltip, Slider, InputNumber, Descriptions, Flex, Collapse, Typography, List, Divider } from "antd";
import styles from "./Calc.module.css";
import tableData from "./tableData.json";
import { InfoCircleOutlined } from "@ant-design/icons";
import jsonData from "./powerData.json";
const { Option } = Select;
const prepareData = (data) => {
  return data.map((item, index) => ({
    key: index,
    label: item.name,
    children: <>
      <Flex>
        <Form.Item
          name={"Мощность"}
          label={"Мощность"}
          initialValue={item.defaultValue}
          layout={"vertical"}
        >
          <InputNumber
            min={0}
            step={0.01}
            addonAfter={"кВт"}
            style={{ maxWidth: 120 }}
          />
        </Form.Item>
        <Form.Item
          name={"Кол-во"}
          label={"Кол-во"}
          initialValue={1}
          layout={"vertical"}
        >
          <InputNumber
            addonAfter={item.unitShort}
            min={0}
            step={1}
            style={{ maxWidth: 120 }}
          />
        </Form.Item>
      </Flex>
    </>,
  }))
}
const CalcTable1 = ({ dataSource, calculatedData, onValuesChange }) => {
  console.log(jsonData)
  const renderColumns = [
    // Столбец для названий
    {
      title: "Название электрооборудования",
      dataIndex: "name",
      key: "name",
      // width: '20%',
      render: (text, record) =>
        record.isSection ? (
          <strong className={styles.sectionHeader}>{record.section}</strong>
        ) : (
          <Tooltip title={record.description || ""}>
            <span className={styles.columnHeader}>
              {text}
              {record.description && (
                <InfoCircleOutlined className={styles.tooltipIcon} />
              )}
            </span>
          </Tooltip>
        ),
    },
    // Остальные столбцы
    ...tableData.columns.map((column) => ({
      title: (
        <span className={styles.columnHeader}>
          {column.title}
          <Tooltip title={column.tooltip}>
            <InfoCircleOutlined className={styles.tooltipIcon} />
          </Tooltip>
        </span>
      ),
      dataIndex: column.dataIndex,
      key: column.dataIndex,
      width: column.width || '16%',
      render: (_, record) => {
        if (record.isSection) return null;
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
                step={0.1}
                onChange={onValuesChange}
                marks={{ 0: "0", 1: "1" }}
                tooltip={{
                  open: true,
                }}
              />
            </Form.Item>
          );
        }
        if (column.dataIndex === "count") {
          return (
            <Form.Item
              name={[record.key, column.dataIndex]}
              initialValue={record[column.dataIndex] || column.defaultValue}
              noStyle
            >
              <InputNumber
                addonAfter={record.unitShort}
                min={0}
                step={1}
                precision={0}
                onChange={onValuesChange}
                style={{ maxWidth: 120 }}
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
                addonAfter={"кВт"}
                style={{ maxWidth: 120 }}
              />
            </Form.Item>
          );
        }
        if (column.dataIndex === "consumedPower") {
          return (
            <span>{calculatedData[record.key]?.consumedPower || "0.00"}</span>
          );
        }
        return null;
      },
    })),
  ];


  return (
    <>
      {jsonData.map((item, index) => <>
        <Divider orientation="left">{item.section}</Divider>
        {}
        <List
          style={{ marginBottom: 20 }}
          header={<div>{item.section}</div>}
          // footer={<div>Footer</div>}
          bordered
          dataSource={item.items}
          renderItem={(item) => (
            <>
            
              <Flex>
                <Form.Item
                  name={"Мощность"}
                  label={"Мощность"}
                  initialValue={item.defaultValue}
                  layout={"vertical"}
                >
                  <InputNumber
                    min={0}
                    step={0.01}
                    addonAfter={"кВт"}
                    style={{ maxWidth: 120 }}
                  />
                </Form.Item>
                <Form.Item
                  name={"Кол-во"}
                  label={"Кол-во"}
                  initialValue={1}
                  layout={"vertical"}
                >
                  <InputNumber
                    addonAfter={item.unitShort}
                    min={0}
                    step={1}
                    style={{ maxWidth: 120 }}
                  />
                </Form.Item>
              </Flex>
            </>
          )}
        />
        {/* <Typography.Title level={4}>{item.section}</Typography.Title>
      <Collapse key={index} collapsible="header" items={prepareData(item.items)} /> */}
      </>)}
    </>
    // <Table
    //   columns={renderColumns}
    //   dataSource={dataSource}
    //   pagination={false}
    //   locale={{ emptyText: "Нет данных" }}
    //   className={styles.table}
    // />
  );
};

export default CalcTable1;
