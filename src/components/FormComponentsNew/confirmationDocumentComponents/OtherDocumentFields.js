import React from "react";
import { Form, Typography, DatePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import locale from "antd/locale/ru_RU";
import moment from "moment";
import TextInput from "../TextInput";

const OtherDocumentFields = ({
  form,
  read,
  value,
  name,
}) => {
  return (
    <>
      <TextInput
        displayName="Тип иного документа"
        read={read}
        edit={!read}
        value={value?.typeOtherDoc}
        name={[name, "typeOtherDoc"]}
        required={true}
        shortDescription="..."
        inputType="textarea"
      />
      <Form.Item
        label="Реквизиты документа"
        name={[name, "recvizityOthetDoc"]}
        required={read ? false : true}
      >
        {!read && (
          <TextArea
            placeholder="..."
            rows={2}
            defaultValue={value?.recvizityOthetDoc}
          />
        )}
        {read && (
          <Typography.Text>
            {" "}
            {value?.recvizityOthetDoc}
          </Typography.Text>
        )}
      </Form.Item>
      <Form.Item
        label="Кем выдан"
        name={[name, "kemVidanOthetDoc"]}
        required={read ? false : true}
      >
        {!read && (
          <TextArea
            defaultValue={value?.kemVidanOthetDoc}
            placeholder="..."
            style={{
              height: 60,
            }}
          />
        )}
        {read && (
          <Typography.Text>
            {value?.kemVidanOthetDoc}
          </Typography.Text>
        )}
      </Form.Item>
      <Form.Item
        label="Когда выдан"
        name={[name, "dateIssueOtherDoc"]}
        valuePropName="value"
        required={read ? false : true}
      >
        {!read && (
          <DatePicker
            defaultValue={
              value?.dateIssue
                ? moment(value?.dateIssue, "DD.MM.YYYY")
                : false
            }
            locale={locale.DatePicker}
            format="DD.MM.YYYY"
            style={{ width: "100%" }}
          />
        )}
        {read && (
          <Typography.Text>
            {value?.dateIssueOthetDoc}
          </Typography.Text>
        )}
      </Form.Item>
    </>
  );
};

export default OtherDocumentFields;
