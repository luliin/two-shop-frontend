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
	LastTilePadding,
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
import { useRemoveCollaborator } from "../../hooks/shoppingLists/useRemoveCollaborator";
import { useClearAllItems } from "../../hooks/shoppingLists/useClearAllItems";
import { useSubscribeToListDeleted } from "../../hooks/shoppingLists/useSubscribeToListDeleted";
import { useDeleteShoppingList } from "../../hooks/shoppingLists/useDeleteShoppingList";
import { InviteCollaboratorForm } from "../../components/form/forms/InviteCollaboratorForm";
import { useInviteCollaborator } from "../../hooks/shoppingLists/useInviteCollaborator";

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
	const removeCollaborator = useRemoveCollaborator();
	const inviteCollaborator = useInviteCollaborator();
	const clearItems = useClearAllItems();
	const deleteShoppingList = useDeleteShoppingList();

	const [show, setShow] = useState(false);
	const [hover, setHover] = useState(false);
	const [edit, setEdit] = useState(false);
	const [toDelete, setToDelete] = useState(false);
	const [loadingCompleted, setLoadingCompleted] = useState(false);
	const [clear, setClear] = useState(false);
	const [isRemoveCollaborator, setIsRemoveCollaborator] = useState(false);
	const [item, setItem] = useState(emptyItem);
	const [deleteList, setDeleteList] = useState(false);
	const { user } = useContext(UserContext);
	const [shoppingListData, setShoppingListData] = useState(null);
	const [isOwner, setIsOwner] = useState(false);
	const [isInviteCollaborator, setIsInviteCollaborator] = useState(false);
	const [newCollaboratorCredential, setNewCollaboratorCredential] =
		useState("");
	const [clearMessage, setClearMessage] = useState("");

	const [initialItemList, setInitialItemList] = useState(null);
	const [itemList, setItemList] = useState(null);
	const [isNameError, setIsNameError] = useState(false);
	const [isNoSuchUser, setIsNoSuchUser] = useState(false);

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

	const handleNewCollaboratorInput = (e) => {
		setNewCollaboratorCredential(e.target.value);
	};

	const handleShowModal = () => {
		setShow(!show);
	};

	const validateName = () => {
		if (item.name.trim().length > 0) {
			setIsNameError(false);
			return false;
		}
		setIsNameError(true);
		return true;
	};

	const handleLeaveModal = (e) => {
		if (!hover || e.target.id === "cancel") {
			resetModal();
		}
	};

	const resetModal = () => {
		setShow(false);
		setItem(emptyItem);
		setEdit(false);
		setToDelete(false);
		setClear(false);
		setIsRemoveCollaborator(false);
		setDeleteList(false);
		setIsNameError(false);
		setIsInviteCollaborator(false);
		setNewCollaboratorCredential("");
		setIsNoSuchUser(false);
	};

	const handleClearList = () => {
		setClear(true);
		handleShowModal();
	};

	const handleDeleteList = () => {
		setDeleteList(true);
		handleShowModal();
	};

	const handleModifyItem = (e) => {
		if (e) e.preventDefault();
		if (item.quantity) item.quantity = Number(item.quantity);
		edit
			? updateItem(item)
			: toDelete
			? deleteItem(item)
			: deleteList
			? deleteCurrentList()
			: isRemoveCollaborator
			? removeCurrentCollaborator()
			: isInviteCollaborator
			? inviteNewCollaborator()
			: clear
			? clearCurrentList(item)
			: addItem(item);
	};

	const addItem = (currentItem) => {
		const isNameEmpty = validateName();
		if (!isNameEmpty) {
			resetModal();
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
				.then(() => {
					setClearMessage("");
				})
				.catch((error) => {
					console.log(error.message);
				});
		}
	};

	const updateItem = (currentItem) => {
		const isNameEmpty = validateName();
		if (!isNameEmpty) {
			resetModal();
			resetModal();
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
			}).catch((error) => {
				console.log(error.message);
			});
		}
	};

	const deleteItem = (currentItem) => {
		resetModal();
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
				if (response.data?.modifyShoppingListItems.items.length === 0) {
					setClearMessage("Listan är tom!");
				}
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const deleteCurrentList = () => {
		resetModal();
		deleteShoppingList({
			variables: { shoppingListId: shoppingListData?.id },
		}).catch((error) => {
			console.log(error.message);
		});
	};

	const removeCurrentCollaborator = () => {
		let handleCollaboratorInput = {
			shoppingListId: shoppingListData?.id,
			collaboratorCredential: shoppingListData?.collaborator?.username,
		};
		resetModal();
		removeCollaborator({ variables: { handleCollaboratorInput } })
			.then((response) => {
				setShoppingListData({
					...shoppingListData,
					collaborator:
						response.data.removeCollaborator.shoppingList
							.collaborator,
				});
			})
			.then(() => {
				if (!isOwner) {
					navigate("/lists");
				}
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const inviteNewCollaborator = () => {
		if (!newCollaboratorCredential.trim().length > 0) {
			setIsNameError(true);
		} else {
			const handleCollaboratorInput = {
				shoppingListId: shoppingListData?.id,
				collaboratorCredential: newCollaboratorCredential,
			};
			inviteCollaborator({ variables: { handleCollaboratorInput } })
				.then((response) => {
					setShoppingListData({
						...shoppingListData,
						collaborator:
							response.data.inviteCollaborator.shoppingList
								.collaborator,
					});
				})
				.then(() => {
					resetModal();
				})
				.catch((error) => {
					if (error.message === "No such user") {
						setIsNoSuchUser(true);
					} else {
						console.log(error);
					}
				});
		}
	};

	const clearCurrentList = (currentItem) => {
		resetModal();
		clearItems({
			variables: { shoppingListId: shoppingListData.id },
		})
			.then((response) => {
				setClearMessage(response.data?.clearAllItems?.message);
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
		setItem({
			shoppingListId: item.shoppingListId,
			itemId: itemId,
			name: name,
		});
		handleShowModal();
	};

	const handleCheckItem = (currentItem) => {
		let input = {
			name: currentItem.name,
			isCompleted: currentItem.isCompleted,
		};
		modifyItem({
			variables: {
				itemId: currentItem.itemId,
				shoppingListItemInput: {
					shoppingListId: currentItem.shoppingListId,
					itemInput: input,
				},
			},
		}).catch((error) => {
			console.log(error.message);
		});
	};

	const handleRemoveCollaborator = () => {
		setIsRemoveCollaborator(true);
		setItem({ shoppingListId: item.shoppingListId });
		handleShowModal();
	};

	const handleInviteCollaborator = () => {
		setIsInviteCollaborator(true);
		handleShowModal();
	};

	useEffect(() => {
		const navigateToHome = () => {
			navigate("/");
		};
		const navigateToHub = () => {
			navigate("/lists");
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
			} else {
				if (!data.shoppingListById.collaborator) {
					navigateToHub();
				}
			}
		}
	}, [navigate, user, loading, data, error]);

	const subscription = useSubscribeToItemModified(Number(param.listId));
	const deletedListSubscription = useSubscribeToListDeleted(
		Number(param.listId)
	);

	useEffect(() => {
		if (subscription.data) {
			if (!subscription.loading) {
				let currentItems = subscription.data?.itemModified?.items;
				if (clearMessage && currentItems.length === 0) {
					setItemList(currentItems);
				} else if (!clearMessage && currentItems.length > 0) {
					setItemList(currentItems);
				}
			}
		}
		if (subscription.error) {
			if (
				subscription.error.message !==
				"Observable cancelled prematurely"
			) {
				console.log(subscription.error.message);
			}
		}
		const navigateToHub = () => {
			navigate("/lists");
		};
		if (deletedListSubscription.data) {
			if (!deletedListSubscription.loading) {
				navigateToHub();
			}
		}
		return () => {
			setItemList(null);
			setInitialItemList([]);
		};
	}, [
		subscription.data,
		subscription.loading,
		subscription.error,
		deletedListSubscription.data,
		deletedListSubscription.loading,
		clearMessage,
		navigate,
	]);

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
						<TopBar p={" 0 1em 5px 1em"}>
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
										<MutedText
											onClick={handleInviteCollaborator}
										>
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
							height={"max(calc(90vh - min(200px, 20vh)), 600px)"}
							xsheight={
								"max(calc(90vh - min(200px, 20vh)), 520px)"
							}
						>
							{loadingCompleted ? (
								<>
									<ListContainer>
										{clearMessage && (
											<div>{clearMessage}</div>
										)}
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
										<LastTilePadding />
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
													height={"max(55%, 450px)"}
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
													{
														<FormHeading
															{...{
																children: edit
																	? "Ändra produkt"
																	: toDelete
																	? `Ta bort ${item.name}`
																	: clear
																	? "Töm listan?"
																	: isRemoveCollaborator &&
																	  isOwner
																	? `Vill du kicka ${shoppingListData.collaborator?.username}?`
																	: isRemoveCollaborator &&
																	  !isOwner
																	? "Vill du lämna listan?"
																	: deleteList
																	? "Radera listan?"
																	: isInviteCollaborator
																	? "Bjud in partner"
																	: "Lägg till produkt",
															}}
														/>
													}
													<FormStyled
														padding={
															"1rem 1rem 0 1rem"
														}
														onSubmit={
															handleModifyItem
														}
													>
														{toDelete ||
														clear ||
														isRemoveCollaborator ||
														deleteList ? (
															<DeleteForm />
														) : isInviteCollaborator ? (
															<InviteCollaboratorForm
																{...{
																	newCollaboratorCredential,
																	isNameError,
																	setIsNameError,
																	isNoSuchUser,
																	setIsNoSuchUser,
																	handleNewCollaboratorInput,
																}}
															></InviteCollaboratorForm>
														) : (
															<ModifyItemForm
																{...{
																	item: item,
																	isNameError:
																		isNameError,
																	setIsNameError:
																		setIsNameError,
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
														mt={"0.5em"}
														mb={"0.5em"}
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
