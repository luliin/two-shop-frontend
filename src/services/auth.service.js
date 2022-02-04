const logout = () => {
	sessionStorage.removeItem("user");
	sessionStorage.removeItem("jwt");
};

const getCurrentUser = () => {
	return JSON.parse(sessionStorage.getItem("user")) ?? null;
};

const AuthService = {
	logout,
	getCurrentUser,
};

export default AuthService;
