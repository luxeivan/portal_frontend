import { Form, Input, AutoComplete } from "antd";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import axios from "axios";

import WrapperComponent from "./WrapperComponent";
import InfoDrawer from "../InfoDrawer";
import useServices from "../../stores/useServices";
import useProfile from "../../stores/Cabinet/useProfile";

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
];

export default function TextInput({
  name = "name",
  label = "",
  disabled = false,
  placeholder = "",
  defaultValue = "",
  required = false,
  dependOf = false,
  howDepend = false,
  inputMask = false,
  length = false,
  specialField: type = false,
  span = false,
  fullDescription = false,
  stylesField_key = false,
}) {
  const serviceItem = useServices((state) => state.serviceItem);

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const form = Form.useFormInstance();

  const { profile } = useProfile();
  const emailFromProfile = profile.email || "";

  // Основная функция для получения подсказок от DaData
  // const fetchSuggestions = async (searchText) => {
  //   if (searchText) {
  //     try {
  //       const params = { type, query: searchText };

  //       // Если это поле "Улица" или "Город", добавляем зависимости от страны, региона и города
  //       if (type === "Улица" || type === "Город") {
  //         // Получаем значения страны и региона из формы (или используем значения по умолчанию)
  //         const country = form.getFieldValue("Страна") || "Россия";
  //         const region = form.getFieldValue("Регион") || "Московская";

  //         // Если это улица, добавляем fias_id города (если он есть)
  //         const cityFias = form.getFieldValue("cityFiasHidden");

  //         // Формируем объект locations для запроса к DaData
  //         params.locations = [{ country, region }];
  //         if (type === "Улица" && cityFias) {
  //           params.locations[0].fias_id = cityFias; // Добавляем fias_id города для улиц
  //         }
  //       }

  //       // Добавляем логику для поиска районов по выбранному региону
  //       if (type === "Район") {
  //         // Получаем значения страны и региона из формы
  //         const country = form.getFieldValue("Страна") || "Россия";
  //         const region = form.getFieldValue("Регион") || "Московская";

  //         // Формируем объект locations для фильтрации районов по стране и региону
  //         params.locations = [{ country, region }];
  //       }

  //       // Делаем запрос к серверу для получения подсказок
  //       const response = await axios.get(
  //         `${backServer}/api/cabinet/getDaData`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //           },
  //           withCredentials: true,
  //           params,
  //         }
  //       );

  //       // Преобразуем ответ в формат, подходящий для AutoComplete
  //       setSuggestions(
  //         response.data.data.map((suggestion) => ({
  //           label: suggestion.value,
  //           value: suggestion.value,
  //           fiasId: suggestion.data?.fias_id, // Сохраняем fias_id для городов
  //         }))
  //       );
  //     } catch (error) {
  //       console.error("Error fetching suggestions:", error);
  //     }
  //   } else {
  //     setSuggestions([]); // Если поисковой запрос пустой, очищаем подсказки
  //   }
  // };
  

const fetchSuggestions = async (searchText) => {
  if (searchText) {
    console.log(name)
    console.log(JSON.parse(serviceItem.properties)?.externalService?.DaData)
    try {
      const params = { type, query: searchText };

      // Если это поле "Улица" или "Город", добавляем зависимости от страны, региона и города
      if (type === "Улица" || type === "Город") {
        // Получаем значения страны и региона из формы (или используем значения по умолчанию)
        const country = form.getFieldValue("Страна") || "Россия";
        const region = form.getFieldValue("Регион") || "Московская";

        // Если это улица, добавляем fias_id города (если он есть)
        const cityFias = form.getFieldValue("cityFiasHidden");

        // Формируем объект locations для запроса к DaData
        params.locations = [{ country, region }];
        if (type === "Улица" && cityFias) {
          params.locations[0].fias_id = cityFias; // Добавляем fias_id города для улиц
        }
      }

      // Делаем запрос к серверу для получения подсказок
      const response = await axios.get(
        `${backServer}/api/cabinet/getDaData`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          withCredentials: true,
          params,
        }
      );

      // Преобразуем ответ в формат, подходящий для AutoComplete
      setSuggestions(
        response.data.data.map((suggestion) => ({
          label: suggestion.value,
          value: suggestion.value,
          fiasId: suggestion.data?.fias_id, // Сохраняем fias_id для городов
        }))
      );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  } else {
    setSuggestions([]); // Если поисковой запрос пустой, очищаем подсказки
  }
};

// Используем debounce для оптимизации запросов к DaData
const debouncedFetchSuggestions = useCallback(
  debounce(fetchSuggestions, 500),
  []
);

// Вызываем debouncedFetchSuggestions при изменении значения или типа поля
useEffect(() => {
  if (listTypeForDadata.includes(type)) {
    debouncedFetchSuggestions(value);
  } else {
    setSuggestions([]);
  }
}, [value, type]);

// Обработчик выбора значения в AutoComplete
const onSelect = (val, opt) => {
  setValue(val); // Устанавливаем выбранное значение
  if (type === "Город" && opt?.fiasId) {
    // Если выбрали город, сохраняем его fias_id в скрытое поле
    form.setFieldValue("cityFiasHidden", opt.fiasId);
  }
};

// Обработчик изменения значения в поле ввода
const handlerOnChange = (value) => {
  setValue(value); // Обновляем состояние значения
};

// Общий шаблон для правил валидации полей
const formItemRules = [
  {
    required: required,
    message: "Это поле обязательное",
  },
];

// Рендерим AutoComplete для полей, связанных с DaData
const autoComplete = (
  <Form.Item
    name={name}
    label={
      fullDescription ? (
        <InfoDrawer fullDescription={fullDescription}>{label}</InfoDrawer>
      ) : (
        label
      )
    }
    rules={formItemRules}
    initialValue={defaultValue}
  >
    <AutoComplete
      options={suggestions} // Подсказки от DaData
      onChange={handlerOnChange} // Обработчик изменения значения
      onSelect={onSelect} // Обработчик выбора значения
      value={value} // Текущее значение
      placeholder={placeholder}
      disabled={disabled}
      maxLength={length || undefined}
    />
  </Form.Item>
);

// Рендерим обычное поле ввода для email
const email = (
  <Form.Item
    name={name}
    label={
      fullDescription ? (
        <InfoDrawer fullDescription={fullDescription}>{label}</InfoDrawer>
      ) : (
        label
      )
    }
    rules={[
      ...formItemRules,
      {
        type: "email",
        message: "Это поле в формате Email",
      },
    ]}
    initialValue={emailFromProfile}
  >
    <Input placeholder={placeholder} maxLength={length || undefined} />
  </Form.Item>
);

// Рендерим текстовое поле для остальных случаев
const simpleInput = (
  <Form.Item
    name={name}
    label={
      fullDescription ? (
        <InfoDrawer fullDescription={fullDescription}>{label}</InfoDrawer>
      ) : (
        label
      )
    }
    rules={formItemRules}
    initialValue={defaultValue}
  >
    <Input.TextArea
      placeholder={placeholder}
      maxLength={length || undefined}
      disabled={disabled}
      autoSize={{ minRows: 1, maxRows: 4 }}
    />
  </Form.Item>
);

// Выбираем, какой компонент рендерить в зависимости от типа поля
let formElement = simpleInput;
if (listTypeForDadata.includes(type)) formElement = autoComplete;
if (type === "ЭлектронныйАдрес") formElement = email;

return (
  <WrapperComponent
    span={span}
    stylesField_key={stylesField_key}
    dependOf={dependOf}
    howDepend={howDepend}
    name={name}
  >
    {formElement}
  </WrapperComponent>
);
}

// import { Form, Input, AutoComplete } from "antd";
// import { useState, useEffect, useCallback } from "react";
// import { debounce } from "lodash";
// import axios from "axios";

// import WrapperComponent from "./WrapperComponent";
// import InfoDrawer from "../InfoDrawer";
// import useServices from "../../stores/useServices";
// import useProfile from "../../stores/Cabinet/useProfile";

// const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

// // Условимся: для автокомплита DaData достаточно двух типов: "Город" и "Улица"
// // (если у вас ещё "Страна" и т.д., просто расширьте проверку).
// const isDaDataType = (type) =>
//   [
//     "Фамилия",
//     "Имя",
//     "Отчество",
//     "АдресПолный",
//     "Страна",
//     "Регион",
//     "Город",
//     "Улица",
//     "Район",
//   ].includes(type);

// export default function TextInput(props) {
//   const {
//     name = "name",
//     label = "",
//     specialField: type = "", // "Город" или "Улица"
//     required = false,
//     placeholder = "",
//     disabled = false,
//     length = false,
//     span = false,
//     ...rest
//   } = props;

//   const form = Form.useFormInstance();
//   const [value, setValue] = useState("");
//   const [suggestions, setSuggestions] = useState([]);

//   // Запрос к бэку getDaData. Добавляем fias_id, если поле "Улица"
//   const fetchSuggestions = async (query) => {
//     if (!query) return setSuggestions([]);
//     try {
//       const params = { type, query };
//       // Если улица — добавляем fias_id из скрытого поля:
//       if (type === "Улица") {
//         const cityFias = form.getFieldValue("cityFiasHidden");
//         if (cityFias) {
//           params.locations = [{ fias_id: cityFias }];
//         }
//       }
//       const res = await axios.get(`${backServer}/api/cabinet/getDaData`, {
//         params,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//       });
//       setSuggestions(res.data?.data || []);
//     } catch (e) {
//       console.error("fetchSuggestions error:", e);
//       setSuggestions([]);
//     }
//   };

//   const debouncedFetch = useCallback(debounce(fetchSuggestions, 400), []);

//   useEffect(() => {
//     if (isDaDataType(type)) debouncedFetch(value);
//     else setSuggestions([]);
//   }, [value]);

//   // onSelect — если "Город", сохраняем fias_id в hidden-поле
//   const onSelect = (val, opt) => {
//     setValue(val);
//     if (type === "Город" && opt?.fiasId) {
//       // Запомним fiasId в поле "cityFiasHidden" (вы обязаны создать это поле в своей форме)
//       form.setFieldValue("cityFiasHidden", opt.fiasId);
//     }
//   };

//   return (
//     <WrapperComponent span={span} name={name} {...rest}>
//       <Form.Item
//         name={name}
//         label={label}
//         rules={[{ required, message: "Обязательное поле" }]}
//       >
//         {isDaDataType(type) ? (
//           <AutoComplete
//             options={suggestions.map((s) => ({
//               label: s.value,
//               value: s.value,
//               fiasId: s.data?.fias_id,
//             }))}
//             onChange={setValue}
//             onSelect={onSelect}
//             value={value}
//             placeholder={placeholder}
//             disabled={disabled}
//             maxLength={length || undefined}
//           />
//         ) : (
//           <Input
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//             placeholder={placeholder}
//             disabled={disabled}
//             maxLength={length || undefined}
//           />
//         )}
//       </Form.Item>
//     </WrapperComponent>
//   );
// }

//
