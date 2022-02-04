import { gql, useMutation } from "@apollo/client";

const DELETE_SHOPPING_LIST = gql`
	mutation DeleteShoppingList($shoppingListId: ID!) {
		deleteShoppingList(shoppingListId: $shoppingListId) {
			message
			path
		}
	}
`;

export const useDeleteShoppingList = (shoppingListId) => {
	const [deleteShoppingList] = useMutation(DELETE_SHOPPING_LIST, {
		variables: { shoppingListId: shoppingListId },
	});

	return deleteShoppingList;
};
