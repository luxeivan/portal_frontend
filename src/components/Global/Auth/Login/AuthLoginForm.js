import React from "react";
import { Button, Form, Input, Alert, Typography } from "antd";
import useAuth from "../../../../stores/useAuth";
import CodeForm from "./CodeForm";
import styles from "./AuthLoginForm.module.css";
import {
  formItemLayout,
  tailFormItemLayout,
} from "../../../../components/configSizeForm";
import ErrorModal from "../../../../components/ErrorModal";

export default function AuthLoginForm() {
  const {
    login,
    toggleModal,
    loginError,
    isCodeRequested,
    authTimer,
    startAuthTimer,
    showErrorModal,
  } = useAuth();

  const onFinish = async (values) => {
    login(values.email, values.password);
    startAuthTimer();
  };

  const onFinishFailed = ({ values, errorFields }) => {
    console.log("Failed:", errorFields);
  };

  return (
    <>
      {loginError && (
        <Alert
          message={loginError}
          type="error"
          showIcon
          closable
          onClose={() => toggleModal("isAuthModalOpen", false)}
        />
      )}
      <Form
        {...formItemLayout}
        className={styles.formContainer}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Это поле обязательно",
            },
            {
              type: "email",
              message: "Пожалуйста, введите корректный Email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Это поле обязательно",
            },
            {
              min: 10,
              message: "Минимальная длина пароля 10 символов",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Typography.Text>
          Забыли пароль или поменялся номер телефона - пройдите регистрацию
          заново с тем же Email
        </Typography.Text>

        <Form.Item {...tailFormItemLayout}>
          {!isCodeRequested && (
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitButton}
              disabled={authTimer > 0}
            >
              Вход
            </Button>
          )}
          {isCodeRequested && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  padding: "25px 35px",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  textAlign: "center",
                  width: "auto",
                  minWidth: "200px",
                }}
                disabled={authTimer > 0}
              >
                {authTimer > 0 ? (
                  <>
                    Повторить через
                    <br />
                    {`${authTimer} секунд(ы)`}
                  </>
                ) : (
                  "Отправить СМС еще раз"
                )}
              </Button>
            </div>

            // <Button
            //   type="primary"
            //   htmlType="submit"
            //   style={{
            //     padding: "25px 35px", // Увеличение кнопки за счёт отступов
            //     fontSize: "16px", // Увеличенный шрифт
            //     lineHeight: "1.5", // Адекватное расстояние между строками
            //     whiteSpace: "normal", // Разрешаем перенос текста
            //     wordWrap: "break-word", // Переносим слова при необходимости
            //     textAlign: "center", // Центровка текста
            //     width: "auto", // Ширина адаптируется под текст
            //     minWidth: "200px", // Минимальная ширина кнопки для стабильности
            //   }}
            //   disabled={authTimer > 0}
            // >
            //   {authTimer > 0 ? (
            //     <>
            //       Повторить через
            //       <br />
            //       {`${authTimer} секунд(ы)`}
            //     </>
            //   ) : (
            //     "Отправить СМС еще раз"
            //   )}
            // </Button>
          )}
        </Form.Item>
      </Form>
      {isCodeRequested && <CodeForm />}
      {showErrorModal && (
        <ErrorModal
          visible={showErrorModal}
          error={"Ошибка соединения с сервером 1С"}
          onClose={() => toggleModal("isAuthModalOpen", false)}
        />
      )}
    </>
  );
}
