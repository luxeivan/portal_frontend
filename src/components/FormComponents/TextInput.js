import React, { useState } from "react";
import { Form, Input, Typography, Drawer, theme } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import StrapiRichText from "../StrapiRichText";
import { formItemLayout } from "../../components/configSizeForm";

export default function TextInput({
  displayName,
  name,
  shortDescription,
  required,
  description,
  depends,
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
      <>
        <Form.Item
          {...formItemLayout}
          name={name}
          label={<Typography.Text>{displayName}</Typography.Text>}
          rules={[{ required }]}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
              placeholder={shortDescription}
              style={{ paddingRight: "30px" }}
            />
            <InfoCircleOutlined style={iconStyle} onClick={showDrawer} />
          </div>
        </Form.Item>
        <Drawer
          title={displayName}
          placement="right"
          onClose={onClose}
          visible={drawerVisible}
        >
          <StrapiRichText
            content={Array.isArray(description) ? description : [description]}
          />
        </Drawer>
      </>
    );
  }
}

// import { Form, Input, Typography, Popover, theme } from "antd";
// import { InfoCircleOutlined } from "@ant-design/icons";
// import React from "react";
// import StrapiRichText from "../StrapiRichText";
// import { formItemLayout } from "../../components/configSizeForm";

// export default function TextInput({
//   displayName,
//   name,
//   shortDescription,
//   required,
//   description,
//   depends,
// }) {
//   const { colorBorder, customfontSizeIcon } = theme.useToken().token;
//   const form = Form.useFormInstance();
//   const show = Form.useWatch(depends?.showIf.nameField, form);

//   const iconStyle = {
//     color: colorBorder,
//     fontSize: customfontSizeIcon,
//     cursor: "pointer",
//     marginLeft: '5px'
//   };

//   if (show) {
//     return (
//       <Form.Item
//         {...formItemLayout}
//         name={name}
//         label={<Typography.Text>{displayName}</Typography.Text>}
//         rules={[{ required }]}
//       >
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <Input
//             placeholder={shortDescription}
//             style={{ paddingRight: '30px' }}
//           />
//           {description && description.length > 0 && (
//             <Popover
//               content={<StrapiRichText content={Array.isArray(description) ? description : [description]} />}
//               trigger="hover"
//             >
//               <InfoCircleOutlined style={iconStyle} />
//             </Popover>
//           )}
//         </div>
//       </Form.Item>
//     );
//   }
// }

// import { InfoCircleOutlined } from "@ant-design/icons";
// import { Form, Input, Typography, Popover, theme } from "antd";
// import React from "react";
// import StrapiRichText from "../StrapiRichText";
// import { formItemLayout } from "../../components/configSizeForm";

// export default function TextInput({
//   displayName,
//   name,
//   shortDescription,
//   required,
//   description,
//   depends,
// }) {
//   const { colorBorder, customfontSizeIcon } = theme.useToken().token; // Предположим, что colorBorder - это цвет границ инпута
//   const form = Form.useFormInstance();
//   const show = Form.useWatch(depends?.showIf.nameField, form);

//   if (show)
//     return (
//       <Form.Item
//         {...formItemLayout}
//         name={name}
//         label={<Typography.Text>{displayName}</Typography.Text>}
//         rules={[{ required }]}
//       >
//         <Input
//           placeholder={shortDescription}
//           suffix={
//             description && description.length > 0 && (
//               <Popover
//                 content={
//                   <StrapiRichText
//                     content={
//                       Array.isArray(description) ? description : [description]
//                     }
//                   />
//                 }
//               >
//                 <Typography.Text
//                   style={{
//                     color: colorBorder,
//                     fontSize: customfontSizeIcon,
//                     cursor: "pointer",
//                   }}
//                 >
//                   info
//                 </Typography.Text>
//               </Popover>
//             )
//           }
//         />
//       </Form.Item>
//     );
// }

// import { QuestionCircleOutlined } from "@ant-design/icons";
// import { Form, Input, Typography, Popover, theme } from "antd";
// import React from "react";
// import StrapiRichText from "../StrapiRichText";
// import { formItemLayout } from "../../components/configSizeForm";

// export default function TextInput({
//   displayName,
//   name,
//   shortDescription,
//   required,
//   description,
//   depends,
// }) {
//   const { colorInfo, customfontSizeIcon } = theme.useToken().token;
//   const form = Form.useFormInstance();
//   const show = Form.useWatch(depends?.showIf.nameField, form);

//   const content = (
//     <StrapiRichText
//       content={description && description.length > 0 ? description[0] : ""}
//     />
//   );

//   if (show)
//     return (
//       <Form.Item
//         {...formItemLayout}
//         name={name}
//         label={
//           <Typography.Text>
//             {displayName}
//             {description && description.length > 0 && (
//               <>
//                 {" "}
//                 <Popover
//                   content={
//                     <StrapiRichText
//                       content={
//                         Array.isArray(description) ? description : [description]
//                       }
//                     />
//                   }
//                 >
//                   <QuestionCircleOutlined
//                     style={{
//                       color: colorInfo,
//                       fontSize: customfontSizeIcon,
//                       cursor: "pointer",
//                     }}
//                   />
//                 </Popover>
//               </>
//             )}
//           </Typography.Text>
//         }
//         rules={[
//           {
//             required,
//           },
//         ]}
//       >
//         <Input placeholder={shortDescription} />
//       </Form.Item>
//     );
// }
