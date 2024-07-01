import React, { useState } from "react";
import { Divider, Drawer } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import MarkDownText from "../MarkDownText/MarkDownText";

function DividerForm({ label, fullDescription }) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => setDrawerVisible(true);
  const onClose = () => setDrawerVisible(false);

  return (
    <>
      <Divider>
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
}

export default DividerForm;
