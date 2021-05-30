import React, { useState } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import StyledRadio from "./StyledRadio";
import {
	NotificationContainer,
	NotificationManager,
} from "react-notifications";

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
		const cart = JSON.parse(localStorage.getItem("cart"));
		credentials.cart = cart;
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
			.catch((err) =>
				NotificationManager.error("Wrong Credentials", "Error")
			);
	};

	return (
		<div>
			<NotificationContainer />
			<Grid
				container
				style={{
					display: "flex",
					justifyContent: "center",
					margin: "100px 0",
				}}
			>
				<Grid md={6} xs={12}>
					<form
						onSubmit={loginHandler}
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<div>
							<FormControl component="fieldset">
								<FormLabel component="legend">
									Login as
								</FormLabel>
								<RadioGroup
									defaultValue="student"
									aria-label="type"
									name="customized-radios"
								>
									<div style={{ display: "flex" }}>
										<FormControlLabel
											value="student"
											name="type"
											control={<StyledRadio />}
											label="Student"
											onChange={onChangeHandler}
										/>
										<FormControlLabel
											value="instructor"
											name="type"
											control={<StyledRadio />}
											label="Instructor"
											onChange={onChangeHandler}
										/>
									</div>
								</RadioGroup>
							</FormControl>
						</div>
						<FormControl style={{ width: "70%", margin: "30px 0" }}>
							<InputLabel htmlFor="email">Email</InputLabel>
							<Input
								id="email"
								name="email"
								aria-describedby="email-text"
								value={credentials.email}
								onChange={onChangeHandler}
							/>
						</FormControl>
						<FormControl
							style={{ width: "70%", marginBottom: "30px" }}
						>
							<InputLabel htmlFor="password">password</InputLabel>
							<Input
								id="password"
								name="password"
								type="password"
								aria-describedby="password-text"
								value={credentials.password}
								onChange={onChangeHandler}
							/>
						</FormControl>
						<Button
							type="submit"
							variant="contained"
							color="secondary"
							style={{ width: "40%" }}
						>
							Login
						</Button>
					</form>
				</Grid>
			</Grid>
		</div>
	);
};

export default Login;
