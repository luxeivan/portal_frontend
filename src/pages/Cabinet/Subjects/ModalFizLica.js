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
  Divider,
  message,
  Typography,
} from "antd";

import useAuth from "../../../stores/./useAuth";
import useRegistration from "../../.././stores/useRegistration";

import { formItemLayout } from "../../.././components/configSizeForm";
import { debounce } from "lodash";
import TextArea from "antd/es/input/TextArea";
import useSubjects from "../../../stores/Cabinet/useSubjects";
import Uploader from "../../../components/FormComponents/Uploader";
// import TextInput from "../../../components/FormComponents/TextInput"; ниже пробовал

const { Option } = Select;

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
  const [fileList, setFileList] = useState([]);
  const [selectedRegistrationAddress, setSelectedRegistrationAddress] =
    useState("");

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

  // Изменяет тип документа в зависимости от выбора пользователя
  const onDocumentTypeChange = (value) => {
    setDocumentType(value);
  };

  // Устанавливает ручной ввод адреса
  const handleManualAddressCheckbox = (e) => {
    setManualAddressInput(e.target.checked);
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

  // Обрабатывает изменения в поле ввода телефона
  const handlePhoneChange = (e) => {
    console.log("Новый номер телефона:", e.target.value);
  };

  // Обрабатывает изменения в поле ввода электронной почты
  const handleEmailChange = (e) => {
    console.log("Новый email:", e.target.value);
  };

  // Устанавливает адрес проживания, если он совпадает с адресом регистрации
  const handleAddressCheckboxChange = (e) => {
    setIsAddressSame(e.target.checked);
    if (e.target.checked) {
      setResidenceAddress(registrationAddress);
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

  // Задерживает запросы к API для получения адресов, пока пользователь пишет
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

  // Обрабатывает изменения в поле поиска адреса
  const onSearch = useCallback((searchText) => {
    setSearchText(searchText);
  }, []);

  // Включает или выключает ручной ввод адреса проживания
  const handleManualResidenceAddressCheckbox = (e) => {
    setManualResidenceAddressInput(e.target.checked);
  };

  // Валидирует СНИЛС
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
      {/* <Form.Item
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
      </Form.Item> */}

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
      {!isAddressSame && (
        <>
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
      )}

      <Divider orientation="center">Другое</Divider>

      {/* _______Телефон_______ */}
      <Form.Item
        label="Мобильный номер телефона"
        name="phone"
        rules={[{ required: true, message: "Введите номер телефона" }]}
      >
        <Input onChange={handlePhoneChange} placeholder="+7 (123) 456-78-90" />
      </Form.Item>

      {/* _______Почта_______ */}
      <Form.Item
        label="Адрес электронной почты"
        name="email"
        rules={[{ required: true, message: "Введите email" }]}
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
