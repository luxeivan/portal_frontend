import React, { useState } from "react";
import { Button, Form, Typography } from "antd";
import useRegistration from "../../../../stores/useRegistration";

const { Paragraph } = Typography;

const EmailVerification = () => {

  return (
    <div>
      <Form>
        <Paragraph>
        Укажите электронную почту в формате **********@mail.ru. У вас должен быть постоянный доступ к почте.
        </Paragraph>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Это поле обязательно",
            },
            {
              type: "email",
              message: "Пожалуйста, введите корректный email",
            },
          ]}
        >
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Получить код
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EmailVerification;