import React from "react";
import { InputField, LabelStyled } from "../../input/FormInputStyles";
import { InputRow } from "../FormStyled";
import { CollaboratorIcon } from "../../cards/ShoppingListCardStyles";
import { Theme } from "../../app/AppStyles";

export const InviteCollaboratorForm = ({
	newCollaboratorCredential,
	isNameError,
	setIsNameError,
	isNoSuchUser,
	setIsNoSuchUser,
	handleNewCollaboratorInput,
}) => {
	return (
		<>
			<InputRow>Vem vill du samarbeta med?</InputRow>
			<InputRow>Ange användarnamn eller e-post nedan</InputRow>
			<InputRow>
				<LabelStyled htmlFor="collaborator">
					<CollaboratorIcon
						color={""}
						title="Kollaboratörens användarnamn eller e-post"
					/>
				</LabelStyled>
				<InputField
					onFocus={() => {
						setIsNameError(false);
						setIsNoSuchUser(false);
					}}
					value={newCollaboratorCredential}
					id="collaborator"
					width={"min(250px, 56vw)"}
					autoComplete="off"
					type="text"
					placeholder={"Användarnamn eller e-post"}
					name="name"
					required
					onChange={(e) => {
						handleNewCollaboratorInput(e);
					}}
				/>
			</InputRow>
			{isNameError && (
				<InputRow color={Theme.colors.deleteRed} gap={"0.2em"}>
					Namnet får inte vara blankt
				</InputRow>
			)}
			{isNoSuchUser && (
				<InputRow color={Theme.colors.deleteRed} gap={"0.2em"}>
					Det finns ingen sån användare
				</InputRow>
			)}
		</>
	);
};
