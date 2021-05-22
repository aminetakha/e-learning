import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Answers from "./Answers";
import {
	Container,
	Button,
	FormControl,
	InputLabel,
	Input,
} from "@material-ui/core";
import Spinner from "./UI/Spinner";

const Replies = ({ answers, loading, showQuestions, addAnswer }) => {
	const [answer, setAnswer] = useState("");
	const questionId = answers.id;
	const user = useSelector((state) => state.auth.user);

	const answerChangeHandler = (e) => {
		setAnswer(e.target.value);
	};

	const submitAnswerHandler = async (e) => {
		e.preventDefault();
		if (answer.trim().length > 0) {
			const data = {
				answer,
				questionId,
				type: user.type,
			};
			const res = await axios.post("/questions/answer", data, {
				withCredentials: true,
			});
			const msg = res.data.msg;
			const addedAnswer = {
				id: msg.id,
				student: msg.student,
				instructor: msg.instructor,
				answer: msg.answer,
			};
			addAnswer(addedAnswer);
			setAnswer("");
		}
	};

	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<Container>
					<Button variant="contained" onClick={() => showQuestions()}>
						Back to questions
					</Button>
					<div>
						<form
							onSubmit={submitAnswerHandler}
							style={{
								display: "flex",
								alignItems: "center",
								gap: "30px",
								margin: "30px 0",
							}}
						>
							<FormControl>
								<InputLabel htmlFor="answer">
									Give your answer...
								</InputLabel>
								<Input
									id="answer"
									name="answer"
									type="text"
									aria-describedby="answer-text"
									value={answer}
									onChange={answerChangeHandler}
								/>
							</FormControl>
							<Button
								variant="contained"
								color="secondary"
								type="submit"
							>
								Answer
							</Button>
						</form>
					</div>
					<Answers
						answers={answers.answers}
						length={answers.answers.length}
					/>
				</Container>
			)}
		</>
	);
};

export default Replies;
