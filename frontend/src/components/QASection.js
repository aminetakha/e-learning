import React, { useState } from "react";
import axios from "axios";
import Questions from "./Questions";

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
		<div>
			<h1>Questions section</h1>
			<div>
				<form onSubmit={onSubmitHandler}>
					<input
						type="text"
						placeholder="Ask a new question..."
						value={question}
						onChange={(e) => setQuestion(e.target.value)}
					/>
					<button type="submit">Ask</button>
				</form>
			</div>
			<Questions
				questions={questions.questions}
				length={questions.questions.length}
				showReplies={showReplies}
			/>
		</div>
	);
};

export default React.memo(QASection);
