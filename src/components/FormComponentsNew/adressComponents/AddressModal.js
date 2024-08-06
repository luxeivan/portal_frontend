import React, { useEffect, useImperativeHandle, forwardRef } from "react";
import { Modal, Form, Input } from "antd";
import fieldConfig from "./AddressInput.json";

const AddressModal = forwardRef(
  ({ visible, onSave, onCancel, initialValues }, ref) => {
    const [form] = Form.useForm();

    // Используем useImperativeHandle для управления формой из родительского компонента
    useImperativeHandle(ref, () => ({
      setFieldsValue: form.setFieldsValue,
    }));

    useEffect(() => {
      form.setFieldsValue(initialValues);
    }, [initialValues]);

    const handleOk = () => {
      form
        .validateFields()
        .then((values) => {
          onSave(values);
          form.resetFields();
        })
        .catch((info) => {
          console.log("Validation failed:", info);
        });
    };

    return (
      <Modal
        open={visible}
        title="Введите адрес вручную"
        onOk={handleOk}
        onCancel={onCancel}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical" initialValues={initialValues}>
          {fieldConfig.map((field) => (
            <Form.Item name={field.name} label={field.label} key={field.name}>
              <Input placeholder={`Введите ${field.label.toLowerCase()}`} />
            </Form.Item>
          ))}
        </Form>
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
