import React from 'react'
import AppHelmet from '../components/Global/AppHelmet'
import { Image, Typography } from 'antd'
import imgCalc from '../img/calc/calculator.webp'
const { Title } = Typography;

export default function Calc() {
    return (
        <>
            <AppHelmet title={'Калькулятор'} desc={'Калькулятор мощности'} />
            <div>
                <Title level={1}>Калькулятор</Title>
                
                <Image
                     width={300}
                    preview={false}
                    src={imgCalc}
                />
            </div>
        </>
    )
}
