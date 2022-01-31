import styled from "styled-components";
import { motion } from "framer-motion";

export const IconWrapper = styled(motion.div)`
	background-color: ${({ bg }) => (bg ? bg : "")};
	height: ${({ height }) => (height ? height : "")};
	display: flex;
	align-items: center;
	justify-content: center;
	padding: ${({ p }) => (p ? p : "")};
	cursor: ${({ cursor }) => (cursor ? cursor : "pointer")};
`;
