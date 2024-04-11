import React, { useState, useEffect } from "react";
import { Divider } from "antd";

import useSubjects from "../../stores/Cabinet/useSubjects";
import AddressInput from "../FormComponents/AddressInput"; 
import AddressRegistrationJson from "./AddressRegistration.json";

export default function AddressRegistration({ form, read, edit, value }) {
  const { addressOptions, setSearchText, debouncedFetchAddresses } = useSubjects();

  useEffect(() => {
    debouncedFetchAddresses("");
  }, [debouncedFetchAddresses]);

  return (
    <>
      <Divider orientation="center">Место регистрации</Divider>
      <AddressInput
        form={form}
        read={read}
        edit={edit}
        value={value}
        fieldName="addressRegistration" 
        manualValue={value?.manual}
        addressOptions={addressOptions} 
        debouncedFetchAddresses={debouncedFetchAddresses}
        setSearchText={setSearchText}
        manualInputFields={AddressRegistrationJson} 
      />
    </>
  );
}




// import React, {useEffect } from "react";
// import { Divider } from "antd";

// import useSubjects from "../../stores/Cabinet/useSubjects";
// import AddressInput from "../FormComponents/AddressInput"; 
// import AddressRegistrationJson from "./AddressRegistration.json";

// export default function AddressRegistration({ form, read, edit, value }) {
//   const { addressOptions, setSearchText, debouncedFetchAddresses } = useSubjects();

//   useEffect(() => {
//     debouncedFetchAddresses("");
//   }, [debouncedFetchAddresses]);

//   return (
//     <>
//       <Divider orientation="center">Место регистрации</Divider>
//       <AddressInput
//         form={form}
//         read={read}
//         edit={edit}
//         value={value}
//         fieldName="addressRegistration" 
//         manualValue={value?.manual}
//         addressOptions={addressOptions} 
//         debouncedFetchAddresses={debouncedFetchAddresses}
//         setSearchText={setSearchText}
//         manualInputFields={AddressRegistrationJson} 
//       />
//     </>
//   );
// }



// import React, { useState, useEffect } from "react";

// import { Input, Form, AutoComplete, Checkbox, Divider, Typography } from "antd";

// import useSubjects from "../../stores/Cabinet/useSubjects";
// import TextArea from "antd/es/input/TextArea";
// import TextInput from "../FormComponents/TextInput";
// import AddressRegistrationJson from "./AddressRegistration.json";

// export default function AddressRegistration({ form, read, edit, value }) {
//   const [searchText] = useState("");
//   const [manualAddressInput, setManualAddressInput] = useState(false);

//   const [selectedRegistrationAddress, setSelectedRegistrationAddress] =
//     useState("");
//   const [registrationFiasId, setRegistrationFiasId] = useState("");

//   const { addressOptions, setSearchText, debouncedFetchAddresses } =
//     useSubjects();

//   // Включает или выключает ручной ввод адреса регистрации
//   const handleManualAddressCheckbox = (e) => {
//     setManualAddressInput(e.target.checked);
//     if (e.target.checked) {
//       setSelectedRegistrationAddress("");
//       form.setFieldsValue({
//         fullAddress: "",
//         fiasId: "",
//         manualRegistration: "1",
//       });
//     } else {
//       form.setFieldsValue({
//         manualRegistration: "0",
//       });
//     }
//   };

//   // Устанавливает адрес, выбранный из списка
//   const onSelect = (value, option) => {
//     setSelectedRegistrationAddress(option.value);
//     //setRegistrationFiasId(option.fias_id); // сохраняем fias_id
//     form.setFieldsValue({
//       fiasId: option.fias_id,
//     });
//   };

//   // Валидирует адрес, убеждаясь, что он был выбран из списка :)
//   const validateAddress = (rule, value) => {
//     if (selectedRegistrationAddress === value) {
//       return Promise.resolve();
//     }
//     return Promise.reject("Выберите адрес из списка");
//   };

//   useEffect(() => {
//     debouncedFetchAddresses(searchText);
//   }, [searchText, debouncedFetchAddresses]);

//   // Обрабатывает изменения в поле поиска адреса
//   const onSearch = (searchText) => {
//     setSearchText(searchText);
//     debouncedFetchAddresses(searchText);
//   };
//   //Поля для ручного ввода адреса регистрации

//   console.log(value);
//   return (
//     <>
//       <Divider orientation="center">Место регистрации</Divider>
//       {manualAddressInput || (read && value?.manual) ? (
//         <>
//           {AddressRegistrationJson.map((item) => (
//             <TextInput
//               read={read}
//               edit={edit}
//               value={value?.manual[item.name]}
//               displayName={item.displayName}
//               name={item.name}
//               description={item.description}
//             />
//           ))}
//         </>
//       ) : (
//         <>
//           <Form.Item label="Адрес" name={"fullAddress"}>
//             {!read && (
//               <AutoComplete
//                 options={addressOptions.map((option) => ({
//                   ...option,
//                   label: (
//                     <div style={{ whiteSpace: "normal" }}>{option.label}</div>
//                   ),
//                 }))}
//                 onSelect={onSelect}
//                 onSearch={onSearch}
//                 popupMatchSelectWidth={true}
//                 style={{ width: "100%" }}
//               >
//                 <TextArea
//                   placeholder="Начните вводить"
//                   style={{ height: 60 }}
//                 />
//               </AutoComplete>
//             )}
//             {read && (
//               <Typography.Text>{value?.fias?.fullAddress}</Typography.Text>
//             )}
//           </Form.Item>
//           <Form.Item
//             name="fiasId"
//             hidden
//             noStyle
//             shouldUpdate={(prevValues, currentValues) =>
//               prevValues.addressRegistration !==
//               currentValues.addressRegistration
//             }
//           >
//             <Input type="hidden" />
//           </Form.Item>
//         </>
//       )}
//       <Form.Item
//         name="manualRegistration"
//         hidden
//         noStyle
//         shouldUpdate={(prevValues, currentValues) =>
//           prevValues.addressRegistration !== currentValues.addressRegistration
//         }
//       >
//         <Input type="hidden" />
//       </Form.Item>
//       {!read && (
//         <Form.Item name={"addressRegistrationManual"}>
//           <Checkbox
//             checked={manualAddressInput}
//             onChange={handleManualAddressCheckbox}
//           >
//             Ввести адрес по полям вручную
//           </Checkbox>
//         </Form.Item>
//       )}
//     </>
//   );
// }

