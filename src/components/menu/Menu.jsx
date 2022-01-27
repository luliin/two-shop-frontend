import { AnimatePresence } from "framer-motion";
import React from "react";
import { ListItem, MenuContainer, MenuList, TextWrapper } from "./MenuStyles";

const Menu = () => {
	const variants = {
		hover: {
			scale: 1.1,
		},
	};
	return (
		<MenuContainer
			initial={{ x: 500, y: 0, opacity: 0 }}
			animate={{ x: 0, y: 0, opacity: 1 }}
			transition={{ duration: 0.7, ease: "easeInOut" }}
			exit={{ x: 500, opacity: 0 }}
		>
			<MenuList>
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
							Logga in
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
			</MenuList>
		</MenuContainer>
	);
};

export default Menu;
