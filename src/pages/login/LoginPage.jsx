import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Theme } from "../../components/app/AppStyles";
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
import { UserContext } from "../../context/UserContext";
import { useLogin } from "../../hooks/users/useLogin";
import { buttonVariants } from "../../util/AnimationVariants";

const LoginPage = () => {
	const message = useContext(UserContext);

	const [error, setError] = useState(false);

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
					accessToken: response.data.login.jwt
				};
				sessionStorage.setItem("user", JSON.stringify(user));
				resetInputs();
			})
			.catch((e) => {
				if (e.message === "Unauthorized") {
					setError(true);
				} else {
					console.log("nej");
				}
			});
	};
	return (
		<OuterContainer>
			<FormContainer>
				<FormHeading>Logga in</FormHeading>
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
							onClick={() => alert("Maila twoshopinfo@gmail.com")}
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
					cursor={"pointer"}
					onClick={() => alert("Maila twoshopinfo@gmail.com")}
				>
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
