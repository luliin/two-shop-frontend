import { gql, useMutation } from "@apollo/client";

const ADD_USER = gql`
	mutation AddUser($appUserInput: AppUserInput!) {
		addUser(appUserInput: $appUserInput) {
			id
			username
		}
	}
`;

export const useAddUser = () => {
	const [addUser] = useMutation(ADD_USER);
	return addUser;
};
