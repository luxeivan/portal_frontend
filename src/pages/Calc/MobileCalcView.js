import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Form,
  InputNumber,
  Slider,
  Card,
  Flex,
} from "antd";
import calcData from "./calcData.json";
import useCalc from "../../stores/useCalc";
import { prepareDataSource } from "./helpers";

const { Title, Paragraph } = Typography;

export default function MobileCalcView() {
  const [form] = Form.useForm();
  const {
    totalPower,
    handleFinish,
    showAdditionalInfo,
    generatePDF,
    calculatedData,
  } = useCalc();

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
    <div>
      <Title level={2} style={{ marginBottom: 16 }}>
        Калькулятор мощности
      </Title>

      <Paragraph>{calcData.texts.mainParagraphText}</Paragraph>
      <Paragraph>
        <b>
          Для заявителей - физических лиц. Только для некоммерческого
          применения.
        </b>
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

          // Получаем текущее значение мощности
          const consumedPower =
            calculatedData[item.key]?.consumedPower || "0.00";

          return (
            <div key={item.key}>
              {/* Заголовок карточки с дополнительным текстом справа */}
              <Card
                title={
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>{item.name}</span>
                    <span style={{ fontWeight: "bold" }}>{consumedPower}</span>
                  </div>
                }
                style={{ marginBottom: 20 }}
              >
                <Flex gap={10} wrap>
                  <Form.Item
                    name={[item.key, "value"]}
                    initialValue={item.value}
                    label="Мощность (кВт)"
                  >
                    <InputNumber min={0} step={0.01} addonAfter={"кВт"} />
                  </Form.Item>

                  <Form.Item
                    name={[item.key, "count"]}
                    initialValue={1}
                    label="Количество"
                  >
                    <InputNumber min={0} step={1} addonAfter={item.unitShort} />
                  </Form.Item>
                </Flex>

                <Form.Item
                  name={[item.key, "usageCoefficient"]}
                  label="Коэффициент использования"
                  initialValue={item.usageCoefficient}
                >
                  <Slider
                    min={0}
                    max={1}
                    step={0.1}
                    marks={{ 0: "0", 1: "1" }}
                    tooltip={{
                      open: true,
                      placement: "bottom",
                      color: "#fff",
                      overlayInnerStyle: { color: "#000" } 
                    }}
                  />
                </Form.Item>
              </Card>
            </div>
          );
        })}
        <Flex gap={10} justify="center">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isCalculateButtonDisabled}
            >
              Рассчитать
            </Button>
          </Form.Item>
          <Button
            type="default"
            onClick={() => generatePDF(prepareDataSource(), totalPower)}
          >
            Выгрузить PDF
          </Button>
        </Flex>
      </Form>

      {/* Итог */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Typography.Text>
          <b>
            Итого: {totalPower || "0 кВт"}
            <sup>*</sup>
          </b>
        </Typography.Text>
        {showAdditionalInfo && (
          <>
            <Paragraph style={{ textAlign: "justify", marginTop: "20px" }}>
              {calcData.texts.additionalInfoText}
            </Paragraph>
          </>
        )}
      </div>
    </div>
  );
}
// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Button,
//   Form,
//   InputNumber,
//   Slider,
//   Card,
//   Flex,
// } from "antd";
// import calcData from "./calcData.json";
// import useCalc from "../../stores/useCalc";
// import { prepareDataSource } from "./helpers";

// const { Title, Paragraph } = Typography;

// export default function MobileCalcView() {
//   const [form] = Form.useForm();
//   const { totalPower, handleFinish, showAdditionalInfo, generatePDF } =
//     useCalc();

//   const [isCalculateButtonDisabled, setIsCalculateButtonDisabled] =
//     useState(false);

//   const dataSource = prepareDataSource();

//   useEffect(() => {
//     const initialValues = {};
//     dataSource.forEach((item) => {
//       if (!item.isSection) {
//         initialValues[item.key] = {
//           value: item.value,
//           count: 1,
//           unit: item.unit,
//           usageCoefficient: item.usageCoefficient,
//         };
//       }
//     });
//     form.setFieldsValue(initialValues);
//   }, [dataSource, form]);

//   const onValuesChange = () => {
//     setIsCalculateButtonDisabled(false);
//   };

//   const onFinish = (values) => {
//     setIsCalculateButtonDisabled(true);
//     handleFinish(values);
//   };

//   return (
//     <div>
//       <Title level={2} style={{ marginBottom: 16 }}>
//         Калькулятор мощности
//       </Title>

//       <Paragraph>{calcData.texts.mainParagraphText}</Paragraph>
//       <Paragraph>
//         <b>
//           Для заявителей - физических лиц. Только для некоммерческого
//           применения.
//         </b>
//       </Paragraph>

//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         onValuesChange={onValuesChange}
//       >
//         {dataSource.map((item) => {
//           if (item.isSection) {
//             return (
//               <Title key={item.key} level={4} style={{ marginTop: 24 }}>
//                 {item.section}
//               </Title>
//             );
//           }

//           return (
//             <div key={item.key}>
//               <Card
//                 title={item.name}
//                 style={{ marginBottom: 20 }}
//                 styles={{ body: { padding: 10 } }}
//               >
//                 <Flex gap={10}>
//                   <Form.Item
//                     name={[item.key, "value"]}
//                     initialValue={item.value}
//                   >
//                     <InputNumber min={0} step={0.01} addonAfter={"кВт"} />
//                   </Form.Item>

//                   <Form.Item name={[item.key, "count"]} initialValue={1}>
//                     <InputNumber min={0} step={1} addonAfter={item.unitShort} />
//                   </Form.Item>
//                 </Flex>

//                 <Form.Item
//                   name={[item.key, "usageCoefficient"]}
//                   label="Коэффициент использования"
//                   initialValue={item.usageCoefficient}
//                 >
//                   <Slider
//                     min={0}
//                     max={1}
//                     step={0.1}
//                     marks={{ 0: "0", 1: "1" }}
//                     tooltip={{
//                       open: true,
//                     }}
//                   />
//                 </Form.Item>
//               </Card>
//             </div>
//           );
//         })}
//         <Flex gap={10} justify="center">
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               disabled={isCalculateButtonDisabled}
//             >
//               Рассчитать
//             </Button>
//           </Form.Item>
//           <Button
//             type="default"
//             onClick={() => generatePDF(prepareDataSource(), totalPower)}
//           >
//             Выгрузить PDF
//           </Button>
//         </Flex>
//       </Form>

//       {/* Итог */}
//       <div style={{ textAlign: "center", marginTop: 20 }}>
//         <Typography.Text>
//           <b>
//             Итого: {totalPower || "0 кВт"}
//             <sup>*</sup>
//           </b>
//         </Typography.Text>
//         {showAdditionalInfo && (
//           <>
//             <Paragraph style={{ textAlign: "justify", marginTop: "20px" }}>
//               {calcData.texts.additionalInfoText}
//             </Paragraph>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
