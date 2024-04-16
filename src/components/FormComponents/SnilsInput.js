import React, { useState } from "react";
import { Input, Form, Typography } from "antd";
// import SnilsJson from "../Subjects/SnilsJson.json";

export default function SnilsInput({ form, read, value = "", name = "snils" }) {
  // const [snils, setSnils] = useState(123)
  const { label, placeholder, maxLength, validator } = {
    dividerText: "СНИЛС",
    label: "Номер",
    placeholder: "XXX-XXX-XXX XX",
    maxLength: 14,
    validator: {
      formatRegExp: "^\\d{3}-\\d{3}-\\d{3}[\\s-]?\\d{2}$"
    }
  };
  const validateSnils = ( e ) => {   
    let snils = form.getFieldValue(e.field)
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

  // Функция валидации СНИЛСа
  // const validateSnils = (rule, value) => {
  //   //console.log(value)
  //   if (!value) {
  //     return Promise.resolve();
  //     // return Promise.reject(new Error("СНИЛС не может быть пустым"));
  //   }
  //   if (!new RegExp(validator.formatRegExp).test(value)) {
  //     return Promise.reject(new Error(validator.formatErrorText));
  //   }
  //   return Promise.resolve();
  // };

  return (
    <Form.Item
      label={<Typography.Text>{label}</Typography.Text>}
      name={name}
      rules={[
        // { required: true, message: "Введите СНИЛС" },
        { validator: validateSnils },
      ]}
    >
      {read ? (
        <Typography.Text>{value}</Typography.Text>
      ) : (
        <Input
          // value={snils}
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
            console.log(value)
            // setSnils(value)
            form.setFieldsValue({ snils: value });
          }}
        />
      )}
    </Form.Item>
  );
}


// import React from "react";
// import { Input, Form, Typography } from "antd";
// import SnilsJson from "../Subjects/SnilsJson.json";

// export default function SnilsInput({
//   form,
//   read,
//   dividerText,
//   label,
//   placeholder,
//   maxLength,
//   value = "",
// }) {
//   const validateSnils = (rule, value) => {
//     if (!value) {
//       return Promise.reject(new Error("СНИЛС не может быть пустым"));
//     }
//     if (!new RegExp(SnilsJson.validator.formatRegExp).test(value)) {
//       return Promise.reject(new Error(SnilsJson.validator.formatErrorText));
//     }
//     return Promise.resolve();
//   };

//   return (
//     <Form.Item
//       label={<Typography.Text>{label}</Typography.Text>}
//       name="snils"
//       rules={[
//         { required: true, message: "Введите СНИЛС" },
//         { validator: validateSnils },
//       ]}
//     >
//       {read ? (
//         <Typography.Text>{value}</Typography.Text>
//       ) : (
//         <Input placeholder={placeholder} maxLength={maxLength} />
//       )}
//     </Form.Item>
//   );
// }

// import React from "react";
// import { Input, Form, Typography } from "antd";

// export default function SnilsInput({
//   read,
//   dividerText,
//   displayName,
//   placeholder,
//   maxLength,
//   validator,
//   value = false,
//   depends,
// }) {
//   // -------------------------------------
//   const form = Form.useFormInstance();
//   let show = true;
//   let showTemp =
//     Form.useWatch(depends?.showIf?.nameField, form) === depends?.showIf?.eq;
//   if (depends && showTemp) show = true;
//   else if (!depends) show = true;
//   else show = false;
//   // -------------------------------------
//   const validateSnils = (rule, value) => {
//     if (value && !RegExp(validator.formatRegExp).test(value)) {
//       return Promise.reject(new Error(validator.formatErrorText));
//     }
//     return Promise.resolve();
//   };

//   return (
//     <>
//       {read ? (
//         <Form.Item
//           label={<Typography.Text>{displayName}</Typography.Text>}
//           name="snils"
//         >
//           <Typography.Text>{value}</Typography.Text>
//         </Form.Item>
//       ) : (
//         <Form.Item
//           name="snils"
//           label={<Typography.Text>{displayName}</Typography.Text>}
//           rules={[{ validator: validateSnils }]}
//         >
//           <Input
//             placeholder={placeholder}
//             maxLength={maxLength}
//             onChange={(e) => {
//               let value = e.target.value.replace(/[^0-9]/g, "");
//               if (value.length > 9) {
//                 value = `${value.slice(0, 3)}-${value.slice(
//                   3,
//                   6
//                 )}-${value.slice(6, 9)} ${value.slice(9, 11)}`;
//               } else if (value.length > 6) {
//                 value = `${value.slice(0, 3)}-${value.slice(
//                   3,
//                   6
//                 )}-${value.slice(6)}`;
//               } else if (value.length > 3) {
//                 value = `${value.slice(0, 3)}-${value.slice(3)}`;
//               }
//               e.target.value = value;
//               form.setFieldsValue({ snils: value });
//             }}
//           />
//         </Form.Item>
//       )}
//     </>
//   );
// }
