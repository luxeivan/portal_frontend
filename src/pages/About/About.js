import React, { useEffect, useRef } from "react";
import { Typography, Row, Col, List } from "antd";
import styles from "./About.module.css";
import AppHelmet from "../../components/Global/AppHelmet";
import mosoblik from "../../img/about/mosoblik.png";

import useGlobal from "../../stores/useGlobal";

const { Title, Paragraph } = Typography;

export default function About() {
  const { darkMode } = useGlobal();
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      if (darkMode) {
        containerRef.current.classList.add(styles.darkMode);
      } else {
        containerRef.current.classList.remove(styles.darkMode);
      }
    }
  }, [darkMode]);

  return (
    <>
      <AppHelmet title="О нас" desc="Информация о компании" />
      <div className={styles.container} ref={containerRef}>
        <div className={styles.content}>
          <Title level={1} className={styles.title}>
            О компании Мособлэнерго
          </Title>
          <Row gutter={[32, 32]} align={"top"}>
            <Col xs={24} md={12}>
              <div className={styles.textBlock}>
                <Paragraph>
                  Акционерное общество «Московская областная энергосетевая
                  компания» создано на основании постановления Правительства
                  Московской области от 19.07.2005 № 456/26 «Об участии
                  Московской области в создании открытого акционерного общества
                  «Московская областная энергосетевая компания». АО
                  «Мособлэнерго» учреждено в соответствии с Федеральным законом
                  «Об акционерных обществах», Гражданским кодексом Российской
                  Федерации и иными нормативными правовыми актами Российской
                  Федерации, регулирующими деятельность хозяйственных обществ и
                  зарегистрировано в качестве юридического лица 07 ноября 2005
                  года.
                </Paragraph>
                <Paragraph>
                  Создание АО «Мособлэнерго» в 2005 году со 100-процентным
                  участием в уставном капитале Московской области было вызвано
                  необходимостью решить накопившиеся проблемы в региональном
                  электроснабжении, такие как дефицит электрической мощности,
                  снижение надежности электроснабжения потребителей, высокий
                  уровень потерь при передаче электрической энергии.
                </Paragraph>
                <Paragraph>
                  Сегодня АО «Мособлэнерго» является одной из крупнейших
                  энергосетевых компаний региона, которая обеспечивает
                  потребности экономики в передающих мощностях, является
                  надежным партнером государственных органов исполнительной
                  власти Московской области и органов местного самоуправления в
                  планировании и реализации программ территориального развития
                  Московской области, добросовестным налогоплательщиком и
                  работодателем.
                </Paragraph>

                <Title level={4}>Основные направления деятельности:</Title>
                <List>
                  <List.Item>
                    Оказание услуг по передаче электроэнергии;
                  </List.Item>

                  <List.Item>
                    Технологическое присоединение энергопринимающих устройств
                    (энергетических установок) юридических и физических лиц к
                    электрическим сетям Общества;
                  </List.Item>

                  <List.Item>
                    Обеспечение надежности и бесперебойности энергоснабжения,
                    обеспечение энергобезопасности;
                  </List.Item>

                  <List.Item>
                    Повышение качества обслуживания, обеспечение
                    удовлетворенности потребителей;
                  </List.Item>

                  <List.Item>
                    Обеспечение доступности инфраструктуры и создание условий
                    для экономического роста;
                  </List.Item>

                  <List.Item>
                    Повышение эффективности функционирования электросетевого
                    комплекса;
                  </List.Item>

                  <List.Item>
                    Реализация программы консолидации электросетевых активов на
                    территории Московской области (в том числе бесхозяйных
                    сетей);
                  </List.Item>

                  <List.Item>
                    Повышение уровня корпоративного управления;
                  </List.Item>

                  <List.Item>
                    Обеспечение рациональной организации труда производственного
                    персонала, повышение его лояльности;
                  </List.Item>

                  <List.Item>
                    Снижение рисков травматизма персонала и сторонних лиц на
                    объектах электросетевого комплекса.
                  </List.Item>
                </List>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div
                className={styles.mosoblikArea}
                // style={{
                //   backgroundImage: `url(${darkMode ? mosoblikShadow : ""})`,
                // }}
              >
                <img
                  src={mosoblik}
                  alt="Мособлэнерго"
                  className={styles.companyImage}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AppHelmet from "../../components/Global/AppHelmet";
// import { Flex, Image, List, Typography, Button, Form, Input } from "antd";
// import styles from "./About.module.css";
// import mosoblik from "../../img/about/mosoblik.png";
// import mosoblikShadow from "../../img/about/mosoblik_shadow.png";
// import useGlobal from "../../stores/useGlobal";
// import Preloader from "../../components/Main/Preloader";

// const { Title, Paragraph } = Typography;

// export default function About() {
//   const [activeKey, setActiveKey] = useState(null);
//   const { darkMode } = useGlobal();
//   const navigate = useNavigate();

//   // Функция для обработки клика
//   const handleGameClick = () => {
//     navigate("/game");
//   };

//   const items = [
//     {
//       key: "Form1",
//       label: "Form1",
//       children: (
//         <Form name="Form1">
//           <Form.Item
//             name={"form1_input1"}
//             label={"form1_input1"}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item name={"form1_input2"} label={"form1_input2"}>
//             <Input />
//           </Form.Item>
//           <Button htmlType="submit">Save1</Button>
//         </Form>
//       ),
//     },
//     {
//       key: "Form2",
//       label: "Form2",
//       children: (
//         <Form name="Form2">
//           <Form.Item
//             name={"form2_input1"}
//             label={"form2_input1"}
//             rules={[
//               {
//                 required: true,
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item name={"form2_input2"} label={"form2_input2"}>
//             <Input />
//           </Form.Item>
//           <Button htmlType="submit">Save2</Button>
//         </Form>
//       ),
//     },
//     {
//       key: "3",
//       label: "Tab 3",
//       children: "Content of Tab Pane 3",
//     },
//   ];
//   useEffect(() => {
//     setActiveKey(items[0].key);
//   }, []);
//   const onChangeTab = (key) => {
//     console.log(key);
//     setActiveKey(key);
//   };

//   return (
//     <>
//       <AppHelmet title={"О нас"} desc={"Информация о компании"} />
//       <div>
//         <Title level={1}>О компании Мособлэнерго</Title>
//         <Preloader />
//         <div></div>

//         <Flex wrap="wrap">
//           <div className={styles.textArea}>
//             <div>
//               <Paragraph>
//                 Акционерное общество «Московская областная энергосетевая
//                 компания» создано на основании постановления Правительства
//                 Московской области от 19.07.2005 № 456/26 «Об участии Московской
//                 области в создании открытого акционерного общества «Московская
//                 областная энергосетевая компания». АО «Мособлэнерго» учреждено в
//                 соответствии с Федеральным законом «Об акционерных обществах»,
//                 Гражданским кодексом Российской Федерации и иными нормативными
//                 правовыми актами Российской Федерации, регулирующими
//                 деятельность хозяйственных обществ и зарегистрировано в качестве
//                 юридического лица 07 ноября 2005 года.
//               </Paragraph>
//               <Paragraph>
//                 Создание АО «Мособлэнерго» в 2005 году со 100-процентным
//                 участием в уставном капитале Московской области было вызвано
//                 необходимостью решить накопившиеся проблемы в региональном
//                 электроснабжении, такие как дефицит электрической мощности,
//                 снижение надежности электроснабжения потребителей, высокий
//                 уровень потерь при передаче электрической энергии.
//               </Paragraph>
//               <Paragraph>
//                 Сегодня АО «Мособлэнерго» является одной из крупнейших
//                 энергосетевых компаний региона, которая обеспечивает потребности
//                 экономики в передающих мощностях, является надежным партнером
//                 государственных органов исполнительной власти Московской области
//                 и органов местного самоуправления в планировании и реализации
//                 программ территориального развития Московской области,
//                 добросовестным налогоплательщиком и работодателем.
//               </Paragraph>

//               <Title level={4}>Основные направления деятельности:</Title>
//               <List>
//                 <List.Item>
//                   Оказание услуг по передаче электроэнергии;
//                 </List.Item>

//                 <List.Item>
//                   Технологическое присоединение энергопринимающих устройств
//                   (энергетических установок) юридических и физических лиц к
//                   электрическим сетям Общества;
//                 </List.Item>

//                 <List.Item>
//                   Обеспечение надежности и бесперебойности энергоснабжения,
//                   обеспечение энергобезопасности;
//                 </List.Item>

//                 <List.Item>
//                   Повышение качества обслуживания, обеспечение удовлетворенности
//                   потребителей;
//                 </List.Item>

//                 <List.Item>
//                   Обеспечение доступности инфраструктуры и создание условий для
//                   экономического роста;
//                 </List.Item>

//                 <List.Item>
//                   Повышение эффективности функционирования электросетевого
//                   комплекса;
//                 </List.Item>

//                 <List.Item>
//                   Реализация программы консолидации электросетевых активов на
//                   территории Московской области (в том числе бесхозяйных сетей);
//                 </List.Item>

//                 <List.Item>
//                   Повышение уровня корпоративного управления;
//                 </List.Item>

//                 <List.Item>
//                   Обеспечение рациональной организации труда производственного
//                   персонала, повышение его лояльности;
//                 </List.Item>

//                 <List.Item>
//                   Снижение рисков травматизма персонала и сторонних лиц на
//                   объектах электросетевого комплекса.
//                 </List.Item>
//               </List>
//             </div>
//           </div>
//           <div
//             className={styles.mosoblikArea}
//             style={{
//               backgroundImage: `url(${darkMode ? mosoblikShadow : null})`,
//             }}
//           >
//             <Image
//               style={{ maxHeight: "100vh" }}
//               preview={false}
//               src={mosoblik}
//             />
//           </div>
//         </Flex>
//         <button
//           type="button"
//           className={styles.button}
//           onClick={handleGameClick}
//         >
//           <div className={styles.buttonTop}>Нажми на меня</div>
//           <div className={styles.buttonBottom}></div>
//           <div className={styles.buttonBase}></div>
//         </button>
//       </div>
//     </>
//   );
// }
