import React from 'react'
import { Typography, Tabs, Flex, Image } from 'antd'
import mistakesImg from '../../img/docs/mistakes.jpg'
import Law from '../../components/Documentation/Law'
import Rekvizity from '../../components/Rekvizity/Rekvizity'
import Instructions from '../../components/Documentation/Instructions'

const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: 'Инструкции',
        children: <Instructions/>,
    },
    {
        key: '2',
        label: 'Законодательство',
        children: <Law/>,
    },
    {
        key: '3',
        label: 'Реквизиты',
        children: <Rekvizity />,
    },
    // {
    //     key: '3',
    //     label: 'Не повторять ошибки',
    //     children: <Flex>
    //         <Image src={mistakesImg} preview={false} />
    //     </Flex>,
    // },
];
export default function Documentation() {
    return (
        <>
            <Typography.Title level={1}>Документация</Typography.Title>
             <div style={{ margin:"0 auto"}}> 
                <Tabs style={{maxWidth:"80vw"}} defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
        </>
    )
}
