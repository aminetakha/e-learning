import React from "react";

const Questions = ({ length, questions, showReplies }) => {
	console.log("ANSWER CMT");
	return (
		<div>
			{length === 0 ? (
				<h3 style={{ textAlign: "center" }}>
					There are no questions for this course video
				</h3>
			) : (
				<>
					{questions.map((question) => (
						<div key={question.id} style={{ display: "flex" }}>
							<div>
								<img
									src={`/${question.student.photo}`}
									width="70px"
									height="70px"
									style={{ borderRadius: "50%" }}
								/>
							</div>
							<div>
								<p>{question.question}</p>
								{/* <Link to={`/course/${question.id}/replies`}>
									Show replies
								</Link> */}
								<button
									onClick={() => showReplies(question.id)}
								>
									Show replies
								</button>
							</div>
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default React.memo(Questions);
