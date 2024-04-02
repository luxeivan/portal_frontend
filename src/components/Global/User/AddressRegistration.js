import React, { useState, useEffect } from "react";

import { Input, Form, AutoComplete, Checkbox, Divider } from "antd";

import useSubjects from "../../../stores/Cabinet/useSubjects";
import TextArea from "antd/es/input/TextArea";

export default function AddressRegistration({ form }) {
  const [searchText] = useState("");
  const [manualAddressInput, setManualAddressInput] = useState(false);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");
  const [region, setRegion] = useState("");
  const [area, setArea] = useState("");
  const [locality, setLocality] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [frame, setFrame] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [building, setBuilding] = useState("");
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
      <Form.Item label="Почтовый индекс" name="postcode">
        <Input value={postcode} onChange={(e) => setPostcode(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Регион"
        name="region"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите регион",
          },
        ]}
      >
        <Input value={region} onChange={(e) => setRegion(e.target.value)} />
      </Form.Item>

      <Form.Item label="Район" name="area">
        <Input value={area} onChange={(e) => setArea(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Город"
        name="city"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите город",
          },
        ]}
      >
        <Input value={city} onChange={(e) => setCity(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Населенный пункт"
        name="locality"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите населенный пункт",
          },
        ]}
      >
        <Input value={locality} onChange={(e) => setLocality(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Улица"
        name="street"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите улицу",
          },
        ]}
      >
        <Input value={street} onChange={(e) => setStreet(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Номер дома"
        name="houseNumber"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите номер дома",
          },
        ]}
      >
        <Input
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Корпус" name="frame">
        <Input value={frame} onChange={(e) => setFrame(e.target.value)} />
      </Form.Item>

      <Form.Item label="Строение" name="building">
        <Input value={building} onChange={(e) => setBuilding(e.target.value)} />
      </Form.Item>

      <Form.Item label="Квартира/Офис/Комната" name="apartmentNumber">
        <Input
          value={apartmentNumber}
          onChange={(e) => setApartmentNumber(e.target.value)}
        />
      </Form.Item>
    </>
  );

  return (
    <>
      <Divider orientation="center">Место регистрации</Divider>

      {/* _______Место регистрации_______ */}
      {!manualAddressInput ? (
        // Автокомплит для адреса, если ввод не ручной
        <>
          <Form.Item
            label="Адрес"
            name={"addressRegistration"}
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
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.addressRegistration !==
              currentValues.addressRegistration
            }
          >
            {() => (
              <Form.Item name="addressRegistrationFias" hidden>
                <Input type="hidden" />
              </Form.Item>
            )}
          </Form.Item>
        </>
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
    </>
  );
}
