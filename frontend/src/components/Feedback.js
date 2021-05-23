import React, { useState } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
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
			alert(res.data.success);
		} else if ("error" in res.data) {
			alert(res.data.error);
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
				<div style={{ marginBottom: "30px" }}>
					<FormControl>
						<InputLabel htmlFor="rating">Rating</InputLabel>
						<Input
							id="rating"
							name="rating"
							aria-describedby="rating-text"
							value={feedback.rating}
							onChange={onChangeHandler}
						/>
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
