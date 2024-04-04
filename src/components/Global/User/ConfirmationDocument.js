import React, { useState } from "react";

import { Form, Divider, Input, DatePicker } from "antd";

import TextArea from "antd/es/input/TextArea";

import SelectInput from "../../FormComponents/SelectInput";
import TextInput from "../../FormComponents/TextInput";

export default function ConfirmationDocument({ form }) {
  const [documentType, setDocumentType] = useState("passport");
  const [kodPodrazdelenia, setKodPodrazdelenia] = useState("");

  // Изменяет тип документа в зависимости от выбора пользователя
  const onDocumentTypeChange = (value) => {
    setDocumentType(value);
    form.setFieldsValue({ typeDoc: value });
  };

  const otherDocumentOptions = [
    { value: "type1", label: "Тип1" },
    { value: "type2", label: "Тип2" },
  ];

  const documentOptions = [
    { value: "passport", label: "Паспорт гражданина РФ" },
    { value: "other", label: "Иной документ" },
  ];

  // Обрабатывает изменения в коде подразделения, форматируя его
  const handleKodPodrazdeleniaChange = (e) => {
    const { value } = e.target;
    const onlyNums = value.replace(/[^\d]/g, "");
    let formattedKod = "";

    if (onlyNums.length <= 3) {
      formattedKod = onlyNums;
    } else if (onlyNums.length > 3 && onlyNums.length <= 6) {
      formattedKod = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    }
    setKodPodrazdelenia(formattedKod);
  };

  return (
    <>
      <Divider orientation="center">Удостоверяющий документ</Divider>

      {/* _______Тип подтверждающего документа_______ */}
      <SelectInput
        displayName="Тип документа"
        name="typeDoc"
        required={true}
        description={["Выберите тип документа из списка"]}
        options={documentOptions}
        onChange={onDocumentTypeChange}
      />

      {/* _______Паспорт_______ */}
      {documentType === "passport" && (
        <>
          {/* Серия паспорта */}
          <TextInput
            displayName="Серия паспорта"
            name="serialPassport"
            required={true}
            shortDescription="1234"
            inputProps={{
              maxLength: 4,
              pattern: "\\d*",
            }}
            rules={[
              {
                required: true,
                message: "Пожалуйста, укажите серию паспорта",
              },
            ]}
          />

          {/* Номер паспорта */}
          <TextInput
            displayName="Номер паспорта"
            name="numberPassport"
            required={true}
            shortDescription="567890"
            inputProps={{
              maxLength: 6,
              pattern: "\\d*",
            }}
            rules={[
              {
                required: true,
                message: "Пожалуйста, укажите номер паспорта",
              },
            ]}
          />

          {/* Код подразделения */}
          <TextInput
            displayName="Код подразделения"
            name="kodpodrazdelenia"
            required={true}
            shortDescription="123-456"
            inputProps={{
              maxLength: 7,
              value: kodPodrazdelenia,
              onChange: handleKodPodrazdeleniaChange,
            }}
            rules={[
              {
                required: true,
                message: "Пожалуйста, укажите код подразделения",
              },
              () => ({
                validator(_, value) {
                  if (!value || /^\d{3}-\d{3}$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Формат кода подразделения должен быть 111-111")
                  );
                },
              }),
            ]}
          />

          {/* _______Кем выдан_______ */}
          <Form.Item
            label="Кем выдан"
            name="kemvidan"
            rules={[
              {
                required: true,
                message: "Пожалуйста, укажите кем выдан паспорт",
              },
            ]}
          >
            <TextArea
              placeholder="..."
              style={{
                height: 60,
              }}
            />
          </Form.Item>

          {/* _______Когда выдан_______ */}
          <Form.Item
            label="Когда выдан"
            name="date"
            rules={[{ required: true, message: "Введите дату выдачи" }]}
          >
            <DatePicker />
          </Form.Item>
        </>
      )}

      {/* _______Иной документ_______ */}
      {documentType === "other" && (
        <>
          {/* "Тип иного документа" */}
          {/* <SelectInput
            displayName="Тип документа"
            name="otherTypeDoc"
            required={true}
            description={["Выберите тип иного документа из списка"]}
            options={otherDocumentOptions}
            onChange={(value) => {}}
          /> */}
          <TextInput
            displayName="Тип иного документа"
            name="otherTypeDoc"
            required={true}
            shortDescription="..."
            inputType="textarea"
            rules={[
              {
                required: true,
                message: "Пожалуйста, укажите тип документа",
              },
            ]}
          />

          {/* Реквизиты документа */}
          <TextInput
            displayName="Реквизиты документа"
            name="recvizitydocumenta"
            required={true}
            shortDescription="..."
            inputType="textarea"
            rules={[
              {
                required: true,
                message: "Пожалуйста, укажите реквизиты документа",
              },
            ]}
          />
          {/* _______Когда выдан_______ */}
          <Form.Item
            label="Когда выдан"
            name="date"
            rules={[{ required: true, message: "Введите дату выдачи" }]}
          >
            <DatePicker />
          </Form.Item>
        </>
      )}
    </>
  );
}

// import React, { useState } from "react";

// import { Form, Divider } from "antd";

// import TextArea from "antd/es/input/TextArea";

// import SelectInput from "../../FormComponents/SelectInput";
// import TextInput from "../../FormComponents/TextInput";

// export default function ConfirmationDocument({ form }) {
//   const [documentType, setDocumentType] = useState("passport");
//   const [kodPodrazdelenia, setKodPodrazdelenia] = useState("");

//   // Изменяет тип документа в зависимости от выбора пользователя
//   const onDocumentTypeChange = (value) => {
//     setDocumentType(value);
//     form.setFieldsValue({ typeDoc: value });
//   };

//   const otherDocumentOptions = [
//     { value: "type1", label: "Тип1" },
//     { value: "type2", label: "Тип2" },
//   ];

//   const documentOptions = [
//     { value: "passport", label: "Паспорт гражданина РФ" },
//     { value: "other", label: "Иной документ" },
//   ];

//   // Обрабатывает изменения в коде подразделения, форматируя его
//   const handleKodPodrazdeleniaChange = (e) => {
//     const { value } = e.target;
//     const onlyNums = value.replace(/[^\d]/g, "");
//     let formattedKod = "";

//     if (onlyNums.length <= 3) {
//       formattedKod = onlyNums;
//     } else if (onlyNums.length > 3 && onlyNums.length <= 6) {
//       formattedKod = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
//     }
//     setKodPodrazdelenia(formattedKod);
//   };

//   return (
//     <>
//       <Divider orientation="center">Удостоверяющий документ</Divider>

//       {/* _______Тип подтверждающего документа_______ */}
//       <SelectInput
//         displayName="Тип документа"
//         name="typeDoc"
//         required={true}
//         description={["Выберите тип документа из списка"]}
//         options={documentOptions}
//         onChange={onDocumentTypeChange}
//       />

//       {/* _______Паспорт_______ */}
//       {documentType === "passport" && (
//         <>
//           {/* Серия паспорта */}
//           <TextInput
//             displayName="Серия паспорта"
//             name="serialPassport"
//             required={true}
//             shortDescription="1234"
//             inputProps={{
//               maxLength: 4,
//               pattern: "\\d*",
//             }}
//             rules={[
//               {
//                 required: true,
//                 message: "Пожалуйста, укажите серию паспорта",
//               },
//             ]}
//           />

//           {/* Номер паспорта */}
//           <TextInput
//             displayName="Номер паспорта"
//             name="numberPassport"
//             required={true}
//             shortDescription="567890"
//             inputProps={{
//               maxLength: 6,
//               pattern: "\\d*",
//             }}
//             rules={[
//               {
//                 required: true,
//                 message: "Пожалуйста, укажите номер паспорта",
//               },
//             ]}
//           />

//           {/* Код подразделения */}
//           <TextInput
//             displayName="Код подразделения"
//             name="kodpodrazdelenia"
//             required={true}
//             shortDescription="123-456"
//             inputProps={{
//               maxLength: 7,
//               value: kodPodrazdelenia,
//               onChange: handleKodPodrazdeleniaChange,
//             }}
//             rules={[
//               {
//                 required: true,
//                 message: "Пожалуйста, укажите код подразделения",
//               },
//               () => ({
//                 validator(_, value) {
//                   if (!value || /^\d{3}-\d{3}$/.test(value)) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(
//                     new Error("Формат кода подразделения должен быть 111-111")
//                   );
//                 },
//               }),
//             ]}
//           />

//           {/* _______Кем выдан_______ */}
//           <Form.Item
//             label="Кем выдан"
//             name="kemvidan"
//             rules={[
//               {
//                 required: true,
//                 message: "Пожалуйста, укажите кем выдан паспорт",
//               },
//             ]}
//           >
//             <TextArea
//               placeholder="..."
//               style={{
//                 height: 60,
//               }}
//             />
//           </Form.Item>
//         </>
//       )}

//       {/* _______Иной документ_______ */}
//       {documentType === "other" && (
//         <>
//           {/* Использование SelectInput для поля "Тип документа" */}
//           <SelectInput
//             displayName="Тип документа"
//             name="otherTypeDoc"
//             required={true}
//             description={["Выберите тип иного документа из списка"]}
//             options={otherDocumentOptions}
//             onChange={(value) => {}}
//           />

//           {/* Реквизиты документа */}
//           <TextInput
//             displayName="Реквизиты документа"
//             name="recvizitydocumenta"
//             required={true}
//             shortDescription="..."
//             inputType="textarea"
//             rules={[
//               {
//                 required: true,
//                 message: "Пожалуйста, укажите реквизиты документа",
//               },
//             ]}
//           />
//         </>
//       )}
//     </>
//   );
// }
