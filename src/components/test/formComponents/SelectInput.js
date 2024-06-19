import React from 'react'
import { Button, Form, Input, InputNumber, message, Space, Select } from 'antd';

export default function SelectInput({ name = 'name', label = 'Label', disabled = false, placeholder = 'placeholder', required = false, options = [], depend = false }) {
    const form = Form.useFormInstance();
    const fieldDepends = Form.useWatch(depend && depend.field, form);
    return (
        <Form.Item
            name={name}
            label={label}
            rules={!(depend && !(depend.value == fieldDepends)) && [
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
}
