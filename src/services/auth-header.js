export default authHeader = () => {
	const user = JSON.parse(sessionStorage.getItem("user"));

	if (user && user.accessToken) {
		return { Authorization: user.accessToken };
	} else {
		return {};
	}
}
