import React from "react";
import { Form, Switch } from "antd";

export default function SwitchInput({
  name = "name",
  label = "Label",
//   defaultValue = false,
  required = false,
  dependOf = false,
  howDepend = false,
}) {
  const form = Form.useFormInstance();
  let fieldDepends = Form.useWatch(dependOf, form);

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
    //   initialValue={defaultValue}
    >
      <Switch />
    </Form.Item>
  );

  if (!dependOf) return formElement;
  if (dependOf && howDepend && howDepend.options?.length > 0) {
    let show = false;
    if (typeof fieldDepends === "undefined") fieldDepends = false;
    howDepend.options.forEach((item) => {
      if (item.value === "true") item.value = true;
      if (item.value === "false") item.value = false;
      if (item.value == fieldDepends) show = true;
    });
    if (show) return formElement;
  }
  if (dependOf && howDepend && howDepend.max) {
    if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max)
      return formElement;
  }
}
