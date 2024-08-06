import React from 'react'
import { Button, ConfigProvider, DatePicker, Form, Input, InputNumber, message, Space, TimePicker } from 'antd';
import moment from "moment";
import "moment/locale/ru";
import locale from "antd/es/locale/ru_RU";

moment.locale("ru");

export default function DateInput({ name = 'name', part = 'Дата', label = 'Label', disabled = false, placeholder = 'Пример', required = false, dependOf = false, howDepend = false }) {
    const form = Form.useFormInstance()
    const fieldDepends = Form.useWatch(dependOf, form)
    // console.log(name)
    const formElement = (
        <ConfigProvider locale={locale}>

            <Form.Item
                name={name}
                label={label}
                rules={[
                    {
                        required: required,
                        message: 'Это поле обязательное'
                    }
                ]}
            >
                {part === "Дата" &&
                    <DatePicker format={"DD.MM.YYYY"} placeholder={placeholder}  />
                }
                {part === "ДатаВремя" &&
                    <DatePicker format={"DD.MM.YYYY HH:mm"} showTime placeholder={placeholder}  />
                }
                {part === "Время" &&
                    <TimePicker format={"HH:mm"} placeholder={placeholder}  />
                }
            </Form.Item>
        </ConfigProvider>
    )
    if (!dependOf) return formElement
    if (dependOf && howDepend && howDepend.options?.length > 0) {
        let show = false
        howDepend.options.forEach(item => {
            if (item.value === "true") item.value = true
            if (item.value === "false") item.value = false;
            if (item.value == fieldDepends) show = true
        })
        if (show) return formElement
    }
    if (dependOf && howDepend && howDepend.min && howDepend.max) {
        if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max) return formElement
    }
}
