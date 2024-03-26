import React, { useState, useEffect } from "react";

import {
  Flex,
  Input,
  Form,
  Select,
  AutoComplete,
  Checkbox,
  Button,
  Divider,
  message,
} from "antd";

import useAuth from "../../../stores/./useAuth";
import useRegistration from "../../.././stores/useRegistration";
import useSubjects from "../../../stores/Cabinet/useSubjects";

import { formItemLayout } from "../../.././components/configSizeForm";
import TextArea from "antd/es/input/TextArea";

import Uploader from "../../../components/FormComponents/Uploader";
// import TextInput from "../../../components/FormComponents/TextInput"; ниже пробовал

const { Option } = Select;

export default function ModalFizLica({ onSubmit, setShowModalAdd }) {
  const [documentType, setDocumentType] = useState("passport");
  const [searchText] = useState("");
  const [manualAddressInput, setManualAddressInput] = useState(false);
  const [registrationAddress] = useState("");
  const [isAddressSame, setIsAddressSame] = useState(false);
  const [residenceAddress, setResidenceAddress] = useState(""); // я х.з почему, но без residenceAddress всё крашится
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");

  const [manualResidenceAddressInput, setManualResidenceAddressInput] =
    useState(false);
  const [kodPodrazdelenia, setKodPodrazdelenia] = useState("");
  const [fileList, setFileList] = useState([]);
  const [selectedRegistrationAddress, setSelectedRegistrationAddress] =
    useState("");
  const [selectRedesidenceAddress, setSelectedResidenceAddress] = useState("");

  const [form] = Form.useForm();
  const {
    submitNewSubject,
    addressOptions,
    setSearchText,
    debouncedFetchAddresses,
    validateSnils,
  } = useSubjects();

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

  // Включает или выключает ручной ввод адреса регистрации
  const handleManualAddressCheckbox = (e) => {
    setManualAddressInput(e.target.checked);
    if (e.target.checked) {
      setSelectedRegistrationAddress("");
    }
  };

  // Изменяет тип документа в зависимости от выбора пользователя
  const onDocumentTypeChange = (value) => {
    setDocumentType(value);
  };
  // Состояние авторизации пользователя
  const authState = useAuth((state) => ({
    phone: state.phone,
    email: state.email,
  }));

  // Состояние регистрации пользователя
  const registrationState = useRegistration((state) => ({
    phone: state.phone,
    email: state.email,
  }));

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(
      /^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2}).*/,
      "+$1 ($2) $3-$4-$5"
    );
    value = value.substring(0, 18);
    form.setFieldsValue({ phone: value });
  };

  const handleEmailChange = (e) => {
    console.log("Новый email:", e.target.value);
  };

  // Устанавливает адрес проживания, если он совпадает с адресом регистрации
  const handleAddressCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsAddressSame(isChecked);
    if (isChecked) {
      setResidenceAddress(registrationAddress);
    } else {
      setResidenceAddress("");
    }
  };

  // Обрабатывает изменения в коде подразделения, форматируя его
  const handleKodPodrazdeleniaChange = (e) => {
    const { value } = e.target;
    const onlyNums = value.replace(/[^\d]/g, "");
    let formattedKod = "";

    if (onlyNums.length <= 3) {
      formattedKod = onlyNums;
    } else if (onlyNums.length > 3 && onlyNums.length <= 6) {
      formattedKod = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    }
    setKodPodrazdelenia(formattedKod);
  };

  // Устанавливает адрес, выбранный из списка
  const onSelect = (value, option) => {
    setSelectedRegistrationAddress(option.value);
  };

  // Валидирует адрес, убеждаясь, что он был выбран из списка :)
  const validateAddress = (rule, value) => {
    if (selectedRegistrationAddress === value) {
      return Promise.resolve();
    }
    return Promise.reject("Выберите адрес из списка");
  };

  useEffect(() => {
    debouncedFetchAddresses(searchText);
  }, [searchText, debouncedFetchAddresses]);

  // Обрабатывает изменения в поле поиска адреса
  const onSearch = (searchText) => {
    setSearchText(searchText);
    debouncedFetchAddresses(searchText);
  };

  // Включает или выключает ручной ввод адреса проживания
  const handleManualResidenceAddressCheckbox = (e) => {
    setManualResidenceAddressInput(e.target.checked);
    if (e.target.checked) {
      setSelectedResidenceAddress("");
    }
  };

  const userPhone = authState.phone || registrationState.phone;
  const userEmail = authState.email || registrationState.email;

  //Поля для ручного ввода адреса регистрации
  const manualAddressFields = (
    <>
      <Form.Item label="Город" name="city">
        <Input value={city} onChange={(e) => setCity(e.target.value)} />
      </Form.Item>

      <Form.Item label="Улица" name="street">
        <Input value={street} onChange={(e) => setStreet(e.target.value)} />
      </Form.Item>

      <Form.Item label="Номер дома" name="houseNumber">
        <Input
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Номер квартиры" name="apartmentNumber">
        <Input
          value={apartmentNumber}
          onChange={(e) => setApartmentNumber(e.target.value)}
        />
      </Form.Item>
    </>
  );

  //Поля для ручного ввода адреса проживания
  const manualResidenceAddressFields = (
    <>
      <Form.Item label="Город" name="residenceCity">
        <Input />
      </Form.Item>
      <Form.Item label="Улица" name="residenceStreet">
        <Input />
      </Form.Item>
      <Form.Item label="Номер дома" name="residenceStreet">
        <Input />
      </Form.Item>
      <Form.Item label="Номер квартиры" name="residenceStreet">
        <Input />
      </Form.Item>
    </>
  );

  return (
    <Form
      form={form}
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        phone: userPhone,
        email: userEmail,
        typedocuments: "passport",
      }}
    >
      <Divider orientation="center">ФИО</Divider>

      {/* Пробовал тут зауниверсалить через TextInput */}
      {/* <Form.Item
        name="lastname"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите вашу фамилию",
          },
        ]}
      >
        <TextInput
          displayName="Фамилия"
          name="lastname"
          shortDescription="Введите вашу фамилию"
          required={true}
        />
      </Form.Item>

      <Form.Item
        name="firstname"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваше имя",
          },
        ]}
      >
        <TextInput
          displayName="Имя"
          name="firstname"
          shortDescription="Введите ваше имя"
          required={true}
        />
      </Form.Item>

      <Form.Item name="secondname">
        <TextInput
          displayName="Отчество"
          name="secondname"
          shortDescription="Введите ваше отчество"
          required={false}
        />
      </Form.Item> */}

      {/* _______Фамилия_______ */}
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

      {/* _______Имя_______ */}
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

      {/* _______Отчество_______ */}
      <Form.Item label="Отчество" name="secondname">
        <Input placeholder="Иванович" />
      </Form.Item>

      <Divider orientation="center">Подтверждающий документ</Divider>

      {/* _______Тип подтверждающего документа_______ */}
      <Form.Item label="Тип документа" name="typedocuments">
        <Select onChange={onDocumentTypeChange}>
          <Option value="passport">Паспорт гражданина РФ</Option>
          <Option value="other">Иной документ</Option>
        </Select>
      </Form.Item>

      {/* _______Паспорт_______ */}
      {documentType === "passport" && (
        <>
          <Flex gap="middle" vertical>
            {/* _______Серия паспорта_______ */}
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

            {/* _______Номер паспорта_______ */}
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

            {/* _______Код подразделения_______ */}
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

            {/* _______Кем выдан_______ */}
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

      {/* _______Иной документ_______ */}
      {documentType === "other" && (
        <>
          {/* _______Тип документа_______ */}
          <Form.Item label="Тип документа">
            <Select>
              <Option value="type1">Тип1</Option>
              <Option value="type2">Тип2</Option>
            </Select>
          </Form.Item>

          {/* _______Реквизиты документа_______ */}
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

      {/* _______Загрузка_______ */}
      <Uploader
        fileList={fileList}
        onChange={({ fileList: newFileList }) => setFileList(newFileList)}
      />

      <Divider orientation="center">СНИЛС</Divider>

      {/* _______СНИЛС_______ */}
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

      {/* _______Место регистрации_______ */}
      {!manualAddressInput ? (
        // Автокомплит для адреса, если ввод не ручной
        <Form.Item
          label="Адрес"
          name={"registration"}
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите адрес регистрации",
            },
            { validator: validateAddress },
          ]}
        >
          {manualAddressInput ? (
            <Input />
          ) : (
            <AutoComplete
              options={addressOptions.map((option) => ({
                ...option,
                label: (
                  <div style={{ whiteSpace: "normal" }}>{option.label}</div>
                ),
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
      ) : (
        manualAddressFields
      )}

      {/* _______Чекбокс ручного ввода_______ */}
      <Form.Item>
        <Checkbox
          checked={manualAddressInput}
          onChange={handleManualAddressCheckbox}
        >
          Ввести адрес по полям вручную
        </Checkbox>
      </Form.Item>

      <Divider orientation="center">Место проживания</Divider>

      {/* _______Чекбокс совпадения адреса_______ */}
      <Form.Item>
        <Checkbox
          checked={isAddressSame}
          onChange={handleAddressCheckboxChange}
        >
          Совпадает с адресом по месту регистрации
        </Checkbox>
      </Form.Item>

      {/* _______Если адрес совпадает_______ */}

      {/* {!isAddressSame && (
        <>
          <Form.Item
            label="Адрес"
            name="livingadres"
            rules={[
              {
                required: true,
                message: "Введите город, улицу, номер дома и квартиру",
              },
              { validator: validateAddress },
            ]}
          >
            {!manualResidenceAddressInput ? (
              <Input />
            ) : (
              <AutoComplete
                options={addressOptions.map((option) => ({
                  ...option,
                  label: (
                    <div style={{ whiteSpace: "normal" }}>{option.label}</div>
                  ),
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
        </>
      )} */}

      {/* _______Если адрес совпадает_______ */}

      {!isAddressSame && (
        <>
          {manualResidenceAddressInput ? (
            // Тут используем поля для ручного ввода адреса проживания
            manualResidenceAddressFields
          ) : (
            <Form.Item
              label="Адрес проживания"
              name="livingAddress"
              rules={[
                {
                  required: true,
                  message: "Введите город, улицу, номер дома и квартиру",
                },
                { validator: validateAddress },
              ]}
            >
              <AutoComplete
                options={addressOptions.map((option) => ({
                  ...option,
                  label: (
                    <div style={{ whiteSpace: "normal" }}>{option.label}</div>
                  ),
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
            </Form.Item>
          )}

          <Form.Item>
            <Checkbox
              checked={manualResidenceAddressInput}
              onChange={handleManualResidenceAddressCheckbox}
            >
              Ввести адрес проживания по полям вручную
            </Checkbox>
          </Form.Item>
        </>
      )}

      <Divider orientation="center">Другое</Divider>

      {/* _______Телефон_______ */}
      <Form.Item
        label="Мобильный номер телефона"
        name="phone"
        rules={[{ required: true, message: "Введите номер телефона" }]}
      >
        <Input
          onChange={handlePhoneChange}
          placeholder="Начните вводить номер с цифры 7..."
          maxLength={18}
        />
      </Form.Item>

      {/* _______Почта_______ */}
      <Form.Item
        label="Адрес электронной почты"
        name="email"
        rules={[
          { required: true, message: "Введите email" },
          {
            type: "email",
            message: "Пожалуйста, введите корректный email",
          },
        ]}
      >
        <Input onChange={handleEmailChange} placeholder="ivanov@yandex.ru" />
      </Form.Item>

      {/* _______Кнопка отправки формы_______ */}
      <Form.Item>
        <Button type="primary" onClick={() => form.submit()}>
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
}


// import React, { useState, useEffect } from "react";

// import {
//   Flex,
//   Input,
//   Form,
//   Select,
//   AutoComplete,
//   Checkbox,
//   Button,
//   Divider,
//   message,
// } from "antd";

// import useAuth from "../../../stores/./useAuth";
// import useRegistration from "../../.././stores/useRegistration";
// import useSubjects from "../../../stores/Cabinet/useSubjects";

// import { formItemLayout } from "../../.././components/configSizeForm";
// import TextArea from "antd/es/input/TextArea";

// import Uploader from "../../../components/FormComponents/Uploader";
// // import TextInput from "../../../components/FormComponents/TextInput"; ниже пробовал

// const { Option } = Select;

// export default function ModalFizLica({ onSubmit, setShowModalAdd }) {
//   const [documentType, setDocumentType] = useState("passport");
//   const [searchText] = useState("");
//   const [manualAddressInput, setManualAddressInput] = useState(false);
//   const [registrationAddress] = useState("");
//   const [isAddressSame, setIsAddressSame] = useState(false);
//   const [residenceAddress, setResidenceAddress] = useState(""); // я х.з почему, но без residenceAddress всё крашится
//   const [city, setCity] = useState("");
//   const [street, setStreet] = useState("");
//   const [houseNumber, setHouseNumber] = useState("");
//   const [apartmentNumber, setApartmentNumber] = useState("");

//   const [manualResidenceAddressInput, setManualResidenceAddressInput] =
//     useState(false);
//   const [kodPodrazdelenia, setKodPodrazdelenia] = useState("");
//   const [fileList, setFileList] = useState([]);
//   const [selectedRegistrationAddress, setSelectedRegistrationAddress] =
//     useState("");
//   const [selectRedesidenceAddress, setSelectedResidenceAddress] = useState("");

//   const [form] = Form.useForm();
//   const {
//     submitNewSubject,
//     addressOptions,
//     setSearchText,
//     debouncedFetchAddresses,
//     validateSnils,
//   } = useSubjects();

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

//   // Включает или выключает ручной ввод адреса регистрации
//   const handleManualAddressCheckbox = (e) => {
//     setManualAddressInput(e.target.checked);
//     if (e.target.checked) {
//       setSelectedRegistrationAddress("");
//     }
//   };

//   // Изменяет тип документа в зависимости от выбора пользователя
//   const onDocumentTypeChange = (value) => {
//     setDocumentType(value);
//   };
//   // Состояние авторизации пользователя
//   const authState = useAuth((state) => ({
//     phone: state.phone,
//     email: state.email,
//   }));

//   // Состояние регистрации пользователя
//   const registrationState = useRegistration((state) => ({
//     phone: state.phone,
//     email: state.email,
//   }));

//   const handlePhoneChange = (e) => {
//     let value = e.target.value.replace(/\D/g, "");
//     value = value.replace(
//       /^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2}).*/,
//       "+$1 ($2) $3-$4-$5"
//     );
//     value = value.substring(0, 18);
//     form.setFieldsValue({ phone: value });
//   };

//   const handleEmailChange = (e) => {
//     console.log("Новый email:", e.target.value);
//   };

//   // Устанавливает адрес проживания, если он совпадает с адресом регистрации
//   const handleAddressCheckboxChange = (e) => {
//     const isChecked = e.target.checked;
//     setIsAddressSame(isChecked);
//     if (isChecked) {
//       setResidenceAddress(registrationAddress);
//     } else {
//       setResidenceAddress("");
//     }
//   };

//   // Обрабатывает изменения в коде подразделения, форматируя его
//   const handleKodPodrazdeleniaChange = (e) => {
//     const { value } = e.target;
//     const onlyNums = value.replace(/[^\d]/g, "");
//     let formattedKod = "";

//     if (onlyNums.length <= 3) {
//       formattedKod = onlyNums;
//     } else if (onlyNums.length > 3 && onlyNums.length <= 6) {
//       formattedKod = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
//     }
//     setKodPodrazdelenia(formattedKod);
//   };

//   // Устанавливает адрес, выбранный из списка
//   const onSelect = (value, option) => {
//     setSelectedRegistrationAddress(option.value);
//   };

//   // Валидирует адрес, убеждаясь, что он был выбран из списка :)
//   const validateAddress = (rule, value) => {
//     if (selectedRegistrationAddress === value) {
//       return Promise.resolve();
//     }
//     return Promise.reject("Выберите адрес из списка");
//   };

//   useEffect(() => {
//     debouncedFetchAddresses(searchText);
//   }, [searchText, debouncedFetchAddresses]);

//   // Обрабатывает изменения в поле поиска адреса
//   const onSearch = (searchText) => {
//     setSearchText(searchText);
//     debouncedFetchAddresses(searchText);
//   };

//   // Включает или выключает ручной ввод адреса проживания
//   const handleManualResidenceAddressCheckbox = (e) => {
//     setManualResidenceAddressInput(e.target.checked);
//     if (e.target.checked) {
//       setSelectedResidenceAddress("");
//     }
//   };

//   const userPhone = authState.phone || registrationState.phone;
//   const userEmail = authState.email || registrationState.email;

//   //Поля для ручного ввода адреса регистрации
//   const manualAddressFields = (
//     <>
//       <Form.Item label="Город" name="city">
//         <Input value={city} onChange={(e) => setCity(e.target.value)} />
//       </Form.Item>

//       <Form.Item label="Улица" name="street">
//         <Input value={street} onChange={(e) => setStreet(e.target.value)} />
//       </Form.Item>

//       <Form.Item label="Номер дома" name="houseNumber">
//         <Input
//           value={houseNumber}
//           onChange={(e) => setHouseNumber(e.target.value)}
//         />
//       </Form.Item>

//       <Form.Item label="Номер квартиры" name="apartmentNumber">
//         <Input
//           value={apartmentNumber}
//           onChange={(e) => setApartmentNumber(e.target.value)}
//         />
//       </Form.Item>
//     </>
//   );

//   //Поля для ручного ввода адреса проживания
//   const manualResidenceAddressFields = (
//     <>
//       <Form.Item label="Город" name="residenceCity">
//         <Input />
//       </Form.Item>
//       <Form.Item label="Улица" name="residenceStreet">
//         <Input />
//       </Form.Item>
//       <Form.Item label="Номер дома" name="residenceStreet">
//         <Input />
//       </Form.Item>
//       <Form.Item label="Номер квартиры" name="residenceStreet">
//         <Input />
//       </Form.Item>
//     </>
//   );

//   return (
//     <Form
//       form={form}
//       {...formItemLayout}
//       onFinish={onFinish}
//       initialValues={{
//         phone: userPhone,
//         email: userEmail,
//         typedocuments: "passport",
//       }}
//     >
//       <Divider orientation="center">ФИО</Divider>

//       {/* Пробовал тут зауниверсалить через TextInput */}
//       {/* <Form.Item
//         name="lastname"
//         rules={[
//           {
//             required: true,
//             message: "Пожалуйста, введите вашу фамилию",
//           },
//         ]}
//       >
//         <TextInput
//           displayName="Фамилия"
//           name="lastname"
//           shortDescription="Введите вашу фамилию"
//           required={true}
//         />
//       </Form.Item>

//       <Form.Item
//         name="firstname"
//         rules={[
//           {
//             required: true,
//             message: "Пожалуйста, введите ваше имя",
//           },
//         ]}
//       >
//         <TextInput
//           displayName="Имя"
//           name="firstname"
//           shortDescription="Введите ваше имя"
//           required={true}
//         />
//       </Form.Item>

//       <Form.Item name="secondname">
//         <TextInput
//           displayName="Отчество"
//           name="secondname"
//           shortDescription="Введите ваше отчество"
//           required={false}
//         />
//       </Form.Item> */}

//       {/* _______Фамилия_______ */}
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

//       {/* _______Имя_______ */}
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

//       {/* _______Отчество_______ */}
//       <Form.Item label="Отчество" name="secondname">
//         <Input placeholder="Иванович" />
//       </Form.Item>

//       <Divider orientation="center">Подтверждающий документ</Divider>

//       {/* _______Тип подтверждающего документа_______ */}
//       <Form.Item label="Тип документа" name="typedocuments">
//         <Select onChange={onDocumentTypeChange}>
//           <Option value="passport">Паспорт гражданина РФ</Option>
//           <Option value="other">Иной документ</Option>
//         </Select>
//       </Form.Item>

//       {/* _______Паспорт_______ */}
//       {documentType === "passport" && (
//         <>
//           <Flex gap="middle" vertical>
//             {/* _______Серия паспорта_______ */}
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

//             {/* _______Номер паспорта_______ */}
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

//             {/* _______Код подразделения_______ */}
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

//             {/* _______Кем выдан_______ */}
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

//       {/* _______Иной документ_______ */}
//       {documentType === "other" && (
//         <>
//           {/* _______Тип документа_______ */}
//           <Form.Item label="Тип документа">
//             <Select>
//               <Option value="type1">Тип1</Option>
//               <Option value="type2">Тип2</Option>
//             </Select>
//           </Form.Item>

//           {/* _______Реквизиты документа_______ */}
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

//       {/* _______Загрузка_______ */}
//       <Uploader
//         fileList={fileList}
//         onChange={({ fileList: newFileList }) => setFileList(newFileList)}
//       />

//       <Divider orientation="center">СНИЛС</Divider>

//       {/* _______СНИЛС_______ */}
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

//       {/* _______Место регистрации_______ */}
//       {!manualAddressInput ? (
//         // Автокомплит для адреса, если ввод не ручной
//         <Form.Item
//           label="Адрес"
//           name={"registration"}
//           rules={[
//             {
//               required: true,
//               message: "Пожалуйста, введите адрес регистрации",
//             },
//             { validator: validateAddress },
//           ]}
//         >
//           {manualAddressInput ? (
//             <Input />
//           ) : (
//             <AutoComplete
//               options={addressOptions.map((option) => ({
//                 ...option,
//                 label: (
//                   <div style={{ whiteSpace: "normal" }}>{option.label}</div>
//                 ),
//               }))}
//               onSelect={onSelect}
//               onSearch={onSearch}
//               popupMatchSelectWidth={true}
//               style={{ width: "100%" }}
//             >
//               <TextArea
//                 placeholder="Начните вводить"
//                 style={{
//                   height: 60,
//                 }}
//               />
//             </AutoComplete>
//           )}
//         </Form.Item>
//       ) : (
//         manualAddressFields
//       )}

//       {/* _______Чекбокс ручного ввода_______ */}
//       <Form.Item>
//         <Checkbox
//           checked={manualAddressInput}
//           onChange={handleManualAddressCheckbox}
//         >
//           Ввести адрес по полям вручную
//         </Checkbox>
//       </Form.Item>

//       <Divider orientation="center">Место проживания</Divider>

//       {/* _______Чекбокс совпадения адреса_______ */}
//       <Form.Item>
//         <Checkbox
//           checked={isAddressSame}
//           onChange={handleAddressCheckboxChange}
//         >
//           Совпадает с адресом по месту регистрации
//         </Checkbox>
//       </Form.Item>

//       {/* _______Если адрес совпадает_______ */}

//       {/* {!isAddressSame && (
//         <>
//           <Form.Item
//             label="Адрес"
//             name="livingadres"
//             rules={[
//               {
//                 required: true,
//                 message: "Введите город, улицу, номер дома и квартиру",
//               },
//               { validator: validateAddress },
//             ]}
//           >
//             {!manualResidenceAddressInput ? (
//               <Input />
//             ) : (
//               <AutoComplete
//                 options={addressOptions.map((option) => ({
//                   ...option,
//                   label: (
//                     <div style={{ whiteSpace: "normal" }}>{option.label}</div>
//                   ),
//                 }))}
//                 onSelect={onSelect}
//                 onSearch={onSearch}
//                 popupMatchSelectWidth={true}
//                 style={{ width: "100%" }}
//               >
//                 <TextArea
//                   placeholder="Начните вводить"
//                   style={{
//                     height: 60,
//                   }}
//                 />
//               </AutoComplete>
//             )}
//           </Form.Item>
//           <Form.Item>
//             <Checkbox
//               checked={manualResidenceAddressInput}
//               onChange={handleManualResidenceAddressCheckbox}
//             >
//               Ввести адрес по полям вручную
//             </Checkbox>
//           </Form.Item>
//         </>
//       )} */}

//       {/* _______Если адрес совпадает_______ */}

//       {!isAddressSame && (
//         <>
//           {manualResidenceAddressInput ? (
//             // Тут используем поля для ручного ввода адреса проживания
//             manualResidenceAddressFields
//           ) : (
//             <Form.Item
//               label="Адрес проживания"
//               name="livingAddress"
//               rules={[
//                 {
//                   required: true,
//                   message: "Введите город, улицу, номер дома и квартиру",
//                 },
//                 { validator: validateAddress },
//               ]}
//             >
//               <AutoComplete
//                 options={addressOptions.map((option) => ({
//                   ...option,
//                   label: (
//                     <div style={{ whiteSpace: "normal" }}>{option.label}</div>
//                   ),
//                 }))}
//                 onSelect={onSelect}
//                 onSearch={onSearch}
//                 popupMatchSelectWidth={true}
//                 style={{ width: "100%" }}
//               >
//                 <TextArea
//                   placeholder="Начните вводить"
//                   style={{
//                     height: 60,
//                   }}
//                 />
//               </AutoComplete>
//             </Form.Item>
//           )}

//           <Form.Item>
//             <Checkbox
//               checked={manualResidenceAddressInput}
//               onChange={handleManualResidenceAddressCheckbox}
//             >
//               Ввести адрес проживания по полям вручную
//             </Checkbox>
//           </Form.Item>
//         </>
//       )}

//       <Divider orientation="center">Другое</Divider>

//       {/* _______Телефон_______ */}
//       <Form.Item
//         label="Мобильный номер телефона"
//         name="phone"
//         rules={[{ required: true, message: "Введите номер телефона" }]}
//       >
//         <Input
//           onChange={handlePhoneChange}
//           placeholder="Начните вводить номер с цифры 7..."
//           maxLength={18}
//         />
//       </Form.Item>

//       {/* _______Почта_______ */}
//       <Form.Item
//         label="Адрес электронной почты"
//         name="email"
//         rules={[
//           { required: true, message: "Введите email" },
//           {
//             type: "email",
//             message: "Пожалуйста, введите корректный email",
//           },
//         ]}
//       >
//         <Input onChange={handleEmailChange} placeholder="ivanov@yandex.ru" />
//       </Form.Item>

//       {/* _______Кнопка отправки формы_______ */}
//       <Form.Item>
//         <Button type="primary" onClick={() => form.submit()}>
//           Отправить
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// }

// import React, { useState, useEffect } from "react";

// import {
//   Flex,
//   Input,
//   Form,
//   Select,
//   AutoComplete,
//   Checkbox,
//   Button,
//   Divider,
//   message,
// } from "antd";
// import useAuth from "../../../stores/./useAuth";
// import useRegistration from "../../.././stores/useRegistration";

// import { formItemLayout } from "../../.././components/configSizeForm";
// import TextArea from "antd/es/input/TextArea";
// import useSubjects from "../../../stores/Cabinet/useSubjects";
// import Uploader from "../../../components/FormComponents/Uploader";
// // import TextInput from "../../../components/FormComponents/TextInput"; ниже пробовал

// const { Option } = Select;

// export default function ModalFizLica({ onSubmit, setShowModalAdd }) {
//   const [documentType, setDocumentType] = useState("passport");
//   const [searchText] = useState("");
//   const [manualAddressInput, setManualAddressInput] = useState(false);
//   const [registrationAddress] = useState("");
//   const [isAddressSame, setIsAddressSame] = useState(false);
//   const [residenceAddress, setResidenceAddress] = useState(""); // я х.з почему, но без residenceAddress всё крашится

//   const [manualResidenceAddressInput, setManualResidenceAddressInput] =
//     useState(false);
//   const [kodPodrazdelenia, setKodPodrazdelenia] = useState("");
//   const [fileList, setFileList] = useState([]);
//   const [selectedRegistrationAddress, setSelectedRegistrationAddress] =
//     useState("");

//   const [form] = Form.useForm();
//   const {
//     submitNewSubject,
//     addressOptions,
//     setSearchText,
//     debouncedFetchAddresses,
//     validateSnils,
//   } = useSubjects();

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

//   // Изменяет тип документа в зависимости от выбора пользователя
//   const onDocumentTypeChange = (value) => {
//     setDocumentType(value);
//   };

//   // Устанавливает ручной ввод адреса
//   const handleManualAddressCheckbox = (e) => {
//     setManualAddressInput(e.target.checked);
//   };

//   // Состояние авторизации пользователя
//   const authState = useAuth((state) => ({
//     phone: state.phone,
//     email: state.email,
//   }));

//   // Состояние регистрации пользователя
//   const registrationState = useRegistration((state) => ({
//     phone: state.phone,
//     email: state.email,
//   }));

//   const handlePhoneChange = (e) => {
//     let value = e.target.value.replace(/\D/g, "");
//     value = value.replace(
//       /^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2}).*/,
//       "+$1 ($2) $3-$4-$5"
//     );
//     value = value.substring(0, 18);
//     form.setFieldsValue({ phone: value });
//   };

//   const handleEmailChange = (e) => {
//     console.log("Новый email:", e.target.value);
//   };

//   // Устанавливает адрес проживания, если он совпадает с адресом регистрации
//   const handleAddressCheckboxChange = (e) => {
//     const isChecked = e.target.checked;
//     setIsAddressSame(isChecked);
//     if (isChecked) {
//       setResidenceAddress(registrationAddress);
//     } else {
//       setResidenceAddress("");
//     }
//   };

//   // Обрабатывает изменения в коде подразделения, форматируя его
//   const handleKodPodrazdeleniaChange = (e) => {
//     const { value } = e.target;
//     const onlyNums = value.replace(/[^\d]/g, "");
//     let formattedKod = "";

//     if (onlyNums.length <= 3) {
//       formattedKod = onlyNums;
//     } else if (onlyNums.length > 3 && onlyNums.length <= 6) {
//       formattedKod = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
//     }
//     setKodPodrazdelenia(formattedKod);
//   };

//   // Устанавливает адрес, выбранный из списка
//   const onSelect = (value, option) => {
//     setSelectedRegistrationAddress(option.value);
//   };

//   // Валидирует адрес, убеждаясь, что он был выбран из списка :)
//   const validateAddress = (rule, value) => {
//     if (selectedRegistrationAddress === value) {
//       return Promise.resolve();
//     }
//     return Promise.reject("Выберите адрес из списка");
//   };

//   useEffect(() => {
//     debouncedFetchAddresses(searchText);
//   }, [searchText, debouncedFetchAddresses]);

//   // Обрабатывает изменения в поле поиска адреса
//   const onSearch = (searchText) => {
//     setSearchText(searchText);
//     debouncedFetchAddresses(searchText);
//   };

//   // Включает или выключает ручной ввод адреса проживания
//   const handleManualResidenceAddressCheckbox = (e) => {
//     setManualResidenceAddressInput(e.target.checked);
//   };

//   const userPhone = authState.phone || registrationState.phone;
//   const userEmail = authState.email || registrationState.email;

//   return (
//     <Form
//       form={form}
//       {...formItemLayout}
//       onFinish={onFinish}
//       initialValues={{
//         phone: userPhone,
//         email: userEmail,
//         typedocuments: "passport",
//       }}
//     >
//       <Divider orientation="center">ФИО</Divider>

//       {/* Пробовал тут зауниверсалить через TextInput */}
//       {/* <Form.Item
//         name="lastname"
//         rules={[
//           {
//             required: true,
//             message: "Пожалуйста, введите вашу фамилию",
//           },
//         ]}
//       >
//         <TextInput
//           displayName="Фамилия"
//           name="lastname"
//           shortDescription="Введите вашу фамилию"
//           required={true}
//         />
//       </Form.Item>

//       <Form.Item
//         name="firstname"
//         rules={[
//           {
//             required: true,
//             message: "Пожалуйста, введите ваше имя",
//           },
//         ]}
//       >
//         <TextInput
//           displayName="Имя"
//           name="firstname"
//           shortDescription="Введите ваше имя"
//           required={true}
//         />
//       </Form.Item>

//       <Form.Item name="secondname">
//         <TextInput
//           displayName="Отчество"
//           name="secondname"
//           shortDescription="Введите ваше отчество"
//           required={false}
//         />
//       </Form.Item> */}

//       {/* _______Фамилия_______ */}
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

//       {/* _______Имя_______ */}
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

//       {/* _______Отчество_______ */}
//       <Form.Item label="Отчество" name="secondname">
//         <Input placeholder="Иванович" />
//       </Form.Item>

//       <Divider orientation="center">Подтверждающий документ</Divider>

//       {/* _______Тип подтверждающего документа_______ */}
//       <Form.Item label="Тип документа" name="typedocuments">
//         <Select onChange={onDocumentTypeChange}>
//           <Option value="passport">Паспорт гражданина РФ</Option>
//           <Option value="other">Иной документ</Option>
//         </Select>
//       </Form.Item>

//       {/* _______Паспорт_______ */}
//       {documentType === "passport" && (
//         <>
//           <Flex gap="middle" vertical>
//             {/* _______Серия паспорта_______ */}
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

//             {/* _______Номер паспорта_______ */}
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

//             {/* _______Код подразделения_______ */}
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

//             {/* _______Кем выдан_______ */}
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

//       {/* _______Иной документ_______ */}
//       {documentType === "other" && (
//         <>
//           {/* _______Тип документа_______ */}
//           <Form.Item label="Тип документа">
//             <Select>
//               <Option value="type1">Тип1</Option>
//               <Option value="type2">Тип2</Option>
//             </Select>
//           </Form.Item>

//           {/* _______Реквизиты документа_______ */}
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

//       {/* _______Загрузка_______ */}
//       <Uploader
//         fileList={fileList}
//         onChange={({ fileList: newFileList }) => setFileList(newFileList)}
//       />

//       <Divider orientation="center">СНИЛС</Divider>

//       {/* _______СНИЛС_______ */}
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

//       {/* _______Место регистрации_______ */}
//       <Form.Item
//         label="Адрес"
//         name={"registration"}
//         rules={[
//           {
//             required: true,
//             message: "Пожалуйста, введите адрес регистрации",
//           },
//           { validator: validateAddress },
//         ]}
//       >
//         {manualAddressInput ? (
//           <Input />
//         ) : (
//           <AutoComplete
//             options={addressOptions.map((option) => ({
//               ...option,
//               label: <div style={{ whiteSpace: "normal" }}>{option.label}</div>,
//             }))}
//             onSelect={onSelect}
//             onSearch={onSearch}
//             popupMatchSelectWidth={true}
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

//       {/* _______Чекбокс ручного ввода_______ */}
//       <Form.Item>
//         <Checkbox
//           checked={manualAddressInput}
//           onChange={handleManualAddressCheckbox}
//         >
//           Ввести адрес по полям вручную
//         </Checkbox>
//       </Form.Item>

//       <Divider orientation="center">Место проживания</Divider>

//       {/* _______Чекбокс совпадения адреса_______ */}
//       <Form.Item>
//         <Checkbox
//           checked={isAddressSame}
//           onChange={handleAddressCheckboxChange}
//         >
//           Совпадает с адресом по месту регистрации
//         </Checkbox>
//       </Form.Item>

//       {/* _______Если адрес совпадает_______ */}
//       {!isAddressSame && (
//         <>
//           <Form.Item
//             label="Адрес"
//             name="livingadres"
//             rules={[
//               {
//                 required: true,
//                 message: "Введите город, улицу, номер дома и квартиру",
//               },
//               { validator: validateAddress },
//             ]}
//           >
//             {manualAddressInput ? (
//               <Input />
//             ) : (
//               <AutoComplete
//                 options={addressOptions.map((option) => ({
//                   ...option,
//                   label: (
//                     <div style={{ whiteSpace: "normal" }}>{option.label}</div>
//                   ),
//                 }))}
//                 onSelect={onSelect}
//                 onSearch={onSearch}
//                 popupMatchSelectWidth={true}
//                 style={{ width: "100%" }}
//               >
//                 <TextArea
//                   placeholder="Начните вводить"
//                   style={{
//                     height: 60,
//                   }}
//                 />
//               </AutoComplete>
//             )}
//           </Form.Item>
//           <Form.Item>
//             <Checkbox
//               checked={manualResidenceAddressInput}
//               onChange={handleManualResidenceAddressCheckbox}
//             >
//               Ввести адрес по полям вручную
//             </Checkbox>
//           </Form.Item>
//         </>
//       )}

//       <Divider orientation="center">Другое</Divider>

//       {/* _______Телефон_______ */}
//       <Form.Item
//         label="Мобильный номер телефона"
//         name="phone"
//         rules={[{ required: true, message: "Введите номер телефона" }]}
//       >
//         <Input
//           onChange={handlePhoneChange}
//           placeholder="Начните вводить номер с цифры 7..."
//           maxLength={18}
//         />
//       </Form.Item>

//       {/* _______Почта_______ */}
//       <Form.Item
//         label="Адрес электронной почты"
//         name="email"
//         rules={[
//           { required: true, message: "Введите email" },
//           {
//             type: "email",
//             message: "Пожалуйста, введите корректный email",
//           },
//         ]}
//       >
//         <Input onChange={handleEmailChange} placeholder="ivanov@yandex.ru" />
//       </Form.Item>

//       {/* _______Кнопка отправки формы_______ */}
//       <Form.Item>
//         <Button type="primary" onClick={() => form.submit()}>
//           Отправить
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// }
