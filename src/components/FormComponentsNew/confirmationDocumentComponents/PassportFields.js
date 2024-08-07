import React from "react";
import { Form, AutoComplete, Typography, DatePicker } from "antd";
import locale from "antd/locale/ru_RU";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import TextInput from "../TextInput";

const PassportFields = ({
  form,
  read,
  value,
  name,
  kemVidanOptions,
  handleSerialPassportChange,
  handleNumberPassportChange,
  handleKodPodrazdeleniaChange
}) => {
  return (
    <>
      <TextInput
        read={read}
        edit={!read}
        value={value?.serialPassport}
        displayName="Серия паспорта"
        name={[name, "serialPassport"]}
        required={true}
        placeholder={"XXXX"}
        description="1234"
        inputProps={{
          maxLength: 4,
          onChange: handleSerialPassportChange,
        }}
        rules={[
          {
            min: 4,
            message: "Не менее 4 цифр",
          },
        ]}
      />
      <TextInput
        read={read}
        edit={!read}
        value={value?.numberPassport}
        displayName="Номер паспорта"
        name={[name, "numberPassport"]}
        required={true}
        placeholder={"XXXXXX"}
        description="567890"
        inputProps={{
          maxLength: 6,
          onChange: handleNumberPassportChange,
        }}
        rules={[
          {
            min: 6,
            message: "Не менее 6 цифр",
          },
        ]}
      />
      <TextInput
        read={read}
        edit={!read}
        value={value?.kodPodrazdelenia}
        displayName="Код подразделения"
        name={[name, "kodPodrazdelenia"]}
        required={true}
        placeholder={"XXX-XXX"}
        shortDescription="123-456"
        inputProps={{
          maxLength: 7,
          onChange: handleKodPodrazdeleniaChange,
        }}
        rules={[
          {
            validator: (_, value) => {
              console.log(value);
              if (!value || /^\d{3}-\d{3}$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error(
                  "Формат кода подразделения должен быть 111-111"
                )
              );
            },
          },
        ]}
      />
      <Form.Item
        label="Кем выдан"
        name={[name, "kemVidan"]}
        required={read ? false : true}
      >
        {!read && (
          <AutoComplete
            defaultValue={value?.kemVidan}
            options={kemVidanOptions}
            style={{ width: "100%" }}
          >
            <TextArea
              placeholder="Наименование подразделения"
              style={{ height: 60 }}
            />
          </AutoComplete>
        )}
        {read && (
          <Typography.Text>{value?.kemVidan}</Typography.Text>
        )}
      </Form.Item>
      <Form.Item
        label="Когда выдан"
        name={[name, "dateIssue"]}
        required={read ? false : true}
      >
        {read && (
          <Typography.Text>
            {value?.dateIssue}
          </Typography.Text>
        )}
        {!read && (
          <DatePicker
            defaultValue={
              value?.dateIssue
                ? moment(value?.dateIssue, "DD.MM.YYYY")
                : false
            }
            required={true}
            format="DD.MM.YYYY"
            locale={locale.DatePicker}
            style={{ width: "100%" }}
          />
        )}
      </Form.Item>
    </>
  );
};

export default PassportFields;
