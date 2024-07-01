import React from 'react'
import { Button, Form, Input, InputNumber, message, Space } from 'antd';

export default function TextInput({ name = 'name', label = 'Label', disabled = false, placeholder = 'Пример', required = false, dependOf = false, howDepend = false }) {
    const form = Form.useFormInstance()
    const fieldDepends = Form.useWatch(dependOf, form)
    // console.log(howDepend)
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
            <Input placeholder={placeholder} disabled={disabled} />
        </Form.Item>
    )
    if (!dependOf) return formElement
    if (dependOf && howDepend && howDepend.values.length > 0) {
        let show = false
        howDepend.values.forEach(item => {
            if (item.value === "true") item.value = true
            if (item.value == fieldDepends) show = true
        })
        if (show) return formElement
    }
    if (dependOf && howDepend && howDepend.min && howDepend.max) {
        if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max) return formElement
    }
}
