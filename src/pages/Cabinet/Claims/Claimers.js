import React, { useEffect } from 'react'
import { Card, Flex, Typography, Spin, theme, Image, Skeleton } from "antd";
import Title from 'antd/es/typography/Title'
import { Link, useParams } from 'react-router-dom'
import AppHelmet from '../../../components/Global/AppHelmet'
import useClaims from '../../../stores/Cabinet/useClaims'
import styles from "./Claimers.module.css";

export default function Claimers() {
    const claims = useClaims(state => state.claims)
    const fetchClaims = useClaims(state => state.fetchClaims)
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
                    <Title level={1}>Список поданных заявок</Title>

                    <Skeleton active avatar paragraph={{ rows: 2 }} />
                    <Skeleton active avatar paragraph={{ rows: 2 }} />
                    <Skeleton active avatar paragraph={{ rows: 2 }} />
                </div>
            }
            {claims &&
                <Flex wrap="wrap" gap="large" style={{ width: "100%" }}>
                    {claims.map((item, index) =>
                        <Link to={`/cabinet/claimers/${item.Element2_Expanded.Ref_Key}`}>
                            <Card key={index} className={styles.styleCard} hoverable>
                                <Title level={4}>{item.Element2_Expanded.Ref_Key}</Title>
                                <Title level={5}>{item.Element2_Expanded.Date}</Title>
                            </Card>
                        </Link>
                    )}
                </Flex>
            }
        </>
    )
}
