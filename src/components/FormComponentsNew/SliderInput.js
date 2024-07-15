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
    const marks = {
        0: '0',
        7: '7',
        15: '15',
        
      };
    return (
        // <Flex align='center' gap={10}>
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
                {/* <InputNumber
                            controls={false}
                            precision={2}
                            min={min}
                            max={max}
                            step={step}
                            value={inputValue}
                            onChange={onChange}
                            disabled={disabled}
                            /> */}
                <Slider
                    // style={{ flex: 1 }}
                    marks={marks}
                    min={min}
                    max={max}
                    onChange={onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
                    step={step}
                    // disabled={disabled}
                    tooltip={{ open: true }}
                />
            </Form.Item>


        // </Flex>
    )
}
