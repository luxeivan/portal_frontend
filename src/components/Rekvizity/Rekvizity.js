import React from "react";
import { Typography, Card, Row, Col, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import telImg from "../../img/contacts-icon2.svg";
import emailImg from "../../img/contacts-icon4.svg";
import mapImg from "../../img/contacts-icon1.svg";

const { Title, Text } = Typography;

export default function Rekvizity() {
  const handleCopy = (fieldName) => {
    message.success(`${fieldName} скопирован`);
  };

  return (
    <div className="page-grid__content" id="content">
      {/* Блок с контактами */}
      <Card>
        <Title level={2}>Контактная информация</Title>

        {/* Адрес юридического лица */}
        <Row gutter={[16, 16]} align="middle">
          <Col flex="40px">
            <img
              src={mapImg}
              alt="address"
              style={{ width: "40px", height: "40px" }}
            />
          </Col>
          <Col flex="auto">
            <Text strong>Адрес юридического лица:</Text>
            <p>
              143421 Московская область, г.о. Красногорск, автодорога Балтия тер
              26 км, Бизнес-центр Рига-Ленд, стр. Б3, подъезд 3, этаж 7, помещ.
              2, ком. 1
            </p>
          </Col>
        </Row>

        {/* Адрес для корреспонденции */}
        <Row gutter={[16, 16]} align="middle">
          <Col flex="40px">
            <img
              src={emailImg}
              alt="email"
              style={{ width: "40px", height: "40px" }}
            />
          </Col>
          <Col flex="auto">
            <Text strong>Адрес для корреспонденции:</Text>
            <p>
              143421 Московская область, Красногорский р-н, 26 км автодороги
              «Балтия», Бизнес Центр «Рига-Ленд», строение Б3
            </p>
          </Col>
        </Row>

        {/* Телефон */}
        <Row gutter={[16, 16]} align="middle">
          <Col flex="40px">
            <img
              src={telImg}
              alt="phone"
              style={{ width: "40px", height: "40px" }}
            />
          </Col>
          <Col flex="auto">
            <Text strong>Наш телефон:</Text>
            <p>
              <b>8 (495) 780-39-62</b>
            </p>
          </Col>
        </Row>
      </Card>

      {/* Блок с банковскими реквизитами */}
      <Card style={{ marginTop: "20px" }}>
        <Title level={2}>Банковские реквизиты</Title>

        <Row gutter={[16, 16]} wrap>
          <Col xs={24} sm={24} md={12}>
            <Card
              type="inner"
              title={<span>Основные реквизиты</span>}
              style={{ height: "100%" }}
            >
              <p>
                ИНН{" "}
                <Typography.Text
                  copyable={{
                    text: "5032137342",
                    tooltips: ["Скопировать ИНН", "ИНН скопирован"],
                    icon: <CopyOutlined />,
                    onCopy: () => handleCopy("ИНН"),
                  }}
                >
                  5032137342
                </Typography.Text>
              </p>
              <p>
                КПП{" "}
                <Typography.Text
                  copyable={{
                    text: "502401001",
                    tooltips: ["Скопировать КПП", "КПП скопирован"],
                    icon: <CopyOutlined />,
                    onCopy: () => handleCopy("КПП"),
                  }}
                >
                  502401001
                </Typography.Text>
              </p>
              <p>
                ОГРН{" "}
                <Typography.Text
                  copyable={{
                    text: "1055006353478",
                    tooltips: ["Скопировать ОГРН", "ОГРН скопирован"],
                    icon: <CopyOutlined />,
                    onCopy: () => handleCopy("ОГРН"),
                  }}
                >
                  1055006353478
                </Typography.Text>
              </p>
              <p>
                ОКПО 78100576, ОКТМО 46628101
                {/* Если хотите отдельное копирование для ОКПО и ОКТМО */}
              </p>
              <p>
                Р/с{" "}
                <Typography.Text
                  copyable={{
                    text: "40702810492000006024",
                    tooltips: ["Скопировать Р/с", "Р/с скопирован"],
                    icon: <CopyOutlined />,
                    onCopy: () => handleCopy("Р/с"),
                  }}
                >
                  40702810492000006024
                </Typography.Text>{" "}
                в Банк ГПБ (АО) г. Москва
              </p>
              <p>
                К/с{" "}
                <Typography.Text
                  copyable={{
                    text: "30101810200000000823",
                    tooltips: ["Скопировать К/с", "К/с скопирован"],
                    icon: <CopyOutlined />,
                    onCopy: () => handleCopy("К/с"),
                  }}
                >
                  30101810200000000823
                </Typography.Text>
              </p>
              <p>
                БИК{" "}
                <Typography.Text
                  copyable={{
                    text: "044525823",
                    tooltips: ["Скопировать БИК", "БИК скопирован"],
                    icon: <CopyOutlined />,
                    onCopy: () => handleCopy("БИК"),
                  }}
                >
                  044525823
                </Typography.Text>
              </p>
            </Card>
          </Col>

          <Col xs={24} sm={24} md={12}>
            <Card
              type="inner"
              title={
                <span>Для департамента технологических присоединений</span>
              }
              style={{ height: "100%" }}
            >
              <p>
                Р/сч №{" "}
                <Typography.Text
                  copyable={{
                    text: "40602810500760000043",
                    tooltips: ["Скопировать Р/сч", "Р/сч скопирован"],
                    icon: <CopyOutlined />,
                    onCopy: () => handleCopy("Р/сч"),
                  }}
                >
                  40602810500760000043
                </Typography.Text>
              </p>
              <p>ФИЛИАЛ "ЦЕНТРАЛЬНЫЙ" БАНКА ВТБ (ПАО) Г. МОСКВА</p>
              <p>
                Кор/сч №{" "}
                <Typography.Text
                  copyable={{
                    text: "30101810145250000411",
                    tooltips: ["Скопировать Кор/сч", "Кор/сч скопирован"],
                    icon: <CopyOutlined />,
                    onCopy: () => handleCopy("Кор/сч"),
                  }}
                >
                  30101810145250000411
                </Typography.Text>
              </p>
              <p>
                БИК{" "}
                <Typography.Text
                  copyable={{
                    text: "044525411",
                    tooltips: ["Скопировать БИК", "БИК скопирован"],
                    icon: <CopyOutlined />,
                    onCopy: () => handleCopy("БИК"),
                  }}
                >
                  044525411
                </Typography.Text>
              </p>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
