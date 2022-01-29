import React, { useState } from "react";
import ShoppingListCard from "../../components/cards/ShoppingListCard";
import { buttonVariants } from "../../util/AnimationVariants";
import {
	CollaboratorIcon,
	OwnerIcon,
} from "../../components/cards/ShoppingListCardStyles";
import {
	HubContainer,
	OuterContainer,
	TopBar,
	IconWithLabel,
	RoundButton,
	ModalContainer,
	Model,
} from "./HubStyles";

const testList = {
	name: "Testlistan",
	owner: "luliin",
	collaborator: "Lekkit",
};

const ShoppingListHubPage = () => {
	const [show, setShow] = useState(false);

	const handleCreateNewList = () => {
		console.log("Klick");
		setShow(!show);
	};
	const [hover, setHover] = useState(false);
	return (
		<>
			<TopBar>
				<IconWithLabel>
					{<OwnerIcon pt={""} />} = Ägs av dig
				</IconWithLabel>
				<IconWithLabel>
					{<CollaboratorIcon pt={""} />} = Delas med dig
				</IconWithLabel>
			</TopBar>
			<OuterContainer>
				<HubContainer>
					<ShoppingListCard {...testList}></ShoppingListCard>
					<ShoppingListCard {...testList}></ShoppingListCard>
					<ShoppingListCard {...testList}></ShoppingListCard>
					<ShoppingListCard></ShoppingListCard>
					<ShoppingListCard></ShoppingListCard>
					<ShoppingListCard></ShoppingListCard>
					<ShoppingListCard></ShoppingListCard>
					<RoundButton
						onClick={handleCreateNewList}
						variants={buttonVariants}
						whileHover={buttonVariants.hover}
						type="button"
						title="Skapa ny lista"
					>
						+
					</RoundButton>
				</HubContainer>
				{show && (
					<Model
						show={show}
						onClick={(e) => {
							console.log(e);
							if (!hover) {
								setShow(false);
							}
						}}
					>
						<ModalContainer
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							onMouseEnter={() => {
								setHover(true);
							}}
							onMouseLeave={() => {
								setHover(false);
							}}
							
						></ModalContainer>
					</Model>
				)}
			</OuterContainer>
		</>
	);
};

export default ShoppingListHubPage;
