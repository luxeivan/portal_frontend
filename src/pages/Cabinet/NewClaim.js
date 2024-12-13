import { Form, Typography, Button, Drawer, Flex, Breadcrumb, ConfigProvider, Col, Row, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useClaims from "../../stores/Cabinet/useClaims";
import useServices from "../../stores/useServices";
import TextInput from "../../components/FormComponentsNew/TextInput";
import SwitchInput from "../../components/FormComponentsNew/SwitchInput";
import NumberInput from "../../components/FormComponentsNew/NumberInput";
import SliderInput from "../../components/FormComponentsNew/SliderInput";
import SelectInput from "../../components/FormComponentsNew/SelectInput";
import DividerForm from "../../components/FormComponentsNew/DividerForm";
import TableInput from "../../components/FormComponentsNew/TableInput";
import DateInput from "../../components/FormComponentsNew/DateInput";
import AppHelmet from "../../components/Global/AppHelmet";
import moment from "moment";
import Preloader from "../../components/Main/Preloader";
import GroupInput from "../../components/FormComponentsNew/GroupInput";
import AddressInput from "../../components/FormComponentsNew/addressComponents/AddressInput";
import ConfirmationDocumentNewInput from "../../components/FormComponentsNew/confirmationDocumentComponents/ConfirmationDocumentNewInput";
import SnilsInput from "../../components/FormComponentsNew/SnilsInput";
import ErrorModal from "../../components/ErrorModal";
import PriceInput from "../../components/FormComponentsNew/PriceInput";
import FormulaInput from "../../components/FormComponentsNew/FormulaInput";
import DocumentAttachments from "../../components/FormComponentsNew/DocumentAttachments";
import TextConcatenation from "../../components/FormComponentsNew/TextConcatenation";

import { motion } from "framer-motion";
import InnInput from "../../components/FormComponentsNew/InnInput";
import BikInput from "../../components/FormComponentsNew/BikInput";
import DocumentInput from "../../components/FormComponentsNew/DocumentInput";

import selectComponent from "../../components/selectComponent";



const { Title, Paragraph } = Typography;

export default function NewClaim() {
  const [open, setOpen] = useState(false);
  const chain = useServices((state) => state.chain);
  const serviceItem = useServices((state) => state.serviceItem);
  const fetchServiceItem = useServices((state) => state.fetchServiceItem);
  const isLoading = useServices((state) => state.isLoading);
  const createClaim = useClaims((state) => state.createClaim);
  const newClaim = useClaims((state) => state.newClaim);
  const clearNewClaim = useClaims((state) => state.clearNewClaim);
  const { id } = useParams();
  const [form] = Form.useForm();

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServiceItem(id, { withChain: true, withFields: true });
  }, []);

  useEffect(() => {
    if (newClaim) {
      showDrawer();
    }
  }, [newClaim]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    clearNewClaim();
    setOpen(false);
  };

  const onFinish = async (values) => {
    for (const [key, value] of Object.entries(values)) {
      if (Array.isArray(value)) {
        values[key].forEach((element) => {
          for (const [key, value] of Object.entries(element)) {
            if (typeof value === "object" && Object.hasOwn(value, "$d")) {
              element[key] = moment(value).format();
            }
          }
        });
      }

      if (typeof value === "object" && Object.hasOwn(value, "$d")) {
        values[key] = moment(value).format();
      }
    }
    try {
      console.log("Данные для создания заявки: ", values);
      // await createClaim({ service: serviceItem.Ref_Key, values });
    } catch (err) {
      console.log(err.message || "Ошибка при создании заявки.");
      // setError(err.message || "Ошибка при создании заявки."); // Обработка ошибки
    }

    // const attachedDocuments = [];
    // if (serviceItem.categoriesFiles) {
    //   serviceItem.categoriesFiles.forEach((item) => {
    //     const document = values[`document_${item.category_Key}`];
    //     if (document) {
    //       attachedDocuments.push({
    //         categoryKey: item.category_Key,
    //         document,
    //       });
    //       console.log(
    //         `Документ для категории ${item.categoryName} добавлен:`,
    //         document
    //       );
    //     } else {
    //       console.log(
    //         `Документ для категории ${item.categoryName} не прикреплен`
    //       );
    //     }
    //     delete values[`document_${item.category_Key}`];
    //   });
    // }

    // const dataToSubmit = {
    //   ...values,
    //   attachedDocuments,
    // };

    // console.log("Данные для отправки заявки:", dataToSubmit);

    // try {
    //   await createClaim({ service: serviceItem.Ref_Key, values: dataToSubmit });
    // } catch (err) {
    //   setError(err.message || "Ошибка при создании заявки.");
    // }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };

  console.log(serviceItem);

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto" }}>
      <AppHelmet
        title={"Новая заявка"}
        desc={"Новая заявка - Портал цифровых услуг АО Мособлэнерго"}
      />
      {isLoading && (
        <Flex style={{ height: "300px" }} align="center" justify="center">
          <Preloader />
        </Flex>
      )}
      {!isLoading && serviceItem && (
        <>
          <Breadcrumb
            separator=">"
            itemRender={(currentRoute) => {
              return <Link to={currentRoute.href}>{currentRoute.title}</Link>;
            }}
            items={
              chain &&
              chain.map((item) => ({
                href: `/services/${item.Ref_Key}`,
                title: item.Description,
              }))
            }
          />
          <ConfigProvider
            theme={{
              token: {
                /* here is your global tokens */
                // fontSize: 16,
                // fontSizeHeading1: 24
              },
              components: {
                Select: {
                  optionFontSize: 18,
                  fontSize: 18
                },
                Input: {
                  fontSize: 18,
                },
                Form: {
                  /* here is your component tokens */
                  labelFontSize: 18,
                  verticalLabelPadding: "0 0 4px",
                  itemMarginBottom: 0
                },
              },
            }}
          >

            <Title>{serviceItem.Description}</Title>
            <Flex gap={5} style={{ marginBottom: "1.2rem" }}>
              {serviceItem.tags.map((item, index) => (<Tag key={index} style={{ fontSize: "1.2rem", lineHeight: "1.8rem" }} color={item.tag?.color?.Имя}>{item.tag?.Description}</Tag>))}
            </Flex>

            <Form
              scrollToFirstError
              form={form}
              labelAlign="right"
              layout="vertical"
              onFinish={onFinish}
              onKeyDown={handleKeyDown}
              style={{
                // maxWidth: "800px", 
                width: "100%",
                margin: "0 auto"
              }}

              labelWrap
              validateTrigger={["onSubmit", "onChange"]}
            // onValuesChange={handlerChange}
            >
              {/* <Flex
                wrap={true}
                gap={20}
                // justify="space-between"
              > */}
              <Row
                gutter={[20, 20]}
                align={"stretch"}
              >
                {serviceItem.fields
                  ?.sort((a, b) => a.lineNum - b.lineNum)

                  .map(selectComponent)}
              </Row>

              {/* </Flex> */}
              {/* 
              <DocumentAttachments
                form={form}
                categoriesFiles={serviceItem.categoriesFiles}
              /> */}

              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Form.Item>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                    // style={{
                    //   backgroundColor: "#0052cc",
                    //   borderColor: "#0052cc",
                    //   padding: "10px 20px",
                    //   fontSize: "16px",
                    //   borderRadius: "8px",
                    // }}
                    >
                      {serviceItem.buttonText || "Подать заявку на услугу"}
                    </Button>
                  </motion.div>
                </Form.Item>
              </div>

              {/* <Flex style={{ marginTop: 10 }}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {serviceItem.buttonText || "Подать заявку на услугу"}
                </Button>
              </Form.Item>
            </Flex> */}
            </Form>
          </ConfigProvider>
          <Drawer
            title="Поля формы"
            placement="bottom"
            closable={false}
            onClose={onClose}
            open={open}
            key="bottom"
          >
            {newClaim && (
              <>
                <Typography.Title level={3}>
                  Создана заявка с Ref_Key: <b>{newClaim.Ref_Key}</b>
                </Typography.Title>
                <Paragraph>Данные по заявке в консоле</Paragraph>
              </>
            )}
          </Drawer>
        </>
      )}

      {error && (
        <ErrorModal
          visible={!!error}
          error={error}
        // onClose={() => setError(null)}
        />
      )}
    </div>
  );
}
