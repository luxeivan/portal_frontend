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
  // manualInputFields,
}) {
  const [manualInput, setManualInput] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addressOptions, setAddressOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  // Form.useWatch(`${name}fullAddress`, form)

  useEffect(() => {
    if (manualValue) {
      setManualInput(true);
    }
  }, [manualValue]);
  console.log(value)
  //Здесь надо реализовать формирование поля в зависимости от выбранного метода ввода
  // let obj = {}
  // //console.log(manualInput)
  // if (manualInput) {
  //   delete obj.fias
  //   delete obj.manual
  //   obj.manual = {}
  //   manualInputFields.forEach(item => {
  //     // console.log(form.getFieldsValue()[`${name}${item.name}`])
  //     obj.manual[`${name}${item.name}`] = form.getFieldsValue()[`${name}${item.name}`]
  //     //console.log(obj)
  //   })
  // } else {
  //   delete obj.manual
  //   delete obj.fias
  //   obj.fias = {
  //     [`${name}fullAddress`]: form.getFieldsValue()[`${name}fullAddress`],
  //     [`${name}fiasId`]: form.getFieldsValue()[`${name}fiasId`]
  //   }
  // }
  // console.log(obj)
  // form.setFieldsValue({
  //   [`${name}`]: { ...obj }
  // })

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
        [name]: {
          [`fullAddress`]: undefined,
          [`fiasId`]: undefined,
          // [`manual_${name}`]: "1",
        },
      });
      //console.log(form.getFieldsValue());
    } else {
      let obj = {
        // [`manual_${name}`]: "0", 
      }
      manualInputFields.forEach(item => {
        obj[item.name] = undefined
      })
      console.log(obj)
      form.setFieldsValue({ [name]: { ...obj } });
    }
  };

  const onSelect = (value, option) => {
    setSelectedAddress(option.value);
    //console.log(option);
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
            {manualInput &&
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
            {read && value.manual &&
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


            {!manualInput && <>
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
                {read && !value.manual && (
                  <Typography.Text>{value?.fullAddress}</Typography.Text>
                )}
              </Form.Item>
              <Form.Item name={`fiasId`} noStyle>
                <Input type="hidden" />
              </Form.Item>
            </>
            }
            {/* <Form.Item name={`${name}`} noStyle>
              <Input type="hidden" />
            </Form.Item> */}
            {!read &&
              <Form.Item name='manual' valuePropName="checked">
                <Checkbox defaultChecked={false} checked={manualInput} onChange={handleManualCheckboxChange}>
                  Ввести адрес вручную
                </Checkbox>
              </Form.Item>
            }
          </>


        }}
      </Form.List>
    </>
  );
}
