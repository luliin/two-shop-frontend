export const authHeader = () => {
	const user = JSON.parse(sessionStorage.getItem("user"));
	if (user && user.accessToken) {
		return user.accessToken;
	} else {
		return null;
	}
};
