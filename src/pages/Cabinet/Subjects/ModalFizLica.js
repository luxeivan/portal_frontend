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
  Typography,
} from "antd";

import useAuth from "../../../stores/./useAuth";
import useRegistration from "../../.././stores/useRegistration";

import { UploadOutlined } from "@ant-design/icons";

import { formItemLayout } from "../../.././components/configSizeForm";
import { debounce } from "lodash";
import TextArea from "antd/es/input/TextArea";
import useSubjects from "../../../stores/Cabinet/useSubjects";

const { Option } = Select;

export default function ModalFizLica({ onSubmit,setShowModalAdd, type }) {
  const [documentType, setDocumentType] = useState("passport");
  const [manualAddressInput, setManualAddressInput] = useState(false);
  const [registrationAddress, setRegistrationAddress] = useState("");
  const [isAddressSame, setIsAddressSame] = useState(false);
  const [residenceAddress, setResidenceAddress] = useState("");
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [manualResidenceAddressInput, setManualResidenceAddressInput] =
    useState(false);

  const [form] = Form.useForm();
  // const useSubjectsStore = useSubjects();
  const { submitNewSubject } = useSubjects();

  const onFinish = async (values) => {
    const formData = {
      type: "Физическое лицо",
      firstname: values.firstname,
      lastname: values.lastname,
      secondname: values.secondname,
      snils: values.snils.replace(/[^0-9]/g, ""),
    };
  
    try {
      await submitNewSubject(formData);
      message.success("Субъект успешно создан");
      form.resetFields(); 
      setShowModalAdd(false); // Закрываем модальное окно
      if (onSubmit) {
        onSubmit(); // Вызываем onSubmit, если он был передан
      }
    } catch (error) {
      
    }
  };

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

  const uploadProps = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    customRequest({ file, onSuccess, onError }) {
      const formData = new FormData();
      formData.append("file", file);
      const token = localStorage.getItem("jwt");
      axios
        .post(`${config.backServer}/api/cabinet/upload-file`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
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
        setOptions([]);
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
        let preparingData = response.data.data.map((item) => ({
          label: (
            <Typography.Text
              style={{ width: "100%", whiteSpace: "none" }}
              type=""
            >
              {item.value}
            </Typography.Text>
          ),
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

  const handleManualResidenceAddressCheckbox = (e) => {
    setManualResidenceAddressInput(e.target.checked);
  };

  const userPhone = authState.phone || registrationState.phone;
  const userEmail = authState.email || registrationState.email;

  return (
    <Form form={form} {...formItemLayout} onFinish={onFinish}>
      <Divider orientation="center">ФИО</Divider>

      <Form.Item
        label="Фамилия"
        name="lastname"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите вашу фамилию",
          },
        ]}
      >
        <Input placeholder="Иванов" />
      </Form.Item>

      <Form.Item
        label="Имя"
        name="firstname"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваше имя",
          },
        ]}
      >
        <Input placeholder="Иван" />
      </Form.Item>

      <Form.Item
        label="Отчество"
        name="secondname"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваше отчество",
          },
        ]}
      >
        <Input placeholder="Иванович" />
      </Form.Item>

      <Divider orientation="center">Подтверждающий документ</Divider>

      <Form.Item
        label="Тип документа"
        name="typedocuments"
        // rules={[
        //   {
        //     required: true,
        //     message: "Пожалуйста, укажите тип документа",
        //   },
        // ]}
      >
        <Select defaultValue="passport" onChange={onDocumentTypeChange}>
          <Option value="passport">Паспорт гражданина РФ</Option>
          <Option value="other">Иной документ</Option>
        </Select>
      </Form.Item>
      {documentType === "passport" && (
        <>
          <Flex gap="middle" vertical>
            <Form.Item
              label="Серия паспорта"
              name="seriaspasport"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, укажите серию паспорта",
                },
              ]}
            >
              <Input maxLength={4} pattern="\d*" placeholder="1234" />
            </Form.Item>
            <Form.Item
              label="Номер паспорта"
              name="numberpasport"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, укажите номер паспорта",
                },
              ]}
            >
              <Input maxLength={6} pattern="\d*" placeholder="567890" />
            </Form.Item>
            <Form.Item
              label="Код подразделения"
              name="kodpodrazdelenia"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, укажите код подразделения",
                },
              ]}
            >
              <Input maxLength={6} pattern="\d*" placeholder="123456" />
            </Form.Item>
            <Form.Item
              label="Кем выдан"
              name="kemvidan"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, укажите кем выдан паспорт",
                },
              ]}
            >
              <Input placeholder="..." />
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
          <Form.Item
            label="Реквизиты документа"
            name="recvizitydocumenta"
            rules={[
              {
                required: true,
                message: "Пожалуйста, укажите реквизиты документа",
              },
            ]}
          >
            <Input placeholder="..." />
          </Form.Item>
        </>
      )}
      <Form.Item
        label="Загрузить файл"
        name="uploader"
        rules={[
          {
            required: true,
            message: "Пожалуйста, загрузите файл",
          },
        ]}
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Загрузить файл</Button>
        </Upload>
      </Form.Item>
      <Divider orientation="center">СНИЛС</Divider>
      <Form.Item
        label="Номер"
        name="snils"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите номер СНИЛС",
          },
        ]}
      >
        <Input placeholder="..." />
      </Form.Item>
      <Divider orientation="center">Место регистрации</Divider>
      <Form.Item
        label="Адрес"
        name={"registration"}
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите адрес регистрации",
          },
        ]}
      >
        {manualAddressInput ? (
          <Input />
        ) : (
          <AutoComplete
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
          >
            <TextArea
              placeholder="Начните вводить"
              style={{
                height: 60,
              }}
            />
          </AutoComplete>
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
      <Form.Item
        label="Адрес"
        name="livingadres"
        rules={[
          {
            required: true,
            message: "Введите город, улицу, номер дома и квартиру",
          },
        ]}
      >
        {manualAddressInput ? (
          <Input />
        ) : (
          <AutoComplete
            options={options}
            onSelect={onSelect}
            onSearch={onSearch}
          >
            <TextArea
              placeholder="Начните вводить"
              style={{
                height: 60,
              }}
            />
          </AutoComplete>
        )}
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={manualResidenceAddressInput}
          onChange={handleManualResidenceAddressCheckbox}
        >
          Ввести адрес по полям вручную
        </Checkbox>
      </Form.Item>
      <Divider orientation="center">Другое</Divider>
      <Form.Item
        label="Мобильный номер телефона"
        name="phone"
        rules={[{ required: true, message: "Введите номер телефона" }]}
      >
        <Input
          defaultValue={userPhone}
          onChange={handlePhoneChange}
          placeholder="+7 (123) 456-78-90"
        />
      </Form.Item>
      <Form.Item
        label="Адрес электронной почты"
        name="email"
        rules={[{ required: true, message: "Введите email" }]}
      >
        <Input
          defaultValue={userEmail}
          onChange={handleEmailChange}
          placeholder="ivanov@yandex.ru"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={() => form.submit()}>
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
}



// import React, { useState, useEffect, useCallback } from "react";
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
//   Typography,
// } from "antd";

// import useAuth from "../../../stores/./useAuth";
// import useRegistration from "../../.././stores/useRegistration";

// import { UploadOutlined } from "@ant-design/icons";

// import { formItemLayout } from "../../.././components/configSizeForm";
// import { debounce } from "lodash";
// import TextArea from "antd/es/input/TextArea";
// import useSubjects from "../../../stores/Cabinet/useSubjects";

// const { Option } = Select;

// export default function ModalFizLica({ onSubmit, type }) {
//   const [documentType, setDocumentType] = useState("passport");
//   const [manualAddressInput, setManualAddressInput] = useState(false);
//   const [registrationAddress, setRegistrationAddress] = useState("");
//   const [isAddressSame, setIsAddressSame] = useState(false);
//   const [residenceAddress, setResidenceAddress] = useState("");
//   const [options, setOptions] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [manualResidenceAddressInput, setManualResidenceAddressInput] =
//     useState(false);

//   const [form] = Form.useForm();
//   // const useSubjectsStore = useSubjects();
//   const { submitNewSubject } = useSubjects();

//   const onFinish = async (values) => {
//     const formData = {
//       type: "Физическое лицо",
//       firstname: values.firstname,
//       lastname: values.lastname,
//       secondname: values.secondname,
//       snils: values.snils.replace(/[^0-9]/g, ""), // убираем всё кроме цифр
//     };

//     try {
//       await submitNewSubject(formData);
//       message.success("Субъект успешно создан");
//       if (onSubmit) onSubmit();
//     } catch (error) {
//       message.error(`Ошибка: ${error.message}`);
//     }
//   };

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

//   const uploadProps = {
//     name: "file",
//     headers: {
//       authorization: "authorization-text",
//     },
//     customRequest({ file, onSuccess, onError }) {
//       const formData = new FormData();
//       formData.append("file", file);
//       const token = localStorage.getItem("jwt");
//       axios
//         .post(`${config.backServer}/api/cabinet/upload-file`, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         })
//         .then((response) => {
//           console.log("Ответ сервера", response.data);
//           const relativePath = response.data.filePath;
//           onSuccess(relativePath, file);
//           message.success(
//             `${file.name} файл загружен успешно и сохранен по пути: ${relativePath}`
//           );
//         })
//         .catch((error) => {
//           console.error("Ошибка при загрузке файла", error);
//           onError(error);
//           message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
//         });
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

//   const onSelect = useCallback((data) => {
//     console.log("onSelect", data);
//   }, []);

//   const debouncedFetchAddresses = useCallback(
//     debounce(async (searchText) => {
//       if (!searchText) {
//         setOptions([]);
//         return;
//       }

//       try {
//         const token = localStorage.getItem("jwt");
//         const response = await axios.get(
//           `${config.backServer}/api/cabinet/get-fias`,
//           {
//             params: { searchString: searchText },
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         let preparingData = response.data.data.map((item) => ({
//           label: (
//             <Typography.Text
//               style={{ width: "100%", whiteSpace: "none" }}
//               type=""
//             >
//               {item.value}
//             </Typography.Text>
//           ),
//           value: item.value,
//         }));

//         setOptions(preparingData);
//       } catch (error) {
//         console.error("Ошибка при получении адресов:", error);
//         setOptions([]);
//       }
//     }, 800),
//     []
//   );

//   useEffect(() => {
//     debouncedFetchAddresses(searchText);
//   }, [searchText]);

//   const onSearch = useCallback((searchText) => {
//     setSearchText(searchText);
//   }, []);

//   const handleManualResidenceAddressCheckbox = (e) => {
//     setManualResidenceAddressInput(e.target.checked);
//   };

//   const userPhone = authState.phone || registrationState.phone;
//   const userEmail = authState.email || registrationState.email;

//   return (
//     <Form form={form} {...formItemLayout} onFinish={onFinish}>
//       <Divider orientation="center">ФИО</Divider>

//       <Form.Item
//         label="Фамилия"
//         name="lastname"
//         rules={[
//           {
//             required: true,
//             message: "Пожалуйста, введите вашу фамилию",
//           },
//         ]}
//       >
//         <Input placeholder="Иванов" />
//       </Form.Item>

//       <Form.Item
//         label="Имя"
//         name="firstname"
//         rules={[
//           {
//             required: true,
//             message: "Пожалуйста, введите ваше имя",
//           },
//         ]}
//       >
//         <Input placeholder="Иван" />
//       </Form.Item>

//       <Form.Item
//         label="Отчество"
//         name="secondname"
//         rules={[
//           {
//             required: true,
//             message: "Пожалуйста, введите ваше отчество",
//           },
//         ]}
//       >
//         <Input placeholder="Иванович" />
//       </Form.Item>

//       <Divider orientation="center">Подтверждающий документ</Divider>

//       <Form.Item
//         label="Тип документа"
//         name="typedocuments"
//         // rules={[
//         //   {
//         //     required: true,
//         //     message: "Пожалуйста, укажите тип документа",
//         //   },
//         // ]}
//       >
//         <Select defaultValue="passport" onChange={onDocumentTypeChange}>
//           <Option value="passport">Паспорт гражданина РФ</Option>
//           <Option value="other">Иной документ</Option>
//         </Select>
//       </Form.Item>
//       {documentType === "passport" && (
//         <>
//           <Flex gap="middle" vertical>
//             <Form.Item
//               label="Серия паспорта"
//               name="seriaspasport"
//               rules={[
//                 {
//                   required: true,
//                   message: "Пожалуйста, укажите серию паспорта",
//                 },
//               ]}
//             >
//               <Input maxLength={4} pattern="\d*" placeholder="1234" />
//             </Form.Item>
//             <Form.Item
//               label="Номер паспорта"
//               name="numberpasport"
//               rules={[
//                 {
//                   required: true,
//                   message: "Пожалуйста, укажите номер паспорта",
//                 },
//               ]}
//             >
//               <Input maxLength={6} pattern="\d*" placeholder="567890" />
//             </Form.Item>
//             <Form.Item
//               label="Код подразделения"
//               name="kodpodrazdelenia"
//               rules={[
//                 {
//                   required: true,
//                   message: "Пожалуйста, укажите код подразделения",
//                 },
//               ]}
//             >
//               <Input maxLength={6} pattern="\d*" placeholder="123456" />
//             </Form.Item>
//             <Form.Item
//               label="Кем выдан"
//               name="kemvidan"
//               rules={[
//                 {
//                   required: true,
//                   message: "Пожалуйста, укажите кем выдан паспорт",
//                 },
//               ]}
//             >
//               <Input placeholder="..." />
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
//           <Form.Item
//             label="Реквизиты документа"
//             name="recvizitydocumenta"
//             rules={[
//               {
//                 required: true,
//                 message: "Пожалуйста, укажите реквизиты документа",
//               },
//             ]}
//           >
//             <Input placeholder="..." />
//           </Form.Item>
//         </>
//       )}
//       <Form.Item
//         label="Загрузить файл"
//         name="uploader"
//         rules={[
//           {
//             required: true,
//             message: "Пожалуйста, загрузите файл",
//           },
//         ]}
//       >
//         <Upload {...uploadProps}>
//           <Button icon={<UploadOutlined />}>Загрузить файл</Button>
//         </Upload>
//       </Form.Item>
//       <Divider orientation="center">СНИЛС</Divider>
//       <Form.Item
//         label="Номер"
//         name="snils"
//         rules={[
//           {
//             required: true,
//             message: "Пожалуйста, введите номер СНИЛС",
//           },
//         ]}
//       >
//         <Input placeholder="..." />
//       </Form.Item>
//       <Divider orientation="center">Место регистрации</Divider>
//       <Form.Item
//         label="Адрес"
//         name={"registration"}
//         rules={[
//           {
//             required: true,
//             message: "Пожалуйста, введите адрес регистрации",
//           },
//         ]}
//       >
//         {manualAddressInput ? (
//           <Input />
//         ) : (
//           <AutoComplete
//             options={options}
//             onSelect={onSelect}
//             onSearch={onSearch}
//           >
//             <TextArea
//               placeholder="Начните вводить"
//               style={{
//                 height: 60,
//               }}
//             />
//           </AutoComplete>
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
//       <Form.Item
//         label="Адрес"
//         name="livingadres"
//         rules={[
//           {
//             required: true,
//             message: "Введите город, улицу, номер дома и квартиру",
//           },
//         ]}
//       >
//         {manualAddressInput ? (
//           <Input />
//         ) : (
//           <AutoComplete
//             options={options}
//             onSelect={onSelect}
//             onSearch={onSearch}
//           >
//             <TextArea
//               placeholder="Начните вводить"
//               style={{
//                 height: 60,
//               }}
//             />
//           </AutoComplete>
//         )}
//       </Form.Item>
//       <Form.Item>
//         <Checkbox
//           checked={manualResidenceAddressInput}
//           onChange={handleManualResidenceAddressCheckbox}
//         >
//           Ввести адрес по полям вручную
//         </Checkbox>
//       </Form.Item>
//       <Divider orientation="center">Другое</Divider>
//       <Form.Item
//         label="Мобильный номер телефона"
//         name="phone"
//         rules={[{ required: true, message: "Введите номер телефона" }]}
//       >
//         <Input
//           defaultValue={userPhone}
//           onChange={handlePhoneChange}
//           placeholder="+7 (123) 456-78-90"
//         />
//       </Form.Item>
//       <Form.Item
//         label="Адрес электронной почты"
//         name="email"
//         rules={[{ required: true, message: "Введите email" }]}
//       >
//         <Input
//           defaultValue={userEmail}
//           onChange={handleEmailChange}
//           placeholder="ivanov@yandex.ru"
//         />
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" onClick={() => form.submit()}>
//           Отправить
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// }
