import { gql, useMutation } from "@apollo/client";

const INVITE_COLLABORATOR = gql`
	mutation InviteCollaborator(
		$handleCollaboratorInput: HandleCollaboratorInput!
	) {
		inviteCollaborator(handleCollaboratorInput: $handleCollaboratorInput) {
			shoppingList {
				collaborator {
					username
				}
			}
			message
		}
	}
`;

export const useInviteCollaborator = (handleCollaboratorInput) => {
	const [inviteCollaborator] = useMutation(INVITE_COLLABORATOR, {
		variables: { handleCollaboratorInput: handleCollaboratorInput },
	});

	return inviteCollaborator;
};
