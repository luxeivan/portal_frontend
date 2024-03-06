import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'

export default function SubjectInput({ displayName, name, shortDescription, required, depends }) {
    const [showModal, setShowModal] = useState(false)
    const [value, setValue] = useState()
    const [selectedSubject, setSelectedSubject] = useState()
    const form = Form.useFormInstance();
    const check = Form.useWatch(depends?.showIf.nameField, form);
    let show = check
    useEffect(() => {
        // console.log(initialValue)
    }, [])
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
    if (show)
        return (
            <>
                <Form.Item
                    //  initialValue={initialValue}
                    // valuePropName="value"
                    //  validateStatus='error'
                    name={name}
                    label={displayName}
                    rules={[
                        {
                            required: true,
                            message: "Выберите субъект"
                        }
                    ]}
                >
                    <Input
                        // name='value'               
                        type='hidden'
                    //value={initialValue}
                    // style={{display:"none"}} 
                    />
                    <Button style={{ width: 200, height: 200 }} type="dashed" onClick={toggleShowModal}>{selectedSubject?selectedSubject:<PlusOutlined />}</Button>
                </Form.Item>

                <Modal title="Выбрать заявителя" open={showModal} onOk={changeSubject} onCancel={() => setShowModal(false)}>
                    <Input value={value} onChange={(event)=>{setValue(event.target.value)}}/>
                   
                </Modal>
            </>
        )
}
