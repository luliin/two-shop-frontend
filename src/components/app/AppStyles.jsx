import styled from "styled-components";

export const AppContainer = styled.div`
	height: 100vh;
	background-color: ${({ theme }) => theme.colors.darkBackground};
	overflow-x: auto;
`;


export const Theme = {
	colors: {
		blueTextColor: "#8182f9",
		blueButtonColor: "#6261f3",
		purpleTextColor: "#7475ee",
		darkBackground: "#111025",
		lighterBackground: "#181831",
		deleteRed: "#dd5182",
		darkDetails: "#43437c",
		yellowDetails: "#e7af3d",
		lightText: "#efeff4",
	},
	effects: {
		glow: (color) => {
			return `0 0 8px ${color}`;
		},
		shadow: "0px 0px 11px rgba(4, 4, 5, 0.4);",
	},
};

