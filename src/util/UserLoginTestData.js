export const UserHubData = {
	username: "luliin",
	ownedShoppingLists: [
		{
			id: "1",
			name: "Första listan",
			collaborator: {
				username: "Lekkit",
			},
		},
		{
			id: "4",
			name: "Fjärde listan",
			collaborator: {
				username: "Lekkit",
			},
		},
	],
	collaboratorShoppingLists: [
		{
			id: "2",
			name: "Andra listan",
			owner: {
				username: "Lekkit",
			},
		},
		{
			id: "3",
			name: "Tredje listan",
			owner: {
				username: "jolia",
			},
		},
	],
};

export const ListData = {
	shoppingListId: "1",
	name: "Första listan",
	isOwner: false,
	collaborator: {
		username: "jolia"
	},
	owner: {
		username: "luliin",
	},
	items: [
		{
			itemId: "1",
			name: "Honung",
			quantity: 1,
			unit: "ST",
			isCompleted: false,
		},
		{
			itemId: "2",
			name: "Ägg",
			quantity: 24,
			unit: "ST",
			isCompleted: false,
		},
		{
			itemId: "3",
			name: "Senap",
			quantity: 1,
			unit: "ST",
			isCompleted: false,
		},
		{
			itemId: "4",
			name: "Ketchup",
			quantity: 1,
			unit: "ST",
			isCompleted: false,
		},
		{
			itemId: "5",
			name: "Avocado",
			quantity: 5,
			unit: "ST",
			isCompleted: false,
		},
		{
			itemId: "6",
			name: "Babyspenat",
			quantity: 2,
			unit: "ST",
			isCompleted: false,
		},
		{
			itemId: "7",
			name: "Duschkräm",
			quantity: 1,
			unit: "ST",
			isCompleted: false,
		},
		{
			itemId: "8",
			name: "Mjölk",
			quantity: 3,
			unit: "L",
			isCompleted: true,
		},
	],
};
