import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Space } from "antd";

const CadastralNumberInput = ({ form }) => {
  const [inputList, setInputList] = useState([{ value: "" }]);
  const [isCadastralNumberAbsent, setIsCadastralNumberAbsent] = useState(false);

  // Функция для обработки изменения поля кадастрового номера
  const handleInputChange = (e, index) => {
    const list = [...inputList];
    list[index].value = e.target.value;  // Просто сохраняем введённые данные без изменений
    setInputList(list);
  };

  // Функция для добавления нового поля кадастрового номера
  const handleAddClick = () => {
    setInputList([...inputList, { value: "" }]);
  };

  // Функция для удаления поля кадастрового номера
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // Функция для переключения чекбокса "Кадастровый номер отсутствует"
  const handleCheckboxChange = (e) => {
    setIsCadastralNumberAbsent(e.target.checked);
  };

  return (
    <Form.Item label="Кадастровые номера">
      <Checkbox
        checked={isCadastralNumberAbsent}
        onChange={handleCheckboxChange}
        style={{ marginBottom: "10px" }}
      >
        Кадастровый номер отсутствует
      </Checkbox>

      {!isCadastralNumberAbsent && (
        <Space direction="vertical" style={{ width: "100%" }}>
          {inputList.map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Input
                placeholder="Введите кадастровый номер"
                value={item.value}
                onChange={(e) => handleInputChange(e, index)}
                style={{ width: "100%" }}
              />
              {inputList.length !== 1 && (
                <Button type="danger" onClick={() => handleRemoveClick(index)}>
                  Удалить
                </Button>
              )}
            </div>
          ))}
          {inputList.length < 5 && (
            <Button
              type="dashed"
              onClick={handleAddClick}
              style={{ width: "100%" }}
            >
              Добавить номер
            </Button>
          )}
        </Space>
      )}
    </Form.Item>
  );
};

export default CadastralNumberInput;


// import React, { useState } from "react";
// import { Form, Input, Button, Checkbox, Space } from "antd";

// const CadastralNumberInput = ({ form }) => {
//   const [inputList, setInputList] = useState([{ value: "" }]);
//   const [isCadastralNumberAbsent, setIsCadastralNumberAbsent] = useState(false);

//   // Функция для форматирования ввода кадастрового номера
//   const formatCadastralNumber = (value) => {
//     const numbers = value.replace(/[^0-9]/g, "");
//     let result = "";
//     for (let i = 0; i < numbers.length && i < 16; i++) {
//       result += numbers[i];
//       if (i === 1 || i === 3) {
//         result += ":";
//       } else if (i === 9 && numbers.length <= 13) {
//         result += ":";
//       } else if (i === 10 && numbers.length > 13) {
//         result += ":";
//       }
//     }
//     return result;
//   };

//   // Функция для обработки изменения поля кадастрового номера
//   const handleInputChange = (e, index) => {
//     const list = [...inputList];
//     list[index].value = formatCadastralNumber(e.target.value);
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

// кадастровые номера -  в виде поля ввода с маской кадастра
// и возможностью добавления нескольких
// (должна быть кнопка с плюсиком для добавления нескольких полей, можно пока ограничить пятью)
// и еще галочка "кадастровый номер отсутствует"
