// src/components/FormComponentsNew/Notifications/NotificationPanel.js

import React from "react";
import { List, Divider, Space, Typography } from "antd";
import { NotificationOutlined, ClockCircleOutlined } from "@ant-design/icons";
import useNotifications from "../../../stores/useNotifications";

const { Text } = Typography;

const NotificationPanel = () => {
  const { notifications } = useNotifications();

  return (
    <>
      {notifications.length > 0 ? (
        <List
          dataSource={notifications}
          locale={{ emptyText: "У вас нет уведомлений" }}
          renderItem={(item) => (
            <>
              <List.Item>
                <List.Item.Meta
                  avatar={<NotificationOutlined style={{ fontSize: "24px" }} />}
                  title={<Text strong={!item.read}>{item.title}</Text>}
                  description={
                    <Space direction="vertical">
                      <Text>{item.message}</Text>
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        <ClockCircleOutlined />{" "}
                        {new Date(item.date).toLocaleString()}
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
              <Divider style={{ margin: "8px 0" }} />
            </>
          )}
        />
      ) : (
        <Text>У вас нет уведомлений</Text>
      )}
    </>
  );
};

export default NotificationPanel;

// import React from "react";
// import { List, Avatar, Button, Badge } from "antd";
// import { NotificationOutlined } from "@ant-design/icons";
// import useNotifications from "../../../stores/useNotifications";
// import styles from "./NotificationPanel.module.css";

// const NotificationPanel = () => {
//   const { notifications, markAsRead } = useNotifications();

//   const handleMarkAsRead = (id) => {
//     markAsRead(id);
//   };

//   return (
//     <div className={styles.notificationPanel}>
//       <List
//         itemLayout="horizontal"
//         dataSource={notifications}
//         locale={{ emptyText: "У вас нет уведомлений" }}
//         renderItem={(item) => (
//           <List.Item
//             className={!item.read ? styles.unread : ""}
//             actions={[
//               !item.read && (
//                 <Button
//                   type="link"
//                   size="small"
//                   onClick={() => handleMarkAsRead(item.id)}
//                 >
//                   Пометить как прочитанное
//                 </Button>
//               ),
//             ]}
//           >
//             <List.Item.Meta
//               avatar={<Avatar icon={<NotificationOutlined />} />}
//               title={item.title}
//               description={item.message}
//             />
//             <div className={styles.notificationDate}>
//               {new Date(item.date).toLocaleString()}
//             </div>
//           </List.Item>
//         )}
//       />
//     </div>
//   );
// };

// export default NotificationPanel;
