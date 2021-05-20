import React from "react";

const Answers = ({ answers, length }) => {
	return (
		<div>
			{length === 0 ? (
				<p>No answers for this question</p>
			) : (
				answers.map((answer) => (
					<div key={answer.id}>
						<div>
							<img
								src={
									answer.instructor
										? `/${answer.instructor.photo}`
										: `/${answer.student.photo}`
								}
								width="50px"
								height="50px"
								style={{ borderRadius: "50%" }}
							/>
						</div>
						<div>
							<div>
								<p>
									<b>
										{answer.instructor
											? answer.instructor.username
											: answer.student.username}
									</b>
								</p>
								<p>{answer.answer}</p>
							</div>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default React.memo(Answers);
