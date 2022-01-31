import styled from "styled-components";

export const UserContainer = styled.div`
	padding-top: ${({ pt }) => (pt ? pt : "")};
	padding-bottom: ${({ pb }) => (pb ? pb : "")};
	margin-left: ${({ ml }) => (ml ? ml : "")};
	margin-right: ${({ mr }) => (mr ? mr : "")};
	background: ${({ owner, theme }) =>
		owner ? theme.colors.yellowDetails : theme.colors.green};
	color: ${({ theme }) => theme.colors.white};
	font-size: ${({ fs }) => (fs ? fs : "1.2em")};
	font-weight: bold;
	width: 1.6em;
	height: 1.6em;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
`;