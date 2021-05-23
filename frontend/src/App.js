import React, { useEffect } from "react";
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
import MyCourses from "./components/MyCourses";
import CourseVideo from "./components/CourseVideo";
import axios from "axios";
import ManageCourse from "./components/ManageCourse";
import InstructorDashboard from "./components/InstructorDashboard";
import CreateCourse from "./components/CreateCourse";
import Register from "./components/Register";
import NavbarInstructor from "./components/NavbarInstructor";
import Footer from "./components/Footer";

const App = () => {
	const auth = useSelector((state) => state.auth);

	// useEffect(() => {
	// 	axios
	// 		.get("/checkout", { withCredentials: true })
	// 		.then((res) => console.log(res.data));
	// }, []);

	return (
		<Router>
			{auth.user === null || auth.user.type === "student" ? (
				<Navbar />
			) : (
				<NavbarInstructor />
			)}
			<Switch>
				<Route exact path="/" component={HomeRoute} />
				<Route path="/course/:id/manage" component={ManageCourse} />
				<Route path="/course/create" component={CreateCourse} />
				<Route
					path="/instructor/course"
					component={InstructorDashboard}
				/>
				<Route
					path="/my-courses"
					render={() =>
						auth.isAuthenticated ? (
							<MyCourses />
						) : (
							<Redirect to="/" />
						)
					}
				/>
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
					path="/register"
					render={() =>
						!auth.isAuthenticated ? (
							<Route path="/register" component={Register} />
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
				<Route path="/learn/:title" component={CourseVideo} />
				<Route path="/courses/:title" component={CourseDetails} />
			</Switch>
			<Footer />
		</Router>
	);
};

export default App;
