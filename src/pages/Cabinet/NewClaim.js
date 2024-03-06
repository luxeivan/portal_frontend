import { Form, Typography,Button } from 'antd'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useNewClaim from '../../stores/useNewClaim'
import TextInput from '../../components/FormComponents/TextInput'
import SubjectInput from '../../components/FormComponents/SubjectInput'
import CheckboxInput from '../../components/FormComponents/CheckboxInput'


const { Title, Paragraph, Text } = Typography
export default function NewClaim() {
    const claim = useNewClaim(state => state.claim)
    const fetchClaim = useNewClaim(state => state.fetchClaim)
    const { id, url } = useParams()
    useEffect(() => {
        fetchClaim(url, id)
    }, [])
    //console.log(claim)
    const onFinish = (value)=>{
console.log(value)
    }
    return (
        <div>
            {claim &&
                <>
                    <Title>
                        Новая заявка: {claim.attributes?.name}
                    </Title>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        {claim.attributes?.fields.map((item, index) => {
                            if (item.__component === "field-types.text")
                                return <TextInput
                                    displayName={item.displayName}
                                    name={item.common.name}
                                    shortDescription={item.common.shortDescription}
                                    required={item.common.required}
                                    description={item.common.description}
                                    depends={item.common.depends}
                                />
                            if (item.__component === "field-types.switch")
                                return <CheckboxInput
                                    displayName={item.displayName}
                                    name={item.common.name}
                                    shortDescription={item.common.shortDescription}
                                    required={item.common.required}
                                    description={item.common.description}
                                    depends={item.common.depends}
                                />
                            if (item.__component === "field-types.subject")
                                return <SubjectInput
                                    displayName={item.displayName}
                                    name={item.common.name}
                                    shortDescription={item.common.shortDescription}
                                    required={item.common.required}
                                    depends={item.common.depends}
                                />

                        })}
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Подать заявление</Button>
                        </Form.Item>
                    </Form>
                </>
            }
        </div>
    )
}
// import { Button, Checkbox, Form, Input, Switch } from "antd";
// import { useEffect } from "react";

// const SubButton = () => {
//     const form = Form.useFormInstance();
//     return <Button onClick={() => form.setFieldsValue({ check: !form.getFieldValue('check') })}>Кнопка</Button>;
// };
// const SubInput = () => {
//     const form = Form.useFormInstance();
//     const check = Form.useWatch('check', form);
//     //console.log(check)
//     if (check)
//         return <Form.Item
//             label='Представитель'
//             name={'SubInput'}
//             rules={[
//                 {
//                   required: true,
//                   message: 'Пожалуйста заполните',
//                 },
//                 {
//                   min: 5,
//                   message: 'Минимум 5 символов',
//                 },
//               ]}>
//             <Input />
//         </Form.Item>
// };
// export default function NewClaim() {
//     const [form] = Form.useForm();
//     useEffect(() => {
//         //console.log(form)
//     }, [form])
//     const onFinish = (values) => {
//         console.log(values)

//     }
//     return (

//         <Form form={form} onFinish={onFinish}>
//             <Form.Item name="check" label='По доверенности' valuePropName="checked">
//                 <Switch />
//             </Form.Item>
//             <Form.Item
//                 label='Заявитель'
//                 name={'name'}
//             >
//                 <Input />
//             </Form.Item>
//             <SubInput />
//             <SubButton />
//             <Form.Item>
//                 <Button type="primary" htmlType="submit">Отправить</Button>
//             </Form.Item>
//         </Form>
//     );
// }