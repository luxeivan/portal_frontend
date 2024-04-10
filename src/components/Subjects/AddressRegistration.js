import React, { useState, useEffect } from "react";

import { Input, Form, AutoComplete, Checkbox, Divider, Typography } from "antd";

import useSubjects from "../../stores/Cabinet/useSubjects";
import TextArea from "antd/es/input/TextArea";
import TextInput from "../FormComponents/TextInput";
import AddressRegistrationJson from "./AddressRegistration.json"


export default function AddressRegistration({ form, read, edit, value }) {
  const [searchText] = useState("");
  const [manualAddressInput, setManualAddressInput] = useState(false);

  const [selectedRegistrationAddress, setSelectedRegistrationAddress] =
    useState("");
  const [registrationFiasId, setRegistrationFiasId] = useState("");

  const { addressOptions, setSearchText, debouncedFetchAddresses } =
    useSubjects();

  // Включает или выключает ручной ввод адреса регистрации
  const handleManualAddressCheckbox = (e) => {
    setManualAddressInput(e.target.checked);
    if (e.target.checked) {
      setSelectedRegistrationAddress("");
      form.setFieldsValue({
        addressRegistrationFias: "",
        addressResidentialFias: "",
      });
    }
  };

  // Устанавливает адрес, выбранный из списка
  const onSelect = (value, option) => {
    setSelectedRegistrationAddress(option.value);
    setRegistrationFiasId(option.fias_id); // сохраняем fias_id
    form.setFieldsValue({
      addressRegistration: option.value,
      addressRegistrationFias: option.fias_id,
    });
  };

  // Валидирует адрес, убеждаясь, что он был выбран из списка :)
  const validateAddress = (rule, value) => {
    if (selectedRegistrationAddress === value) {
      return Promise.resolve();
    }
    return Promise.reject("Выберите адрес из списка");
  };

  useEffect(() => {
    debouncedFetchAddresses(searchText);
  }, [searchText, debouncedFetchAddresses]);

  // Обрабатывает изменения в поле поиска адреса
  const onSearch = (searchText) => {
    setSearchText(searchText);
    debouncedFetchAddresses(searchText);
  };
  //Поля для ручного ввода адреса регистрации
  const manualAddressFields = (
    <>
      {AddressRegistrationJson.map(item =>
        <TextInput
          read={read}
          edit={edit}
          value={value?.manual[item.name]}
          displayName={item.displayName}
          name={item.name}
          description={item.description}
        />
      )}
    </>
  );
  console.log(value?.manual)
  return (
    <>
      <Divider orientation="center">Место регистрации</Divider>
      {!manualAddressInput && !value?.manual ? (
        <>
          <Form.Item label="Адрес" name={"addressRegistration"}>
            <AutoComplete
              options={addressOptions.map((option) => ({
                ...option,
                label: (
                  <div style={{ whiteSpace: "normal" }}>{option.label}</div>
                ),
              }))}
              onSelect={onSelect}
              onSearch={onSearch}
              popupMatchSelectWidth={true}
              style={{ width: "100%" }}
            >
              <TextArea placeholder="Начните вводить" style={{ height: 60 }} />
            </AutoComplete>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.addressRegistration !== currentValues.addressRegistration
            }
          >
            <Form.Item name="addressRegistrationFias" hidden>
              <Input type="hidden" />
            </Form.Item>
          </Form.Item>
        </>
      ) : (
        manualAddressFields
      )}
      {!read &&

        <Form.Item name={"addressRegistrationManual"}>
          <Checkbox checked={manualAddressInput} onChange={handleManualAddressCheckbox}>
            Ввести адрес по полям вручную
          </Checkbox>
        </Form.Item>
      }
    </>
  );
}
