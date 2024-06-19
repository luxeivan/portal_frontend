import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, message, Space, Col, Row, Slider } from 'antd';

export default function SliderInput({ name = 'name', label = 'Label', disabled = false, placeholder = 'placeholder', required = false, depend = false, min = 0, max = 100, step = 1 }) {
    const form = Form.useFormInstance()
    const fieldDepends = Form.useWatch(depend && depend.field, form)
    const [inputValue, setInputValue] = useState(min);
    const onChange = (value) => {
        form.setFieldValue(name, value)
        if (isNaN(value)) {
            return;
        }
        setInputValue(value);
    };
    return (
        <>
            <Form.Item
                name={name}
                label={label}
                rules={!(depend && !(depend.value == fieldDepends)) && [
                    {
                        required: required,
                        message: 'Это поле обязательное'
                    }
                ]}
                hidden={depend && !(depend.value == fieldDepends)}
            >
                <InputNumber
                    min={min}
                    max={max}
                    step={step}
                    value={inputValue}
                    onChange={onChange}
                    disabled={disabled}
                />
            </Form.Item>
            <Row>
                <Col span={4}>
                </Col>
                <Col span={12}>

                    <Slider
                        min={min}
                        max={max}
                        onChange={onChange}
                        value={typeof inputValue === 'number' ? inputValue : 0}
                        step={step}
                        disabled={disabled}
                    />
                </Col>
            </Row>

        </>
    )
}
