import React from "react";
import Navbar from "./components/Navbar";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import HomeRoute from "./routes/HomeRoute";
import CategoryCoursesRoute from "./routes/CategoryCoursesRoute";
import CourseDetails from "./components/CourseDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import UserCart from "./components/UserCart";

const App = () => {
	const auth = useSelector((state) => state.auth);
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/" component={HomeRoute} />
				<Route
					path="/students/cart"
					render={() =>
						auth.isAuthenticated ? (
							<UserCart />
						) : (
							<Redirect to="/cart" />
						)
					}
				/>
				<Route
					path="/login"
					render={() =>
						!auth.isAuthenticated ? (
							<Route path="/login" component={Login} />
						) : (
							<Redirect to="/" />
						)
					}
				/>
				<Route
					path="/cart"
					render={() =>
						auth.isAuthenticated ? (
							<Redirect to="/students/cart" />
						) : (
							<Cart />
						)
					}
				/>
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
