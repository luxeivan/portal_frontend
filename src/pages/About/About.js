import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppHelmet from "../../components/Global/AppHelmet";
import { Flex, Image, List, Typography, Button, Form, Input, Tabs, ConfigProvider } from "antd";
import styles from "./About.module.css";
import mosoblik from "../../img/about/mosoblik.png";
import mosoblikShadow from "../../img/about/mosoblik_shadow.png";
import useGlobal from "../../stores/useGlobal";
import Preloader from "../../components/Main/Preloader";
import { motion } from "framer-motion";
import { IconConnect } from "../../components/icons/IconConnect";
import { IconHandEnergy } from "../../components/icons/IconHandEnergy";
import TableInputNew from "../../components/FormComponentsNew/TableInputNew";

const { Title, Paragraph } = Typography;


export default function About() {
  const [activeKey, setActiveKey] = useState(null)
  const { darkMode } = useGlobal();
  const navigate = useNavigate();

  // Функция для обработки клика
  const handleGameClick = () => {
    navigate("/game");
  };

  const items = [
    {
      key: 'Form1',
      label: 'Form1',
      children: <Form name="Form1">
        <Form.Item
          name={"form1_input1"}
          label={"form1_input1"}
          rules={[
            {
              required: true
            }
          ]}
        >

          <Input />
        </Form.Item>
        <Form.Item
          name={"form1_input2"}
          label={"form1_input2"}
        >
          <Input />
        </Form.Item>
        <Button htmlType="submit">Save1</Button>
      </Form>,
    },
    {
      key: 'Form2',
      label: 'Form2',
      children: <Form name="Form2">
        <Form.Item
          name={"form2_input1"}
          label={"form2_input1"}
          rules={[
            {
              required: true
            }
          ]}
        >

          <Input />
        </Form.Item>
        <Form.Item
          name={"form2_input2"}
          label={"form2_input2"}
        >
          <Input />
        </Form.Item>
        <Button htmlType="submit">Save2</Button>
      </Form>,
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];
  useEffect(() => {
    setActiveKey(items[0].key)
  }, [])
  const onChangeTab = (key) => {
    console.log(key);
    setActiveKey(key)
  };


  return (
    <>
      <AppHelmet title={"О нас"} desc={"Информация о компании"} />
      <div>
        <Title level={1}>О компании Мособлэнерго</Title>
        <Preloader />
        <div></div>
        {/* <Form
          onFinish={(values) => {
            console.log('values: ', values)
          }}

        >

          <TableInputNew name={'forma1'} fields={[
            {
              "object": "711d2bc6-50ce-11ef-94f8-5ef3fcb042f8",
              "object_Type": "StandardODATA.Catalog_componentsTableInput",
              "idLine": "b4988155-7819-47f4-938f-dbb566352476",
              "lineNum": "1",
              "fieldNum": "1",
              "nameOwner_Key": "00000000-0000-0000-0000-000000000000",
              "name_Key": "00adb624-1cd0-11ef-94f0-5ef3fcb042f8",
              "label": "Кадастровый номер земельного участка",
              "component": "efffe13c-50a7-11ef-94f8-5ef3fcb042f8",
              "component_Type": "StandardODATA.Catalog_componentsTextInput",
              "required": true,
              "hidden": false,
              "disabled": false,
              "placeholder": "",
              "editingPossible": false,
              "dependIdLine": "",
              "dependName_Key": "00000000-0000-0000-0000-000000000000",
              "dependСondition_Key": "00000000-0000-0000-0000-000000000000",
              "dependRequired": false,
              "dependHidden": false,
              "dependDisabled": false,
              "dependPlaceholder": "",
              "dependEditingPossible": false,
              "dependDefaultValue": "",
              "dependDefaultValue_Type": "StandardODATA.Undefined",
              "defaultValue": "",
              "defaultValue_Type": "StandardODATA.Undefined",
              "specialField": "КадастровыйНомер",
              "topLevelGroup_Key": "00000000-0000-0000-0000-000000000000",
              "properties": "",
              "linkUrl": "",
              "formula": "",
              "idVersionComponent": "",
              "versionChecksumComponent": "",
              "groupFields_Key": "00000000-0000-0000-0000-000000000000",
              "component_Expanded@navigationLinkUrl": "Catalog_componentsTextInput(guid'efffe13c-50a7-11ef-94f8-5ef3fcb042f8')",
              "component_Expanded": {
                "linkInput_Key": "00000000-0000-0000-0000-000000000000",
                "Predefined": false,
                "PredefinedDataName": "",
                "Ref_Key": "efffe13c-50a7-11ef-94f8-5ef3fcb042f8",
                "typeOData": "Edm.String",
                "specialField": "КадастровыйНомер",
                "inputMask": "",
                "valueFromLink": false,
                "length": "25",
                "DataVersion": "AAAAAAAEqeg=",
                "DeletionMark": false,
                "Description": "Поле \"Кадастровый номер\"",
                "Имя": "ПолеКадастровыйНомер"
              },
              "name@navigationLinkUrl": "InformationRegister_portalFields(object='711d2bc6-50ce-11ef-94f8-5ef3fcb042f8', object_Type='StandardODATA.Catalog_componentsTableInput', idLine='b4988155-7819-47f4-938f-dbb566352476')/name",
              "name": {
                "PredefinedDataName": "КадастровыеНомераЗУ",
                "Predefined": true,
                "inputMask": "",
                "DeletionMark": false,
                "label": "Объект присоединения кадастровые номера ЗУ",
                "ValueType": {
                  "Types": [
                    "String"
                  ],
                  "NumberQualifiers": {
                    "AllowedSign": "Any",
                    "Digits": 0,
                    "FractionDigits": 0
                  },
                  "StringQualifiers": {
                    "AllowedLength": "Variable",
                    "Length": "355"
                  },
                  "DateQualifiers": {
                    "DateFractions": "DateTime"
                  },
                  "BinaryDataQualifiers": {
                    "AllowedLength": "Variable",
                    "Length": "0"
                  }
                },
                "fieldsExternalServices": [],
                "placeHolder": "",
                "fieldAssignments": [
                  {
                    "Ref_Key": "00adb624-1cd0-11ef-94f0-5ef3fcb042f8",
                    "LineNumber": "1",
                    "assignment": "Услуга"
                  },
                  {
                    "Ref_Key": "00adb624-1cd0-11ef-94f0-5ef3fcb042f8",
                    "LineNumber": "2",
                    "assignment": "Объект"
                  }
                ],
                "auxiliary": false,
                "specialField": "КадастровыйНомер",
                "Ref_Key": "00adb624-1cd0-11ef-94f0-5ef3fcb042f8",
                "Description": "Кадастровые номера ЗУ",
                "DataVersion": "AAAAAAAErMw=",
                "fullDescription": "",
                "shortDescription": "",
                "availableComponents": [
                  {
                    "Ref_Key": "00adb624-1cd0-11ef-94f0-5ef3fcb042f8",
                    "LineNumber": "1",
                    "component": "efffe13c-50a7-11ef-94f8-5ef3fcb042f8",
                    "component_Type": "StandardODATA.Catalog_componentsTextInput"
                  }
                ],
                "Постановления": []
              },
              "dependName@navigationLinkUrl": "InformationRegister_portalFields(object='711d2bc6-50ce-11ef-94f8-5ef3fcb042f8', object_Type='StandardODATA.Catalog_componentsTableInput', idLine='b4988155-7819-47f4-938f-dbb566352476')/dependName",
              "dependName": null,
              "dependСondition@navigationLinkUrl": "InformationRegister_portalFields(object='711d2bc6-50ce-11ef-94f8-5ef3fcb042f8', object_Type='StandardODATA.Catalog_componentsTableInput', idLine='b4988155-7819-47f4-938f-dbb566352476')/dependСondition",
              "dependСondition": null
            },
            {
              "object": "711d2bc6-50ce-11ef-94f8-5ef3fcb042f8",
              "object_Type": "StandardODATA.Catalog_componentsTableInput",
              "idLine": "b4988155-7819-47f4-938f-dbb566352476",
              "lineNum": "1",
              "fieldNum": "1",
              "nameOwner_Key": "00000000-0000-0000-0000-000000000000",
              "name_Key": "00adb624-1cd0-11ef-94f0-5ef3fcb042f8",
              "label": "Второе поле",
              "component": "efffe13c-50a7-11ef-94f8-5ef3fcb042f8",
              "component_Type": "StandardODATA.Catalog_componentsTextInput",
              "required": true,
              "hidden": false,
              "disabled": false,
              "placeholder": "",
              "editingPossible": false,
              "dependIdLine": "",
              "dependName_Key": "00000000-0000-0000-0000-000000000000",
              "dependСondition_Key": "00000000-0000-0000-0000-000000000000",
              "dependRequired": false,
              "dependHidden": false,
              "dependDisabled": false,
              "dependPlaceholder": "",
              "dependEditingPossible": false,
              "dependDefaultValue": "",
              "dependDefaultValue_Type": "StandardODATA.Undefined",
              "defaultValue": "",
              "defaultValue_Type": "StandardODATA.Undefined",
              "specialField": "КадастровыйНомер",
              "topLevelGroup_Key": "00000000-0000-0000-0000-000000000000",
              "properties": "",
              "linkUrl": "",
              "formula": "",
              "idVersionComponent": "",
              "versionChecksumComponent": "",
              "groupFields_Key": "00000000-0000-0000-0000-000000000000",
              "component_Expanded@navigationLinkUrl": "Catalog_componentsTextInput(guid'efffe13c-50a7-11ef-94f8-5ef3fcb042f8')",
              "component_Expanded": {
                "linkInput_Key": "00000000-0000-0000-0000-000000000000",
                "Predefined": false,
                "PredefinedDataName": "",
                "Ref_Key": "efffe13c-50a7-11ef-94f8-5ef3fcb042f8",
                "typeOData": "Edm.String",
                "specialField": "КадастровыйНомер",
                "inputMask": "",
                "valueFromLink": false,
                "length": "25",
                "DataVersion": "AAAAAAAEqeg=",
                "DeletionMark": false,
                "Description": "Поле \"Кадастровый номер\"",
                "Имя": "ПолеКадастровыйНомер"
              },
              "name@navigationLinkUrl": "InformationRegister_portalFields(object='711d2bc6-50ce-11ef-94f8-5ef3fcb042f8', object_Type='StandardODATA.Catalog_componentsTableInput', idLine='b4988155-7819-47f4-938f-dbb566352476')/name",
              "name": {
                "PredefinedDataName": "КадастровыеНомераЗУ",
                "Predefined": true,
                "inputMask": "",
                "DeletionMark": false,
                "label": "Объект присоединения кадастровые номера ЗУ",
                "ValueType": {
                  "Types": [
                    "String"
                  ],
                  "NumberQualifiers": {
                    "AllowedSign": "Any",
                    "Digits": 0,
                    "FractionDigits": 0
                  },
                  "StringQualifiers": {
                    "AllowedLength": "Variable",
                    "Length": "355"
                  },
                  "DateQualifiers": {
                    "DateFractions": "DateTime"
                  },
                  "BinaryDataQualifiers": {
                    "AllowedLength": "Variable",
                    "Length": "0"
                  }
                },
                "fieldsExternalServices": [],
                "placeHolder": "",
                "fieldAssignments": [
                  {
                    "Ref_Key": "00adb624-1cd0-11ef-94f0-5ef3fcb042f8",
                    "LineNumber": "1",
                    "assignment": "Услуга"
                  },
                  {
                    "Ref_Key": "00adb624-1cd0-11ef-94f0-5ef3fcb042f8",
                    "LineNumber": "2",
                    "assignment": "Объект"
                  }
                ],
                "auxiliary": false,
                "specialField": "КадастровыйНомер",
                "Ref_Key": "00adb624-1cd0-11ef-94f0-5ef3fcb042f8",
                "Description": "Кадастровые номера ЗУ",
                "DataVersion": "AAAAAAAErMw=",
                "fullDescription": "",
                "shortDescription": "",
                "availableComponents": [
                  {
                    "Ref_Key": "00adb624-1cd0-11ef-94f0-5ef3fcb042f8",
                    "LineNumber": "1",
                    "component": "efffe13c-50a7-11ef-94f8-5ef3fcb042f8",
                    "component_Type": "StandardODATA.Catalog_componentsTextInput"
                  }
                ],
                "Постановления": []
              },
              "dependName@navigationLinkUrl": "InformationRegister_portalFields(object='711d2bc6-50ce-11ef-94f8-5ef3fcb042f8', object_Type='StandardODATA.Catalog_componentsTableInput', idLine='b4988155-7819-47f4-938f-dbb566352476')/dependName",
              "dependName": null,
              "dependСondition@navigationLinkUrl": "InformationRegister_portalFields(object='711d2bc6-50ce-11ef-94f8-5ef3fcb042f8', object_Type='StandardODATA.Catalog_componentsTableInput', idLine='b4988155-7819-47f4-938f-dbb566352476')/dependСondition",
              "dependСondition": null
            }
          ]} />
          <Button htmlType="submit">Save</Button>
        </Form> */}
        {/* <Form.Provider
          onFormFinish={async (name, { forms, values }) => {
            console.log("forms", forms)
            console.log("values", values)
            forms.Form1.validateFields().then(result => console.log("form1Validating", result)).catch(result => {
              console.log("Error_form1Validating", result)
              setActiveKey("Form1")
            })
            forms.Form2.validateFields().then(result => console.log("form2Validating", result)).catch(result => {
              console.log("Error_form1Validating", result)
              setActiveKey("Form2")
            })


            if (name === 'form1') {
              // Do something...
            }
          }}
        >


          <Tabs renderTabBar={(props, DefaultTabBar) => (
            <Flex
            vertical
              offsetTop={64}
              offsetBottom={20}
              style={{
                zIndex: 1,
              }}
              className="qwerty"
            >
              123
              <DefaultTabBar
                {...props}
                style={{
                  background: "green",
                }}
              />
            </Flex>
          )} type="card" activeKey={activeKey} items={items} onChange={onChangeTab} />

        </Form.Provider> */}
        <Flex wrap="wrap">
          <div className={styles.textArea}>
            <div>
              <Paragraph>
                Акционерное общество «Московская областная энергосетевая
                компания» создано на основании постановления Правительства
                Московской области от 19.07.2005 № 456/26 «Об участии Московской
                области в создании открытого акционерного общества «Московская
                областная энергосетевая компания». АО «Мособлэнерго» учреждено в
                соответствии с Федеральным законом «Об акционерных обществах»,
                Гражданским кодексом Российской Федерации и иными нормативными
                правовыми актами Российской Федерации, регулирующими
                деятельность хозяйственных обществ и зарегистрировано в качестве
                юридического лица 07 ноября 2005 года.
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
                энергосетевых компаний региона, которая обеспечивает потребности
                экономики в передающих мощностях, является надежным партнером
                государственных органов исполнительной власти Московской области
                и органов местного самоуправления в планировании и реализации
                программ территориального развития Московской области,
                добросовестным налогоплательщиком и работодателем.
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
                  Повышение качества обслуживания, обеспечение удовлетворенности
                  потребителей;
                </List.Item>

                <List.Item>
                  Обеспечение доступности инфраструктуры и создание условий для
                  экономического роста;
                </List.Item>

                <List.Item>
                  Повышение эффективности функционирования электросетевого
                  комплекса;
                </List.Item>

                <List.Item>
                  Реализация программы консолидации электросетевых активов на
                  территории Московской области (в том числе бесхозяйных сетей);
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
          </div>
          <div
            className={styles.mosoblikArea}
            style={{
              backgroundImage: `url(${darkMode ? mosoblikShadow : null})`,
            }}
          >
            <Image
              style={{ maxHeight: "100vh" }}
              preview={false}
              src={mosoblik}
            />
          </div>
        </Flex>
        <button
          type="button"
          className={styles.button}
          onClick={handleGameClick}
        >
          <div className={styles.buttonTop}>Нажми на меня</div>
          <div className={styles.buttonBottom}></div>
          <div className={styles.buttonBase}></div>
        </button>
      </div>
    </>
  );
}
