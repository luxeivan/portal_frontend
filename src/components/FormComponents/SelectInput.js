import React, { useState } from "react";
import { Form, Select, Typography, Drawer, theme, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import StrapiRichText from "../StrapiRichText";
import { formItemLayout } from "../../components/configSizeForm";

export default function SelectInput({
  displayName,
  name,
  required,
  description,
  options,
  onChange,
  depends,
  read,
  edit,
  value,
}) {
  const { colorBorder, customfontSizeIcon } = theme.useToken().token;
  // ----------------------------------------
  const form = Form.useFormInstance();
  let show = true;
  let showTemp =
    Form.useWatch(depends?.showIf?.nameField, form) === depends?.showIf?.eq;
  if (depends && showTemp) show = true;
  else if (!depends) show = true;
  else show = false;
  // ----------------------------------------
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
      <Form.Item
        {...formItemLayout}
        label={<Typography.Text>{displayName}</Typography.Text>}
        name={name}
      >
        {!read && (
          <Select
            placeholder="Выберите вариант"
            options={options}
            onChange={onChange}
          />
        )}
        {read && <Typography.Text>{value}</Typography.Text>}
      </Form.Item>
    );
  }
}
