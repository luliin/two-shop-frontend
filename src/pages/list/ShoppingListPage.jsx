import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { IconWrapper } from "../../components/icons/IconWrapper";

import {
	ModalContainer,
	Model,
	OuterContainer,
	RoundButton,
	TopBar,
} from "../hub/HubStyles";

import {
	Backbutton,
	ListContainer,
	ListTitle,
	MutedText,
	TitleWrapper,
	PressableText,
	TrashIcon,
	PlusIcon,
} from "./ListStyles";

import ItemCard from "../../components/cards/ItemCard";
import { ListData } from "../../util/UserLoginTestData";
import { AnimatePresence } from "framer-motion";
import {
	FormDivider,
	FormHeading,
	FormStyled,
} from "../../components/form/FormStyled";
import { WideButtonStyled } from "../../components/buttons/WideButtonStyled";
import { buttonVariants } from "../../util/AnimationVariants";
import { Theme } from "../../components/app/AppStyles";
import DeleteForm from "../../components/form/forms/DeleteItemForm";
import ModifyItemForm from "../../components/form/forms/ModifyItemForm";
import { useGetShoppingListById } from "../../hooks/shoppingLists/useGetShoppingListById";
import { UserContext } from "../../context/UserContext";

const ShoppingListViewPage = () => {
	const param = useParams();
	const listData = ListData;
	const emptyItem = {
		shoppingListId: param.listId,
		name: "",
		quantity: "",
		unit: "",
	};

	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [hover, setHover] = useState(false);
	const [edit, setEdit] = useState(false);
	const [toDelete, setToDelete] = useState(false);
	const [loadingCompleted, setLoadingCompleted] = useState(false);
	const [clear, setClear] = useState(false);
	const [removeCollaborator, setRemoveCollaborator] = useState(false);
	const [item, setItem] = useState(emptyItem);
	const [deleteList, setDeleteList] = useState(false);
	const [unauthorized, setUnauthorized] = useState(false);
	const { user } = useContext(UserContext);

	const {data, error, loading} = useGetShoppingListById(emptyItem.shoppingListId);
	const handleCreateItemInput = (e) => {
		const value =
			[e.target.name] === "quantity"
				? Number(e.target.value)
				: e.target.value;
		setItem({ ...item, [e.target.name]: value });
	};

	const handleShowModal = () => {
		setShow(!show);
	};

	const handleLeaveModal = (e) => {
		if (!hover || e.target.id === "cancel") {
			setShow(false);
			setItem(emptyItem);
			setEdit(false);
			setToDelete(false);
			setClear(false);
			setRemoveCollaborator(false);
			setDeleteList(false);
		}
	};

	const handleClearList = () => {
		setClear(true);
		handleShowModal();
	};

	const handleDeleteList = () => {
		console.log(`Tar bort lista ${item.shoppingListId}`);
		setDeleteList(true);
		handleShowModal();
	};

	const handleModifyItem = (e) => {
		if (e) e.preventDefault();
		console.log("Modify item");
		if (item.quantity) item.quantity = Number(item.quantity);
		edit
			? console.log("Uppdaterar", item)
			: toDelete
			? console.log("Tar bort", item)
			: deleteList
			? console.log("Tar bort listan ", item)
			: removeCollaborator
			? console.log("Tar bort kollaboratör", item)
			: clear
			? console.log("Rensar listan", item)
			: console.log("Skapar nytt", item);
	};

	const handleEditItem = (currentItem) => {
		setEdit(true);
		setItem({
			...item,
			name: currentItem.name,
			quantity: currentItem.quantity,
			unit: currentItem.unit,
			itemId: currentItem.itemId,
		});
		handleShowModal();
	};

	const handleDeleteItem = (itemId, name) => {
		setToDelete(true);
		console.log(item.shoppingListId, itemId);
		setItem({
			shoppingListId: item.shoppingListId,
			itemId: itemId,
			name: name,
		});
		handleShowModal();
	};

	const handleCheckItem = (currentItem) => {
		console.log("Check", currentItem);
	};

	const handleRemoveCollaborator = () => {
		setRemoveCollaborator(true);
		setItem({ shoppingListId: item.shoppingListId });
		handleShowModal();
	};

	const handleUnauthorized = () => {
		if (data?.error === "Forbidden" && !unauthorized) {
			setUnauthorized(true);
		}
	};

	useEffect(() => {
		const navigateToHub = () => {
			navigate("/lists");
		};
		const navigateToHome = () => {
			navigate("/");
		};
		if (!user) {
			navigateToHome();
		}
		if (error && error.graphQLErrors[0].message === "Forbidden") {
			navigateToHub();
		}
		if (loading) {
		}
		if (data) {
			setLoadingCompleted(true);
			console.log(data);
		}
	}, [unauthorized, navigate, user, loading, data, error]);

	return (
		<>
			{user && (
				<>
					{data?.error ? (
						<>{handleUnauthorized()}</>
					) : (
						<>
							{}
							<TopBar p={" 0 1em 0 0.5em"}>
								<IconWrapper onClick={() => navigate("/lists")}>
									<Backbutton title={"Tillbaka"} />
								</IconWrapper>
								<div>
									{listData.isOwner && (
										<PressableText
											onClick={handleDeleteList}
										>
											<MutedText>Ta bort lista</MutedText>
										</PressableText>
									)}
								</div>
							</TopBar>
							<TopBar p={" 0 1em 0 1em"}>
								<TitleWrapper>
									<ListTitle>{listData.name}</ListTitle>
								</TitleWrapper>
								{listData.isOwner ? (
									<PressableText>
										{listData.collaborator ? (
											listData.collaborator && (
												<MutedText
													onClick={
														handleRemoveCollaborator
													}
												>
													Kicka{" "}
													{
														listData.collaborator
															.username
													}
												</MutedText>
											)
										) : (
											<MutedText>
												Lägg till partner
											</MutedText>
										)}
									</PressableText>
								) : (
									<PressableText
										onClick={handleRemoveCollaborator}
									>
										<MutedText>Lämna listan</MutedText>
									</PressableText>
								)}
							</TopBar>
							<OuterContainer
								height={"calc(100vh - min(200px, 20vh))"}
							>
								{loadingCompleted ? (
									<>
										<ListContainer>
											{listData.items.map((item) => (
												<ItemCard
													key={item.itemId}
													{...{
														name: item.name,
														quantity: item.quantity,
														unit: item.unit,
														isCompleted:
															item.isCompleted,
														listId: listData.shoppingListId,
														itemId: item.itemId,
														handleEditItem:
															handleEditItem,
														handleDeleteItem:
															handleDeleteItem,
														handleCheckItem:
															handleCheckItem,
													}}
												/>
											))}
											<div
												style={{
													height: "5vh",
													width: "100%",
												}}
											></div>
											<RoundButton
												onClick={handleShowModal}
												variants={buttonVariants}
												whileHover={
													buttonVariants.hover
												}
												type="button"
												title="Lägg till produkt"
												right={"10%"}
											>
												<IconWrapper>
													<PlusIcon />
												</IconWrapper>
											</RoundButton>
											<RoundButton
												onClick={handleClearList}
												variants={buttonVariants}
												whileHover={
													buttonVariants.hover
												}
												type="button"
												title="Töm listan"
												left={"10%"}
											>
												<TrashIcon
													color={
														Theme.colors.lightText
													}
												/>
											</RoundButton>
										</ListContainer>
										<AnimatePresence>
											{show && (
												<Model
													exit={{ opacity: 0 }}
													key="backdrop"
													transition={{
														duration: 0.2,
													}}
													show={"show"}
													onClick={handleLeaveModal}
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
														{edit ? (
															<FormHeading
																{...{
																	children:
																		"Ändra produkt",
																}}
															/>
														) : toDelete ? (
															<FormHeading
																{...{
																	children: `Ta bort ${item.name}`,
																}}
															/>
														) : clear ? (
															<FormHeading
																{...{
																	children:
																		"Töm listan?",
																}}
															/>
														) : removeCollaborator ? (
															listData.isOwner ? (
																<FormHeading
																	{...{
																		children: `Vill du kicka ${listData.collaborator.username}?`,
																	}}
																/>
															) : (
																<FormHeading
																	{...{
																		children:
																			"Vill du lämna listan?",
																	}}
																/>
															)
														) : (
															<FormHeading
																{...{
																	children:
																		"Lägg till produkt",
																}}
															/>
														)}
														<FormStyled
															onSubmit={
																handleModifyItem
															}
														>
															{toDelete ||
															clear ||
															removeCollaborator ||
															deleteList ? (
																<DeleteForm />
															) : (
																<ModifyItemForm
																	{...{
																		item: item,
																		handleCreateItemInput:
																			handleCreateItemInput,
																	}}
																/>
															)}

															<WideButtonStyled
																width={
																	"min(300px, 67vw)"
																}
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
														<FormDivider
															mt={"20px"}
															mb={"20px"}
															width={
																"min(300px, 67vw)"
															}
														/>
														<PressableText
															whileHover={{
																scale: 1.1,
																textShadow:
																	Theme.effects.glow(
																		Theme
																			.colors
																			.yellowDetails
																	),
															}}
															id={"cancel"}
															onClick={
																handleLeaveModal
															}
														>
															Avbryt
														</PressableText>
													</ModalContainer>
												</Model>
											)}
										</AnimatePresence>
									</>
								) : (
									<div>
										<Loader />
									</div>
								)}
							</OuterContainer>
						</>
					)}
				</>
			)}
		</>
	);
};

export default ShoppingListViewPage;
