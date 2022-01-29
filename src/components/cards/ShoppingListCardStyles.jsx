import styled from "styled-components";
import { RiGroup2Line, RiHeartLine } from "react-icons/ri";
import { motion } from "framer-motion";

export const ListCard = styled(motion.div)`
	background: ${({ theme }) => theme.colors.lighterBackground};
	height: min(70vw, 265px);
	width: min(70vw, 275px);
	box-shadow: ${({ theme }) => theme.effects.shadow};
	border-radius: 1em;
	cursor: pointer;
`;

export const TextWrapper = styled.div`
	margin-top: ${({ mt }) => (mt ? mt : "")};
	margin-bottom: ${({ mb }) => (mb ? mb : "")};
	margin-left: ${({ ml }) => (ml ? ml : "")};
	margin-right: ${({ mr }) => (mr ? mr : "")};
	padding-top: ${({ pt }) => (pt ? pt : "")};
	padding-bottom: ${({ pb }) => (pb ? pb : "")};
	padding-left: ${({ pl }) => (pl ? pl : "")};
	padding-right: ${({ pr }) => (pr ? pr : "")};
	padding: ${({ p }) => (p ? p : "")};
	max-height: ${({ maxH }) => (maxH ? maxH : "")};
	height: ${({ height }) => (height ? height : "")};
	width: 100%;
	overflow: auto;
	word-wrap: break-word;
	color: ${({ color, theme }) => (color ? color : theme.colors.lightishText)};
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
	display: ${({ d }) => (d ? d : "")};
	align-items: ${({ align }) => (align ? align : "")};
	justify-content: ${({ justify }) => (justify ? justify : "")};
	flex-direction: ${({ direction }) => (direction ? direction : "")};
`;

export const ListTitle = styled.h2`
	color: ${({ theme }) => theme.colors.purpleTextColor};
	display: inline;
	text-overflow: ellipsis;
	@media (max-width: 400px) {
		font-size: 1.2em;
	}
`;

export const CollaboratorsText = styled.h3`
	color: ${({ theme }) => theme.colors.lightishText};
	font-family: ${({ theme }) => theme.fonts.secondary};
`;

export const CardLine = styled.div`
	background: ${({ theme }) => theme.colors.purpleTextColor};
	height: 1px;
	width: 90%;
	margin-left: 5%;
`;

export const CollaboratorIcon = styled(RiGroup2Line)`
	padding-top: ${({ pt }) => (pt ? pt : "")};
	color: ${({ theme, color }) =>
		color ? theme.colors.lightText : theme.colors.purpleTextColor};
	font-size: ${({ fs }) => (fs ? fs : "1.6em;")};
`;

export const OwnerIcon = styled(RiHeartLine)`
	padding-top: ${({ pt }) => (pt ? pt : "")};
	color: ${({ theme }) => theme.colors.purpleTextColor};
	font-size: ${({ fs }) => (fs ? fs : "1.6em;")};
`;
