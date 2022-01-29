import React from "react";
import {
	CardLine,
	CollaboratorIcon,
	CollaboratorsText,
	ListCard,
	ListTitle,
	OwnerIcon,
	TextWrapper,
} from "./ShoppingListCardStyles";

const ShoppingListCard = (list) => {
	return (
		<ListCard>
			<TextWrapper p={"1em"} maxH={"50%"} height={"50%"}>
				<ListTitle>{list.name}</ListTitle>
			</TextWrapper>
			<CardLine />
			<TextWrapper p={"1em"} mt={""}>
				<CollaboratorsText>Deltagare</CollaboratorsText>
			</TextWrapper>
			<TextWrapper p={"1em"} mt={""} color={"white"}>
				<CollaboratorIcon />
				<OwnerIcon />
			</TextWrapper>
		</ListCard>
	);
};

export default ShoppingListCard;
