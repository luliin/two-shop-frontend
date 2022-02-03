import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ListItem, MenuContainer, MenuList, TextWrapper } from "./MenuStyles";
import AuthService from "../../services/auth.service";
import { MenuContext } from "../../context/MenuContext";

const Menu = ({ shouldClose }) => {
	const [close, setClose] = shouldClose;
	const { user, setUser } = useContext(UserContext);
	const { menu, setMenu } = useContext(MenuContext);
	const navigate = useNavigate();
	const logOut = () => {
		AuthService.logout();
		setUser(null);
		setMenu(false);
		navigate("/");
	};

	return (
		<MenuContainer
			initial={{ x: 500, y: 0, opacity: 0 }}
			animate={{ x: 0, y: 0, opacity: 1 }}
			transition={{ duration: 0.7, ease: "easeInOut" }}
			exit={{ x: 500, opacity: 0 }}
			onTap={() => {
				setClose(false);
			}}
			onMouseEnter={() => {
				setClose(false);
			}}
			onMouseLeave={() => {
				setClose(true);
			}}
		>
			<MenuList>
				{user ? (
					<>
						<li>
							<TextWrapper
								whileHover={{
									borderRadius: "2em",
									boxShadow: "0 0 8px rgb(231, 175, 61)",

									scale: 1.1,
									textShadow: "0 0 8px rgb(231,175,61)",
									letterSpacing: "2px",
								}}
								onClickCapture={() => {
									logOut();
								}}
							>
								Logga ut
							</TextWrapper>
						</li>
						<li>
							<ListItem>
								<TextWrapper
									whileHover={{
										borderRadius: "2em",
										boxShadow: "0 0 8px rgb(231, 175, 61)",
										scale: 1.1,
										textShadow: "0 0 8px rgb(231,175,61)",
										letterSpacing: "2px",
									}}
								>
									Mina shoppinglistor
								</TextWrapper>
							</ListItem>
						</li>
						<li>
							<ListItem>
								<TextWrapper
									whileHover={{
										borderRadius: "2em",
										boxShadow: "0 0 8px rgb(231, 175, 61)",
										scale: 1.1,
										textShadow: "0 0 8px rgb(231,175,61)",
										letterSpacing: "2px",
									}}
								>
									Inställningar
								</TextWrapper>
							</ListItem>
						</li>
					</>
				) : (
					<>
						<li>
							<ListItem>
								<Link to={"/login"}>
									<TextWrapper
										whileHover={{
											borderRadius: "2em",
											boxShadow:
												"0 0 8px rgb(231, 175, 61)",

											scale: 1.1,
											textShadow:
												"0 0 8px rgb(231,175,61)",
											letterSpacing: "2px",
										}}
										onClickCapture={() => {
											setMenu(false)
										}}
									>
										Logga in
									</TextWrapper>
								</Link>
							</ListItem>
						</li>
					</>
				)}
			</MenuList>
		</MenuContainer>
	);
};

export default Menu;
