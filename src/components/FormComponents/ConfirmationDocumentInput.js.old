import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Select, Typography } from 'antd';
import moment from 'moment';

const ConfirmationDocumentInput = ({
  form, name, displayName, required, depends, description, read, edit, value, documentTypes
}) => {
  const [documentType, setDocumentType] = useState(value?.typeDoc);

  useEffect(() => {
    if (value && value.typeDoc) {
      setDocumentType(value.typeDoc);
    }
  }, [value]);

  const onDocumentTypeChange = (newType) => {
    setDocumentType(newType);
  };

  const renderInput = (field) => {
    switch (field.type) {
      case 'textInput':
        return <Input {...field.inputProps} />;
      case 'datepicker':
        return <DatePicker {...field.inputProps} />;
      default:
        return null;
    }
  };

  const documentFields = documentTypes[documentType] || [];

  return (
    <>
      <Typography.Title level={4}>{displayName}</Typography.Title>
      {edit && (
        <Form.Item
          name={`${name}Type`}
          label="Тип документа"
          initialValue={value?.typeDoc}
          rules={[{ required, message: 'Пожалуйста, выберите тип документа' }]}
        >
          <Select onChange={onDocumentTypeChange} placeholder="Выберите тип">
            {depends.options.map(option => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
      {documentFields.map((field, index) => (
        <Form.Item
          key={index}
          name={field.name}
          label={field.displayName}
          initialValue={value[field.name]}
          rules={[{ required: field.required, message: field.description }]}
        >
          {renderInput(field)}
        </Form.Item>
      ))}
    </>
  );
};

export default ConfirmationDocumentInput;