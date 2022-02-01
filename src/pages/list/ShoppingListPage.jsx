import React, { useEffect, useState } from "react";
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

const ShoppingListViewPage = () => {
	const listData = ListData;
	const emptyItem = {
		shoppingListId: listData.shoppingListId,
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
	const [item, setItem] = useState(emptyItem);

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
		}
	};

	const handleClearList = () => {
		setClear(true);
		handleShowModal();
	};

	const handleModifyItem = (e) => {
		e.preventDefault();
		console.log("Modify item");
		if (item.quantity) item.quantity = Number(item.quantity);
		edit
			? console.log("Uppdaterar", item)
			: toDelete
			? console.log("Tar bort", item)
			: console.log(item);
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
			itemId: Number(itemId),
			name: name,
		});
		handleShowModal();
	};

	const handleCheckItem = (currentItem) => {
		console.log(currentItem);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoadingCompleted(true);
		}, 2000);
		return () => {
			clearTimeout(timer);
		};
	});

	return (
		<>
			<TopBar p={" 0 1em 0 0.5em"}>
				<IconWrapper onClick={() => navigate("/lists")}>
					<Backbutton title={"Tillbaka"} />
				</IconWrapper>
				<div>
					{listData.isOwner && <MutedText>Ta bort lista</MutedText>}
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
								<MutedText>
									Kicka {listData.collaborator.username}
								</MutedText>
							)
						) : (
							<MutedText>Lägg till partner</MutedText>
						)}
					</PressableText>
				) : (
					<PressableText>
						<MutedText>Lämna listan</MutedText>
					</PressableText>
				)}
			</TopBar>
			<OuterContainer height={"calc(100vh - min(200px, 20vh))"}>
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
										isCompleted: item.isCompleted,
										listId: listData.shoppingListId,
										itemId: item.itemId,
										handleEditItem: handleEditItem,
										handleDeleteItem: handleDeleteItem,
										handleCheckItem: handleCheckItem,
									}}
								/>
							))}
							<div style={{ height: "5vh", width: "100%" }}></div>
							<RoundButton
								onClick={handleShowModal}
								variants={buttonVariants}
								whileHover={buttonVariants.hover}
								type="button"
								title="Lägg till produkt"
								right={"10%"}
							>
								+
							</RoundButton>
							<RoundButton
								onClick={handleClearList}
								variants={buttonVariants}
								whileHover={buttonVariants.hover}
								type="button"
								title="Töm listan"
								left={"10%"}
							>
								<TrashIcon />
							</RoundButton>
						</ListContainer>
						<AnimatePresence>
							{show && (
								<Model
									exit={{ opacity: 0 }}
									key="backdrop"
									transition={{ duration: 0.2 }}
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
											<FormHeading>
												Ändra produkt
											</FormHeading>
										) : toDelete ? (
											<FormHeading>
												Ta bort {item.name}?
											</FormHeading>
										) : clear ? (
											<FormHeading>
												Töm listan?
											</FormHeading>
										) : (
											<FormHeading>
												Lägg till produkt
											</FormHeading>
										)}
										<FormStyled onSubmit={handleModifyItem}>
											{toDelete ? (
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
										<FormDivider
											mt={"20px"}
											mb={"20px"}
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
											onClick={handleLeaveModal}
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
	);
};

export default ShoppingListViewPage;
