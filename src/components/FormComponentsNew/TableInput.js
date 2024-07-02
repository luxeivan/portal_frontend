import React from 'react'
import { Button, Form, Input, InputNumber, message, Space, Select } from 'antd';

export default function SelectInput({ name = 'name', label = 'Label', disabled = false, placeholder = 'placeholder', required = false, options = [], dependOf = false, howDepend = false, fields = [] }) {
    const form = Form.useFormInstance();
    // console.log(dependOf)
    const fieldDepends = Form.useWatch(dependOf, form);
    const formElement = (
        <Form.List name={name}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            {claim.Fields?.sort((a, b) => a.lineNum - b.lineNum).map((item, index) => {
                                if (item.component_Type.includes("ComponentsDivider"))
                                    return <DividerForm key={index} {...item.component_Expanded} label={item.label} />
                                if (item.component_Type.includes("ComponentsTextInput"))
                                    return <TextInput key={index} label={item.label} {...item.component_Expanded} {...item} name={item.name.Ref_Key} dependOf={item.dependName.Ref_Key} howDepend={item.dependСondition} />
                                if (item.component_Type.includes("ComponentsSliderInput"))
                                    return <SliderInput key={index} label={item.label} {...item.component_Expanded} {...item} name={item.name.Ref_Key} dependOf={item.dependName.Ref_Key} howDepend={item.dependСondition} />
                                if (item.component_Type.includes("ComponentsLinkInput"))
                                    return <SelectInput key={index} label={item.label} {...item.component_Expanded} {...item} name={item.name.Ref_Key} dependOf={item.dependName.Ref_Key} howDepend={item.dependСondition} />
                            })}
                            <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Добавить
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
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
