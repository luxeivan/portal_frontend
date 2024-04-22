import React from "react";
import { Form, DatePicker, Typography, ConfigProvider } from "antd";
import moment from "moment";
import "moment/locale/ru";
import locale from "antd/es/locale/ru_RU";

moment.locale("ru");

const dateFormat = "DD.MM.YYYY";

const DateInput = ({
  name,
  displayName,
  placeholder,
  required = false,
  value,
  read = false,
}) => {
  const defaultValue =
    value && moment(value, dateFormat).isValid()
      ? moment(value, dateFormat)
      : null;

  return (
    <ConfigProvider locale={locale}>
      <Form.Item
        name={name}
        label={<Typography.Text>{displayName}</Typography.Text>}
        rules={[
          {
            required: required,
            message: `Пожалуйста, введите ${displayName.toLowerCase()}.`,
          },
        ]}
      >
        {read ? (
          <Typography.Text>
            {defaultValue ? defaultValue.format(dateFormat) : "Не указано"}
          </Typography.Text>
        ) : (
          <DatePicker
            format={dateFormat}
            placeholder={placeholder}
            style={{ width: "100%" }}
            defaultValue={defaultValue}
          />
        )}
      </Form.Item>
    </ConfigProvider>
  );
};

export default DateInput;
