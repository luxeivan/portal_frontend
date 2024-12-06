
import React, { useEffect, useState } from "react";
import {
    Form,
    Input,    
    theme,    
    Flex
} from "antd";
import useTemp from "../../stores/Cabinet/useTemp";
import WrapperComponent from "./WrapperComponent";

function truncated(num, decimalPlaces) {
    let numPowerConverter = Math.pow(10, decimalPlaces);
    return ~~(num * numPowerConverter) / numPowerConverter;
}
export default function TextConcatenation({
    name = "name",
    label = "Поле",
    disabled = false,
    placeholder = "",
    required = false,
    dependOf = false,
    howDepend = false,
    step = 1,
    defaultValue = false,
    properties = false,
    formula = '',
    ractionDigits = 10,
    digits = false,
    valueValidate = false,
    span = false
}) {
    const [auto, setAuto] = useState(true)
    const { colorTextHeading } = theme.useToken().token
    const form = Form.useFormInstance();
    const currency = useTemp((state) => state.currency);
    useEffect(() => {
        autoSend(form.getFieldValue(name))
    }, [auto])
    let objectProp = {}
    if (properties) objectProp = JSON.parse(properties)
    // console.log(name)
    let keys = []
    for (let key in objectProp.formulaDetails) {
        if (objectProp.formulaDetails.hasOwnProperty(key)) {
            keys.push(objectProp.formulaDetails[key]);
        }
    }
    keys = keys.map(item => ([item]))
    // console.log("keys: ",keys)
    const arrFormula = formula.split('+')
    formula = arrFormula.map(item => item.trim().replaceAll("\"", "")).join('')
    // let fieldDepends = Form.useWatch(dependOf, form);
    if (formula === '') return false;

    // let prevValues = {}
    // console.log('TextConcatenation')
    function autoSend(value = '') {
        const values = form.getFieldsValue(keys)
        // const prevTemp = { formula }
        const temp = { formula }
        keys.forEach(item => {
            // prevTemp[item] = prevValues[item] ? prevValues[item] : null
            // prevTemp.formula = prevTemp.formula.replace(item, prevValues[item])
            temp[item] = values[item] ? values[item] : null
            temp.formula = temp.formula.replace(item, values[item])
        })
        // prevTemp.formula = prevTemp.formula.trim().replace(/ +(?= )/g, '')
        temp.formula = temp.formula.trim().replace(/ +(?= )/g, '')

        // console.log("value: ", value);
        // console.log("values: ", values);

        // if (value === '') {
        //     form.setFieldValue(name, temp.formula)
        //     return prevValues = { ...values, value }
        // }
        // if (!prevValues?.value) {
        //     return prevValues = { ...values, value }
        // }
        // prevValues = { ...values, value }
        if (auto) {
            return form.setFieldValue(name, temp.formula)
        }
        if (!auto) {
            return form.setFieldValue(name, value)
        }
        // if (temp.formula === prevTemp.formula) {
        //     // console.log(1212)
        //     setAuto(false)
        //     return form.setFieldValue(name, value)
        // }
        // setAuto(true)
        // return form.setFieldValue(name, temp.formula)
    }
    const formElement = (
        <Flex align="flex-start">

            <Form.Item
                style={{ flex: 1 }}
                name={name}
                label={label}
                dependencies={keys}
                initialValue={''}
                rules={[
                    {
                        required: required,
                    },
                    ({ getFieldsValue, setFieldValue }) => ({
                        validator(pole, value) {
                            autoSend(value)
                            return Promise.resolve();
                        },
                    }),
                ]}

            >
                <Input.TextArea
                    // disabled={auto}
                    // readOnly={auto}
                    // validateTrigger="onBlur"
                    // suffix={objectProp?.currency?.position === "suffix" ? currency[objectProp.currency.idLine] : false}
                    // addonAfter={<div style={{ cursor: "pointer", color: auto ? "green" : "red" }} onClick={() => {
                    //     setAuto(!auto)
                    // }}>{auto ? 'Автоматически' : 'Вручную'}</div>}
                    placeholder={placeholder}
                />
            </Form.Item>
            <div style={{ cursor: "pointer", color: auto ? "green" : "red", padding: 5, paddingTop: 25 }} onClick={() => {
                setAuto(!auto)
            }}>
                {/* <EditOutlined /> */}
                {auto ? 'Автоматически' : 'Вручную'}
            </div>
        </Flex>

    );
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
    //     if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max) return formElement
    // }
    return <WrapperComponent span={span} dependOf={dependOf} howDepend={howDepend} name={name}>{formElement}</WrapperComponent>
}
