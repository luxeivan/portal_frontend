import React from "react";
import SelectInput from "../SelectInput";

const documentOptions = [
  { value: "Паспорт гражданина РФ", label: "Паспорт гражданина РФ" },
  { value: "Иной документ", label: "Иной документ" },
];

const SelectDocumentType = ({ read, edit, value, name }) => {
  return (
    <SelectInput
      read={read}
      edit={edit}
      value={value?.[name]?.typeDoc}
      displayName="Тип документа"
      name={[name, "typeDoc"]}
      description={["Выберите тип документа из списка"]}
      options={documentOptions}
    />
  );
};

export default SelectDocumentType;
