import React, { useState } from "react";
import { useTheme } from "styled-components";
import {
	CheckBoxChecked,
	CheckBoxUnchecked,
	EditIcon,
	ItemTile,
	ItemTitle,
	ItemTitleWrapper,
	OuterTileContainer,
	TileDivider,
	TileRow,
	TrashIcon,
} from "../../pages/list/ListStyles";
import { IconWrapper } from "../icons/IconWrapper";

const ItemCard = ({
	listId,
	itemId,
	name,
	quantity,
	unit,
	isCompleted,
	handleEditItem,
	handleDeleteItem,
	handleCheckItem,
}) => {
	const theme = useTheme();

	const [checked, setChecked] = useState(isCompleted);

	return (
		<OuterTileContainer>
			<IconWrapper
				bg={theme.colors.lighterBackground}
				p={"0 0 0 2vw"}
				onClick={() => {
					let newValue = !checked;
					setChecked(newValue);
					handleCheckItem({
						itemId: itemId,
						isCompleted: newValue,
					});
				}}
			>
				{checked ? (
					checked && <CheckBoxChecked />
				) : (
					<CheckBoxUnchecked />
				)}
			</IconWrapper>
			<ItemTile>
				<ItemTitleWrapper>
					<ItemTitle checked={checked ? "line-through" : ""}>{ `   ${name}   ` }</ItemTitle>
				</ItemTitleWrapper>
				<TileDivider />

				<TileRow>
					<div>{`${quantity} ${unit}`}</div>
					<IconWrapper
						bg={theme.colors.lighterBackground}
						p={"0 0 0 2vw"}
					>
						<EditIcon
							onClick={() => {
								console.log(
									`Uppdaterar produkt ${itemId} från lista ${listId}`
								);
								handleEditItem({
									itemId: itemId,
									name: name,
									quantity: quantity,
									unit: unit,
								});
							}}
						/>
					</IconWrapper>
				</TileRow>
			</ItemTile>

			<IconWrapper bg={theme.colors.lighterBackground} p={"0 2vw 0 0"}>
				<TrashIcon
					onClick={() => {
						handleDeleteItem(itemId, name);
					}}
				/>
			</IconWrapper>
		</OuterTileContainer>
	);
};

export default ItemCard;
