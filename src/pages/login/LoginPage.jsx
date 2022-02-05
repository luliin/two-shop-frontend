import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Theme } from "../../components/app/AppStyles";
import { WideButtonStyled } from "../../components/buttons/WideButtonStyled";
import {
	FormContainer,
	FormDivider,
	FormHeading,
	FormStyled,
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
import { UserContext } from "../../context/UserContext";
import { useLogin } from "../../hooks/users/useLogin";
import { buttonVariants } from "../../util/AnimationVariants";

const LoginPage = () => {
	const { user, setUser } = useContext(UserContext);
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const navigateToLists = () => navigate("/lists");
		if (user) {
			navigateToLists();
		}
		return () => {};
	}, [navigate, user]);

	const handleErrorMessage = () => {
		setError(false);
	};

	const login = useLogin();

	const [loginInput, setLoginInput] = useState({
		username: "",
		password: "",
	});

	function handleChange(event) {
		const value = event.target.value;
		setLoginInput({
			...loginInput,
			[event.target.name]: value,
		});
	}

	const resetInputs = () => {
		setLoginInput({
			username: "",
			password: "",
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		//on succesful login redirect to hub page

		login({
			variables: {
				username: loginInput.username,
				password: loginInput.password,
			},
		})
			.then((response) => {
				let user = {
					id: response.data.login.appUser.id,
					username: response.data.login.appUser.username,
					accessToken: response.data.login.jwt,
				};
				sessionStorage.setItem("user", JSON.stringify(user));
				setUser(user);
				resetInputs();
			})
			.catch((e) => {
				if (e.message === "Unauthorized") {
					setError(true);
				}
			});
	};
	return (
		<>
			{!user && (
				<OuterContainer>
					<FormContainer mt={"10%"}>
						<FormHeading mb={"0.3em"} mt={"0.8em"}>
							Logga in
						</FormHeading>
						<FormStyled onSubmit={handleSubmit}>
							<InputRow>
								<LabelStyled
									htmlFor="username"
									title={"Ange användarnamn eller e-post"}
								>
									<UserIcon />
								</LabelStyled>
								<InputField
									onFocus={handleErrorMessage}
									value={loginInput.username}
									onChange={handleChange}
									autoComplete="username"
									type="text"
									placeholder={"Användarnamn eller e-post"}
									name="username"
									required
								/>
							</InputRow>
							<InputRow>
								<LabelStyled
									htmlFor="password"
									title={"Ange ditt lösenord"}
								>
									<PasswordIcon />
								</LabelStyled>

								<InputField
									onFocus={handleErrorMessage}
									value={loginInput.password}
									onChange={handleChange}
									placeholder="Lösenord"
									autoComplete="password"
									name="password"
									required
								/>
							</InputRow>
							{error && (
								<InputRow
									cursor={"pointer"}
									onClick={() =>
										alert("Maila twoshopinfo@gmail.com")
									}
									color={Theme.colors.deleteRed}
								>
									Felaktiga användaruppgifter!
								</InputRow>
							)}

							<WideButtonStyled
								whileHover={buttonVariants.hover}
								whileTap={buttonVariants.tapGlow}
							>
								{"Logga in"}
							</WideButtonStyled>
						</FormStyled>
						<InputRow
							margin={"0 1em"}
							cursor={"pointer"}
							onClick={() => alert("Maila twoshopinfo@gmail.com")}
						>
							Glömt ditt lösenord?
						</InputRow>
						<FormDivider mt={"20px"} mb={"1em"} />
						<InputRow gap={"10px"} pb={"2em"}>
							<NormalText margin={"0 0.2em"}>
								Inget konto?
							</NormalText>

							<Link to={"/register"}>
								<StrongText margin={"0 0.2em"}>
									Registrera dig här
								</StrongText>
							</Link>
						</InputRow>
					</FormContainer>
				</OuterContainer>
			)}
		</>
	);
};

export default LoginPage;
