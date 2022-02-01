import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { IconWrapper } from "../../components/icons/IconWrapper";
import { itemSelectOptions } from "../../util/DataObjects";
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
	QuantityIcon,
	MutedText,
	TitleWrapper,
	UnitIcon,
	PressableText,
} from "./ListStyles";

import ItemCard from "../../components/cards/ItemCard";
import { ListData } from "../../util/UserLoginTestData";
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
	Select,
} from "../../components/input/FormInputStyles";
import { CollaboratorIcon } from "../../components/cards/ShoppingListCardStyles";
import { WideButtonStyled } from "../../components/buttons/WideButtonStyled";
import { buttonVariants } from "../../util/AnimationVariants";
import { Theme } from "../../components/app/AppStyles";

const ShoppingListViewPage = () => {
	const navigate = useNavigate();
	const listData = ListData;

	const [show, setShow] = useState(false);
	const [hover, setHover] = useState(false);
	const [loadingCompleted, setLoadingCompleted] = useState(false);
	const [editItem, setEditItem] = useState(false);
	const [deleteItem, setDeleteItem] = useState(false);

	const [item, setItem] = useState({
		shoppingListId: listData.shoppingListId,
		name: "",
		quantity: "",
		unit: "",
	});

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

	const handleModifyItem = (e) => {
		e.preventDefault();
		console.log("Modify item");
		console.log(item);
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
						</ListContainer>
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
										<FormHeading>
											Lägg till produkt
										</FormHeading>
										<FormStyled onSubmit={handleModifyItem}>
											<InputRow>
												<LabelStyled htmlFor="item-name">
													<ListIcon title="Ange namnet du vill ge den nya shoppinglistan" />
												</LabelStyled>
												<InputField
													value={item.name}
													id="item-name"
													width={"min(250px, 56vw)"}
													autoComplete="off"
													type="text"
													placeholder={
														"Produktens namn"
													}
													name="name"
													required
													onChange={
														handleCreateItemInput
													}
												/>
											</InputRow>
											<InputRow>
												<LabelStyled htmlFor="item-quantity">
													<QuantityIcon title="Antal" />
												</LabelStyled>
												<InputField
													value={item.quantity}
													id="item-quantity"
													width={"min(250px, 56vw)"}
													autoComplete="off"
													type="number"
													placeholder={"Antal"}
													name="quantity"
													required
													onChange={
														handleCreateItemInput
													}
												/>
											</InputRow>
											<InputRow>
												<LabelStyled htmlFor="unit">
													<UnitIcon
														title="Enhet"
														fs={"24px"}
														color={"light"}
													/>
												</LabelStyled>
												<Select
													name="unit"
													value={item.unit}
													onChange={
														handleCreateItemInput
													}
												>
													<option value="" disabled>
														Välj enhet...
													</option>

													{itemSelectOptions.map(
														(selectOption) =>
															!selectOption.optGroup ? (
																<option
																	key={
																		selectOption
																	}
																	value={
																		selectOption.label
																	}
																>
																	{
																		selectOption.label
																	}
																</option>
															) : (
																<optgroup
																	key={
																		selectOption.optGroup
																	}
																	label={
																		selectOption.optGroup
																	}
																>
																	{selectOption.list.map(
																		(
																			option
																		) => (
																			<option
																				key={
																					option.label
																				}
																				value={
																					option.label
																				}
																			>
																				{
																					option.label
																				}
																			</option>
																		)
																	)}
																</optgroup>
															)
													)}
												</Select>
											</InputRow>
											<WideButtonStyled
												onClick={handleModifyItem}
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
											onClick={handleShowModal}
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
