import { Form, theme, Input, AutoComplete } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

export default function TextInput({
  name = "name",
  label = "Label",
  disabled = false,
  placeholder = "Пример",
  required = false,
  dependOf = false,
  howDepend = false,
  inputMask = false,
  lenght = false,
  type = false, 
}) {
  const { token } = theme.useToken();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Состояние для подсказок
  const form = Form.useFormInstance();
  const fieldDepends = Form.useWatch(dependOf, form);

  useEffect(() => {
    if (type === "Фамилия" && value) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get("/getDaData", {
            params: {
              type: "Фамилия",
              query: value,
            },
          });
          setSuggestions(
            response.data.data.map((suggestion) => suggestion.value)
          );
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      };

      const debounceFetch = setTimeout(fetchSuggestions, 300);
      return () => clearTimeout(debounceFetch);
    } else {
      setSuggestions([]);
    }
  }, [value, type]);

  const handlerOnChange = (value) => {
    setValue(value);
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
      {/* Проверка типа и использование AutoComplete для отображения подсказок */}
      {type === "Фамилия" ? (
        <AutoComplete
          options={suggestions.map((suggestion) => ({ value: suggestion }))}
          onChange={handlerOnChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : (
        <Input
          placeholder={placeholder}
          maxLength={lenght}
          disabled={disabled}
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
    if (fieldDepends >= howDepend.min && howDepend <= howDepend.max)
      return formElement;
  }
}

// import { Form, theme, Input } from "antd";
// import { MaskedInput } from "antd-mask-input";
// import { useState } from "react";

// export default function TextInput({
//   name = "name",
//   label = "Label",
//   disabled = false,
//   placeholder = "Пример",
//   required = false,
//   dependOf = false,
//   howDepend = false,
//   inputMask = false,
//   lenght = false,
//   type=false
// }) {
//   const { token } = theme.useToken();
//   const [value, setValue] = useState();
//   const form = Form.useFormInstance();
//   const fieldDepends = Form.useWatch(dependOf, form);
//   // console.log(name)
//   const handlerOnChange = (e) => {
//     console.log(e.target.value);
//     // setValue(e.target.value)
//     // form.setFieldValue(name, e.target.value)
//   };
//   // console.log(lenght)
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
//     // valuePropName={name} colorPrimaryHover
//     >
//       {/* <ReactInputMask className='ant-input css-dev-only-do-not-override-1sbryic ant-input-outlined ant-input-status-success' onChange={handlerOnChange} /> */}
//       <Input placeholder={placeholder} maxLength={lenght} />
//       {/* <MaskedInput
//         maskOptions={{
//           mask: inputMask == "" ? false : inputMask,
//           overwrite: "shift",
//         }}
//         maxLength={lenght == 0 ? false : lenght}
//         style={{
//           backgroundColor: token.colorBgContainer,
//           //  borderColor: token.colorBorder
//         }}
//         className={"ant-picker-outlined"}
//       /> */}
//       {/* <ReactInputMask mask={mask} disabled={disabled} onChange={handlerOnChange} >
//                 {(inputProps) => {
//                     console.log(inputProps)
//                     return <Input {...inputProps} disabled={disabled} placeholder={placeholder} />
//                 }}
//             </ReactInputMask> */}
//     </Form.Item>
//   );
//   if (!dependOf) return formElement;
//   if (dependOf && howDepend && howDepend.values.length > 0) {
//     let show = false;
//     howDepend.values.forEach((item) => {
//       if (item.value === "true") item.value = true;
//       if (item.value == fieldDepends) show = true;
//     });
//     if (show) return formElement;
//   }
//   if (dependOf && howDepend && howDepend.min && howDepend.max) {
//     if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max)
//       return formElement;
//   }
// }
