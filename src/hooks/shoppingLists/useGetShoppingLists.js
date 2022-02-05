import { gql, useQuery } from "@apollo/client";

const USER_SHOPPING_LISTS = gql`
	query UserShoppingLists($userId: ID!) {
		userById(userId: $userId) {
			username
			ownedShoppingLists {
				id
				name
				collaborator {
					username
				}
			}
			collaboratorShoppingLists {
				id
				name
				owner {
					username
				}
			}
		}
	}
`;

export const useGetUserShoppingLists = (userId) => {
	const { data } = useQuery(USER_SHOPPING_LISTS, {
		variables: { userId: userId },
		fetchPolicy: "no-cache",
	});
	return data?.userById;
};
