import React, { useState } from "react";
import axios from "axios";
import Questions from "./Questions";
import {
	Container,
	FormControl,
	InputLabel,
	Input,
	Button,
} from "@material-ui/core";

const QASection = ({ questions, showReplies, addQuestion }) => {
	const [question, setQuestion] = useState("");
	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (question.trim().length > 0) {
			const fileId = questions.id;
			const data = {
				fileId,
				question,
			};
			axios
				.post("/questions", data, { withCredentials: true })
				.then((res) => {
					const crearedQuestion = res.data.msg;
					const q = {
						id: crearedQuestion.id,
						question: crearedQuestion.question,
						student: crearedQuestion.student,
					};
					addQuestion(q);
				})
				.catch((err) => console.log(err));
			setQuestion("");
		}
	};
	return (
		<Container>
			<h1>Questions section</h1>
			<div>
				<form
					onSubmit={onSubmitHandler}
					style={{
						display: "flex",
						alignItems: "center",
						gap: "30px",
						margin: "30px 0",
					}}
				>
					<FormControl>
						<InputLabel htmlFor="question">
							Ask a new question...
						</InputLabel>
						<Input
							id="question"
							name="question"
							type="text"
							aria-describedby="question-text"
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
						/>
					</FormControl>
					<Button variant="contained" color="secondary" type="submit">
						Ask
					</Button>
				</form>
			</div>
			<Questions
				questions={questions.questions}
				length={questions.questions.length}
				showReplies={showReplies}
			/>
		</Container>
	);
};

export default React.memo(QASection);
