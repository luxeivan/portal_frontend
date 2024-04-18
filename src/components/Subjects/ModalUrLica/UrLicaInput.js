import { Form, Input, Button, Divider, Typography } from "antd";
import axios from "axios";
import config from "../../../config";

export default function UrLicaInput() {
  const [form] = Form.useForm();

  //5032137342 - ИНН МосОблЭнерго
  //7704217370 - ИНН Озон
  const onFinish = async (values) => {
    console.log("Отправленные данные ИНН:", values);
    try {
      const response = await axios.get(
        `${config.backServer}/api/cabinet/get-inn/`,
        {
          params: { searchString: values.inn },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log(response.data);
      if (response.data && response.data.suggestions) {
        console.log("Данные организации:", response.data.suggestions);
      } else {
        console.log("Нет данных организации для данного ИНН");
      }
    } catch (error) {
      console.error("Ошибка при получении информации об организации:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Ошибка при отправке формы:", errorInfo);
  };

  return (
    <>
      <Divider orientation="center">ИНН</Divider>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          name="inn"
          label="ИНН"
          rules={[{ required: true, message: "Пожалуйста, введите ИНН" }]}
        >
          <Input maxLength={12} placeholder="Введите ИНН" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Проверить
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
