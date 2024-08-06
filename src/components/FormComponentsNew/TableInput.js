import React from 'react'
import { Button, Form, Input, InputNumber, message, Space, Select, Flex } from 'antd';
import TextInput from '../../components/FormComponentsNew/TextInput'
import NumberInput from '../../components/FormComponentsNew/NumberInput'
import SliderInput from '../../components/FormComponentsNew/SliderInput'
import SelectInput from '../../components/FormComponentsNew/SelectInput'
import DateInput from '../../components/FormComponentsNew/DateInput'
import DividerForm from '../../components/FormComponentsNew/DividerForm'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SwitchInput from './SwitchInput';

export default function TableInput({ name = 'name', label = 'Label', disabled = false, placeholder = 'placeholder', required = false, options = [], dependOf = false, howDepend = false, fields: Fields = [] }) {
    const form = Form.useFormInstance();
    // console.log(dependOf)
    const nameTable = name
    const fieldDepends = Form.useWatch(dependOf, form);
    const formElement = (
        <Form.List name={name}>
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, }) => (
                        <Flex key={key}
                            gap={10}
                            wrap={true}
                            style={{ border: "1px solid lightgray", borderRadius: "10px", padding: "10px", margin: "5px" }}
                            // style={{ display: 'flex', marginBottom: 8, alignItems: "center", padding: 10 }} 
                            align="baseline">
                            {Fields.map((item, index) => {
                                // console.log('name: ', name)
                                // console.log('item.name_Key: ', item.name_Key)
                                // console.log('---------------')
                                if (item.component_Type.includes("Divider"))
                                    return <DividerForm key={index} {...item.component_Expanded} label={item.label} />
                                if (item.component_Type.includes("TextInput"))
                                    return <TextInput key={index} {...item.component_Expanded} {...item} name={[name, item.idLine]} dependOf={item.dependIdLine ? [name, item.dependIdLine] : false} howDepend={item.dependСondition} />
                                if (item.component_Type.includes("NumberInput"))
                                    return <NumberInput key={index} {...item.component_Expanded} {...item} name={[name, item.idLine]} dependOf={item.dependIdLine ? [name, item.dependIdLine] : false} howDepend={item.dependСondition} />
                                if (item.component_Type.includes("SliderInput"))
                                    return <SliderInput key={index} {...item.component_Expanded} {...item} name={[name, item.idLine]} dependOf={item.dependIdLine ? [name, item.dependIdLine] : false} howDepend={item.dependСondition} />
                                if (item.component_Type.includes("LinkInput")||item.component_Type.includes("EnumInput"))
                                    return <SelectInput key={index} {...item.component_Expanded} {...item} name={[name, item.idLine]} dependOf={item.dependIdLine ? [nameTable, name, item.dependIdLine] : false} howDepend={item.dependСondition} />
                                if (item.component_Type.includes("DateInput"))
                                    return <DateInput key={index} {...item.component_Expanded} {...item} name={[name, item.idLine]} dependOf={item.dependIdLine ? [name, item.dependIdLine] : false} howDepend={item.dependСondition} />
                                if (item.component_Type.includes("SwitchInput"))
                                    return <SwitchInput key={index} {...item.component_Expanded} {...item} name={[name, item.idLine]} dependOf={item.dependIdLine ? [name, item.dependIdLine] : false} howDepend={item.dependСondition} />
                            })}
                            <MinusCircleOutlined onClick={() => remove(name)} />
                        </Flex>
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
