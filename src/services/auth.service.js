const logout = () => {
	sessionStorage.removeItem("user");
	sessionStorage.removeItem("jwt");
};

const getCurrentUser = () => {
	return JSON.parse(sessionStorage.getItem("user")) ?? null;
};

export default {
	logout,
	getCurrentUser,
};
