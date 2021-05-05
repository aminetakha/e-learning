export const addToCart = (item) => {
	return { type: "ADD-TO-CART", payload: item };
};

export const removeFromCart = (id) => {
	return { type: "REMOVE-ITEM", payload: id };
};
