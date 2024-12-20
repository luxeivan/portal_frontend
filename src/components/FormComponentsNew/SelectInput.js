import React, { useEffect, useState } from "react";
import { Form, Select, Typography } from "antd";
import WrapperComponent from "./WrapperComponent";
import InfoDrawer from "../InfoDrawer";
import useServices from "../../stores/useServices";

export default function SelectInput({
  name = "name",
  label = "",
  autoComplete = false,
  defaultValue = false,
  required = false,
  Ref_Key = false,
  dependOf = false,
  howDepend = false,
  span = false,
  fullDescription = false,
  stylesField_key = false,
}) {
  const serviceItem = useServices((state) => state.serviceItem);
  const options = serviceItem.links[Ref_Key]?.options
  // const [optionsAuto, setOptionsAuto] = useState();
  // const form = Form.useFormInstance();
  // let fieldDepends = Form.useWatch(dependOf, form);

  // useEffect(() => {
  //   if (autoComplete) {
  //     setOptionsAuto(options);
  //   }
  // }, []);

  const formElement = (
    <Form.Item
      name={name}
      label={fullDescription ? <InfoDrawer fullDescription={fullDescription}>{label}</InfoDrawer> : label}
      rules={[
        {
          required: required,
          message: "Это поле обязательное",
        },
      ]}
      style={{ maxWidth: "100%", overflow: "hidden" }}
      initialValue={defaultValue}
    >
      <Select
        style={{ width: "100%" }}
        showSearch
        optionFilterProp="label"
        options={options}
        // dropdownStyle={{ backgroundColor: "#eee", whiteSpace: "pre-wrap" }}
        optionRender={(option) => {
          // console.log(option)
          return <Typography.Paragraph style={{ width: "100%", whiteSpace: "pre-wrap", marginBottom: 5 }}>{option.label}</Typography.Paragraph>
        }}
      />
    </Form.Item>
  );

  // if (!dependOf) return formElement;

  // if (dependOf && howDepend && howDepend.options?.length > 0) {
  //   let show = false;

  //   if (typeof fieldDepends === "undefined") fieldDepends = false;
  //   howDepend.options.forEach((item) => {
  //     if (item.value === "true") item.value = true;
  //     if (item.value === "false") item.value = false;
  //     if (item.value === fieldDepends) show = true;
  //   });

  //   if (show) return formElement;
  // }
  // if (dependOf && howDepend && howDepend.max) {
  //   if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max)
  //     return formElement;
  // }
  return <WrapperComponent span={span} stylesField_key={stylesField_key} dependOf={dependOf} howDepend={howDepend} name={name}>{formElement}</WrapperComponent>
}
