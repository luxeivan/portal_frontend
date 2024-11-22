import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { Modal, Form, Input } from "antd";
import fieldConfig from "./AddressInput.json";

const AddressModal = forwardRef(
  ({ visible, onSave, onCancel, initialValues, name }, ref) => {
    const form = Form.useFormInstance();

    // Используем useImperativeHandle для управления формой из родительского компонента
    useImperativeHandle(ref, () => ({
      setFieldsValue: form.setFieldsValue,
    }));

    useEffect(() => {
      form.setFieldsValue(initialValues);
    }, [initialValues]);

    const handleOk = () => {
      let fullString = ''
      fieldConfig.forEach(field => {
        let currString = form.getFieldValue([name, field.name])
        if (currString) fullString = fullString + currString + ', '
      })
      // console.log('name: ',name)
      form.setFieldValue([name, 'fullAddress'], fullString)
      onCancel()
    };

    return (
      <Modal
        closable={false}
        open={visible}
        title="Введите адрес вручную"
        onOk={handleOk}
        onCancel={onCancel}
        okText="Сохранить"
        
        // cancelText="Отмена"
      >
        {fieldConfig.map((field) => (
          <Form.Item name={field.name} label={field.label} key={field.name} layout="vertical">
            {field.type==="textArea"?<Input.TextArea placeholder={`Введите ${field.label.toLowerCase()}`} />:<Input placeholder={`Введите ${field.label.toLowerCase()}`} />}
          </Form.Item>
        ))}
      </Modal>
    );
  }
);

export default AddressModal;

// import React from "react";
// import { Modal, Form, Input } from "antd";
// import fieldConfig from "./AddressInput.json";

// const AddressModal = ({ visible, onSave, onCancel, initialValues }) => {
//   const [form] = Form.useForm();

//   const handleOk = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         onSave(values);
//         form.resetFields();
//       })
//       .catch((info) => {
//         console.log("Validation failed:", info);
//       });
//   };

//   return (
//     <Modal
//       open={visible}
//       title="Введите адрес вручную"
//       onOk={handleOk}
//       onCancel={onCancel}
//       okText="Сохранить"
//       cancelText="Отмена"
//     >
//       <Form form={form} layout="vertical" initialValues={initialValues}>
//         {fieldConfig.map((field) => (
//           <Form.Item name={field.name} label={field.label} key={field.name}>
//             <Input placeholder={`Введите ${field.label.toLowerCase()}`} />
//           </Form.Item>
//         ))}
//       </Form>
//     </Modal>
//   );
// };

// export default AddressModal;
