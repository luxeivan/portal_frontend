import React, { useState } from "react";
import { AutoComplete, Form } from "antd";
import debounce from "lodash/debounce";
import axios from "axios";
import fieldConfig from "./AddressInput.json";

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

const AddressInput = ({
  name = "name",
  label = "Label",
  disabled = false,
  placeholder = "Введите полный адрес или его части",
  required = false,
  depend = false,
}) => {
  const form = Form.useFormInstance();
  const fieldDepends = Form.useWatch(depend && depend.field, form);
  const [options, setOptions] = useState([]);
  const [address, setAddress] = useState({});

  // Функция для получения предложений по тексту
  const fetchSuggestions = debounce((text, type) => {
    const params = { type, query: text };

    if (type !== "Страна" && address.country)
      params.locations = [{ country_iso_code: address.country }];
    if (type !== "Регион" && address.region)
      params.locations = [{ region_fias_id: address.region }];
    if (type !== "Город" && address.city)
      params.locations = [{ city_fias_id: address.city }];

    axios
      .get(`${backServer}/getDaData`, { params })
      .then((response) => {
        if (response.data && response.data.data) {
          setOptions(
            response.data.data.map((item) => ({
              value: item.value,
              data: item.data,
            }))
          );
        } else {
          setOptions([]);
        }
      })
      .catch((error) => {
        console.error("Ошибка запроса к бэкенду:", error);
        setOptions([]);
      });
  }, 500);

  // Функция для обновления адреса
  const updateAddress = (newData) => {
    const newAddress = {
      country: newData.country || address.country,
      region: newData.region || address.region,
      city: newData.city || address.city,
      area: newData.area || address.area,
      street: newData.street || address.street,
    };
    setAddress(newAddress);

    form.setFieldsValue({
      country: newData.country || form.getFieldValue("country"),
      region: newData.region || form.getFieldValue("region"),
      city: newData.city || form.getFieldValue("city"),
      area: newData.area || form.getFieldValue("area"),
      street: newData.street || form.getFieldValue("street"),
      [name]: `${newData.country || ""} ${newData.region || ""} ${
        newData.city || ""
      } ${newData.area || ""} ${newData.street || ""}`.trim(),
    });
  };

  // Обработка выбора из списка предложений
  const onSelect = (data, option) => {
    updateAddress(option.data);
    setOptions([]);
  };

  // Обработка изменения в отдельных полях
  // const handleFieldChange = (value, field) => {
  //   const newData = { [field]: value };
  //   setAddress((prevAddress) => ({ ...prevAddress, [field]: value }));
  //   if (value) {
  //     fetchSuggestions(value, field);
  //     updateAddress(newData);
  //   }
  // };

  return (
    <>
      {/* Поле для полного адреса */}
      <Form.Item
        name={name}
        label={label}
        rules={[{ required, message: "Это поле обязательное" }]}
        hidden={depend && !(depend.value == fieldDepends)}
      >
        <AutoComplete
          options={options}
          onSelect={(value, option) => onSelect(value, option)}
          onSearch={(text) => fetchSuggestions(text, "АдресПолный")}
          placeholder={placeholder}
          disabled={disabled}
        />
      </Form.Item>
      {/* Поля для отдельных частей адреса */}
      {fieldConfig.map((field) => (
        <Form.Item name={field.name} label={field.label} key={field.name}>
          <AutoComplete
            onSelect={(value, option) => onSelect(value, option)}
            onSearch={(text) => fetchSuggestions(text, field.type)}
            options={options}
          />
        </Form.Item>
      ))}
    </>
  );
};

export default AddressInput;

// import React, { useState, useEffect, useCallback } from "react";
// import { AutoComplete, Form } from "antd";
// import debounce from "lodash/debounce";
// import axios from "axios";
// const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

// const AddressInput = ({
//   name = "name",
//   label = "Label",
//   disabled = false,
//   placeholder = "Введите полный адрес или его части",
//   required = false,
//   depend = false,
// }) => {
//   const form = Form.useFormInstance();
//   const fieldDepends = Form.useWatch(depend && depend.field, form);
//   const [options, setOptions] = useState([]);
//   const [address, setAddress] = useState({});

//   const fetchSuggestions = debounce((text, type) => {
//     const params = {
//       type,
//       query: text,
//     };

//     if (type !== "Страна" && address.country)
//       params.locations = [{ country_iso_code: address.country }];
//     if (type !== "Регион" && address.region)
//       params.locations = [{ region_fias_id: address.region }];
//     if (type !== "Город" && address.city)
//       params.locations = [{ city_fias_id: address.city }];

//     axios
//       .get(`${backServer}/getDaData`, { params })
//       .then((response) => {
//         console.log("Ответ с бэкенда:", response.data);
//         if (response.data && response.data.data) {
//           setOptions(
//             response.data.data.map((item) => ({
//               value: item.value,
//               data: item.data,
//             }))
//           );
//         } else {
//           setOptions([]);
//         }
//       })
//       .catch((error) => {
//         console.error("Ошибка запроса к бэкенду:", error);
//         setOptions([]);
//       });
//   }, 500);

//   const updateAddress = (newData) => {
//     const newAddress = {
//       country: newData.country || address.country,
//       region: newData.region || address.region,
//       city: newData.city || address.city,
//       area: newData.area || address.area,
//       street: newData.street || address.street,
//     };
//     setAddress(newAddress);

//     form.setFieldsValue({
//       country: newData.country || form.getFieldValue("country"),
//       region: newData.region || form.getFieldValue("region"),
//       city: newData.city || form.getFieldValue("city"),
//       area: newData.area || form.getFieldValue("area"),
//       street: newData.street || form.getFieldValue("street"),
//       [name]: `${newData.country || ""} ${newData.region || ""} ${
//         newData.city || ""
//       } ${newData.area || ""} ${newData.street || ""}`.trim(),
//     });
//   };

//   const onSelect = (data, option) => {
//     console.log("Адрес выбран:", data);
//     updateAddress(option.data);
//     setOptions([]);
//   };

//   const handleFieldChange = (value, field) => {
//     const newData = { [field]: value };
//     setAddress((prevAddress) => ({ ...prevAddress, [field]: value }));
//     if (value) {
//       fetchSuggestions(value, field);
//       updateAddress(newData);
//     }
//   };

//   return (
//     <>
//       <Form.Item
//         name={name}
//         label={label}
//         rules={[
//           {
//             required: required,
//             message: "Это поле обязательное",
//           },
//         ]}
//         hidden={depend && !(depend.value == fieldDepends)}
//       >
//         <AutoComplete
//           options={options}
//           onSelect={(value, option) => onSelect(value, option)}
//           onSearch={(text) => fetchSuggestions(text, "АдресПолный")}
//           placeholder={placeholder}
//           disabled={disabled}
//         />
//       </Form.Item>
//       <Form.Item name="country" label="Страна">
//         <AutoComplete
//           onSelect={(value) => handleFieldChange(value, "country")}
//           onSearch={(text) => fetchSuggestions(text, "Страна")}
//           options={options}
//         />
//       </Form.Item>
//       <Form.Item name="region" label="Регион">
//         <AutoComplete
//           onSelect={(value) => handleFieldChange(value, "region")}
//           onSearch={(text) => fetchSuggestions(text, "Регион")}
//           options={options}
//         />
//       </Form.Item>
//       <Form.Item name="city" label="Город">
//         <AutoComplete
//           onSelect={(value) => handleFieldChange(value, "city")}
//           onSearch={(text) => fetchSuggestions(text, "Город")}
//           options={options}
//         />
//       </Form.Item>
//       <Form.Item name="area" label="Район">
//         <AutoComplete
//           onSelect={(value) => handleFieldChange(value, "area")}
//           onSearch={(text) => fetchSuggestions(text, "Район")}
//           options={options}
//         />
//       </Form.Item>
//       <Form.Item name="street" label="Улица">
//         <AutoComplete
//           onSelect={(value) => handleFieldChange(value, "street")}
//           onSearch={(text) => fetchSuggestions(text, "Улица")}
//           options={options}
//         />
//       </Form.Item>
//     </>
//   );
// };

// export default AddressInput;

// import React, { useState } from 'react'
// import { debounce } from "lodash";
// import { Button, Form, Input, InputNumber, message, Space, Col, Row, Slider, AutoComplete } from 'antd';

// const token = process.env.REACT_APP_DADATA_TOKEN

// export default function AddressInput({ name = 'name', label = 'Label', disabled = false, placeholder = 'placeholder', required = false, depend = false, min = 0, max = 100, step = 1, bound = false, locations = false }) {
//     const form = Form.useFormInstance()
//     const fieldDepends = Form.useWatch(depend && depend.field, form)
//     const [options, setOptions] = useState([]);

//     const url = "http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
//     // const query = "москва";
//     // console.log(token)

//     const getFiasValue = debounce((text) => {
//         let locationTemp = undefined
//         if(locations){
//             locationTemp = {}
//             locations.forEach(location=>{
//                 locationTemp[location.type] = form.getFieldValue(location.field)
//             })
//         }
//         const optionsPost = {
//             method: "POST",
//             mode: "cors",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json",
//                 "Authorization": "Token " + token
//             },
//             body: JSON.stringify({
//                 query: text,
//                 from_bound: { value: bound },
//                 to_bound: { value: bound },
//                 locations: locationTemp
//             })
//         }
// console.log(optionsPost.body)
//         fetch(url, optionsPost)
//             .then(response => response.json())
//             .then(result => {
//                 console.log(result)
//                 setOptions(result.suggestions?.map(item => ({ value: item.data[bound], label: item.value })))
//             })
//             .catch(error => console.log("error", error));

//     }, 500)

//     const onSelect = (data) => {
//         console.log('onSelect', data);
//         setOptions([])
//     };
//     return (
//         <Form.Item
//             name={name}
//             label={label}
//             rules={!(depend && !(depend.value == fieldDepends)) && [
//                 {
//                     required: required,
//                     message: 'Это поле обязательное'
//                 }
//             ]}
//             hidden={depend && !(depend.value == fieldDepends)}
//         >
//             <AutoComplete
//                 options={options}
//                 onSelect={onSelect}
//                 onSearch={(text) => getFiasValue(text)}
//                 placeholder={placeholder}
//                 disabled={disabled}
//             />
//         </Form.Item>
//     )
// }
