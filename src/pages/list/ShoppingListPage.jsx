import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { IconWrapper } from "../../components/icons/IconWrapper";
import { OuterContainer, TopBar } from "../hub/HubStyles";

import { Backbutton, ListContainer, RemoveText } from "./ListStyles";

import ItemCard from "../../components/cards/ItemCard";
import { ListData } from "../../util/UserLoginTestData";

const ShoppingListViewPage = () => {
	const navigate = useNavigate();

	let params = useParams();
	const [show, setShow] = useState(false);
	const [loadingCompleted, setLoadingCompleted] = useState(false);

	const handleShowModal = () => {
		setShow(!show);
	};

	const listData = ListData;

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoadingCompleted(true);
		}, 4000);
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
					<RemoveText>Ta bort lista</RemoveText>
				</div>
			</TopBar>
			<TopBar p={" 0 1em 0 0.5em"}>
				<h2>Listans namn</h2>
				<div>
					<RemoveText>Lägg till partner</RemoveText>
				</div>
			</TopBar>
			<OuterContainer height={"calc(100vh - min(200px, 20vh))"} >
				{loadingCompleted ? (
					loadingCompleted && (
						<>
							<ListContainer>
								{listData.items.map((item) => (
									<ItemCard key={item.itemId} {...{
										name: item.name,
										quantity: item.quantity,
										unit: item.unit,
										isCompleted: item.isCompleted,
										listId: listData.shoppingListId
									}} />
								))}
							</ListContainer>
						</>
					)
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
