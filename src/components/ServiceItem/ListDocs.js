import { InfoCircleTwoTone } from '@ant-design/icons'
import { List, Avatar, Space, Popover, Typography,theme } from 'antd'
import React from 'react'
import StrapiRichText from '../StrapiRichText'

const { Paragraph } = Typography

export default function ListDocs({ list }) {
    const {myCustomColor,colorInfo,customfontSizeIcon} = theme.useToken().token;
    //console.log(theme.useToken().token)
    return (

        <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item, index) => (
                <List.Item key={index}>
                    <List.Item.Meta
                        avatar={<Avatar src={`https://cdn-icons-png.flaticon.com/512/281/281760.png`} shape="square" />}
                        title={
                            <>
                                {item.displayName} {' '}
                                {item.common.description ?
                                    <Popover content={<StrapiRichText content={item.common.description} />}>
                                        <InfoCircleTwoTone  twoToneColor={colorInfo} style={{fontSize:customfontSizeIcon,cursor:"pointer"}}/>
                                    </Popover>
                                    : false
                                }
                            </>
                        }
                        description={
                            <Space>
                                {item.common.shortDescription}
                            </Space>
                        }
                    />
                </List.Item>
            )}
        />
    )
}
