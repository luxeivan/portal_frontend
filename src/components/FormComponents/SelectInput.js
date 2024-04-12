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
  defaultValue,
  read,
  edit,
  value
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
  };

  if (show) {
    return (

      // <Form.Item
      //   {...formItemLayout}
      //   name={name}
      //   label={<Typography.Text>{displayName}</Typography.Text>}
      //   rules={!read && [{ required, message: `` }]}
      // >
      //   <div style={{ display: "flex", alignItems: "center" }}>
      //     {!read &&
      //       <Select
      //         defaultValue={defaultValue}                
      //         placeholder="Выберите вариант"
      //         options={options}
      //       />
      //     }
      //     {read &&
      //       <Typography.Text>{value}</Typography.Text>
      //     }

      //     {!read && <InfoCircleOutlined style={iconStyle} onClick={showDrawer}/>}
      //   </div>
      // </Form.Item>
      // <div style={{ display: "flex", alignItems: "center" }}>
        <Form.Item
          {...formItemLayout}
          label={<Typography.Text>{displayName}</Typography.Text>}
          name={name}
        >

          <Select
            defaultValue={defaultValue}
            placeholder="Выберите вариант"
            options={options}
          />
        </Form.Item>
        /* {!read && <InfoCircleOutlined style={iconStyle} onClick={showDrawer} />} */
      // </div>
      /* <Drawer
        title={displayName}
        placement="right"
        onClose={onClose}
        open={drawerVisible}
      >
        <StrapiRichText
          content={Array.isArray(description) ? description : [description]}
        />
      </Drawer> */

    );
  }
}
