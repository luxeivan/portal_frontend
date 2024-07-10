import React from "react";
import { Form, Input } from "antd";
import ReactInputMask from "react-input-mask";

export default function TextInput({
  name = "name",
  label = "Label",
  disabled = false,
  placeholder = "Пример",
  required = false,
  dependOf = false,
  howDepend = false,
  mask = null, // Маска по умолчанию для проверки
}) {
  const form = Form.useFormInstance();
  const fieldDepends = Form.useWatch(dependOf, form);

  const handleChange = (e) => {
    form.setFieldsValue({ [name]: e.target.value });
  };

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
    >
      {mask ? (
        <ReactInputMask mask={mask} onChange={handleChange}>
          {(inputProps) => (
            <Input
              {...inputProps}
              placeholder={placeholder}
              disabled={disabled}
            />
          )}
        </ReactInputMask>
      ) : (
        <Input
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
        />
      )}
    </Form.Item>
  );

  if (!dependOf) return formElement;
  if (dependOf && howDepend && howDepend.values.length > 0) {
    let show = false;
    howDepend.values.forEach((item) => {
      if (item.value === "true") item.value = true;
      if (item.value == fieldDepends) show = true;
    });
    if (show) return formElement;
  }
  if (dependOf && howDepend && howDepend.min && howDepend.max) {
    if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max)
      return formElement;
  }
}
