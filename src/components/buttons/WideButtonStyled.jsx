import { motion } from "framer-motion";
import styled from "styled-components";

export const WideButtonStyled = styled(motion.button)`
	margin: ${({ margin }) => (margin ? margin : "1em 0")};
	height: 5vh;
	border-radius: 5em;
	width: min(290px, 80vw);
	background: ${({ theme }) => theme.colors.blueButtonColor};
	border: 1px solid white;
	color: #fff;
	cursor: pointer;
	font-size: 1.2em;
	font-family: "Barlow", sans-serif;
`;
