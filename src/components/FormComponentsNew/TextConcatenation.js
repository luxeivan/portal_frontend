
import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    theme
} from "antd";
import { evaluate } from "mathjs";
import useTemp from "../../stores/Cabinet/useTemp";

function truncated(num, decimalPlaces) {
    let numPowerConverter = Math.pow(10, decimalPlaces);
    return ~~(num * numPowerConverter) / numPowerConverter;
}
export default function TextConcatenation({
    name = "name",
    label = "Label",
    disabled = false,
    placeholder = "placeholder",
    required = false,
    dependOf = false,
    howDepend = false,
    step = 1,
    defaultValue = false,
    properties = false,
    formula = '',
    ractionDigits = 10,
    digits = false,
    valueValidate = false
}) {
    const { colorTextHeading } = theme.useToken().token
    const form = Form.useFormInstance();
    const currency = useTemp((state) => state.currency);
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
    let fieldDepends = Form.useWatch(dependOf, form);
    if (formula === '') return false;

    let prevValues = {}
    // console.log('TextConcatenation')
    const formElement = (
        <Form.Item
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
                        const values = getFieldsValue(keys)
                        const prevTemp = { formula }
                        const temp = { formula }
                        keys.forEach(item => {
                            prevTemp[item] = prevValues[item] ? prevValues[item] : null
                            prevTemp.formula = prevTemp.formula.replace(item, prevValues[item])
                            temp[item] = values[item] ? values[item] : null
                            temp.formula = temp.formula.replace(item, values[item])
                        })
                        prevTemp.formula = prevTemp.formula.trim().replace(/ +(?= )/g, '')
                        temp.formula = temp.formula.trim().replace(/ +(?= )/g, '')

                        console.log("value: ",value);

                        // if (value === '') {
                        //     form.setFieldValue(name, temp.formula)
                        //     return prevValues = { ...values, value }
                        // }
                        // if (!prevValues?.value) {
                        //     return prevValues = { ...values, value }
                        // }
                        prevValues = { ...values, value }
                        if (temp.formula === prevTemp.formula) {
                            console.log(1212)
                            form.setFieldValue(name, value)
                            return Promise.resolve();
                        }
                        form.setFieldValue(name, temp.formula)
                        return Promise.resolve();
                    },
                }),
            ]}
        >
            <Input
                validateTrigger="onBlur"
                suffix={objectProp?.currency?.position === "suffix" ? currency[objectProp.currency.idLine] : false}
                addonAfter={objectProp?.currency?.position === "addonAfter" ? currency[objectProp.currency.idLine] : false}
                placeholder={placeholder}
            />
        </Form.Item>

    );
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
        if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max) return formElement
    }
}
