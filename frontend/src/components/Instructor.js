import React from "react";

const Instructor = ({ instructor }) => {
	return (
		<div>
			<div>
				<h3>{instructor.username}</h3>
			</div>
			<div>
				<img
					src={`http://localhost:5000/${instructor.photo}`}
					width="170px"
					height="170px"
					style={{ borderRadius: "50%" }}
				/>
			</div>
			<div style={{ marginTop: "30px" }}>
				<p>{instructor.about}</p>
			</div>
		</div>
	);
};

export default Instructor;
