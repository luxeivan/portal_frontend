import { Button, Form, Typography, Input } from "antd";
const { Paragraph } = Typography;

const EmailVerification = () => {

  return (
    <div>
      <Form>
      <Paragraph> Укажите электронную почту в формате **********@mail.ru. У вас должен быть постоянный доступ к почте.</Paragraph>
      <Form.Item
          label="Почта"
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
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
            Получить код
          </Button>
        </Form>
    </div>
  );
};

export default EmailVerification;