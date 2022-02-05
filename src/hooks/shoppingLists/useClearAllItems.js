import { gql, useMutation } from "@apollo/client";

const CLEAR_ALL_ITEMS = gql`
	mutation ClearAllItems($shoppingListId: ID!) {
		clearAllItems(shoppingListId: $shoppingListId) {
			message
		}
	}
`;

export const useClearAllItems = (shoppingListId) => {
	const [clearAllItems] = useMutation(CLEAR_ALL_ITEMS, {
		variables: { shoppingListId: shoppingListId },
	});
	return clearAllItems;
};
