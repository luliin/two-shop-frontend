import React from "react";
import { FormDivider, InputRow } from "../FormStyled";

const DeleteForm = () => {
	return (
		<>
			<InputRow mt={"1em"}>Är du säker? Det går inte att ångra.</InputRow>
			<FormDivider mt={"2em"} mb={"0.5em"} width={"min(300px, 67vw)"} />
		</>
	);
};

export default DeleteForm;
