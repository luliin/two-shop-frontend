import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IconWrapper } from "../../components/navbar/NavbarStyled";
import { OuterContainer, TopBar } from "../hub/HubStyles";

import { Backbutton, RemoveText } from "./ListStyles";

const ShoppingListViewPage = () => {
	let params = useParams();
	const [show, setShow] = useState(false);
	const [loadingCompleted, setLoadingCompleted] = useState(false);

	const handleShowModal = () => {
		setShow(!show);
	};

	const handleLoadingCompleted = () => {
		setTimeout(() => {
			setLoadingCompleted(true);
		}, 4000);
	};

	useEffect(() => {
		handleLoadingCompleted();
	});

	return (
		<>
			<TopBar p={" 0 1em 0 0.5em"}>
				<IconWrapper>
					<Backbutton title={"Tillbaka"} />
				</IconWrapper>
				<div>
					<RemoveText>Ta bort lista {params.listId}</RemoveText>
				</div>
			</TopBar>
			<OuterContainer>
				{loadingCompleted ? (
					loadingCompleted && <div>loading completed</div>
				) : (
					<div>loading ...</div>
				)}
			</OuterContainer>
		</>
	);
};

export default ShoppingListViewPage;
