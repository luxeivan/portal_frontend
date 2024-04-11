import { Divider } from "antd";

import useSubjects from "../../stores/Cabinet/useSubjects";
import AddressInput from "../FormComponents/AddressInput"; 
import AddressResidentialJson from "./AddressResidential.json";

export default function AddressResidential({ form, read, edit, value}) {
  const { addressOptions, setSearchText, debouncedFetchAddresses } = useSubjects();

  return (
    <>
      <Divider orientation="center">Место проживания</Divider>
      <AddressInput
        form={form}
        read={read}
        edit={edit}
        value={value}
        fieldName="addressResidential" 
        manualValue={value?.manualResidential} 
        addressOptions={addressOptions} 
        debouncedFetchAddresses={debouncedFetchAddresses}
        setSearchText={setSearchText}
        manualInputFields={AddressResidentialJson}
      />
    </>
  );
}



// import React from "react";
// import { Divider } from "antd";

// import useSubjects from "../../stores/Cabinet/useSubjects";
// import AddressInput from "../FormComponents/AddressInput"; 
// import AddressResidentialJson from "./AddressResidential.json";

// export default function AddressResidential({ form, read, edit, value }) {
//   const { addressOptions, setSearchText, debouncedFetchAddresses } = useSubjects();

//   return (
//     <>
//       <Divider orientation="center">Место проживания</Divider>
//       <AddressInput
//         form={form}
//         read={read}
//         edit={edit}
//         value={value}
//         fieldName="addressResidential" 
//         manualValue={value?.manualResidential} 
//         addressOptions={addressOptions} 
//         debouncedFetchAddresses={debouncedFetchAddresses}
//         setSearchText={setSearchText}
//         manualInputFields={AddressResidentialJson}
//       />
//     </>
//   );
// }



// import React, { useState, useEffect } from "react";

// import { Input, Form, AutoComplete, Checkbox, Divider, Typography } from "antd";

// import useSubjects from "../../stores/Cabinet/useSubjects";
// import TextArea from "antd/es/input/TextArea";
// import TextInput from "../FormComponents/TextInput";
// import AddressResidentialJson from "./AddressResidential.json";

// export default function AddressResidential({ form, read, edit, value }) {
//   const [searchText] = useState("");
//   const [manualAddressResidentialInput, setManualAddressResidentialInput] =
//     useState(false);

//   const [selectedResidenceAddress, setSelectedResidenceAddress] = useState("");
//   const [residenceFiasId, setResidenceFiasId] = useState("");

//   const { addressOptions, setSearchText, debouncedFetchAddresses } =
//     useSubjects();

//   // Включает или выключает ручной ввод адреса проживания
//   const handleManualAddressCheckbox = (e) => {
//     setManualAddressResidentialInput(e.target.checked);
//     if (e.target.checked) {
//       setSelectedResidenceAddress("");
//       form.setFieldsValue({
//         fullAddress: "",
//         fiasId: "",
//         manualResidential: "1",
//       });
//     } else {
//       form.setFieldsValue({
//         manualResidential: "0",
//       });
//     }
//   };

//   // Устанавливает адрес, выбранный из списка
//   const onSelectResidential = (value, option) => {
//     setSelectedResidenceAddress(option.value);
//     form.setFieldsValue({
//       fiasId: option.fias_id,
//     });
//   };

//   // Валидирует адрес, убеждаясь, что он был выбран из списка :)
//   const validateResidenceAddress = (rule, value) => {
//     if (selectedResidenceAddress === value) {
//       return Promise.resolve();
//     }
//     return Promise.reject("Выберите адрес из списка");
//   };

//   useEffect(() => {
//     debouncedFetchAddresses(searchText);
//   }, [searchText, debouncedFetchAddresses]);

//   // Обрабатывает изменения в поле поиска адреса
//   const onSearchResidential = (searchText) => {
//     setSearchText(searchText);
//     debouncedFetchAddresses(searchText);
//   };

//   //Поля для ручного ввода адреса проживания
//   console.log(value);
//   return (
//     <>
//       <Divider orientation="center">Место проживания</Divider>
//       {manualAddressResidentialInput || (read && value?.manual) ? (
//         <>
//           {AddressResidentialJson.map((item) => (
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
//                 onSelect={onSelectResidential}
//                 onSearch={onSearchResidential}
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
//               <Typography.Text>
//                 {value?.fias?.fullAddress}
//               </Typography.Text>
//             )}
//           </Form.Item>
//           <Form.Item
//             name="fiasId"
//             hidden
//             noStyle
//             shouldUpdate={(prevValues, currentValues) =>
//               prevValues.addressResidential !== currentValues.addressResidential
//             }
//           >
//             <Input type="hidden" />
//           </Form.Item>
//         </>
//       )}
//       <Form.Item
//         name="manualResidential"
//         hidden
//         noStyle
//         shouldUpdate={(prevValues, currentValues) =>
//           prevValues.addressResidential !== currentValues.addressResidential
//         }
//       >
//         <Input type="hidden" />
//       </Form.Item>
//       {!read && (
//         <Form.Item name={"addressResidentialManual"}>
//           <Checkbox
//             checked={manualAddressResidentialInput}
//             onChange={handleManualAddressCheckbox}
//           >
//             Ввести адрес по полям вручную
//           </Checkbox>
//         </Form.Item>
//       )}
//     </>
//   );
// }