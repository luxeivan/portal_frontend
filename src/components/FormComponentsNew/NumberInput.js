import React, { useEffect, useState } from "react";
import { Form, InputNumber } from "antd";
import useServices from "../../stores/useServices";
import useTemp from "../../stores/Cabinet/useTemp";
import WrapperComponent from "./WrapperComponent";

export default function NumberInput({
  name = "name",
  label = "Label",
  disabled = false,
  placeholder = "placeholder",
  required = false,
  dependOf = false,
  howDepend = false,
  min = 0,
  max = false,
  step = 1,
  defaultValue = false,
  length = false,
  properties = false,
  ractionDigits = undefined,
  span = false
}) {
  const [stepMain, setStepMain] = useState(step)
  const serviceItem = useServices((state) => state.serviceItem);
  const unit = useTemp((state) => state.unit);
  const setUnit = useTemp((state) => state.setUnit);
  const form = Form.useFormInstance();
  // let fieldDepends = Form.useWatch(dependOf, form);

  let objectProp = null;
  if (properties) objectProp = JSON.parse(properties);
  console.log("objectProp",objectProp);
  console.log("objectProp?.unit?.idLine",objectProp?.unit?.idLine);
  
  let idLine = Form.useWatch(objectProp?.unit?.idLine || '', form);
  // let idLine = false
  useEffect(() => {
    if (objectProp?.unit && objectProp?.unit?.idLine) {
      if (serviceItem.fields) {
        const field = serviceItem.fields.find(
          (item) => item.idLine === objectProp?.unit?.idLine
        );
        if (field?.component_Expanded?.options) {
          setUnit({
            [name]: field.component_Expanded.options.find((item) => item.value === form.getFieldValue(objectProp?.unit?.idLine))?.unit,
          });
          // setStepMain()
        }
      }
    }
    if (objectProp?.unit?.value) {
      setUnit(name, objectProp?.unit?.value);
    }
  }, [idLine]);

  const formElement = (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required,
          message: "Это поле обязательное",
        },
      ]}
      initialValue={defaultValue ? defaultValue : min}
    >
      <InputNumber
        min={min}
        max={max}
        step={stepMain}
        decimalSeparator=","
        precision={ractionDigits > 0 ? ractionDigits : undefined}
        maxLength={length || undefined} // Убираем `false`, если `length` не задано
        disabled={disabled}
        suffix={
          objectProp?.unit?.position === "suffix" ? unit[name] : undefined
        }
        addonAfter={
          objectProp?.unit?.position === "addonAfter" ? unit[name] : undefined
        }
      />
    </Form.Item>
  );

  // if (!dependOf) return formElement;

  // if (dependOf && howDepend && howDepend.options?.length > 0) {
  //   let show = false;
  //   if (typeof fieldDepends === "undefined") fieldDepends = false;
  //   howDepend.options.forEach((item) => {
  //     if (item.value === "true") item.value = true;
  //     if (item.value === "false") item.value = false;
  //     if (item.value == fieldDepends) show = true;
  //   });
  //   if (show) return formElement;
  // }

  // if (dependOf && howDepend && howDepend.max) {
  //   if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max)
  //     return formElement;
  // }
  return <WrapperComponent span={span} dependOf={dependOf} howDepend={howDepend} name={name}>{formElement}</WrapperComponent>
  // return null;
}

