import React, { useState, useCallback, useEffect } from "react";
import { Form, AutoComplete, Typography } from "antd";
import { debounce } from "lodash";
import axios from "axios";
import config from "../../config";

export default function NameObjectInput({ read, value, name, displayName }) {
  const [options, setOptions] = useState([]);
  const [listName, setListName] = useState([]);
  const [arrayName, setArrayName] = useState([]);
  useEffect(() => {
    axios.get(`${config.apiServer}/api/naimenovanie-obektovs`).then((res) => {
      if (res.data.data) {
        // console.log(res.data)
        setArrayName(
          res.data.data.map((item, index) => ({
            value: item.attributes.name,
            key: index,
          }))
        );
        setListName(
          res.data.data.map((item, index) => ({
            value: item.attributes.name,
            key: index,
          }))
        );
      }
    });
  }, []);

  // Моковые данные для автокомплита
  const mockData = [
    { value: "Объект 1", key: "1" },
    { value: "Объект 2", key: "2" },
    { value: "Объект 3", key: "3" },
  ];

  // Функция для поиска по моковым данным (простой фильтр)
  const fetchNames = (searchText) => {
    const filteredOptions = mockData.filter((option) =>
      option.value.toLowerCase().includes(searchText.toLowerCase())
    );
    setOptions(filteredOptions);
  };

  // Debounced версия fetchNames
  const debouncedFetchNames = useCallback(debounce(fetchNames, 300), []);

  const onSearch = (searchText) => {
    // debouncedFetchNames(searchText);
    if (searchText === "") {
      return setListName(arrayName);
    }
    setListName(
      arrayName.filter((item) => {
        return item.value.toLowerCase().includes(searchText.toLowerCase());
      })
    );
  };

  return (
    <Form.Item label={displayName} name={name}>
      {!read && (
        <AutoComplete
          options={listName}
          onSearch={onSearch}
          style={{ width: "100%" }}
          placeholder="Введите наименование объекта"
        />
      )}
      {read && <Typography.Text>{value}</Typography.Text>}
    </Form.Item>
  );
}
