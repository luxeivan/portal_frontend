import React from 'react'
import { Button, Form, Input, InputNumber, message, Space, Select } from 'antd';
import TextInput from '../../components/FormComponentsNew/TextInput'
import NumberInput from '../../components/FormComponentsNew/NumberInput'
import SliderInput from '../../components/FormComponentsNew/SliderInput'
import SelectInput from '../../components/FormComponentsNew/SelectInput'
import DividerForm from '../../components/FormComponentsNew/DividerForm'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default function TableInput({ name = 'name', label = 'Label', disabled = false, placeholder = 'placeholder', required = false, options = [], dependOf = false, howDepend = false, Fields = [] }) {
    const form = Form.useFormInstance();
    // console.log(dependOf)
    // const nameTable = name
    const fieldDepends = Form.useWatch(dependOf, form);
    const formElement = (
        <Form.List name={name}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8, alignItems: "center", padding: 10 }} align="baseline">
                            {Fields.map((item, index) => {
                                // console.log('name: ', name)
                                // console.log('item.name_Key: ', item.name_Key)
                                // console.log('---------------')
                                if (item.component_Type.includes("ComponentsDivider"))
                                    return <DividerForm key={index} {...item.component_Expanded} label={item.label} />
                                if (item.component_Type.includes("ComponentsTextInput"))
                                    return <TextInput key={index} label={item.label} {...item.component_Expanded} {...item} name={[name, item.name_Key]} dependOf={item.dependName?.Ref_Key} howDepend={item.dependСondition} />
                                if (item.component_Type.includes("ComponentsNumberInput"))
                                    return <NumberInput key={index} label={item.label} {...item.component_Expanded} {...item} name={[name, item.name_Key]} dependOf={item.dependName?.Ref_Key} howDepend={item.dependСondition} />
                                if (item.component_Type.includes("ComponentsSliderInput"))
                                    return <SliderInput key={index} label={item.label} {...item.component_Expanded} {...item} name={[name, item.name_Key]} dependOf={item.dependName?.Ref_Key} howDepend={item.dependСondition} />
                                if (item.component_Type.includes("ComponentsLinkInput"))
                                    return <SelectInput key={index} label={item.label} {...item.component_Expanded} {...item} name={[name, item.name_Key]} dependOf={item.dependName?.Ref_Key} howDepend={item.dependСondition} />
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
            )
            }
        </Form.List >
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
