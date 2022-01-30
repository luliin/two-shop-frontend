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


export const loaderVariants = {
	animationOne: {
		x: [-20, 20],
		y: [0, -30],
		transition: {
			x: {
				repeat: Infinity,
				repeatType: 'reverse',
				duration: 0.5,
			},
			y: {
				repeat: Infinity,
				repeatType: 'reverse',
				duration: 0.25,
			},
		},
	},
};