import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Space, Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { formItemLayout } from "../configSizeForm";

const CadastralNumberInput = ({ name, read, value }) => {
  const form = Form.useFormInstance();
  const [isCadastralNumberAbsent, setIsCadastralNumberAbsent] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsCadastralNumberAbsent(e.target.checked);
  };
  console.log(value)

  return (
    <>
      <Form.Item>
        <Checkbox
          checked={isCadastralNumberAbsent}
          onChange={handleCheckboxChange}
          style={{ marginBottom: "10px" }}
        >
          Кадастровый номер отсутствует
        </Checkbox>
      </Form.Item >

      {!isCadastralNumberAbsent && !read && (
        <Form.List name={name} {...formItemLayout}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, }, index) => (
                <>
                  <Form.Item
                    label={'Номер'}
                    name={name}

                  >
                    <Input placeholder="Кадастровый номер" suffix={<MinusCircleOutlined style={{ color: "red" }} onClick={() => remove(name)} />} />
                  </Form.Item>


                </>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Добавить номер
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      )
      }

      {
        read && (
          <Typography.Text>
            {value && value.map((item, index) => (
              <div key={index}>{item !== null ? item : ''}</div>
            ))}
          </Typography.Text>
        )
      }
    </>
  );
};

export default CadastralNumberInput;

