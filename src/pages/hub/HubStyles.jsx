import { motion } from "framer-motion";
import styled from "styled-components";

export const TopBar = styled.div`
	height: min(50px, 4vh);
	display: flex;
	justify-content: ${({ justify }) => (justify ? justify : "space-between")};
	align-items: center;
	font-weight: bold;
	font-family: ${({ theme }) => theme.fonts.secondary};
	font-size: 20px;
	padding: ${({ p }) => (p ? p : "0 2em 0 2em")};
`;

export const OuterContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: ${({ height }) =>
		height ? height : "calc(100vh - min(135px, 14vh))"};
	padding-top: 1em;
	padding-bottom: ${({ pb }) => (pb ? pb : "")};
	overflow: auto;
	/* Todo: see if I can solve the proplem in ListPage without hiding scrollbar */
	/* IE and Edge */
	-ms-overflow-style: none;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		background: ${({ theme }) => theme.colors.lighterBackground};
		/* scrollbar-color: ${({ theme }) => theme.colors.lightText}; */
		width: 0.5rem;
	}

	&::-webkit-scrollbar-thumb {
		background: ${({ theme }) => theme.colors.darkDetails};
		border-radius: 5em;
	}
	@media (max-width: 768px) {
		&::-webkit-scrollbar {
			display: none;
			/* height: 0.5rem;  */
		}
	}
	@media (max-width: 280px) {
		height: ${({ xsheight }) =>
			xsheight ? xsheight : "calc(100vh - min(135px, 14vh))"};
	}
`;

export const HubContainer = styled.div`
	height: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	justify-items: center;
	align-items: center;
	place-content: start;
	width: min(90vw, 1000px);
	column-gap: 1vw;
	row-gap: 1vh;
	@media (max-width: 560px) {
		height: 100%;
		row-gap: 2vh;
	}
`;

export const IconWithLabel = styled.div`
	display: flex;
	align-items: center;
	padding: 5px 0 0 0;
	@media (max-width: 350px) {
		font-size: 15px;
	}
`;

export const RoundButton = styled(motion.button)`
	border-radius: 50%;
	border-width: 5px;
	border: none;
	width: 65px;
	height: 65px;
	color: ${({ theme }) => theme.colors.lightText};
	background: ${({ theme }) => theme.colors.blueButtonColor};
	position: absolute;
	box-shadow: ${({ theme }) => theme.effects.shadow};
	font-weight: bold;
	font-size: 24px;
	cursor: pointer;
	bottom: 1em;
	right: ${({ right }) => (right ? right : "15%")};
	left: ${({ left }) => (left ? left : "")};
`;

export const Model = styled(motion.div)`
	z-index: auto;
	display: ${({ show }) => (show ? "flex" : "none")};
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled(motion.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-shadow: ${({ theme }) => theme.effects.shadow};
	border-radius: 0 5em 0 5em;
	height: ${({ height }) => (height ? height : "60%")};
	background-color: ${({ theme }) => theme.colors.lighterBackground};
	width: min(500px, 80vw);
	position: fixed;
	top: 55%;
	left: 50%;
	@media (max-width: 300px) {
		height: 65vh;
	}
	/* transform: translate(-50%, -50%); */
`;

export const EmptyListContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 60vh;
	text-align: center;
	h2 {
		color: ${({ theme }) => theme.colors.yellowDetails};
		margin-bottom: 3vh;
	}
`;
