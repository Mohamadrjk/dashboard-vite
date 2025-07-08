import { Switch, SwitchProps } from "antd";
import React from "react";
import Styles from "./toggleSwitch.module.css";
function ToggleSwitch(props: SwitchProps) {
  return <Switch className={Styles["ToggleSwitch"]} {...props} />;
}

export default ToggleSwitch;
