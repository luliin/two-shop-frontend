import styled from "styled-components";

export const OuterContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	height: 60vh;
	background-color: ${({ theme }) => theme.colors.lighterBackground};
	margin-top: 10vh;
	width: 90vw;
`;

export const LoginHeading = styled.h1`
	&:hover {
		text-shadow: ${({ theme }) =>
			theme.effects.glow(theme.colors.deleteRed)};
		cursor: pointer;
	}
`;
