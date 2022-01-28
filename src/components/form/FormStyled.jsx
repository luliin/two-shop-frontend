import styled from "styled-components";
import { RiLockPasswordFill, RiLockPasswordLine, RiUser3Fill, RiUser3Line } from "react-icons/ri";
import { MdEmail, MdOutlineEmail} from "react-icons/md";
import { BiIdCard } from "react-icons/bi";
import { FaIdCard } from "react-icons/fa";
import { motion } from "framer-motion";

export const FormStyled = styled.form`
	margin: 0 auto;
	width: 100%;
	max-width: 414px;
	padding: 1rem;
	display: flex;
	align-items: center;
	flex-direction: column;
	position: relative;
`;

export const OuterContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	box-shadow: ${({ theme }) => theme.effects.shadow};
	border-radius: 0 5em 0 5em;
	height: 60vh;
	height: ${({ height }) => (height ? height : "60vh")};
	background-color: ${({ theme }) => theme.colors.lighterBackground};
	margin-top: 10vh;
	width: 90vw;
`;

export const FormHeading = styled.h1`
	margin-bottom: ${({ mb }) => (mb ? mb : "")};
	&:hover {
		text-shadow: ${({ theme }) =>
			theme.effects.glow(theme.colors.deleteRed)};
		cursor: pointer;
	}
`;

export const UserIcon = styled(RiUser3Line)`
	font-size: 24px;
`;

export const PasswordIcon = styled(RiLockPasswordLine)`
	font-size: 24px;
`;

export const EmailIcon = styled(MdOutlineEmail)`
	font-size: 24px;
`;

export const IdIcon = styled(BiIdCard)`
	font-size: 24px;
`;

export const IdIconAlt = styled(FaIdCard)`
	font-size: 24px;
`;



export const InputRow = styled.div`
	display: flex;
	align-items: center;
	flex-grow: 1em;
	gap: ${({ gap }) => (gap ? gap : "1em")};
	font-weight: ${({ fw }) => (fw ? fw : "")};
	margin-bottom: ${({ mb }) => (mb ? mb : "")};
	padding-bottom: ${({ pb }) => (pb ? pb : "")};
	font-family: "Barlow Condensed", sans-serif;
	color: ${({ color }) => (color ? color : "")};
	cursor: ${({ cursor }) => (cursor ? cursor : "default")};
	> a {
		cursor: pointer;
		text-decoration: none;
		&::active {
			text-decoration: none;
		}
	}
`;

export const FormDivider = styled.div`
	height: 1px;
	width: min(290px, 80vw);
	background-color: ${({ theme }) => theme.colors.darkDetails};
	margin-bottom: ${({ mb }) => (mb ? mb : "")};
	margin-top: ${({ mt }) => (mt ? mt : "")};
`;

export const StrongText = styled(motion.span)`
	color: ${({ theme }) => theme.colors.purpleTextColor};
	font-weight: ${({ fw }) => (fw ? fw : "")};
`;

export const NormalText = styled.span`
	color: ${({ theme }) => theme.colors.lightText};
`;
