import React, { useEffect } from "react";
import { Skeleton, Typography, Card, Space } from "antd";
import useSubjects from "../../../stores/Cabinet/useSubjects";
import styles from "./Subjects.module.css";

const { Title } = Typography;

export default function Subjects() {
  const { subjects, isLoading, error, fetchSubjects } = useSubjects();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      fetchSubjects();
    }
  }, [fetchSubjects]);

  if (isLoading) {
    return <Skeleton active />;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <div>
      <Title level={1}>Субъекты</Title>
      <Space wrap size="large">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            style={{
              width: 200,
              height: 200,
            }}
            className={styles.subjectCard}
          >
            <p>{subject.attributes.name}</p>
          </Card>
        ))}
        <Card
          style={{
            width: 200,
            height: 200,
          }}
          className={styles.subjectCard}
        >
          <p>+</p>
        </Card>
      </Space>
      {subjects.length === 0 && <p>Субъекты не найдены</p>}
    </div>
  );
}