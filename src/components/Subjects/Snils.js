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

// import React from "react";

// import { Input, Form, Divider, Typography } from "antd";

// import useSubjects from "../../stores/Cabinet/useSubjects";

// export default function Snils({ form, read, edit, value }) {
//   const { validateSnils } = useSubjects();

//   return (
//     <>
//       <Divider orientation="center">СНИЛС</Divider>

//       {read ? (
//         <Form.Item label="Номер СНИЛС" name="snils">
//           <Typography.Text>{value.snils}</Typography.Text>
//         </Form.Item>
//       ) : (
//         <Form.Item
//           label="Номер СНИЛС"
//           name="snils"
//           // rules={[
//           //   () => ({
//           //     validator(_, value) {
//           //       if (!value) {
//           //         return Promise.reject(
//           //           new Error("СНИЛС не может быть пустым")
//           //         );
//           //       }
//           //       if (!/^\d{3}-\d{3}-\d{3}[\s-]?\d{2}$/.test(value)) {
//           //         return Promise.reject(new Error("Формат СНИЛС неверный"));
//           //       }
//           //       return validateSnils(value);
//           //     },
//           //   }),
//           // ]}
//         >
//           <Input
//             placeholder="XXX-XXX-XXX XX"
//             maxLength={14}
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
