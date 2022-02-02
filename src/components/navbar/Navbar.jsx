import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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

const Navbar = ({ menuOpen, shouldClose }) => {
	const [open, setOpen] = menuOpen;
	const [closeMenu, setCloseMenu] = shouldClose;

	

	return (
		<NavigationWrapper>
			<AnimatePresence>
				{open && (
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
						<motion.div onClickCapture={() => setOpen(!open)}>
							{open ? (
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
