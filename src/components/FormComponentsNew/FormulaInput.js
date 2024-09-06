
import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    theme
} from "antd";

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
    properties = false
}) {
    // "{"ТипЦены": "f6e1ac07-8fab-49e2-9d34-f859a2a8dcf8","Номенклатура": "2406f62a-2998-4578-9fa2-b2582dcc7a26"}"
    const { colorTextHeading } = theme.useToken().token
    const form = Form.useFormInstance();
    let objectProp = null
    if (properties) objectProp = JSON.parse(properties)
    let count = Form.useWatch(objectProp["Количество"], form);
    let price = Form.useWatch(objectProp["Цена"], form);
    useEffect(() => {
        if (count && price) {
            // console.log("count",count)
            // console.log("price",price)
            form.setFieldValue(name, count * price)
        }
    }, [count, price])
    let fieldDepends = Form.useWatch(dependOf, form);
    // console.log('defaultValue',defaultValue)
    // console.log('propsFormula', objectProp)
    const formElement = (
        <Form.Item
            name={name}
            label={label}
        >
            <Input
                disabled={true}
                style={{color:colorTextHeading}}
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
