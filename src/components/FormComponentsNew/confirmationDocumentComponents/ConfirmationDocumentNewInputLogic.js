import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Typography } from "antd";
import useSubjects from "../../../stores/Cabinet/useSubjects";
import ConfirmationDocumentNewInputRender from "./ConfirmationDocumentNewInput";

const backServer = process.env.REACT_APP_BACK_BACK_SERVER;

export default function ConfirmationDocumentNewInputLogic({
  read,
  edit,
  value,
  name,
  form,
}) {
  const showModalAdd = useSubjects((state) => state.showModalAdd);
  const showModalView = useSubjects((state) => state.showModalView);
  const [kemVidanOptions, setKemVidanOptions] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const onClose = () => setDrawerVisible(false);

  useEffect(() => {
    setKemVidanOptions([]);
  }, [showModalAdd, showModalView]);

  const kodPodrazdelenia = Form.useWatch([name, "kodPodrazdelenia"], form);

  useEffect(() => {
    const typeDoc = form.getFieldValue([name, "typeDoc"]);
    if (typeDoc === "Иной документ") {
      form.setFieldsValue({
        [name]: {
          serialPassport: null,
          numberPassport: null,
          kodPodrazdelenia: null,
          kemVidan: null,
          dateIssue: null,
        },
      });
    } else if (typeDoc === "Паспорт гражданина РФ") {
      form.setFieldsValue({
        [name]: {
          typeOtherDoc: null,
          recvizityOthetDoc: null,
          kemVidanOthetDoc: null,
          dateIssueOtherDoc: null,
        },
      });
    }
  }, [form, name]);

  useEffect(() => {
    if (kodPodrazdelenia && kodPodrazdelenia.length === 7) {
      axios
        .get(`${backServer}/api/cabinet/get-fms`, {
          params: { searchString: kodPodrazdelenia },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((response) => {
          setKemVidanOptions(
            response.data.data.map((item) => ({
              label: (
                <Typography.Text
                  style={{ width: "100%", whiteSpace: "normal" }}
                >
                  {item.value}
                </Typography.Text>
              ),
              value: item.value,
            }))
          );
        });
    }
  }, [kodPodrazdelenia]);

  // Обрабатывает изменения в коде подразделения, форматируя его
  const handleSerialPassportChange = (e) => {
    form.setFieldValue(
      [name, "serialPassport"],
      e.target.value.replace(/[^\d]/g, "")
    );
  };
  const handleNumberPassportChange = (e) => {
    form.setFieldValue(
      [name, "numberPassport"],
      e.target.value.replace(/[^\d]/g, "")
    );
  };

  const handleKodPodrazdeleniaChange = (e) => {
    const { value } = e.target;
    const onlyNums = value.replace(/[^\d]/g, "");
    let formattedKod = "";

    if (onlyNums.length <= 3) {
      formattedKod = onlyNums;
    } else if (onlyNums.length > 3 && onlyNums.length <= 6) {
      formattedKod = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    }
    form.setFieldValue([name, "kodPodrazdelenia"], formattedKod);
  };

  return (
    <ConfirmationDocumentNewInputRender
      read={read}
      edit={edit}
      value={value}
      name={name}
      form={form}
      drawerVisible={drawerVisible}
      onClose={onClose}
      kemVidanOptions={kemVidanOptions}
      handleSerialPassportChange={handleSerialPassportChange}
      handleNumberPassportChange={handleNumberPassportChange}
      handleKodPodrazdeleniaChange={handleKodPodrazdeleniaChange}
    />
  );
}
