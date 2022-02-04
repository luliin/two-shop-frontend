import { gql, useMutation } from "@apollo/client";

const REMOVE_COLLABORATOR = gql`
	mutation RemoveCollaborator(
		$handleCollaboratorInput: HandleCollaboratorInput!
	) {
		removeCollaborator(handleCollaboratorInput: $handleCollaboratorInput) {
			shoppingList {
				collaborator {
					username
				}
			}
			message
		}
	}
`;

export const useRemoveCollaborator = (handleCollaboratorInput) => {
	const [removeCollaborator] = useMutation(REMOVE_COLLABORATOR, {
		variables: { handleCollaboratorInput: handleCollaboratorInput },
	});

	return removeCollaborator;
};
