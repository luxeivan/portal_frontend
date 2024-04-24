import React, { useEffect, useState } from "react";
import { Divider, Form, Button, Flex, AutoComplete } from "antd";
import TextInput from "../FormComponents/TextInput";
import CheckboxInput from "../FormComponents/CheckboxInput";
import SelectInput from "../FormComponents/SelectInput";
import AddressInput from "../FormComponents/AddressInput/AddressInput";
import SnilsInput from "../FormComponents/SnilsInput";
import UploaderInput from "../FormComponents/UploaderInput";
import ConfirmationDocumentInput from "../FormComponents/ConfirmationDocumentInput";
import DateInput from "../FormComponents/DateInput";
import axios from "axios";
import config from "../../config";
import useSubjects from "../../stores/Cabinet/useSubjects";
import { formItemLayout } from "../configSizeForm";
import InnKppOkvedInput from "../FormComponents/InnKppOkvedInput";

const NewForm = ({
  fields,
  read: tempread = false,
  edit: tempedit = false,
  value = {},
  setShowModal,
  form,
  handlerSubmitForm,
  handlerDelete,
  handlerEdit,
}) => {
  const showModalView = useSubjects((state) => state.showModalView);
  const showModalAdd = useSubjects((state) => state.showModalAdd);
  const [edit, setEdit] = useState(tempedit);
  const [read, setRead] = useState(tempread);
  // const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setEdit(tempedit);
    setRead(tempread);
    form.resetFields();
  }, [showModalView, showModalAdd, tempedit, tempread]);

  // const onSearch = async (searchText) => {
  //   if (!searchText) {
  //     return;
  //   }
  //   try {
  //     const response = await axios.get(
  //       `${config.backServer}/api/cabinet/get-inn/LEGAL?inn=${searchText}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //         },
  //       }
  //     );
  //     if (response.data && response.data.data) {
  //       console.log("организации", response.data.data);
  //       setSuggestions(
  //         response.data.data.map((s) => ({
  //           value: s.data.inn,
  //           label: `${s.data.name.short} КПП: ${s.data.kpp}`,
  //           kpp: s.data.kpp,
  //         }))
  //       );
  //     } else {
  //       setSuggestions([]);
  //     }
  //   } catch (error) {
  //     console.error("Ошибка при поиске организации:", error);
  //   }
  // };

  // const onSelect = (value, option) => {
  //   const orgData = suggestions.find((org) => org.value === value);
  //   console.log("Тест", orgData);
  //   if (orgData) {
  //     form.setFieldsValue({
  //       inn: value,
  //       kpp: orgData.kpp,
  //     });
  //   }
  // };

  const renderField = (field, index) => {
    switch (field.type) {
      case "divider":
        return <Divider key={index}>{field.name}</Divider>;
      case "textInput":
          return (
            <TextInput
              // form={form}
              key={index}
              {...field}
              read={read}
              edit={edit}
              value={value[field.name]}
            />
          );        
      case "innInput":
        return (
          <InnKppOkvedInput
            // form={form}
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
            // form={form}
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
            // form={form}
          />
        );
      case "dateInput":
        return (
          <DateInput
            key={index}
            name={field.name}
            displayName={field.displayName}
            placeholder={field.placeholder}
            required={field.required}
            description={field.description}
            value={value[field.name]}
            read={read}
          />
        );
      case "checkboxInput":
        return (
          <CheckboxInput
            key={index}
            name={field.name}
            displayName={field.displayName}
            bindFields={field.bindFields}
            // form={form}
            read={read}
          />
        );
      case "confirmationDocumentInput":
        return (
          <ConfirmationDocumentInput
            key={index}
            // form={form}
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
    <Form
      form={form}
      {...formItemLayout}
      onFinish={handlerSubmitForm}
      initialValues={{
        firstname: "qwerty",
      }}
    >
      {fields.map(renderField)}
      {!read && !edit && (
        <Flex gap="middle">
          <Form.Item>
            <Button type="primary" onClick={() => form.submit()}>
              Добавить
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={() => setShowModal(false)}>Закрыть</Button>
          </Form.Item>
        </Flex>
      )}
      {edit && (
        <Flex gap="middle">
          <Form.Item>
            <Button type="primary" onClick={() => handlerEdit(value.id)}>
              Обновить
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={() => setShowModal(false)}>Закрыть</Button>
          </Form.Item>
        </Flex>
      )}
      {read && (
        <Flex gap="middle">
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                setEdit(true);
                setRead(false);
              }}
            >
              Изменить
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              danger
              onClick={() => handlerDelete(value.id)}
            >
              Удалить
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={() => setShowModal(false)}>Закрыть</Button>
          </Form.Item>
        </Flex>
      )}
    </Form>
  );
};

export default NewForm;

// import React, { useEffect, useState } from "react";
// import { Divider, Form, Button, Flex, AutoComplete } from "antd";
// import TextInput from "../FormComponents/TextInput";
// import CheckboxInput from "../FormComponents/CheckboxInput";
// import SelectInput from "../FormComponents/SelectInput";
// import AddressInput from "../FormComponents/AddressInput/AddressInput";
// import SnilsInput from "../FormComponents/SnilsInput";
// import UploaderInput from "../FormComponents/UploaderInput";
// import ConfirmationDocumentInput from "../FormComponents/ConfirmationDocumentInput";
// import DateInput from "../FormComponents/DateInput";
// import axios from "axios";
// import config from "../../config";
// import useSubjects from "../../stores/Cabinet/useSubjects";
// import { formItemLayout } from "../configSizeForm";

// const NewForm = ({
//   fields,
//   read: tempread = false,
//   edit: tempedit = false,
//   value = {},
//   setShowModal,
//   form,
//   handlerSubmitForm,
//   handlerDelete,
//   handlerEdit,
// }) => {
//   const showModalView = useSubjects((state) => state.showModalView);
//   const showModalAdd = useSubjects((state) => state.showModalAdd);
//   const [edit, setEdit] = useState(tempedit);
//   const [read, setRead] = useState(tempread);
//   const [suggestions, setSuggestions] = useState([]);

//   useEffect(() => {
//     setEdit(tempedit);
//     setRead(tempread);
//     form.resetFields();
//   }, [showModalView, showModalAdd, tempedit, tempread]);

//   const onSearch = async (searchText) => {
//     if (!searchText) {
//       return;
//     }
//     try {
//       const response = await axios.get(
//         `${config.backServer}/api/cabinet/get-inn/LEGAL?inn=${searchText}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//         }
//       );
//       if (response.data && response.data.data) {
//         console.log("организации", response.data.data);
//         setSuggestions(
//           response.data.data.map((s) => ({
//             value: s.data.inn,
//             label: `${s.data.name.short} КПП: ${s.data.kpp}`,
//             kpp: s.data.kpp,
//           }))
//         );
//       } else {
//         setSuggestions([]);
//       }
//     } catch (error) {
//       console.error("Ошибка при поиске организации:", error);
//     }
//   };

//   const onSelect = (value, option) => {
//     const orgData = suggestions.find((org) => org.value === value);
//     if (orgData) {
//       form.setFieldsValue({
//         inn: orgData.value,
//         kpp: orgData.kpp,
//       });
//     }
//   };

//   const renderField = (field, index) => {
//     switch (field.type) {
//       case "divider":
//         return <Divider key={index}>{field.name}</Divider>;
//       case "textInput":
//         if (field.name === "inn") {
//           return (
//             <Form.Item
//               key={index}
//               label={field.displayName}
//               name={field.name}
//               rules={[{ required: true, message: "Введите ИНН" }]}
//             >
//               <AutoComplete
//                 options={suggestions}
//                 onSearch={onSearch}
//                 onSelect={onSelect}
//                 placeholder={field.placeholder}
//                 style={{ width: "100%" }}
//               />
//             </Form.Item>
//           );
//         } else {
//           return (
//             <TextInput
//               key={index}
//               {...field}
//               read={read}
//               edit={edit}
//               value={value[field.name]}
//             />
//           );
//         }
//       case "selectInput":
//         return (
//           <SelectInput
//             key={index}
//             {...field}
//             read={read}
//             edit={edit}
//             value={value[field.name]}
//           />
//         );
//       case "uploaderInput":
//         return (
//           <UploaderInput
//             key={index}
//             {...field}
//             value={value[field.name]}
//             read={read}
//             edit={edit}
//           />
//         );
//       case "addressInput":
//         return (
//           <AddressInput
//             key={index}
//             {...field}
//             form={form}
//             read={read}
//             edit={edit}
//             value={value[field.name]}
//           />
//         );
//       case "snilsInput":
//         return (
//           <SnilsInput
//             key={index}
//             {...field}
//             read={read}
//             edit={edit}
//             value={value[field.name]}
//             form={form}
//           />
//         );
//       case "dateInput":
//         return (
//           <DateInput
//             key={index}
//             name={field.name}
//             displayName={field.displayName}
//             placeholder={field.placeholder}
//             required={field.required}
//             description={field.description}
//             value={value[field.name]}
//             read={read}
//           />
//         );
//       case "checkboxInput":
//         return (
//           <CheckboxInput
//             key={index}
//             name={field.name}
//             displayName={field.displayName}
//             bindFields={field.bindFields}
//             form={form}
//             read={read}
//           />
//         );
//       case "confirmationDocumentInput":
//         return (
//           <ConfirmationDocumentInput
//             key={index}
//             form={form}
//             {...field}
//             read={read}
//             edit={edit}
//             value={value}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Form
//       form={form}
//       {...formItemLayout}
//       onFinish={handlerSubmitForm}
//       initialValues={{
//         firstname: "qwerty",
//       }}
//     >
//       {fields.map(renderField)}
//       {!read && !edit && (
//         <Flex gap="middle">
//           <Form.Item>
//             <Button type="primary" onClick={() => form.submit()}>
//               Добавить
//             </Button>
//           </Form.Item>
//           <Form.Item>
//             <Button onClick={() => setShowModal(false)}>Закрыть</Button>
//           </Form.Item>
//         </Flex>
//       )}
//       {edit && (
//         <Flex gap="middle">
//           <Form.Item>
//             <Button type="primary" onClick={() => handlerEdit(value.id)}>
//               Обновить
//             </Button>
//           </Form.Item>
//           <Form.Item>
//             <Button onClick={() => setShowModal(false)}>Закрыть</Button>
//           </Form.Item>
//         </Flex>
//       )}
//       {read && (
//         <Flex gap="middle">
//           <Form.Item>
//             <Button
//               type="primary"
//               onClick={() => {
//                 setEdit(true);
//                 setRead(false);
//               }}
//             >
//               Изменить
//             </Button>
//           </Form.Item>
//           <Form.Item>
//             <Button
//               type="primary"
//               danger
//               onClick={() => handlerDelete(value.id)}
//             >
//               Удалить
//             </Button>
//           </Form.Item>
//           <Form.Item>
//             <Button onClick={() => setShowModal(false)}>Закрыть</Button>
//           </Form.Item>
//         </Flex>
//       )}
//     </Form>
//   );
// };

// export default NewForm;
