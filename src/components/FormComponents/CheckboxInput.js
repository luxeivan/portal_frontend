import { QuestionCircleOutlined } from '@ant-design/icons';
import { Checkbox, Form, Popover, theme,Drawer } from 'antd';
import React,{useState} from 'react'
import StrapiRichText from '../StrapiRichText';

const onChange = (e) => {
    //console.log(`checked = ${e.target.checked}`);
};
export default function CheckboxInput({ displayName, name, shortDescription, required, description, depends }) {
    const { colorInfo, customfontSizeIcon } = theme.useToken().token;
    const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const onClose = () => setDrawerVisible(false);
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
                <Checkbox>{displayName}
                    {description &&
                        <Drawer
                            title={displayName}
                            placement="right"
                            onClose={onClose}
                            open={drawerVisible}
                        >
                            
                            <StrapiRichText
                                content={Array.isArray(description) ? description : [description]}
                            />
                        </Drawer>
                    }
                </Checkbox>
            </Form.Item >
        )
}
