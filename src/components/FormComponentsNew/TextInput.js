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
  const fieldDepends = Form.useWatch(dependOf, form);

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

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 800),
    []
  );

  useEffect(() => {
    if (
      [
        "Фамилия",
        "Имя",
        "Отчество",
        "ИНН",
        "Страна",
        "Регион",
        "Город",
        "Улица",
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
  if (dependOf && howDepend && howDepend.values.length > 0) {
    let show = false;
    howDepend.values.forEach((item) => {
      if (item.value === "true") item.value = true;
      if (item.value == fieldDepends) show = true;
    });
    if (show) return formElement;
  }
  if (dependOf && howDepend && howDepend.min && howDepend.max) {
    if (fieldDepends >= howDepend.min && howDepend.max) return formElement;
  }
}

// import { Form, theme, Input, AutoComplete } from "antd";
// import { useState, useEffect } from "react";
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

//   useEffect(() => {
//     if (["Фамилия", "Имя", "Отчество", "ИНН"].includes(type) && value) {
//       const fetchSuggestions = async () => {
//         try {
//           const response = await axios.get(`${backServer}/getDaData`, {
//             params: {
//               type,
//               query: value,
//             },
//           });
//           setSuggestions(
//             response.data.data.map((suggestion) => suggestion.value)
//           );
//         } catch (error) {
//           console.error("Error fetching suggestions:", error);
//         }
//       };

//       const debounceFetch = setTimeout(fetchSuggestions, 300);
//       return () => clearTimeout(debounceFetch);
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
//         "Электронный адрес"
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
