import React from 'react'
import AppHelmet from '../components/Global/AppHelmet'
import { Typography } from 'antd'
const { Title, Paragraph, Text, Link } = Typography;

export default function Calc() {
    return (
        <>
            <AppHelmet title={'Калькулятор'} desc={'Калькулятор мощности'} />
            <div>
                <Title level={1}>Calc</Title>
            </div>
        </>
    )
}
