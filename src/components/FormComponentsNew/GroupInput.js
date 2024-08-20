import React from "react";
import { Form, Collapse } from "antd";
import TextInput from "../../components/FormComponentsNew/TextInput";
import NumberInput from "../../components/FormComponentsNew/NumberInput";
import SliderInput from "../../components/FormComponentsNew/SliderInput";
import SelectInput from "../../components/FormComponentsNew/SelectInput";
import DateInput from "../../components/FormComponentsNew/DateInput";
import DividerForm from "../../components/FormComponentsNew/DividerForm";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import SnilsInput from "./SnilsInput";
import PhoneInput from "./phoneComponent/PhoneInput";

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
}) {
  const form = Form.useFormInstance();
  // console.log(dependOf)
  const nameTable = name;
  let fieldDepends = Form.useWatch(dependOf, form);
  const formElement = (
    <Collapse
      items={[
        {
          key: "1",
          label: label,
          children: (
            <>
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
                  item.component_Type.includes("EnumInput")
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
              })}
            </>
          ),
        },
      ]}
      defaultActiveKey={[]} //или 1
      style={{ marginBottom: 24 }}
    />
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
    form.setFieldValue(name, "");
    if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max)
      return formElement;
  }
}
