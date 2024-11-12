import React from "react";
import { Card, Button, Typography } from "antd";
import {
  FilePdfOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const DocumentCard = React.memo(
  ({ document, isModal, handleDocumentClick, confirmDelete, openDocument }) => {
    return (
      <Card
        hoverable
        style={{
          width: 250,
          height: 250,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
        }}
        onClick={() => {
          console.log("Открываем документ с ПутьКФайлу:", document.ПутьКФайлу);
          handleDocumentClick(document);
        }}
      >
        {!isModal && (
          <Button
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            size="small"
            style={{ position: "absolute", top: 10, right: 10 }}
            onClick={(e) => {
              e.stopPropagation();
              confirmDelete(document.Ref_Key);
            }}
          />
        )}

        {isModal && (
          <Button
            type="primary"
            shape="circle"
            icon={<EyeOutlined />}
            size="small"
            style={{ position: "absolute", top: 10, right: 10 }}
            onClick={(e) => {
              e.stopPropagation();
              openDocument(document);
            }}
          />
        )}

        <Text type="secondary" style={{ fontSize: "16px" }}>
          Название:
        </Text>
        <Title level={5} style={{ margin: "8px 0" }}>
          {document.Description}
        </Title>
        <div style={{ margin: "8px 0" }}>
          <FilePdfOutlined style={{ fontSize: "48px", color: "#e37020" }} />
        </div>
        <Text type="secondary">
          Размер файла: {Math.round(document.Размер / 1024)} КБ
        </Text>
      </Card>
    );
  }
);

export default DocumentCard;

// import React from "react";
// import { Card, Button, Typography } from "antd";
// import { FilePdfOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

// const { Title, Text } = Typography;

// const DocumentCard = React.memo(
//   ({ document, isModal, handleDocumentClick, confirmDelete, openDocument }) => {
//     return (
//       <Card
//         hoverable
//         style={{
//           width: 250,
//           height: 250,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           textAlign: "center",
//           position: "relative",
//         }}
//         onClick={() => {
//           console.log(
//             "Открываем документ с ПутьКФайлу:",
//             document.ПутьКФайлу
//           );
//           handleDocumentClick(document);
//         }}
//       >
//         {!isModal && (
//           <Button
//             type="primary"
//             shape="circle"
//             icon={<DeleteOutlined />}
//             size="small"
//             style={{ position: "absolute", top: 10, right: 10 }}
//             onClick={(e) => {
//               e.stopPropagation();
//               confirmDelete(document.Ref_Key);
//             }}
//           />
//         )}

//         {isModal && (
//           <Button
//             type="primary"
//             shape="circle"
//             icon={<EyeOutlined />}
//             size="small"
//             style={{ position: "absolute", top: 10, right: 10 }}
//             onClick={(e) => {
//               e.stopPropagation();
//               openDocument(document);
//             }}
//           />
//         )}

//         <Text type="secondary" style={{ fontSize: "16px" }}>
//           Название:
//         </Text>
//         <Title level={5} style={{ margin: "8px 0" }}>
//           {document.Description}
//         </Title>
//         <div style={{ margin: "8px 0" }}>
//           <FilePdfOutlined
//             style={{ fontSize: "48px", color: "#e37020" }}
//           />
//         </div>
//         <Text type="secondary">
//           Размер файла: {Math.round(document.Размер / 1024)} КБ
//         </Text>
//       </Card>
//     );
//   }
// );

// export default DocumentCard;
