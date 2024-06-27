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
        <Title level={1}>Калькулятор мощности</Title>
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
