import { Form, Typography, Button, Drawer, Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useNewClaim from '../../stores/useNewClaim'
import TextInput from '../../components/FormComponents/TextInput'
import SubjectInput from '../../components/FormComponents/SubjectInput'
import CheckboxInput from '../../components/FormComponents/CheckboxInput'


const { Title, Paragraph, Text } = Typography
export default function NewClaim() {
    const [open, setOpen] = useState(false);
    const [formValue, setFormValue] = useState(false);
    const claim = useNewClaim(state => state.claim)
    const fetchClaim = useNewClaim(state => state.fetchClaim)
    const { id, url } = useParams()
    useEffect(() => {
        fetchClaim(url, id)
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
                            title="Info"
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
