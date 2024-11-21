import React, { useState, useRef } from "react";
import { AutoComplete, Form, Button, Flex, Input, ConfigProvider, theme } from "antd";
import debounce from "lodash/debounce";
import axios from "axios";
import AddressModal from "./AddressModal";
import fieldConfig from "./AddressInput.json";
import { EditOutlined } from "@ant-design/icons";

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

const AddressInput = ({
  name = "name",
  label = "Label",
  disabled = false,
  placeholder = "Пример",
  required = false,
  dependOf = false,
  howDepend = false,
  inputMask = false,
  lenght = false,
  specialField: type = false,
}) => {
  const { colorBgSolid, colorPrimary, colorTextLightSolid } = theme.useToken().token
  // console.log(theme.useToken().token)
  const form = Form.useFormInstance();
  // let fieldDepends = Form.useWatch(dependOf, form)
  const [options, setOptions] = useState([]);
  const [address, setAddress] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const modalFormRef = useRef(null);

  // Функция для получения предложений
  const fetchSuggestions = debounce((text, type) => {
    const params = { type, query: text };

    if (type !== "Страна" && address.country)
      params.locations = [{ country_iso_code: address.country }];
    if (type !== "Регион" && address.region)
      params.locations = [{ region_fias_id: address.region }];
    if (type !== "Город" && address.city)
      params.locations = [{ city_fias_id: address.city }];

    axios
      .get(`${backServer}/api/cabinet/getDaData`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        withCredentials: true,
        params
      })
      .then((response) => {
        if (response.data && response.data.data) {
          console.log("response.data", response.data);
          setOptions(
            response.data.data.map((item) => ({
              label: item.value,
              value: item.unrestricted_value,
              data: item.data,
              // unrestricted_value: item.unrestricted_value,
            }))
          );
        } else {
          setOptions([]);
        }
      })
      .catch((error) => {
        console.error("Ошибка запроса к бэкенду:", error);
        setOptions([]);
      });
  }, 500);

  // Обработка выбора из списка предложений
  const onSelect = (value, option) => {
    const updatedAddress = { ...option.data };
    let updateObject = {}
    console.log(option)
    // Сохраняем полный адрес под капотом
    setAddress(updatedAddress);
    updateObject.fullAddress = value
    fieldConfig.forEach(field => {
      updateObject[field.name] = updatedAddress[field.name]
    })
    // Вставляем только текст подсказки в инпут
    form.setFieldValue(name, updateObject);

    // Обновляем значения формы модалки
    if (modalFormRef.current) {
      modalFormRef.current.setFieldsValue(updatedAddress);
    }

    setOptions([]);
  };

  // Открытие модального окна
  const openModal = () => {
    if (modalFormRef.current) {
      modalFormRef.current.setFieldsValue(address); // Обновляем значения в форме модалки
    }
    setModalVisible(true);
  };

  // Сохранение данных из модального окна
  const handleModalSave = (values) => {
    updateAddress(values);
    setModalVisible(false);
  };

  // Обновление адреса и формирование строки полного адреса
  const updateAddress = (newData) => {
    const updatedAddress = { ...address, ...newData };

    // Фильтруем и переводим на русский нужные поля
    const filteredAddress = {
      Индекс: updatedAddress.postal_code,
      Страна: updatedAddress.country,
      Регион: updatedAddress.region_with_type,
      Район: updatedAddress.area_with_type,
      Город: updatedAddress.city_with_type,
      Улица: updatedAddress.street_with_type,
      "Номер дома": updatedAddress.house,
    };

    setAddress(filteredAddress);

    const formattedAddress = Object.entries(filteredAddress)
      .filter(([key, value]) => value)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");

    form.setFieldValue(name, formattedAddress);
  };
  // console.log(fieldDepends)
  const formElement = (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          <Flex align="center"
          // wrap="wrap" 
          // style={{ maxWidth: "100%", marginBottom: 20 }} 
          >

            <Form.Item
              name={'fullAddress'}
              label={label}
              rules={[{ required: required, message: "Это поле обязательное" }]}
              style={{ flex: 1, minWidth: 300 }}
            >
              <AutoComplete
                options={options}
                onSelect={(value, option) => onSelect(value, option)}
                onSearch={(text) => fetchSuggestions(text, "АдресПолный")}
                placeholder={placeholder}
              >
                <Input.TextArea
                  // addonAfter={<EditOutlined onClick={openModal} />}
                  // placeholder={placeholder}
                />
              </AutoComplete>
            </Form.Item>
            <div style={{ cursor: "pointer", color: "green", padding: 5 }} onClick={openModal}>Заполнить</div>
            {/* <Button type="primary" onClick={openModal} >
              Моего адреса нет в списке
            </Button> */}
          </Flex>
          <AddressModal
            visible={modalVisible}
            onSave={handleModalSave}
            onCancel={() => setModalVisible(false)}
            name={name}
          />
        </>
      )}
    </Form.List>
  );

  // if (!dependOf) return formElement;
  // if (dependOf && howDepend && howDepend.options?.length > 0) {
  //   let show = false;
  //   if (typeof fieldDepends === "undefined") fieldDepends = false
  //   howDepend.options.forEach((item) => {
  //     if (item.value === "true") item.value = true;
  //     if (item.value === "false") item.value = false;
  //     if (item.value == fieldDepends) show = true;
  //   });
  //   if (show) return formElement;
  // }
  // if (dependOf && howDepend && howDepend.min && howDepend.max) {
  //   if (fieldDepends >= howDepend.min && howDepend.max) return formElement;
  // }
  return formElement
};

export default AddressInput;

//Старое
// import React, { useState } from "react";
// import { AutoComplete, Form, Button, Flex } from "antd";
// import debounce from "lodash/debounce";
// import axios from "axios";
// import AddressModal from "./AddressModal";

// const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

// const AddressInput = ({
//   name = "name",
//   label = "Label",
//   disabled = false,
//   placeholder = "Пример",
//   required = false,
//   dependOf = false,
//   howDepend = false,
//   inputMask = false,
//   lenght = false,
//   specialField: type = false,
// }) => {
//   const form = Form.useFormInstance();
//   const [options, setOptions] = useState([]);
//   const [address, setAddress] = useState({});
//   const [modalVisible, setModalVisible] = useState(false);

//   // Функция для получения предложений
//   const fetchSuggestions = debounce((text, type) => {
//     const params = { type, query: text };

//     if (type !== "Страна" && address.country)
//       params.locations = [{ country_iso_code: address.country }];
//     if (type !== "Регион" && address.region)
//       params.locations = [{ region_fias_id: address.region }];
//     if (type !== "Город" && address.city)
//       params.locations = [{ city_fias_id: address.city }];

//     axios
//       .get(`${backServer}/getDaData`, { params })
//       .then((response) => {
//         if (response.data && response.data.data) {
//           setOptions(
//             response.data.data.map((item) => ({
//               value: item.value,
//               data: item.data,
//             }))
//           );
//         } else {
//           setOptions([]);
//         }
//       })
//       .catch((error) => {
//         console.error("Ошибка запроса к бэкенду:", error);
//         setOptions([]);
//       });
//   }, 500);

//   // Обработка выбора из списка предложений
//   const onSelect = (value, option) => {
//     const updatedAddress = { ...option.data };

//     // Сохраняем полный адрес под капотом
//     setAddress(updatedAddress);

//     // Вставляем только текст подсказки в инпут
//     form.setFieldsValue({
//       [name]: value,
//       fullAddress: value,
//     });
//     setOptions([]);
//   };

//   // Открытие модального окна
//   const openModal = () => setModalVisible(true);

//   // Сохранение данных из модального окна
//   const handleModalSave = (values) => {
//     updateAddress(values);
//     setModalVisible(false);
//   };

//   // Обновление адреса и формирование строки полного адреса
//   const updateAddress = (newData) => {
//     const updatedAddress = { ...address, ...newData };

//     // Фильтруем и переводим на русский нужные поля
//     const filteredAddress = {
//       Индекс: updatedAddress.postal_code,
//       Страна: updatedAddress.country,
//       Регион: updatedAddress.region_with_type,
//       Район: updatedAddress.area_with_type,
//       Город: updatedAddress.city_with_type,
//       Улица: updatedAddress.street_with_type,
//       "Номер дома": updatedAddress.house,
//     };

//     setAddress(filteredAddress);

//     const formattedAddress = Object.entries(filteredAddress)
//       .filter(([key, value]) => value)
//       .map(([key, value]) => `${key}: ${value}`)
//       .join(", ");

//     form.setFieldsValue({ [name]: formattedAddress, ...filteredAddress });
//   };

//   return (
//     <>
//       <Flex align="center" gap={20}>
//         <Form.Item
//           name={name}
//           label={label}
//           rules={[{ required: required, message: "Это поле обязательное" }]}
//           style={{ flex: 1 }}
//         >
//           <AutoComplete
//             options={options}
//             onSelect={(value, option) => onSelect(value, option)}
//             onSearch={(text) => fetchSuggestions(text, "АдресПолный")}
//             placeholder={placeholder}
//           />
//         </Form.Item>
//         <Button type="primary" onClick={openModal}>
//           Моего адреса нет в списке
//         </Button>
//       </Flex>
//       <AddressModal
//         visible={modalVisible}
//         onSave={handleModalSave}
//         onCancel={() => setModalVisible(false)}
//         initialValues={address} // Передаем полный адрес в модалку
//       />
//     </>
//   );
// };

// export default AddressInput;
