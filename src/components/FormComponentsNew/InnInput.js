import React, { useState } from 'react'
import { AutoComplete, Form, Button, Flex } from "antd";
import debounce from "lodash/debounce";
import axios from "axios";

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

export default function InnInput({
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
    properties = false,
    inGroup = false
}) {
    const form = Form.useFormInstance();
    let fieldDepends = Form.useWatch(dependOf, form);
    const [options, setOptions] = useState([])
    const objProperties = JSON.parse(properties)


    const fetchSuggestions = debounce((inn) => {
        const params = { type: "ИНН", query: inn };
        axios
            .get(`${backServer}/api/cabinet/getDaData`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
                withCredentials: true,
                params
            })
            .then((response) => {
                if (response.data && response.data.data) {
                    console.log(response.data.data)
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

    const onSelect = (value) => {
        const currentData = options.find(item => item.value === value)

        for (var key in objProperties) {
            if (objProperties.hasOwnProperty(key) && typeof objProperties[key] !== 'function') {
                // properties.push(key);
                const arrKey = key.split('.');
                let value = arrKey.reduce((nestedObj, key) => (nestedObj || {})[key], currentData);
                console.log('value', value)
                form.setFieldValue(inGroup ? [name[0], objProperties[key]] : objProperties[key], value)
                console.log('objProperties[key]', objProperties[key])
            }
        }

        // let keys = ['depthOne', 'depthTwo', 'depthThree'];

        form.setFieldValue(name, currentData.data.inn)
        // console.log(value)
    }
    return (
        <Form.Item
            name={name}
            label={label}
            rules={[{ required: required, message: "Это поле обязательное" }]}
            style={{ flex: 1, minWidth: 300, marginRight: "20px" }}
        >
            <AutoComplete
                options={options}
                onSelect={(value, option) => onSelect(value, option)}
                onSearch={(text) => fetchSuggestions(text, "АдресПолный")}
                placeholder={placeholder}
            />
        </Form.Item>
    )
}
