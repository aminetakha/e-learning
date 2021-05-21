import React, { useState } from "react";
import { FormControl, InputLabel, Input } from "@material-ui/core";
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
			alert("Passwords do not match");
		} else {
			const data = new FormData();
			data.append("username", studentData.username);
			data.append("email", studentData.email);
			data.append("password", studentData.password);
			data.append("photo", studentData.photo);
			data.append("country", studentData.country);
			try {
				const res = await axios.post("/register/student", data);
				alert("Account created successfully! you can now log in");
				props.history.push("/login");
			} catch (err) {
				alert("An error occured! Please verify your data");
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
			<form onSubmit={onSubmitHandler} encType="multipart/form-data">
				<div>
					<FormControl>
						<InputLabel htmlFor="username">username</InputLabel>
						<Input
							id="username"
							name="username"
							aria-describedby="username-text"
							value={studentData.username}
							onChange={onChangeHandler}
						/>
					</FormControl>
				</div>
				<div>
					<FormControl>
						<InputLabel htmlFor="email">email</InputLabel>
						<Input
							id="email"
							name="email"
							aria-describedby="email-text"
							value={studentData.email}
							onChange={onChangeHandler}
						/>
					</FormControl>
				</div>
				<div>
					<FormControl>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input
							id="password"
							name="password"
							type="password"
							aria-describedby="password-text"
							value={studentData.password}
							onChange={onChangeHandler}
						/>
					</FormControl>
				</div>

				<div>
					<FormControl>
						<InputLabel htmlFor="cpassword">
							Confirm Password
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
				</div>
				<div>
					<FormControl>
						<InputLabel htmlFor="country">Country</InputLabel>
						<Input
							id="country"
							name="country"
							aria-describedby="country-text"
							value={studentData.country}
							onChange={onChangeHandler}
						/>
					</FormControl>
				</div>
				<div>
					<FormControl>
						Upload Image
						<input
							type="file"
							name="photo"
							onChange={onFileChangeHandler}
						/>
					</FormControl>
				</div>
				<div>
					<button type="submit">Create Account</button>
				</div>
			</form>
		</div>
	);
};

export default withRouter(StudentForm);
