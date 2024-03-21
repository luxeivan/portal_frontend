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

import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

import { formItemLayout } from "../../.././components/configSizeForm";
import { debounce } from "lodash";
import TextArea from "antd/es/input/TextArea";
import useSubjects from "../../../stores/Cabinet/useSubjects";

const { Option } = Select;
const { Dragger } = Upload;

export default function ModalFizLica({ onSubmit, setShowModalAdd, type }) {
  const [documentType, setDocumentType] = useState("passport");
  const [manualAddressInput, setManualAddressInput] = useState(false);
  const [registrationAddress, setRegistrationAddress] = useState("");
  const [isAddressSame, setIsAddressSame] = useState(false);
  const [residenceAddress, setResidenceAddress] = useState("");
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [manualResidenceAddressInput, setManualResidenceAddressInput] =
    useState(false);

  const [kodPodrazdelenia, setKodPodrazdelenia] = useState("");

  const [form] = Form.useForm();
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
      setShowModalAdd(false);
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.log(error);
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
    multiple: false, // Если вы хотите загружать только один файл за раз, установите false
    action: `${config.backServer}/api/cabinet/upload-file`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    withCredentials: true,
    customRequest(options) {
      const formData = new FormData();
      formData.append("file", options.file);

      axios
        .post(options.action, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            ...options.headers,
          },
        })
        .then((response) => {
          // Обычно response.data должен содержать путь к файлу, который мы можем использовать
          console.log("Ответ сервера", response.data);
          options.onSuccess(response.data, options.file);
          message.success(`${options.file.name} файл успешно загружен.`);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке файла", error);
          options.onError(error);
          message.error(`${options.file.name} не удалось загрузить файл.`);
        });
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} файл успешно загружен.`);
      } else if (status === "error") {
        message.error(`${info.file.name} не удалось загрузить файл.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  // const uploadProps = {
  //   name: "file",
  //   headers: {
  //     authorization: "authorization-text",
  //   },

  //   customRequest({ file, onSuccess, onError }) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     const token = localStorage.getItem("jwt");
  //     axios
  //       .post(`${config.backServer}/api/cabinet/upload-file`, formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         withCredentials: true,
  //       })
  //       .then((response) => {
  //         console.log("Ответ сервера", response.data);
  //         const relativePath = response.data.files[0];
  //         console.log("relativePath", relativePath);
  //         onSuccess(relativePath, file);
  //         message.success(
  //           `${file.name} файл загружен успешно и сохранен по пути: ${relativePath}`
  //         );
  //       })
  //       .catch((error) => {
  //         console.error("Ошибка при загрузке файла", error);
  //         onError(error);
  //         message.error(`${file.name} файл не загрузился, попробуйте ещё раз.`);
  //       });
  //   },
  // };

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

  const handleKodPodrazdeleniaChange = (e) => {
    const { value } = e.target;
    const onlyNums = value.replace(/[^\d]/g, ""); // удаляем всё кроме цифр
    let formattedKod = "";

    if (onlyNums.length <= 3) {
      formattedKod = onlyNums;
    } else if (onlyNums.length > 3 && onlyNums.length <= 6) {
      formattedKod = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    }

    setKodPodrazdelenia(formattedKod);
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

  const validateSnils = (snils) => {
    const error = { code: 0, message: "" };
    if (typeof snils !== "string") snils = "";
    if (!snils.length) {
      error.code = 1;
      error.message = "СНИЛС пуст";
    } else if (snils.length !== 14) {
      error.code = 2;
      error.message = "СНИЛС должен состоять из 11 цифр";
    } else {
      const nums = snils.replace(/[^0-9]/g, "");
      if (nums.length !== 11) {
        error.code = 3;
        error.message = "Неправильный формат СНИЛС";
      } else {
        let sum = 0;
        for (let i = 0; i < 9; i++) {
          sum += parseInt(nums[i]) * (9 - i);
        }
        let checkDigit = sum < 100 ? sum : sum % 101;
        if (checkDigit === 100) checkDigit = 0;
        if (checkDigit === parseInt(nums.slice(-2))) {
          return Promise.resolve();
        } else {
          error.code = 4;
          error.message = "Неверный контрольный номер";
        }
      }
    }
    return Promise.reject(error.message);
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

      <Form.Item label="Отчество" name="secondname">
        <Input placeholder="Иванович" />
      </Form.Item>

      <Divider orientation="center">Подтверждающий документ</Divider>

      <Form.Item label="Тип документа" name="typedocuments">
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
                () => ({
                  validator(_, value) {
                    if (!value || /^\d{3}-\d{3}$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Формат кода подразделения должен быть 111-111")
                    );
                  },
                }),
              ]}
            >
              <Input
                maxLength={7}
                placeholder="123-456"
                value={kodPodrazdelenia}
                onChange={handleKodPodrazdeleniaChange}
              />
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
              <TextArea
                placeholder="..."
                style={{
                  height: 60,
                }}
              />
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
            <TextArea
              placeholder="..."
              style={{
                height: 60,
              }}
            />
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
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Нажмите или перетащите файл в эту область для загрузки
          </p>
          <p className="ant-upload-hint">
            Поддерживается загрузка одного или нескольких файлов.
          </p>
        </Dragger>
        {/* <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Загрузить файл</Button>
        </Upload> */}
      </Form.Item>
      <Divider orientation="center">СНИЛС</Divider>
      <Form.Item
        label="Номер СНИЛС"
        name="snils"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите номер СНИЛС",
          },
          () => ({
            validator(_, value) {
              if (!value) {
                return Promise.reject(new Error("СНИЛС не может быть пустым"));
              }
              if (!/^\d{3}-\d{3}-\d{3}[\s-]?\d{2}$/.test(value)) {
                return Promise.reject(new Error("Формат СНИЛС неверный"));
              }
              return validateSnils(value);
            },
          }),
        ]}
      >
        <Input
          placeholder="XXX-XXX-XXX XX"
          maxLength={14}
          onChange={(e) => {
            let value = e.target.value.replace(/[^0-9]/g, "");
            if (value.length > 9) {
              value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(
                6,
                9
              )} ${value.slice(9, 11)}`;
            } else if (value.length > 6) {
              value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(
                6
              )}`;
            } else if (value.length > 3) {
              value = `${value.slice(0, 3)}-${value.slice(3)}`;
            }
            e.target.value = value;
            form.setFieldsValue({ snils: value });
          }}
        />
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
            options={options.map((option) => ({
              ...option,
              label: <div style={{ whiteSpace: "normal" }}>{option.label}</div>,
            }))}
            onSelect={onSelect}
            onSearch={onSearch}
            popupMatchSelectWidth={true}
            style={{ width: "100%" }}
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
            options={options.map((option) => ({
              ...option,
              label: <div style={{ whiteSpace: "normal" }}>{option.label}</div>,
            }))}
            onSelect={onSelect}
            onSearch={onSearch}
            popupMatchSelectWidth={true}
            style={{ width: "100%" }}
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

// 21 марта в 9:18
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

// export default function ModalFizLica({ onSubmit, setShowModalAdd, type }) {
//   const [documentType, setDocumentType] = useState("passport");
//   const [manualAddressInput, setManualAddressInput] = useState(false);
//   const [registrationAddress, setRegistrationAddress] = useState("");
//   const [isAddressSame, setIsAddressSame] = useState(false);
//   const [residenceAddress, setResidenceAddress] = useState("");
//   const [options, setOptions] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [manualResidenceAddressInput, setManualResidenceAddressInput] =
//     useState(false);

//   const [kodPodrazdelenia, setKodPodrazdelenia] = useState("");

//   const [form] = Form.useForm();
//   const { submitNewSubject } = useSubjects();

//   const onFinish = async (values) => {
//     const formData = {
//       type: "Физическое лицо",
//       firstname: values.firstname,
//       lastname: values.lastname,
//       secondname: values.secondname,
//       snils: values.snils.replace(/[^0-9]/g, ""),
//     };

//     try {
//       await submitNewSubject(formData);
//       message.success("Субъект успешно создан");
//       form.resetFields();
//       setShowModalAdd(false);
//       if (onSubmit) {
//         onSubmit();
//       }
//     } catch (error) {
//       console.log(error);
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
//           const relativePath = response.data.files[0];
//           console.log("relativePath", relativePath);
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

//   const handleKodPodrazdeleniaChange = (e) => {
//     const { value } = e.target;
//     const onlyNums = value.replace(/[^\d]/g, ""); // удаляем всё кроме цифр
//     let formattedKod = "";

//     if (onlyNums.length <= 3) {
//       formattedKod = onlyNums;
//     } else if (onlyNums.length > 3 && onlyNums.length <= 6) {
//       formattedKod = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
//     }

//     setKodPodrazdelenia(formattedKod);
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

//   const validateSnils = (snils) => {
//     const error = { code: 0, message: "" };
//     if (typeof snils !== "string") snils = "";
//     if (!snils.length) {
//       error.code = 1;
//       error.message = "СНИЛС пуст";
//     } else if (snils.length !== 14) {
//       error.code = 2;
//       error.message = "СНИЛС должен состоять из 11 цифр";
//     } else {
//       const nums = snils.replace(/[^0-9]/g, "");
//       if (nums.length !== 11) {
//         error.code = 3;
//         error.message = "Неправильный формат СНИЛС";
//       } else {
//         let sum = 0;
//         for (let i = 0; i < 9; i++) {
//           sum += parseInt(nums[i]) * (9 - i);
//         }
//         let checkDigit = sum < 100 ? sum : sum % 101;
//         if (checkDigit === 100) checkDigit = 0;
//         if (checkDigit === parseInt(nums.slice(-2))) {
//           return Promise.resolve();
//         } else {
//           error.code = 4;
//           error.message = "Неверный контрольный номер";
//         }
//       }
//     }
//     return Promise.reject(error.message);
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

//       <Form.Item label="Отчество" name="secondname">
//         <Input placeholder="Иванович" />
//       </Form.Item>

//       <Divider orientation="center">Подтверждающий документ</Divider>

//       <Form.Item label="Тип документа" name="typedocuments">
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
//                 () => ({
//                   validator(_, value) {
//                     if (!value || /^\d{3}-\d{3}$/.test(value)) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(
//                       new Error("Формат кода подразделения должен быть 111-111")
//                     );
//                   },
//                 }),
//               ]}
//             >
//               <Input
//                 maxLength={7}
//                 placeholder="123-456"
//                 value={kodPodrazdelenia}
//                 onChange={handleKodPodrazdeleniaChange}
//               />
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
//               <TextArea
//                 placeholder="..."
//                 style={{
//                   height: 60,
//                 }}
//               />
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
//             <TextArea
//               placeholder="..."
//               style={{
//                 height: 60,
//               }}
//             />
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
//         label="Номер СНИЛС"
//         name="snils"
//         rules={[
//           {
//             required: true,
//             message: "Пожалуйста, введите номер СНИЛС",
//           },
//           () => ({
//             validator(_, value) {
//               if (!value) {
//                 return Promise.reject(new Error("СНИЛС не может быть пустым"));
//               }
//               if (!/^\d{3}-\d{3}-\d{3}[\s-]?\d{2}$/.test(value)) {
//                 return Promise.reject(new Error("Формат СНИЛС неверный"));
//               }
//               return validateSnils(value);
//             },
//           }),
//         ]}
//       >
//         <Input
//           placeholder="XXX-XXX-XXX XX"
//           maxLength={14}
//           onChange={(e) => {
//             let value = e.target.value.replace(/[^0-9]/g, "");
//             if (value.length > 9) {
//               value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(
//                 6,
//                 9
//               )} ${value.slice(9, 11)}`;
//             } else if (value.length > 6) {
//               value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(
//                 6
//               )}`;
//             } else if (value.length > 3) {
//               value = `${value.slice(0, 3)}-${value.slice(3)}`;
//             }
//             e.target.value = value;
//             form.setFieldsValue({ snils: value });
//           }}
//         />
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
//             options={options.map((option) => ({
//               ...option,
//               label: <div style={{ whiteSpace: "normal" }}>{option.label}</div>,
//             }))}
//             onSelect={onSelect}
//             onSearch={onSearch}
//             popupMatchSelectWidth = {true}
//             style={{ width: "100%" }}
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
//             options={options.map((option) => ({
//               ...option,
//               label: <div style={{ whiteSpace: "normal" }}>{option.label}</div>,
//             }))}
//             onSelect={onSelect}
//             onSearch={onSearch}
//             popupMatchSelectWidth = {true}
//             style={{ width: "100%" }}
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

// 21 марта в 8:37
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

// export default function ModalFizLica({ onSubmit, setShowModalAdd, type }) {
//   const [documentType, setDocumentType] = useState("passport");
//   const [manualAddressInput, setManualAddressInput] = useState(false);
//   const [registrationAddress, setRegistrationAddress] = useState("");
//   const [isAddressSame, setIsAddressSame] = useState(false);
//   const [residenceAddress, setResidenceAddress] = useState("");
//   const [options, setOptions] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [manualResidenceAddressInput, setManualResidenceAddressInput] =
//     useState(false);

//   const [kodPodrazdelenia, setKodPodrazdelenia] = useState("");

//   const [form] = Form.useForm();
//   // const useSubjectsStore = useSubjects();
//   const { submitNewSubject } = useSubjects();

//   const onFinish = async (values) => {
//     const formData = {
//       type: "Физическое лицо",
//       firstname: values.firstname,
//       lastname: values.lastname,
//       secondname: values.secondname,
//       snils: values.snils.replace(/[^0-9]/g, ""),
//     };

//     try {
//       await submitNewSubject(formData);
//       message.success("Субъект успешно создан");
//       form.resetFields();
//       setShowModalAdd(false);
//       if (onSubmit) {
//         onSubmit();
//       }
//     } catch (error) {
//       console.log(error);
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
//           const relativePath = response.data.files[0];
//           console.log("relativePath", relativePath);
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

//   const handleKodPodrazdeleniaChange = (e) => {
//     const { value } = e.target;
//     const onlyNums = value.replace(/[^\d]/g, ""); // удаляем всё кроме цифр
//     let formattedKod = "";

//     if (onlyNums.length <= 3) {
//       formattedKod = onlyNums;
//     } else if (onlyNums.length > 3 && onlyNums.length <= 6) {
//       formattedKod = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
//     }

//     setKodPodrazdelenia(formattedKod);
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

//   const validateSnils = (snils) => {
//     const error = { code: 0, message: "" };
//     if (typeof snils !== "string") snils = "";
//     if (!snils.length) {
//       error.code = 1;
//       error.message = "СНИЛС пуст";
//     } else if (snils.length !== 14) {
//       error.code = 2;
//       error.message = "СНИЛС должен состоять из 11 цифр";
//     } else {
//       const nums = snils.replace(/[^0-9]/g, "");
//       if (nums.length !== 11) {
//         error.code = 3;
//         error.message = "Неправильный формат СНИЛС";
//       } else {
//         let sum = 0;
//         for (let i = 0; i < 9; i++) {
//           sum += parseInt(nums[i]) * (9 - i);
//         }
//         let checkDigit = sum < 100 ? sum : sum % 101;
//         if (checkDigit === 100) checkDigit = 0;
//         if (checkDigit === parseInt(nums.slice(-2))) {
//           return Promise.resolve();
//         } else {
//           error.code = 4;
//           error.message = "Неверный контрольный номер";
//         }
//       }
//     }
//     return Promise.reject(error.message);
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

//       <Form.Item label="Отчество" name="secondname">
//         <Input placeholder="Иванович" />
//       </Form.Item>

//       <Divider orientation="center">Подтверждающий документ</Divider>

//       <Form.Item label="Тип документа" name="typedocuments">
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
//                 () => ({
//                   validator(_, value) {
//                     if (!value || /^\d{3}-\d{3}$/.test(value)) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(
//                       new Error("Формат кода подразделения должен быть 111-111")
//                     );
//                   },
//                 }),
//               ]}
//             >
//               <Input
//                 maxLength={7}
//                 placeholder="123-456"
//                 value={kodPodrazdelenia}
//                 onChange={handleKodPodrazdeleniaChange}
//               />
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
//               <TextArea
//                 placeholder="..."
//                 style={{
//                   height: 60,
//                 }}
//               />
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
//             <TextArea
//               placeholder="..."
//               style={{
//                 height: 60,
//               }}
//             />
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
//         label="Номер СНИЛС"
//         name="snils"
//         rules={[
//           {
//             required: true,
//             message: "Пожалуйста, введите номер СНИЛС",
//           },
//           () => ({
//             validator(_, value) {
//               if (!value) {
//                 return Promise.reject(new Error('СНИЛС не может быть пустым'));
//               }
//               if (!/^\d{3}-\d{3}-\d{3}[\s-]?\d{2}$/.test(value)) {
//                 return Promise.reject(new Error('Формат СНИЛС неверный'));
//               }
//               return validateSnils(value);
//             },
//           }),
//         ]}
//       >
//         <Input
//           placeholder="XXX-XXX-XXX XX"
//           maxLength={14}
//           onChange={(e) => {
//             let value = e.target.value.replace(/[^0-9]/g, "");
//             if (value.length > 9) {
//               value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(
//                 6,
//                 9
//               )} ${value.slice(9, 11)}`;
//             } else if (value.length > 6) {
//               value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(
//                 6
//               )}`;
//             } else if (value.length > 3) {
//               value = `${value.slice(0, 3)}-${value.slice(3)}`;
//             }
//             e.target.value = value;
//             form.setFieldsValue({ snils: value });
//           }}
//         />
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
