import { Route, Routes } from "react-router-dom";
import { AppContainer } from "./components/app/AppStyles";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ShoppingListHubPage from "./pages/hub/ShoppingListHubPage";
import ShoppingListViewPage from "./pages/list/ShoppingListPage";
import { useEffect, useMemo, useState } from "react";
import { UserContext } from "./context/UserContext";
import { MenuContext } from "./context/MenuContext";
import AuthService from "./services/auth.service";

function App() {
	const [shouldClose, setShouldClose] = useState(false);
	const [user, setUser] = useState(null);
	const [menu, setMenu] = useState(false);
	const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
	const menuValue = useMemo(() => ({ menu, setMenu }), [menu, setMenu]);

	const handleMenuOpen = () => {
		if (menu) {
			setMenu(!shouldClose);
		}
	};

	useEffect(() => {
		setUser(AuthService.getCurrentUser());
	}, []);
	return (
		<>
			{}
			<UserContext.Provider value={userValue}>
				<MenuContext.Provider value={menuValue}>
					<AppContainer onClick={handleMenuOpen}>
						<Navbar
							{...{
								shouldClose: [shouldClose, setShouldClose],
							}}
						/>
						<Routes>
							<Route path={"/"} element={<HomePage />} />
							<Route path={"/login"} element={<LoginPage />} />
							<Route
								path={"/register"}
								element={<RegisterPage />}
							/>
							<Route
								path={"/lists"}
								element={<ShoppingListHubPage />}
							/>
							<Route
								path={"/lists/:listId"}
								element={<ShoppingListViewPage />}
							/>
						</Routes>
						<div className="App"></div>
					</AppContainer>
				</MenuContext.Provider>
			</UserContext.Provider>
		</>
	);
}

export default App;
