import React from "react";
import { UserContainer } from "./AvatarStyles";

const Avatar = ({ username: name, owner: owner }) => {
	return (
		<UserContainer
			mr={owner ? "1vh" : ""}
			ml={owner ?  "": "1vh"}
			owner={owner}
		>
			{name ? name.substring(0, 1) : ""}
		</UserContainer>
	);
};

export default Avatar;
