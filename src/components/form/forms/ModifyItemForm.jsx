import React from "react";
import { QuantityIcon, UnitIcon } from "../../../pages/list/ListStyles";
import { itemSelectOptions } from "../../../util/DataObjects";
import { Theme } from "../../app/AppStyles";
import { InputField, LabelStyled, Select } from "../../input/FormInputStyles";
import { InputRow, ListIcon } from "../FormStyled";

const ModifyItemForm = ({
	item,
	handleCreateItemInput,
	isNameError,
	setIsNameError,
}) => {
	return (
		<>
			<InputRow>
				<LabelStyled htmlFor="item-name">
					<ListIcon title="Ange produktnamn" />
				</LabelStyled>
				<InputField
					onFocus={() => {
						setIsNameError(false);
					}}
					value={item.name}
					id="item-name"
					width={"min(260px, 56vw)"}
					autoComplete="off"
					type="text"
					placeholder={"Produktens namn"}
					name="name"
					required
					onChange={(e) => {
						handleCreateItemInput(e);
					}}
				/>
			</InputRow>
			{isNameError && (
				<InputRow color={Theme.colors.deleteRed} gap={"0.2em"}>
					Namnet får inte vara blankt
				</InputRow>
			)}

			<InputRow>
				<LabelStyled htmlFor="item-quantity">
					<QuantityIcon title="Antal" />
				</LabelStyled>
				<InputField
					value={item.quantity}
					id="item-quantity"
					width={"min(260px, 56vw)"}
					autoComplete="off"
					type="number"
					inputMode={"decimal"}
					step="0.01"
					maxLength={6}
					placeholder={"Antal"}
					name="quantity"
					required
					onChange={(e) => {
						handleCreateItemInput(e);
					}}
				/>
			</InputRow>
			<InputRow>
				<LabelStyled htmlFor="unit">
					<UnitIcon title="Enhet" fs={"24px"} color={"light"} />
				</LabelStyled>
				<Select
					name="unit"
					value={item.unit}
					width={"min(260px, 56vw)"}
					onChange={(e) => {
						handleCreateItemInput(e);
					}}
				>
					<option value="" disabled>
						Välj enhet...
					</option>

					{itemSelectOptions.map((selectOption) =>
						!selectOption.optGroup ? (
							<option
								key={selectOption}
								value={selectOption.label}
							>
								{selectOption.label}
							</option>
						) : (
							<optgroup
								key={selectOption.optGroup}
								label={selectOption.optGroup}
							>
								{selectOption.list.map((option) => (
									<option
										key={option.label}
										value={option.label}
									>
										{option.label}
									</option>
								))}
							</optgroup>
						)
					)}
				</Select>
			</InputRow>
		</>
	);
};

export default ModifyItemForm;
