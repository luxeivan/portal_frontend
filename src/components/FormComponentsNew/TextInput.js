import { Form, theme, Input, AutoComplete } from "antd";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import axios from "axios";
const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

const listTypeForDadata = [
  "Фамилия",
  "Имя",
  "Отчество",
  "АдресПолный",
  "Страна",
  "Регион",
  "Город",
  "Улица",
  "Район",
  "АдресПолный",
];

export default function TextInput({
  name = "name",
  label = "Label",
  disabled = false,
  placeholder = "Пример",
  defaultValue = false,
  required = false,
  dependOf = false,
  howDepend = false,
  inputMask = false,
  length = false,
  specialField: type = false,
}) {
  const { token } = theme.useToken();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Состояние для подсказок
  const form = Form.useFormInstance();
  let fieldDepends = Form.useWatch(dependOf, form);

  const fetchSuggestions = async (searchText) => {
    if (searchText) {
      try {
        const response = await axios.get(
          `${backServer}/api/cabinet/getDaData`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            withCredentials: true,
            params: {
              type,
              query: searchText,
            },
          }
        );
        setSuggestions(
          response.data.data.map((suggestion) => suggestion.value)
        );
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 500),
    []
  );

  useEffect(() => {
    if (listTypeForDadata.includes(type)) {
      debouncedFetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  }, [value, type]);

  const handlerOnChange = (value) => {
    setValue(value);
  };

  // Общий шаблон для полей ввода
  const formItemRules = [
    {
      required: required,
      message: "Это поле обязательное",
    },
  ];

  const autoComplete = (
    <Form.Item name={name} label={label} rules={formItemRules}>
      <AutoComplete
        options={suggestions.map((suggestion) => ({ value: suggestion }))}
        onChange={handlerOnChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={length || undefined} // Убираем `false`, если `length` не задано
      />
    </Form.Item>
  );

  const email = (
    <Form.Item
      name={name}
      label={label}
      rules={[
        ...formItemRules,
        {
          type: "email",
          message: "Это поле в формате Email",
        },
      ]}
    >
      <Input
        placeholder={placeholder}
        maxLength={length || undefined} // Убираем `false`, если `length` не задано
        disabled={disabled}
      />
    </Form.Item>
  );

  const simpleInput = (
    <Form.Item
      name={name}
      label={label}
      rules={formItemRules}
      initialValue={defaultValue}
    >
      <Input
        placeholder={placeholder}
        maxLength={length || undefined} // Убираем `false`, если `length` не задано
        disabled={disabled}
      />
    </Form.Item>
  );

  let formElement = simpleInput;
  if (listTypeForDadata.includes(type)) formElement = autoComplete;
  if (type === "ЭлектронныйАдрес") formElement = email;

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

  return null;
}

// import { Form, theme, Input, AutoComplete } from "antd";
// import { useState, useEffect, useCallback } from "react";
// import { debounce } from "lodash";
// import axios from "axios";
// const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

// const listTypeForDadata = [
//   "Фамилия",
//   "Имя",
//   "Отчество",
//   "АдресПолный",
//   "Страна",
//   "Регион",
//   "Город",
//   "Улица",
//   "Район",
//   "АдресПолный",
// ];

// export default function TextInput({
//   name = "name",
//   label = "Label",
//   disabled = false,
//   placeholder = "Пример",
//   defaultValue = false,
//   required = false,
//   dependOf = false,
//   howDepend = false,
//   inputMask = false,
//   length = false,
//   specialField: type = false,
// }) {
//   const { token } = theme.useToken();
//   const [value, setValue] = useState("");
//   const [suggestions, setSuggestions] = useState([]); // Состояние для подсказок
//   const form = Form.useFormInstance();
//   let fieldDepends = Form.useWatch(dependOf, form);

//   const fetchSuggestions = async (searchText) => {
//     if (searchText) {
//       try {
//         const response = await axios.get(
//           `${backServer}/api/cabinet/getDaData`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//             },
//             withCredentials: true,
//             params: {
//               type,
//               query: searchText,
//             },
//           }
//         );
//         setSuggestions(
//           response.data.data.map((suggestion) => suggestion.value)
//         );
//       } catch (error) {
//         console.error("Error fetching suggestions:", error);
//       }
//     } else {
//       setSuggestions([]);
//     }
//   };
//   const debouncedFetchSuggestions = useCallback(
//     debounce(fetchSuggestions, 500),
//     []
//   );

//   useEffect(() => {
//     if (listTypeForDadata.includes(type)) {
//       debouncedFetchSuggestions(value);
//     } else {
//       setSuggestions([]);
//     }
//   }, [value, type]);

//   const handlerOnChange = (value) => {
//     setValue(value);
//   };
//   const autoComplete = (
//     <Form.Item
//       name={name}
//       label={label}
//       rules={[
//         {
//           required: required,
//           message: "Это поле обязательное",
//         },
//       ]}
//     >
//       <AutoComplete
//         options={suggestions.map((suggestion) => ({ value: suggestion }))}
//         onChange={handlerOnChange}
//         value={value}
//         placeholder={placeholder}
//         disabled={disabled}
//         maxLength={length}
//       />
//     </Form.Item>
//   );

//   const email = (
//     <Form.Item
//       name={name}
//       label={label}
//       rules={[
//         {
//           required: required,
//           message: "Это поле обязательное",
//         },
//         {
//           type: "email",
//           message: "Это поле в формате Email",
//         },
//       ]}
//     >
//       <Input placeholder={placeholder} maxLength={length} disabled={disabled} />
//     </Form.Item>
//   );

//   const simpleInput = (
//     <Form.Item
//       name={name}
//       label={label}
//       rules={[
//         {
//           required: required,
//           message: "Это поле обязательное",
//         },
//       ]}
//       initialValue={defaultValue}
//     >
//       <Input placeholder={placeholder} maxLength={length} disabled={disabled} />
//     </Form.Item>
//   );
//   let formElement = simpleInput;
//   if (listTypeForDadata.includes(type)) formElement = autoComplete;
//   if (type === "ЭлектронныйАдрес") formElement = email;

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
//     if (fieldDepends >= howDepend.min && howDepend.max) return formElement;
//   }
// }
