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

const StudentUpdate = (props) => {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const [instructorData, setInstructorData] = useState({
		username: user.username,
		photo: user.photo,
		country: user.country,
	});

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		const data = new FormData();
		data.append("username", instructorData.username);
		data.append("country", instructorData.country);
		try {
			const res = await axios.post(
				"/students/" + user.id,
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

export default withRouter(StudentUpdate);
