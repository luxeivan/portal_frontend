import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Space, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { formItemLayout } from "../configSizeForm";

const CadastralNumberInput = ({ name, read }) => {
  const form = Form.useFormInstance();
  const [inputList, setInputList] = useState([{ value: "" }]);
  const [isCadastralNumberAbsent, setIsCadastralNumberAbsent] = useState(false);

  const handleInputChange = (e, index) => {
    const list = [...inputList];
    list[index].value = e.target.value;
    setInputList(list);
    updateFormValues(list);
  };

  const handleAddClick = () => {
    const list = [...inputList, { value: "" }];
    setInputList(list);
    updateFormValues(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    updateFormValues(list);
  };

  const handleCheckboxChange = (e) => {
    setIsCadastralNumberAbsent(e.target.checked);
    if (e.target.checked) {
      form.setFieldsValue({ [name]: ["Тест"] });
    } else {
      updateFormValues(inputList);
    }
  };

  const updateFormValues = (list) => {
    const values = list.map((item) => item.value).filter((item) => item);
    form.setFieldsValue({ [name]: values });
  };

  return (
    <>
      <Form.Item>
        <Checkbox
          checked={isCadastralNumberAbsent}
          onChange={handleCheckboxChange}
          style={{ marginBottom: "10px" }}
        >
          Кадастровый номер отсутствует
        </Checkbox>
      </Form.Item >

      {!isCadastralNumberAbsent && !read && (
        <Form.List name={name} {...formItemLayout}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, }, index) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                  }}
                  align="baseline"
                >
                  <Form.Item 
                  label={'Номер'}
                  name={name}
                  >
                    <Input placeholder="Кадастровый номер" />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Добавить номер
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      )
      }

      {
        read && (
          <Typography.Text>
            {inputList.map((item, index) => (
              <div key={index}>{item.value}</div>
            ))}
          </Typography.Text>
        )
      }
    </>
  );
};

export default CadastralNumberInput;

// import React, { useState } from "react";
// import { Form, Input, Button, Checkbox, Space } from "antd";

// const CadastralNumberInput = ({ name, type, read, value }) => {
//   const form = Form.useFormInstance();
//   const [inputList, setInputList] = useState([{ value: "" }]);
//   const [isCadastralNumberAbsent, setIsCadastralNumberAbsent] = useState(false);

//   // Функция для обработки изменения поля кадастрового номера
//   const handleInputChange = (e, index) => {
//     const list = [...inputList];
//     list[index].value = e.target.value;  // Просто сохраняем введённые данные без изменений
//     setInputList(list);
//   };

//   // Функция для добавления нового поля кадастрового номера
//   const handleAddClick = () => {
//     setInputList([...inputList, { value: "" }]);
//   };

//   // Функция для удаления поля кадастрового номера
//   const handleRemoveClick = (index) => {
//     const list = [...inputList];
//     list.splice(index, 1);
//     setInputList(list);
//   };

//   // Функция для переключения чекбокса "Кадастровый номер отсутствует"
//   const handleCheckboxChange = (e) => {
//     setIsCadastralNumberAbsent(e.target.checked);
//   };

//   return (
//     <Form.Item label="Кадастровые номера">
//       <Checkbox
//         checked={isCadastralNumberAbsent}
//         onChange={handleCheckboxChange}
//         style={{ marginBottom: "10px" }}
//       >
//         Кадастровый номер отсутствует
//       </Checkbox>

//       {!isCadastralNumberAbsent && (
//         <Space direction="vertical" style={{ width: "100%" }}>
//           {inputList.map((item, index) => (
//             <div
//               key={index}
//               style={{ display: "flex", marginBottom: 8 }}
//               align="baseline"
//             >
//               <Input
//                 placeholder="Введите кадастровый номер"
//                 value={item.value}
//                 onChange={(e) => handleInputChange(e, index)}
//                 style={{ width: "100%" }}
//               />
//               {inputList.length !== 1 && (
//                 <Button type="danger" onClick={() => handleRemoveClick(index)}>
//                   Удалить
//                 </Button>
//               )}
//             </div>
//           ))}
//           {inputList.length < 5 && (
//             <Button
//               type="dashed"
//               onClick={handleAddClick}
//               style={{ width: "100%" }}
//             >
//               Добавить номер
//             </Button>
//           )}
//         </Space>
//       )}
//     </Form.Item>
//   );
// };

// export default CadastralNumberInput;

// import React, { useState } from "react";
// import { Form, Input, Button, Checkbox, Space } from "antd";

// const CadastralNumberInput = ({ form }) => {
//   const [inputList, setInputList] = useState([{ value: "" }]);
//   const [isCadastralNumberAbsent, setIsCadastralNumberAbsent] = useState(false);

//   // Функция для обработки изменения поля кадастрового номера
//   const handleInputChange = (e, index) => {
//     const list = [...inputList];
//     list[index].value = e.target.value;  // Просто сохраняем введённые данные без изменений
//     setInputList(list);
//   };

//   // Функция для добавления нового поля кадастрового номера
//   const handleAddClick = () => {
//     setInputList([...inputList, { value: "" }]);
//   };

//   // Функция для удаления поля кадастрового номера
//   const handleRemoveClick = (index) => {
//     const list = [...inputList];
//     list.splice(index, 1);
//     setInputList(list);
//   };

//   // Функция для переключения чекбокса "Кадастровый номер отсутствует"
//   const handleCheckboxChange = (e) => {
//     setIsCadastralNumberAbsent(e.target.checked);
//   };

//   return (
//     <Form.Item label="Кадастровые номера">
//       <Checkbox
//         checked={isCadastralNumberAbsent}
//         onChange={handleCheckboxChange}
//         style={{ marginBottom: "10px" }}
//       >
//         Кадастровый номер отсутствует
//       </Checkbox>

//       {!isCadastralNumberAbsent && (
//         <Space direction="vertical" style={{ width: "100%" }}>
//           {inputList.map((item, index) => (
//             <div
//               key={index}
//               style={{ display: "flex", marginBottom: 8 }}
//               align="baseline"
//             >
//               <Input
//                 placeholder="Введите кадастровый номер"
//                 value={item.value}
//                 onChange={(e) => handleInputChange(e, index)}
//                 style={{ width: "100%" }}
//               />
//               {inputList.length !== 1 && (
//                 <Button type="danger" onClick={() => handleRemoveClick(index)}>
//                   Удалить
//                 </Button>
//               )}
//             </div>
//           ))}
//           {inputList.length < 5 && (
//             <Button
//               type="dashed"
//               onClick={handleAddClick}
//               style={{ width: "100%" }}
//             >
//               Добавить номер
//             </Button>
//           )}
//         </Space>
//       )}
//     </Form.Item>
//   );
// };

// export default CadastralNumberInput;
