import React from "react";
import { Form, Switch } from "antd";
import WrapperComponent from "./WrapperComponent";
import InfoDrawer from "../InfoDrawer";

export default function SwitchInput({
  name = "name",
  label = "",
  defaultValue = false,
  required = false,
  dependOf = false,
  howDepend = false,
  span = false,
  fullDescription = false,
  stylesField_key=false
}) {

  if (defaultValue && defaultValue === "true") {
    // console.log(typeof defaultValue)
    defaultValue = true
  }
  if (defaultValue && defaultValue === "false") {
    // console.log(typeof defaultValue)
    defaultValue = false
  }
  const form = Form.useFormInstance();
  // let fieldDepends = Form.useWatch(dependOf, form);
  // console.log(label, defaultValue)
  const formElement = (
    <Form.Item
      name={name}
      label={fullDescription ? <InfoDrawer fullDescription={fullDescription}>{label}</InfoDrawer> : label}

      rules={[
        {
          required: required,
          message: "Это поле обязательное",
        },
      ]}
      initialValue={defaultValue}
      
      // labelAlign="right"
      // labelCol={{span: 12}}
      // colon={false}
      // layout="vertical"
    >
      <Switch />
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
  return <WrapperComponent span={span} stylesField_key={stylesField_key} dependOf={dependOf} howDepend={howDepend} name={name}>{formElement}</WrapperComponent>
}
