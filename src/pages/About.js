import React from 'react'
import AppHelmet from '../components/Global/AppHelmet'
import { Typography } from 'antd'
const { Title, Paragraph, Text, Link } = Typography;

export default function About() {
    return (
        <>
            <AppHelmet title={'О нас'} desc={'Информация о компании'} />
            <div>
                <Title level={1}>О компании Мособлэнерго</Title>
            </div>
        </>
    )
}
