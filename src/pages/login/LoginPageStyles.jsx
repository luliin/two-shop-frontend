import styled from "styled-components";
import { RiLockPasswordFill, RiUser3Fill } from "react-icons/ri";

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
	box-shadow: ${({ theme }) => theme.effects.shadow};
	border-radius: 0 5em 0 5em;

	height: 60%;
	background-color: ${({ theme }) => theme.colors.lighterBackground};
	margin-top: 10%;
	width: 90vw;
	@media(max-width: 789px) {
		margin-top: 0;
	}
`;

export const LoginHeading = styled.h1`
	margin-bottom: 1em;
	&:hover {
		text-shadow: ${({ theme }) =>
			theme.effects.glow(theme.colors.deleteRed)};
		cursor: pointer;
	}
`;

export const UserIcon = styled(RiUser3Fill)`
	font-size: 24px;
`;

export const PasswordIcon = styled(RiLockPasswordFill)`
	font-size: 24px;
`;

export const InputRow = styled.div`
	display: flex;
	align-items: center;
	flex-grow: 1em;
	gap: 1em;
	font-family: "Barlow Condensed", sans-serif;
	color: ${({ color }) => (color ? color : "")};
`;
