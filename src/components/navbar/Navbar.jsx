import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuIcon, MenuIconX, NavbarStyled, NavList, NavLogo } from "./NavbarStyled";

const Navbar = () => {
	const [open, setOpen] = useState(false);



	return (
		<NavbarStyled>
			<NavList>
				<li><NavLogo>TwoShop</NavLogo> </li>
				<li>
					<div onClick={() => setOpen(!open)}>
						{open ? <MenuIconX /> : <MenuIcon />}
					</div>
				</li>
			</NavList>
		</NavbarStyled>
	);
};

export default Navbar;
