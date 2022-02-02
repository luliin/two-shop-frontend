import { Route, Routes } from "react-router-dom";
import { AppContainer } from "./components/app/AppStyles";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ShoppingListHubPage from "./pages/hub/ShoppingListHubPage";
import ShoppingListViewPage from "./pages/list/ShoppingListPage";
import { useState } from "react";
import { UserContext } from "./context/UserContext";

function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [shouldClose, setShouldClose] = useState(false);

	const handleMenuOpen = () => {
		if (menuOpen) setMenuOpen(!shouldClose);
	};
	return (
		<AppContainer onClick={handleMenuOpen}>
			<Navbar
				{...{
					menuOpen: [menuOpen, setMenuOpen],
					shouldClose: [shouldClose, setShouldClose],
				}}
			/>
			<Routes>
				<Route path={"/"} element={<HomePage />} />
				<Route path={"/login"} element={<LoginPage />} />
				<Route path={"/register"} element={<RegisterPage />} />
				<Route path={"/lists"} element={<ShoppingListHubPage />} />
				<Route
					path={"/lists/:listId"}
					element={<ShoppingListViewPage />}
				/>
			</Routes>
			<div className="App"></div>
		</AppContainer>
	);
}

export default App;
