import React, { useState, useCallback } from "react";
import { Form, AutoComplete, Typography } from "antd";
import { debounce } from "lodash";

export default function NameObjectInput({ read, value, name }) {
  const [options, setOptions] = useState([]);

  // Моковые данные для автокомплита
  const mockData = [
    { value: 'Объект 1', key: '1' },
    { value: 'Объект 2', key: '2' },
    { value: 'Объект 3', key: '3' }
  ];

  // Функция для поиска по моковым данным (простой фильтр)
  const fetchNames = (searchText) => {
    const filteredOptions = mockData.filter(option =>
      option.value.toLowerCase().includes(searchText.toLowerCase())
    );
    setOptions(filteredOptions);
  };

  // Debounced версия fetchNames
  const debouncedFetchNames = useCallback(
    debounce(fetchNames, 300),
    []
  );

  const onSearch = (searchText) => {
    debouncedFetchNames(searchText);
  };

  return (
    <Form.Item label="Наименование" name={name}>
      {!read && (
        <AutoComplete
          options={options}
          onSearch={onSearch}
          onSelect={(value, option) => console.log(`Selected: ${option.value}`)}
          style={{ width: "100%" }}
          placeholder="Введите наименование объекта"
        />
      )}
      {read && (
        <Typography.Text>{value}</Typography.Text>
      )}
    </Form.Item>
  );
}
