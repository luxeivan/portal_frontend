import { Form, theme, Input, AutoComplete } from "antd";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import axios from "axios";
import SnilsInput from "./SnilsInput";
const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

const listTypeInput = [
  "Фамилия",
  "Имя",
  "Отчество",
  "ИНН",
  "Адрес",
  "АдресПолный",
  "Город",
  "Банк - наименование",
  "БИК",
  "Дата выдачи документа",
  "Документ",
  "Индекс",
  "Квартира",
  "Кем выдан документа",
  "Код кладр",
  "Код подразделения документа",
  "Код ФИАС",
  "Корреспондентский счет",
  "КПП",
  "Местность",
  "Номенклатура",
  "Номер документа",
  "Номер корпуса",
  "Номер строения",
  "Полное имя",
  "Префикс имени",
  "Район",
  "Расчетный счет",
  "Регион",
  "Серия документа",
  "СНИЛС",
  "Страна",
  "Суффикс имени",
  "Телефон",
  "Тип адреса",
  "Удостоверяющий документ",
  "Улица",
  "Электронный адрес",
  "НомерДома",
  "АдресПолный",
]

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
]

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
  lenght = false,
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
        const response = await axios.get(`${backServer}/api/cabinet/getDaData`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          withCredentials: true,
          params: {
            type,
            query: searchText,
          },
        });
        //console.log("DaData response:", response.data);
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
  // console.log('type', type)
  // console.log('lenght', lenght)
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 500),
    []
  );

  useEffect(() => {
    if (
      listTypeForDadata.includes(type)
    ) {
      debouncedFetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  }, [value, type]);

  const handlerOnChange = (value) => {
    setValue(value);
  };
  const autoComplete = <Form.Item
    name={name}
    label={label}
    rules={[
      {
        required: required,
        message: "Это поле обязательное",
      },
    ]}
  >
    <AutoComplete
      options={suggestions.map((suggestion) => ({ value: suggestion }))}
      onChange={handlerOnChange}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={lenght}
    />
  </Form.Item>

  const email = <Form.Item
    name={name}
    label={label}
    rules={[
      {
        required: required,
        message: "Это поле обязательное",
      },
      {
        type: 'email',
        message: "Это поле в формате Email",
      },
    ]}
  >
    <Input
      placeholder={placeholder}
      maxLength={lenght}
      disabled={disabled}
    />
  </Form.Item>
  

  const simpleInput = <Form.Item
    name={name}
    label={label}
    rules={[
      {
        required: required,
        message: "Это поле обязательное",
      },
    ]}
  >
    <Input
      placeholder={placeholder}
      maxLength={lenght}
      disabled={disabled}
      defaultValue={defaultValue}
    />
  </Form.Item>
  let formElement = simpleInput
  if (listTypeForDadata.includes(type)) formElement = autoComplete
  if (type === 'ЭлектронныйАдрес') formElement = email


  if (!dependOf) return formElement;
  if (dependOf && howDepend && howDepend.options?.length > 0) {
    let show = false;
    if (typeof fieldDepends === "undefined") fieldDepends = false
    howDepend.options.forEach((item) => {
      if (item.value === "true") item.value = true;
      if (item.value === "false") item.value = false;
      if (item.value == fieldDepends) show = true;
    });
    if (show) return formElement;
  }
  if (dependOf && howDepend && howDepend.min && howDepend.max) {
    if (fieldDepends >= howDepend.min && howDepend.max) return formElement;
  }
}

// import { Form, theme, Input, AutoComplete } from "antd";
// import { useState, useEffect, useCallback } from "react";
// import { debounce } from "lodash";
// import axios from "axios";
// const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

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
//   specialField: type = false,
// }) {
//   const { token } = theme.useToken();
//   const [value, setValue] = useState("");
//   const [suggestions, setSuggestions] = useState([]); // Состояние для подсказок
//   const form = Form.useFormInstance();
//   const fieldDepends = Form.useWatch(dependOf, form);

//   const fetchSuggestions = async (searchText) => {
//     if (searchText) {
//       try {
//         const response = await axios.get(`${backServer}/getDaData`, {
//           params: {
//             type,
//             query: searchText,
//           },
//         });
//         console.log("DaData response:", response.data);
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
//     debounce(fetchSuggestions, 800),
//     []
//   );

//   useEffect(() => {
//     if (
//       [
//         "Фамилия",
//         "Имя",
//         "Отчество",
//         "ИНН",
//         "Страна",
//         "Регион",
//         "Город",
//         "Улица",
//         "Район"
//       ].includes(type)
//     ) {
//       debouncedFetchSuggestions(value);
//     } else {
//       setSuggestions([]);
//     }
//   }, [value, type]);

//   const handlerOnChange = (value) => {
//     setValue(value);
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
//     >
//       {[
//         "Фамилия",
//         "Имя",
//         "Отчество",
//         "ИНН",
//         "Адрес",
//         "Город",
//         "Банк - наименование",
//         "БИК",
//         "Дата выдачи документа",
//         "Документ",
//         "Индекс",
//         "Квартира",
//         "Кем выдан документа",
//         "Код кладр",
//         "Код подразделения документа",
//         "Код ФИАС",
//         "Корреспондентский счет",
//         "КПП",
//         "Местность",
//         "Номенклатура",
//         "Номер документа",
//         "Номер корпуса",
//         "Номер строения",
//         "Полное имя",
//         "Префикс имени",
//         "Район",
//         "Расчетный счет",
//         "Регион",
//         "Серия документа",
//         "СНИЛС",
//         "Страна",
//         "Суффикс имени",
//         "Телефон",
//         "Тип адреса",
//         "Удостоверяющий документ",
//         "Улица",
//         "Электронный адрес",
//         "НомерДома"
//       ].includes(type) ? (
//         <AutoComplete
//           options={suggestions.map((suggestion) => ({ value: suggestion }))}
//           onChange={handlerOnChange}
//           value={value}
//           placeholder={placeholder}
//           disabled={disabled}
//         />
//       ) : (
//         <Input
//           placeholder={placeholder}
//           maxLength={lenght}
//           disabled={disabled}
//         />
//       )}
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
//     if (fieldDepends >= howDepend.min && howDepend.max) return formElement;
//   }
// }
