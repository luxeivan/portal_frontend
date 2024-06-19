import React, { useEffect, useState } from 'react'
import { Button, Input, Typography } from 'antd';
import useStore from '../store/useStore';
import formJson from '../components/Form.json'

const { TextArea } = Input;

export default function InputJson() {
    const json = useStore(state => state.json)
    const createJson = useStore(state => state.createJson)
    const clearJson = useStore(state => state.clearJson)
    const err = useStore(state => state.err)
    const [value, setValue] = useState(false)
    useEffect(() => {
        try {
            // console.log(localStorage.getItem('json'))
            if (localStorage.getItem('json')) {
                createJson(localStorage.getItem('json'))
                setValue(localStorage.getItem('json'))
            } else {
                setValue(JSON.stringify(json, undefined, 4))
            }
        } catch (error) {

        }
    }, [])
    // useEffect(() => {
    //     try {
    //         setValue(JSON.stringify(json, undefined, 4))
    //     } catch (error) {

    //     }
    // }, [json])
    const clear = () => {
        localStorage.removeItem('json')
        clearJson()
        setValue(JSON.stringify(formJson, undefined, 4))
    }
    const handlerChange = (event) => {
        event.preventDefault()
        // console.log(event.target.value)
        createJson(event.target.value)
        setValue(event.target.value)
    }
    return (
        <div>
            <Typography.Title level={3} style={{ textAlign: "center" }}>Ввод JSON для формы <Button type='primary' danger onClick={clear}>Сбросить</Button></Typography.Title>
            <TextArea rows={4} autoSize={{ minRows: 6 }} onChange={handlerChange} value={value} style={err && { border: "1px solid red", backgroundColor: "rgba(255,0,0,0.1)" }} />
        </div>
    )
}
