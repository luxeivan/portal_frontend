import React, { useEffect, useState } from "react";
import { Form, AutoComplete, Typography, DatePicker, Input } from "antd";
import locale from "antd/locale/ru_RU";
import moment from "moment";
import TextInput from "../TextInput";
import useSubjects from "../../../stores/Cabinet/useSubjects";

const PassportFields = ({ name }) => {
  const [kemVidanOptions, setKemVidanOptions] = useState([]);
  const showModalAdd = useSubjects((state) => state.showModalAdd);
  const showModalView = useSubjects((state) => state.showModalView);
  const form = Form.useFormInstance();
  const typeDoc = Form.useWatch([name, "Тип документа"], form);

  useEffect(() => {
    setKemVidanOptions([]);
  }, [showModalAdd, showModalView]);

  const handleSerialPassportChange = (e) => {
    const onlyNums = e.target.value.replace(/[^\d]/g, "")
    form.setFieldValue([name, "serialPassport"], onlyNums);
  };
  const handleNumberPassportChange = (e) => {
    const onlyNums = e.target.value.replace(/[^\d]/g, "")
    form.setFieldValue([name, "numberPassport"], onlyNums);
  };

  const handleKodPodrazdeleniaChange = (e) => {
    const onlyNums = e.target.value.replace(/[^\d]/g, "");
    let formattedKod = "";

    if (onlyNums.length <= 3) {
      formattedKod = onlyNums;
    } else if (onlyNums.length > 3 && onlyNums.length <= 6) {
      formattedKod = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    }
    form.setFieldValue([name, "kodPodrazdelenia"], formattedKod);
  };
  if (typeDoc === "Паспорт гражданина РФ") return (
    <div style={{ marginLeft: 20 }}>
      <Form.Item
        label="Серия паспорта"
        name={"Серия паспорта"}
        required={true}
      >
        <Input
          placeholder={"XXXX"}
          onChange={handleSerialPassportChange}
          maxLength={4}
        />
      </Form.Item>
      <Form.Item
        label="Номер паспорта"
        name={"Номер паспорта"}
        required={true}
      >
        <Input
          placeholder={"XXXXXX"}
          onChange={handleNumberPassportChange}
          maxLength={6}
        />
      </Form.Item>
      <Form.Item
        label="Код подразделения"
        name={"Код подразделения"}
        required={true}
      >
        <Input
          placeholder={"XXX-XXX"}
          onChange={handleKodPodrazdeleniaChange}
          maxLength={7}
        />
      </Form.Item>
      <Form.Item
        label="Кем выдан"
        name={"Кем выдан"}
        required={true}
      >
        <AutoComplete
          options={kemVidanOptions}
          style={{ width: "100%" }}
        >
          <Input.TextArea
            placeholder="Наименование подразделения"
            style={{ height: 60 }}
          />
        </AutoComplete>

      </Form.Item>
      <Form.Item
        label="Когда выдан"
        name={ "Когда выдан"}
        required={true}
      >
        <DatePicker
          format="DD.MM.YYYY"
          locale={locale.DatePicker}
          style={{ width: "100%" }}
        />

      </Form.Item>
    </div>
  );
};

export default PassportFields;
