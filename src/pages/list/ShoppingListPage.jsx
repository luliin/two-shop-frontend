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
import { useModifyItems } from "../../hooks/items/useModifyItems";
import { useSubscribeToItemModified } from "../../hooks/items/useSubscribeToShoppingListItems";

const ShoppingListViewPage = () => {
	const param = useParams();
	const emptyItem = {
		shoppingListId: param.listId,
		name: "",
		quantity: "",
		unit: "",
	};

	const navigate = useNavigate();
	const modifyItem = useModifyItems();

	const [show, setShow] = useState(false);
	const [hover, setHover] = useState(false);
	const [edit, setEdit] = useState(false);
	const [toDelete, setToDelete] = useState(false);
	const [loadingCompleted, setLoadingCompleted] = useState(false);
	const [clear, setClear] = useState(false);
	const [removeCollaborator, setRemoveCollaborator] = useState(false);
	const [item, setItem] = useState(emptyItem);
	const [deleteList, setDeleteList] = useState(false);
	const { user } = useContext(UserContext);
	const [shoppingListData, setShoppingListData] = useState(null);
	const [isOwner, setIsOwner] = useState(false);

	const [initialItemList, setInitialItemList] = useState(null);
	const [itemList, setItemList] = useState(null);

	const { data, error, loading } = useGetShoppingListById(
		emptyItem.shoppingListId
	);
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
		if (!hover || e.target.id === "cancel" || e.target.id === "confirm") {
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
			? updateItem(item)
			: toDelete
			? deleteItem(item)
			: deleteList
			? console.log("Tar bort listan ", item)
			: removeCollaborator
			? console.log("Tar bort kollaboratör", item)
			: clear
			? console.log("Rensar listan", item)
			: addItem(item);
	};

	const addItem = (currentItem) => {
		console.log("Skapar nytt", currentItem);
		modifyItem({
			variables: {
				shoppingListItemInput: {
					shoppingListId: currentItem.shoppingListId,
					itemInput: {
						name: currentItem.name,
						quantity: currentItem.quantity,
						unit: currentItem.unit,
					},
				},
			},
		})
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const updateItem = (currentItem) => {
		console.log("Uppdaterar", currentItem);
		modifyItem({
			variables: {
				itemId: currentItem.itemId,
				shoppingListItemInput: {
					shoppingListId: currentItem.shoppingListId,
					itemInput: {
						name: currentItem.name,
						quantity: currentItem.quantity,
						unit: currentItem.unit,
					},
				},
			},
		})
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteItem = (currentItem) => {
		console.log("Tar bort", currentItem);
		modifyItem({
			variables: {
				itemId: currentItem.itemId,
				removeItem: true,
				shoppingListItemInput: {
					shoppingListId: currentItem.shoppingListId,
					itemInput: {
						name: currentItem.name,
					},
				},
			},
		})
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
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
		let input = {
			name: currentItem.name,
			isCompleted: currentItem.isCompleted,
		};
		console.log(input);
		modifyItem({
			variables: {
				itemId: currentItem.itemId,
				shoppingListItemInput: {
					shoppingListId: currentItem.shoppingListId,
					itemInput: input,
				},
			},
		})
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const handleRemoveCollaborator = () => {
		setRemoveCollaborator(true);
		setItem({ shoppingListId: item.shoppingListId });
		handleShowModal();
	};

	useEffect(() => {
		const navigateToHub = () => {
			navigate("/lists");
		};
		const navigateToHome = () => {
			navigate("/");
		};
		if (error) {
			if (error.graphQLErrors[0].message === "Unauthorized") {
				navigateToHome();
			}
			if (error.networkError) {
				console.log(error.networkError);
			}
			if (
				error.graphQLErrors[0].message === "Forbidden" ||
				error.graphQLErrors[0].message === "No such shopping list"
			) {
				navigateToHub();
			}
		}
		if (loading) {
			setLoadingCompleted(false);
		}
		if (data) {
			setLoadingCompleted(true);
			setShoppingListData(data.shoppingListById);
			setInitialItemList(data.shoppingListById.items);
			if (user.username === data.shoppingListById.owner.username) {
				setIsOwner(true);
			}
		}
	}, [navigate, user, loading, data, error]);

	const subscription = useSubscribeToItemModified(Number(param.listId));

	useEffect(() => {
		if (subscription.data) {
			console.log(subscription.data.itemModified);
			if (!subscription.loading) {
				setItemList(subscription.data?.itemModified?.items);
			}
		}
		if (subscription.error) {
			console.log(subscription.error);
		}
		return () => {
			setItemList(null);
			setInitialItemList(null);
		};
	}, [subscription.data, subscription.loading, subscription.error]);

	return (
		<>
			<>
				<TopBar p={" 0 1em 0 0.5em"}>
					<IconWrapper onClick={() => navigate("/lists")}>
						<Backbutton title={"Tillbaka"} />
					</IconWrapper>
					<div>
						{isOwner && (
							<PressableText onClick={handleDeleteList}>
								<MutedText>Ta bort lista</MutedText>
							</PressableText>
						)}
					</div>
				</TopBar>
				{shoppingListData ? (
					<>
						<TopBar p={" 0 1em 0 1em"}>
							<TitleWrapper>
								<ListTitle>{shoppingListData?.name}</ListTitle>
							</TitleWrapper>
							{isOwner ? (
								<PressableText>
									{shoppingListData.collaborator ? (
										shoppingListData.collaborator && (
											<MutedText
												onClick={
													handleRemoveCollaborator
												}
											>
												Kicka{" "}
												{
													shoppingListData
														.collaborator.username
												}
											</MutedText>
										)
									) : (
										<MutedText>Lägg till partner</MutedText>
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
										{itemList ? (
											<>
												{itemList.map((item) => (
													<ItemCard
														key={item.id}
														{...{
															name: item.name,
															quantity:
																item.quantity,
															unit: item.unit,
															isCompleted:
																item.isCompleted,
															listId: shoppingListData.id,
															itemId: item.id,
															handleEditItem:
																handleEditItem,
															handleDeleteItem:
																handleDeleteItem,
															handleCheckItem:
																handleCheckItem,
														}}
													/>
												))}
											</>
										) : (
											<>
												{initialItemList.map((item) => (
													<ItemCard
														key={item.id}
														{...{
															name: item.name,
															quantity:
																item.quantity,
															unit: item.unit,
															isCompleted:
																item.isCompleted,
															listId: shoppingListData.id,
															itemId: item.id,
															handleEditItem:
																handleEditItem,
															handleDeleteItem:
																handleDeleteItem,
															handleCheckItem:
																handleCheckItem,
														}}
													/>
												))}
											</>
										)}
										<div
											style={{
												height: "5vh",
												width: "100%",
											}}
										></div>
										<RoundButton
											onClick={handleShowModal}
											variants={buttonVariants}
											whileHover={buttonVariants.hover}
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
											whileHover={buttonVariants.hover}
											type="button"
											title="Töm listan"
											left={"10%"}
										>
											<TrashIcon
												color={Theme.colors.lightText}
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
														isOwner ? (
															<FormHeading
																{...{
																	children: `Vill du kicka ${shoppingListData.collaborator.username}?`,
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
													) : deleteList ? (
														<FormHeading
															{...{
																children:
																	"Radera listan?",
															}}
														/>
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
															id={"confirm"}
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
																	Theme.colors
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
				) : (
					<div>
						<Loader />
					</div>
				)}
			</>
		</>
	);
};

export default ShoppingListViewPage;
