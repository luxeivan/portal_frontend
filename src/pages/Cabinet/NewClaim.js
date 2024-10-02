//ОБРАБОТКА ОШИБКИ
import { Form, Typography, Button, Drawer, Descriptions, Flex } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import AddressInput from "../../components/FormComponentsNew/adressComponents/AddressInput";
import ConfirmationDocumentNewInput from "../../components/FormComponentsNew/confirmationDocumentComponents/ConfirmationDocumentNewInput";
import SnilsInput from "../../components/FormComponentsNew/SnilsInput";
import ErrorModal from "../../components/ErrorModal"; // Импортируем ErrorModal
import PriceInput from "../../components/FormComponentsNew/PriceInput";
import FormulaInput from "../../components/FormComponentsNew/FormulaInput";

const { Title, Paragraph } = Typography;

export default function NewClaim() {
  const [open, setOpen] = useState(false);
  const serviceItem = useServices((state) => state.serviceItem);
  const fetchServiceItem = useServices((state) => state.fetchServiceItem);
  const isLoading = useServices((state) => state.isLoading);
  const createClaim = useClaims((state) => state.createClaim);
  const newClaim = useClaims((state) => state.newClaim);
  const clearNewClaim = useClaims((state) => state.clearNewClaim);
  const { id } = useParams();
  const [form] = Form.useForm();

  const [error, setError] = useState(null); // Состояние для хранения ошибок

  useEffect(() => {
    fetchServiceItem(id, {  withChain: false, withFields: true });
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
    // console.log(values);
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
      // await createClaim({ service: serviceItem.Ref_Key, values });
      console.log("Пытаюсь понять откуда что приходит", values);
    } catch (err) {
      setError(err.message || "Ошибка при создании заявки."); // Обработка ошибки
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };

  const handlerChange = (changedValues) => {
    console.log("changedValues: ", changedValues)
  }
  // console.log(serviceItem)
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
                if (item.component_Type.includes("TextInput") && item.component_Expanded.specialField === 'СНИЛС')
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

                if (item.component_Type.includes("ConfirmationDocumentNewInput"))
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

            <Flex style={{ marginTop: 10 }}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {serviceItem.buttonText || "Подать заявку на услугу"}
                </Button>
              </Form.Item>
            </Flex>
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




// import { Form, Typography, Button, Drawer, Descriptions, Flex } from "antd";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useClaims from "../../stores/Cabinet/useClaims";
// import useServices from "../../stores/useServices";
// import TextInput from "../../components/FormComponentsNew/TextInput";
// import SwitchInput from "../../components/FormComponentsNew/SwitchInput";
// import NumberInput from "../../components/FormComponentsNew/NumberInput";
// import SliderInput from "../../components/FormComponentsNew/SliderInput";
// import SelectInput from "../../components/FormComponentsNew/SelectInput";
// import DividerForm from "../../components/FormComponentsNew/DividerForm";
// import TableInput from "../../components/FormComponentsNew/TableInput";
// import DateInput from "../../components/FormComponentsNew/DateInput";
// import AppHelmet from "../../components/Global/AppHelmet";
// import moment from "moment";
// import Preloader from "../../components/Main/Preloader";
// import GroupInput from "../../components/FormComponentsNew/GroupInput";
// import AddressInput from "../../components/FormComponentsNew/adressComponents/AddressInput";
// import ConfirmationDocumentNewInput from "../../components/FormComponentsNew/confirmationDocumentComponents/ConfirmationDocumentNewInput";
// import SnilsInput from "../../components/FormComponentsNew/SnilsInput";

// const { Title, Paragraph } = Typography;

// export default function NewClaim() {
//   const [open, setOpen] = useState(false);
//   const serviceItem = useServices((state) => state.serviceItem);
//   const fetchServiceItem = useServices((state) => state.fetchServiceItem);
//   const isLoading = useServices((state) => state.isLoading);
//   const createClaim = useClaims((state) => state.createClaim);
//   const newClaim = useClaims((state) => state.newClaim);
//   const clearNewClaim = useClaims((state) => state.clearNewClaim);
//   const { id } = useParams();
//   const [form] = Form.useForm();

//   useEffect(() => {
//     fetchServiceItem(id);
//   }, []);

//   useEffect(() => {
//     if (newClaim) {
//       showDrawer();
//     }
//   }, [newClaim]);

//   const showDrawer = () => {
//     setOpen(true);
//   };

//   const onClose = () => {
//     clearNewClaim();
//     setOpen(false);
//   };

//   console.log(serviceItem);

//   const onFinish = (values) => {
//     console.log(values);
//     const arr = [];
//     for (const [key, value] of Object.entries(values)) {
//       if (Array.isArray(value)) {
//         console.log(value);
//         values[key].forEach((element) => {
//           for (const [key, value] of Object.entries(element)) {
//             if (typeof value === "object" && Object.hasOwn(value, "$d")) {
//               element[key] = moment(value).format();
//             }
//           }
//         });
//       }

//       if (typeof value === "object" && Object.hasOwn(value, "$d")) {
//         values[key] = moment(value).format();
//       }
//     }

//     createClaim({ service: serviceItem.Ref_Key, values });

//     console.log(values);
//   };

//   const handleKeyDown = (event) => {
//     if (event.keyCode === 13) {
//       event.preventDefault();
//     }
//   };

//   return (
//     <div>
//       <AppHelmet
//         title={"Новая заявка"}
//         desc={"Новая заявка - Портал цифровых услуг АО Мособлэнерго"}
//       />
//       {isLoading && (
//         <Flex style={{ height: "300px" }} align="center" justify="center">
//           <Preloader />
//         </Flex>
//       )}
//       {!isLoading && serviceItem && (
//         <>
//           <Title>{serviceItem.Description}</Title>
//           <Form
//             scrollToFirstError
//             form={form}
//             layout="vertical"
//             onFinish={onFinish}
//             onKeyDown={handleKeyDown}
//             style={{ maxWidth: 800, margin: "0 auto" }}
//             // labelCol={{
//             //   span: 6,
//             // }}
//             // wrapperCol={{
//             //   span: 18,
//             // }}
//             labelWrap
//           >
//             {serviceItem.fields
//               ?.sort((a, b) => a.lineNum - b.lineNum)
//               .map((item, index) => {
//                 if (item.component_Type.includes("Divider"))
//                   return (
//                     <DividerForm
//                       key={index}
//                       {...item.component_Expanded}
//                       label={item.label}
//                     />
//                   );

//                 if (item.component_Type.includes("TextInput"))
//                   return (
//                     <TextInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={item.idLine}
//                       dependOf={item.dependIdLine}
//                       howDepend={item.dependСondition}
//                     />
//                   );
//                 if (item.component_Type.includes("TextInput") && item.component_Expanded.specialField === 'СНИЛС')
//                   return (
//                     <SnilsInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={item.idLine}
//                       dependOf={item.dependIdLine}
//                       howDepend={item.dependСondition}
//                     />
//                   );

//                 if (item.component_Type.includes("NumberInput"))
//                   return (
//                     <NumberInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={item.idLine}
//                       dependOf={item.dependIdLine}
//                       howDepend={item.dependСondition}
//                     />
//                   );

//                 if (item.component_Type.includes("SliderInput"))
//                   return (
//                     <SliderInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={item.idLine}
//                       dependOf={item.dependIdLine}
//                       howDepend={item.dependСondition}
//                     />
//                   );

//                 if (
//                   item.component_Type.includes("LinkInput") ||
//                   item.component_Type.includes("EnumInput")
//                 )
//                   return (
//                     <SelectInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={item.idLine}
//                       dependOf={item.dependIdLine}
//                       howDepend={item.dependСondition}
//                     />
//                   );

//                 if (item.component_Type.includes("TableInput"))
//                   return (
//                     <TableInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={item.idLine}
//                       dependOf={item.dependIdLine}
//                       howDepend={item.dependСondition}
//                     />
//                   );

//                 if (item.component_Type.includes("DateInput"))
//                   return (
//                     <DateInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={item.idLine}
//                       dependOf={item.dependIdLine}
//                       howDepend={item.dependСondition}
//                     />
//                   );

//                 if (item.component_Type.includes("SwitchInput"))
//                   return (
//                     <SwitchInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={item.idLine}
//                       dependOf={item.dependIdLine}
//                       howDepend={item.dependСondition}
//                     />
//                   );
//                 if (item.component_Type.includes("AddressInput"))
//                   return (
//                     <AddressInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={item.idLine}
//                       dependOf={item.dependIdLine}
//                       howDepend={item.dependСondition}
//                     />
//                   );

//                 if (
//                   item.component_Type.includes("ConfirmationDocumentNewInput")
//                 )
//                   return (
//                     <ConfirmationDocumentNewInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={item.idLine}
//                       dependOf={item.dependIdLine}
//                       howDepend={item.dependСondition}
//                     />
//                   );

//                 if (item.component_Type.includes("GroupFieldsInput"))
//                   return (
//                     <GroupInput
//                       key={index}
//                       {...item.component_Expanded}
//                       {...item}
//                       name={item.idLine}
//                       dependOf={item.dependIdLine}
//                       howDepend={item.dependСondition}
//                     />
//                   );
//               })}

//             {/* <ConfirmationDocumentNewInput name={"confdoc"}/> */}

//             <Flex style={{ marginTop: 10 }}>
//               <Form.Item>
//                 <Button type="primary" htmlType="submit">
//                   Подать заявку на услугу
//                 </Button>
//               </Form.Item>
//             </Flex>
//           </Form>

//           <Drawer
//             title="Поля формы"
//             placement="bottom"
//             closable={false}
//             onClose={onClose}
//             open={open}
//             key="bottom"
//           >
//             {newClaim && (
//               <>
//                 <Typography.Title level={3}>
//                   Создана заявка с Ref_Key: <b>{newClaim.Ref_Key}</b>
//                 </Typography.Title>
//                 <Paragraph>Данные по заявке в консоле</Paragraph>
//               </>
//             )}
//           </Drawer>
//         </>
//       )}
//     </div>
//   );
// }
