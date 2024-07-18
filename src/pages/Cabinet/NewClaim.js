import { Form, Typography, Button, Drawer, Descriptions } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useClaims from "../../stores/Cabinet/useClaims";
import useServices from "../../stores/useServices";
import TextInput from "../../components/FormComponentsNew/TextInput";
import NumberInput from "../../components/FormComponentsNew/NumberInput";
import SliderInput from "../../components/FormComponentsNew/SliderInput";
import SelectInput from "../../components/FormComponentsNew/SelectInput";
import DividerForm from "../../components/FormComponentsNew/DividerForm";
import SubjectInput from "../../components/FormComponents/SubjectInput";
import CheckboxInput from "../../components/FormComponents/CheckboxInput";
import TableInput from "../../components/FormComponentsNew/TableInput";
import DateInput from "../../components/FormComponentsNew/DateInput";
import AppHelmet from "../../components/Global/AppHelmet";
import moment from "moment";

const { Title, Paragraph, Text } = Typography;
export default function NewClaim() {
    const [open, setOpen] = useState(false);
    // const [formValue, setFormValue] = useState(false);
    const serviceItem = useServices((state) => state.serviceItem);
    const fetchServiceItem = useServices((state) => state.fetchServiceItem);
    const createClaim = useClaims((state) => state.createClaim);
    const newClaim = useClaims((state) => state.newClaim);
    const clearNewClaim = useClaims((state) => state.clearNewClaim);
    const { id } = useParams();
    const [form] = Form.useForm();

    useEffect(() => {
        fetchServiceItem(id)
    }, [])

    useEffect(() => {
        // console.log(newClaim)
        if (newClaim) {
            showDrawer()
        }
    }, [newClaim])

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        clearNewClaim()
        setOpen(false);
    };
    console.log(serviceItem)
    const onFinish = (values) => {
        console.log(values)
        const arr = []
        for (const [key, value] of Object.entries(values)) {
            // console.log(`${key}: ${value}`);
            // console.log(typeof value)
            if (Array.isArray(value)) {
                console.log(value)
                values[key].forEach(element => {
                    for (const [key, value] of Object.entries(element)) {
                        if (typeof value === 'object' && Object.hasOwn(value, '$d')) {
                            element[key] = moment(value).format()
                        }
                    }
                });
            }



            if (typeof value === 'object' && Object.hasOwn(value, '$d')) {
                values[key] = moment(value).format()
            }
        }
        // values.map(item => {
        //     if (typeof item === 'object' && Object.hasOwn(item, '$d')) {


        //     }
        //     return item
        // })
        // setFormValue(values)
        createClaim({ service: serviceItem.Ref_Key, values })
        // showDrawer()
    }
    // const onValuesChange = (changedValues, allValues) => {
    //     console.log("changedValues",changedValues)
    //     console.log("allValues",allValues)
    // }
    // const onFieldsChange = (changedFields, allFields) => {
    //     console.log("changedFields",changedFields)
    //     console.log("allFields",allFields)
    // }
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }
    // console.log(serviceItem)
    return (
        <div>

            <AppHelmet title={'Новая заявка'} desc={'Новая заявка - Портал цифровых услуг АО Мособлэнерго'} />
            {serviceItem &&
                <>
                    <Title>
                        {/* <span style={{ color: "gray" }}>Услуга:</span><br />  */}
                        {serviceItem.Description}
                    </Title>
                    <Form
                        // onValuesChange={onValuesChange}
                        // onFieldsChange={onFieldsChange}
                        // disabled={true}
                        initialValues={{
                            "e6df7c2f-fbc7-4081-9739-22e5c8899b2a": "Шишкин",
                            "bd747d89-07c2-4eee-807a-0d2b967e5919": "Иван",
                            "32471271-451e-48a2-9b6d-7cc08623004a": "Васильевич",
                            "0a3c3161-b8c0-4f78-b700-43e410add383": 10.81,
                            "c6a0a250-7cd8-4901-b714-57c8bbd2a117": [
                                {
                                    "f5182723-819d-4764-8beb-f7005d689176": 2,
                                    "e2433f38-3dd7-4b85-9b9b-cc83b663b761": moment("2024-07-12T21:00:00.000Z"),
                                    "929673fd-aeb2-45bf-af41-35959544ff35": moment("2024-07-12T21:00:00.000Z"),
                                    "a52e0c76-501e-430a-a402-685c25c991b4": "787b5e8c-16a3-11ef-8681-c8d9d20cde1f"
                                },
                                {
                                    "f5182723-819d-4764-8beb-f7005d689176": 8,
                                    "e2433f38-3dd7-4b85-9b9b-cc83b663b761": moment("2024-07-12T21:00:00.000Z"),
                                    "929673fd-aeb2-45bf-af41-35959544ff35": moment("2024-07-12T21:00:00.000Z"),
                                    "54a4140d-2691-4979-990e-bdb59ee2b05f": "787b5e8d-16a3-11ef-8681-c8d9d20cde1f"
                                }
                            ],
                            "10f131c7-5298-4a77-a619-b2a88efd92be": [
                                {
                                    "f8837efe-63b3-46e0-a35e-bbff2f15b2f6": 10,
                                    "218a7df4-b033-4c9d-82a7-1b9858595c3d": "787b5e8c-16a3-11ef-8681-c8d9d20cde1f"
                                }
                            ],
                            "efae150a-fddd-46a3-87e5-acfbf7a65653": moment("2024-07-12T21:00:00.000Z"),
                            "6cd65203-62ad-4cf4-b0b3-5ec2a493a3f0": "787b5e8d-16a3-11ef-8681-c8d9d20cde1f"
                        }}
                        scrollToFirstError
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        onKeyDown={handleKeyDown}
                        style={{ maxWidth: 800, margin: "0 auto" }}
                    >
                        {serviceItem.fields?.sort((a, b) => a.lineNum - b.lineNum).map((item, index) => {
                            // console.log(item)
                            if (item.component_Type.includes("Divider"))
                                return <DividerForm key={index} {...item.component_Expanded} label={item.label} />
                            if (item.component_Type.includes("TextInput"))
                                return <TextInput key={index} {...item.component_Expanded} {...item} name={item.idLine} dependOf={item.dependIdLine} howDepend={item.dependСondition} />
                            if (item.component_Type.includes("NumberInput"))
                                return <NumberInput key={index} {...item.component_Expanded} {...item} name={item.idLine} dependOf={item.dependIdLine} howDepend={item.dependСondition} />
                            if (item.component_Type.includes("SliderInput"))
                                return <SliderInput key={index} {...item.component_Expanded} {...item} name={item.idLine} dependOf={item.dependIdLine} howDepend={item.dependСondition} />
                            if (item.component_Type.includes("LinkInput"))
                                return <SelectInput key={index} {...item.component_Expanded} {...item} name={item.idLine} dependOf={item.dependIdLine} howDepend={item.dependСondition} />
                            if (item.component_Type.includes("TableInput"))
                                return <TableInput key={index} {...item.component_Expanded} {...item} name={item.idLine} dependOf={item.dependIdLine} howDepend={item.dependСondition} />
                            if (item.component_Type.includes("DateInput"))
                                return <DateInput key={index} {...item.component_Expanded} {...item} name={item.idLine} dependOf={item.dependIdLine} howDepend={item.dependСondition} />

                        })}
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Подать заявку на услугу</Button>
                        </Form.Item>
                    </Form>

                    <Drawer
                        title="Поля формы"
                        placement="bottom"
                        closable={false}
                        onClose={onClose}
                        open={open}
                        key="bottom"
                    >
                       
                        {newClaim &&
                            <>
                                <Typography.Title level={3}>Создана заявка с Ref_Key: <b>{newClaim.Ref_Key}</b></Typography.Title>
                                <Paragraph>Данные по заявке в консоле</Paragraph>
                            </>
                        }
                    </Drawer>
                </>}

        </div>
    );
}


//Старый
// import { Form, Typography, Button, Drawer, Descriptions } from "antd";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useNewClaim from "../../stores/Cabinet/useNewClaim";
// import TextInput from "../../components/FormComponentsNew/TextInput";
// import NumberInput from "../../components/FormComponentsNew/NumberInput";
// import SliderInput from "../../components/FormComponentsNew/SliderInput";
// import SelectInput from "../../components/FormComponentsNew/SelectInput";
// import DividerForm from "../../components/FormComponentsNew/DividerForm";
// import SubjectInput from "../../components/FormComponents/SubjectInput";
// import CheckboxInput from "../../components/FormComponents/CheckboxInput";
// import TableInput from "../../components/FormComponentsNew/TableInput";
// import DateInput from "../../components/FormComponentsNew/DateInput";
// import AppHelmet from "../../components/Global/AppHelmet";
// import moment from "moment";

// const { Title, Paragraph, Text } = Typography;
// export default function NewClaim() {
//     const [open, setOpen] = useState(false);
//     const [formValue, setFormValue] = useState(false);
//     const claim = useNewClaim((state) => state.claim);
//     const fetchClaim = useNewClaim((state) => state.fetchClaim);
//     const createClaim = useNewClaim((state) => state.createClaim);
//     const newClaim = useNewClaim((state) => state.newClaim);
//     const { id } = useParams();
//     const [form] = Form.useForm();

//     useEffect(() => {
//         fetchClaim(id)
//     }, [])
//     const showDrawer = () => {
//         setOpen(true);
//     };
//     const onClose = () => {
//         setOpen(false);
//     };
//     //console.log(claim)
//     const onFinish = (values) => {
//         console.log(values)
//         const arr = []
//         for (const [key, value] of Object.entries(values)) {
//             // console.log(`${key}: ${value}`);
//             // console.log(typeof value)
//             if (Array.isArray(value)) {
//                 console.log(value)
//                 values[key].forEach(element => {
//                     for (const [key, value] of Object.entries(element)) {
//                         if (typeof value === 'object' && Object.hasOwn(value, '$d')) {
//                             element[key] = moment(value).format()
//                         }
//                     }
//                 });
//             }



//             if (typeof value === 'object' && Object.hasOwn(value, '$d')) {
//                 values[key] = moment(value).format()
//             }
//         }
//         // values.map(item => {
//         //     if (typeof item === 'object' && Object.hasOwn(item, '$d')) {


//         //     }
//         //     return item
//         // })
//         setFormValue(values)
//         // createClaim({ service: claim.Ref_Key, values })
//         showDrawer()
//     }
//     // const onValuesChange = (changedValues, allValues) => {
//     //     console.log("changedValues",changedValues)
//     //     console.log("allValues",allValues)
//     // }
//     // const onFieldsChange = (changedFields, allFields) => {
//     //     console.log("changedFields",changedFields)
//     //     console.log("allFields",allFields)
//     // }
//     const handleKeyDown = (event) => {
//         if (event.keyCode === 13) {
//             event.preventDefault();
//         }
//     }
//     console.log(claim)
//     return (
//         <div>

//             <AppHelmet title={'Новая заявка'} desc={'Новая заявка - Портал цифровых услуг АО Мособлэнерго'} />
//             {claim &&
//                 <>
//                     <Title>
//                         {/* <span style={{ color: "gray" }}>Услуга:</span><br />  */}
//                         {claim.Description}
//                     </Title>
//                     <Form
//                         // onValuesChange={onValuesChange}
//                         // onFieldsChange={onFieldsChange}
//                         // disabled={true}
//                         initialValues={{
//                             "e6df7c2f-fbc7-4081-9739-22e5c8899b2a": "Шишкин",
//                             "bd747d89-07c2-4eee-807a-0d2b967e5919": "Иван",
//                             "32471271-451e-48a2-9b6d-7cc08623004a": "Васильевич",
//                             "0a3c3161-b8c0-4f78-b700-43e410add383": 10.81,
//                             "c6a0a250-7cd8-4901-b714-57c8bbd2a117": [
//                                 {
//                                     "f5182723-819d-4764-8beb-f7005d689176": 2,
//                                     "e2433f38-3dd7-4b85-9b9b-cc83b663b761": moment("2024-07-12T21:00:00.000Z"),
//                                     "929673fd-aeb2-45bf-af41-35959544ff35": moment("2024-07-12T21:00:00.000Z"),
//                                     "a52e0c76-501e-430a-a402-685c25c991b4": "787b5e8c-16a3-11ef-8681-c8d9d20cde1f"
//                                 },
//                                 {
//                                     "f5182723-819d-4764-8beb-f7005d689176": 8,
//                                     "e2433f38-3dd7-4b85-9b9b-cc83b663b761": moment("2024-07-12T21:00:00.000Z"),
//                                     "929673fd-aeb2-45bf-af41-35959544ff35": moment("2024-07-12T21:00:00.000Z"),
//                                     "54a4140d-2691-4979-990e-bdb59ee2b05f": "787b5e8d-16a3-11ef-8681-c8d9d20cde1f"
//                                 }
//                             ],
//                             "10f131c7-5298-4a77-a619-b2a88efd92be": [
//                                 {
//                                     "f8837efe-63b3-46e0-a35e-bbff2f15b2f6": 10,
//                                     "218a7df4-b033-4c9d-82a7-1b9858595c3d": "787b5e8c-16a3-11ef-8681-c8d9d20cde1f"
//                                 }
//                             ],
//                             "efae150a-fddd-46a3-87e5-acfbf7a65653": moment("2024-07-12T21:00:00.000Z"),
//                             "6cd65203-62ad-4cf4-b0b3-5ec2a493a3f0": "787b5e8d-16a3-11ef-8681-c8d9d20cde1f"
//                         }}
//                         scrollToFirstError
//                         form={form}
//                         layout="vertical"
//                         onFinish={onFinish}
//                         onKeyDown={handleKeyDown}
//                         style={{ maxWidth: 800, margin: "0 auto" }}
//                     >
//                         {claim.Fields?.sort((a, b) => a.lineNum - b.lineNum).map((item, index) => {
//                             // console.log(item)
//                             if (item.component_Type.includes("ComponentsDivider"))
//                                 return <DividerForm key={index} {...item.component_Expanded} label={item.label} />
//                             if (item.component_Type.includes("ComponentsTextInput"))
//                                 return <TextInput key={index} {...item.component_Expanded} {...item} name={item.idLine} dependOf={item.dependIdLine} howDepend={item.dependСondition} />
//                             if (item.component_Type.includes("ComponentsNumberInput"))
//                                 return <NumberInput key={index} {...item.component_Expanded} {...item} name={item.idLine} dependOf={item.dependIdLine} howDepend={item.dependСondition} />
//                             if (item.component_Type.includes("ComponentsSliderInput"))
//                                 return <SliderInput key={index} {...item.component_Expanded} {...item} name={item.idLine} dependOf={item.dependIdLine} howDepend={item.dependСondition} />
//                             if (item.component_Type.includes("ComponentsLinkInput"))
//                                 return <SelectInput key={index} {...item.component_Expanded} {...item} name={item.idLine} dependOf={item.dependIdLine} howDepend={item.dependСondition} />
//                             if (item.component_Type.includes("ComponentsTableInput"))
//                                 return <TableInput key={index} {...item.component_Expanded} {...item} name={item.idLine} dependOf={item.dependIdLine} howDepend={item.dependСondition} />
//                             if (item.component_Type.includes("ComponentsDateInput"))
//                                 return <DateInput key={index} {...item.component_Expanded} {...item} name={item.idLine} dependOf={item.dependIdLine} howDepend={item.dependСondition} />

//                         })}
//                         <Form.Item>
//                             <Button type="primary" htmlType="submit">Подать заявку на услугу</Button>
//                         </Form.Item>
//                     </Form>

//                     <Drawer
//                         title="Поля формы"
//                         placement="bottom"
//                         closable={false}
//                         onClose={onClose}
//                         open={open}
//                         key="bottom"
//                     >
//                         {Object.keys(formValue).map(item => {
//                             // console.log(item)
//                         })}
//                         {/* <Descriptions
//                             bordered
//                             title="Данные для отправки в 1С"
//                             items={Object.keys(formValue)
//                                 .filter((item, index) => formValue[item] && typeof formValue[item] != 'boolean')
//                                 .map((item, index) => ({
//                                     key: index,
//                                     label: item,
//                                     children: formValue[item],
//                                 }))} /> */}
//                         {/* <Paragraph><pre>{JSON.stringify(formValue)}</pre></Paragraph> */}
//                         <Paragraph>Данные вывелись в консоле</Paragraph>
//                     </Drawer>
//                 </>}

//         </div>
//     );
// }
