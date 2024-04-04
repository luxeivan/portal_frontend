import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

export default function AppFooter() {
  return (
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Copyright © <a href="https://mosoblenergo.ru/" target="_blank">АО «Мособлэнерго»</a> | Разработка сайта - Шишкин & Януть | 2023 - {new Date().getFullYear()}
    </Footer>
  );
}
