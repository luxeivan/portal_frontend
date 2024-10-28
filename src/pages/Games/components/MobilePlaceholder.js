import React from "react";
import { Result } from "antd";

export default function MobilePlaceholder() {
  return (
    <Result
      status="warning"
      title="Эта игра доступна только на настольных устройствах"
      subTitle="Пожалуйста, зайдите с компьютера, чтобы поиграть."
    />
  );
}
