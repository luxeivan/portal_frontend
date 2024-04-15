
import { Checkbox, Skeleton, Descriptions } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect } from 'react'
import AppHelmet from '../../../components/Global/AppHelmet'
import useProfile from '../../../stores/Cabinet/useProfile';


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
const items = [
    {
        key: '1',
        label: 'UserName',
        children: 'Zhou Maomao',
    },
    {
        key: '2',
        label: 'Telephone',
        children: '1810000000',
    },
    {
        key: '3',
        label: 'Live',
        children: 'Hangzhou, Zhejiang',
    },
    {
        key: '4',
        label: 'Remark',
        children: 'empty',
    },
    {
        key: '5',
        label: 'Address',
        children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
    },
];

export default function Profile() {
    const profile = useProfile(store => store.profile)
    const isLoadingProfile = useProfile(store => store.isLoadingProfile)
    const fetchProfile = useProfile(store => store.fetchProfile)
    useEffect(() => {
        fetchProfile()
    }, [])

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };
    return (
        <div>
            <AppHelmet title={"Профиль"} desc={"Профиль пользователя"} />
            <Title level={1}>Профиль</Title>

            {!isLoadingProfile && profile &&
                < Descriptions  items={[
                    {
                        key: '1',
                        label: 'Имя',
                        children: profile.firstname,
                    },
                    {
                        key: '2',
                        label: 'Фамилия',
                        children: profile.lastname,
                    },
                    {
                        key: '3',
                        label: 'E-mail',
                        children: profile.email,
                    },
                    {
                        key: '4',
                        label: 'Телефон',
                        children: profile.phone,
                    },
                ]} />
            }
            {isLoadingProfile &&
                <>
                    {/* <Skeleton.Image active style={{ marginBottom: 30 }} /> */}
                    <Skeleton active avatar paragraph={{ rows: 4 }} />
                    <Skeleton active avatar paragraph={{ rows: 2 }} />
                </>
            }
            <Title level={2}>Отображать поданные заявки только от:</Title>
            <Checkbox.Group options={options} defaultValue={['Физические лица', 'Юридические лица', 'Индивидуальные предприниматели']} onChange={onChange} />
        </div>
    )
}
