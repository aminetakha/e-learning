import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";

const Login = (props) => {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
		type: "student",
	});

	const dispatch = useDispatch();

	const onChangeHandler = (e) => {
		setCredentials({
			...credentials,
			[e.target.name]: e.target.value,
		});
	};

	const loginHandler = (e) => {
		e.preventDefault();
		const URL = "http://localhost:5000/login/" + credentials.type;
		axios
			.post(URL, credentials, {
				withCredentials: true,
			})
			.then((res) => {
				const user = res.data.user;
				user.type = res.data.type;
				const cart = user.type === "instructor" ? [] : res.data.cart;
				dispatch(login(res.data.user, cart));
				if (user.type === "instructor") {
					return props.history.replace("/instructor/course");
				}
				props.history.replace("/");
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<form onSubmit={loginHandler}>
				<div>
					<input
						type="radio"
						name="type"
						value="student"
						onChange={onChangeHandler}
					/>{" "}
					Student
					<input
						type="radio"
						name="type"
						value="instructor"
						onChange={onChangeHandler}
					/>{" "}
					Instructor
				</div>
				<input
					type="text"
					name="email"
					value={credentials.email}
					onChange={onChangeHandler}
					placeholder="Enter your email"
				/>{" "}
				<br />
				<input
					type="password"
					name="password"
					value={credentials.password}
					onChange={onChangeHandler}
					placeholder="Enter your password"
				/>{" "}
				<br />
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
