import React, { useState, useEffect } from "react";

import { Input, Form, AutoComplete, Checkbox, Divider, Typography } from "antd";

import useSubjects from "../../stores/Cabinet/useSubjects";
import TextArea from "antd/es/input/TextArea";

export default function AddressRegistration({ form, read, edit, value }) {
  const [searchText] = useState("");
  const [manualAddressInput, setManualAddressInput] = useState(false);
  const [countryRegistration, setCountryRegistration] = useState("");
  const [cityRegistration, setCityRegistration] = useState("");
  const [streetRegistration, setStreetRegistration] = useState("");
  const [postcodeRegistration, setPostcodeRegistration] = useState("");
  const [regionRegistration, setRegionRegistration] = useState("");
  const [areaRegistration, setAreaRegistration] = useState("");
  const [localityRegistration, setLocalityRegistration] = useState("");
  const [houseNumberRegistration, setHouseNumberRegistration] = useState("");
  const [frameRegistration, setFrameRegistration] = useState("");
  const [apartmentNumberRegistration, setApartmentNumberRegistration] =
    useState("");
  const [buildingRegistration, setBuildingRegistration] = useState("");
  const [kommentRegistration, setKommentRegistration] = useState("");
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

  const getAddressString = () => {
    return [
      countryRegistration,
      postcodeRegistration,
      regionRegistration,
      areaRegistration,
      cityRegistration,
      localityRegistration,
      streetRegistration,
      houseNumberRegistration,
      frameRegistration,
      buildingRegistration,
      apartmentNumberRegistration,
      kommentRegistration,
    ]
      .filter(Boolean)
      .join(", ");
  };

  useEffect(() => {
    form.setFieldsValue({
      manualAddressRegistration: {
        countryRegistration,
        postcodeRegistration,
        regionRegistration,
        areaRegistration,
        cityRegistration,
        localityRegistration,
        streetRegistration,
        houseNumberRegistration,
        frameRegistration,
        buildingRegistration,
        apartmentNumberRegistration,
        kommentRegistration,
      }
      // fullAddressRegistration: getAddressString() 
    });
  }, [
    countryRegistration,
    postcodeRegistration,
    regionRegistration,
    areaRegistration,
    cityRegistration,
    localityRegistration,
    streetRegistration,
    houseNumberRegistration,
    frameRegistration,
    buildingRegistration,
    apartmentNumberRegistration,
    form,
    kommentRegistration,
  ]);

  //Поля для ручного ввода адреса регистрации
  const manualAddressFields = (
    <>
      <Form.Item label="Адрес регистрации" name="fullAddressRegistration">
        <Input readOnly />
      </Form.Item>
      <Form.Item label="Почтовый индекс" name="postcodeRegistration">
        <Input
          value={postcodeRegistration}
          onChange={(e) => setPostcodeRegistration(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Страна" name="countryRegistration">
        <Input
          value={countryRegistration}
          onChange={(e) => setCountryRegistration(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Регион" name="regionRegistration">
        <Input
          value={regionRegistration}
          onChange={(e) => setRegionRegistration(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Район" name="areaRegistration">
        <Input
          value={areaRegistration}
          onChange={(e) => setAreaRegistration(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Город" name="cityRegistration">
        <Input
          value={cityRegistration}
          onChange={(e) => setCityRegistration(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Населенный пункт" name="localityRegistration">
        <Input
          value={localityRegistration}
          onChange={(e) => setLocalityRegistration(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Улица" name="streetRegistration">
        <Input
          value={streetRegistration}
          onChange={(e) => setStreetRegistration(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Номер дома" name="houseNumberRegistration">
        <Input
          value={houseNumberRegistration}
          onChange={(e) =>
            setHouseNumberRegistration(e.target.vaRegistrationlue)
          }
        />
      </Form.Item>
      <Form.Item label="Корпус" name="frameRegistration">
        <Input
          value={frameRegistration}
          onChange={(e) => setFrameRegistration(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Строение" name="buildingRegistration">
        <Input
          value={buildingRegistration}
          onChange={(e) => setBuildingRegistration(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Квартира/Офис/Комната"
        name="apartmentNumberRegistration"
      >
        <Input
          value={apartmentNumberRegistration}
          onChange={(e) => setApartmentNumberRegistration(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Комментарий" name="kommentRegistration">
        <TextArea
          placeholder="..."
          style={{
            height: 60,
          }}
          value={kommentRegistration}
          onChange={(e) => setKommentRegistration(e.target.value)}
        />
      </Form.Item>
    </>
  );

  return (
    <>
      <Divider orientation="center">Место регистрации</Divider>

      {read ? (
        <Form.Item label="Адрес регистрации">
          <Typography.Text>{value.addressRegistration}</Typography.Text>
        </Form.Item>
      ) : (
        <>
          {!manualAddressInput ? (
            <>
              <Form.Item
                label="Адрес"
                name={"addressRegistration"}
                rules={[{ validator: validateAddress }]}
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
                    style={{ height: 60 }}
                  />
                </AutoComplete>
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

          <Form.Item>
            <Checkbox
              checked={manualAddressInput}
              onChange={handleManualAddressCheckbox}
            >
              Ввести адрес по полям вручную
            </Checkbox>
          </Form.Item>
        </>
      )}
    </>
  );
}