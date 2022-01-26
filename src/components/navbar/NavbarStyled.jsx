import styled from "styled-components";
import { HiChevronDoubleDown, HiOutlineX } from "react-icons/hi";

export const NavbarStyled = styled.nav`
	background-color: #520570;
	height: min(7vh, 80px);
	color: #fffff5;
	font-weight: bold;
`;

export const NavList = styled.ul`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	> li {
		list-style: none;
		margin: 1em;
	}
`;

export const NavLogo = styled.h3`
	cursor: pointer;
	&:hover {
		text-shadow: 0 0 8px rgb(231, 175, 61);
	}
`;

export const MenuIcon = styled(HiChevronDoubleDown)`
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
