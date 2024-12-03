import React from 'react'
import { Typography, Tabs } from 'antd'
import Law from '../../components/Documentation/Law'
import Rekvizity from '../../components/Contacts/Rekvizity'
import Instructions from '../../components/Documentation/Instructions'
import AppHelmet from '../../components/Global/AppHelmet'
import Container from '../../components/Container'

const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: 'Инструкции',
        children: <Instructions />,
    },
    {
        key: '2',
        label: 'Законодательство',
        children: <Law />,
    },
    // {
    //     key: '3',
    //     label: 'Реквизиты',
    //     children: <Rekvizity />,
    // },

];
export default function Documentation() {
    return (
        <>
            <AppHelmet title={'Документация'} desc={'Портал цифровых услуг АО Мособлэнерго - Документация'} />
            <Container>
                <Typography.Title level={1}>Документация</Typography.Title>
                <div style={{ margin: "0 auto" }}>
                    <Tabs style={{ maxWidth: "80vw" }} defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
            </Container>
            
        </>
    )
}
