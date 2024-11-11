import React, { useState } from "react";
import { Divider, Drawer } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import MarkDownText from "../MarkDownText/MarkDownText";
import styles from './divider.module.css'

function DividerForm({ label, fullDescription, type = "horizontal", orientation = "center", }) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const onClose = () => setDrawerVisible(false);
  if (fullDescription) {
    return (
      <>
        <Divider
          style={{ whiteSpace: "pre-wrap" }}
          type={type}
          orientation={orientation}
        >
          {label}
          <InfoCircleOutlined
            onClick={showDrawer}
            style={{ marginLeft: 10, color: "rgba(0, 0, 0, 0.45)" }}
          />
        </Divider>
        <Drawer
          title={label}
          placement="right"
          onClose={onClose}
          open={drawerVisible}
        >
          <MarkDownText>
            {fullDescription}
          </MarkDownText>
        </Drawer>
      </>
    );
  } else {
    return <Divider
      orientation={orientation}
      // style={{ whiteSpace: "pre-wrap" }}
      type={"horizontal"}
    >{label}</Divider>
  }
}

export default DividerForm;
