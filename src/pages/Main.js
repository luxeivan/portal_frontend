import React from 'react'
import AppHelmet from '../components/Global/AppHelmet'
import { Typography } from 'antd'
const { Title, Paragraph, Text, Link } = Typography;

export default function Main() {
    return (
        <>
            <AppHelmet title={'АО Мособлэнерго'} desc={'Портал цифровых услуг'} />
            <div>
                <Title level={1}>Main</Title>
            </div>
        </>
    )
}
