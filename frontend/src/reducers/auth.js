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
		case "UPDATE-PROFILE":
			return {
				...state,
				isAuthenticated: true,
				user: {
					...state.user,
					...payload,
				},
			};
		case "LOGOUT":
			return {
				...state,
				isAuthenticated: false,
				user: null,
				cart: localStorage.getItem("cart"),
				loading: true,
			};
		default:
			return state;
	}
};

export default auth;
