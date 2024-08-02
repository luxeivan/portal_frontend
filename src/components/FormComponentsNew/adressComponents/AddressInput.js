import React, { useState } from "react";
import { AutoComplete, Form, Button } from "antd";
import debounce from "lodash/debounce";
import axios from "axios";
import AddressModal from "./AddressModal";
import fieldConfig from "./AddressInput.json";

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

const AddressInput = ({
  name = "name",
  label = "Label",
  placeholder = "Введите полный адрес или его части",
}) => {
  const form = Form.useFormInstance();
  const [options, setOptions] = useState([]);
  const [address, setAddress] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

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
      .get(`${backServer}/getDaData`, { params })
      .then((response) => {
        if (response.data && response.data.data) {
          setOptions(
            response.data.data.map((item) => ({
              value: item.value,
              data: item.data,
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
  const onSelect = (data, option) => {
    setAddress(option.data);
    form.setFieldsValue({ [name]: data });
    setOptions([]);
  };

  // Обновление адреса и формирование строки полного адреса
  const updateAddress = (newData) => {
    const updatedAddress = { ...address, ...newData };
    setAddress(updatedAddress);

    const formattedAddress = Object.entries(updatedAddress)
      .filter(([key, value]) => value)
      .map(([key, value]) => {
        const field = fieldConfig.find((f) => f.name === key);
        return field ? `${field.label}: ${value}` : `${key}: ${value}`;
      })
      .join(", ");

    form.setFieldsValue({ [name]: formattedAddress });
  };

  // Открытие модального окна
  const openModal = () => setModalVisible(true);

  // Сохранение данных из модального окна
  const handleModalSave = (values) => {
    updateAddress(values);
    setModalVisible(false);
  };

  return (
    <>
      <Form.Item
        name={name}
        label={label}
        rules={[{ required: true, message: "Это поле обязательное" }]}
      >
        <AutoComplete
          options={options}
          onSelect={(value, option) => onSelect(value, option)}
          onSearch={(text) => fetchSuggestions(text, "АдресПолный")}
          placeholder={placeholder}
        />
      </Form.Item>
      <Button type="primary" onClick={openModal}>
        Моего адреса нет в списке
      </Button>
      <AddressModal
        visible={modalVisible}
        onSave={handleModalSave}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
};

export default AddressInput;

// import React, { useState } from "react";
// import { AutoComplete, Form, Button } from "antd";
// import debounce from "lodash/debounce";
// import axios from "axios";
// import AddressModal from "./AddressModal"; // Не забудь добавить импорт AddressModal

// const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

// const AddressInput = ({
//   name = "name",
//   label = "Label",
//   placeholder = "Введите полный адрес или его части",
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
//   const onSelect = (data, option) => {
//     setAddress(option.data);
//     form.setFieldsValue({ [name]: data });
//     setOptions([]);
//   };

//   // Обновление адреса и формирование строки полного адреса
//   const updateAddress = (newData) => {
//     const updatedAddress = { ...address, ...newData };
//     setAddress(updatedAddress);

//     const formattedAddress = Object.entries(updatedAddress)
//       .filter(([key, value]) => value)
//       .map(([key, value]) => `${key}: ${value}`)
//       .join(", ");

//     form.setFieldsValue({ [name]: formattedAddress });
//   };

//   // Открытие модального окна
//   const openModal = () => setModalVisible(true);

//   // Сохранение данных из модального окна
//   const handleModalSave = (values) => {
//     updateAddress(values);
//     setModalVisible(false);
//   };

//   return (
//     <>
//       <Form.Item
//         name={name}
//         label={label}
//         rules={[{ required: true, message: "Это поле обязательное" }]}
//       >
//         <AutoComplete
//           options={options}
//           onSelect={(value, option) => onSelect(value, option)}
//           onSearch={(text) => fetchSuggestions(text, "АдресПолный")}
//           placeholder={placeholder}
//         />
//       </Form.Item>
//       <Button type="primary" onClick={openModal}>
//         Моего адреса нет в списке
//       </Button>
//       <AddressModal
//         visible={modalVisible}
//         onSave={handleModalSave}
//         onCancel={() => setModalVisible(false)}
//       />
//     </>
//   );
// };

// export default AddressInput;
