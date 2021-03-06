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
import MyCourses from "./components/MyCourses";
import CourseVideo from "./components/CourseVideo";
import ManageCourse from "./components/ManageCourse";
import InstructorDashboard from "./components/InstructorDashboard";
import CreateCourse from "./components/CreateCourse";
import Register from "./components/Register";
import NavbarInstructor from "./components/NavbarInstructor";
import Footer from "./components/Footer";
import CourseStats from "./components/CourseStats";
import Search from "./components/Search";
import Instructors from "./components/Instructors";
import InstructorDetails from "./components/InstructorDetails";
import InstructorUpdate from "./components/InstructorUpdate";
import StudentUpdate from "./components/StudentUpdate";
import StripeContainer from "./components/StripeContainer";

const App = () => {
	const auth = useSelector((state) => state.auth);

	return (
		<Router>
			{auth.user === null || auth.user.type === "student" ? (
				<Navbar />
			) : (
				<NavbarInstructor />
			)}
			<Switch>
				<Route exact path="/" component={HomeRoute} />
				<Route
					path="/student/update"
					render={() =>
						!auth.isAuthenticated ||
						(auth.isAuthenticated &&
							auth.user.type !== "student") ? (
							<Redirect to="/" />
						) : (
							<StudentUpdate />
						)
					}
				/>
				<Route path="/course/:id/manage" component={ManageCourse} />
				<Route path="/course/create" component={CreateCourse} />
				<Route path="/courses/:course/search" component={Search} />
				<Route
					path="/courses/:courseId/enroll"
					component={StripeContainer}
				/>
				<Route
					path="/instructor/course"
					render={() =>
						!auth.isAuthenticated ||
						(auth.isAuthenticated &&
							auth.user.type !== "instructor") ? (
							<Redirect to="/" />
						) : (
							<InstructorDashboard />
						)
					}
				/>
				<Route
					path="/my-courses"
					render={() =>
						auth.isAuthenticated && auth.user.type === "student" ? (
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
				<Route
					path="/course/:courseId/stats"
					render={() =>
						auth.isAuthenticated &&
						auth.user.type === "instructor" ? (
							<CourseStats />
						) : (
							<Redirect to="/" />
						)
					}
				/>
				<Route path="/instructors" component={Instructors} />
				<Route
					path="/instructor/update"
					render={() =>
						!auth.isAuthenticated ||
						(auth.isAuthenticated &&
							auth.user.type !== "instructor") ? (
							<Redirect to="/" />
						) : (
							<InstructorUpdate />
						)
					}
				/>
				<Route
					path="/instructor/:instructorId"
					component={InstructorDetails}
				/>
			</Switch>
			<Footer />
		</Router>
	);
};

export default App;
