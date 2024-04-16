import React from 'react';
import { Form, Input, DatePicker } from 'antd';

const OtherDocumentFormComponent = ({ form, initialValue }) => {
  return (
    <Form.Item shouldUpdate>
      <Form.Item
        name="typeOtherDoc"
        label="Тип иного документа"
        rules={[{ required: true, message: 'Введите тип иного документа' }]}
      >
        <Input.TextArea placeholder="Укажите тип документа" />
      </Form.Item>
      <Form.Item
        name="recvizityOtherDoc"
        label="Реквизиты иного документа"
        rules={[{ required: true, message: 'Введите реквизиты документа' }]}
      >
        <Input.TextArea placeholder="Укажите реквизиты документа" />
      </Form.Item>
      <Form.Item
        name="kemVidanOtherDoc"
        label="Кем выдан"
        rules={[{ required: true, message: 'Введите кем выдан документ' }]}
      >
        <Input.TextArea placeholder="Орган, выдавший документ" />
      </Form.Item>
      <Form.Item
        name="dateIssueOtherDoc"
        label="Когда выдан"
        rules={[{ required: true, message: 'Выберите дату выдачи документа' }]}
      >
        <DatePicker format="DD.MM.YYYY" />
      </Form.Item>
    </Form.Item>
  );
};

export default OtherDocumentFormComponent;
