import React from "react";
import { Link } from "react-router-dom";
import { WideButtonStyled } from "../../components/buttons/WideButtonStyled";
import {
	EmailIcon,
	FormContainer,
	FormDivider,
	FormHeading,
	FormStyled,
	IdIcon,
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

const RegisterPage = () => {

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(event.target[0].value);
		let userCredentials = {
			username: event.target[0].value,
			firstName: event.target[1].value,
			lastName: event.target[2].value,
			email: event.target[3].value,
			password: event.target[4].value,
			
		};
		let confirmedPassword = event.target[5].value;

		console.log(userCredentials);
	};
	return (
		<OuterContainer>
			<FormContainer height={"70vh"}>
				<FormHeading>Skapa konto</FormHeading>
				<FormStyled onSubmit={handleSubmit}>
					<InputRow mb={"-10px"}>
						<LabelStyled htmlFor="username">
							<UserIcon />
						</LabelStyled>
						<InputField
							autoComplete="username"
							type="text"
							placeholder={"Användarnamn"}
							name="username"
							required
						/>
					</InputRow>
					<InputRow mb={"-10px"}>
						<LabelStyled htmlFor="firstname">
							< IdIcon />
						</LabelStyled>
						<InputField
							autoComplete="given-name"
							type="text"
							placeholder={"Förnamn"}
							name="firstname"
							required
						/>
					</InputRow>
					<InputRow mb={"-10px"}>
						<LabelStyled htmlFor="lastname">
							<IdIcon />
						</LabelStyled>
						<InputField
							autoComplete="family-name"
							type="text"
							placeholder={"Efternamn"}
							name="lastname"
							required
						/>
					</InputRow>
					<InputRow mb={"-10px"}>
						<LabelStyled htmlFor="email">
							<EmailIcon />
						</LabelStyled>
						<InputField
							autoComplete="email"
							type="email"
							placeholder={"E-post"}
							name="email"
							required
						/>
					</InputRow>
					<InputRow mb={"-10px"}>
						<LabelStyled htmlFor="password">
							<PasswordIcon />
						</LabelStyled>

						<InputField
							placeholder="Lösenord"
							autoComplete="new-password"
							name="password"
							required
						/>
					</InputRow>
					<InputRow mb={"-10px"}>
						<LabelStyled htmlFor="password">
							<PasswordIcon />
						</LabelStyled>

						<InputField
							placeholder="Bekräfta lösenord"
							autoComplete="new-password"
							name="confirmPassword"
							required
						/>
					</InputRow>
					<WideButtonStyled
						whileHover={buttonVariants.hover}
						whileTap={buttonVariants.tapGlow}
					>
						{"Registrera dig"}
					</WideButtonStyled>
				</FormStyled>
				<FormDivider mt={"1px"} mb={"10px"} />
				<InputRow gap={"5px"} pb={"1em"}>
					Redan medlem?
					<Link to={"/login"}>
						<StrongText>Logga in</StrongText>
					</Link>
				</InputRow>
			</FormContainer>
		</OuterContainer>
	);
};


export default RegisterPage;
