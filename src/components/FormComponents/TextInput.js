import { QuestionCircleOutlined } from "@ant-design/icons";
import { Form, Input, Typography, Popover, theme } from "antd";
import React from "react";
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
  const { colorInfo, customfontSizeIcon } = theme.useToken().token;
  const form = Form.useFormInstance();
  const show = Form.useWatch(depends?.showIf.nameField, form);

  const content = (
    <StrapiRichText
      content={description && description.length > 0 ? description[0] : ""}
    />
  ); // Обращение к первому элементу массива и его отображение

  if (show)
    return (
      <Form.Item
        {...formItemLayout}
        name={name}
        label={
          <Typography.Text>
            {displayName}
            {description && description.length > 0 && (
              <>
                {" "}
                <Popover
                  content={
                    <StrapiRichText
                      content={
                        Array.isArray(description) ? description : [description]
                      }
                    />
                  }
                >
                  <QuestionCircleOutlined
                    style={{
                      color: colorInfo,
                      fontSize: customfontSizeIcon,
                      cursor: "pointer",
                    }}
                  />
                </Popover>
              </>
            )}
          </Typography.Text>
        }
        rules={[
          {
            required,
          },
        ]}
      >
        <Input placeholder={shortDescription} />
      </Form.Item>
    );
}

// import { QuestionCircleOutlined } from '@ant-design/icons'
// import { Form, Input, Typography, Popover, theme } from 'antd'
// import React from 'react'
// import StrapiRichText from '../StrapiRichText'
// import { formItemLayout } from "../../components/configSizeForm";

// export default function TextInput({ displayName, name, shortDescription, required, description, depends }) {
//     const { colorInfo, customfontSizeIcon } = theme.useToken().token;
//     const form = Form.useFormInstance();
//     const show = Form.useWatch(depends?.showIf.nameField, form);
//     if (show)
//         return (
//             <Form.Item
//             {...formItemLayout}
//                 name={name}
//                 label={
//                     <Typography.Text>{displayName}
//                         {description &&
//                             <>
//                                 {' '}
//                                 <Popover content={<StrapiRichText content={description} />}>
//                                     <QuestionCircleOutlined style={{ color: colorInfo, fontSize: customfontSizeIcon, cursor: "pointer" }} />
//                                 </Popover>
//                             </>
//                         }
//                     </Typography.Text>}
//                 rules={[
//                     {
//                         required,
//                     },

//                 ]}
//             >
//                 <Input placeholder={shortDescription} />
//             </Form.Item>
//         )
// }
