import React, { useState } from "react";
import { Form, Collapse, Button, Modal, Input, Flex, Descriptions } from "antd";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import SliderInput from "./SliderInput";
import SelectInput from "./SelectInput";
import DateInput from "./DateInput";
import DividerForm from "./DividerForm";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import SnilsInput from "./SnilsInput";
import PhoneInput from "./phoneComponent/PhoneInput";
import AddressInput from "./adressComponents/AddressInput";
import ConfirmationDocumentNewInput from "./confirmationDocumentComponents/ConfirmationDocumentNewInput";

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
  mainForm
}) {
  const [openModal, setOpenModal] = useState(false)
  const [items, setItems] = useState(false)
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
    console.log('values', values[name])
    mainForm.setFieldValue(name, values[name])
    setOpenModal(false)
    setItems(Fields.filter(item => !item.component_Type.includes('HiddenInput')).map(item => {
      let val = values[name][item.idLine]
      if (item.component_Type.includes('LinkInput')) { 
        console.log(item.component_Expanded.options.find(option => option.value === val))
        val = item.component_Expanded.options.find(option => option.value === val).label 
      }
      return {
        key: item.idLine,
        label: <div style={{marginLeft:20}}>{item.required ? <span style={{ color: "red" }}>*&ensp;</span> : <span>&ensp;&ensp;</span>}{item.label}</div>,
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
    <div style={{ marginBottom: 20, border: "1px solid lightgray", padding: 10, borderRadius: 10 }}>
      <Flex wrap="wrap">
        <Form.Item
          name={name}
          label={label}
          rules={[
            {
              required: required,
              message: "Это поле обязательное",
            },
          ]}
          layout="horizontal"
          style={{ marginRight: "20px" }}
        >
          <Button type="primary" onClick={handlerOpenModal}>Редактировать</Button>
        </Form.Item>
        <Descriptions items={items} column={1} bordered/>
      </Flex>

      <Modal title={label} open={openModal} onOk={handlerOnOK} onCancel={handlerOnClose} footer={null}>
        <>
          <Form
            scrollToFirstError
            layout="vertical"
            onFinish={handlerOnOK}
            onKeyDown={handleKeyDown}
            style={{ maxWidth: 800, margin: "0 auto" }}
            // labelCol={{
            //   span: 6,
            // }}
            // wrapperCol={{
            //   span: 18,
            // }}
            labelWrap
          >

            {Fields.map((item, index) => {
              if (item.component_Type.includes("Divider"))
                return (
                  <DividerForm
                    key={index}
                    {...item.component_Expanded}
                    label={item.label}
                  />
                );
              if (item.component_Type.includes("TextInput") && item.component_Expanded.specialField === 'Телефон')

                return (
                  <PhoneInput
                    key={index}
                    {...item.component_Expanded}
                    {...item}
                    name={[name, item.idLine]}
                    dependOf={
                      item.dependIdLine ? [name, item.dependIdLine] : false
                    }
                    howDepend={item.dependСondition}
                  />
                );
              if (item.component_Type.includes("TextInput") && item.component_Expanded.specialField === 'СНИЛС')

                return (
                  <SnilsInput
                    key={index}
                    {...item.component_Expanded}
                    {...item}
                    name={[name, item.idLine]}
                    dependOf={
                      item.dependIdLine ? [name, item.dependIdLine] : false
                    }
                    howDepend={item.dependСondition}
                  />
                );
              if (item.component_Type.includes("TextInput"))

                return (
                  <TextInput
                    key={index}
                    {...item.component_Expanded}
                    {...item}
                    name={[name, item.idLine]}
                    dependOf={
                      item.dependIdLine ? [name, item.dependIdLine] : false
                    }
                    howDepend={item.dependСondition}
                  />
                );

              if (item.component_Type.includes("NumberInput"))
                return (
                  <NumberInput
                    key={index}
                    {...item.component_Expanded}
                    {...item}
                    name={[name, item.idLine]}
                    dependOf={
                      item.dependIdLine ? [name, item.dependIdLine] : false
                    }
                    howDepend={item.dependСondition}
                  />
                );
              if (item.component_Type.includes("SliderInput"))
                return (
                  <SliderInput
                    key={index}
                    {...item.component_Expanded}
                    {...item}
                    name={[name, item.idLine]}
                    dependOf={
                      item.dependIdLine ? [name, item.dependIdLine] : false
                    }
                    howDepend={item.dependСondition}
                  />
                );
              if (
                item.component_Type.includes("LinkInput") ||
                item.component_Type.includes("EnumInput") ||
                item.component_Type.includes("SelectInput")
              )
                return (
                  <SelectInput
                    key={index}
                    {...item.component_Expanded}
                    {...item}
                    name={[name, item.idLine]}
                    dependOf={
                      item.dependIdLine
                        ? [nameTable, name, item.dependIdLine]
                        : false
                    }
                    howDepend={item.dependСondition}
                  />
                );
              if (item.component_Type.includes("DateInput"))
                return (
                  <DateInput
                    key={index}
                    {...item.component_Expanded}
                    {...item}
                    name={[name, item.idLine]}
                    dependOf={
                      item.dependIdLine ? [name, item.dependIdLine] : false
                    }
                    howDepend={item.dependСondition}
                  />
                );
              if (item.component_Type.includes("AddressInput"))
                return (
                  <AddressInput
                    key={index}
                    {...item.component_Expanded}
                    {...item}
                    name={item.idLine}
                    dependOf={item.dependIdLine}
                    howDepend={item.dependСondition}
                  />
                );

              if (item.component_Type.includes("ConfirmationDocumentNewInput"))
                return (
                  <ConfirmationDocumentNewInput
                    key={index}
                    {...item.component_Expanded}
                    {...item}
                    name={item.idLine}
                    dependOf={item.dependIdLine}
                    howDepend={item.dependСondition}
                  />
                );
            })}
            <Button type="primary" htmlType="submit">Сохранить</Button>
          </Form>
        </>
      </Modal>

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


// import React from "react";
// import { Form, Collapse } from "antd";
// import TextInput from "../../components/FormComponentsNew/TextInput";
// import NumberInput from "../../components/FormComponentsNew/NumberInput";
// import SliderInput from "../../components/FormComponentsNew/SliderInput";
// import SelectInput from "../../components/FormComponentsNew/SelectInput";
// import DateInput from "../../components/FormComponentsNew/DateInput";
// import DividerForm from "../../components/FormComponentsNew/DividerForm";
// import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
// import SnilsInput from "./SnilsInput";
// import PhoneInput from "./phoneComponent/PhoneInput";

// export default function GroupInput({
//   name = "name",
//   label = "Label",
//   disabled = false,
//   placeholder = "placeholder",
//   required = false,
//   options = [],
//   dependOf = false,
//   howDepend = false,
//   fields: Fields = [],
// }) {
//   const form = Form.useFormInstance();
//   // console.log(dependOf)
//   const nameTable = name;
//   let fieldDepends = Form.useWatch(dependOf, form);
//   const formElement = (
//     <Collapse
//       items={[
//         {
//           key: "1",
//           label: label,
//           children: (
//             <>
//               {Fields.map((item, index) => {
//                 if (item.component_Type.includes("Divider"))
//                   return (
//                     <DividerForm
//                       key={index}
//                       {...item.component_Expanded}
//                       label={item.label}
//                     />
//                   );
//                 if (item.component_Type.includes("TextInput") && item.component_Expanded.specialField === 'Телефон')

//                   return (
//                     <PhoneInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={[name, item.idLine]}
//                       dependOf={
//                         item.dependIdLine ? [name, item.dependIdLine] : false
//                       }
//                       howDepend={item.dependСondition}
//                     />
//                   );
//                 if (item.component_Type.includes("TextInput") && item.component_Expanded.specialField === 'СНИЛС')

//                   return (
//                     <SnilsInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={[name, item.idLine]}
//                       dependOf={
//                         item.dependIdLine ? [name, item.dependIdLine] : false
//                       }
//                       howDepend={item.dependСondition}
//                     />
//                   );
//                 if (item.component_Type.includes("TextInput"))

//                   return (
//                     <TextInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={[name, item.idLine]}
//                       dependOf={
//                         item.dependIdLine ? [name, item.dependIdLine] : false
//                       }
//                       howDepend={item.dependСondition}
//                     />
//                   );

//                 if (item.component_Type.includes("NumberInput"))
//                   return (
//                     <NumberInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={[name, item.idLine]}
//                       dependOf={
//                         item.dependIdLine ? [name, item.dependIdLine] : false
//                       }
//                       howDepend={item.dependСondition}
//                     />
//                   );
//                 if (item.component_Type.includes("SliderInput"))
//                   return (
//                     <SliderInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={[name, item.idLine]}
//                       dependOf={
//                         item.dependIdLine ? [name, item.dependIdLine] : false
//                       }
//                       howDepend={item.dependСondition}
//                     />
//                   );
//                 if (
//                   item.component_Type.includes("LinkInput") ||
//                   item.component_Type.includes("EnumInput") ||
//                   item.component_Type.includes("SelectInput")
//                 )
//                   return (
//                     <SelectInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={[name, item.idLine]}
//                       dependOf={
//                         item.dependIdLine
//                           ? [nameTable, name, item.dependIdLine]
//                           : false
//                       }
//                       howDepend={item.dependСondition}
//                     />
//                   );
//                 if (item.component_Type.includes("DateInput"))
//                   return (
//                     <DateInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={[name, item.idLine]}
//                       dependOf={
//                         item.dependIdLine ? [name, item.dependIdLine] : false
//                       }
//                       howDepend={item.dependСondition}
//                     />
//                   );
//               })}
//             </>
//           ),
//         },
//       ]}
//       defaultActiveKey={[]} //или 1
//       style={{ marginBottom: 24 }}
//     />
//   );
//   if (!dependOf) return formElement;
//   if (dependOf && howDepend && howDepend.options?.length > 0) {
//     let show = false;
//     if (typeof fieldDepends === "undefined") fieldDepends = false
//     howDepend.options.forEach((item) => {
//       if (item.value === "true") item.value = true;
//       if (item.value === "false") item.value = false;
//       if (item.value == fieldDepends) show = true;
//     });
//     if (show) return formElement;
//   }
//   if (dependOf && howDepend && howDepend.max) {
//     form.setFieldValue(name, "");
//     if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max)
//       return formElement;
//   }
// }
