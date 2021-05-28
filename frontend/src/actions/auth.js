export const login = (user, cart) => {
	return { type: "LOGIN", payload: { user, cart } };
};

export const logout = () => {
	return { type: "LOGOUT" };
};

export const removeCourse = () => {
	return { type: "REMOVE-COURSE" };
};

export const addCourse = () => {
	return { type: "ADD-COURSE" };
};

export const updateProfile = (data) => {
	return { type: "UPDATE-PROFILE", payload: data };
};
