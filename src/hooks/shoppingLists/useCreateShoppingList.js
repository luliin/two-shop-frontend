import { gql, useMutation } from "@apollo/client";

const CREATE_SHOPPING_LIST = gql`
	mutation CreateShoppingList(
		$createShoppingListInput: CreateShoppingListInput!
	) {
		createShoppingList(createShoppingListInput: $createShoppingListInput) {
			id
			name
			collaborator {
				username
			}
		}
	}
`;

export const useCreateShoppingList = () => {
	const [createShoppingList] = useMutation(CREATE_SHOPPING_LIST);
	return createShoppingList;
};
