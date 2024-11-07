import React, { useState } from "react";
import { Row, Col, Card, Button, Tag, Divider, theme } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import DocumentSelectModal from "./DocumentSelectModal";
// Удаляем импорт useGlobal, так как будем использовать токены темы

const DocumentAttachments = ({ form, categoriesFiles }) => {
  const [documentModalVisible, setDocumentModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { token } = theme.useToken(); // Получаем токены темы

  const handleSelectDocument = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setDocumentModalVisible(true);
  };

  const handleDocumentSelected = (document) => {
    console.log(
      `Пользователь выбрал документ для категории ${selectedCategory}:`,
      document
    );
    form.setFieldsValue({ [`document_${selectedCategory}`]: document });
    setDocumentModalVisible(false);
  };

  console.log("Категории в заявке categoriesFiles", categoriesFiles);

  return (
    <>
      <Divider>Файлы</Divider>
      <Row gutter={[16, 16]}>
        {categoriesFiles &&
          categoriesFiles.map((item, index) => {
            const isAttached = form.getFieldValue(
              `document_${item.category_Key}`
            );
            return (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card
                  bordered
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "8px",
                    backgroundColor: isAttached
                      ? token.colorSuccessBg
                      : token.colorBgContainer,
                    // Используем токены темы для цвета фона
                  }}
                  bodyStyle={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  {/* Верхняя часть карточки */}
                  <div style={{ flex: 1 }}>
                    {/* Заголовок с иконкой */}
                    <Card.Meta
                      avatar={
                        <FileTextOutlined
                          style={{
                            fontSize: "24px",
                            color: token.colorPrimary,
                          }}
                        />
                      }
                      title={
                        <div style={{ whiteSpace: "normal" }}>
                          {item.categoryName}
                        </div>
                      }
                      description={item.shortDescription || ""}
                      style={{ marginBottom: 16 }}
                    />
                    {/* Отображение названия выбранного документа */}
                    {isAttached && (
                      <div style={{ marginBottom: 16 }}>
                        <strong>Документ:</strong>{" "}
                        {
                          form.getFieldValue(`document_${item.category_Key}`)
                            .Description
                        }
                      </div>
                    )}
                  </div>
                  {/* Нижняя часть карточки с плашкой и кнопкой */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {isAttached ? (
                      <Tag color="success" style={{ marginRight: "auto" }}>
                        Прикреплено
                      </Tag>
                    ) : (
                      <Tag color="error" style={{ marginRight: "auto" }}>
                        Не прикреплено
                      </Tag>
                    )}
                    <Button
                      type="primary"
                      onClick={() => handleSelectDocument(item.category_Key)}
                    >
                      {isAttached ? "Изменить" : "Выбрать"}
                    </Button>
                  </div>
                </Card>
              </Col>
            );
          })}
      </Row>

      <DocumentSelectModal
        visible={documentModalVisible}
        onClose={() => setDocumentModalVisible(false)}
        categoryKey={selectedCategory}
        onSelectDocument={handleDocumentSelected}
      />
    </>
  );
};

export default DocumentAttachments;

// import React, { useState } from "react";
// import { Row, Col, Card, Button, Tag, Divider } from "antd";
// import { FileTextOutlined } from "@ant-design/icons";
// import DocumentSelectModal from "./DocumentSelectModal";

// const DocumentAttachments = ({ form, categoriesFiles }) => {
//   const [documentModalVisible, setDocumentModalVisible] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const handleSelectDocument = (categoryKey) => {
//     setSelectedCategory(categoryKey);
//     setDocumentModalVisible(true);
//   };

//   const handleDocumentSelected = (document) => {
//     console.log(
//       `Пользователь выбрал документ для категории ${selectedCategory}:`,
//       document
//     );
//     form.setFieldsValue({ [`document_${selectedCategory}`]: document });
//     setDocumentModalVisible(false);
//   };

//   console.log("Категории в заявке categoriesFiles", categoriesFiles);

//   return (
//     <>
//       <Divider>Файлы</Divider>
//       <Row gutter={[16, 16]}>
//         {categoriesFiles &&
//           categoriesFiles.map((item, index) => (
//             <Col xs={24} sm={12} md={8} key={index}>
//               <Card
//                 bordered
//                 style={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   borderRadius: "8px",
//                   boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//                   backgroundColor: form.getFieldValue(
//                     `document_${item.category_Key}`
//                   )
//                     ? "#e6ffe6"
//                     : "#fff",
//                 }}
//                 bodyStyle={{
//                   display: "flex",
//                   flexDirection: "column",
//                   flex: 1,
//                 }}
//               >
//                 {/* Верхняя часть карточки */}
//                 <div style={{ flex: 1 }}>
//                   {/* Заголовок с иконкой */}
//                   <Card.Meta
//                     avatar={
//                       <FileTextOutlined
//                         style={{ fontSize: "24px", color: "#1890ff" }}
//                       />
//                     }
//                     title={
//                       <div style={{ whiteSpace: "normal" }}>
//                         {item.categoryName}
//                       </div>
//                     }
//                     description={item.shortDescription || ""}
//                     style={{ marginBottom: 16 }}
//                   />
//                   {/* Отображение названия выбранного документа */}
//                   {form.getFieldValue(`document_${item.category_Key}`) && (
//                     <div style={{ marginBottom: 16 }}>
//                       <strong>Документ:</strong>{" "}
//                       {
//                         form.getFieldValue(`document_${item.category_Key}`)
//                           .Description
//                       }
//                     </div>
//                   )}
//                 </div>
//                 {/* Нижняя часть карточки с плашкой и кнопкой */}
//                 <div style={{ display: "flex", alignItems: "center" }}>
//                   {form.getFieldValue(`document_${item.category_Key}`) ? (
//                     <Tag color="green" style={{ marginRight: "auto" }}>
//                       Прикреплено
//                     </Tag>
//                   ) : (
//                     <Tag color="red" style={{ marginRight: "auto" }}>
//                       Не прикреплено
//                     </Tag>
//                   )}
//                   <Button
//                     type="primary"
//                     onClick={() => handleSelectDocument(item.category_Key)}
//                   >
//                     {form.getFieldValue(`document_${item.category_Key}`)
//                       ? "Изменить"
//                       : "Выбрать"}
//                   </Button>
//                 </div>
//               </Card>
//             </Col>
//           ))}
//       </Row>

//       <DocumentSelectModal
//         visible={documentModalVisible}
//         onClose={() => setDocumentModalVisible(false)}
//         categoryKey={selectedCategory}
//         onSelectDocument={handleDocumentSelected}
//       />
//     </>
//   );
// };

// export default DocumentAttachments;
