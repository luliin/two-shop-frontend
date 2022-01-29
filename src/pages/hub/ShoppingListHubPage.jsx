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
import { AnimatePresence } from "framer-motion";
import {
	FormDivider,
	FormHeading,
	FormStyled,
	InputRow,
	ListIcon,
} from "../../components/form/FormStyled";
import {
	InputField,
	LabelStyled,
} from "../../components/input/FormInputStyles";
import { WideButtonStyled } from "../../components/buttons/WideButtonStyled";

const testList = {
	name: "Testlistan",
	owner: "luliin",
	collaborator: "Lekkit",
	isOwner: true,
	id: 1,
};

const testList2 = {
	name: "Testlistan 2",
	owner: "luliin",
	collaborator: null,
	isOwner: true,
	id: 4,
};

const testList3 = {
	name: "Testlistan 2",
	owner: "Lekkit",
	collaborator: "luliin",
	isOwner: false,
	id: 3,
};

const listArray = [testList, testList2, testList3];

const ShoppingListHubPage = () => {
	const [listName, setListName] = useState("");
	const [collaboratorCredential, setCollaboratorCredential] = useState("");
	const [show, setShow] = useState(false);
	const [hover, setHover] = useState(false);

	const handleShowModal = () => {
		setShow(!show);
	};

	const handleCreateShoppingList = (e) => {
		e.preventDefault();
		let createShoppingListInput = {
			name: listName,
			collaboratorCredential: collaboratorCredential,
		};
		console.log(createShoppingListInput);
	};
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
					{listArray.map((list) => (
						<ShoppingListCard {...list} key={list.id} />
					))}

					<RoundButton
						onClick={handleShowModal}
						variants={buttonVariants}
						whileHover={buttonVariants.hover}
						type="button"
						title="Skapa ny lista"
					>
						+
					</RoundButton>
				</HubContainer>
				<AnimatePresence>
					{show && (
						<Model
							exit={{ opacity: 0 }}
							key="backdrop"
							transition={{ duration: 0.2 }}
							show={"show"}
							onClick={() => {
								if (!hover) {
									setShow(false);
								}
							}}
						>
							<ModalContainer
								exit={{ y: "-200vh" }}
								key="modal"
								initial={{
									opacity: 0,
									x: "-50%",
									y: "-50%",
								}}
								animate={{
									opacity: 1,
									x: "-50%",
									y: "-50%",
								}}
								onMouseEnter={() => {
									setHover(true);
								}}
								onMouseLeave={() => {
									setHover(false);
								}}
							>
								<FormHeading>Skapa ny lista</FormHeading>
								<FormStyled onSubmit={handleCreateShoppingList}>
									<InputRow>
										<LabelStyled htmlFor="listname">
											<ListIcon title="Ange namnet du vill ge den nya shoppinglistan" />
										</LabelStyled>
										<InputField
											id="new-list-name"
											width={"min(250px, 56vw)"}
											autoComplete="off"
											type="text"
											placeholder={"Listans namn"}
											name="listname"
											required
											onChange={(e) =>
												setListName(e.target.value)
											}
										/>
									</InputRow>
									<InputRow>
										Vill du samarbeta med någon?
									</InputRow>
									<InputRow>
										Ange e-post eller användarnamn till hen
									</InputRow>
									<InputRow>
										<LabelStyled htmlFor="collaborator">
											<CollaboratorIcon
												title="Användarnamn eller e-post till kollaboratör"
												fs={"24px"}
												color={"light"}
											/>
										</LabelStyled>
										<InputField
											width={"min(250px, 56vw)"}
											autoComplete="off"
											type="text"
											placeholder={
												"Användarnamn eller e-post"
											}
											name="collaborator"
											onChange={(e) =>
												setCollaboratorCredential(
													e.target.value
												)
											}
										/>
									</InputRow>
									<WideButtonStyled
										width={"min(300px, 67vw)"}
										whileHover={buttonVariants.hover}
										whileTap={buttonVariants.tapGlow}
									>
										{"Bekräfta"}
									</WideButtonStyled>
								</FormStyled>
								<FormDivider
									mt={"20px"}
									mb={"20px"}
									width={"min(300px, 67vw)"}
								/>
								<InputRow>
									Du kan även bjuda in någon till listan
									senare!
								</InputRow>
							</ModalContainer>
						</Model>
					)}
				</AnimatePresence>
			</OuterContainer>
		</>
	);
};

export default ShoppingListHubPage;
