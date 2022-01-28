import React from "react";
import { Link } from "react-router-dom";
import { WideButtonStyled } from "../../components/buttons/WideButtonStyled";
import {
	FormContainer,
	FormDivider,
	FormHeading,
	FormStyled,
	InputRow,
	OuterContainer,
	PasswordIcon,
	StrongText,
	UserIcon,
} from "../../components/form/FormStyled";
import {
	InputField,
	LabelStyled,
} from "../../components/input/FormInputStyles";
import { buttonVariants } from "../../util/AnimationVariants";

const LoginPage = () => {
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(event.target[0].value);
		let userCredentials = {
			credential: event.target[0].value,
			password: event.target[1].value,
		};

		console.log(userCredentials);
	};
	return (
		<OuterContainer>
			<FormContainer>
				<FormHeading>Logga in</FormHeading>
				<FormStyled onSubmit={handleSubmit}>
					<InputRow>
						<LabelStyled htmlFor="username">
							<UserIcon />
						</LabelStyled>
						<InputField
							autoComplete="username"
							type="text"
							placeholder={"Användarnamn eller e-post"}
							name="username"
							required
						/>
					</InputRow>
					<InputRow>
						<LabelStyled htmlFor="password">
							<PasswordIcon />
						</LabelStyled>

						<InputField
							placeholder="Lösenord"
							autoComplete="password"
							name="password"
							required
						/>
					</InputRow>
					<WideButtonStyled
						whileHover={buttonVariants.hover}
						whileTap={buttonVariants.tapGlow}
					>
						{"Logga in"}
					</WideButtonStyled>
				</FormStyled>
				<InputRow cursor={"pointer"} onClick={() => alert("Maila twoshopinfo@gmail.com")}>
					Glömt ditt lösenord?
				</InputRow>
				<FormDivider mt={"20px"} mb={"20px"} />
				<InputRow gap={"5px"} pb={"1em"}>
					Inget konto?
					<Link to={"/register"}>
						<StrongText>Registrera dig här</StrongText>
					</Link>
				</InputRow>
			</FormContainer>
		</OuterContainer>
	);
};

export default LoginPage;
