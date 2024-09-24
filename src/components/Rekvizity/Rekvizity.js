import React from "react";
import { Typography, Card, Flex } from "antd";

import telImg from "../../img/contacts-icon2.svg";
import emailImg from "../../img/contacts-icon4.svg";
import mapImg from "../../img/contacts-icon1.svg";

const { Title, Text } = Typography;

export default function Rekvizity() {
  return (
    <div className="page-grid__content" id="content">
      {/* Блок с контактами */}
      <Card>
        <Title level={2}>Контактная информация</Title>

        {/* Адрес юридического лица */}
        <Flex gap="middle" align="center" style={{ marginBottom: "20px" }}>
          <img
            src={mapImg}
            alt="address"
            style={{ width: "40px", height: "40px" }}
          />
          <div>
            <Text strong>Адрес юридического лица:</Text>
            <p>
              143421 Московская область, г.о. Красногорск, автодорога Балтия тер
              26 км, Бизнес-центр Рига-Ленд, стр. Б3, подъезд 3, этаж 7, помещ.
              2, ком. 1
            </p>
          </div>
        </Flex>

        {/* Адрес для корреспонденции */}
        <Flex gap="middle" align="center" style={{ marginBottom: "20px" }}>
          <img
            src={emailImg}
            alt="email"
            style={{ width: "40px", height: "40px" }}
          />
          <div>
            <Text strong>Адрес для корреспонденции:</Text>
            <p>
              143421 Московская область, Красногорский р-н, 26 км автодороги
              «Балтия», Бизнес Центр «Рига-Ленд», строение Б3
            </p>
          </div>
        </Flex>

        {/* Телефон */}
        <Flex gap="middle" align="center" style={{ marginBottom: "20px" }}>
          <img
            src={telImg}
            alt="phone"
            style={{ width: "40px", height: "40px" }}
          />
          <div>
            <Text strong>Наш телефон:</Text>
            <p>
              <b>8 (495) 780-39-62</b>
            </p>
          </div>
        </Flex>
      </Card>

      {/* Блок с банковскими реквизитами */}
      <Card style={{ marginTop: "20px" }}>
        <Title level={2}>Банковские реквизиты</Title>

        <Flex gap="middle" wrap style={{ flexDirection: "column" }}>
          <Card
            type="inner"
            title={
              <span style={{ whiteSpace: "normal" }}>Основные реквизиты</span>
            }
            style={{ flex: 1, width: "100%" }}
          >
            <p>ИНН 5032137342, КПП 502401001</p>
            <p>ОГРН 1055006353478</p>
            <p>ОКПО 78100576, ОКТМО 46628101</p>
            <p>р/с 40702810492000006024 в Банк ГПБ (АО) г. Москва</p>
            <p>к/с 30101810200000000823</p>
            <p>БИК 044525823</p>
          </Card>

          <Card
            type="inner"
            title={
              <span style={{ whiteSpace: "normal" }}>
                Для департамента технологических присоединений
              </span>
            }
            style={{ flex: 1, width: "100%" }}
          >
            <p>Р/сч № 40602810500760000043</p>
            <p>ФИЛИАЛ "ЦЕНТРАЛЬНЫЙ" БАНКА ВТБ (ПАО) Г. МОСКВА</p>
            <p>Кор/сч № 30101810145250000411</p>
            <p>БИК 044525411</p>
          </Card>
        </Flex>
      </Card>
    </div>
  );
}
