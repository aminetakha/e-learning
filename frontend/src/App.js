import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeRoute from "./routes/HomeRoute";
import CategoryCoursesRoute from "./routes/CategoryCoursesRoute";
import CourseDetails from "./components/CourseDetails";
import Cart from "./components/Cart";

const App = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/" component={HomeRoute} />
				<Route path="/cart" component={Cart} />
				<Route
					path="/courses/category/:category"
					component={CategoryCoursesRoute}
				/>
				<Route path="/courses/:title" component={CourseDetails} />
			</Switch>
		</Router>
	);
};

export default App;
