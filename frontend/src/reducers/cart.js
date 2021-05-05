const initialState = {
	items: JSON.parse(localStorage.getItem("cart")) || [],
};

const cart = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case "ADD-TO-CART":
			const newCart = [...state.items, payload];
			localStorage.setItem("cart", JSON.stringify(newCart));
			return {
				...state,
				items: newCart,
			};
		case "REMOVE-ITEM":
			const newItems = state.items.filter((item) => item.id !== payload);
			localStorage.setItem("cart", JSON.stringify(newItems));
			return {
				items: newItems,
			};
		default:
			return state;
	}
};

export default cart;
