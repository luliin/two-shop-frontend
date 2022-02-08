import { gql, useSubscription } from "@apollo/client";

const ITEM_MODIFIED = gql`
	subscription ItemModified($shoppingListId: ID!) {
		itemModified(shoppingListId: $shoppingListId) {
			items {
				id
				name
				quantity
				unit
				isCompleted
			}
		}
	}
`;

export const useSubscribeToItemModified = (shoppingListId) => {
	const itemModified = useSubscription(ITEM_MODIFIED, {
		variables: { shoppingListId: shoppingListId },
	});

	return itemModified;
};
