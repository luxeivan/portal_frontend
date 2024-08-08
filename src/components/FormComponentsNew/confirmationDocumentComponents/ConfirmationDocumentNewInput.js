import React, { useEffect, useState } from "react";
import { Form, Drawer, Typography, Collapse } from "antd";
import StrapiRichText from "../../StrapiRichText";
import SelectDocumentType from "./SelectDocumentType";
import PassportFields from "./PassportFields";
import OtherDocumentFields from "./OtherDocumentFields";

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

export default function ConfirmationDocumentNewInput({ name }) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const onClose = () => setDrawerVisible(false);
  // if (
  //   form &&
  //   typeof form.getFieldValue === "function" &&
  //   form.getFieldValue([name, "typeDoc"]) === "Иной документ"
  // ) {
  //   form.setFieldsValue({
  //     [name]: {
  //       serialPassport: null,
  //       numberPassport: null,
  //       kodPodrazdelenia: null,
  //       kemVidan: null,
  //       dateIssue: null,
  //     },
  //   });
  // } else if (
  //   form &&
  //   typeof form.getFieldValue === "function" &&
  //   form.getFieldValue([name, "typeDoc"]) === "Паспорт гражданина РФ"
  // ) {
  //   form.setFieldsValue({
  //     [name]: {
  //       typeOtherDoc: null,
  //       recvizityOthetDoc: null,
  //       kemVidanOthetDoc: null,
  //       dateIssueOtherDoc: null,
  //     },
  //   });
  // }
  // if (read && value?.[name]?.typeDoc === "Иной документ") {
  //   form.setFieldValue([name, "typeDoc"], "Иной документ");
  // }

  // useEffect(() => {
  //   if (kodPodrazdelenia && kodPodrazdelenia.length === 7) {
  //     axios
  //       .get(`${backServer}/api/cabinet/get-fms`, {
  //         params: { searchString: kodPodrazdelenia },
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //         },
  //       })
  //       .then((response) => {
  //         setKemVidanOptions(
  //           response.data.data.map((item) => ({
  //             label: (
  //               <Typography.Text
  //                 style={{ width: "100%", whiteSpace: "normal" }}
  //               >
  //                 {item.value}
  //               </Typography.Text>
  //             ),
  //             value: item.value,
  //           }))
  //         );
  //       });
  //   }
  // }, [kodPodrazdelenia]);

  // Обрабатывает изменения в коде подразделения, форматируя его


  return (
    <Collapse
      defaultActiveKey={["1"]}
      style={{ marginBottom: 24 }}
      items={[
        {
          key: "1",
          label: "Удостоверяющий документ",
          children: (
            <>
              <Form.List
                name={name}
                initialValue={{ "Вид документа": "Паспорт гражданина РФ" }}
              >
                {() => (
                  <>
                    <SelectDocumentType name={name} />

                    <PassportFields name={name} />

                    <OtherDocumentFields name={name} />
                  </>
                )}
              </Form.List>

              <Drawer
                title={"Удостоверяющий документ"}
                placement="right"
                onClose={onClose}
                open={drawerVisible}
              >
                <StrapiRichText content={"Удостоверяющий документ"} />
              </Drawer>
            </>

          )
        }
      ]}
    />


  );
}
