import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";

export default function SelectInput({
  name = "name",
  label = "Label",
  autoComplete = false,
  defaultValue = false,
  required = false,
  options = [],
  dependOf = false,
  howDepend = false,
}) {

  const [optionsAuto, setOptionsAuto] = useState();
  const form = Form.useFormInstance();
  let fieldDepends = Form.useWatch(dependOf, form);
  
  useEffect(() => {
    if (autoComplete) {
      setOptionsAuto(options);
    }
  }, []);

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
      style={{ flex: 1 }}
      initialValue={defaultValue}
    >
      <Select showSearch optionFilterProp="label" options={options} />
    </Form.Item>
  );

  if (!dependOf) return formElement;

  if (dependOf && howDepend && howDepend.options?.length > 0) {
    let show = false;

    if (typeof fieldDepends === "undefined") fieldDepends = false;
    howDepend.options.forEach((item) => {
      if (item.value === "true") item.value = true;
      if (item.value === "false") item.value = false;
      if (item.value === fieldDepends) show = true;
    });

    if (show) return formElement;
  }
  if (dependOf && howDepend && howDepend.max) {
    if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max)
      return formElement;
  }
}

// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Form,
//   Input,
//   InputNumber,
//   message,
//   Space,
//   Select,
//   AutoComplete,
// } from "antd";

// export default function SelectInput({
//   name = "name",
//   label = "Label",
//   autoComplete = false,
//   defaultValue = false,
//   disabled = false,
//   placeholder = "placeholder",
//   required = false,
//   options = [],
//   dependOf = false,
//   howDepend = false,
// }) {
//   const [optionsAuto, setOptionsAuto] = useState();
//   const [value, setValue] = useState();
//   const form = Form.useFormInstance();
//   // console.log(dependOf)
//   let fieldDepends = Form.useWatch(dependOf, form);
//   useEffect(() => {
//     if (autoComplete) {
//       setOptionsAuto(options);
//     }
//   }, []);
//   const onSelect = (select, options) => {
//     console.log(select);
//     console.log(options);
//     // setValue(options.label)
//     form.setFieldValue(name, options.value);
//   };
//   const setOptions = (text) => {
//     setOptionsAuto(
//       options.filter((item) =>
//         item.label.toLowerCase().includes(text.toLowerCase())
//       )
//     );
//   };
//   const formElement = (
//     <Form.Item
//       name={name}
//       label={label}
//       rules={[
//         {
//           required: required,
//           message: "Это поле обязательное",
//         },
//       ]}
//       style={{ flex: 1 }}
//       initialValue={defaultValue}
//     >
//       {/* {autoComplete &&
//                 <AutoComplete
//                     options={optionsAuto}
//                     onSelect={onSelect}
//                     // value={value}
//                     onSearch={(text) => setOptions(text)}
//                     // filterOption={(inputValue, option) =>
//                     //     option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
//                     // }
//                 />
//             } */}

//       <Select
//         // style={{ width: 120 }}
//         showSearch
//         optionFilterProp="label"
//         options={options}
//         // disabled={disabled}
//         // defaultValue={defaultValue}
//       />
//     </Form.Item>
//   );
//   if (!dependOf) return formElement;
//   if (dependOf && howDepend && howDepend.options?.length > 0) {
//     let show = false;
//     if (typeof fieldDepends === "undefined") fieldDepends = false;
//     howDepend.options.forEach((item) => {
//       if (item.value === "true") item.value = true;
//       if (item.value === "false") item.value = false;
//       if (item.value == fieldDepends) show = true;
//     });
//     if (show) return formElement;
//   }
//   if (dependOf && howDepend && howDepend.max) {
//     // form.setFieldValue(name, '')
//     if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max)
//       return formElement;
//   }
// }
