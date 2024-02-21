import React from 'react'
import AppHelmet from '../components/Global/AppHelmet'
import { Flex, Typography } from 'antd'
import { Anime } from '../components/Main/Anime';
const { Title, Paragraph, Text, Link } = Typography;

export default function Main() {
    return (
        <>
            <AppHelmet title={'АО Мособлэнерго'} desc={'Портал цифровых услуг'} />
            <div>
                <Title level={1}></Title>
                <Flex vertical justify='center' align='center' style={{width:"100%",height:"calc(100vh - 200px)"}}>
                    <Anime />
                </Flex>
            </div>
        </>
    )
}
