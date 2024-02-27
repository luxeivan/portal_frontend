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
      АО Мособлэнерго ©{new Date().getFullYear()} Создано Шишкин & Януть
    </Footer>
  );
}
