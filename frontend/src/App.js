import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeRoute from "./routes/HomeRoute";
import CategoryCoursesRoute from "./routes/CategoryCoursesRoute";
import Course from "./components/Course";

const App = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/" component={HomeRoute} />
				<Route
					path="/courses/category/:category"
					component={CategoryCoursesRoute}
				/>
				<Route path="/courses/:title" component={Course} />
			</Switch>
		</Router>
	);
};

export default App;
