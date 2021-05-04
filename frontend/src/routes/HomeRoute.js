import React from "react";
import Category from "../components/Category";
import Hero from "../components/Hero";

const HomeRoute = () => {
	return (
		<React.Fragment>
			<Hero />
			<Category />
		</React.Fragment>
	);
};

export default HomeRoute;
