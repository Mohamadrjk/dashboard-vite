"use client";
import React from "react";
import { Tabs } from "antd";
import clsx from "clsx";
import styles from "./tab-panel.module.css";
import type { TabsProps } from "antd";



const GeneralTabPanel: React.FC<{ items?: TabsProps['items'] }> = ({ items }) => (
    <Tabs
        className={clsx("!font-Regular grow", styles["tab-panel"])}
        tabBarGutter={10}
        defaultActiveKey="1"
        items={items}
    />
);

export default GeneralTabPanel;
