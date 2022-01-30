import React from "react";
import { loaderVariants } from "../../util/AnimationVariants";
import { StyledLoader } from "./LoaderStyles";

const Loader = () => {
	return (
		<>
			<StyledLoader
				variants={loaderVariants}
				animate="animationOne"
			></StyledLoader>
		</>
	);
};

export default Loader;
