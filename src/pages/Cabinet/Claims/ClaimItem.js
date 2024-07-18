import { Skeleton, Typography, Descriptions, Button } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect } from 'react'
import { useParams,Link } from 'react-router-dom'
import useClaims from '../../../stores/Cabinet/useClaims'

export default function ClaimItem() {
    const claim = useClaims(state => state.claim)
    const fetchClaimItem = useClaims(state => state.fetchClaimItem)
    const { id } = useParams()
    useEffect(() => {
        fetchClaimItem(id)
    }, [])
    console.log(claim)
    return (
        <>
            {!claim &&

                <div>
                    <Title level={1}>Заявка</Title>

                    <Skeleton active avatar paragraph={{ rows: 2 }} />
                    <Skeleton active avatar paragraph={{ rows: 2 }} />
                    <Skeleton active avatar paragraph={{ rows: 2 }} />
                </div>
            }
            {claim &&
                <>
                    <Link to="/cabinet/claimers"><Button>Назад</Button></Link>
                    <Typography.Title level={1}>Заявка №{claim.Number}</Typography.Title>
                    <Descriptions
                        // title={`Заявка №${item.Element2_Expanded.Number}`} 
                        column={1} items={[
                            {
                                key: '1',
                                label: 'Создана',
                                children: claim.Date,
                            },
                            {
                                key: '2',
                                label: 'По услуге',
                                children: claim.template.Description,
                            }
                        ]} />
                    <Descriptions title="Поля с данными по заявке"
                        bordered
                        column={1}
                        items={claim.fields.map((item, index) => ({
                            key: index + 1,
                            label: item.name_Key,
                            children: item.value,
                        }))}
                    />
                </>
            }
        </>
    )
}
