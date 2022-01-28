import { Route, Routes } from "react-router-dom";
import { AppContainer } from "./components/app/AppStyles";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";
import ShoppingListHubPage from "./pages/ShoppingListHubPage";
import ShoppingListViewPage from "./pages/ShoppingListPage";

function App() {
	return (
		
			<AppContainer>
				<Navbar />
				<Routes>
					<Route path={"/"} element={<HomePage />} />
					<Route path={"/login"} element={<LoginPage />} />
					<Route path={"/register"} element={<RegisterPage />} />
					<Route path={"/lists"} element={<ShoppingListHubPage />} />
					<Route
						path={"/lists/:id"}
						element={<ShoppingListViewPage />}
					/>
				</Routes>
				<div className="App"></div>
			</AppContainer>
		
	);
}

export default App;
