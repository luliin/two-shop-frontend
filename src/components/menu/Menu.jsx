import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ListItem, MenuContainer, MenuList, TextWrapper } from "./MenuStyles";
import logout from "../../services/auth.service";

const Menu = ({ shouldClose }) => {
	const [close, setClose] = shouldClose;
	const { user } = useContext(UserContext);
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
									setClose(true);
									logout();
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
											setClose(true);
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
