import styled from "styled-components";
import { HiOutlineX } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";

export const NavbarStyled = styled.nav`
	background-color: #181831;
	height: min(7vh, 80px);
	color: #fffff5;
	font-weight: bold;
`;

export const NavList = styled.ul`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 100%;
	> li {
		list-style: none;
		margin: 1em;
		z-index: 5;
	}
`;

export const NavLogo = styled.h3`
	cursor: pointer;
	&:hover {
		text-shadow: 0 0 8px rgb(231, 175, 61);
	}
`;

export const IconWrapper = styled(motion.div)`
	z-index: 100;
`;

export const MenuIcon = styled(GiHamburgerMenu)`
	color: rgb(231, 175, 61);
	font-size: 1.3em;
	cursor: pointer;
	&:hover {
		text-shadow: 0 0 8px rgb(231, 175, 61);
		box-shadow: 0 0 8px rgb(231, 175, 61);
		border-radius: 50%;
		transform: scale(1.1);
	}
`;

export const MenuIconX = styled(HiOutlineX)`
	color: #e7af3d;
	font-size: 1.3em;
	cursor: pointer;
	&:hover {
		text-shadow: 0 0 8px rgb(231, 175, 61);
		box-shadow: 0 0 8px rgb(231, 175, 61);
		border-radius: 50%;
		transform: scale(1.1);
	}
`;

export const NavigationWrapper = styled.div`
	overflow: hidden;
`;
