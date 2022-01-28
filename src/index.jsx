import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Theme } from "./components/app/AppStyles";

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={Theme}>
			<Router>
				<App />
			</Router>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
