import React from 'react';
import { AutoComplete, Button, Flex, Form, Input, InputNumber, message, Space, Typography } from 'antd';
import TextInput from './formComponents/TextInput';
import SelectInput from './formComponents/SelectInput';
import SwitchInput from './formComponents/SwitchInput';
import SliderInput from './formComponents/SliderInput';
import DividerForm from './formComponents/DividerForm';
import NumberInput from './formComponents/NumberInput';
import CoordinateInput from './formComponents/CoordinateInput';
import AddressInput from './formComponents/adressComponents/AddressInput';
import useStore from '../store/useStore';
// import formJson from './Form.json'

const FormMain = () => {
  const formJson = useStore(state=>state.json)
  const [form] = Form.useForm();
  const onFinish = (event) => {
    message.success('JSON вывелся в консоль');
    console.log(event)
    // form.resetFields()
  };

  const onFinishFailed = () => {
    message.error('Ошибка отправки формы');
  };
  return (
    <>
        <Typography.Title level={3} style={{textAlign:"center"}}>Наивысшая форма</Typography.Title>
      <Form
        style={{ border: "1px solid lightgray", padding: "20px", borderRadius: "10px" }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelAlign="right"
        labelWrap
      >
        {Array.isArray(formJson)&&formJson.map((item, index) => {
          if (item.type === 'divider') {
            return <DividerForm key={index} {...item} />
          }
          if (item.type === 'textInput') {
            return <TextInput key={index} {...item} />
          }
          if (item.type === 'numberInput') {
            return <NumberInput key={index} {...item} />
          }
          if (item.type === 'switchInput') {
            return <SwitchInput key={index} {...item} />
          }
          if (item.type === 'selectInput') {
            return <SelectInput key={index} {...item} />
          }
          if (item.type === 'sliderInput') {
            return <SliderInput key={index} {...item} />
          }
          if (item.type === 'сoordinateInput') {
            return <CoordinateInput key={index} {...item} />
          }
          if (item.type === 'autoCompleteInput') {
            return <AddressInput key={index} {...item} />
          }

        })}


        <Form.Item wrapperCol={16}>
          <Space>
            <Button type="primary" htmlType="submit">
              Отправить
            </Button>
            <Button onClick={() => { form.setFieldsValue({ Фамилия: "Петров", Имя: "Петр", Отчество: "Петрович", Пол: "male" }) }}>
              Заполнить
            </Button>
            <Button danger onClick={() => { form.resetFields() }}>
              Очистить
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
export default FormMain;