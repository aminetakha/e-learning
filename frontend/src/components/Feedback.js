import React, { useState } from "react";
import {
	FormControl,
	InputLabel,
	Input,
	Button,
	Typography,
	Box,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import {
	NotificationContainer,
	NotificationManager,
} from "react-notifications";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import axios from "axios";

const Feedback = ({ courseId }) => {
	const [feedback, setFeedBack] = useState({
		review: "",
		rating: "",
	});

	const addFeedbackHandler = async (e) => {
		e.preventDefault();
		const data = {
			review: feedback.review,
			rating: feedback.rating,
			courseId,
		};
		const res = await axios.post("/reviews", data, {
			withCredentials: true,
		});
		if ("success" in res.data) {
			setFeedBack({
				review: "",
				rating: "",
			});
			NotificationManager.success(res.data.success, "Success");
		} else if ("error" in res.data) {
			NotificationManager.success(res.data.error, "Error");
		}
	};

	const onChangeHandler = (e) => {
		setFeedBack({
			...feedback,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div
			style={{
				border: "1px solid #ccc",
				margin: "30px 0",
				padding: "20px",
			}}
		>
			<NotificationContainer />
			<h2>Add Feedback</h2>
			<form onSubmit={addFeedbackHandler}>
				<div>
					<FormControl style={{ margin: "20px 0 30px" }}>
						<InputLabel htmlFor="review">Review</InputLabel>
						<Input
							id="review"
							name="review"
							aria-describedby="review-text"
							value={feedback.review}
							onChange={onChangeHandler}
						/>
					</FormControl>
				</div>
				<div>
					<FormControl>
						<Box component="fieldset" borderColor="transparent">
							<Typography component="legend">Rating</Typography>
							<Rating
								id="rating"
								name="rating"
								defaultValue={feedback.rating}
								onChange={onChangeHandler}
								emptyIcon={
									<StarBorderIcon fontSize="inherit" />
								}
							/>
						</Box>
					</FormControl>
				</div>
				<div>
					<Button color="secondary" type="submit">
						Add Feedback
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Feedback;
