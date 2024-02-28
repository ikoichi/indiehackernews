import React from "react";
import { Popup, PopupProps } from "./Popup";

export default {
  title: "Popup",
  component: Popup,
  argTypes: { onAsk: { action: "onAsk" } },
};

export const Base = (argTypes: PopupProps) => <Popup {...argTypes} />;

export const Logged = (argTypes: PopupProps) => (
  <Popup {...argTypes} userName="john.doe" />
);
