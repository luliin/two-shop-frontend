import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import useWindowDimensions from "../../util/WindowHooks";
import {
	Header,
	HomeContainer,
	HomeHeading,
	HomeHeadingContainer,
	MemberContainer,
	MemberDefaultText,
	MemberHiglightedText,
	RegisterButton,
	SmallSplashText,
	SplashText,
	Wrapper,
} from "./HomePageStyles";

import { Theme } from "../../components/app/AppStyles";
import { UserContext } from "../../context/UserContext";

const containerVariants = {
	hidden: {
		opacity: 0,
		x: "100vw",
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 3,
			type: "spring",
			stiffness: 100,
			delayChildren: 0.8,
			staggerChildren: 1,
		},
	},
};

const childVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 2,
		},
	},
};

const textVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 2,
		},
	},
};

const glow = {
	boxShadow: Theme.effects.glow(Theme.colors.yellowDetails),
	scale: 1.1,
};

const HomePage = () => {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	useEffect(() => {
		const navigateToLists = () => navigate("/lists");
		if (user) {
			navigateToLists();
		}
		return () => {};
	}, [navigate, user]);
	const { width } = useWindowDimensions();
	return (
		<>
			{!user && (
				<HomeContainer>
					<Header>
						{width >= 768 && (
							<SplashText>Välkommen till TwoShop!</SplashText>
						)}
					</Header>
					{width < 768 && (
						<SmallSplashText>
							<h2>Välkommen till TwoShop!</h2>
						</SmallSplashText>
					)}
					<HomeHeadingContainer
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						<Wrapper>
							<HomeHeading variants={textVariants}>
								Vårt mål:
							</HomeHeading>
						</Wrapper>
						<Wrapper>
							<HomeHeading variants={textVariants}>
								Handla enklare
							</HomeHeading>
						</Wrapper>
						<Wrapper>
							<HomeHeading variants={textVariants}>
								- tillsammans!
							</HomeHeading>
						</Wrapper>
						<Wrapper>
							<Link to="/register">
								<RegisterButton
									variants={childVariants}
									whileTap={glow}
									whileHover={{ scale: 1.1 }}
								>
									Registrera dig nu
								</RegisterButton>
							</Link>
						</Wrapper>
					</HomeHeadingContainer>
					<MemberContainer>
						<MemberDefaultText>Redan medlem?</MemberDefaultText>

						<Link to="/login">
							<MemberHiglightedText>
								Logga in här!
							</MemberHiglightedText>
						</Link>
					</MemberContainer>
				</HomeContainer>
			)}
		</>
	);
};

export default HomePage;
