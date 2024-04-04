import React, { useState, useEffect } from "react";

import { Input, Form, AutoComplete, Checkbox, Divider } from "antd";

import useSubjects from "../../../stores/Cabinet/useSubjects";
import TextArea from "antd/es/input/TextArea";

export default function AddressResidential({ form }) {
  const [searchText] = useState("");
  const [isAddressSame, setIsAddressSame] = useState(false);
  const [cityResidence, setCityResidence] = useState("");
  const [streetResidence, setStreetResidence] = useState("");
  const [postcodeResidence, setPostcodeResidence] = useState("");
  const [regionResidence, setRegionResidence] = useState("");
  const [areaResidence, setAreaResidence] = useState("");
  const [localityResidence, setLocalityResidence] = useState("");
  const [houseNumberResidence, setHouseNumberResidence] = useState("");
  const [frameResidence, setFrameResidence] = useState("");
  const [apartmentNumberResidence, setApartmentNumberResidence] = useState("");
  const [buildingResidence, setBuildingResidence] = useState("");

  const [manualResidenceAddressInput, setManualResidenceAddressInput] =
    useState(false);
  const [selectedResidenceAddress, setSelectedResidenceAddress] = useState("");
  const [redesidenceFiasId, setRedesidenceFiasId] = useState("");

  const { addressOptions, setSearchText, debouncedFetchAddresses } =
    useSubjects();

  // Устанавливает адрес проживания, если он совпадает с адресом регистрации
  const handleAddressCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsAddressSame(isChecked);
    if (isChecked) {
      form.setFieldsValue({
        addressResidential: form.getFieldValue("addressRegistration"),
        addressResidentialFias: form.getFieldValue("addressResidential"),
      });
    } else {
      form.setFieldsValue({
        addressResidential: "",
        addressResidentialFias: "",
      });
    }
  };

  const onSelectResidential = (value, option) => {
    setSelectedResidenceAddress(option.value);
    setRedesidenceFiasId(option.fias_id); // сохраняем fias_id
    form.setFieldsValue({
      addressResidential: option.value,
      addressResidentialFias: option.fias_id,
    });
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

  //Поля для ручного ввода адреса проживания
  const manualResidenceAddressFields = (
    <>
      <Form.Item label="Почтовый индекс" name="postcodeResidence">
        <Input
          value={postcodeResidence}
          onChange={(e) => setPostcodeResidence(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Регион"
        name="regionResidence"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите регион",
          },
        ]}
      >
        <Input
          value={regionResidence}
          onChange={(e) => setRegionResidence(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Район" name="areaResidence">
        <Input
          value={areaResidence}
          onChange={(e) => setAreaResidence(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Город"
        name="cityResidence"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите город",
          },
        ]}
      >
        <Input
          value={cityResidence}
          onChange={(e) => setCityResidence(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Населенный пункт"
        name="localityResidence"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите населенный пункт",
          },
        ]}
      >
        <Input
          value={localityResidence}
          onChange={(e) => setLocalityResidence(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Улица"
        name="streetResidence"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите улицу",
          },
        ]}
      >
        <Input
          value={streetResidence}
          onChange={(e) => setStreetResidence(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Номер дома"
        name="houseNumberResidence"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите номер дома",
          },
        ]}
      >
        <Input
          value={houseNumberResidence}
          onChange={(e) => setHouseNumberResidence(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Корпус" name="frameResidence">
        <Input
          value={frameResidence}
          onChange={(e) => setFrameResidence(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Строение" name="buildingResidence">
        <Input
          value={buildingResidence}
          onChange={(e) => setBuildingResidence(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Квартира/Офис/Комната" name="apartmentNumberResidence">
        <Input
          value={apartmentNumberResidence}
          onChange={(e) => setApartmentNumberResidence(e.target.value)}
        />
      </Form.Item>
    </>
  );

  const validateResidenceAddress = (rule, value) => {
    if (selectedResidenceAddress === value) {
      return Promise.resolve();
    }
    return Promise.reject("Выберите адрес из списка");
  };

  return (
    <>
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
            <>
              <Form.Item
                label="Адрес"
                name="addressResidential"
                rules={[
                  {
                    required: true,
                    message: "Введите город, улицу, номер дома и квартиру",
                  },
                  { validator: validateResidenceAddress },
                ]}
              >
                <AutoComplete
                  options={addressOptions.map((option) => ({
                    ...option,
                    label: (
                      <div style={{ whiteSpace: "normal" }}>{option.label}</div>
                    ),
                  }))}
                  onSelect={onSelectResidential}
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
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.addressResidential !==
                  currentValues.addressResidential
                }
              >
                {() => (
                  <Form.Item name="addressResidentialFias" hidden>
                    <Input type="hidden" />
                  </Form.Item>
                )}
              </Form.Item>
            </>
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
