import { Skeleton } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useClaims from '../../../stores/Cabinet/useClaims'

export default function Claims() {
    const claims = useClaims(state => state.claims)
    const fetchClaims = useClaims(state => state.fetchClaims)
    useEffect(() => {
        fetchClaims()
    }, [])
    const { id } = useParams()
    console.log(claims)
    return (
        <>
            {!claims &

                <div>
                    <Title level={1}>Заявки ЛКЗ №{id}</Title>

                    <Skeleton active avatar paragraph={{ rows: 2 }} />
                    <Skeleton active avatar paragraph={{ rows: 2 }} />
                    <Skeleton active avatar paragraph={{ rows: 2 }} />
                </div>
            }
            {claims&&<div>Загрузились</div>}
        </>
    )
}
