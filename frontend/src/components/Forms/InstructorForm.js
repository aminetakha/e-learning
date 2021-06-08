import React, { useState } from "react";
import {
	FormControl,
	InputLabel,
	Input,
	Grid,
	Button,
} from "@material-ui/core";
import axios from "axios";
import { withRouter } from "react-router-dom";
import {
	NotificationContainer,
	NotificationManager,
} from "react-notifications";
import CountryDropDown from "../CountryDropDown";

const InstructorForm = (props) => {
	const [instructorData, setInstructorData] = useState({
		username: "",
		email: "",
		password: "",
		cpassword: "",
		photo: "",
		website: "",
		about: "",
		github: "",
		twitter: "",
		youtube: "",
		country: "",
	});

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (instructorData.password !== instructorData.cpassword) {
			NotificationManager.error("Passwords do not match", "Error");
		} else {
			const data = new FormData();
			data.append("username", instructorData.username);
			data.append("email", instructorData.email);
			data.append("password", instructorData.password);
			data.append("photo", instructorData.photo);
			data.append("website", instructorData.website);
			data.append("about", instructorData.about);
			data.append("github", instructorData.github);
			data.append("youtube", instructorData.youtube);
			data.append("twitter", instructorData.twitter);
			data.append("country", instructorData.country);
			try {
				const res = await axios.post("/register/instructor", data);
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
		setInstructorData({
			...instructorData,
			[e.target.name]: e.target.value,
		});
	};

	const onFileChangeHandler = (e) => {
		setInstructorData({
			...instructorData,
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
								value={instructorData.username}
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
								value={instructorData.email}
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
								value={instructorData.password}
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
								value={instructorData.cpassword}
								onChange={onChangeHandler}
							/>
						</FormControl>
						<FormControl
							style={{ width: "70%", marginBottom: "30px" }}
						>
							<InputLabel htmlFor="country">Country</InputLabel>
							<CountryDropDown
								name="country"
								country={instructorData.country}
								change={onChangeHandler}
							/>
						</FormControl>
						<FormControl
							style={{ width: "70%", marginBottom: "30px" }}
						>
							<InputLabel htmlFor="about">About</InputLabel>
							<Input
								id="about"
								name="about"
								type="about"
								aria-describedby="about-text"
								value={instructorData.about}
								onChange={onChangeHandler}
							/>
						</FormControl>
						<FormControl
							style={{ width: "70%", marginBottom: "30px" }}
						>
							<InputLabel htmlFor="website">Website</InputLabel>
							<Input
								id="website"
								name="website"
								type="website"
								aria-describedby="website-text"
								value={instructorData.website}
								onChange={onChangeHandler}
							/>
						</FormControl>
						<FormControl
							style={{ width: "70%", marginBottom: "30px" }}
						>
							<InputLabel htmlFor="github">Github</InputLabel>
							<Input
								id="github"
								name="github"
								type="github"
								aria-describedby="github-text"
								value={instructorData.github}
								onChange={onChangeHandler}
							/>
						</FormControl>
						<FormControl
							style={{ width: "70%", marginBottom: "30px" }}
						>
							<InputLabel htmlFor="twitter">Twitter</InputLabel>
							<Input
								id="twitter"
								name="twitter"
								type="twitter"
								aria-describedby="twitter-text"
								value={instructorData.twitter}
								onChange={onChangeHandler}
							/>
						</FormControl>
						<FormControl
							style={{ width: "70%", marginBottom: "30px" }}
						>
							<InputLabel htmlFor="youtube">Youtube</InputLabel>
							<Input
								id="youtube"
								name="youtube"
								type="youtube"
								aria-describedby="youtube-text"
								value={instructorData.youtube}
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

export default withRouter(InstructorForm);
