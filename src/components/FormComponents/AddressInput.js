

import React, { useState, useEffect } from "react";
import { Form, AutoComplete, Checkbox, Input, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import TextInput from "./TextInput";

export default function AddressInput({
  form,
  read,
  edit,
  value,
  manualValue,
  fieldName,
  addressOptions,
  debouncedFetchAddresses,
  setSearchText,
  manualInputFields,
}) {
  const [manualInput, setManualInput] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    if (manualValue) {
      setManualInput(true);
    }
  }, [manualValue]);

  const handleManualCheckboxChange = (e) => {
    setManualInput(e.target.checked);
    if (e.target.checked) {
      setSelectedAddress("");
      form.setFieldsValue({
        [`${fieldName}FullAddress`]: "",
        [`${fieldName}FiasId`]: "",
        [`${fieldName}Manual`]: "1",
      });
    } else {
      form.setFieldsValue({
        [`${fieldName}Manual`]: "0",
      });
    }
  };

  const onSelect = (value, option) => {
    setSelectedAddress(option.value);
    form.setFieldsValue({
      [`${fieldName}FiasId`]: option.fias_id,
    });
  };

  const onSearch = (searchText) => {
    setSearchText(searchText);
    debouncedFetchAddresses(searchText);
  };

  const validateAddress = (rule, value) => {
    if (selectedAddress === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Выберите адрес из списка"));
  };

  return (
    <>
      {manualInput || (read && value?.manual) ? (
        <>
          {manualInputFields.map((item) => (
            <TextInput
              key={item.name}
              read={read}
              edit={edit}
              value={value?.manual[item.name]}
              displayName={item.displayName}
              name={`${fieldName}${item.name}`}
              description={item.description}
            />
          ))}
        </>
      ) : (
        <>
          <Form.Item
            label="Адрес"
            name={`${fieldName}FullAddress`}
            rules={[{ validator: validateAddress }]}
          >
            {!read && (
              <AutoComplete
                options={addressOptions.map((option) => ({
                  value: option.value,
                  label: (
                    <div style={{ whiteSpace: "normal" }}>{option.label}</div>
                  ),
                }))}
                onSelect={onSelect}
                onSearch={onSearch}
                style={{ width: "100%" }}
              >
                <TextArea
                  placeholder="Начните вводить адрес"
                  style={{ height: 60 }}
                />
              </AutoComplete>
            )}
            {read && <Typography.Text>{value?.fias?.fullAddress}</Typography.Text>}
          </Form.Item>
          <Form.Item name={`${fieldName}FiasId`} noStyle>
            <Input type="hidden" />
          </Form.Item>
        </>
      )}
      {!read && (
        <Form.Item name={`${fieldName}Manual`} noStyle>
          <Checkbox
            checked={manualInput}
            onChange={handleManualCheckboxChange}
          >
            Ввести адрес вручную
          </Checkbox>
        </Form.Item>
      )}
    </>
  );
}
