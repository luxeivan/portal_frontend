
import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    theme
} from "antd";
import { evaluate } from "mathjs";

export default function FormulaInput({
    name = "name",
    label = "Label",
    disabled = false,
    placeholder = "placeholder",
    required = false,
    dependOf = false,
    howDepend = false,
    min = 0,
    max = 100,
    step = 1,
    defaultValue = false,
    properties = false,
    formula = ''
}) {
    // const [propertiesValue, setPropertiesValue] = useState({})
    // "{"ТипЦены": "f6e1ac07-8fab-49e2-9d34-f859a2a8dcf8","Номенклатура": "2406f62a-2998-4578-9fa2-b2582dcc7a26"}"
    const { colorTextHeading } = theme.useToken().token
    const form = Form.useFormInstance();
    let objectProp = {}
    if (properties) objectProp = JSON.parse(properties)
    let keys = []
    for (let key in objectProp) {
        if (objectProp.hasOwnProperty(key)) {
            keys.push(objectProp[key]);
        }
    }
    console.log(properties)

    // console.log(keys.map(item => ([item])))
    Form.useWatch((values) => {
        const temp = {}
        keys.forEach(item => {
            if (!values[item]) return;
            temp[item] = values[item]
        })
        console.log("evaluate",evaluate(formula, temp))
        if (values['720c36c9-4eb7-4fa8-a970-28c65bc3edba'] && values['8a381dcc-33bd-4cbc-8f42-03297ceacf40'] && values['720c36c9-4eb7-4fa8-a970-28c65bc3edba'] * values['8a381dcc-33bd-4cbc-8f42-03297ceacf40'] !== values[name]) {
            form.setFieldValue(name, values['720c36c9-4eb7-4fa8-a970-28c65bc3edba'] * values['8a381dcc-33bd-4cbc-8f42-03297ceacf40'])
        }
        // setPropertiesValue(temp)
        // console.log("values: ", values)
        // console.log("temp: ", temp)
        // console.log("name: ", name)
    }, form);
    // const propertiesValue = Form.useWatch(['8a381dcc-33bd-4cbc-8f42-03297ceacf40'], form)

    // let count = 0
    // let price = 0
    // count = Form.useWatch(objectProp["Количество"], form);
    // price = Form.useWatch(objectProp["Цена"], form);
    // console.log(propertiesValue)
    // useEffect(() => {
    //     form.setFieldValue(name, 1 * 1)
    // }, [propertiesValue])
    let fieldDepends = Form.useWatch(dependOf, form);
    // console.log('defaultValue',defaultValue)
    // console.log('propsFormula', objectProp)
    if (formula === '') return false;
    const formElement = (
        <Form.Item
            name={name}
            label={label}
        >
            <Input
                disabled={true}
                style={{ color: colorTextHeading }}
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
    if (dependOf && howDepend && howDepend.min && howDepend.max) {
        if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max) return formElement
    }
}
