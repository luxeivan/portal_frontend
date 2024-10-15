import React, { useEffect } from "react";
import { Form, Switch } from "antd";

export default function SwitchInput({
  name = "name",
  label = "Label",
  defaultValue = false,
  required = false,
  dependOf = false,
  howDepend = false,
}) {
  const form = Form.useFormInstance();

  // Используем Form.useWatch для отслеживания изменения значений, от которых зависит данный компонент
  const fieldDepends = Form.useWatch(dependOf, form);

  // Устанавливаем начальное значение переключателя при первом рендере компонента
  useEffect(() => {
    if (form.getFieldValue(name) === undefined) {
      form.setFieldValue(name, defaultValue);
    }
  }, [form, name, defaultValue]);

  // Основной элемент формы, создающий переключатель, оставляем пробел {" "}
  const formElement = (
    <Form.Item
      name={name}
      label={label}
      valuePropName="checked" // Позволяет Form управлять значением Switch
      rules={[
        {
          required: required,
          message: "Это поле обязательное",
        },
      ]}
    >
      <Switch onChange={(checked) => handleSwitchChange(checked)} />{" "}
    </Form.Item>
  );

  // Функция для обработки изменений переключателя
  const handleSwitchChange = (checked) => {
    form.setFieldValue(name, checked);
    form.validateFields(); // Перепроверяем поля для корректного отображения зависимостей
  };

  // Проверяем наличие зависимостей и возвращаем компонент в зависимости от условий
  if (!dependOf) {
    return formElement;
  }

  // Логика обработки зависимостей
  if (howDepend && howDepend.options?.length > 0) {
    let show = false;

    // Обрабатываем fieldDepends, если оно не определено
    if (typeof fieldDepends === "undefined") fieldDepends = false;

    // Проверка условий, чтобы показать элемент, если зависимости соответствуют условиям
    howDepend.options.forEach((item) => {
      if (item.value === "true") item.value = true;
      if (item.value === "false") item.value = false;
      if (item.value === fieldDepends) show = true;
    });

    if (show) return formElement;
  }

  // Проверка на диапазон значений зависимости, если указаны min и max
  if (howDepend && howDepend.max) {
    if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max) {
      return formElement;
    }
  }

  // Возвращаем null, если условия не выполнены (т.е. не отображаем переключатель)
  return null;
}

// import React from "react";
// import { Form, Switch } from "antd";

// export default function SwitchInput({
//   name = "name",
//   label = "Label",
//   defaultValue = false,
//   required = false,
//   dependOf = false,
//   howDepend = false,
// }) {
//   const form = Form.useFormInstance();
//   let fieldDepends = Form.useWatch(dependOf, form);

//   const formElement = (
//     <Form.Item
//       name={name}
//       label={label}
//       rules={[
//         {
//           required: required,
//           message: "Это поле обязательное",
//         },
//       ]}
//       initialValue={defaultValue}
//     >
//       <Switch />
//     </Form.Item>
//   );

//   if (!dependOf) return formElement;
//   if (dependOf && howDepend && howDepend.options?.length > 0) {
//     let show = false;
//     if (typeof fieldDepends === "undefined") fieldDepends = false;
//     howDepend.options.forEach((item) => {
//       if (item.value === "true") item.value = true;
//       if (item.value === "false") item.value = false;
//       if (item.value == fieldDepends) show = true;
//     });
//     if (show) return formElement;
//   }
//   if (dependOf && howDepend && howDepend.max) {
//     if (fieldDepends >= howDepend.min && fieldDepends <= howDepend.max)
//       return formElement;
//   }
// }
