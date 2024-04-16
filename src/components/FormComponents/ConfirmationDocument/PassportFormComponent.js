import React, { useState } from 'react';
import { Form, Input, DatePicker } from 'antd';
import moment from 'moment';

const PassportFormComponent = ({ form, initialValue }) => {
  const [kodPodrazdelenia, setKodPodrazdelenia] = useState(initialValue.kodPodrazdelenia || '');

  const handleKodPodrazdeleniaChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
    const formattedValue = value.replace(/(\d{3})(\d{1,3})/, '$1-$2');
    setKodPodrazdelenia(formattedValue);
  };

  return (
    <Form.Item shouldUpdate>
      <Form.Item
        name="serialPassport"
        label="Серия паспорта"
        rules={[{ required: true, message: 'Введите серию паспорта', len: 4 }]}
      >
        <Input maxLength={4} placeholder="1234" />
      </Form.Item>
      <Form.Item
        name="numberPassport"
        label="Номер паспорта"
        rules={[{ required: true, message: 'Введите номер паспорта', len: 6 }]}
      >
        <Input maxLength={6} placeholder="567890" />
      </Form.Item>
      <Form.Item
        name="kodPodrazdelenia"
        label="Код подразделения"
        rules={[
          { required: true, message: 'Введите код подразделения', pattern: /^\d{3}-\d{3}$/ }
        ]}
      >
        <Input
          value={kodPodrazdelenia}
          onChange={handleKodPodrazdeleniaChange}
          maxLength={7}
          placeholder="123-456"
        />
      </Form.Item>
      <Form.Item
        name="kemVidan"
        label="Кем выдан"
        rules={[{ required: true, message: 'Введите кем выдан паспорт' }]}
      >
        <Input.TextArea placeholder="Орган, выдавший паспорт" />
      </Form.Item>
      <Form.Item
        name="dateIssue"
        label="Когда выдан"
        rules={[{ required: true, message: 'Выберите дату выдачи паспорта' }]}
      >
        <DatePicker format="DD.MM.YYYY" />
      </Form.Item>
    </Form.Item>
  );
};

export default PassportFormComponent;
