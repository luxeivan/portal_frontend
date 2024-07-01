import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, message, Space, Col, Row, Slider, Flex } from 'antd';

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
        <Flex align='center' gap={10}>
            
                    <Form.Item
                        name={name}
                        label={label}
                        rules={[
                            {
                                required: required,
                                message: 'Это поле обязательное'
                            }
                        ]}
                        initialValue={min}
                    >
                        <InputNumber
                            controls={false}
                            precision={2}
                            min={min}
                            max={max}
                            step={step}
                            value={inputValue}
                            onChange={onChange}
                            disabled={disabled}
                        />
                    </Form.Item>
                
                    <Slider
                    style={{flex:1}}
                        min={min}
                        max={max}
                        onChange={onChange}
                        value={typeof inputValue === 'number' ? inputValue : 0}
                        step={step}
                        disabled={disabled}
                    />
                
        </Flex>
    )
}
