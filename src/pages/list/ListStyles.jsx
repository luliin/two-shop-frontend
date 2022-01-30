import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa";

export const Backbutton = styled(FaChevronLeft)`
	font-size: 24px;
`;

export const RemoveText = styled.h4`
    color: ${({theme}) => theme.colors.darkDetails}
`
