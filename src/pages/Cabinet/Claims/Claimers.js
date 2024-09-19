import React, { useEffect } from 'react'
import { Card, Flex, Typography, Spin, theme, Image, Skeleton,Descriptions } from "antd";
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
                        <Link key={index} to={`/cabinet/claimers/${item.element2_Expanded.Ref_Key}`}>
                            <Card className={styles.styleCard} hoverable 
                            title={`Заявка №${item.element2_Expanded.Number}`}
                            >
                                {/* <Title level={4}>Заявка №{item.Element2_Expanded.Number}</Title> */}
                                <Descriptions 
                                // title={`Заявка №${item.Element2_Expanded.Number}`} 
                                column={1} items={[
                                    {
                                        key: '1',
                                        label: 'Создана',
                                        children: item.element2_Expanded.Date, 
                                    },
                                    {
                                        key: '2',
                                        label: 'По услуге',
                                        children: item.element2_Expanded.template.Description, 
                                    }
                                ]}/>
                                {/* <Flex vertical>

                                    <Typography.Text type="secondary">Создана: {item.Element2_Expanded.Date}</Typography.Text>
                                    <Typography.Text type="secondary">По услуге: {item.Element2_Expanded.Template.Description}</Typography.Text>
                                </Flex> */}
                            </Card>
                        </Link>
                    )}
                </Flex>
            }
        </>
    )
}
