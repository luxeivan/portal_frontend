import React, { useState, useEffect } from "react";

import {
  Input,
  Form,
  AutoComplete,
  Checkbox,
  Divider,
} from "antd";

import useSubjects from "../../../stores/Cabinet/useSubjects";
import TextArea from "antd/es/input/TextArea";

export default function Address({ onSubmit, setShowModalAdd }) {
  const [searchText] = useState("");
  const [manualAddressInput, setManualAddressInput] = useState(false);
  const [registrationAddress] = useState("");
  const [isAddressSame, setIsAddressSame] = useState(false);
  const [residenceAddress, setResidenceAddress] = useState(""); // я х.з почему, но без residenceAddress всё крашится
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");

  const [manualResidenceAddressInput, setManualResidenceAddressInput] =
    useState(false);
  const [selectedRegistrationAddress, setSelectedRegistrationAddress] =
    useState("");
  const [selectRedesidenceAddress, setSelectedResidenceAddress] = useState("");

  const { addressOptions, setSearchText, debouncedFetchAddresses } =
    useSubjects();

  // Включает или выключает ручной ввод адреса регистрации
  const handleManualAddressCheckbox = (e) => {
    setManualAddressInput(e.target.checked);
    if (e.target.checked) {
      setSelectedRegistrationAddress("");
    }
  };

  // Устанавливает адрес проживания, если он совпадает с адресом регистрации
  const handleAddressCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsAddressSame(isChecked);
    if (isChecked) {
      setResidenceAddress(registrationAddress);
    } else {
      setResidenceAddress("");
    }
  };

  // Устанавливает адрес, выбранный из списка
  const onSelect = (value, option) => {
    setSelectedRegistrationAddress(option.value);
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

  // Включает или выключает ручной ввод адреса проживания
  const handleManualResidenceAddressCheckbox = (e) => {
    setManualResidenceAddressInput(e.target.checked);
    if (e.target.checked) {
      setSelectedResidenceAddress("");
    }
  };

  //Поля для ручного ввода адреса регистрации
  const manualAddressFields = (
    <>
      <Form.Item label="Город" name="city">
        <Input value={city} onChange={(e) => setCity(e.target.value)} />
      </Form.Item>

      <Form.Item label="Улица" name="street">
        <Input value={street} onChange={(e) => setStreet(e.target.value)} />
      </Form.Item>

      <Form.Item label="Номер дома" name="houseNumber">
        <Input
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Номер квартиры" name="apartmentNumber">
        <Input
          value={apartmentNumber}
          onChange={(e) => setApartmentNumber(e.target.value)}
        />
      </Form.Item>
    </>
  );

  //Поля для ручного ввода адреса проживания
  const manualResidenceAddressFields = (
    <>
      <Form.Item label="Город" name="residenceCity">
        <Input />
      </Form.Item>
      <Form.Item label="Улица" name="residenceStreet">
        <Input />
      </Form.Item>
      <Form.Item label="Номер дома" name="residenceStreet">
        <Input />
      </Form.Item>
      <Form.Item label="Номер квартиры" name="residenceStreet">
        <Input />
      </Form.Item>
    </>
  );

  return (
    <>
      <Divider orientation="center">Место регистрации</Divider>

      {/* _______Место регистрации_______ */}
      {!manualAddressInput ? (
        // Автокомплит для адреса, если ввод не ручной
        <Form.Item
          label="Адрес"
          name={"registration"}
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите адрес регистрации",
            },
            { validator: validateAddress },
          ]}
        >
          {manualAddressInput ? (
            <Input />
          ) : (
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
              <TextArea
                placeholder="Начните вводить"
                style={{
                  height: 60,
                }}
              />
            </AutoComplete>
          )}
        </Form.Item>
      ) : (
        manualAddressFields
      )}

      {/* _______Чекбокс ручного ввода_______ */}
      <Form.Item>
        <Checkbox
          checked={manualAddressInput}
          onChange={handleManualAddressCheckbox}
        >
          Ввести адрес по полям вручную
        </Checkbox>
      </Form.Item>

      <Divider orientation="center">Место проживания</Divider>

      {/* _______Чекбокс совпадения адреса_______ */}
      <Form.Item>
        <Checkbox
          checked={isAddressSame}
          onChange={handleAddressCheckboxChange}
        >
          Совпадает с адресом по месту регистрации
        </Checkbox>
      </Form.Item>

      {/* _______Если адрес совпадает_______ */}

      {!isAddressSame && (
        <>
          {manualResidenceAddressInput ? (
            // Тут используем поля для ручного ввода адреса проживания
            manualResidenceAddressFields
          ) : (
            <Form.Item
              label="Адрес проживания"
              name="livingAddress"
              rules={[
                {
                  required: true,
                  message: "Введите город, улицу, номер дома и квартиру",
                },
                { validator: validateAddress },
              ]}
            >
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
                <TextArea
                  placeholder="Начните вводить"
                  style={{
                    height: 60,
                  }}
                />
              </AutoComplete>
            </Form.Item>
          )}

          <Form.Item>
            <Checkbox
              checked={manualResidenceAddressInput}
              onChange={handleManualResidenceAddressCheckbox}
            >
              Ввести адрес проживания по полям вручную
            </Checkbox>
          </Form.Item>
        </>
      )}
    </>
  );
}
