import React, { useState } from "react";
import {
  Flex,
  Input,
  Form,
  Select,
  AutoComplete,
  Checkbox,
  Button,
  Upload,
  Divider,
  message,
} from "antd";

import useAuth from "../../../stores/./useAuth";
import useRegistration from "../../.././stores/useRegistration";

import { UploadOutlined } from "@ant-design/icons";

import { formItemLayout } from "../../.././components/configSizeForm";

const { Option } = Select;

export default function ModalFizLica() {
  const [documentType, setDocumentType] = useState("passport");
  const [manualAddressInput, setManualAddressInput] = useState(false);
  const [autoCompleteData, setAutoCompleteData] = useState([]);

  const onDocumentTypeChange = (value) => {
    setDocumentType(value);
  };

  const handleManualAddressCheckbox = (e) => {
    setManualAddressInput(e.target.checked);
  };

  const handleAddressSearch = (searchText) => {
    // API-вызов для получения предложений адресов
    const addressSuggestions = getAddressSuggestions(searchText);
    setAutoCompleteData(addressSuggestions);
  };

  const getAddressSuggestions = (searchText) => {
    // Здесь должен быть API-запрос или временная заглушка для предложений адресов.
    // Возвращаем простой пример данных для демонстрации:
    return searchText ? [{ value: "Адрес 1" }, { value: "Адрес 2" }] : [];
  };

  const authState = useAuth((state) => ({
    phone: state.phone,
    email: state.email,
  }));

  const registrationState = useRegistration((state) => ({
    phone: state.phone,
    email: state.email,
  }));

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} файл загружен успешно`);
      } else if (info.file.status === "error") {
        message.error(
          `${info.file.name} файл не загрузился, попробуйте ешё раз.`
        );
      }
    },
  };

  const handlePhoneChange = (e) => {
    console.log("Новый номер телефона:", e.target.value);
  };

  const handleEmailChange = (e) => {
    console.log("Новый email:", e.target.value);
  };

  const userPhone = authState.phone || registrationState.phone;
  const userEmail = authState.email || registrationState.email;

  return (
    <Form {...formItemLayout}>
      <Divider orientation="center">ФИО</Divider>

      <Form.Item label="Фамилия">
        <Input />
      </Form.Item>
      <Form.Item label="Имя">
        <Input />
      </Form.Item>
      <Form.Item label="Отчество">
        <Input />
      </Form.Item>
      <Divider orientation="center">Подтверждающий документ</Divider>

      <Form.Item label="Тип документа">
        <Select defaultValue="passport" onChange={onDocumentTypeChange}>
          <Option value="passport">Паспорт гражданина РФ</Option>
          <Option value="other">Иной документ</Option>
        </Select>
      </Form.Item>
      {documentType === "passport" && (
        <>
          <Flex gap="middle" vertical>
            <Form.Item label="Серия паспорта">
              <Input maxLength={4} pattern="\d*" />
            </Form.Item>
            <Form.Item label="Номер паспорта">
              <Input maxLength={6} pattern="\d*" />
            </Form.Item>
            <Form.Item label="Код подразделения">
              <Input maxLength={6} pattern="\d*" />
            </Form.Item>
            <Form.Item label="Кем выдан">
              <Input />
            </Form.Item>
          </Flex>
        </>
      )}
      {documentType === "other" && (
        <>
          <Form.Item label="Тип документа">
            <Select>
              <Option value="type1">Тип1</Option>
              <Option value="type2">Тип2</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Реквизиты документа">
            <Input />
          </Form.Item>
        </>
      )}
      <Form.Item label="Загрузить файл">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}></Button>
        </Upload>
      </Form.Item>
      <Form.Item label="СНИЛС">
        <Input />
      </Form.Item>
      <Divider orientation="center">Адрес</Divider>

      <Form.Item label="Адрес по месту регистрации">
        {manualAddressInput ? (
          <Input />
        ) : (
          <AutoComplete
            options={autoCompleteData}
            onSearch={handleAddressSearch}
            placeholder="Введите адрес"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={manualAddressInput}
          onChange={handleManualAddressCheckbox}
        >
          Ввести адрес по полям вручную
        </Checkbox>
      </Form.Item>
      {/* <Divider orientation="center">Адрес проживания</Divider> */}
      <Form.Item label="Адрес проживания">
        {manualAddressInput ? (
          <Input />
        ) : (
          <AutoComplete
            options={autoCompleteData}
            onSearch={handleAddressSearch}
            placeholder="Введите адрес"
          />
        )}
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={manualAddressInput}
          onChange={handleManualAddressCheckbox}
        >
          Ввести адрес по полям вручную
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox>Совпадает с адресом по месту регистрации</Checkbox>
      </Form.Item>
      <Divider orientation="center">Другое</Divider>
      <Form.Item label="Мобильный номер телефона">
        <Input defaultValue={userPhone} onChange={handlePhoneChange} />
      </Form.Item>
      <Form.Item label="Адрес электронной почты">
        <Input defaultValue={userEmail} onChange={handleEmailChange} />
      </Form.Item>
    </Form>
  );
}
