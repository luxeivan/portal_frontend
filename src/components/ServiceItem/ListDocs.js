import { List, Avatar } from 'antd'
import React from 'react'

export default function ListDocs({list}) {
    return (
        
        <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item, index) => (
                <List.Item key={index}>
                    <List.Item.Meta
                        avatar={<Avatar src={`https://cdn-icons-png.flaticon.com/512/281/281760.png`} shape="square"/>}
                        title={<a href="https://ant.design">{item.displayName}</a>}
                        description={item.description}
                    />
                </List.Item>
            )}
        />
    )
}
