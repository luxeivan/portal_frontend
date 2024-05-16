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
  description = "Нет описания",
  depends,
  inputProps,
  read,
  edit,
  rules,
  value,
}) {
  const { colorBorder, customfontSizeIcon } = theme.useToken().token;
  // -------------------------------------
  const form = Form.useFormInstance();
  //Form.useWatch([], form)
  let show = true;
  let showTemp =
    Form.useWatch(depends?.showIf ? depends?.showIf?.nameField : "", form) ===
    depends?.showIf?.eq;
  if (depends && showTemp) show = true;
  else if (!depends) show = true;
  else show = false;
  // -------------------------------------

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
          rules={
            !read && rules
              ? [{ required, message: `` }, ...rules]
              : [{ required, message: `` }]
          }
          initialValue={value}
        >
          {!read && (
            <Input
              placeholder={placeholder}
              suffix={
                <InfoCircleOutlined style={iconStyle} onClick={showDrawer} />
              }
              {...inputProps}
            />
          )}
          {read && <Typography.Text>{value}</Typography.Text>}
        </Form.Item>

        <Drawer
          title={displayName}
          placement="right"
          onClose={onClose}
          open={drawerVisible}
        >
          <StrapiRichText content={description} />
        </Drawer>
      </>
    );
  }
}

// import React, { useState } from "react";
// import { Form, Input, Typography, Drawer, theme } from "antd";
// import { InfoCircleOutlined } from "@ant-design/icons";
// import StrapiRichText from "../StrapiRichText";
// import { formItemLayout } from "../../components/configSizeForm";

// export default function TextInput({
//   displayName,
//   name,
//   placeholder,
//   required,
//   description = 'Нет описания',
//   depends,
//   inputProps,
//   read,
//   edit,
//   rules,
//   value
// }) {
//   const { colorBorder, customfontSizeIcon } = theme.useToken().token;
//   // -------------------------------------
//   const form = Form.useFormInstance();
//   //Form.useWatch([], form)
//   let show = true
//   let showTemp = Form.useWatch(depends?.showIf ? depends?.showIf?.nameField : '', form) === depends?.showIf?.eq;
//   if (depends && showTemp)
//     show = true
//   else if (!depends)
//     show = true
//   else show = false
//   // -------------------------------------

//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const showDrawer = () => setDrawerVisible(true);
//   const onClose = () => setDrawerVisible(false);

//   const iconStyle = {
//     color: colorBorder,
//     fontSize: customfontSizeIcon,
//     cursor: "pointer",
//     marginLeft: "5px",
//   };

//   if (show) {
//     return (
//       <>
//         <Form.Item
//           {...formItemLayout}
//           name={name}
//           label={<Typography.Text>{displayName}</Typography.Text>}
//           rules={
//             // () => {
//             //   if (!read) {
//             //     if (rules) {
//             //       return [{ required, message: `` }, ...rules]
//             //     } else {
//             //       return [{ required, message: `` }]
//             //     }
//             //   }
//             // }
//             !read && rules ? [{ required, message: `` }, ...rules] : [{ required, message: `` }]
//           }
//           initialValue={value}
//         >
//           {/* <div style={{ display: "flex", alignItems: "center" }}> */}
//           {!read &&
//             <Input
//               placeholder={placeholder}
//               suffix={<InfoCircleOutlined style={iconStyle} onClick={showDrawer} />}
//               // style={{ paddingRight: "30px" }}
//               {...inputProps}
//             //defaultValue={value}
//             //value={value}
//             />
//           }
//           {read &&
//             <Typography.Text>{value}</Typography.Text>
//           }
//           {/* {!read && <InfoCircleOutlined style={iconStyle} onClick={showDrawer} />} */}
//           {/* </div> */}
//         </Form.Item>

//         <Drawer
//           title={displayName}
//           placement="right"
//           onClose={onClose}
//           open={drawerVisible}
//         >
//           <StrapiRichText
//             content={description}
//           />
//         </Drawer>

//       </>
//     );
//   }
// }
