import React from "react";
import { Layout } from "antd";
import styles from "./AppFooter.module.css";
const { Footer } = Layout;

export default function AppFooter() {
  return (
    <Footer
      className={styles.footer}
      style={{
        textAlign: "center",
      }}
    >
      Copyright ©{" "}
      <a href="https://mosoblenergo.ru/" target="_blank">
        АО «Мособлэнерго»
      </a>{" "}
      | Разработка сайта - Шишкин & Януть | 2023 - {new Date().getFullYear()}
    </Footer>
  );
}
