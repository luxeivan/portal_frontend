import React, { useEffect } from 'react'
import { Card, Flex, Typography, Spin, theme, Image, Skeleton } from "antd";
import Title from 'antd/es/typography/Title'
import { useParams } from 'react-router-dom'
import AppHelmet from '../../../components/Global/AppHelmet'
import useNewServicetest from '../../../stores/Cabinet/useNewServicetest'
import styles from "./Claimers.module.css";

export default function Claimers() {
    const claims = useNewServicetest(state => state.claims)
    const fetchClaims = useNewServicetest(state => state.fetchClaims)
    useEffect(() => {
        fetchClaims()
    }, [])
    const { id } = useParams()
    console.log(claims)
    return (
        <>
            {!claims &&
                <div>

                    <AppHelmet title={"В работе"} desc={"Список личных кабинетов заявителей"} />
                    <Title level={1}>Список ЛКЗ</Title>

                    <Skeleton active avatar paragraph={{ rows: 2 }} />
                    <Skeleton active avatar paragraph={{ rows: 2 }} />
                    <Skeleton active avatar paragraph={{ rows: 2 }} />
                </div>
            }
            {claims &&
                <Flex wrap="wrap" gap="large" style={{ width: "100%" }}>
                    {claims.map((item, index) =>
                        <Card key={index} className={styles.styleCard} hoverable>
                            <Title level={4}>{item.Description}</Title>
                            <Title level={5}>{item.Number}</Title>
                        </Card>)}
                </Flex>
            }
        </>
    )
}
