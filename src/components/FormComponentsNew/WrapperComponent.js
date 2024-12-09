import { Col, Form } from 'antd'
import React from 'react'
import useServices from '../../stores/useServices';

export default function WrapperComponent({ children, dependOf, name, howDepend, stylesField_key }) {
    const serviceItem = useServices((state) => state.serviceItem);
    const styles = serviceItem.styles[stylesField_key]
    // const dependOf = item.dependIdLine
    // const name = item.idLine
    // const howDepend = item.dependСondition
    const mainForm = Form.useFormInstance()
    let fieldDepends = Form.useWatch(dependOf, mainForm);

    // console.log("styles: ", styles);
    if (dependOf) {
        console.log("name: ", name);
        console.log("dependOf: ", dependOf);
        console.log("howDepend: ", howDepend);
    }

    const formElement =
        <Col
            {...styles}
            xxl={styles?.span ? styles.span : 24} xs={24}
        >
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
