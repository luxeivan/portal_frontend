import React, { useState } from "react";
import { Divider, Drawer, Typography, Flex, theme } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import MarkDownText from "../MarkDownText/MarkDownText";
import styles from './divider.module.css'

function DividerForm({ label, fullDescription, variant = "solid", borderColor = "gray", dashed = false, type = "horizontal", orientation = "center", }) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { token } = theme.useToken();
  // console.log(token);

  const dividerWrapColor = token.colorBorder
  const showDrawer = () => setDrawerVisible(true);
  const onClose = () => setDrawerVisible(false);
  if (fullDescription) {
    return
  }
  if (fullDescription) {
    return (
      <>
        <Divider
          style={{
            borderColor: token.dividerWrapColor,
            margin: 0,
            whiteSpace: "pre-wrap"
          }}
          dashed={dashed}
          variant={variant}
          type={type}
          orientation={orientation}
          orientationMargin="0"
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
    return <>
      {/* <Divider
      style={{
        borderColor: "gray",
        margin: 0,
        whiteSpace: "pre-wrap"
      }}
      orientation={orientation}
      orientationMargin="0"
      dashed={dashed}
      variant={variant}
      type={type}
      /> */}
      <Flex style={{ width: "100%" }} align="center" justify="space-between">
        {!orientation==="left" && <div className={styles.dividerWrap} style={{ backgroundColor: dividerWrapColor }}></div>}
        {label && <div className={styles.dividerTitle} style={{paddingLeft:orientation==="left"? 0 : false}}>{label}</div>}
        <div className={styles.dividerWrap} style={{ backgroundColor: dividerWrapColor }}></div>

      </Flex>
    </>
  }
}

export default DividerForm;
