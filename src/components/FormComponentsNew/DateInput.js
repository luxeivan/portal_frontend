import React from 'react'
import { ConfigProvider, DatePicker, Form, TimePicker } from 'antd';
import moment from "moment";
import "moment/locale/ru";
import locale from "antd/es/locale/ru_RU";
import WrapperComponent from './WrapperComponent';
import InfoDrawer from '../InfoDrawer';

moment.locale("ru");

export default function DateInput({ 
    name = 'name', 
    part = 'Дата', 
    label = 'Поле', 
    defaultValue = false, 
    disabled = false, 
    placeholder = "", 
    required = false, 
    dependOf = false, 
    howDepend = false,
    span = false,
    fullDescription = false,
    stylesField_key=false
}) {
    const form = Form.useFormInstance()
    // const fieldDepends = Form.useWatch(dependOf, form)
    // console.log(part)
    const formElement = (
        <ConfigProvider locale={locale}>

            <Form.Item
                name={name}
                label={fullDescription ? <InfoDrawer fullDescription={fullDescription}>{label}</InfoDrawer> : label}
                rules={[
                    {
                        required: required,
                        message: 'Это поле обязательное'
                    }
                ]}
                initialValue={defaultValue}
            >
                {part === "Дата" &&
                    <DatePicker format={"DD.MM.YYYY"} placeholder={placeholder}  />
                }
                {part === "МесяцГод" &&
                    <DatePicker format={"MM.YYYY"} placeholder={placeholder}  picker='month'/>
                }
                {part === "ДатаВремя" &&
                    <DatePicker format={"DD.MM.YYYY HH:mm"} showTime placeholder={placeholder}  />
                }
                {part === "Время" &&
                    <TimePicker format={"HH:mm"} placeholder={placeholder}  />
                }
            </Form.Item>
        </ConfigProvider>
    )
    // if (!dependOf) return formElement
    // if (dependOf && howDepend && howDepend.options?.length > 0) {
    //     let show = false
    //     if(typeof fieldDepends === "undefined")  fieldDepends = false 
    //     howDepend.options.forEach(item => {
    //         if (item.value === "true") item.value = true
    //         if (item.value === "false") item.value = false;
    //         if (item.value == fieldDepends) show = true
    //     })
    //     if (show) return formElement
    // }
    // if (dependOf && howDepend && howDepend.min && howDepend.max) {
    //     if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max) return formElement
    // }
    return <WrapperComponent span={span} stylesField_key={stylesField_key} dependOf={dependOf} howDepend={howDepend} name={name}>{formElement}</WrapperComponent>
}
