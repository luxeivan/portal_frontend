
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
    let prevValues = {}
    // Form.useWatch((values) => {
    //     const temp = { formula }        
    //     keys.forEach(item => {
    //         temp[item] = values[item] ? values[item] : null
    //         temp.formula = temp.formula.replace(item, values[item])
    //     })
    //     // if(set.has(1)) return
    //     if (temp.formula !== values[name]) {
    //         console.log("values: ", values)
    //         console.log("prevValues: ", prevValues)
    //         form.setFieldValue(name, temp.formula)
    //     }
    //     // if (prevValues[name] !== values[name]) {
    //     //     form.setFieldValue(name, values[name])
    //     // }
    //     prevValues = values
    //     console.log("formula: ", temp.formula)
    // }, form);
    // Form.useWatch(keys, form)

    let fieldDepends = Form.useWatch(dependOf, form);
    if (formula === '') return false;
    // console.log('TextConcatenation')
    const formElement = (
        <Form.Item
            name={name}
            label={label}
            dependencies={keys}
            rules={[
                {
                    required: required,
                },
                ({ getFieldsValue, setFieldValue }) => ({
                    validator(pole, value) {
                        const values = getFieldsValue(keys)

                        // console.log("pole: ", pole);
                        // console.log("value: ", value);
                        // console.log("values: ", values);

                        const prevTemp = { formula }
                        const temp = { formula }
                        keys.forEach(item => {
                            prevTemp[item] = prevValues[item] ? prevValues[item] : null
                            prevTemp.formula = prevTemp.formula.replace(item, prevValues[item])

                            temp[item] = values[item] ? values[item] : null
                            temp.formula = temp.formula.replace(item, values[item])
                        })
                        // if(set.has(1)) return
                        prevValues = { ...values, value }
                        if (temp.formula === prevTemp.formula) {
                            // console.log('set')
                            return form.setFieldValue(name, value)
                        }
                        form.setFieldValue(name, temp.formula)

                        // if (!value || getFieldValue(keys) === value) {
                        //   return Promise.resolve();
                        // }
                        // return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                }),
            ]}
        >
            <Input
                validateTrigger="onBlur"
                suffix={objectProp?.currency?.position === "suffix" ? currency[objectProp.currency.idLine] : false}
                addonAfter={objectProp?.currency?.position === "addonAfter" ? currency[objectProp.currency.idLine] : false}

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
