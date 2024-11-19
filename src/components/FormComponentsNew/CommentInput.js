
import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    theme,
    Space,
    Flex
} from "antd";
import useTemp from "../../stores/Cabinet/useTemp";


export default function CommentInput({
    name = "name",
    label = "Label",
    disabled = false,
    placeholder = "placeholder",
    required = false,
    dependOf = false,
    howDepend = false,
}) {
    const { colorTextHeading } = theme.useToken().token
    const form = Form.useFormInstance();
    let fieldDepends = Form.useWatch(dependOf, form);

    const formElement = (
        
            <Form.Item
                style={{ flex: 1 }}
                name={name}
                label={label}   
                rules={[
                    {
                        required: required,
                    },                   
                ]}
                
            >
                <Input.TextArea
                    placeholder={placeholder}
                    disabled={disabled}
                    autoSize={{ minRows: 2, maxRows: 6 }}
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
