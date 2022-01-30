import styled from "styled-components";

import { motion } from "framer-motion";

export const StyledLoader = styled(motion.div)`
	width: 10px;
	height: 10px;
	margin: 40px auto;
	border-radius: 50%;
	background: ${({ theme }) => theme.colors.darkDetails};
`;
