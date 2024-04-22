import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'

export default function SubjectInput({ displayName, name, shortDescription, required, depends }) {
    const [showModal, setShowModal] = useState(false)
    const [value, setValue] = useState()
    const [selectedSubject, setSelectedSubject] = useState()
    // -----------------
    const form = Form.useFormInstance();
    // console.log(Form.useWatch(depends?.showIf ? depends?.showIf?.nameField : '', form))
    let show = true
    let showTemp = Form.useWatch(depends?.showIf ? depends?.showIf?.nameField : '', form) === depends?.showIf?.eq;
    if (depends && showTemp)
        show = true
    else if (!depends)
        show = true
    else show = false
    console.log('Render')
    // -----------------
    const toggleShowModal = () => {
        setShowModal(!showModal)
    }
    const changeSubject = () => {
        const obj = {}
        obj[name] = value
        form.setFieldsValue(obj)
        setSelectedSubject(form.getFieldValue(name))
        setShowModal(false)
    }
    form.getFieldValue(depends?.showIf?.nameField)
    if (show)
        return (
            <>
                <Form.Item
                    //dependencies={[depends?.showIf?.nameField]}
                    name={name}
                    label={displayName}
                    rules={[
                        {
                            required,
                            message: "Выберите субъект"
                        }
                    ]}
                    // hidden={console.log(form.getFieldValue(depends?.showIf?.nameField))&&form.getFieldValue(depends?.showIf?.nameField)}
                >
                    <Input type='hidden' />
                    <Button style={{ width: 200, height: 200 }} type="dashed" onClick={toggleShowModal}>{selectedSubject ? selectedSubject : <PlusOutlined />}</Button>
                </Form.Item>

                <Modal title="Выбрать заявителя" open={showModal} onOk={changeSubject} onCancel={() => setShowModal(false)}>
                    <Input value={value} onChange={(event) => { setValue(event.target.value) }} />
                </Modal>
            </>
        )
}
