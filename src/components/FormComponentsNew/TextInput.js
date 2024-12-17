import { Form, theme, Input, AutoComplete } from "antd";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import axios from "axios";
import WrapperComponent from "./WrapperComponent";
import InfoDrawer from "../InfoDrawer";
import useServices from "../../stores/useServices";
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
  const { token } = theme.useToken();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Состояние для подсказок
  const form = Form.useFormInstance();
  // let fieldDepends = Form.useWatch(dependOf, form);
  const locations = {}
  if (serviceItem?.externalService?.DaData[name]?.in) {
    const dependencies = serviceItem.externalService.DaData[name].in
    const objDep = Object.entries(dependencies).map(item => ({
      value: form.getFieldValue(item[0]),
      key: item[1].split('.')[item[1].split('.').length - 1]
    }));
    objDep.forEach(item => { 
      if(item.value) locations[item.key] = item.value 
    })
    console.log(locations);
    console.log(dependencies);
  }

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
              locations: [locations]
            },
          }
        );
        console.log(response.data.data);
        
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
    <Form.Item
      name={name}
      label={fullDescription ? <InfoDrawer fullDescription={fullDescription}>{label}</InfoDrawer> : label}
      rules={formItemRules}
      initialValue={defaultValue}
    >
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
      label={fullDescription ? <InfoDrawer fullDescription={fullDescription}>{label}</InfoDrawer> : label}
      rules={[
        ...formItemRules,
        {
          type: "email",
          message: "Это поле в формате Email",
        },
      ]}
      initialValue={defaultValue}
    >
      <Input
        placeholder={placeholder}
        maxLength={length || undefined} // Убираем `false`, если `length` не задано
        disabled={disabled}
      />
    </Form.Item>
  );
  // console.log(`${label} - ${type}: ${defaultValue}`)
  const simpleInput = (
    <Form.Item
      name={name}
      label={fullDescription ? <InfoDrawer fullDescription={fullDescription}>{label}</InfoDrawer> : label}
      rules={formItemRules}
      initialValue={defaultValue}
    >
      <Input.TextArea
        placeholder={placeholder}
        maxLength={length || undefined} // Убираем `false`, если `length` не задано
        disabled={disabled}
        autoSize={{ minRows: 1, maxRows: 4 }}
      />
    </Form.Item>
  );

  let formElement = simpleInput;
  if (listTypeForDadata.includes(type)) formElement = autoComplete;
  if (type === "ЭлектронныйАдрес") formElement = email;

  return <WrapperComponent span={span} stylesField_key={stylesField_key} dependOf={dependOf} howDepend={howDepend} name={name}>{formElement}</WrapperComponent>

}