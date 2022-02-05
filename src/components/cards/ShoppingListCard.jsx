import React from "react";
import { useNavigate } from "react-router-dom";
import {
	CardLine,
	CollaboratorIcon,
	CollaboratorsText,
	ListCard,
	ListTitle,
	OwnerIcon,
	TextWrapper,
} from "./ShoppingListCardStyles";

import Avatar from "./../avatar/Avatar";

const ShoppingListCard = ({ id, name, isOwner, owner, collaborator }) => {
	let navigate = useNavigate();

	const handleCardClick = () => {
		navigate(`/lists/${id}`, {
			state: { id },
		});
	};

	return (
		<ListCard
			key={id}
			whileHover={{ scale: 1.03 }}
			onClick={handleCardClick}
		>
			<TextWrapper p={"1em"} maxH={"50%"} height={"50%"}>
				<ListTitle>{name}</ListTitle>
			</TextWrapper>
			<CardLine />
			<TextWrapper
				p={"1em"}
				mt={""}
				d={"flex"}
				direction={"column"}
				justify={"space-between"}
				maxH={"49%"}
				height={"49%"}
			>
				<CollaboratorsText>Deltagare</CollaboratorsText>

				<TextWrapper
					d={"flex"}
					align={"center"}
					mt={"1vh"}
					color={"white"}
				>
					{isOwner ? (
						isOwner && (
							<>
								<Avatar
									{...{
										username: owner,
										owner: isOwner,
									}}
								/>
								<OwnerIcon />
								{collaborator && (
									<>
										<Avatar
											{...{
												username: collaborator,
												owner: !isOwner,
											}}
										/>
									</>
								)}
							</>
						)
					) : (
						<>
							<Avatar
								{...{
									username: collaborator,
									owner: !isOwner,
								}}
							/>
							<CollaboratorIcon />
							<Avatar
								{...{
									username: owner,
									owner: isOwner,
								}}
							/>
						</>
					)}
				</TextWrapper>
			</TextWrapper>
		</ListCard>
	);
};

export default ShoppingListCard;
