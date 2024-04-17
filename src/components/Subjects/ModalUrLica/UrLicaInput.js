import React, { useCallback, useState } from "react";
import { Form, Input, Button, Divider, Typography } from "antd";
import axios from "axios";
import config from "../../../config";

export default function UrLicaInput() {
  const [form] = Form.useForm();

  //5032137342 - ИНН МосОблЭнерго
  //7704217370 - ИНН Озон
  const onFinish = async (values) => {
    console.log("Отправленные данные ИНН:", values);
    try {
      const response = await axios.get(
        `${config.backServer}/api/cabinet/get-inn/?searchString=5032137342`,
        {
          params: { searchString: values.inn },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      if (response.data && response.data.suggestions) {
        console.log("Данные организации:", response.data.suggestions);
      } else {
        console.log("Нет данных организации для данного ИНН");
      }
    } catch (error) {
      console.error("Ошибка при получении информации об организации:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Ошибка при отправке формы:", errorInfo);
  };

  return (
    <>
      <Divider orientation="center">ИНН</Divider>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          name="inn"
          label="ИНН"
          rules={[{ required: true, message: "Пожалуйста, введите ИНН" }]}
        >
          <Input maxLength={12} placeholder="Введите ИНН" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Проверить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

// //Для удобства, пока что этот компонент тут, но потом его можно перенсти
// import React, { useCallback, useState } from "react";
// import { Form, Input, Button, Divider } from "antd";
// import axios from "axios";
// import { debounce } from "lodash";
// import config from "../../../config";

// export default function UrLicaInput() {
//   const [form] = Form.useForm();
//   const [searchInn, setsearchInn] = useState("");
//   const [innOptions, setinnOptions] = useState([]);

//   const onFinish = (values) => {
//     console.log("Отправленные данные ИНН:", values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Ошибка при отправке формы:", errorInfo);
//   };

//   //5032137342 - ИНН МосОблЭнерго
//   const axiosInn = async (searchInn) => {
//     if (!searchInn) {
//       setinnOptions([]);
//       return;
//     }
//     try {
//       const response = await axios.get(
//         `${config.backServer}/api/cabinet/get-inn/?searchString=5032137342`,
//         {
//           params: { searchString: searchInn },
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//         }
//       );
//       if (response.status === 200) {
//         const preparingData = response.data.data.map((item) => ({
//           label: (
//             <Typography.Text style={{ width: "100%", whiteSpace: "normal" }}>
//               {item.value}
//             </Typography.Text>
//           ),
//           value: item.value,
//           fias_id: item.data.fias_id,
//         }));
//         setinnOptions(preparingData);
//       } else {
//         setinnOptions([]);
//       }
//     } catch (error) {
//       console.error("Ошибка при получении адресов:", error);
//       setinnOptions([]);
//     }
//   };

//   const debouncedaxiosInn = useCallback(debounce(axiosInn, 800), []);

//   const onSearch = (searchInn) => {
//     setsearchInn(searchInn);
//     debouncedaxiosInn(searchInn);
//   };

//   return (
//     <>
//       <Divider orientation="center">ИНН</Divider>
//       <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
//         <Form.Item name="inn" label="ИНН">
//           <Input maxLength={12} placeholder="Введите ваш ИНН" />
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
