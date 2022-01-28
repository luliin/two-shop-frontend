import React from "react";
import WideButton from "../../components/buttons/WideButton";
import FormInput from "../../components/input/FormInput";
import { LoginContainer, LoginHeading, OuterContainer } from "./LoginPageStyles";

const LoginPage = () => {
	return (
		<OuterContainer>
			<LoginContainer>
				<LoginHeading>Logga in</LoginHeading>
				<FormInput />
				<FormInput />
				<FormInput />
				<FormInput />
				<WideButton 
					variants={{}}
				{...{label: "Logga in"}}/>
			</LoginContainer>
		</OuterContainer>
	);
};

export default LoginPage;
