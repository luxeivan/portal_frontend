import React from "react";
import SnilsInput from "../FormComponents/SnilsInput";
import SnilsJson from "./SnilsJson.json";

export default function Snils({ form, read, value }) {
  const { dividerText, label, placeholder, maxLength, validator } = SnilsJson;
  return (
    <SnilsInput
      form={form}
      read={read}
      dividerText={dividerText}
      label={label}
      placeholder={placeholder}
      maxLength={maxLength}
      validator={validator}
      value={value}
    />
  );
}