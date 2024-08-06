import React from "react";
import { Modal, Form, Input } from "antd";
import fieldConfig from "./AddressInput.json";

const AddressModal = ({ visible, onSave, onCancel, initialValues }) => {
  const [form] = Form.useForm();

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
};

export default AddressModal;


// import React from "react";
// import { Modal, Form, Input } from "antd";
// import fieldConfig from "./AddressInput.json";

// const AddressModal = ({ visible, onSave, onCancel }) => {
//   const [form] = Form.useForm();

//   const handleOk = () => {
//     // form
//     //   .validateFields()
//     //   .then((values) => {
//     //     onSave(values);
//     //     form.resetFields();
//     //   })
//     //   .catch((info) => {
//     //     console.log("Validation failed:", info);
//     //   });
//   };

//   return (
//     <Modal
//       open={visible}
//       title="Введите адрес вручную"
//       onOk={onCancel}
//       onCancel={onCancel}
//       okText="Сохранить"
//       cancelText="Отмена"
//     >
//         {fieldConfig.map((field) => (
//           <Form.Item name={field.name} label={field.label} key={field.name}>
//             <Input placeholder={`Введите ${field.label.toLowerCase()}`} />
//           </Form.Item>
//         ))}
//     </Modal>
//   );
// };

// export default AddressModal;
