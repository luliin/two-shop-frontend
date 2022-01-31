import styled from "styled-components";
import { HiOutlineX } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";

export const NavbarStyled = styled.nav`
	background-color: ${({ theme }) => theme.colors.lighterBackground};
	height: min(7vh, 80px);
	color: ${({ theme }) => theme.colors.blueTextColor};
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
		> a {
			text-decoration: none;
			color: ${({ theme }) => theme.colors.blueTextColor};
		}
	}
`;

export const NavLogo = styled.h3`
	cursor: pointer;
	&:hover {
		text-shadow: ${({ theme }) =>
			theme.effects.glow(theme.colors.yellowDetails)};
	}
`;

export const IconWrapper = styled(motion.div)`
	z-index: 100;
	display:flex;
	align-items: center;
	cursor: ${({cursor})=> cursor ? cursor: "pointer"}
`;

export const MenuIcon = styled(GiHamburgerMenu)`
	color: ${({ theme }) => theme.colors.yellowDetails};
	font-size: 1.3em;
	cursor: pointer;
	&:hover {
		text-shadow: ${({ theme }) =>
			theme.effects.glow(theme.colors.yellowDetails)};
		box-shadow: ${({ theme }) =>
			theme.effects.glow(theme.colors.yellowDetails)};
		border-radius: 50%;
		transform: scale(1.1);
	}
`;

export const MenuIconX = styled(HiOutlineX)`
	color: ${({ theme }) => theme.colors.yellowDetails};
	font-size: 1.3em;
	cursor: pointer;
	&:hover {
		text-shadow: ${({ theme }) =>
			theme.effects.glow(theme.colors.yellowDetails)};
		box-shadow: ${({ theme }) =>
			theme.effects.glow(theme.colors.yellowDetails)};
		border-radius: 50%;
		transform: scale(1.1);
	}
`;

export const NavigationWrapper = styled.div`
	overflow: hidden;
`;
