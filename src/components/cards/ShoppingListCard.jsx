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

import Avatar from "./../avatar/Avatar";

const ShoppingListCard = (list) => {
	return (
		<ListCard key={list.id}
			whileHover={{scale: 1.03}}
		>
			<TextWrapper p={"1em"} maxH={"50%"} height={"50%"}>
				<ListTitle>{list.name}</ListTitle>
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
					{list.isOwner ? (
						list.isOwner && (
							<>
								<Avatar
									{...{
										username: list.owner,
										owner: list.isOwner,
									}}
								/>
								<OwnerIcon />
								{list.collaborator && (
									<>
										<Avatar
											{...{
												username: list.collaborator,
												owner: !list.isOwner,
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
									username: list.owner,
									owner: !list.isOwner,
								}}
							/>
							<CollaboratorIcon />
							<Avatar
								{...{
									username: list.collaborator,
									owner: list.isOwner,
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
