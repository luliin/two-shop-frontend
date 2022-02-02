import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Theme } from "./components/app/AppStyles";
import { ApolloProvider } from "@apollo/client";
import client from "./common/apollo-client";

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={Theme}>
			<Router>
				<ApolloProvider client={client}>
					<App client={client} />
				</ApolloProvider>
			</Router>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
