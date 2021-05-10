export const login = (user, cart) => {
	return { type: "LOGIN", payload: { user, cart } };
};

export const removeCourse = () => {
	return { type: "REMOVE-COURSE" };
};

export const addCourse = () => {
	return { type: "ADD-COURSE" };
};
