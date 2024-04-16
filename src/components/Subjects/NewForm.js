import React from "react";
import { Divider, Form, Button } from "antd";
import TextInput from "../FormComponents/TextInput";
import SelectInput from "../FormComponents/SelectInput";
import AddressInput from "../FormComponents/AddressInput/AddressInput";
import SnilsInput from "../FormComponents/SnilsInput";
import UploaderInput from "../FormComponents/UploaderInput";
import ConfirmationDocumentInput from "../FormComponents/ConfirmationDocumentInput";
import { formItemLayout } from "../../components/configSizeForm";

const NewForm = ({ fields, read = false, edit = false, value = {}, setShowModal, form, handlerSubmitForm }) => {
  // const [form] = Form.useForm();

  const renderField = (field, index) => {
    switch (field.type) {
      case "divider":
        return <Divider key={index}>{field.name}</Divider>;
      case "textInput":
        return (
          <TextInput
            key={index}
            {...field}
            read={read}
            edit={edit}
            value={value[field.name]}
          />
        );
      case "selectInput":
        return (
          <SelectInput
            key={index}
            {...field}
            read={read}
            edit={edit}
            value={value[field.name]}
          />
        );

      case "uploaderInput":
        return (
          <UploaderInput
            key={index}
            {...field}
            value={value[field.name]}
            read={read}
            edit={edit}
          />
        );
      case "addressInput":
        return (
          <AddressInput
            key={index}
            {...field}
            form={form}
            read={read}
            edit={edit}
            value={value[field.name]}
          />
        );
      case "snilsInput":
        return (
          <SnilsInput
            key={index}
            {...field}
            read={read}
            edit={edit}
            value={value[field.name]}
            form={form}
          />
        );
      case "confirmationDocumentInput":
        return (
          <ConfirmationDocumentInput
            key={index}
            form={form}
            {...field}
            read={read}
            edit={edit}
            value={value}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Form
        form={form} {...formItemLayout}
        onFinish={handlerSubmitForm}
      >
        {fields?.map((field, index) => renderField(field, index))}
        {!read && (
          <Form.Item>
            <Button type="primary" onClick={() => form.submit()}>
              Добавить
            </Button>{" "}
            <Button onClick={() => setShowModal(false)}>Закрыть</Button>
          </Form.Item>
        )}
      </Form>
      {read && (
        <Form.Item>
          <Button type="primary" onClick={() => console.log("Изменить")}>
            Изменить
          </Button>{" "}
          <Button type="primary" danger onClick={() => console.log("Удалить")}>
            Удалить
          </Button>{" "}
          <Button onClick={() => setShowModal(false)}>Закрыть</Button>
        </Form.Item>
      )}
    </>
  );
};

export default NewForm;

// import React from "react";
// import { Divider, Form, Button, Input, DatePicker } from "antd";
// import TextInput from "../FormComponents/TextInput";
// import SelectInput from "../FormComponents/SelectInput";
// import AddressInput from "../FormComponents/AddressInput";
// import SnilsInput from "../FormComponents/SnilsInput";
// import UploaderInput from "../FormComponents/UploaderInput";
// import { formItemLayout } from "../../components/configSizeForm";
// import moment from "moment";
// import "moment/locale/ru";
// import ConfirmationDocumentInput from "../FormComponents/ConfirmationDocumentInput";

// moment.locale("ru");

// const renderCustomInput = (field, value) => {
//   switch (field.inputType) {
//     case "textarea":
//       return <Input.TextArea {...field} value={value} />;
//     case "datepicker":
//       return (
//         <DatePicker
//           {...field}
//           value={value ? moment(value, field.format) : null}
//         />
//       );
//     // ... другие кастомные типы ввода можно потом добавить здесь
//     default:
//       return null;
//   }
// };

// const renderField = (
//   field,
//   index,
//   form,
//   value,
//   read,
//   edit,
//   setShowModal,
//   handlerDelete
// ) => {
//   switch (field.type) {
//     case "customInput":
//       return (
//         <Form.Item key={index} label={field.displayName} name={field.name}>
//           {renderCustomInput(field, value[field.name])}
//         </Form.Item>
//       );

//     case "divider":
//       return <Divider key={index}>{field.name}</Divider>;

//     case "textInput":
//       return (
//         <TextInput
//           key={index}
//           {...field}
//           value={value[field.name]}
//           read={read}
//           edit={edit}
//         />
//       );
//     case "selectInput":
//       return (
//         <SelectInput
//           key={index}
//           {...field}
//           value={value[field.name]}
//           read={read}
//           edit={edit}
//         />
//       );

//     case "confirmationDocumentInput":
//       return (
//         <ConfirmationDocumentInput
//           key={index}
//           field={field}
//           value={value}
//           form={form}
//           read={read}
//           edit={edit}
//         />
//       );

//     case "addressInput":
//       return (
//         <AddressInput
//           key={index}
//           {...field}
//           value={value[field.name]}
//           form={form}
//           read={read}
//           edit={edit}
//         />
//       );
//     case "snilsInput":
//       return (
//         <SnilsInput
//           key={index}
//           {...field}
//           value={value[field.name]}
//           read={read}
//           edit={edit}
//         />
//       );
//     case "uploaderInput":
//       return (
//         <UploaderInput
//           key={index}
//           {...field}
//           value={value[field.name]}
//           read={read}
//           edit={edit}
//         />
//       );
//     default:
//       return null;
//   }
// };

// export default function NewForm({
//   handlerDelete,
//   fields,
//   read = false,
//   edit = false,
//   value = false,
//   setShowModal,
// }) {
//   const [form] = Form.useForm();

//   return (
//     <Form
//       form={form}
//       {...formItemLayout}
//       onFinish={(values) => console.log(values)}
//     >
//       {fields?.length > 0 &&
//         fields.map((field, index) =>
//           renderField(
//             field,
//             index,
//             form,
//             value,
//             read,
//             edit,
//             setShowModal,
//             handlerDelete
//           )
//         )}
//       {!read && (
//         <Form.Item>
//           <Button type="primary" onClick={() => form.submit()}>
//             Добавить
//           </Button>
//           <Button onClick={() => setShowModal(false)}>Закрыть</Button>
//         </Form.Item>
//       )}
//       {read && (
//         <Form.Item>
//           <Button type="primary" onClick={() => console.log("Изменить")}>
//             Изменить
//           </Button>
//           <Button type="primary" danger onClick={() => handlerDelete(value.id)}>
//             Удалить
//           </Button>
//           <Button onClick={() => setShowModal(false)}>Закрыть</Button>
//         </Form.Item>
//       )}
//     </Form>
//   );
// }

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
