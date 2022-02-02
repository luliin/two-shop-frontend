import {
	ApolloClient,
	ApolloLink,
	ApolloLink as ApolloLink2,
	from,
	HttpLink,
	InMemoryCache,
	Observable,
	split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { print, GraphQLError } from "graphql";
import { Client, createClient } from "graphql-ws";

class WebSocketLink extends ApolloLink {
	constructor(options) {
		super();
		this.client = createClient(options);
	}

	request(operation) {
		return new Observable((sink) => {
			return this.client.subscribe(
				{ ...operation, query: print(operation.query) },
				{
					next: sink.next.bind(sink),
					complete: sink.complete.bind(sink),
					error: (err) => {
						if (Array.isArray(err))
							// GraphQLError[]
							return sink.error(
								new Error(
									err.map(({ message }) => message).join(", ")
								)
							);

						if (err instanceof CloseEvent)
							return sink.error(
								new Error(
									`Socket closed with event ${err.code} ${
										err.reason || ""
									}` // reason will be available on clean closes only
								)
							);

						return sink.error(err);
					},
				}
			);
		});
	}
}

const httpLink = new HttpLink({
	uri: "https://two-shop.herokuapp.com/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError, clientErrors }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) => {
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(locations[0])}, Path: ${path}`
			);
		});
    
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = new ApolloLink2((operation, forward) => {
	const token = null;
	operation.setContext(() => ({
		headers: {
			authorization: token,
		},
	}));
	return forward(operation);
});

const wsLink = new WebSocketLink({
	url: "wss://two-shop.herokuapp.com/subscription",
	connectionParams: () => ({ Authorization: 1234 }),
});

const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	httpLink
);

const client = new ApolloClient({
	link: from([errorLink, authLink, splitLink]),
	cache: new InMemoryCache(),
});

export default client;
