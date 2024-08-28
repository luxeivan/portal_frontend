import { Descriptions, Card } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";
import AppHelmet from "../../../components/Global/AppHelmet";
import useProfile from "../../../stores/Cabinet/useProfile";

export default function Profile() {
  const profile = useProfile((store) => store.profile);
  const fetchProfile = useProfile((store) => store.fetchProfile);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Логирование данных профиля после получения
  useEffect(() => {
    console.log("Данные профиля после запроса:", profile);
  }, [profile]);

  return (
    <div>
      <AppHelmet title="Профиль" desc="Профиль пользователя" />
      <Title level={1}>Профиль</Title>

      <Card bordered={false}>
        <Descriptions column={1}>
          <Descriptions.Item label="E-mail">
            {profile.email || "Не указан"}
          </Descriptions.Item>
          <Descriptions.Item label="Телефон">
            {profile.phone || "Не указан"}
          </Descriptions.Item>
          <Descriptions.Item label="Пароль">********</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

// import { Descriptions, Card } from "antd";
// import Title from "antd/es/typography/Title";
// import React, { useEffect } from "react";
// import AppHelmet from "../../../components/Global/AppHelmet";
// import useProfile from "../../../stores/Cabinet/useProfile";

// export default function Profile() {
//   const profile = useProfile((store) => store.profile);
//   const fetchProfile = useProfile((store) => store.fetchProfile);

//   useEffect(() => {
//     fetchProfile();
//   }, [fetchProfile]);

//   // Добавим лог для проверки данных профиля
//   useEffect(() => {
//     console.log("Profile data after fetch:", profile);
//   }, [profile]);

//   return (
//     <div>
//       <AppHelmet title="Профиль" desc="Профиль пользователя" />
//       <Title level={1}>Профиль</Title>

//       <Card bordered={false}>
//         <Descriptions column={1}>
//           <Descriptions.Item label="E-mail">
//             {profile.email || "Не указан"}
//           </Descriptions.Item>
//           <Descriptions.Item label="Телефон">
//             {profile.phone || "Не указан"}
//           </Descriptions.Item>
//           <Descriptions.Item label="Пароль">********</Descriptions.Item>
//         </Descriptions>
//       </Card>
//     </div>
//   );
// }
