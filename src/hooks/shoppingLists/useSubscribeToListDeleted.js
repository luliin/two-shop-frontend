import { gql, useSubscription } from "@apollo/client";

const LIST_DELETED = gql`
	subscription ListDeleted($shoppingListId: ID!) {
		listDeleted(shoppingListId: $shoppingListId) {
			message
			path
		}
	}
`;

export const useSubscribeToListDeleted = (shoppingListId) => {
	const listDeleted = useSubscription(LIST_DELETED, {
		variables: { shoppingListId: shoppingListId },
	});

	return listDeleted;
};
