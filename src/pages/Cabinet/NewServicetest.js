import { Form, Typography, Button, Drawer, Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useNewClaim from '../../stores/Cabinet/useNewServicetest'
import TextInput from '../../components/test/formComponents/TextInput'
import SliderInput from '../../components/test/formComponents/SliderInput'
import DividerForm from '../../components/test/formComponents/DividerForm'
import SubjectInput from '../../components/FormComponents/SubjectInput'
import CheckboxInput from '../../components/FormComponents/CheckboxInput'
import SwitchInput from '../../components/test/formComponents/SwitchInput'
import SelectInput from '../../components/test/formComponents/SelectInput'
import axios from 'axios'


const { Title, Paragraph, Text } = Typography
export default function NewServicetest() {
    const [open, setOpen] = useState(false);
    const [formValue, setFormValue] = useState(false);
    const claim = useNewClaim(state => state.claim)
    const fetchClaim = useNewClaim(state => state.fetchClaim)
    const createClaim = useNewClaim(state => state.createClaim)
    const { id } = useParams()
    const [form] = Form.useForm()

    useEffect(() => {
        fetchClaim(id)
    }, [])
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    //console.log(claim)
    const onFinish = (values) => {
        const dataString = JSON.stringify(claim)
        const data = JSON.parse(dataString)
        data.fields = claim.fields.map(item => {
            item.value = values[item.name] || undefined
            item.value_Type = item.in1C?.typeODATA || undefined
            return item
        })
        console.log('value', values)
        console.log('claim', data)
        createClaim(data)

        setFormValue(values)
        showDrawer()
    }
    console.log(claim)
    return (
        <div>
            {claim &&
                <>
                    <div style={{ maxWidth: 800, margin: '0 auto' }}>
                        <Title >
                            {/* <span style={{ color: "gray" }}>Услуга:</span><br />  */}
                            {claim.Description}
                        </Title>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            {claim.fields?.map((item, index) => {
                                // console.log(item)
                                if (item.component_Type.includes("ComponentsDivider"))
                                    return <DividerForm key={index} {...item.component_Expanded} />
                                if (item.component_Type.includes("ComponentsTextInput"))
                                    return <TextInput key={index} {...item.component_Expanded} {...item} />
                                if (item.component_Type.includes("ComponentsSliderInput"))
                                    return <SliderInput key={index} {...item.component_Expanded} {...item} />
                                if (item.component_Type.includes("ComponentsSwitchInput"))
                                    return <SwitchInput key={index} {...item.component_Expanded} {...item} />
                                if (item.component_Type.includes("ComponentsCatalogInput"))
                                    return <SelectInput key={index} {...item.component_Expanded} {...item} />


                            })}
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Подать заявку на услугу</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <Drawer
                        title="Поля формы"
                        placement="bottom"
                        closable={false}
                        onClose={onClose}
                        open={open}
                        key="bottom"
                    >
                        {Object.keys(formValue).map(item => {
                            // console.log(item)
                        })}
                        <Descriptions
                            bordered
                            title="Данные для отправки в 1С"
                            items={Object.keys(formValue)
                                .filter((item, index) => formValue[item] && typeof formValue[item] != 'boolean')
                                .map((item, index) => ({
                                    key: index,
                                    label: item,
                                    children: formValue[item],
                                }))} />
                        {/* <Paragraph><pre>{JSON.stringify(formValue)}</pre></Paragraph> */}
                    </Drawer>
                </>
            }
        </div>
    )
}
