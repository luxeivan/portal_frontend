
import React, { useState } from "react";
import { Form, Input, Button, Divider, AutoComplete, Typography, InputNumber } from "antd";
import axios from "axios";
import config from "../../config";
import UploaderInput from "../FormComponents/UploaderInput";
import { formItemLayout } from "../configSizeForm";

export default function InnKppOkvedInput({ name }) {
  const form = Form.useFormInstance();
  const [suggestions, setSuggestions] = useState([]);

  const onSearch = async (searchText) => {
    if (!searchText) {
      return;
    }
    try {
      const response = await axios.get(
        `${config.backServer}/api/cabinet/get-inn/LEGAL?inn=${searchText}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      if (response.data && response.data.data) {
        console.log(response.data.data)
        setSuggestions(
          response.data.data.map((s) => ({
            value: s.data.inn,
            kpp: s.data.kpp,
            hid: s.data.hid,
            label: s.value,
            ogrn: s.data.ogrn,
            address: s.data.address,
            fullNameDirector: s.data.management?.name,
          }))
        );
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Ошибка при поиске организации:", error);
    }
  };

  const onSelect = (value, option) => {
    //console.log(option)
    //console.log(suggestions)

    const orgData = suggestions.find((org) => org.hid === option.key);
    if (orgData) {
      console.log(orgData)
      form.setFieldsValue({
        inn: orgData.value,
        fullName: orgData.label,
        fullNameDirector: orgData.fullNameDirector,
        kpp: orgData.kpp,
        ogrn: orgData.ogrn,
        urAddress:{fullAddress: orgData.address.value,},
        mailingAddress:{fullAddress: orgData.address.value,}
      });
    }
  };

  const renderItem = (organization) => {
    //console.log(organization)
    return ({
      value: organization.hid,
      key: organization.hid,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Text>{organization.label}</Typography.Text>
          {/* <Typography.Text style={{ fontWeight: 600 }}>
          КПП: {organization.kpp}
        </Typography.Text> */}
        </div>
      ),
    })
  };

  return (
    <>
      {/* <Divider orientation="center">ИНН</Divider> */}
      <Form.Item
        name={name}
        label="ИНН"
        rules={[{ required: true, message: "Введите ИНН" }]}
      >
        <AutoComplete
          onSearch={onSearch}
          onSelect={onSelect}
          options={suggestions.map(renderItem)}
          notFoundContent="Ничего не найдено"
        >
          <Input placeholder="Введите ИНН для поиска" />
        </AutoComplete>
      </Form.Item>
      {/* <Form.Item name="name" label="Наименование">
          <Input  />
        </Form.Item> */}
      {/* <Form.Item name="kpp" label="КПП">
          <Input  />
        </Form.Item> */}
      {/* <Form.Item name="ogrn" label="ОГРН">
          <Input  />
        </Form.Item> */}
      {/* <Form.Item name="address" label="Адрес">
          <Input  />
        </Form.Item> */}
    </>
  );
}