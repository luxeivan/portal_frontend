import React, { useState, useEffect, useCallback } from "react";
import { Form, AutoComplete, Checkbox, Input, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import TextInput from "../TextInput";
import axios from "axios";
import { debounce } from "lodash";
import config from "../../../config";
import manualInputFields from "./ManualInputFields.json";

export default function AddressInput({
  form,
  read,
  edit,
  value = [],
  manualValue,
  name,
  matchedWith = false
  // manualInputFields,
}) {
  const [manualInput, setManualInput] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addressOptions, setAddressOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  Form.useWatch([name, 'matchedWith'], form)
  
  if (Form.useWatch([name, 'manual'], form)) {
    form.setFieldsValue({
      [name]: {
        [`fullAddress`]: undefined,
        [`fiasId`]: undefined,
      },
    });
  } else {
    let obj = {
    }
    manualInputFields.forEach(item => {
      obj[item.name] = undefined
    })
    //console.log(obj)
    form.setFieldsValue({ [name]: { ...obj } });
  }

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

  const onSelect = (value, option) => {
    setSelectedAddress(option.value);
    form.setFieldsValue({
      [name]: {
        [`fiasId`]: option.fias_id,
      }
    });
  };

  //console.log(manualInputFields);
  return (
    <>
      <Form.List name={name}>
        {(fields) => {
          return <>
            {!read && matchedWith &&
              <Form.Item name="matchedWith" valuePropName="checked" initialValue={false}>
                <Checkbox
                >Совпадает с адресом регистрации</Checkbox>
              </Form.Item>
            }
            {!form.getFieldValue(name)?.matchedWith &&
              <>
              {!read &&
                <Form.Item name='manual' valuePropName="checked" initialValue={false}>
                  <Checkbox>
                    Ввести адрес вручную
                  </Checkbox>
                </Form.Item>
              }
                {form.getFieldValue(name)?.manual &&
                  manualInputFields.map((item, index) => (
                    <TextInput
                      key={index}
                      read={read}
                      edit={edit}
                      value={value[`${item.name}`]}
                      displayName={item.displayName}
                      name={`${item.name}`}
                      placeholder={item.placeholder}
                      description={item.description}
                    />
                  ))}
                {read && value?.manual &&
                  manualInputFields.map((item, index) => (
                    <TextInput
                      key={index}
                      read={read}
                      edit={edit}
                      value={value[`${item.name}`]}
                      displayName={item.displayName}
                      name={`${item.name}`}
                      placeholder={item.placeholder}
                      description={item.description}
                    />
                  ))}


                {!form.getFieldValue(name)?.manual && <>
                  <Form.Item label="Адрес" name={`fullAddress`}>
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
                    {read && !value?.manual && (
                      <Typography.Text>{value?.fullAddress}</Typography.Text>
                    )}
                  </Form.Item>
                  <Form.Item name={`fiasId`} noStyle>
                    <Input type="hidden" />
                  </Form.Item>
                </>
                }
              </>
            }
          </>


        }}
      </Form.List>
    </>
  );
}
