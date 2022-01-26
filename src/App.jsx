import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShoppingListHubPage from "./pages/ShoppingListHubPage";
import ShoppingListViewPage from "./pages/ShoppingListPage";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path={"/"} element={<HomePage />} />
				<Route path={"/login"} element={<LoginPage />} />
				<Route path={"/register"} element={<RegisterPage />} />
				<Route path={"/lists"} element={<ShoppingListHubPage />} />
				<Route path={"/lists/:id"} element={<ShoppingListViewPage />} />
			</Routes>
			<div className="App"></div>
		</>
	);
}

export default App;
