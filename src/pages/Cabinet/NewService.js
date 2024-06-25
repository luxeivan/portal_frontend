import { Form, Typography, Button, Drawer, Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useNewClaim from '../../stores/Cabinet/useNewService'
import TextInput from '../../components/test/formComponents/TextInput'
import SliderInput from '../../components/test/formComponents/SliderInput'
import DividerForm from '../../components/test/formComponents/DividerForm'
import SubjectInput from '../../components/FormComponents/SubjectInput'
import CheckboxInput from '../../components/FormComponents/CheckboxInput'


const { Title, Paragraph, Text } = Typography
export default function NewService() {
    const [open, setOpen] = useState(false);
    const [formValue, setFormValue] = useState(false);
    const claim = useNewClaim(state => state.claim)
    const fetchClaim = useNewClaim(state => state.fetchClaim)
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
    const onFinish = (value) => {
        console.log(value)
        setFormValue(value)
        showDrawer()
    }
    return (
        <div>
            {claim &&
                <>
                    <Title>
                        {/* <span style={{ color: "gray" }}>Услуга:</span><br />  */}
                        {claim.Description}
                    </Title>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        {claim.Fields?.map((item, index) => {
                            console.log(item)
                            if (item.component_Type.includes("ComponentsDivider"))
                                return <DividerForm key={index} {...item.component_Expanded} label={item.label}/>
                            if (item.component_Type.includes("ComponentsTextInput"))
                                return <TextInput key={index} label={item.label} {...item.component_Expanded} {...item} name={item.name.Ref_Key}/>
                            if (item.component_Type.includes("ComponentsSliderInput"))
                                return <SliderInput key={index} label={item.label} {...item.component_Expanded} {...item} name={item.name.Ref_Key}/>
                           

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
                        {Object.keys(formValue).map(item => {
                            console.log(item)
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
