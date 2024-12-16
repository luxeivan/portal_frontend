import React from 'react'
import { Button, Form, theme, Flex, Typography } from 'antd';
import TextInput from '../../components/FormComponentsNew/TextInput'
import NumberInput from '../../components/FormComponentsNew/NumberInput'
import SliderInput from '../../components/FormComponentsNew/SliderInput'
import SelectInput from '../../components/FormComponentsNew/SelectInput'
import DateInput from '../../components/FormComponentsNew/DateInput'
import DividerForm from '../../components/FormComponentsNew/DividerForm'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SwitchInput from './SwitchInput';
import FormulaInput from './FormulaInput';
import PriceInput from './PriceInput';
import PhoneInput from './phoneComponent/PhoneInput';
import styles from './GroupInput.module.css'
import WrapperComponent from './WrapperComponent';

export default function TableInput({
    name = 'name',
    label = 'Поле',
    disabled = false,
    required = false,
    options = [],
    dependOf = false,
    howDepend = false,
    backgroundColorHex = false,
    fields: Fields = [],
    span = false,
    stylesField_key = false
}) {
    const form = Form.useFormInstance();
    // console.log(dependOf)
    const { colorBgBase, colorBorder, colorBgContainer,colorPrimary } = theme.useToken().token
    const nameTable = name
    // let fieldDepends = Form.useWatch(dependOf, form);
    const formElement = (
        <>
            <div style={{
                backgroundColor: colorBgContainer,
                width: "100%",
                color: colorBorder
            }}
                // className={'formElement'}
                className={`formElement ${styles.formElement}`}
            >

                <Typography.Title level={5} style={{ margin: "0 0 10px 0" }}>{label}</Typography.Title>
                <Form.List name={name}>
                    {(fields, { add, remove }) => {
                        // console.log(fields)
                        if (required && fields.length === 0) fields.push({
                            "name": 0,
                            "key": 0,
                            "isListField": true,
                            "fieldKey": 0
                        });
                        return <>
                            {fields.map(({ key, name, }) => (
                                <Flex key={key}
                                    gap={10}
                                    wrap={true}
                                    style={{ border: `1px solid ${colorBorder}`, borderRadius: "10px", padding: "10px 10px 10px 20px", margin: "5px",position:'relative' }}
                                    // style={{ display: 'flex', marginBottom: 8, alignItems: "center", padding: 10 }} 
                                    align="baseline">
                                        <Typography.Text style={{position:'absolute',top:3,left:-12,fontSize:18,fontWeight:700,color:colorBorder}}>{key+1}</Typography.Text>
                                    {/* if (required && fields.length < 1)  */}
                                    {Fields.map((item, index) => {
                                        // console.log('name: ', name)
                                        // console.log('item.name_Key: ', item.name_Key)
                                        // console.log('---------------')
                                        // selectComponent(item)
                                        if (item.component.Ref_Type.includes("Divider"))
                                            return <DividerForm key={index} {...item.component} label={item.label} />
                                        if (item.component.Ref_Type.includes("TextInput") && item.component?.specialField === 'Телефон')
                                            return <PhoneInput key={index} {...item.component} {...item} name={[name, item.idLine]} dependOf={item.dependIdLine ? [name, item.dependIdLine] : false} howDepend={item.dependСondition} />
                                        if (item.component.Ref_Type.includes("TextInput"))
                                            return <TextInput key={index} {...item.component} {...item} name={[name, item.idLine]} dependOf={item.dependIdLine ? [name, item.dependIdLine] : false} howDepend={item.dependСondition} />
                                        if (item.component.Ref_Type.includes("NumberInput"))
                                            return <NumberInput key={index} {...item.component} {...item} name={[name, item.idLine]} dependOf={item.dependIdLine ? [name, item.dependIdLine] : false} howDepend={item.dependСondition} />
                                        if (item.component.Ref_Type.includes("SliderInput"))
                                            return <SliderInput key={index} {...item.component} {...item} name={[name, item.idLine]} dependOf={item.dependIdLine ? [name, item.dependIdLine] : false} howDepend={item.dependСondition} />
                                        if (item.component.Ref_Type.includes("LinkInput") ||
                                            item.component.Ref_Type.includes("EnumInput") ||
                                            item.component.Ref_Type.includes("SelectInput")
                                        )
                                            return <SelectInput key={index} {...item.component} {...item} name={[name, item.idLine]} dependOf={item.dependIdLine ? [nameTable, name, item.dependIdLine] : false} howDepend={item.dependСondition} />
                                        if (item.component.Ref_Type.includes("DateInput"))
                                            return <DateInput key={index} {...item.component} {...item} name={[name, item.idLine]} dependOf={item.dependIdLine ? [name, item.dependIdLine] : false} howDepend={item.dependСondition} />
                                        if (item.component.Ref_Type.includes("SwitchInput"))
                                            return <SwitchInput key={index} {...item.component} {...item} name={[name, item.idLine]} dependOf={item.dependIdLine ? [name, item.dependIdLine] : false} howDepend={item.dependСondition} />
                                        if (item.component.Ref_Type.includes("PriceInput"))
                                            return (
                                                <PriceInput
                                                    key={index}
                                                    {...item.component}
                                                    {...item}
                                                    name={[name, item.idLine]}
                                                    dependOf={item.dependIdLine ? [name, item.dependIdLine] : false}
                                                    howDepend={item.dependСondition}
                                                />
                                            );
                                        if (item.component.Ref_Type.includes("componentsFormula"))
                                            return (
                                                <FormulaInput
                                                    key={index}
                                                    {...item.component}
                                                    {...item}
                                                    name={[name, item.idLine]}
                                                    dependOf={item.dependIdLine ? [name, item.dependIdLine] : false}
                                                    howDepend={item.dependСondition}
                                                />
                                            );
                                    })}
                                    <MinusCircleOutlined onClick={() => remove(name)} style={{position:'absolute',top:7,right:7,fontSize:18,fontWeight:700,color:colorBorder}}/>
                                </Flex>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Добавить
                                </Button>
                            </Form.Item>
                        </>
                    }
                    }
                </Form.List >
            </div>
        </>
    )
    // if (!dependOf) return formElement
    // if (dependOf && howDepend && howDepend.options?.length > 0) {
    //     let show = false
    //     if (typeof fieldDepends === "undefined") fieldDepends = false
    //     howDepend.options.forEach(item => {
    //         if (item.value === "true") item.value = true
    //         if (item.value === "false") item.value = false;
    //         if (item.value == fieldDepends) show = true
    //     })
    //     if (show) return formElement
    // }
    // if (dependOf && howDepend && howDepend.max) {
    //     form.setFieldValue(name, '')
    //     if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max) return formElement
    // }
    return <WrapperComponent span={span} stylesField_key={stylesField_key} dependOf={dependOf} howDepend={howDepend} name={name}>{formElement}</WrapperComponent>
}
