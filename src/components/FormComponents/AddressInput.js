import React, { useState, useEffect, useCallback } from "react";
import { Form, AutoComplete, Checkbox, Input, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import TextInput from "./TextInput";
import axios from "axios";
import { debounce } from "lodash";
import config from "../../config";
import manualInputFields from "../../pages/Cabinet/Subjects/ManualInputFields.json";

export default function AddressInput({
  form,
  read,
  edit,
  value,
  manualValue,
  name,
  // manualInputFields,
}) {
  const [manualInput, setManualInput] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addressOptions, setAddressOptions] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (manualValue) {
      setManualInput(true);
    }
  }, [manualValue]);

  // Функция для выполнения запроса к API и получения адресов
  const fetchAddresses = async (searchText) => {
    if (!searchText) {
      setAddressOptions([]);
      return;
    }
    try {
      const response = await axios.get(
        `${config.backServer}/api/cabinet/get-fias`,
        {
          params: { searchString: searchText },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Предполагается, что токен есть в localStorage
          },
        }
      );
      if (response.status === 200) {
        const preparingData = response.data.data.map((item) => ({
          label: (
            <Typography.Text style={{ width: "100%", whiteSpace: "normal" }}>
              {item.value}
            </Typography.Text>
          ),
          value: item.value,
          fias_id: item.data.fias_id,
        }));
        setAddressOptions(preparingData);
      } else {
        // Обрабатываем ситуацию, когда статус ответа не 200
        setAddressOptions([]);
      }
    } catch (error) {
      console.error("Ошибка при получении адресов:", error);
      setAddressOptions([]);
    }
  };

  // Debounced версия fetchAddresses
  const debouncedFetchAddresses = useCallback(
    debounce(fetchAddresses, 800),
    []
  );

  const onSearch = (searchText) => {
    setSearchText(searchText);
    debouncedFetchAddresses(searchText);
  };

  const handleManualCheckboxChange = (e) => {
    setManualInput(e.target.checked);
    if (e.target.checked) {
      setSelectedAddress("");
      form.setFieldsValue({
        [`${name}fullAddress`]: "",
        [`${name}fiasId`]: "",
        [`manual${name}`]: "1",
      });
      console.log(form.getFieldsValue());
    } else {
      form.setFieldsValue({
        [`manual${name}`]: "0",
      });
    }
  };

  const onSelect = (value, option) => {
    setSelectedAddress(option.value);
    console.log(option);
    form.setFieldsValue({
      [`${name}fiasId`]: option.fias_id,
    });
  };

  console.log(manualInputFields);
  return (
    // <>
    //   {manualInput || (read && value?.manual) ? (
    //     <>
    //       {manualInputFields.map((item) => (
    //         <TextInput
    //           key={item.name}
    //           read={read}
    //           edit={edit}
    //           value={value?.manual[item.name]}
    //           displayName={item.displayName}
    //           name={`${name}${item.name}`}
    //           description={item.description}
    //         />
    //       ))}
    //     </>
    //   ) : (
    //     <>
    //       <Form.Item label="Адрес" name={`${name}fullAddress`}>
    //         {!read && (
    //           <AutoComplete
    //             options={addressOptions}
    //             onSelect={onSelect}
    //             onSearch={onSearch}
    //             style={{ width: "100%" }}
    //           >
    //             <TextArea
    //               placeholder="Начните вводить адрес"
    //               style={{ height: 60 }}
    //             />
    //           </AutoComplete>
    //         )}
    //         {read && (
    //           <Typography.Text>{value?.fias?.fullAddress}</Typography.Text>
    //         )}
    //       </Form.Item>
    //       <Form.Item name={`${name}fiasId`} noStyle>
    //         <Input type="hidden" />
    //       </Form.Item>
    //       {/* {manualInput && (
    //         <Form.Item name={`manual${name}`} noStyle>
    //           <Checkbox
    //             checked={manualInput}
    //             onChange={handleManualCheckboxChange}
    //           >
    //             Ввести адрес вручную
    //           </Checkbox>
    //         </Form.Item>
    //       )} */}
    //     </>
    //   )}
    // </>
    <>
      <Form.Item name={`${name}manual`} valuePropName="checked">
        <Checkbox checked={manualInput} onChange={handleManualCheckboxChange}>
          Ввести адрес вручную
        </Checkbox>
      </Form.Item>

      {manualInput ? (
        <>
          {Array.isArray(manualInputFields) &&
            manualInputFields.map((item) => (
              <TextInput
                key={item.name}
                read={read}
                edit={edit}
                value={value?.manual[item.name]}
                displayName={item.displayName}
                name={`${name}${item.name}`}
                placeholder={item.placeholder}
                description={item.description}
              />
            ))}
        </>
      ) : (
        <>
          <Form.Item label="Адрес" name={`${name}fullAddress`}>
            {!read && (
              <AutoComplete
                options={addressOptions}
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
            {read && (
              <Typography.Text>{value?.fias?.fullAddress}</Typography.Text>
            )}
          </Form.Item>
          <Form.Item name={`${name}fiasId`} noStyle>
            <Input type="hidden" />
          </Form.Item>
        </>
      )}
    </>
  );
}
