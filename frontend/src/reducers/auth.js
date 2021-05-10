const initialState = {
	isAuthenticated: false,
	user: null,
	cart: null,
	loading: true,
};

const auth = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case "LOGIN":
			return {
				...state,
				isAuthenticated: true,
				user: payload.user,
				cart: payload.cart,
				loading: false,
			};
		case "REMOVE-COURSE":
			return {
				...state,
				cart: state.cart - 1,
			};
		case "ADD-COURSE":
			return {
				...state,
				cart: state.cart + 1,
			};
		default:
			return state;
	}
};

export default auth;
