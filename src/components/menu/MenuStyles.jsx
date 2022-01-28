import { motion } from "framer-motion";
import styled from "styled-components";

export const MenuContainer = styled(motion.div)`
	display: flex;
	height: 100vh;
	width: min(100vw, 350px);
	background-color: ${({ theme }) => theme.colors.darkDetails};
	position: absolute;
	right: 0;
	overflow: hidden;
	border-radius: 3em 0 0 3em;
	padding: 50px;
	text-align: center;
	z-index: 1;

	@media (max-width: 576px) {
		border-radius: 0;
		width: 100vw;
	}
`;

export const MenuList = styled(motion.ul)`
	list-style: none;
	width: 100%;
`;

export const ListItem = styled(motion.div)`
	letter-spacing: 1px;
	padding-top: 1.5em;
	color: ${({ active, theme }) => (active ? theme.colors.yellowDetails : "")};
	> span {	
	}
`;

export const TextWrapper = styled(motion.span)`
	padding: 5px 15px;
	cursor: pointer;
	
`;
