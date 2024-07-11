import { Form, theme } from "antd";
import { MaskedInput } from "antd-mask-input";

export default function TextInput({
  name = "name",
  label = "Label",
  required = false,
  dependOf = false,
  howDepend = false,
  mask = false,
}) {
  const { token } = theme.useToken();
  const form = Form.useFormInstance();
  const fieldDepends = Form.useWatch(dependOf, form);

  console.log(token);
  const formElement = (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: required,
          message: "Это поле обязательное",
        },
      ]}
    >
      <MaskedInput
        mask={mask}
        style={{
          backgroundColor: token.colorBgContainer,
        }}
        className={"ant-picker-outlined"}
      />
    </Form.Item>
  );
  if (!dependOf) return formElement;
  if (dependOf && howDepend && howDepend.values.length > 0) {
    let show = false;
    howDepend.values.forEach((item) => {
      if (item.value === "true") item.value = true;
      if (item.value == fieldDepends) show = true;
    });
    if (show) return formElement;
  }
  if (dependOf && howDepend && howDepend.min && howDepend.max) {
    if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max)
      return formElement;
  }
}
