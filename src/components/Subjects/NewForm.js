import React, { useEffect, useState } from "react";
import { Divider, Form, Button, Modal, Flex } from "antd";
import TextInput from "../FormComponents/TextInput";
import CheckboxInput from "../FormComponents/CheckboxInput"
import SelectInput from "../FormComponents/SelectInput";
import AddressInput from "../FormComponents/AddressInput/AddressInput";
import SnilsInput from "../FormComponents/SnilsInput";
import UploaderInput from "../FormComponents/UploaderInput";
import ConfirmationDocumentInput from "../FormComponents/ConfirmationDocumentInput";
import { formItemLayout } from "../../components/configSizeForm";
import useSubjects from "../../stores/Cabinet/useSubjects";
import DateInput from "../FormComponents/DateInput";

const NewForm = ({
  fields,
  read: tempread = false,
  edit: tempedit = false,
  value = {},
  setShowModal,
  form,
  handlerSubmitForm,
  handlerDelete,
  handlerEdit,
}) => {
  const showModalView = useSubjects((state) => state.showModalView);
  const showModalAdd = useSubjects((state) => state.showModalAdd);
  // const [modal, contextHolder] = Modal.useModal();
  const [edit, setEdit] = useState();
  const [read, setRead] = useState();
  useEffect(() => {
    setEdit(tempedit);
    setRead(tempread);
    form.resetFields();
  }, [showModalView, showModalAdd]);
  // useEffect(() => {
  // }, [showModalView])
  // const [form] = Form.useForm();

  const renderField = (field, index) => {
    switch (field.type) {
      case "divider":
        return <Divider key={index}>{field.name}</Divider>;
      case "textInput":
        return (
          <TextInput
            key={index}
            {...field}
            read={read}
            edit={edit}
            value={value[field.name]}
          />
        );
      case "selectInput":
        return (
          <SelectInput
            key={index}
            {...field}
            read={read}
            edit={edit}
            value={value[field.name]}
          />
        );

      case "uploaderInput":
        return (
          <UploaderInput
            key={index}
            {...field}
            value={value[field.name]}
            read={read}
            edit={edit}
          />
        );
      case "addressInput":
        return (
          <AddressInput
            key={index}
            {...field}
            form={form}
            read={read}
            edit={edit}
            value={value[field.name]}
          />
        );
      case "snilsInput":
        return (
          <SnilsInput
            key={index}
            {...field}
            read={read}
            edit={edit}
            value={value[field.name]}
            form={form}
          />
        );
      case "dateInput":
        return (
          <DateInput
            key={index}
            name={field.name}
            displayName={field.displayName}
            placeholder={field.placeholder}
            required={field.required}
            description={field.description}
            value={value[field.name]}
            read={read}
          />
        );
      case "checkboxInput":
        return (
          <CheckboxInput
            key={index}
            name={field.name}
            displayName={field.displayName}
            bindFields={field.bindFields}
            form={form}
            read={read}
          />
        );
      case "confirmationDocumentInput":
        return (
          <ConfirmationDocumentInput
            key={index}
            form={form}
            {...field}
            read={read}
            edit={edit}
            value={value}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Form
        form={form}
        {...formItemLayout}
        onFinish={handlerSubmitForm}
        initialValues={{
          firstname: "qwerty",
        }}
      >
        {fields?.map((field, index) => renderField(field, index))}
        {!read && !edit && (
          <Flex gap="middle">
            <Form.Item>
              <Button type="primary" onClick={() => form.submit()}>
                Добавить
              </Button>{" "}
            </Form.Item>
            <Form.Item>
              <Button onClick={() => setShowModal(false)}>Закрыть</Button>
            </Form.Item>
          </Flex>
        )}
        {edit && (
          <Flex gap="middle">
            <Form.Item>
              <Button type="primary" onClick={() => handlerEdit(value.id)}>
                Обновить
              </Button>{" "}
            </Form.Item>
            <Form.Item>
              <Button onClick={() => setShowModal(false)}>Закрыть</Button>
            </Form.Item>
          </Flex>
        )}
        {read && (
          <Flex gap="middle">
            <Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  setEdit(true);
                  setRead(false);
                  // console.log("Изменить")
                }}
              >
                Изменить
              </Button>{" "}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                danger
                onClick={() => handlerDelete(value.id)}
              >
                Удалить
              </Button>{" "}
            </Form.Item>
            <Form.Item>
              <Button onClick={() => setShowModal(false)}>Закрыть</Button>
            </Form.Item>
          </Flex>
        )}
      </Form>
    </>
  );
};

export default NewForm;
