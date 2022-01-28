import { motion } from "framer-motion";
import styled from "styled-components";

export const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	overflow-x: hidden;
	height: 90vh;
`;

export const Header = styled.div`
	position: relative;
	width: 100%;
	height: min(20vh, 300px);
	/* background-image: url("/assets/splash-image.jpg"); */
	background-repeat: no-repeat;
	background-size: cover;
	background-position-y: min(-25px, 0vh);
	z-index: 0;
	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url("/assets/splash-image.jpg");
		background-size: cover;
		filter: saturate(30%) opacity(50%);
		@media (min-width: 768px) {
			background-position-y: -5vh;
		}
	}
	@media (max-width: 768px) {
		background-size: 100%;
	}
`;

export const SplashText = styled.div`
	position: relative;
	color: ${({ theme }) => theme.colors.deleteRed};
	/* float: right; */
	padding: 1em 0;
	max-width: 95%;
	top: 3em;
	right: -1em;
	font-weight: bold;
	font-size: min(2rem, 48px);
`;

export const SmallSplashText = styled.div`
	max-width: 95%;
	color: ${({ theme }) => theme.colors.deleteRed};
	padding: 1em 10px;
	height: 10vh;
	font-size: 0.9em;
`;

export const HomeHeadingContainer = styled(motion.div)`
	margin-top: 2vh;
	margin-bottom: 5vh;
	height: 50vh;
	width: 90%;
	background: ${({ theme }) => theme.colors.lighterBackground};
	border-radius: 0 5em 0 5em;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-shadow: ${({ theme }) => theme.effects.shadow};
	/* padding: 3em 0; */
`;

export const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: 10vh;
`;

export const HomeHeading = styled(motion.h1)`
	text-align: center;
	@media (max-width: 300px) {
		font-size: 24px;
	}
`;

export const ButtonWrapper = styled.div`
	text-align: center;
`;

export const RegisterButton = styled(motion.button)`
	height: 5vh;
	border-radius: 5em;
	width: 200px;
	background: ${({ theme }) => theme.colors.blueButtonColor};
	border: 1px solid white;
	color: #fff;
	cursor: pointer;
	font-size: 1.2em;
	font-family: "Barlow", sans-serif;
`;

export const MemberContainer = styled(motion.div)`
	height: 10vh;
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: center;
	> a {
		text-decoration: dashed;
		text-decoration-color: white;
	}
`;

export const MemberDefaultText = styled.div`
	font-family: "Barlow Condensed", sans-serif;
	font-size: 24px;
	padding: 0 5px;
	@media (max-width: 300px){
		font-size: 20px;
	}
`;

export const MemberHiglightedText = styled(MemberDefaultText)`
	color: ${({ theme }) => theme.colors.blueTextColor};
	cursor: pointer;
`;
