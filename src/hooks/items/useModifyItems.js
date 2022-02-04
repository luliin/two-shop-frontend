import { gql, useMutation } from "@apollo/client";

const MODIFY_SHOPPING_LIST_ITEMS = gql`
	mutation ModifyItems(
		$shoppingListItemInput: ShoppingListItemInput!
		$removeItem: Boolean
		$itemId: ID
	) {
		modifyShoppingListItems(
			shoppingListItemInput: $shoppingListItemInput
			removeItem: $removeItem
			itemId: $itemId
		) {
			name
		}
	}
`;

export const useModifyItems = (shoppingListItemInput, removeItem, itemId) => {
	const [modifyItems] = useMutation(MODIFY_SHOPPING_LIST_ITEMS, {
		variables: {
			shoppingListItemInput: shoppingListItemInput,
			removeItem: removeItem,
			itemId: itemId,
		},
	});

	return modifyItems;
};
