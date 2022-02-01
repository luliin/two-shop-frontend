import React from "react";
import { FormDivider, InputRow } from "../FormStyled";

const DeleteForm = () => {
	return (
		<>
			<InputRow>Är du säker? Det går inte att ångra.</InputRow>
			<FormDivider mt={"20px"} mb={"20px"} width={"min(300px, 67vw)"} />
		</>
	);
};

export default DeleteForm;
