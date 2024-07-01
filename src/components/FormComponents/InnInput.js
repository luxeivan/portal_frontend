import React, { useState } from "react";
import { Form, Input, AutoComplete, Typography } from "antd";
import axios from "axios";
const backServer = process.env.REACT_APP_BACK_BACK_SERVER

export default function InnInput({ name, type, read, value }) {
  const form = Form.useFormInstance();
  const [suggestions, setSuggestions] = useState([]);

  const onSearch = async (searchText) => {
    if (!searchText) {
      return;
    }
    const url =
      type === "INDIVIDUAL"
        ? `${backServer}/api/cabinet/get-inn/INDIVIDUAL?inn=${searchText}`
        : `${backServer}/api/cabinet/get-inn/LEGAL?inn=${searchText}`;
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (response.data && response.data.data) {
        console.log("Главный тест", response.data.data);
        setSuggestions(
          response.data.data.map((s) => ({
            value: s.data.inn,
            kpp: s.data.kpp,
            okved: s.data.okved,
            fullName: s.value,
            short_with_opf: s.data.name.short_with_opf,
            hid: s.data.hid,
            label: s.value,
            short: s.data.name.short,
            ogrn: s.data.ogrn,
            address: s.data.address,
            fullNameDirector: s.data.management?.name,
            jobTitle: s.data.management?.post,
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
    const orgData = suggestions.find((org) => org.hid === option.key);
    // console.log("Тест", orgData);
    if (orgData) {
      form.setFieldsValue({
        inn: orgData.value, //для ЮР и для ИП
        okved: orgData.okved, //для ЮР и для ИП
        // fullName: orgData.short_with_opf,
        fullName: orgData.label,
        shortName: orgData.short,
        fullNameDirector: orgData.fullNameDirector,
        jobTitle: orgData.jobTitle,
        kpp: orgData.kpp,
        name: orgData.name,
        ogrn: orgData.ogrn,
        urAddress: { fullAddress: orgData.address.value },
        mailingAddress: { fullAddress: orgData.address.value },
      });
    }
  };

  const renderItem = (organization) => {
    return {
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
        </div>
      ),
    };
  };

  return (
    <Form.Item
      name={name}
      label="ИНН"
      rules={[{ required: true, message: "Введите ИНН" }]}
    >
      {!read && (
        <AutoComplete
          onSearch={onSearch}
          onSelect={onSelect}
          options={suggestions.map(renderItem)}
          notFoundContent="Ничего не найдено"
        >
          <Input placeholder="Введите ИНН для поиска" />
        </AutoComplete>
      )}
      {read && <Typography.Text>{value}</Typography.Text>}
    </Form.Item>
  );
}

// import React, { useState } from "react";
// import { Form, Input, AutoComplete, Typography } from "antd";
// import axios from "axios";
// import config from "../../config";

// export default function InnInput({ name, type }) {
//   const form = Form.useFormInstance();
//   const [suggestions, setSuggestions] = useState([]);

//   const onSearch = async (searchText) => {
//     if (!searchText) {
//       return;
//     }
//     const url =
//       type === "INDIVIDUAL"
//         ? `${config.backServer}/api/cabinet/get-inn/INDIVIDUAL?inn=${searchText}`
//         : `${config.backServer}/api/cabinet/get-inn/LEGAL?inn=${searchText}`;
//     try {
//       const response = await axios.get(url, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//       });
//       if (response.data && response.data.data) {
//         console.log("Главный тест", response.data.data);
//         setSuggestions(
//           response.data.data.map((s) => ({
//             value: s.data.inn,
//             kpp: s.data.kpp,
//             okved: s.data.okved,
//             short_with_opf: s.data.name.short_with_opf,
//             hid: s.data.hid,
//             label: s.value,
//             fullName: s.value,
//             short: s.data.name.short,
//             ogrn: s.data.ogrn,
//             address: s.data.address,
//             fullNameDirector: s.data.management?.name,
//             jobTitle: s.data.management?.post,
//           }))
//         );
//       } else {
//         setSuggestions([]);
//       }
//     } catch (error) {
//       console.error("Ошибка при поиске организации:", error);
//     }
//   };

//   const onSelect = (value, option) => {
//     const orgData = suggestions.find((org) => org.hid === option.key);
//     // console.log("Тест", orgData);
//     if (orgData) {
//       form.setFieldsValue({
//         inn: orgData.value,
//         fullName: orgData.short_with_opf,
//         shortName: orgData.short,
//         fullNameDirector: orgData.fullNameDirector,
//         jobTitle: orgData.jobTitle,
//         kpp: orgData.kpp,
//         okved: orgData.okved,
//         name: orgData.name,
//         ogrn: orgData.ogrn,
//         urAddress: { fullAddress: orgData.address.value },
//         mailingAddress: { fullAddress: orgData.address.value },
//       });
//     }
//   };

//   const renderItem = (organization) => {
//     return {
//       value: organization.hid,
//       key: organization.hid,
//       label: (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Typography.Text>{organization.label}</Typography.Text>
//         </div>
//       ),
//     };
//   };

//   return (
//     <>
//       <Form.Item
//         name={name}
//         label="ИНН"
//         rules={[{ required: true, message: "Введите ИНН" }]}
//       >
//         <AutoComplete
//           onSearch={onSearch}
//           onSelect={onSelect}
//           options={suggestions.map(renderItem)}
//           notFoundContent="Ничего не найдено"
//         >
//           <Input placeholder="Введите ИНН для поиска" />
//         </AutoComplete>
//       </Form.Item>
//     </>
//   );
// }
