import { Button, Divider, Typography } from 'antd'
import React from 'react'
import Law from '../../../../components/Documentation/Law'
import FileForDownload from '../../../../components/FileForDownload'
const docsBilling = [
    {
        type: "pdf",
        name: "Счет",
        url: "/uploads/123.pdf",
        size: "3343"
    },
    {
        type: "pdf",
        name: "Счет фактура",
        url: "/uploads/124.pdf",
        size: "2343"
    },
    {
        type: "pdf",
        name: "Акт выполненых работ",
        url: "/uploads/1255.pdf",
        size: "343"
    },
]
export default function Billing() {
    return (
        <div>
            <Typography.Title level={4}>Сумма оплаты по договору: 54 252 руб</Typography.Title>
            <Button type='primary'>Оплатить картой</Button>
            <Divider/>
            {docsBilling.map((item, index) =>
                <FileForDownload key={index} type={item.type} name={item.name} url={item.url} size={item.size} />
            )}
        </div>
    )
}
