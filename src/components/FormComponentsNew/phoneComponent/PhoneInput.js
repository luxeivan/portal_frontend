import React from "react";
import { Form, theme } from "antd";
import ReactInputMask from "react-input-mask";
import styles from "./Phone.module.css";
import WrapperComponent from "../WrapperComponent";
import InfoDrawer from "../../InfoDrawer";

import useProfile from "../../../../src/stores/Cabinet/useProfile";

export default function PhoneInput({
  name = "mobilePhone",
  label = "Мобильный телефон",
  disabled = false,
  placeholder = "+7 (XXX) XXX-XX-XX",
  required = false,
  dependOf = false,
  howDepend = false,
  span = false,
  fullDescription = false,
  stylesField_key = false,
}) {
  const { colorBorderBg, colorText, colorBorder } = theme.useToken().token;
  const { profile } = useProfile();

  const isAdditionalPhone = name === "dc284366-c637-441d-b552-dcf24ad603af";
  const phoneFromProfile = isAdditionalPhone ? "" : profile.phone || "";

  console.log("[PhoneInput] prop name:", name);
  console.log("[PhoneInput] profile.phone:", profile.phone);
  console.log("[PhoneInput] Подставляем в initialValue:", phoneFromProfile);

  return (
    <WrapperComponent
      span={span}
      stylesField_key={stylesField_key}
      dependOf={dependOf}
      howDepend={howDepend}
      name={name}
    >
      <Form.Item noStyle shouldUpdate>
        {(formInstance) => {
          const errors = formInstance.getFieldError(name) || [];
          const hasError = errors.length > 0;

          return (
            <Form.Item
              name={name}
              label={
                fullDescription ? (
                  <InfoDrawer fullDescription={fullDescription}>
                    {label}
                  </InfoDrawer>
                ) : (
                  label
                )
              }
              rules={[
                {
                  required: required,
                  message: "Это поле обязательное",
                },
              ]}
              initialValue={phoneFromProfile}
              validateStatus={hasError ? "error" : ""}
              help={hasError ? errors[0] : undefined}
            >
              <ReactInputMask
                mask="+7 (999) 999-99-99"
                disabled={disabled}
                placeholder={placeholder}
                className={`ant-input ant-input-outlined ${styles.inputMask}`}
                style={{
                  backgroundColor: colorBorderBg,
                  color: colorText,
                  border: hasError
                    ? "1px solid red"
                    : `1px solid ${colorBorder}`,
                  fontSize: 18,
                }}
              />
            </Form.Item>
          );
        }}
      </Form.Item>
    </WrapperComponent>
  );
}

//Старый
// import React from "react";
// import { Form, theme } from "antd";
// import ReactInputMask from "react-input-mask";
// import styles from "./Phone.module.css";
// import WrapperComponent from "../WrapperComponent";
// import InfoDrawer from "../../InfoDrawer";

// export default function PhoneInput({
//   name = "name",
//   label = "Label",
//   disabled = false,
//   placeholder = "placeholder",
//   required = false,
//   dependOf = false,
//   howDepend = false,
//   span = false,
//   fullDescription = false,
//   stylesField_key = false,
// }) {
//   const { colorBorderBg, colorText, colorBorder } = theme.useToken().token;
//   // console.log(theme.useToken().token)
//   const form = Form.useFormInstance();
//   // console.log(dependOf)
//   // let fieldDepends = Form.useWatch(dependOf, form);
//   const formElement = (
//     <Form.Item
//       name={name}
//       label={
//         fullDescription ? (
//           <InfoDrawer fullDescription={fullDescription}>{label}</InfoDrawer>
//         ) : (
//           label
//         )
//       }
//       rules={[
//         {
//           required: required,
//           message: "Это поле обязательное",
//         },
//       ]}
//     >
//       <ReactInputMask
//         mask="+7 (999) 999-99-99"
//         placeholder="+7 (XXX) XXX-XX-XX"
//         className={`ant-input ant-input-outlined ant-input-status-success ${styles.inputMask}`}
//         style={{
//           backgroundColor: colorBorderBg,
//           color: colorText,
//           border: `1px solid ${colorBorder}`,
//           fontSize: 18,
//         }}
//       />
//     </Form.Item>
//   );

//   // if (!dependOf) return formElement
//   // if (dependOf && howDepend && howDepend.options?.length > 0) {
//   //     let show = false
//   //     if (typeof fieldDepends === "undefined") fieldDepends = false
//   //     howDepend.options.forEach(item => {
//   //         if (item.value === "true") item.value = true
//   //         if (item.value === "false") item.value = false;
//   //         if (item.value == fieldDepends) show = true
//   //     })
//   //     if (show) return formElement
//   // }
//   // if (dependOf && howDepend && howDepend.max) {
//   //     // form.setFieldValue(name, '')
//   //     if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max) return formElement
//   // }
//   return (
//     <WrapperComponent
//       span={span}
//       stylesField_key={stylesField_key}
//       dependOf={dependOf}
//       howDepend={howDepend}
//       name={name}
//     >
//       {formElement}
//     </WrapperComponent>
//   );
// }
