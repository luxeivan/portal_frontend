import React from "react";
import { Typography, Tabs } from "antd";
import Law from "../../components/Documentation/Law";
import AppHelmet from "../../components/Global/AppHelmet";
import Container from "../../components/Container";
import PoliciesAndRegulations from "../../components/Documentation/PoliciesAndRegulations";
import UserGuide from "../../components/Documentation/UserGuide";

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Политики и регламенты",
    children: <PoliciesAndRegulations />,
  },
  {
    key: "2",
    label: "Руководства пользователя",
    children: <UserGuide />,
  },
  {
    key: "3",
    label: "Законодательство",
    children: <Law />,
  },
];
export default function Documentation() {
  return (
    <>
      <AppHelmet
        title={"Документация"}
        desc={"Портал цифровых услуг АО Мособлэнерго - Документация"}
      />
      <Container>
        <Typography.Title level={1}>Документация</Typography.Title>
        <div style={{ margin: "0 auto" }}>
          <Tabs
            style={{ maxWidth: "80vw" }}
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
        </div>
      </Container>
    </>
  );
}
