import React, { useState, useEffect } from "react";
import { Typography, Button, Form, InputNumber, Select, Slider } from "antd";
import calcData from "./calcData.json";
import useCalc from "../../stores/useCalc";
import { prepareDataSource } from "./helpers";
import styles from "./MobileCalcView.module.css";

const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function MobileCalcView() {
  const [form] = Form.useForm();
  const {
    totalPower,
    calculatedData,
    handleFinish,
    showAdditionalInfo,
    generatePDF,
  } = useCalc();

  // Изменяем начальное состояние на false, чтобы кнопка "Рассчитать" была доступна сразу
  const [isCalculateButtonDisabled, setIsCalculateButtonDisabled] =
    useState(false);

  const dataSource = prepareDataSource();

  useEffect(() => {
    const initialValues = {};
    dataSource.forEach((item) => {
      if (!item.isSection) {
        initialValues[item.key] = {
          value: item.value,
          count: 1,
          unit: item.unit,
          usageCoefficient: item.usageCoefficient,
        };
      }
    });
    form.setFieldsValue(initialValues);
  }, [dataSource, form]);

  const onValuesChange = () => {
    setIsCalculateButtonDisabled(false);
  };

  const onFinish = (values) => {
    setIsCalculateButtonDisabled(true);
    handleFinish(values);
  };

  return (
    <div className={styles.mobileContainer}>
      <Title level={2} style={{ marginBottom: 16 }}>
        Калькулятор мощности
      </Title>

      <Paragraph style={{ textAlign: "justify", marginBottom: "20px" }}>
        {calcData.texts.mainParagraphText}
      </Paragraph>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        {dataSource.map((item) => {
          if (item.isSection) {
            return (
              <Title key={item.key} level={4} style={{ marginTop: 24 }}>
                {item.section}
              </Title>
            );
          }

          return (
            <div key={item.key} className={styles.itemBlock}>
              <Title level={5}>{item.name} </Title>
              <Form.Item
                name={[item.key, "value"]}
                label="Мощность (кВт)"
                initialValue={item.value}
              >
                <InputNumber min={0} step={0.01} />
              </Form.Item>

              <Form.Item
                name={[item.key, "count"]}
                label="Количество"
                initialValue={1}
              >
                <InputNumber min={0} step={1} />
              </Form.Item>

              <Form.Item
                name={[item.key, "unit"]}
                label="Единица измерения"
                initialValue={item.unit}
              >
                <Select>
                  {calcData.columns
                    .find((c) => c.dataIndex === "unit")
                    .options.map((opt) => (
                      <Option key={opt} value={opt}>
                        {opt}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                name={[item.key, "usageCoefficient"]}
                label="Коэффициент использования"
                initialValue={item.usageCoefficient}
              >
                <Slider min={0} max={1} step={0.1} marks={{ 0: "0", 1: "1" }} />
              </Form.Item>
            </div>
          );
        })}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isCalculateButtonDisabled}
          >
            Рассчитать
          </Button>
        </Form.Item>
      </Form>

      {/* Итог */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Title level={4}>
          Итого: {totalPower || "0 кВт"}
          <sup>*</sup>
        </Title>
        {showAdditionalInfo && (
          <>
            <Paragraph style={{ textAlign: "justify", marginTop: "20px" }}>
              {calcData.texts.additionalInfoText}
            </Paragraph>
            <Button
              type="default"
              onClick={() => generatePDF(prepareDataSource(), totalPower)}
              style={{ marginTop: 10 }}
            >
              Выгрузить PDF
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
