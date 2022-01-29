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
	FormContainer,
	FormDivider,
	FormHeading,
	FormStyled,
	InputRow,
	ListIcon,
	PasswordIcon,
	StrongText,
	UserIcon,
} from "../../components/form/FormStyled";
import {
	InputField,
	LabelStyled,
} from "../../components/input/FormInputStyles";
import { WideButtonStyled } from "../../components/buttons/WideButtonStyled";
import { Link } from "react-router-dom";
import { BsCardChecklist } from "react-icons/bs";

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

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Submit");
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
				<AnimatePresence>
					{show && (
						<Model
							exit={{ opacity: 0 }}
							key="backdrop"
							transition={{ duration: 0.2 }}
							show={"show"}
							onClick={(e) => {
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
								<FormStyled onSubmit={handleSubmit}>
									<InputRow>
										<LabelStyled htmlFor="listname">
											<ListIcon title="Användarnamn eller e-post till kollaboratör" />
										</LabelStyled>
										<InputField
											width={"min(250px, 56vw)"}
											autoComplete="off"
											type="text"
											placeholder={"Listans namn"}
											name="listname"
											required
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
