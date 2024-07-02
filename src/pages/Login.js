import React, { useEffect } from 'react'
import AppHelmet from '../components/Global/AppHelmet'
import { Flex, Typography } from 'antd'
import { Anime } from '../components/Main/Anime';
import useAuth from '../stores/useAuth';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
const { Title } = Typography;

export default function Login() {
    const navigate = useNavigate()
    const { toggleModal, auth, redirection, setRedirection } = useAuth();
    useEffect(() => {
        console.log(redirection)
        if (auth) {
            if (redirection) {
                const nav = redirection
                toggleModal('isAuthModalOpen', false);
                setRedirection('')
                navigate(nav)
            } else {
                toggleModal('isAuthModalOpen', false);
                navigate('/cabinet/claimers')
            }
        } else {
            toggleModal('isAuthModalOpen', true);
        }
    }, [auth])
    return (
        <>
            <AppHelmet title={'Авторизация на портале'} desc={'Портал цифровых услуг АО Мособлэнерго'} />
            <div>
                <Flex vertical justify='center' align='center' style={{ width: "100%", height: "calc(100vh - 200px)" }}>
                    <Title level={1}>Пожалуйста авторизируйтесь</Title>

                </Flex>
            </div>
        </>
    )
}
