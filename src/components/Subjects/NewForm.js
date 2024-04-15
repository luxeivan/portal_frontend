import React from "react";
import { Divider, Form, Button } from "antd";
import TextInput from "../FormComponents/TextInput";
import SelectInput from "../FormComponents/SelectInput";
import AddressInput from "../FormComponents/AddressInput";
import SnilsInput from "../FormComponents/SnilsInput";
import { formItemLayout } from "../../components/configSizeForm";

export default function NewForm({
  handlerDelete,
  fields,
  read = false,
  edit = false,
  value = false,
  setShowModal,
}) {
  const [form] = Form.useForm();
  return (
    <>
      <Form form={form} {...formItemLayout}>
        {fields?.length > 0 &&
          fields.map((field, index) => {
            //console.log(value);
            if (field.type === "divider")
              return <Divider key={index}>{field.name}</Divider>;
            if (field.type === "textInput")
              return (
                <TextInput
                  key={index}
                  displayName={field.displayName}
                  name={field.name}
                  required={field.required}
                  description={field.description}
                  placeholder={field.placeholder}
                  read={read}
                  edit={edit}
                  depends={field.depends}
                  value={value ? value[field.name] : undefined}
                />
              );
            if (field.type === "selectInput")
              return (
                <SelectInput
                  key={index}
                  displayName={field.displayName}
                  name={field.name}
                  required={field.required}
                  description={field.description}
                  placeholder={field.placeholder}
                  read={read}
                  edit={edit}
                  options={field.options}
                  depends={field.depends}
                  value={value ? value[field.name] : null}
                />
              );
            if (field.type === "addressInput")
              return (
                <AddressInput
                  form={form}
                  key={index}
                  displayName={field.displayName}
                  name={field.name}
                  required={field.required}
                  description={field.description}
                  placeholder={field.placeholder}
                  read={read}
                  edit={edit}
                  options={field.options}
                  depends={field.depends}
                  value={value ? value[field.name] : null}
                />
              );
            if (field.type === "snilsInput")
              return (
                <SnilsInput
                  key={index}
                  displayName={field.displayName}
                  name={field.name}
                  required={field.required}
                  description={field.description}
                  placeholder={field.placeholder}
                  read={read}
                  edit={edit}
                  options={field.options}
                  depends={field.depends}
                  value={value ? value[field.name] : null}
                />
              );
          })}
        {!read && (
          <Form.Item>
            <Button type="primary" onClick={() => form.submit()}>
              Добавить
            </Button>
            {"   "}
            <Button onClick={() => setShowModal(false)}>Закрыть</Button>
          </Form.Item>
        )}
      </Form>
      {read && (
        <Form.Item>
          <Button type="primary" onClick={() => console.log("Изменить")}>
            Изменить
          </Button>
          {"   "}
          <Button type="primary" danger onClick={() => handlerDelete(value.id)}>
            Удалить
          </Button>
          {"   "}
          <Button onClick={() => setShowModal(false)}>Закрыть</Button>
        </Form.Item>
      )}
    </>
  );
}



// import React from "react";
// import { Divider, Form, Button } from "antd";
// import TextInput from "../FormComponents/TextInput";
// import SelectInput from "../FormComponents/SelectInput";
// import AddressInput from "../FormComponents/AddressInput";
// import SnilsInput from "../FormComponents/SnilsInput";
// import { formItemLayout } from "../../components/configSizeForm";

// export default function NewForm({
//   fields,
//   read = false,
//   edit = false,
//   value = false,
//   setShowModal,
// }) {
//   const [form] = Form.useForm();
//   return (
//     <>
//       <Form form={form} {...formItemLayout}>
//         {fields?.length > 0 &&
//           fields.map((field, index) => {
//             console.log(value[field.name]);
//             if (field.type === "divider")
//               return <Divider key={index}>{field.name}</Divider>;
//             if (field.type === "textInput")
//               return (
//                 <TextInput
//                   key={index}
//                   displayName={field.displayName}
//                   name={field.name}
//                   required={field.required}
//                   description={field.description}
//                   placeholder={field.placeholder}
//                   read={read}
//                   edit={edit}
//                   depends={field.depends}
//                   value={value ? value[field.name] : undefined}
//                 />
//               );
//             if (field.type === "selectInput")
//               return (
//                 <SelectInput
//                   key={index}
//                   displayName={field.displayName}
//                   name={field.name}
//                   required={field.required}
//                   description={field.description}
//                   placeholder={field.placeholder}
//                   read={read}
//                   edit={edit}
//                   options={field.options}
//                   depends={field.depends}
//                   value={value ? value[field.name] : null}
//                 />
//               );
//             if (field.type === "addressInput")
//               return (
//                 <AddressInput
//                   key={index}
//                   displayName={field.displayName}
//                   name={field.name}
//                   required={field.required}
//                   description={field.description}
//                   placeholder={field.placeholder}
//                   read={read}
//                   edit={edit}
//                   options={field.options}
//                   depends={field.depends}
//                   value={value ? value[field.name] : null}
//                 />
//               );
//             if (field.type === "snilsInput")
//               return (
//                 <SnilsInput
//                   key={index}
//                   displayName={field.displayName}
//                   name={field.name}
//                   required={field.required}
//                   description={field.description}
//                   placeholder={field.placeholder}
//                   read={read}
//                   edit={edit}
//                   options={field.options}
//                   depends={field.depends}
//                   value={value ? value[field.name] : null}
//                 />
//               );
//           })}
//         {!read && (
//           <Form.Item>
//             <Button type="primary" onClick={() => form.submit()}>
//               Добавить
//             </Button>
//             {"   "}
//             <Button onClick={() => setShowModal(false)}>Закрыть</Button>
//           </Form.Item>
//         )}
//       </Form>
//       {read && (
//         <Form.Item>
//           <Button type="primary" onClick={() => console.log("Изменить")}>
//             Изменить
//           </Button>
//           {"   "}
//           <Button type="primary" danger onClick={() => console.log("Удалить")}>
//             Удалить
//           </Button>
//           {"   "}
//           <Button onClick={() => setShowModal(false)}>Закрыть</Button>
//         </Form.Item>
//       )}
//     </>
//   );
// }
