import React, { useState } from "react";
import { Divider, Drawer } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import MarkDownText from "../MarkDownText/MarkDownText";
import styles from './divider.module.css'

function DividerForm({ label, fullDescription, variant = "solid", borderColor = "gray", dashed = false, type = "horizontal", orientation = "center", }) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const onClose = () => setDrawerVisible(false);
  if (fullDescription) {
    return (
      <>
        <Divider
          style={{ borderColor: "gray" }}
          dashed={dashed}
          variant={variant}
          type={type}
          orientation={orientation}
          orientationMargin="0"
          // style={{ whiteSpace: "pre-wrap" }}
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
      style={{ borderColor: "gray" }}
      orientation={orientation}
      orientationMargin="0"
      dashed={dashed}
      variant={variant}
      type={type}
      // style={{ whiteSpace: "pre-wrap" }}
    >{label}</Divider>
  }
}

export default DividerForm;
