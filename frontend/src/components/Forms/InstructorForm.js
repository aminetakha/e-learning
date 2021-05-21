import React, { useState } from "react";
import { FormControl, InputLabel, Input } from "@material-ui/core";
import axios from "axios";
import { withRouter } from "react-router-dom";

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
			alert("Passwords do not match");
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
				alert("Account created successfully! you can now log in");
				props.history.push("/login");
			} catch (err) {
				alert("An error occured! Please verify your data");
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
			<form onSubmit={onSubmitHandler} encType="multipart/form-data">
				<div>
					<FormControl>
						<InputLabel htmlFor="username">username</InputLabel>
						<Input
							id="username"
							name="username"
							aria-describedby="username-text"
							value={instructorData.username}
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
							value={instructorData.email}
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
							value={instructorData.password}
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
							value={instructorData.cpassword}
							onChange={onChangeHandler}
						/>
					</FormControl>
				</div>
				<div>
					<FormControl>
						<InputLabel htmlFor="about">About</InputLabel>
						<Input
							id="about"
							name="about"
							aria-describedby="about-text"
							value={instructorData.about}
							onChange={onChangeHandler}
						/>
					</FormControl>
				</div>
				<div>
					<FormControl>
						<InputLabel htmlFor="website">Website</InputLabel>
						<Input
							id="website"
							name="website"
							aria-describedby="website-text"
							value={instructorData.website}
							onChange={onChangeHandler}
						/>
					</FormControl>
				</div>
				<div>
					<FormControl>
						<InputLabel htmlFor="github">Github</InputLabel>
						<Input
							id="github"
							name="github"
							aria-describedby="github-text"
							value={instructorData.github}
							onChange={onChangeHandler}
						/>
					</FormControl>
				</div>
				<div>
					<FormControl>
						<InputLabel htmlFor="twitter">Twitter</InputLabel>
						<Input
							id="twitter"
							name="twitter"
							aria-describedby="twitter-text"
							value={instructorData.twitter}
							onChange={onChangeHandler}
						/>
					</FormControl>
				</div>
				<div>
					<FormControl>
						<InputLabel htmlFor="youtube">Youtube</InputLabel>
						<Input
							id="youtube"
							name="youtube"
							aria-describedby="youtube-text"
							value={instructorData.youtube}
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
							value={instructorData.country}
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

export default withRouter(InstructorForm);
