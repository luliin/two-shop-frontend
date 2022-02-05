import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WideButtonStyled } from "../../components/buttons/WideButtonStyled";
import { useAddUser } from "../../hooks/users/useAddUser";
import {
	EmailIcon,
	FormContainer,
	FormDivider,
	FormHeading,
	FormStyled,
	IdIcon,
	InputRow,
	NormalText,
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
import { UserContext } from "../../context/UserContext";
import { Theme } from "../../components/app/AppStyles";
import { useLogin } from "../../hooks/users/useLogin";

const RegisterPage = () => {
	const { user, setUser } = useContext(UserContext);

	const [error, setError] = useState(false);

	const navigate = useNavigate();

	const addUser = useAddUser();
	const login = useLogin();

	useEffect(() => {
		const navigateToLists = () => navigate("/lists");
		if (user) {
			navigateToLists();
		}
		return () => {};
	}, [navigate, user]);

	const handleSubmit = (event) => {
		event.preventDefault();
		let userCredentials = {
			username: event.target[0].value,
			firstName: event.target[1].value,
			lastName: event.target[2].value,
			email: event.target[3].value,
			password: event.target[4].value,
		};
		let confirmedPassword = event.target[5].value;
		if (confirmedPassword !== userCredentials.password) {
			setError(true);
			return;
		}
		if (!error) {
			addUser({
				variables: {
					appUserInput: userCredentials,
				},
			})
				.then(() => {
					login({
						variables: {
							username: userCredentials.username,
							password: userCredentials.password,
						},
					})
						.then((response) => {
							let user = {
								id: response.data.login.appUser.id,
								username: response.data.login.appUser.username,
								accessToken: response.data.login.jwt,
							};
							sessionStorage.setItem(
								"user",
								JSON.stringify(user)
							);
							setUser(user);
						})
						.catch((e) => {
							if (e.message === "Unauthorized") {
								setError(true);
							}
						});
				})
				.catch((error) => {
					console.log(error.message);
				});
		}
		console.log(userCredentials);
	};
	return (
		<>
			{!user && (
				<OuterContainer>
					<FormContainer height={"90%"} mt={"0"} mb={"0"}>
						<FormHeading mt={"1em"}>Skapa konto</FormHeading>
						<FormStyled
							padding={"1rem 1rem 0"}
							onSubmit={handleSubmit}
							onFocus={() => {
								setError(false);
							}}
						>
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
									<IdIcon />
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
									inputMode={"email"}
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
							{error && (
								<InputRow color={Theme.colors.deleteRed}>
									Lösenorden matchar inte
								</InputRow>
							)}

							<WideButtonStyled
								whileHover={buttonVariants.hover}
								whileTap={buttonVariants.tapGlow}
							>
								{"Registrera dig"}
							</WideButtonStyled>
						</FormStyled>
						<FormDivider mt={"1px"} mb={"1em"} />
						<InputRow gap={"10px"} pb={"2em"}>
							<NormalText margin={"0 0.2em"}>
								Redan medlem?
							</NormalText>

							<Link to={"/login"}>
								<StrongText margin={"0 0.2em"}>
									Logga in
								</StrongText>
							</Link>
						</InputRow>
					</FormContainer>
				</OuterContainer>
			)}
		</>
	);
};

export default RegisterPage;
