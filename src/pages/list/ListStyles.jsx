import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";
import {
	RiCheckboxBlankLine,
	RiCheckboxLine,
	RiDeleteBinLine,
	RiEdit2Line,
} from "react-icons/ri";

export const Backbutton = styled(FaChevronLeft)`
	font-size: 24px;
`;

export const RemoveText = styled.h4`
	color: ${({ theme }) => theme.colors.darkDetails};
`;

export const ListContainer = styled.div`
	height: 100%;
	display: grid;
	grid-template-columns: 1fr;
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
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
	/* overflow: hidden; */
`;

export const ItemTile = styled.div`
	height: 12vh;
	background: ${({ theme }) => theme.colors.lighterBackground};
	width: min(70vw, 800px);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	@media (max-width: 389px) {
		height: 14vh;
	}
`;

export const OuterTileContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ItemTitleWrapper = styled.div`
	height: 50%;
	width: min(70vw, 800px);
	display: flex;
	justify-content: center;

	color: ${({ theme }) => theme.colors.blueTextColor};
	font-family: ${({ theme }) => theme.fonts.secondary};
	font-weight: bold;
	font-size: 1.1em;
	/* overflow-x: hidden; */
	overflow-y: auto;
	overflow-wrap: break-word;
	white-space: pre-wrap;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;

export const ItemTitle = styled.p`
	margin: 1vh 10px 0 10px;
	overflow-wrap: anywhere;
	@media (max-width: 389px) {
		margin-top: 0.5em;
	}
	@media (max-width: 300px) {
		/* margin-top: 3em; */
	}
`;

export const TileDivider = styled.div`
	background: ${({ theme }) => theme.colors.darkDetails};
	height: 1px;
	width: 80%;
`;

export const TileRow = styled(ItemTitleWrapper)`
	align-items: center;
	padding: 0 1em 0 1em;
	height: 4.5vh;
	justify-content: space-around;
	overflow: hidden;
	color: ${({ theme }) => theme.colors.lightishText};
`;

export const TrashIcon = styled(RiDeleteBinLine)`
	font-size: 24px;
	color: ${({ theme }) => theme.colors.deleteRed};
`;

export const EditIcon = styled(RiEdit2Line)`
	font-size: 24px;
	/* color: ${({ theme }) => theme.colors.deleteRed}; */
`;

export const CheckBoxChecked = styled(RiCheckboxLine)`
	font-size: 24px;
	color: ${({ theme }) => theme.colors.green};
`;

export const CheckBoxUnchecked = styled(RiCheckboxBlankLine)`
    font-size: 24px;
    color: ${({ theme }) => theme.colors.darkDetails};
`;
