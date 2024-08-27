import React from "react";
import { Button, Flex, Modal, Typography } from "antd";
import cat from "../img/Cat.png";

const { Text, Title } = Typography;

const ErrorModal = ({ visible, error, onClose }) => {
  return (
    <Modal
      closable={false}
      open={visible}
      // onCancel={onClose}
      footer={null}
      centered
      bodyStyle={{ textAlign: "center" }}
    >
      <Title level={4} style={{ textAlign: "center" }}>
        Ошибка
      </Title>
      <Text type="danger">
        Извините, наш сайт немного устал и приболел, пожалуйста, подождите пару
        минут и попробуйте обновить страничку.
      </Text>
      <br />
      <img
        src={cat}
        alt="Сайт устал"
        style={{ width: "100%", marginTop: "20px" }}
      />
      {/* Для отображения ошибки можно использовать это место */}
      {/* <Text type="secondary">{error?.message || "Неизвестная ошибка"}</Text> */}
      <Flex justify="center" gap={10}>
        <Button
          type="primary"
          onClick={() => {
            window.location.reload();
          }}
        >
          {" "}
          Обновить страничку
        </Button>
        <Button
          type="dashed"
          onClick={() => {
            window.location.replace("/");
          }}
        >
          {" "}
          На главную страничку
        </Button>
      </Flex>
    </Modal>
  );
};

export default ErrorModal;

// import React from "react";
// import { Modal, Typography } from "antd";
// import cat from "../img/Cat.png";

// const { Text, Title } = Typography;

// const ErrorModal = ({ visible, error, onClose }) => {
//   return (
//     <Modal
//       visible={visible}
//       onCancel={onClose}
//       footer={null}
//       centered
//       bodyStyle={{ textAlign: "center" }} // Центрируем содержимое модального окна
//     >
//       <Title level={4} style={{ textAlign: "center" }}>
//         Ошибка
//       </Title>{" "}
//       {/* Центрируем заголовок */}
//       <Text type="danger">
//         Извините, наш сайт немного устал и приболел, пожалуйста, подождите пару
//         минут и попробуйте обновить страничку.
//       </Text>
//       <br />
//       <img
//         src={cat}
//         alt="Сайт устал"
//         style={{ width: "100%", marginTop: "20px" }}
//       />{" "}
//       {/* Вот тут можно потом попробовать отображать ошибки */}
//       {/* <Text type="secondary">{error?.message || "Неизвестная ошибка"}</Text> */}
//     </Modal>
//   );
// };

// export default ErrorModal;
