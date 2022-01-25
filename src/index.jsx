import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import ShoppingListHubPage from "./pages/ShoppingListHubPage";
import ShoppingListViewPage from "./pages/ShoppingListPage";

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Routes>
				<Route path={"/"} element={<App />}></Route>
				<Route path={"/login"} element={<LoginPage />}></Route>
				<Route path={"/register"} element={<RegisterPage />} />
				<Route path={"/hub"} element={<ShoppingListHubPage />} />
				<Route path={"/list"} element={<ShoppingListViewPage />} />
			</Routes>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
