import React, { useState } from "react";
import { Form, Select, Typography, Drawer, theme } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import StrapiRichText from "../StrapiRichText";
import { formItemLayout } from "../../components/configSizeForm";

const { Option } = Select;

export default function SelectInput({
  displayName,
  name,
  required,
  description,
  options,
  onChange,
  depends,
  defaultValue
}) {
  const { colorBorder, customfontSizeIcon } = theme.useToken().token;
  const form = Form.useFormInstance();
  const show = Form.useWatch(depends?.showIf.nameField, form);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const onClose = () => setDrawerVisible(false);

  const iconStyle = {
    color: colorBorder,
    fontSize: customfontSizeIcon,
    cursor: "pointer",
    marginLeft: "5px",
    pointerEvents: 'none',
  };

  if (show) {
    return (
      <>
        <Form.Item
          {...formItemLayout}
          name={name}
          label={<Typography.Text>{displayName}</Typography.Text>}
          rules={[{ required,  message: `` }]}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Select
            defaultValue={defaultValue}
              onChange={onChange}
              placeholder="Выберите вариант"
              // style={{ paddingRight: "30px" }}
            >
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <InfoCircleOutlined style={iconStyle} onClick={showDrawer} />
          </div>
        </Form.Item>
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
      </>
    );
  }
}
