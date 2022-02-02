import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			appUser {
				id
				username
			}
			jwt
		}
	}
`;

export const useLogin = () => {
	const [login, { data }] = useMutation(LOGIN);
	return login;
};
