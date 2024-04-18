import React from "react";
import SnilsInput from "../FormComponents/SnilsInput";
import SnilsJson from "./SnilsJson.json";

export default function Snils({ form, read, value }) {
  const { dividerText, label, placeholder, maxLength } = SnilsJson;

  const validateSnils = (snils) => {
    const error = { code: 0, message: "" };
    if (typeof snils !== "string") snils = "";
    if (!snils.length) {
      error.code = 1;
      error.message = "СНИЛС пуст";
    } else if (snils.length !== 14) {
      error.code = 2;
      error.message = "СНИЛС должен состоять из 11 цифр";
    } else {
      const nums = snils.replace(/[^0-9]/g, "");
      if (nums.length !== 11) {
        error.code = 3;
        error.message = "Неправильный формат СНИЛС";
      } else {
        let sum = 0;
        for (let i = 0; i < 9; i++) {
          sum += parseInt(nums[i]) * (9 - i);
        }
        let checkDigit = sum < 100 ? sum : sum % 101;
        if (checkDigit === 100) checkDigit = 0;
        if (checkDigit === parseInt(nums.slice(-2))) {
          return Promise.resolve();
        } else {
          error.code = 4;
          error.message = "Неверный СНИЛС";
        }
      }
    }
    return Promise.reject(new Error(error.message));
  };

  return (
    <SnilsInput
      form={form}
      read={read}
      dividerText={dividerText}
      label={label}
      placeholder={placeholder}
      maxLength={maxLength}
      validator={validateSnils}
      value={value}
    />
  );
}
