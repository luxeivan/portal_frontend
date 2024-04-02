
import { Checkbox, Skeleton } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import AppHelmet from '../../../components/Global/AppHelmet'

const options = [
    {
        label: 'Физические лица',
        value: 'Физические лица',
    },
    {
        label: 'Юридические лица',
        value: 'Юридические лица',
    },
    {
        label: 'Индивидуальные предприниматели',
        value: 'Индивидуальные предприниматели',
    },
];

export default function Profile() {
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };
    return (
        <div>
             <AppHelmet title={"Профиль"} desc={"Профиль пользователя"} />
            <Title level={1}>Профиль</Title>

            <Skeleton.Image active style={{ marginBottom: 30 }} />
            <Skeleton active avatar paragraph={{ rows: 4 }} />
            <Skeleton active avatar paragraph={{ rows: 2 }} />
            <Title level={2}>Отображать поданные заявки только от:</Title>
            <Checkbox.Group options={options} defaultValue={['Физические лица','Юридические лица','Индивидуальные предприниматели']} onChange={onChange} />
        </div>
    )
}
