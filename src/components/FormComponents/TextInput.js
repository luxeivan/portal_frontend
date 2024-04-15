import React, { useState } from "react";
import { Form, Input, Typography, Drawer, theme } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import StrapiRichText from "../StrapiRichText";
import { formItemLayout } from "../../components/configSizeForm";

export default function TextInput({
  displayName,
  name,
  placeholder,
  required,
  description,
  depends,
  inputProps,
  read,
  edit,
  value
}) {
  const { colorBorder, customfontSizeIcon } = theme.useToken().token;
  // -------------------------------------
  const form = Form.useFormInstance();
  let show = true
  let showTemp = Form.useWatch(depends?.showIf?.nameField, form) === depends?.showIf?.eq;
  if (depends && showTemp)
    show = true
  else if (!depends)
    show = true
  else show = false
  // -------------------------------------
  // console.log(depends)
  //   console.log(Form.useWatch(depends?.[0]?.showIf?.nameField, form))
  // }


  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const onClose = () => setDrawerVisible(false);

  const iconStyle = {
    color: colorBorder,
    fontSize: customfontSizeIcon,
    cursor: "pointer",
    marginLeft: "5px",
  };

  if (show) {
    return (
      <>
        <Form.Item
          {...formItemLayout}
          name={name}
          label={<Typography.Text>{displayName}</Typography.Text>}
          rules={!read && [{ required, message: `` }]}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {!read &&
              <Input
                placeholder={placeholder}
                style={{ paddingRight: "30px" }}
                {...inputProps}
                value={value}
              />
            }
            {read &&
              <Typography.Text>{value}</Typography.Text>
            }
            {!read && <InfoCircleOutlined style={iconStyle} onClick={showDrawer} />}
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
