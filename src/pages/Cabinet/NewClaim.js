import { Form, Typography, Button, Drawer, Descriptions } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useNewClaim from "../../stores/Cabinet/useNewClaim";
import TextInput from "../../components/FormComponentsNew/TextInput";
import NumberInput from "../../components/FormComponentsNew/NumberInput";
import SliderInput from "../../components/FormComponentsNew/SliderInput";
import SelectInput from "../../components/FormComponentsNew/SelectInput";
import DividerForm from "../../components/FormComponentsNew/DividerForm";
import SubjectInput from "../../components/FormComponents/SubjectInput";
import CheckboxInput from "../../components/FormComponents/CheckboxInput";
import TableInput from "../../components/FormComponentsNew/TableInput";
import DateInput from "../../components/FormComponentsNew/DateInput";
import AppHelmet from "../../components/Global/AppHelmet";
import moment from "moment";

const { Title, Paragraph, Text } = Typography;
export default function NewClaim() {
  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState(false);
  const claim = useNewClaim((state) => state.claim);
  const fetchClaim = useNewClaim((state) => state.fetchClaim);
  const createClaim = useNewClaim((state) => state.createClaim);
  const newClaim = useNewClaim((state) => state.newClaim);
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    fetchClaim(id);
  }, []);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  //console.log(claim)
  const onFinish = (values) => {
    console.log(values);
    const arr = [];
    for (const [key, value] of Object.entries(values)) {
      // console.log(`${key}: ${value}`);
      if (typeof value === "object" && Object.hasOwn(value, "$d")) {
        values[key] = moment(value).format();
      }
    }
    // values.map(item => {
    //     if (typeof item === 'object' && Object.hasOwn(item, '$d')) {

    //     }
    //     return item
    // })
    setFormValue(values);
    createClaim({ service: claim.Ref_Key, values });
    showDrawer();
  };
  // const onValuesChange = (changedValues, allValues) => {
  //     console.log("changedValues",changedValues)
  //     console.log("allValues",allValues)
  // }
  // const onFieldsChange = (changedFields, allFields) => {
  //     console.log("changedFields",changedFields)
  //     console.log("allFields",allFields)
  // }
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };
  console.log(claim);
  return (
    <div>
      <>
        <Drawer
          title="Поля формы"
          placement="bottom"
          closable={false}
          onClose={onClose}
          open={open}
          key="bottom"
        >
          {Object.keys(formValue).map((item) => {
            // console.log(item)
          })}
          {/* <Descriptions
                            bordered
                            title="Данные для отправки в 1С"
                            items={Object.keys(formValue)
                                .filter((item, index) => formValue[item] && typeof formValue[item] != 'boolean')
                                .map((item, index) => ({
                                    key: index,
                                    label: item,
                                    children: formValue[item],
                                }))} /> */}
          {/* <Paragraph><pre>{JSON.stringify(formValue)}</pre></Paragraph> */}
          <Paragraph>Данные вывелись в консоле</Paragraph>
        </Drawer>
      </>
      
    </div>
  );
}
