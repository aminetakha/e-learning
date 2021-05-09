import React from "react";
import Category from "../components/Category";
import Hero from "../components/Hero";
import Latest from "../components/Latest";
import Popular from "../components/Popular";

const HomeRoute = () => {
	return (
		<React.Fragment>
			<Hero />
			<Category />
			<Popular />
			<Latest />
		</React.Fragment>
	);
};

export default HomeRoute;
