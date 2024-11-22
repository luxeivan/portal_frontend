import { Col,Form } from 'antd'
import React from 'react'

export default function WrapperComponent({ children, span, dependOf, name, howDepend }) {
    // const dependOf = item.dependIdLine
    // const name = item.idLine
    // const howDepend = item.dependСondition
    const mainForm = Form.useFormInstance()
    let fieldDepends = Form.useWatch(dependOf, mainForm);

    const formElement =
        <Col
            xxl={span ? span : 24} xs={24}>
            {children}
        </Col>
    if (!dependOf) return formElement;
    if (dependOf && howDepend && howDepend.options?.length > 0) {
        let show = false;
        if (typeof fieldDepends === "undefined") fieldDepends = false
        howDepend.options.forEach((item) => {
            if (item.value === "true") item.value = true;
            if (item.value === "false") item.value = false;
            if (item.value == fieldDepends) show = true;
        });
        if (show) return formElement;
    }
    if (dependOf && howDepend && howDepend.max) {
        mainForm.setFieldValue(name, "");
        if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max)
            return formElement;
    }
}
