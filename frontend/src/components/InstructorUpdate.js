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
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../actions/auth";

const InstructorUpdate = (props) => {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const [instructorData, setInstructorData] = useState({
		username: user.username,
		photo: user.photo,
		website: user.website,
		about: user.about,
		github: user.github,
		twitter: user.twitter,
		youtube: user.youtube,
		country: user.country,
	});

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append("username", instructorData.username);
		data.append("website", instructorData.website);
		data.append("about", instructorData.about);
		data.append("github", instructorData.github);
		data.append("youtube", instructorData.youtube);
		data.append("twitter", instructorData.twitter);
		data.append("country", instructorData.country);
		try {
			const res = await axios.post(
				"/instructors/" + user.id,
				JSON.stringify(instructorData),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			dispatch(updateProfile(res.data.data));
			alert("Account updated successfully!");
		} catch (err) {
			alert("An error occured! Please verify your data");
		}
	};

	const onChangeHandler = (e) => {
		setInstructorData({
			...instructorData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div>
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
							<InputLabel htmlFor="country">Country</InputLabel>
							<Input
								id="country"
								name="country"
								type="country"
								aria-describedby="country-text"
								value={instructorData.country}
								onChange={onChangeHandler}
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
						<div style={{ margin: "16px 0" }}>
							<img
								src={`/${instructorData.photo}`}
								width="170px"
							/>
						</div>
						<Button
							type="submit"
							variant="contained"
							color="secondary"
							style={{ width: "40%", marginTop: "30px" }}
						>
							Update Account
						</Button>
					</form>
				</Grid>
			</Grid>
		</div>
	);
};

export default withRouter(InstructorUpdate);
