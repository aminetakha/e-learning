import React, { useState } from "react";
import {
	FormControl,
	InputLabel,
	Input,
	Grid,
	Button,
} from "@material-ui/core";
import {
	NotificationContainer,
	NotificationManager,
} from "react-notifications";
import axios from "axios";
import { withRouter } from "react-router-dom";

const StudentForm = (props) => {
	const [studentData, setStudentData] = useState({
		username: "",
		email: "",
		password: "",
		cpassword: "",
		photo: "",
		country: "",
	});

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (studentData.password !== studentData.cpassword) {
			NotificationManager.error("Passwords do not match", "Error");
		} else {
			const data = new FormData();
			data.append("username", studentData.username);
			data.append("email", studentData.email);
			data.append("password", studentData.password);
			data.append("photo", studentData.photo);
			data.append("country", studentData.country);
			try {
				const res = await axios.post("/register/student", data);
				NotificationManager.success(
					"Account created successfully! you can now log in",
					"Success"
				);
				props.history.push("/login");
			} catch (err) {
				NotificationManager.error(
					"An error occured! Please verify your data",
					"Error"
				);
			}
		}
	};

	const onChangeHandler = (e) => {
		setStudentData({
			...studentData,
			[e.target.name]: e.target.value,
		});
	};

	const onFileChangeHandler = (e) => {
		setStudentData({
			...studentData,
			[e.target.name]: e.target.files[0],
		});
	};

	return (
		<div>
			<NotificationContainer />
			<Grid
				container
				style={{
					display: "flex",
					justifyContent: "center",
					marginBottom: "50px",
				}}
			>
				<Grid md={6} xs={12}>
					<form
						onSubmit={onSubmitHandler}
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<FormControl style={{ width: "70%", margin: "30px 0" }}>
							<InputLabel htmlFor="username">Username</InputLabel>
							<Input
								id="username"
								name="username"
								aria-describedby="username-text"
								value={studentData.username}
								onChange={onChangeHandler}
							/>
						</FormControl>
						<FormControl
							style={{ width: "70%", marginBottom: "30px" }}
						>
							<InputLabel htmlFor="email">email</InputLabel>
							<Input
								id="email"
								name="email"
								aria-describedby="email-text"
								value={studentData.email}
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
								value={studentData.password}
								onChange={onChangeHandler}
							/>
						</FormControl>
						<FormControl
							style={{ width: "70%", marginBottom: "30px" }}
						>
							<InputLabel htmlFor="cpassword">
								Confirm password
							</InputLabel>
							<Input
								id="cpassword"
								name="cpassword"
								type="password"
								aria-describedby="cpassword-text"
								value={studentData.cpassword}
								onChange={onChangeHandler}
							/>
						</FormControl>
						<FormControl
							style={{ width: "70%", marginBottom: "30px" }}
						>
							<InputLabel htmlFor="country">Country</InputLabel>
							<Input
								id="country"
								name="country"
								type="country"
								aria-describedby="country-text"
								value={studentData.country}
								onChange={onChangeHandler}
							/>
						</FormControl>
						<div>
							<label htmlFor="photo">Upload Image</label>
							<input
								type="file"
								name="photo"
								id="photo"
								onChange={onFileChangeHandler}
							/>
						</div>
						<Button
							type="submit"
							variant="contained"
							color="secondary"
							style={{ width: "40%", marginTop: "30px" }}
						>
							Create Account
						</Button>
					</form>
				</Grid>
			</Grid>
		</div>
	);
};

export default withRouter(StudentForm);
