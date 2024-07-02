import React from 'react'
import { Button, Form, Input, InputNumber, message, Space, Select } from 'antd';

export default function SelectInput({ name = 'name', label = 'Label', disabled = false, placeholder = 'placeholder', required = false, options = [], dependOf = false, howDepend = false }) {
    const form = Form.useFormInstance();
    // console.log(dependOf)
    const fieldDepends = Form.useWatch(dependOf, form);
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
        >
            <Select
                style={{ width: 120 }}
                options={options}
                disabled={disabled}
            />
        </Form.Item>
    )
    if (!dependOf) return formElement
    if (dependOf && howDepend && howDepend.values?.length > 0) {
        let show = false
        howDepend.values.forEach(item => {
            if (item.value === "true") item.value = true
            if (item.value == fieldDepends) show = true
        })
        if (show) return formElement
    }
    if (dependOf && howDepend && howDepend.max) {
        form.setFieldValue(name, '')
        if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max) return formElement
    }
}
