import { Checkbox, Skeleton, Descriptions, notification } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import AppHelmet from "../../../components/Global/AppHelmet";
import useProfile from "../../../stores/Cabinet/useProfile";

const options = [
  { label: "Физические лица", value: "Физические лица" },
  { label: "Юридические лица", value: "Юридические лица" },
  {
    label: "Индивидуальные предприниматели",
    value: "Индивидуальные предприниматели",
  },
];

export default function Profile() {
  const profile = useProfile((store) => store.profile);
  const isLoadingProfile = useProfile((store) => store.isLoadingProfile);
  const fetchProfile = useProfile((store) => store.fetchProfile);

  const [checkedValues, setCheckedValues] = useState([]);

  useEffect(() => {
    fetchProfile();
    const savedValues =
      JSON.parse(localStorage.getItem("userCategories")) ||
      options.map((option) => option.value);
    setCheckedValues(savedValues);
  }, [fetchProfile]);

  const onChange = (checkedValues) => {
    if (checkedValues.length === 0) {
      notification.error({
        message: "Ошибка",
        description: "Должен быть выбран хотя бы один тип.",
      });
      return;
    }
    setCheckedValues(checkedValues);
    localStorage.setItem("userCategories", JSON.stringify(checkedValues));
  };

  return (
    <div>
      <AppHelmet title="Профиль" desc="Профиль пользователя" />
      <Title level={1}>Профиль</Title>

      {!isLoadingProfile && profile && (
        <Descriptions
          items={[
            { key: "1", label: "Имя", children: profile.firstname },
            { key: "2", label: "Фамилия", children: profile.lastname },
            { key: "3", label: "E-mail", children: profile.email },
            { key: "4", label: "Телефон", children: profile.phone },
          ]}
        />
      )}
      {isLoadingProfile && (
        <>
          <Skeleton active avatar paragraph={{ rows: 4 }} />
          <Skeleton active avatar paragraph={{ rows: 2 }} />
        </>
      )}
      <Title level={2}>Отображать поданные заявки только от:</Title>
      <Checkbox.Group
        options={options}
        value={checkedValues}
        onChange={onChange}
      />
    </div>
  );
}