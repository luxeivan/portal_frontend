import React from 'react'
import { Button, Form, Input, InputNumber, message, Space, Select } from 'antd';

export default function SelectInput({ name = 'name', label = 'Label', defaultValue = false, disabled = false, placeholder = 'placeholder', required = false, options = [], dependOf = false, howDepend = false }) {
    const form = Form.useFormInstance();
    // console.log(dependOf)
    let fieldDepends = Form.useWatch(dependOf, form);
    const formElement = (
        <Form.Item
            name={name}
            label={label}
            rules={[
                {
                    required: required,
                    message: 'Это поле обязательное'
                }
            ]}
            style={{flex:1}}
        >
            <Select
                // style={{ width: 120 }}
                options={options}
                // disabled={disabled}
                defaultValue={defaultValue}
            />
        </Form.Item>
    )
    if (!dependOf) return formElement
    if (dependOf && howDepend && howDepend.options?.length > 0) {
        let show = false
        if(typeof fieldDepends === "undefined")  fieldDepends = false 
        howDepend.options.forEach(item => {
            if (item.value === "true") item.value = true
            if (item.value === "false") item.value = false;
            if (item.value == fieldDepends) show = true
        })
        if (show) return formElement
    }
    if (dependOf && howDepend && howDepend.max) {
        // form.setFieldValue(name, '')
        if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max) return formElement
    }
}
