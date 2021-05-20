import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Answers from "./Answers";

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
		}
	};

	return (
		<>
			{loading ? (
				<p>loading...</p>
			) : (
				<>
					<button onClick={() => showQuestions()}>
						Back to questions
					</button>
					<div>
						<form onSubmit={submitAnswerHandler}>
							<input
								type="text"
								placeholder="Give your answer"
								value={answer}
								onChange={answerChangeHandler}
							/>
							<button type="submit">Answer</button>
						</form>
					</div>
					<Answers
						answers={answers.answers}
						length={answers.answers.length}
					/>
				</>
			)}
		</>
	);
};

export default Replies;
