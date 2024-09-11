import React from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Space,
  Col,
  Row,
  Slider,
} from "antd";

export default function NumberInput({
  name = "name",
  label = "Label",
  disabled = false,
  placeholder = "placeholder",
  required = false,
  dependOf = false,
  howDepend = false,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = false,
  length=false
}) {
  const form = Form.useFormInstance();
  let fieldDepends = Form.useWatch(dependOf, form);
  // console.log('defaultValue',defaultValue)
  // console.log('disabled',disabled)
  const formElement =  (
    <Form.Item
      name={name}
      label={label}
      rules={[
          {
            required: required,
            message: "Это поле обязательное",
          },
        ]
      }
      initialValue={defaultValue?defaultValue:min}
      
    >
      <InputNumber
        min={min}
        max={max}
        step={step}
        // value={inputValue}
        // onChange={onChange}
        maxLength={length}
        disabled={disabled}
      />
    </Form.Item>
    
  );
  if (!dependOf) return formElement
  if (dependOf && howDepend && howDepend.options?.length > 0) {
      let show = false
      if(typeof fieldDepends === "undefined")  fieldDepends = false 
      howDepend.options.forEach(item => {
          if (item.value === "true") item.value = true
          if (item.value === "false") item.value = false;
          if (item.value == fieldDepends) show = true
      })
      if (show) return formElement
  }
  if (dependOf && howDepend && howDepend.min && howDepend.max) {
      if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max) return formElement
  }
}
