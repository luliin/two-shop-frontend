import { WideButtonStyled } from "./WideButtonStyled";
import React from "react";

const WideButton = ({label: text}) => {
	return <WideButtonStyled>{text}</WideButtonStyled>;
};

export default WideButton;
