import { QuestionCircleOutlined } from '@ant-design/icons'
import { Form, Input, Typography, Popover, theme } from 'antd'
import React from 'react'
import StrapiRichText from '../StrapiRichText'

export default function TextInput({ displayName, name, shortDescription, required, description, depends }) {
    const { colorInfo, customfontSizeIcon } = theme.useToken().token;
    const form = Form.useFormInstance();
    const check = Form.useWatch(depends?.showIf.nameField, form);
    let show = true
    if (depends && depends.showIf) {
        show = check
    }
    if (show)
        return (
            <Form.Item
                name={name}
                label={
                    <Typography.Text>{displayName}
                        {description &&
                            <>
                                {' '}
                                <Popover content={<StrapiRichText content={description} />}>
                                    <QuestionCircleOutlined style={{ color: colorInfo, fontSize: customfontSizeIcon, cursor: "pointer" }} />
                                </Popover>
                            </>
                        }
                    </Typography.Text>}
                rules={[
                    {
                        required,
                    },

                ]}
            >
                <Input placeholder={shortDescription} />
            </Form.Item>
        )
}
