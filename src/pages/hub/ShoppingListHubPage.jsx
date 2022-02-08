import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
	EmptyListContainer,
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

import { LastTilePadding, PlusIcon, PressableText } from "../list/ListStyles";
import { IconWrapper } from "../../components/icons/IconWrapper";
import { UserContext } from "../../context/UserContext";
import { useGetUserShoppingLists } from "../../hooks/shoppingLists/useGetShoppingLists";
import AuthService from "../../services/auth.service";
import { useCreateShoppingList } from "../../hooks/shoppingLists/useCreateShoppingList";
import { Theme } from "../../components/app/AppStyles";

const ShoppingListHubPage = () => {
	const navigate = useNavigate();
	const [listName, setListName] = useState("");
	const [collaboratorCredential, setCollaboratorCredential] = useState("");
	const [show, setShow] = useState(false);
	const [hover, setHover] = useState(false);
	const { user } = useContext(UserContext);

	const createShoppingList = useCreateShoppingList();

	const handleShowModal = () => {
		setShow(!show);
	};

	const closeModal = () => {
		setShow(false);
		setCollaboratorCredential("");
		setListName("");
		setHover(false);
	};

	const handleCreateShoppingList = (e) => {
		e.preventDefault();
		let createShoppingListInput = {
			name: listName,
			collaboratorCredential: collaboratorCredential,
		};
		createShoppingList({
			variables: { createShoppingListInput: createShoppingListInput },
		})
			.then((response) => {
				let id = response.data.createShoppingList.id;
				navigate(`/lists/${id}`, {
					state: { id },
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		const navigateHome = () => navigate("/");
		if (!user) {
			navigateHome();
		}
		return () => {};
	}, [navigate, user]);
	let data = useGetUserShoppingLists(AuthService.getCurrentUser()?.id);
	return (
		<>
			{user && (
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
						{data && (
							<HubContainer>
								<>
									{data.ownedShoppingLists.length === 0 &&
										data &&
										data.collaboratorShoppingLists
											.length === 0 && (
											<EmptyListContainer>
												<h2>Här var det tomt!</h2>
												<h3>
													Tryck på knappen nedan för
													att skapa en ny
													shoppinglista{" "}
												</h3>
											</EmptyListContainer>
										)}
								</>
								{data.ownedShoppingLists.map((list) => (
									<ShoppingListCard
										{...{
											id: list.id,
											isOwner: true,
											collaborator: list.collaborator
												? list.collaborator.username
												: null,
											name: list.name,
											owner: data.username,
										}}
										key={list.id}
									/>
								))}
								{data.collaboratorShoppingLists.map((list) => (
									<ShoppingListCard
										{...{
											id: list.id,
											isOwner: false,
											owner: list.owner
												? list.owner.username
												: null,
											name: list.name,
											collaborator: data.username,
										}}
										key={list.id}
									/>
								))}
								<LastTilePadding />
								<RoundButton
									onClick={handleShowModal}
									variants={buttonVariants}
									whileHover={buttonVariants.hover}
									type="button"
									title="Skapa ny lista"
								>
									<IconWrapper>
										<PlusIcon />
									</IconWrapper>
								</RoundButton>
							</HubContainer>
						)}

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
										height={"max(55%, 400px)"}
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
										<FormHeading mt={"0px"}>
											Skapa ny lista
										</FormHeading>
										<FormStyled
											padding={"1rem 1rem 0 1rem"}
											onSubmit={handleCreateShoppingList}
										>
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
														setListName(
															e.target.value
														)
													}
												/>
											</InputRow>
											<InputRow>
												Vill du samarbeta med någon?
											</InputRow>
											<InputRow>
												Ange e-post eller användarnamn
												till hen
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
												whileHover={
													buttonVariants.hover
												}
												whileTap={
													buttonVariants.tapGlow
												}
											>
												{"Bekräfta"}
											</WideButtonStyled>
										</FormStyled>
										<InputRow>
											Du kan även bjuda in någon till
											listan senare!
										</InputRow>
										<FormDivider
											mt={"0.6em"}
											mb={"0.3em"}
											width={"min(300px, 67vw)"}
										/>
										<PressableText
											whileHover={{
												scale: 1.1,
												textShadow: Theme.effects.glow(
													Theme.colors.yellowDetails
												),
											}}
											id={"cancel"}
											onClick={closeModal}
										>
											Avbryt
										</PressableText>
									</ModalContainer>
								</Model>
							)}
						</AnimatePresence>
					</OuterContainer>
				</>
			)}
		</>
	);
};

export default ShoppingListHubPage;
