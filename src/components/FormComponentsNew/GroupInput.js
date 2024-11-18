import React, { useState } from "react";
import { Form, Flex, Descriptions, Typography, theme } from "antd";
import moment from "moment";
import styles from './GroupInput.module.css'
import { selectComponent } from "../selectComponent";

export default function GroupInput({
  name = "name",
  label = "Label",
  disabled = false,
  placeholder = "placeholder",
  required = false,
  options = [],
  dependOf = false,
  howDepend = false,
  fields: Fields = [],
  layout = "vertical",
  backgroundColorHex = false,
  border = true
}) {
  const { colorBgBase, colorBgContainer, colorBorder } = theme.useToken().token
  const [openModal, setOpenModal] = useState(false)
  const [items, setItems] = useState(false)
  const mainForm = Form.useFormInstance()
  // const form = Form.useFormInstance();
  //console.log(Fields)
  const nameTable = name;
  let fieldDepends = Form.useWatch(dependOf, mainForm);
  const handlerOpenModal = () => {
    setOpenModal(true)
  }
  const handlerOnClose = () => {
    setOpenModal(false)
  }
  const handlerOnOK = (values) => {
    // console.log('values', values[name])
    mainForm.setFieldValue(name, values[name])
    setOpenModal(false)
    setItems(Fields.filter(item => !item.component_Type.includes('HiddenInput')).map(item => {
      let val = values[item.idLine]
      if (item.component_Type.includes('LinkInput')) {
        // console.log(item.component_Expanded.options.find(option => option.value === val))
        val = item.component_Expanded.options.find(option => option.value === val)?.label
      }
      if (item.component_Type.includes('DateInput')) {
        val = moment(val).format('DD.MM.YYYY');
        // values[key] = moment(value).format();
      }
      if (item.component_Type.includes('AddressInput')) {
        // console.log('val',val)
        if (val) val = val.fullAddress
        // values[key] = moment(value).format();
      }
      if (item.component_Type.includes('SwitchInput')) {
        // console.log('val',val)
        if (val) {
          val = 'Да'

        } else {
          val = 'Нет'

        }
        // values[key] = moment(value).format();
      }
      return {
        key: item.idLine,
        label: <div style={{ marginLeft: 20 }}>{item.required ? <span style={{ color: "red" }}>*&ensp;</span> : <span>&ensp;&ensp;</span>}{item.label}</div>,
        children: val,
      }
    }
    ))
  }
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };
  // const data = false
  // if (typeof mainForm.getFieldValue(name) === "object")  data = Object.entries(mainForm.getFieldValue(name)).map(item=>({

  //     key: item[0],
  //     label: 'UserName',
  //     children: <p>Zhou Maomao</p>,

  // }))
  const formElement = (
    <div style={{
      backgroundColor: backgroundColorHex,
      border: border ? `1px solid ${colorBorder}` : undefined
    }}
      className={'formElement'}
    >
      <Typography.Title level={5} style={{ margin: "0 0 10px 0" }}>{label}</Typography.Title>

      {items &&
        <Descriptions size="small" style={{ width: "100%", marginBottom: "10px", border: 0 }} items={items} column={1} bordered />
      }
      <Flex
        vertical={layout === 'vertical' ? true : undefined}
        gap={layout === 'vertical' ? 0 : 10}
        align={layout === 'vertical' ? undefined : "flex-end"}
      >
        {Fields.map(selectComponent)}
      </Flex>
    </div>
  );

  if (!dependOf) return formElement;
  if (dependOf && howDepend && howDepend.options?.length > 0) {
    let show = false;
    if (typeof fieldDepends === "undefined") fieldDepends = false
    howDepend.options.forEach((item) => {
      if (item.value === "true") item.value = true;
      if (item.value === "false") item.value = false;
      if (item.value == fieldDepends) show = true;
    });
    if (show) return formElement;
  }
  if (dependOf && howDepend && howDepend.max) {
    mainForm.setFieldValue(name, "");
    if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max)
      return formElement;
  }
}