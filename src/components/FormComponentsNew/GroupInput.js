import React from "react";
import { Form,  Typography, theme,  Row } from "antd";
// import moment from "moment";
// import styles from './GroupInput.module.css'
import selectComponent from "../selectComponent";
import WrapperComponent from "./WrapperComponent";

export default function GroupInput({
  name = "name",
  label = "",
  // disabled = false,
  // placeholder = "placeholder",
  // required = false,
  // options = [],
  dependOf = false,
  howDepend = false,
  fields: Fields = [],
  // layout = "vertical",
  // backgroundColorHex = false,
  border = true,
  stylesField_key = false,
  span = false
}) {
  const { colorBgBase, colorBgContainer, colorBorder } = theme.useToken().token
  // const [openModal, setOpenModal] = useState(false)
  // const [items, setItems] = useState(false)
  const mainForm = Form.useFormInstance()
  /
  console.log(stylesField_key)
  const formElement = (
    

      <div style={{
        backgroundColor: colorBgContainer,
        // border: border ? `1px solid ${colorBorder}` : undefined,
        borderColor: colorBorder,
        color:colorBorder
      }}
        className={'formElement groupInput'}
      >
        <Typography.Title level={5} style={{ margin: "0 0 10px 0" }}>{label}</Typography.Title>

        {/* {items &&
        <Descriptions size="small" style={{ width: "100%", marginBottom: "10px", border: 0 }} items={items} column={1} bordered />
        } */}
        {/* <Flex
        vertical={layout === 'vertical' ? true : undefined}
        gap={layout === 'vertical' ? 0 : 10}
        align={layout === 'vertical' ? undefined : "flex-end"}
        > */}
        <Row
          gutter={[20, 20]}
          align={"stretch"}
        >
          {Fields.map(selectComponent)}
        </Row>
        {/* </Flex> */}
      </div>
  );

  // if (!dependOf) return formElement;
  // if (dependOf && howDepend && howDepend.options?.length > 0) {
  //   let show = false;
  //   if (typeof fieldDepends === "undefined") fieldDepends = false
  //   howDepend.options.forEach((item) => {
  //     if (item.value === "true") item.value = true;
  //     if (item.value === "false") item.value = false;
  //     if (item.value == fieldDepends) show = true;
  //   });
  //   if (show) return formElement;
  // }
  // if (dependOf && howDepend && howDepend.max) {
  //   mainForm.setFieldValue(name, "");
  //   if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max)
  //     return formElement;
  // }
  return <WrapperComponent span={span} stylesField_key={stylesField_key} dependOf={dependOf} howDepend={howDepend} name={name}>{formElement}</WrapperComponent>
}