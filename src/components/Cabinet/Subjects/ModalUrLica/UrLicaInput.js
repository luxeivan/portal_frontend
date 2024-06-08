import React, { useState } from "react";
import { Form, Input, Button, Divider, AutoComplete, Typography, InputNumber } from "antd";
import axios from "axios";
import config from "../../../config";
import UploaderInput from "../../FormComponents/UploaderInput";
import { formItemLayout } from "../../configSizeForm";

export default function UrLicaInput() {
  const [form] = Form.useForm();
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
    console.log(option)
    console.log(suggestions)

    const orgData = suggestions.find((org) => org.hid === option.key);
    if (orgData) {
      form.setFieldsValue({
        inn: orgData.value,
        name: orgData.label,
        kpp: orgData.kpp,
        ogrn: orgData.ogrn,
        address: orgData.address,
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
      <Divider orientation="center">ИНН</Divider>
      <Form form={form} {...formItemLayout}>
        <Form.Item
          name="inn"
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
        <Form.Item name="name" label="Наименование">
          <Input readOnly />
        </Form.Item>
        <Form.Item name="kpp" label="КПП">
          {/* <InputNumber readOnly /> */}
          <Input readOnly />
        </Form.Item>
        <Form.Item name="ogrn" label="ОГРН">
          {/* <InputNumber readOnly /> */}
          <Input readOnly />
        </Form.Item>
        {/* <Form.Item name="address" label="Адрес">
          <Input readOnly />
        </Form.Item> */}
        <UploaderInput />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

//Рабочий вариант
// import React, { useEffect, useState } from "react";
// import { Form, Input, Button, Divider, AutoComplete, Typography } from "antd";
// import axios from "axios";
// import config from "../../../config";
// import UploaderInput from "../../FormComponents/UploaderInput"

// export default function UrLicaInput() {
//   const [form] = Form.useForm();
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedOrg, setSelectedOrg] = useState(null);

//   useEffect(() => {
//     console.log("Актуальный список предложений:", suggestions);
//   }, [suggestions]);

//   const onSearch = async (searchText) => {
//     console.log("Ищем ИНН:", searchText);
//     if (!searchText) {
//       setSuggestions([]);
//       return;
//     }
//     try {
//       console.log("Делаем запрос по ИНН:", searchText);
//       const response = await axios.get(
//         `${config.backServer}/api/cabinet/get-inn/LEGAL?inn=${searchText}`,
//         {
//           params: { searchString: searchText },
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//         }
//       );
//       console.log("Ответ от сервера:", response.data);
//       if (response.data && response.data.data) {
//         setSuggestions(
//           response.data.data.map((suggestion) => ({
//             value: suggestion.data.inn,
//             kpp: suggestion.data.kpp,
//             label: suggestion.value,
//             ogrn: suggestion.data.ogrn,
//             address: suggestion.data.address
//           }))
//         );
//         console.log(
//           "Установлены предложения для AutoComplete:",
//           response.data.data
//         );
//       } else {
//         setSuggestions([]);
//       }
//     } catch (error) {
//       console.error("Ошибка при поиске организации:", error);
//       setSuggestions([]);
//     }
//   };
//   const onSelect = (value, option) => {
//     console.log("Выбрано значение:", value, "Опция AutoComplete:", option);
//     const orgData = suggestions.find((org) => org.value === option.value);
//     if (orgData) {
//       setSelectedOrg({
//         name: orgData.label,
//         kpp: orgData.kpp,
//         ogrn: orgData.ogrn,
//         address: orgData.address,
//       });
//     }
//   };

//   const renderItem = (organization, index) => {
//     console.log(organization);
//     return {
//       value: organization.value,
//       label: (
//         <div
//           key={index}
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Typography.Title level={5} style={{ margin: 0 }}>
//             {organization.label}
//           </Typography.Title>
//           {/* <div>
//             <span style={{ fontWeight: 600 }}>КПП:</span> {organization.kpp}
//           </div> */}
//         </div>
//       ),
//     };
//   };

//   const renderAdditionalFields = () => {
//     if (!selectedOrg) return null;
//     return (
//       <>
//         <Form.Item label="Наименование">
//           <Input value={selectedOrg.name} readOnly />
//         </Form.Item>
//         <Form.Item label="КПП">
//           <Input value={selectedOrg.kpp} readOnly />
//         </Form.Item>
//         <Form.Item label="ОГРН">
//           <Input value={selectedOrg.ogrn} readOnly />
//         </Form.Item>
//         <UploaderInput />
//         {/* <Form.Item label="Адрес">
//           <Input value={selectedOrg.address} readOnly />
//         </Form.Item> */}
//       </>
//     );
//   };

//   return (
//     <>
//       <Divider orientation="center">ИНН</Divider>
//       <Form form={form}>
//         <Form.Item
//           name="inn"
//           label="ИНН"
//           rules={[{ required: true, message: "Введите ИНН" }]}
//         >
//           <AutoComplete
//             onSearch={onSearch}
//             onSelect={onSelect}
//             options={suggestions.map(renderItem)}
//             notFoundContent="Ничего не найдено"
//           >
//             <Input placeholder="Введите ИНН для поиска" />
//           </AutoComplete>
//         </Form.Item>
//         {renderAdditionalFields()}
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Добавить
//           </Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Form, Input, Button, Divider, AutoComplete, Typography } from "antd";
// import axios from "axios";
// import config from "../../../config";

// export default function UrLicaInput() {
//   const [form] = Form.useForm();
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedOrg, setSelectedOrg] = useState(null);

//   useEffect(() => {
//     console.log("Актуальный список предложений:", suggestions);
//   }, [suggestions]);

//   const onSearch = async (searchText) => {
//     console.log("Ищем ИНН:", searchText);
//     if (!searchText) {
//       setSuggestions([]);
//       return;
//     }
//     try {
//       console.log("Делаем запрос по ИНН:", searchText);
//       const response = await axios.get(
//         `${config.backServer}/api/cabinet/get-inn/`,
//         {
//           params: { searchString: searchText },
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//         }
//       );
//       console.log("Ответ от сервера:", response.data);
//       if (response.data && response.data.data) {
//         setSuggestions(
//           response.data.data.map((suggestion) => ({
//             value: suggestion.data.inn,
//             kpp: suggestion.data.kpp,
//             label: suggestion.value,
//           }))
//         );
//         console.log(
//           "Установлены предложения для AutoComplete:",
//           response.data.data
//         );
//       } else {
//         setSuggestions([]);
//       }
//     } catch (error) {
//       console.error("Ошибка при поиске организации:", error);
//       setSuggestions([]);
//     }
//   };

//   const onSelect = (value, option) => {
//     console.log("Выбрано значение:", value, "Опция AutoComplete:", option);
//     // Устанавливаем выбранное учреждение в состояние
//     setSelectedOrg(option);
//     // Устанавливаем значения в форму
//     form.setFieldsValue({
//       inn: option.value,
//       kpp: option.kpp,
//     });
//   };

//   const renderItem = (organization, index) => {
//     console.log(organization);
//     return {
//       value: organization.value,
//       label: (
//         <div
//           key={index}
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Typography.Title level={5} style={{ margin: 0 }}>
//             {organization.label}
//           </Typography.Title>
//           <div>
//             <span style={{ fontWeight: 600 }}>КПП:</span> {organization.kpp}
//           </div>
//         </div>
//       ),
//     };
//   };

//   const renderAdditionalFields = (organization) => {
//     if (!selectedOrg) return null;
//     return (
//       <>
//         <Form.Item label="Наименование">
//           <Input value={selectedOrg.label} readOnly />
//         </Form.Item>
//         <Form.Item label="КПП">
//           <Input value={selectedOrg.kpp} readOnly />
//         </Form.Item>
//       </>
//     );
//   };

//   return (
//     <>
//       <Divider orientation="center">ИНН</Divider>
//       <Form form={form}>
//         <Form.Item
//           name="inn"
//           label="ИНН"
//           rules={[{ required: true, message: "Введите ИНН" }]}
//         >
//           <AutoComplete
//             onSearch={onSearch}
//             onSelect={onSelect}
//             options={suggestions.map(renderItem)}
//             notFoundContent="Ничего не найдено"
//           >
//             <Input placeholder="Введите ИНН для поиска" />
//           </AutoComplete>
//         </Form.Item>
//         {renderAdditionalFields()}
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Добавить
//           </Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Form, Input, Button, Divider, AutoComplete, Typography } from "antd";
// import axios from "axios";
// import config from "../../../config";

// export default function UrLicaInput() {
//   const [form] = Form.useForm();
//   const [suggestions, setSuggestions] = useState([]);

//   useEffect(() => {
//     console.log("Актуальный список предложений:", suggestions);
//   }, [suggestions]);

//   const onSearch = async (searchText) => {
//     console.log("Ищем ИНН:", searchText);
//     if (!searchText) {
//       setSuggestions([]);
//       return;
//     }
//     try {
//       console.log("Делаем запрос по ИНН:", searchText);
//       const response = await axios.get(
//         `${config.backServer}/api/cabinet/get-inn/`,
//         {
//           params: { searchString: searchText },
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//         }
//       );
//       console.log("Ответ от сервера:", response.data);
//       if (response.data && response.data.data) {
//         setSuggestions(
//           response.data.data.map((suggestion) => ({
//             value: suggestion.data.inn,
//             kpp: suggestion.data.kpp,
//             label: suggestion.value,
//           }))
//         );
//         console.log(
//           "Установлены предложения для AutoComplete:",
//           response.data.data
//         );
//       } else {
//         setSuggestions([]);
//       }
//     } catch (error) {
//       console.error("Ошибка при поиске организации:", error);
//       setSuggestions([]);
//     }
//   };

//   const onSelect = (value, option) => {
//     const onSelect = (value, option) => {
//       console.log("Выбрано значение:", value, "Опция AutoComplete:", option);
//       // Обрати внимание, что мы устанавливаем `value`, а не `inn`, в значение формы
//       form.setFieldsValue({ value: option.value });
//     };
//   };

//   const renderItem = (organization, index) => {
//     console.log(organization);
//     return {
//       value: organization.value,
//       label: (
//         <div
//           key={index}
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Typography.Title level={5} style={{ margin: 0 }}>
//             {organization.label}
//           </Typography.Title>
//           <div>
//             <span style={{ fontWeight: 600 }}>КПП:</span> {organization.kpp}
//           </div>
//         </div>
//       ),
//     };
//   };

//   return (
//     <>
//       <Divider orientation="center">ИНН</Divider>
//       <Form form={form}>
//         <Form.Item
//           name="inn"
//           label="ИНН"
//           rules={[{ required: true, message: "Введите ИНН" }]}
//         >
//           <AutoComplete
//             onSearch={onSearch}
//             onSelect={onSelect}
//             options={suggestions.map(renderItem)}
//             notFoundContent="Ничего не найдено"
//           >
//             <Input placeholder="Введите ИНН для поиска" />
//           </AutoComplete>
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Добавить
//           </Button>
//         </Form.Item>
//       </Form>
//     </>
//   );
// }
