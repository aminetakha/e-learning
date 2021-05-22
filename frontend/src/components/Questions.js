import React from "react";
import Button from "@material-ui/core/Button";

const Questions = ({ length, questions, showReplies }) => {
	return (
		<div>
			{length === 0 ? (
				<h3 style={{ textAlign: "center" }}>
					There are no questions for this course video
				</h3>
			) : (
				<div>
					{questions.map((question) => (
						<div
							key={question.id}
							style={{
								display: "flex",
								gap: "40px",
								alignItems: "center",
								margin: "18px 0",
								borderBottom: "1px solid #ccc",
							}}
						>
							<div>
								<img
									src={`/${question.student.photo}`}
									width="70px"
									height="70px"
									style={{ borderRadius: "50%" }}
								/>
							</div>
							<div style={{ marginBottom: "20px" }}>
								<p style={{ marginBottom: "10px" }}>
									{question.question}
								</p>
								<Button
									variant="contained"
									onClick={() => showReplies(question.id)}
								>
									Show replies
								</Button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default React.memo(Questions);
