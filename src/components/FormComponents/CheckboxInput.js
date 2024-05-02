// import React from "react";
// import { Form, Checkbox } from "antd";

// const CheckboxInput = ({ name, displayName, bindFields, form, read }) => {
//   const onChange = (e) => {
//     console.log("Checkbox changed", e.target.checked);
//     const checked = e.target.checked;
//     const fieldsValue = {};

//     bindFields.forEach(({ source, target }) => {
//         console.log(
//           "Setting",
//           target,
//           "to",
//           checked ? form.getFieldValue(source) : undefined
//         );
//         fieldsValue[target] = checked ? form.getFieldValue(source) : undefined;
//       });

//       console.log("Fields to set", fieldsValue);
//       form.setFieldsValue(fieldsValue);
//     };

//   return (
//     <Form.Item name={name} valuePropName="checked">
//       <Checkbox onChange={onChange} disabled={read}>
//         {displayName}
//       </Checkbox>
//     </Form.Item>
//   );
// };

// export default CheckboxInput;

import { QuestionCircleOutlined } from "@ant-design/icons";
import { Checkbox, Form, Popover, theme, Drawer } from "antd";
import React, { useState } from "react";
import StrapiRichText from "../StrapiRichText";

const onChange = (e) => {
  //console.log(`checked = ${e.target.checked}`);
};
export default function CheckboxInput({
  displayName,
  name,
  shortDescription,
  required,
  description,
  depends,
}) {
  const { colorInfo, customfontSizeIcon } = theme.useToken().token;
  const [drawerVisible, setDrawerVisible] = useState(false);
  const showDrawer = () => setDrawerVisible(true);
  const onClose = () => setDrawerVisible(false);
  // -----------------
  const form = Form.useFormInstance();
  let show = true;
  let showTemp =
    Form.useWatch(depends?.showIf ? depends?.showIf?.nameField : "", form) ===
    depends?.showIf?.eq;
  if (depends && showTemp) show = true;
  else if (!depends) show = true;
  else show = false;
  // -----------------
  if (show)
    return (
      <>
        <Form.Item
          name={name}
          valuePropName="checked"
          rules={[
            {
              required,
            },
          ]}
        >
          <Checkbox>{displayName}</Checkbox>
        </Form.Item>
        {description && (
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
        )}
      </>
    );
}
