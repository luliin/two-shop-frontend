import { gql, useQuery } from "@apollo/client";

const GET_SHOPPING_LIST_BY_ID_LIST_VIEW = gql`
	query GetShoppingListById($shoppingListId: ID!) {
		shoppingListById(shoppingListId: $shoppingListId) {
			id
			name
			items {
				id
				name
				quantity
				unit
				isCompleted
			}
			owner {
				username
			}
			collaborator {
				username
			}
		}
	}
`;

export const useGetUserShoppingListById = () => {
	const [{ data }] = useQuery(GET_SHOPPING_LIST_BY_ID_LIST_VIEW);
	return data?.shoppingListById;
};
