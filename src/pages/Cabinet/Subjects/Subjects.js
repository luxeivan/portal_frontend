import React, { useEffect, useState } from "react";
import { Skeleton, Typography, Card, Space, Button, Flex, Input, Form, Modal } from "antd";
import useSubjects from "../../../stores/Cabinet/useSubjects";
import styles from "./Subjects.module.css";
import { PlusOutlined, SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons'
import Item from "antd/es/list/Item";
import SceletonCard from "../../../components/SceletonCard";

const { Title } = Typography;
const { Meta } = Card
const stylesForCard = {
  body: {
    height: "100%",
    width: 250,
    minHeight: 250
  },
  actions: { marginTop: "-20px" },
  header: { backgroundColor: "red" }
}

export default function Subjects() {
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [showModalView, setShowModalView] = useState(false)
  const subject = useSubjects(state => state.subject);
  const subjects = useSubjects(state => state.subjects);
  const isLoadingSubjects = useSubjects(state => state.isLoadingSubjects);
  const isLoadingSubjectItem = useSubjects(state => state.isLoadingSubjectItem);
  const error = useSubjects(state => state.error);
  const fetchSubjects = useSubjects(state => state.fetchSubjects);
  const fetchSubjectItem = useSubjects(state => state.fetchSubjectItem);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      fetchSubjects();
    }
  }, [fetchSubjects]);

  if (isLoadingSubjects) {
    return <>
      <Title level={1}>Субъекты</Title>
      <SceletonCard />
      {/* <Skeleton active />; */}
    </>
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }
  const toggleShowModalAdd = () => {
    setShowModalAdd(!showModalAdd)
  }
  const handleCancelModalAdd = () => {
    setShowModalAdd(false)
  }
  const handleOkModalAdd = () => {
    setShowModalAdd(false)
  }
  // -----------------------------------

  const handleCancelModalView = () => {
    setShowModalView(false)
  }
  const handleOkModalView = () => {
    setShowModalView(false)
  }
  return (
    <div>
      <Title level={1}>Субъекты</Title>

      <Flex wrap="wrap" gap="large">
        {subjects.map((subject) => (
          <Card
            hoverable
            key={subject.id}
            styles={stylesForCard}
            className={styles.subjectCard}
            onClick={() => {
              // console.log(subject.id)
              fetchSubjectItem(subject.id)
              setShowModalView(true)
            }}
          // actions={[
          //   <SettingOutlined key="setting" />,
          //   <EditOutlined key="edit" />,
          //   <EllipsisOutlined key="ellipsis" />,
          // ]}
          >
            <Typography.Text>{subject.attributes.name}</Typography.Text>
            <Meta description={subject.attributes.type} />

          </Card>
        ))}
        <Card
          hoverable
          styles={stylesForCard}
          className={styles.subjectCard}
          onClick={toggleShowModalAdd}
        >
          <Flex align="stretch" justify="center" style={{ minHeight: "100%", width: "100%" }}>
            <PlusOutlined />
          </Flex>
        </Card>
      </Flex>
      {subjects.length === 0 && <p>Субъекты не найдены</p>}

      <Modal title="Новый субъект" open={showModalAdd} onOk={handleOkModalAdd} onCancel={handleCancelModalAdd}>
        <Form>
          <Form.Item
            label={"Имя"}>
            <Input />
          </Form.Item>
          <Form.Item
            label={"Фамилия"}>
            <Input />
          </Form.Item>
          <Form.Item
            label={"Отчество"}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* ------------------------------------------------- */}

      <Modal title={subject && subject.attributes.name} open={showModalView} onOk={handleOkModalView} onCancel={handleCancelModalView}>
        <Typography.Paragraph>{subject && subject.attributes.type}</Typography.Paragraph>
        <Typography.Paragraph>Паспорт: {subject && subject.attributes.counterparty[0].serialPassport} {subject && subject.attributes.counterparty[0].numberPassport}</Typography.Paragraph>
      </Modal>
    </div >
  );
}