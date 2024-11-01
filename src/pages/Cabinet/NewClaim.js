import {
  Form,
  Typography,
  Button,
  Drawer,
  Row,
  Col,
  Card,
  Badge,
  Flex,
  Divider,
  Tag,
  Breadcrumb
} from "antd";
import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
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

const { Title, Paragraph } = Typography;

export default function NewClaim() {
  const [open, setOpen] = useState(false);
  const [documentModalVisible, setDocumentModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
      console.log("Пытаюсь понять откуда что приходит", values);
      await createClaim({ service: serviceItem.Ref_Key, values });
    } catch (err) {
      console.log(err.message || "Ошибка при создании заявки.");
      // setError(err.message || "Ошибка при создании заявки."); // Обработка ошибки
    }

    const attachedDocuments = [];
    if (serviceItem.categoriesFiles) {
      serviceItem.categoriesFiles.forEach((item) => {
        const document = values[`document_${item.category_Key}`];
        if (document) {
          attachedDocuments.push({
            categoryKey: item.category_Key,
            document,
          });
          console.log(
            `Документ для категории ${item.categoryName} добавлен:`,
            document
          );
        } else {
          console.log(
            `Документ для категории ${item.categoryName} не прикреплен`
          );
        }
        delete values[`document_${item.category_Key}`];
      });
    }

    const dataToSubmit = {
      ...values,
      attachedDocuments,
    };

    console.log("Данные для отправки заявки:", dataToSubmit);

    try {
      await createClaim({ service: serviceItem.Ref_Key, values: dataToSubmit });
    } catch (err) {
      setError(err.message || "Ошибка при создании заявки.");
    }
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
          itemRender={(currentRoute) => {
            return <Link to={currentRoute.href}>{currentRoute.title}</Link>
          }}
            items={
              chain &&
              chain.map((item) => ({
                href: `/services/${item.Ref_Key}`,
                title: item.Description,
              }))
            }
          />
          <Title>{serviceItem.Description}</Title>
          <Form
            scrollToFirstError
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onKeyDown={handleKeyDown}
            style={{ maxWidth: "800px", width: "100%", margin: "0 auto" }}
            labelWrap
            // onValuesChange={handlerChange}
          >
            {serviceItem.fields
              ?.sort((a, b) => a.lineNum - b.lineNum)
              .map((item, index) => {
                if (item.component_Type.includes("Divider"))
                  return (
                    <DividerForm
                      key={index}
                      {...item.component_Expanded}
                      label={item.label}
                    />
                  );

                if (item.component_Type.includes("TextInput"))
                  return (
                    <TextInput
                      key={index}
                      {...item.component_Expanded}
                      {...item}
                      name={item.idLine}
                      dependOf={item.dependIdLine}
                      howDepend={item.dependСondition}
                    />
                  );
                if (
                  item.component_Type.includes("TextInput") &&
                  item.component_Expanded.specialField === "СНИЛС"
                )
                  return (
                    <SnilsInput
                      key={index}
                      {...item.component_Expanded}
                      {...item}
                      name={item.idLine}
                      dependOf={item.dependIdLine}
                      howDepend={item.dependСondition}
                    />
                  );

                if (item.component_Type.includes("NumberInput"))
                  return (
                    <NumberInput
                      key={index}
                      {...item.component_Expanded}
                      {...item}
                      name={item.idLine}
                      dependOf={item.dependIdLine}
                      howDepend={item.dependСondition}
                    />
                  );

                if (item.component_Type.includes("SliderInput"))
                  return (
                    <SliderInput
                      key={index}
                      {...item.component_Expanded}
                      {...item}
                      name={item.idLine}
                      dependOf={item.dependIdLine}
                      howDepend={item.dependСondition}
                    />
                  );

                if (
                  item.component_Type.includes("LinkInput") ||
                  item.component_Type.includes("EnumInput") ||
                  item.component_Type.includes("SelectInput")
                )
                  return (
                    <SelectInput
                      key={index}
                      {...item.component_Expanded}
                      {...item}
                      name={item.idLine}
                      dependOf={item.dependIdLine}
                      howDepend={item.dependСondition}
                    />
                  );

                if (item.component_Type.includes("TableInput"))
                  return (
                    <TableInput
                      key={index}
                      {...item.component_Expanded}
                      {...item}
                      name={item.idLine}
                      dependOf={item.dependIdLine}
                      howDepend={item.dependСondition}
                    />
                  );

                if (item.component_Type.includes("DateInput"))
                  return (
                    <DateInput
                      key={index}
                      {...item.component_Expanded}
                      {...item}
                      name={item.idLine}
                      dependOf={item.dependIdLine}
                      howDepend={item.dependСondition}
                    />
                  );

                if (item.component_Type.includes("SwitchInput"))
                  return (
                    <SwitchInput
                      key={index}
                      {...item.component_Expanded}
                      {...item}
                      name={item.idLine}
                      dependOf={item.dependIdLine}
                      howDepend={item.dependСondition}
                    />
                  );
                if (item.component_Type.includes("AddressInput"))
                  return (
                    <AddressInput
                      key={index}
                      {...item.component_Expanded}
                      {...item}
                      name={item.idLine}
                      dependOf={item.dependIdLine}
                      howDepend={item.dependСondition}
                    />
                  );

                if (
                  item.component_Type.includes("ConfirmationDocumentNewInput")
                )
                  return (
                    <ConfirmationDocumentNewInput
                      key={index}
                      {...item.component_Expanded}
                      {...item}
                      name={item.idLine}
                      dependOf={item.dependIdLine}
                      howDepend={item.dependСondition}
                    />
                  );

                if (item.component_Type.includes("GroupFieldsInput"))
                  return (
                    <GroupInput
                      key={index}
                      {...item.component_Expanded}
                      {...item}
                      name={item.idLine}
                      dependOf={item.dependIdLine}
                      howDepend={item.dependСondition}
                      mainForm={form}
                    />
                  );
                if (item.component_Type.includes("PriceInput"))
                  return (
                    <PriceInput
                      key={index}
                      {...item.component_Expanded}
                      {...item}
                      name={item.idLine}
                      dependOf={item.dependIdLine}
                      howDepend={item.dependСondition}
                    />
                  );
                if (item.component_Type.includes("componentsFormula"))
                  return (
                    <FormulaInput
                      key={index}
                      {...item.component_Expanded}
                      {...item}
                      name={item.idLine}
                      dependOf={item.dependIdLine}
                      howDepend={item.dependСondition}
                    />
                  );
              })}

            <DocumentAttachments
              form={form}
              categoriesFiles={serviceItem.categoriesFiles}
            />

            <div
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: "#0052cc",
                    borderColor: "#0052cc",
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "8px",
                  }}
                >
                  {serviceItem.buttonText || "Подать заявку на услугу"}
                </Button>
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
