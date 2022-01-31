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

const ItemCard = ({ listId, itemId, name, quantity, unit, isCompleted }) => {
	const theme = useTheme();

	const [checked, setChecked] = useState(isCompleted);

	return (
		<OuterTileContainer>
			<IconWrapper
				bg={theme.colors.lighterBackground}
				p={"0 0 0 2vw"}
				onClick={() => {
					setChecked(!checked);
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
					<ItemTitle>{name}</ItemTitle>
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
							}}
						/>
					</IconWrapper>
				</TileRow>
			</ItemTile>

			<IconWrapper bg={theme.colors.lighterBackground} p={"0 2vw 0 0"}>
				<TrashIcon
					onClick={() => {
						console.log(
							`Tar bort produkt ${itemId} från lista ${listId}`
						);
					}}
				/>
			</IconWrapper>
		</OuterTileContainer>
	);
};

export default ItemCard;
