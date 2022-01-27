import React from "react";
import FormInput from "../../components/input/FormInput";
import { LoginContainer } from "./LoginPageStyles";

const LoginPage = () => {
	return (
		<LoginContainer>
			<h1>Login</h1>
			<FormInput />
			<FormInput />
			<FormInput />
			<FormInput />
		</LoginContainer>
	);
};

export default LoginPage;
