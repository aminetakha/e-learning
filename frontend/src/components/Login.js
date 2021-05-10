import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { Redirect } from "react-router";

const Login = (props) => {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
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
		axios
			.post("http://localhost:5000/login/student", credentials, {
				withCredentials: true,
			})
			.then((res) => {
				console.log("data", res.data.user);
				dispatch(login(res.data.user, res.data.cart));
				props.history.replace("/");
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<form onSubmit={loginHandler}>
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
