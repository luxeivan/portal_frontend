// src/components/FormComponentsNew/Notifications/NotificationPanel.js

import React from "react";
import { Timeline, Typography, Button, Space } from "antd";
import { NotificationOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import useNotifications from "../../../stores/useNotifications";

const { Text } = Typography;

const NotificationPanel = () => {
  const { notifications } = useNotifications();

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto", padding: "16px" }}>
      {notifications.length > 0 ? (
        <Timeline mode="left">
          {notifications.map((item) => (
            <Timeline.Item
              key={item.id}
              dot={<NotificationOutlined style={{ fontSize: "20px" }} />}
              color={item.read ? "gray" : "blue"}
            >
              <Space direction="vertical" size="small">
                <Text strong={!item.read} style={{ fontSize: "16px" }}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: "14px" }}>{item.message}</Text>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  <ClockCircleOutlined /> {new Date(item.date).toLocaleString()}
                </Text>
                <Button type="link" size="small">
                  <Link
                    to={
                      item.applicationId
                        ? `/applications/${item.applicationId}`
                        : "#"
                    }
                  >
                    Перейти к заявке
                  </Link>
                </Button>
              </Space>
            </Timeline.Item>
          ))}
        </Timeline>
      ) : (
        <Text>У вас нет уведомлений</Text>
      )}
    </div>
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
