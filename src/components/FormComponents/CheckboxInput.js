import { QuestionCircleOutlined } from '@ant-design/icons';
import { Checkbox, Form, Popover, theme } from 'antd';
import React from 'react'
import StrapiRichText from '../StrapiRichText';

const onChange = (e) => {
    //console.log(`checked = ${e.target.checked}`);
};
export default function CheckboxInput({ displayName, name, shortDescription, required, description, depends }) {
    const { colorInfo, customfontSizeIcon } = theme.useToken().token;
    const form = Form.useFormInstance();
    const show = Form.useWatch(depends?.showIf.nameField, form);    
    if (show)
        return (
            <Form.Item
                name={name}
                valuePropName="checked"
                rules={[
                    {
                        required,
                    },

                ]}
            >
                <Checkbox onChange={onChange}>{displayName}
                    {description &&
                        <>
                            {' '}
                            <Popover content={<StrapiRichText content={description} />}>
                                <QuestionCircleOutlined style={{ color: colorInfo, fontSize: customfontSizeIcon, cursor: "pointer" }} />
                            </Popover>
                        </>
                    }
                </Checkbox>
            </Form.Item >
        )
}
