import React, { useState, useEffect } from "react";

import { Input, Form, AutoComplete, Checkbox, Divider, Typography } from "antd";

import useSubjects from "../../stores/Cabinet/useSubjects";
import TextArea from "antd/es/input/TextArea";
import TextInput from "../FormComponents/TextInput";
import AddressResidentialJson from "./AddressResidential.json";

export default function AddressResidential({ form, read, edit, value }) {
  const [searchText] = useState("");
  const [manualAddressResidentialInput, setManualAddressResidentialInput] =
    useState(false);

  const [selectedResidenceAddress, setSelectedResidenceAddress] = useState("");
  const [residenceFiasId, setResidenceFiasId] = useState("");

  const { addressOptions, setSearchText, debouncedFetchAddresses } =
    useSubjects();

  // Включает или выключает ручной ввод адреса проживания
  const handleManualAddressCheckbox = (e) => {
    setManualAddressResidentialInput(e.target.checked);
    if (e.target.checked) {
      setSelectedResidenceAddress("");
      form.setFieldsValue({
        fullAddress: "",
        fiasId: "",
        manual: "1",
      });
    } else {
      form.setFieldsValue({
        manual: "0",
      });
    }
  };

  // Устанавливает адрес, выбранный из списка
  const onSelectResidential = (value, option) => {
    setSelectedResidenceAddress(option.value);
    form.setFieldsValue({
      fiasId: option.fias_id,
    });
  };

  // Валидирует адрес, убеждаясь, что он был выбран из списка :)
  const validateResidenceAddress = (rule, value) => {
    if (selectedResidenceAddress === value) {
      return Promise.resolve();
    }
    return Promise.reject("Выберите адрес из списка");
  };

  useEffect(() => {
    debouncedFetchAddresses(searchText);
  }, [searchText, debouncedFetchAddresses]);

  // Обрабатывает изменения в поле поиска адреса
  const onSearchResidential = (searchText) => {
    setSearchText(searchText);
    debouncedFetchAddresses(searchText);
  };

  //Поля для ручного ввода адреса проживания
  console.log(value);
  return (
    <>
      <Divider orientation="center">Место проживания</Divider>
      {manualAddressResidentialInput || (read && value?.manual) ? (
        <>
          {AddressResidentialJson.map((item) => (
            <TextInput
              read={read}
              edit={edit}
              value={value?.manual[item.name]}
              displayName={item.displayName}
              name={item.name}
              description={item.description}
            />
          ))}
        </>
      ) : (
        <>
          <Form.Item label="Адрес" name={"fullAddress"}>
            {!read && (
              <AutoComplete
                options={addressOptions.map((option) => ({
                  ...option,
                  label: (
                    <div style={{ whiteSpace: "normal" }}>{option.label}</div>
                  ),
                }))}
                onSelect={onSelectResidential}
                onSearch={onSearchResidential}
                popupMatchSelectWidth={true}
                style={{ width: "100%" }}
              >
                <TextArea
                  placeholder="Начните вводить"
                  style={{ height: 60 }}
                />
              </AutoComplete>
            )}
            {read && (
              <Typography.Text>
                {value?.fias?.fullAddress}
              </Typography.Text>
            )}
          </Form.Item>
          <Form.Item
            name="fiasId"
            hidden
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.addressResidential !== currentValues.addressResidential
            }
          >
            <Input type="hidden" />
          </Form.Item>
        </>
      )}
      <Form.Item
        name="manual"
        hidden
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.addressResidential !== currentValues.addressResidential
        }
      >
        <Input type="hidden" />
      </Form.Item>
      {!read && (
        <Form.Item name={"addressResidentialManual"}>
          <Checkbox
            checked={manualAddressResidentialInput}
            onChange={handleManualAddressCheckbox}
          >
            Ввести адрес по полям вручную
          </Checkbox>
        </Form.Item>
      )}
    </>
  );
}
//старый стабильный вариант
// import React, { useState, useEffect } from "react";

// import { Input, Form, AutoComplete, Checkbox, Divider, Typography } from "antd";

// import useSubjects from "../../stores/Cabinet/useSubjects";
// import TextArea from "antd/es/input/TextArea";

// export default function AddressResidential({ form, read, edit, value }) {
//   const [searchText] = useState("");
//   const [isAddressSame, setIsAddressSame] = useState(false);
//   const [countryResidence, setCountryResidence] = useState("");
//   const [cityResidence, setCityResidence] = useState("");
//   const [streetResidence, setStreetResidence] = useState("");
//   const [postcodeResidence, setPostcodeResidence] = useState("");
//   const [regionResidence, setRegionResidence] = useState("");
//   const [areaResidence, setAreaResidence] = useState("");
//   const [localityResidence, setLocalityResidence] = useState("");
//   const [houseNumberResidence, setHouseNumberResidence] = useState("");
//   const [frameResidence, setFrameResidence] = useState("");
//   const [apartmentNumberResidence, setApartmentNumberResidence] = useState("");
//   const [buildingResidence, setBuildingResidence] = useState("");
//   const [kommentResidence, setKommentResidence] = useState("");

//   const [manualResidenceAddressInput, setManualResidenceAddressInput] =
//     useState(false);
//   const [selectedResidenceAddress, setSelectedResidenceAddress] = useState("");
//   const [redesidenceFiasId, setRedesidenceFiasId] = useState("");

//   const { addressOptions, setSearchText, debouncedFetchAddresses } =
//     useSubjects();

//   // Устанавливает адрес проживания, если он совпадает с адресом регистрации
//   const handleAddressCheckboxChange = (e) => {
//     const isChecked = e.target.checked;
//     setIsAddressSame(isChecked);
//     if (isChecked) {
//       form.setFieldsValue({
//         addressResidential: form.getFieldValue("addressRegistration"),
//         addressResidentialFias: form.getFieldValue("addressResidential"),
//       });
//     } else {
//       form.setFieldsValue({
//         addressResidential: "",
//         addressResidentialFias: "",
//       });
//     }
//   };

//   const onSelectResidential = (value, option) => {
//     setSelectedResidenceAddress(option.value);
//     setRedesidenceFiasId(option.fias_id); // сохраняем fias_id
//     form.setFieldsValue({
//       addressResidential: option.value,
//       addressResidentialFias: option.fias_id,
//     });
//   };

//   useEffect(() => {
//     debouncedFetchAddresses(searchText);
//   }, [searchText, debouncedFetchAddresses]);

//   // Обрабатывает изменения в поле поиска адреса
//   const onSearch = (searchText) => {
//     setSearchText(searchText);
//     debouncedFetchAddresses(searchText);
//   };

//   // Включает или выключает ручной ввод адреса проживания
//   const handleManualResidenceAddressCheckbox = (e) => {
//     setManualResidenceAddressInput(e.target.checked);
//     if (e.target.checked) {
//       setSelectedResidenceAddress("");
//     }
//   };

//   const getAddressStringResidence = () => {
//     // Собираем строки в одну, если они не пустые
//     return [
//       countryResidence,
//       postcodeResidence,
//       regionResidence,
//       areaResidence,
//       cityResidence,
//       localityResidence,
//       streetResidence,
//       houseNumberResidence,
//       frameResidence,
//       buildingResidence,
//       apartmentNumberResidence,
//       kommentResidence,
//     ]
//       .filter(Boolean)
//       .join(", ");
//   };

//   useEffect(() => {
//     form.setFieldsValue({ fullAddressResidence: getAddressStringResidence() });
//   }, [
//     countryResidence,
//     postcodeResidence,
//     regionResidence,
//     areaResidence,
//     cityResidence,
//     localityResidence,
//     streetResidence,
//     houseNumberResidence,
//     frameResidence,
//     buildingResidence,
//     apartmentNumberResidence,
//     kommentResidence,
//   ]);

//   //Поля для ручного ввода адреса проживания
//   const manualResidenceAddressFields = (
//     <>
//       <Form.Item label="Адрес проживания" name="fullAddressResidence">
//         <Input readOnly />
//       </Form.Item>

//       <Form.Item label="Почтовый индекс" name="postcodeResidence">
//         <Input
//           value={postcodeResidence}
//           onChange={(e) => setPostcodeResidence(e.target.value)}
//         />
//       </Form.Item>
//       <Form.Item label="Страна" name="countryResidence">
//         <Input
//           value={countryResidence}
//           onChange={(e) => setCountryResidence(e.target.value)}
//         />
//       </Form.Item>
//       <Form.Item label="Регион" name="regionResidence">
//         <Input
//           value={regionResidence}
//           onChange={(e) => setRegionResidence(e.target.value)}
//         />
//       </Form.Item>

//       <Form.Item label="Район" name="areaResidence">
//         <Input
//           value={areaResidence}
//           onChange={(e) => setAreaResidence(e.target.value)}
//         />
//       </Form.Item>

//       <Form.Item label="Город" name="cityResidence">
//         <Input
//           value={cityResidence}
//           onChange={(e) => setCityResidence(e.target.value)}
//         />
//       </Form.Item>

//       <Form.Item label="Населенный пункт" name="localityResidence">
//         <Input
//           value={localityResidence}
//           onChange={(e) => setLocalityResidence(e.target.value)}
//         />
//       </Form.Item>

//       <Form.Item label="Улица" name="streetResidence">
//         <Input
//           value={streetResidence}
//           onChange={(e) => setStreetResidence(e.target.value)}
//         />
//       </Form.Item>

//       <Form.Item label="Номер дома" name="houseNumberResidence">
//         <Input
//           value={houseNumberResidence}
//           onChange={(e) => setHouseNumberResidence(e.target.value)}
//         />
//       </Form.Item>

//       <Form.Item label="Корпус" name="frameResidence">
//         <Input
//           value={frameResidence}
//           onChange={(e) => setFrameResidence(e.target.value)}
//         />
//       </Form.Item>

//       <Form.Item label="Строение" name="buildingResidence">
//         <Input
//           value={buildingResidence}
//           onChange={(e) => setBuildingResidence(e.target.value)}
//         />
//       </Form.Item>

//       <Form.Item label="Квартира/Офис/Комната" name="apartmentNumberResidence">
//         <Input
//           value={apartmentNumberResidence}
//           onChange={(e) => setApartmentNumberResidence(e.target.value)}
//         />
//       </Form.Item>
//       <Form.Item label="Комментарий" name="kommentResidence">
//         <TextArea
//           placeholder="..."
//           style={{
//             height: 60,
//           }}
//           value={kommentResidence}
//           onChange={(e) => setKommentResidence(e.target.value)}
//         />
//       </Form.Item>
//     </>
//   );

//   const validateResidenceAddress = (rule, value) => {
//     if (selectedResidenceAddress === value) {
//       return Promise.resolve();
//     }
//     return Promise.reject("Выберите адрес из списка");
//   };

//   return (
//     <>
//       <Divider orientation="center">Место проживания</Divider>

//       {read ? (
//         // Если режим чтения - просто отображаем значение
//         <Form.Item label="Адрес проживания">
//           <Typography.Text>{value.addressResidential}</Typography.Text>
//         </Form.Item>
//       ) : (
//         // Если режим редактирования - отображаем форму ввода
//         <>
//           <Form.Item>
//             <Checkbox
//               checked={isAddressSame}
//               onChange={handleAddressCheckboxChange}
//             >
//               Совпадает с адресом по месту регистрации
//             </Checkbox>
//           </Form.Item>

//           {!isAddressSame && (
//             <>
//               {manualResidenceAddressInput ? (
//                 // Тут используем поля для ручного ввода адреса проживания
//                 manualResidenceAddressFields
//               ) : (
//                 <>
//                   <Form.Item
//                     label="Адрес"
//                     name="addressResidential"
//                     rules={[
//                       {
//                         required: true,
//                         message: "Пожалуйста, введите адрес проживания",
//                       },
//                       { validator: validateResidenceAddress },
//                     ]}
//                   >
//                     <AutoComplete
//                       options={addressOptions.map((option) => ({
//                         ...option,
//                         label: (
//                           <div style={{ whiteSpace: "normal" }}>
//                             {option.label}
//                           </div>
//                         ),
//                       }))}
//                       onSelect={onSelectResidential}
//                       onSearch={onSearch}
//                       popupMatchSelectWidth={true}
//                       style={{ width: "100%" }}
//                     >
//                       <TextArea
//                         placeholder="Начните вводить"
//                         style={{ height: 60 }}
//                       />
//                     </AutoComplete>
//                   </Form.Item>
//                   <Form.Item
//                     noStyle
//                     shouldUpdate={(prevValues, currentValues) =>
//                       prevValues.addressResidential !==
//                       currentValues.addressResidential
//                     }
//                   >
//                     {() => (
//                       <Form.Item name="addressResidentialFias" hidden>
//                         <Input type="hidden" />
//                       </Form.Item>
//                     )}
//                   </Form.Item>
//                 </>
//               )}

//               <Form.Item>
//                 <Checkbox
//                   checked={manualResidenceAddressInput}
//                   onChange={handleManualResidenceAddressCheckbox}
//                 >
//                   Ввести адрес проживания по полям вручную
//                 </Checkbox>
//               </Form.Item>
//             </>
//           )}
//         </>
//       )}
//     </>
//   );
// }
