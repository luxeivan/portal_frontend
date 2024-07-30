import React, { useState, useEffect, useCallback } from "react";
import { AutoComplete, Form } from "antd";
import debounce from "lodash/debounce";
import axios from "axios";
const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

const AddressInput = ({
  name = "name",
  label = "Label",
  disabled = false,
  placeholder = "placeholder",
  required = false,
  depend = false,
  min = 0,
  max = 100,
  step = 1,
  bound = false,
  locations = false,
}) => {
  const form = Form.useFormInstance();
  const fieldDepends = Form.useWatch(depend && depend.field, form);
  const [options, setOptions] = useState([]);

  const fetchSuggestions = debounce((text) => {
    axios
      .get(`${backServer}/getDaData`, {
        params: {
          type: "АдресПолный",
          query: text,
          from_bound: bound,
          to_bound: bound,
          locations: locations,
        },
      })
      .then((response) => {
        console.log("Ответ с бэкенда:", response.data);
        setOptions(
          response.data.map((item) => ({
            value: item.value,
            label: item.value,
          }))
        );
      })
      .catch((error) => {
        console.error("Ошибка запроса к бэкенду:", error);
        setOptions([]);
      });
  }, 500);

  const onSelect = (data) => {
    console.log("Адрес выбран:", data);
    setOptions([]);
  };

  return (
    <Form.Item
      name={name}
      label={label}
      rules={
        !(depend && !(depend.value == fieldDepends)) && [
          {
            required: required,
            message: "Это поле обязательное",
          },
        ]
      }
      hidden={depend && !(depend.value == fieldDepends)}
    >
      <AutoComplete
        options={options}
        onSelect={onSelect}
        onSearch={(text) => fetchSuggestions(text)}
        placeholder={placeholder}
        disabled={disabled}
      />
    </Form.Item>
  );
};

export default AddressInput;

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
