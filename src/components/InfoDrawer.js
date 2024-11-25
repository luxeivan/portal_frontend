import React, { useState } from "react";
import { Button, Drawer, Flex, Modal, Typography } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import MarkDownText from "./MarkDownText/MarkDownText";

const { Text, Title } = Typography;

const InfoDrawer = ({ fullDescription, children: label }) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const showDrawer = () => setDrawerVisible(true);
    const onClose = () => setDrawerVisible(false);
    console.log("fullDescription: ",fullDescription)
    return (
        <>
            {label}
            <InfoCircleOutlined
                onClick={showDrawer}
                style={{  color: "rgba(0, 0, 0, 0.45)",transform:"translate(3px, -5px)" }}
            />
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
};

export default InfoDrawer;
