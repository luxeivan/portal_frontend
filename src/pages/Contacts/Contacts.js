import React from 'react';
import { Link } from 'react-router-dom';
import AppHelmet from "../../components/Global/AppHelmet";
import { Row, Col, Typography, Card } from "antd";
import PuzzleGame from '../Games/PuzzleGame';

const { Title } = Typography;

const filials = [
  {
    id: 1,
    name: 'Домодедовский филиал',
    departments: [
      'Дзержинское производственное отделение',
      'Домодедовское производственное отделение',
      'Подольское производственное отделение',
      'Чеховское производственное отделение'
    ],
    coordinates: [55.444584, 37.751287],
    address: '142001, Московская область, г. Домодедово, мкр. Северный, ул. Дачная, д.2'
  },
  //  остальные филиалы здесь...
];

export default function Contacts() {
  return (
    <>
      <AppHelmet title={"Контакты"} desc={"Контакты"} />
      <div>
        <Title level={1}>Контакты</Title>
        <Title level={2}>Адреса центров обслуживания клиентов</Title>

         <PuzzleGame/>

        {/* <Row gutter={[16, 16]}>
          {filials.map((filial) => (
            <Col key={filial.id} span={8}>
              <Link to={`/contacts/${filial.id}`}>
                <Card
                  title={filial.name}
                  hoverable
                  style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                  headStyle={{ backgroundColor: '#f0f2f5', borderRadius: '8px 8px 0 0' }}
                  bodyStyle={{ padding: '16px' }}
                >
                  <ul>
                    {filial.departments.map((department, index) => (
                      <li key={index}>{department}</li>
                    ))}
                  </ul>
                </Card>
              </Link>
            </Col>
          ))}
        </Row> */}
      </div>
    </>
  );
}

// import React from 'react'
// import AppHelmet from "../../components/Global/AppHelmet";
// import { Flex, Image, List, Typography, Button } from "antd";
// import PuzzleGame from '../Games/PuzzleGame';
// const { Title, Paragraph } = Typography;

// export default function Contacts() {
//     return (
//         <>
//             <AppHelmet title={"Контакты"} desc={"Контакты"} />
//             <div>
//                 <Title level={1}>Контакты</Title>
//                 <Title level={2}>Адреса центров обслуживания клиентов</Title>

//                 {/* <PuzzleGame/> */}
//             </div>
//         </>
//     )
// }
