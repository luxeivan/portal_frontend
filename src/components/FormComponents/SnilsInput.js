import React from "react";
import { Input, Form, Divider, Typography } from "antd";

export default function SnilsInput({ read, dividerText, displayName, placeholder, maxLength, validator, value = false,depends }) {
  // -------------------------------------
  const form = Form.useFormInstance();
  let show = true
  let showTemp = Form.useWatch(depends?.showIf?.nameField, form) === depends?.showIf?.eq;
  if (depends && showTemp)
    show = true
  else if (!depends)
    show = true
  else show = false
  // -------------------------------------
  const validateSnils = (rule, value) => {
    if (value && !RegExp(validator.formatRegExp).test(value)) {
      return Promise.reject(new Error(validator.formatErrorText));
    }
    return Promise.resolve();
  };

  return (
    <>
      {read ? (
        <Form.Item label={<Typography.Text>{displayName}</Typography.Text>} name="snils">
          <Typography.Text>{value}</Typography.Text>
        </Form.Item>
      ) : (
        <Form.Item name="snils" label={<Typography.Text>{displayName}</Typography.Text>} rules={[{ validator: validateSnils }]}>
          <Input
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={(e) => {
              let value = e.target.value.replace(/[^0-9]/g, "");
              if (value.length > 9) {
                value = `${value.slice(0, 3)}-${value.slice(
                  3,
                  6
                )}-${value.slice(6, 9)} ${value.slice(9, 11)}`;
              } else if (value.length > 6) {
                value = `${value.slice(0, 3)}-${value.slice(
                  3,
                  6
                )}-${value.slice(6)}`;
              } else if (value.length > 3) {
                value = `${value.slice(0, 3)}-${value.slice(3)}`;
              }
              e.target.value = value;
              form.setFieldsValue({ snils: value });
            }}
          />
        </Form.Item>
      )}
    </>
  );
}
