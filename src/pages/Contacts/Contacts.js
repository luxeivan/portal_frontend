import React from 'react'
import AppHelmet from "../../components/Global/AppHelmet";
import { Flex, Image, List, Typography, Button } from "antd";
import PuzzleGame from '../Games/PuzzleGame';
const { Title, Paragraph } = Typography;

export default function Contacts() {
    return (
        <>
            <AppHelmet title={"О нас"} desc={"Контакты"} />
            <div>
                <Title level={1}>Контакты</Title>
                <Title level={2}>Адреса центров обслуживания клиентов</Title>

                <PuzzleGame/>
            </div>
        </>
    )
}
