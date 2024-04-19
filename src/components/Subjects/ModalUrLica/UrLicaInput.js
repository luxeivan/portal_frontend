import React, { useEffect, useState } from "react";
import { Form, Input, Button, Divider, AutoComplete, Typography } from "antd";
import axios from "axios";
import config from "../../../config";

export default function UrLicaInput() {
  const [form] = Form.useForm();
  const [suggestions, setSuggestions] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);

  useEffect(() => {
    console.log("Актуальный список предложений:", suggestions);
  }, [suggestions]);

  const onSearch = async (searchText) => {
    console.log("Ищем ИНН:", searchText);
    if (!searchText) {
      setSuggestions([]);
      return;
    }
    try {
      console.log("Делаем запрос по ИНН:", searchText);
      const response = await axios.get(
        `${config.backServer}/api/cabinet/get-inn/`,
        {
          params: { searchString: searchText },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log("Ответ от сервера:", response.data);
      if (response.data && response.data.data) {
        setSuggestions(
          response.data.data.map((suggestion) => ({
            value: suggestion.data.inn,
            kpp: suggestion.data.kpp,
            label: suggestion.value,
          }))
        );
        console.log(
          "Установлены предложения для AutoComplete:",
          response.data.data
        );
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Ошибка при поиске организации:", error);
      setSuggestions([]);
    }
  };
  const onSelect = (value, option) => {
    console.log("Выбрано значение:", value, "Опция AutoComplete:", option);
    const orgData = suggestions.find(org => org.value === option.value);
    if (orgData) {
      setSelectedOrg({
        name: orgData.label, // предположим, что label - это строка, а не JSX
        kpp: orgData.kpp,   // и kpp тоже строка
      });
    }
  };

  const renderItem = (organization, index) => {
    console.log(organization);
    return {
      value: organization.value,
      label: (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Title level={5} style={{ margin: 0 }}>
            {organization.label}
          </Typography.Title>
          <div>
            <span style={{ fontWeight: 600 }}>КПП:</span> {organization.kpp}
          </div>
        </div>
      ),
    };
  };

  

  const renderAdditionalFields = () => {
    if (!selectedOrg) return null;
    return (
      <>
        <Form.Item label="Наименование">
          <Input value={selectedOrg.name} readOnly />
        </Form.Item>
        <Form.Item label="КПП">
          <Input value={selectedOrg.kpp} readOnly />
        </Form.Item>
      </>
    );
  };

  return (
    <>
      <Divider orientation="center">ИНН</Divider>
      <Form form={form}>
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
        {renderAdditionalFields()}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

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
