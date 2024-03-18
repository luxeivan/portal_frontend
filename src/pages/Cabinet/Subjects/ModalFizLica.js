import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import config from "../../../config";

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
import { debounce } from "lodash";

const { Option } = Select;

export default function ModalFizLica() {
  const [documentType, setDocumentType] = useState("passport");
  const [manualAddressInput, setManualAddressInput] = useState(false);
  const [registrationAddress, setRegistrationAddress] = useState("");
  const [isAddressSame, setIsAddressSame] = useState(false);
  const [residenceAddress, setResidenceAddress] = useState("");
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [uploadedFilePath, setUploadedFilePath] = useState(null);

  const onDocumentTypeChange = (value) => {
    setDocumentType(value);
  };

  const handleManualAddressCheckbox = (e) => {
    setManualAddressInput(e.target.checked);
  };

  const authState = useAuth((state) => ({
    phone: state.phone,
    email: state.email,
  }));

  const registrationState = useRegistration((state) => ({
    phone: state.phone,
    email: state.email,
  }));

  // const props = {
  //   name: "file",
  //   action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  //   headers: {
  //     authorization: "authorization-text",
  //   },
  //   onChange(info) {
  //     if (info.file.status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === "done") {
  //       message.success(`${info.file.name} файл загружен успешно`);
  //     } else if (info.file.status === "error") {
  //       message.error(
  //         `${info.file.name} файл не загрузился, попробуйте ешё раз.`
  //       );
  //     }
  //   },
  // };

  const uploadProps = {
    name: "file",
    headers: {
      authorization: "authorization-text", 
    },
    customRequest({ file, onSuccess, onError }) {
      const formData = new FormData();
      formData.append("file", file); // Так сервер ожидает файл

      axios
        .post(`${config.backServer}/api/cabinet/upload-file`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Ответ сервера", response.data);
          const relativePath = response.data.filePath;
          onSuccess(relativePath, file);
          message.success(
            `${file.name} файл загружен успешно и сохранен по пути: ${relativePath}`
          );
        })
        .catch((error) => {
          console.error("Ошибка при загрузке файла", error);
          onError(error);
          message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
        });
    },
  };

  const handlePhoneChange = (e) => {
    console.log("Новый номер телефона:", e.target.value);
  };

  const handleEmailChange = (e) => {
    console.log("Новый email:", e.target.value);
  };

  const handleAddressCheckboxChange = (e) => {
    setIsAddressSame(e.target.checked);
    if (e.target.checked) {
      setResidenceAddress(registrationAddress);
    }
  };

  const onSelect = useCallback((data) => {
    console.log("onSelect", data);
  }, []);

  const debouncedFetchAddresses = useCallback(
    debounce(async (searchText) => {
      if (!searchText) {
        setOptions([]); // Очищаем опции, если строка поиска пуста
        return;
      }

      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(
          `${config.backServer}/api/cabinet/get-fias`,
          {
            params: { searchString: searchText },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("TEST", response.data.data);
        let preparingData = response.data.data.map((item) => ({
          value: item.value,
        }));

        setOptions(preparingData);
      } catch (error) {
        console.error("Ошибка при получении адресов:", error);
        setOptions([]);
      }
    }, 800),
    []
  );

  useEffect(() => {
    debouncedFetchAddresses(searchText);
  }, [searchText]);

  const onSearch = useCallback((searchText) => {
    setSearchText(searchText);
  }, []);

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
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Загрузить файл</Button>
        </Upload>
      </Form.Item>
      <Divider orientation="center">СНИЛС</Divider>
      <Form.Item label="Номер">
        <Input />
      </Form.Item>
      <Divider orientation="center">Место регистрации</Divider>
      <Form.Item label="Адрес" name={"registration"}>
        {manualAddressInput ? (
          <Input />
        ) : (
          <AutoComplete
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder="Начните вводить"
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
      <Divider orientation="center">Место проживания</Divider>
      <Form.Item>
        <Checkbox
          checked={isAddressSame}
          onChange={handleAddressCheckboxChange}
        >
          Совпадает с адресом по месту регистрации
        </Checkbox>
      </Form.Item>
      <Form.Item label="Адрес">
        {manualAddressInput ? (
          <Input />
        ) : (
          <AutoComplete
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder="Начните вводить"
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

// import React, { useState } from "react";
// import axios from "axios";
// import config from "../../../config";

// import {
//   Flex,
//   Input,
//   Form,
//   Select,
//   AutoComplete,
//   Checkbox,
//   Button,
//   Upload,
//   Divider,
//   message,
// } from "antd";

// import useAuth from "../../../stores/./useAuth";
// import useRegistration from "../../.././stores/useRegistration";

// import { UploadOutlined } from "@ant-design/icons";

// import { formItemLayout } from "../../.././components/configSizeForm";

// const { Option } = Select;

// export default function ModalFizLica() {
//   const [documentType, setDocumentType] = useState("passport");
//   const [manualAddressInput, setManualAddressInput] = useState(false);
//   const [registrationAddress, setRegistrationAddress] = useState("");
//   const [isAddressSame, setIsAddressSame] = useState(false);
//   const [residenceAddress, setResidenceAddress] = useState("");
//   const [options, setOptions] = useState([]);

//   const onDocumentTypeChange = (value) => {
//     setDocumentType(value);
//   };

//   const handleManualAddressCheckbox = (e) => {
//     setManualAddressInput(e.target.checked);
//   };

//   const authState = useAuth((state) => ({
//     phone: state.phone,
//     email: state.email,
//   }));

//   const registrationState = useRegistration((state) => ({
//     phone: state.phone,
//     email: state.email,
//   }));

//   const props = {
//     name: "file",
//     action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
//     headers: {
//       authorization: "authorization-text",
//     },
//     onChange(info) {
//       if (info.file.status !== "uploading") {
//         console.log(info.file, info.fileList);
//       }
//       if (info.file.status === "done") {
//         message.success(`${info.file.name} файл загружен успешно`);
//       } else if (info.file.status === "error") {
//         message.error(
//           `${info.file.name} файл не загрузился, попробуйте ешё раз.`
//         );
//       }
//     },
//   };

//   const handlePhoneChange = (e) => {
//     console.log("Новый номер телефона:", e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     console.log("Новый email:", e.target.value);
//   };

//   const handleAddressCheckboxChange = (e) => {
//     setIsAddressSame(e.target.checked);
//     if (e.target.checked) {
//       setResidenceAddress(registrationAddress);
//     }
//   };

//   const fetchAddresses = async (searchText) => {
//     try {
//       const token = localStorage.getItem("jwt");
//       const response = await axios.get(
//         `${config.backServer}/api/cabinet/get-fias`,
//         {
//           params: { searchString: searchText },
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response.data.data);
//       let preparingData = response.data.data.map((item) => ({
//         value: item.value,
//       }));
//       return preparingData;
//     } catch (error) {
//       console.error("Ошибка при получении адресов: ", error);
//       return [];
//     }
//   };

//   const onSelect = (data) => {
//     console.log("onSelect", data);
//   };

//   const userPhone = authState.phone || registrationState.phone;
//   const userEmail = authState.email || registrationState.email;

//   return (
//     <Form {...formItemLayout}>
//       <Divider orientation="center">ФИО</Divider>

//       <Form.Item label="Фамилия">
//         <Input />
//       </Form.Item>
//       <Form.Item label="Имя">
//         <Input />
//       </Form.Item>
//       <Form.Item label="Отчество">
//         <Input />
//       </Form.Item>
//       <Divider orientation="center">Подтверждающий документ</Divider>

//       <Form.Item label="Тип документа">
//         <Select defaultValue="passport" onChange={onDocumentTypeChange}>
//           <Option value="passport">Паспорт гражданина РФ</Option>
//           <Option value="other">Иной документ</Option>
//         </Select>
//       </Form.Item>
//       {documentType === "passport" && (
//         <>
//           <Flex gap="middle" vertical>
//             <Form.Item label="Серия паспорта">
//               <Input maxLength={4} pattern="\d*" />
//             </Form.Item>
//             <Form.Item label="Номер паспорта">
//               <Input maxLength={6} pattern="\d*" />
//             </Form.Item>
//             <Form.Item label="Код подразделения">
//               <Input maxLength={6} pattern="\d*" />
//             </Form.Item>
//             <Form.Item label="Кем выдан">
//               <Input />
//             </Form.Item>
//           </Flex>
//         </>
//       )}
//       {documentType === "other" && (
//         <>
//           <Form.Item label="Тип документа">
//             <Select>
//               <Option value="type1">Тип1</Option>
//               <Option value="type2">Тип2</Option>
//             </Select>
//           </Form.Item>
//           <Form.Item label="Реквизиты документа">
//             <Input />
//           </Form.Item>
//         </>
//       )}
//       <Form.Item label="Загрузить файл">
//         <Upload {...props}>
//           <Button icon={<UploadOutlined />}></Button>
//         </Upload>
//       </Form.Item>
//       <Divider orientation="center">СНИЛС</Divider>
//       <Form.Item label="Номер">
//         <Input />
//       </Form.Item>
//       <Divider orientation="center">Место регистрации</Divider>
//       <Form.Item label="Адрес" name={"registration"}>
//         {manualAddressInput ? (
//           <Input />
//         ) : (
//           <AutoComplete
//             options={options}
//             onSelect={onSelect}
//             onSearch={async (text) => {
//               setOptions(await fetchAddresses(text));
//             }}
//             placeholder="Начните вводить"
//           />
//         )}
//       </Form.Item>
//       <Form.Item>
//         <Checkbox
//           checked={manualAddressInput}
//           onChange={handleManualAddressCheckbox}
//         >
//           Ввести адрес по полям вручную
//         </Checkbox>
//       </Form.Item>
//       <Divider orientation="center">Место проживания</Divider>
//       <Form.Item>
//         <Checkbox
//           checked={isAddressSame}
//           onChange={handleAddressCheckboxChange}
//         >
//           Совпадает с адресом по месту регистрации
//         </Checkbox>
//       </Form.Item>
//       <Form.Item label="Адрес">
//         {manualAddressInput ? (
//           <Input />
//         ) : (
//           <AutoComplete
//             options={options}
//             onSelect={onSelect}
//             onSearch={async (text) => {
//               setOptions(await fetchAddresses(text));
//             }}
//             placeholder="Начните вводить"
//           />
//         )}
//       </Form.Item>
//       <Form.Item>
//         <Checkbox
//           checked={manualAddressInput}
//           onChange={handleManualAddressCheckbox}
//         >
//           Ввести адрес по полям вручную
//         </Checkbox>
//       </Form.Item>
//       <Divider orientation="center">Другое</Divider>
//       <Form.Item label="Мобильный номер телефона">
//         <Input defaultValue={userPhone} onChange={handlePhoneChange} />
//       </Form.Item>
//       <Form.Item label="Адрес электронной почты">
//         <Input defaultValue={userEmail} onChange={handleEmailChange} />
//       </Form.Item>
//     </Form>
//   );
// }
