import React from "react";
import { Layout, Space } from "antd";
import styles from "./AppFooter.module.css";

// Импортируем локальные изображения
import telegaIcon from "../../img/socialMedia/telega.png";
import vkIcon from "../../img/socialMedia/vk.png";
import okIcon from "../../img/socialMedia/ok.png";
import yandexIcon from "../../img/socialMedia/yandex.png";

const { Footer } = Layout;

export default function AppFooter() {
  return (
    <Footer
      className={styles.footer}
      // style={{
      //   textAlign: "center",
      //   padding: "20px 0", // Добавляем немного паддинга
      // }}
    >
      <Space direction="vertical" size="large">
        {/* Социальные сети */}
        <div>
          <Space size="large">
            <a
              href="https://t.me/mosoblenergo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={telegaIcon}
                alt="Telegram"
                style={{ width: 40, height: 40 }}
              />
            </a>
            <a
              href="https://vk.com/mosoblenergo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={vkIcon} alt="VK" style={{ width: 40, height: 40 }} />
            </a>
            <a
              href="https://ok.ru/mosoblenergo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={okIcon} alt="OK" style={{ width: 40, height: 40 }} />
            </a>
            <a
              href="https://dzen.ru/mosoblenergo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={yandexIcon}
                alt="Yandex"
                style={{ width: 40, height: 40 }}
              />
            </a>
          </Space>
        </div>

        {/* Текущая информация о сайте */}
        <div>
          Copyright ©{" "}
          <a
            href="https://mosoblenergo.ru/"
            target="_blank"
            rel="noopener noreferrer"
          >
            АО «Мособлэнерго»
          </a>{" "}
          | Разработка сайта - Шишкин & Януть | 2023 -{" "}
          {new Date().getFullYear()}
        </div>
      </Space>
    </Footer>
  );
}

// import React from "react";
// import { Layout } from "antd";
// import styles from "./AppFooter.module.css";
// const { Footer } = Layout;

// export default function AppFooter() {
//   return (
//     <Footer
//       className={styles.footer}
//       style={{
//         textAlign: "center",
//       }}
//     >
//       Copyright ©{" "}
//       <a href="https://mosoblenergo.ru/" target="_blank">
//         АО «Мособлэнерго»
//       </a>{" "}
//       | Разработка сайта - Шишкин & Януть | 2023 - {new Date().getFullYear()}
//     </Footer>
//   );
// }
