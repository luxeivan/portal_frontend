import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Space, Tag, Button } from 'antd';

export default function TableInputNew({ name = 'name', label = 'Label', disabled = false, placeholder = 'placeholder', required = false, options = [], dependOf = false, howDepend = false, fields: Fields = [] }) {
    const form = Form.useFormInstance()
    const columns = Fields.map((item, index) => ({
        title: item.label,
        dataIndex: item.name,
        key: item.name,
        render: (text) => <Form.Item name={[name, item.name]}>
            <Input />
        </Form.Item>,
    }))
    // const columns = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         key: 'name',
    //         render: (text) => <a>{text}</a>,
    //     },
    //     {
    //         title: 'Age',
    //         dataIndex: 'age',
    //         key: 'age',
    //     },
    //     {
    //         title: 'Address',
    //         dataIndex: 'address',
    //         key: 'address',
    //     },
    //     {
    //         title: 'Tags',
    //         key: 'tags',
    //         dataIndex: 'tags',
    //         render: (_, { tags }) => (
    //             <>
    //                 {tags.map((tag) => {
    //                     let color = tag.length > 5 ? 'geekblue' : 'green';
    //                     if (tag === 'loser') {
    //                         color = 'volcano';
    //                     }
    //                     return (
    //                         <Tag color={color} key={tag}>
    //                             {tag.toUpperCase()}
    //                         </Tag>
    //                     );
    //                 })}
    //             </>
    //         ),
    //     },
    //     {
    //         title: 'Action',
    //         key: 'action',
    //         render: (_, record) => (
    //             <Space size="middle">
    //                 <a>Invite {record.name}</a>
    //                 <a>Delete</a>
    //             </Space>
    //         ),
    //     },
    // ];
    const data = [
    ];
    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
    }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input placeholder='123' style={{width:"100%"}} />;
        return (
            <td {...restProps}>

                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>

            </td>
        );
    };
    return (
        <Table
            columns={columns}
            dataSource={data}
            components={{

                body: {
                    wrapper: ({ children }) => (<Form.List name={name}>
                        {(fields, { add, remove }) => (

                            <>
                                <div>
                                    {fields.map((field) => (
                                        children
                                    ))}
                                </div>
                                <Button onClick={add}>Добавить</Button>
                            </>
                        )}

                    </Form.List>),
                    cell: EditableCell,
                },
            }}
        />

    )
}