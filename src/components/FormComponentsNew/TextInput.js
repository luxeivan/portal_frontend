import { Form, theme, Input, AutoComplete } from "antd";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import axios from "axios";
const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

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
        const response = await axios.get(`${backServer}/getDaData`, {
          params: {
            type,
            query: searchText,
          },
        });
        console.log("DaData response:", response.data);
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
console.log('type',type)
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 500),
    []
  );

  useEffect(() => {
    if (
      [
        "Фамилия",
        "Имя",
        "Отчество",
        "ИНН",
        "АдресПолный",
        "Страна",
        "Регион",
        "Город",
        "Улица",
        "Район",
        "АдресПолный",
      ].includes(type)
    ) {
      debouncedFetchSuggestions(value);
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
      {[
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
      ].includes(type) ? (
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
  if (dependOf && howDepend && howDepend.options?.length > 0) {
    let show = false;
    if(typeof fieldDepends === "undefined")  fieldDepends = false 
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
