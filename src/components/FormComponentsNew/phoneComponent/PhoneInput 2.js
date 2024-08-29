import React from 'react'
import { Button, Form, Input, InputNumber, message, Space, Switch,theme } from 'antd';
import ReactInputMask from 'react-input-mask';
import styles from './Phone.module.css'

export default function PhoneInput({ name = 'name', label = 'Label', disabled = false, placeholder = 'placeholder', required = false, dependOf = false, howDepend = false }) {
    const { colorBorderBg, colorText,colorBorder } = theme.useToken().token;
    console.log(theme.useToken().token)
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
        >
            <ReactInputMask
                mask="+7 (999) 999-99-99"
                placeholder="+7 (XXX) XXX-XX-XX"
                className={`ant-input ant-input-outlined ant-input-status-success ${styles.inputMask}`}
                style={{ backgroundColor: colorBorderBg, color: colorText, border:`1px solid ${colorBorder}` }}
            />
        </Form.Item>
    )

    if (!dependOf) return formElement
    if (dependOf && howDepend && howDepend.options?.length > 0) {
        let show = false
        if (typeof fieldDepends === "undefined") fieldDepends = false
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
