


const logout = () => {
	sessionStorage.removeItem("user");
	sessionStorage.removeItem("jwt");
};

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

const getCurrentAccessToken = () => {
	return JSON.parse(localStorage.getItem("jwt"));
};

export default {
	logout,
	getCurrentUser,
	getCurrentAccessToken,
};
