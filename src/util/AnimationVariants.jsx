import { Theme } from "../components/app/AppStyles";

export const buttonVariants = {
	hover: {
		scale: 1.1,
	},
	hoverGlow: {
		scale: 1.1,
		boxShadow: Theme.effects.glow(Theme.colors.yellowDetails),
	},
	tapGlow: {
		boxShadow: Theme.effects.glow(Theme.colors.yellowDetails),
	},
};