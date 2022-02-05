import styled from "styled-components";

export const InputField = styled.input.attrs(({ type }) => ({
	type: type || "password",
}))`
	margin: 1em 0;
	width: min(250px, 67vw);
	width: ${({ width }) => (width ? width : "min(250px, 67vw)")};
	border-radius: 2em;
	border: none;
	height: 4vh;
	padding: 13px;
	font-family: "Barlow Condensed", sans-serfif;
	font-size: 1em;
`;

export const Select = styled.select.attrs(({ value }) => ({
	value: value || "",
}))`
	margin: 1em 0;
	width: ${({ width }) => (width ? width : "min(250px, 56vw)")};
	border-radius: 2em;
	border: none;
	height: 4vh;
	padding: 0 13px;
	font-family: "Barlow Condensed", sans-serfif;
	font-size: 1em;
	-webkit-appearance: none;
	background: #fff;

	optgroup,
	option {
		color: ${({ theme }) => theme.colors.lightishText};
		background: ${({ theme }) => theme.colors.lighterBackground};
	}
`;

export const LabelStyled = styled.label``;
