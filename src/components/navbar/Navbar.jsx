import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
	IconWrapper,
	MenuIcon,
	MenuIconX,
	NavbarStyled,
	NavigationWrapper,
	NavList,
	NavLogo,
} from "./NavbarStyled";
import Menu from "../menu/Menu";
import { MenuContext } from "../../context/MenuContext";

const Navbar = ({ shouldClose }) => {
	const [closeMenu, setCloseMenu] = shouldClose;
	const { menu, setMenu } = useContext(MenuContext);

	return (
		<NavigationWrapper>
			<AnimatePresence>
				{menu && (
					<Menu
						{...{
							shouldClose: [closeMenu, setCloseMenu],
						}}
					/>
				)}
			</AnimatePresence>
			<NavbarStyled>
				<NavList>
					<li>
						<Link to="/">
							<NavLogo>TwoShop</NavLogo>
						</Link>
					</li>
					<li>
						<motion.div onClickCapture={() => setMenu(!menu)}>
							{menu ? (
								<IconWrapper
									animate={{ rotate: -90 }}
									transition={{ duration: 1.5 }}
								>
									<MenuIconX />
								</IconWrapper>
							) : (
								<IconWrapper
									animate={{ rotate: -360 }}
									transition={{ duration: 1 }}
								>
									<MenuIcon />
								</IconWrapper>
							)}
						</motion.div>
					</li>
				</NavList>
			</NavbarStyled>
		</NavigationWrapper>
	);
};

export default Navbar;
