import React from 'react'
import AppHelmet from '../components/Global/AppHelmet'
import { Typography } from 'antd'
const { Title, Paragraph, Text, Link } = Typography;

export default function Services() {
    return (
        <>
            <AppHelmet title={'Услуги'} desc={'Услуги компании'} />
            <div>
                <Title level={1}>Services</Title>
            </div>
        </>
    )
}
