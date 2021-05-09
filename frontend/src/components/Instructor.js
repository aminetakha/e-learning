import React from "react";

const Instructor = ({ instructor }) => {
	return (
		<div>
			<div>
				<h3>{instructor.username}</h3>
			</div>
			<div>
				<img src={`http://localhost:5000/${instructor.photo}`} />
			</div>
			<div>
				<p>{instructor.about}</p>
			</div>
		</div>
	);
};

export default Instructor;
