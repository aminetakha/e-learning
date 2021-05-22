import React, { useState, useEffect } from "react";
import axios from "axios";

const InstructorCourses = ({ instructorId, limit, instructorName }) => {
	const [courses, setCourses] = useState([]);
	useEffect(() => {
		axios
			.get(`http://localhost:5000/instructors/${instructorId}/courses`)
			.then((res) => {
				const allCourses = res.data.data.courses;

				if (limit) {
					setCourses([...allCourses.slice(0, limit)]);
				} else {
					setCourses([...allCourses]);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<h2>{`More courses by ${instructorName}`}</h2>
			<div
				style={{
					display: "flex",
					gap: "30px",
					flexWrap: "wrap",
					marginTop: "30px",
				}}
			>
				{courses.map((course) => (
					<div key={course.id}>
						<div>
							<img
								src={`http://localhost:5000/${course.thumbnail}`}
								width="258px"
								height="145px"
							/>
							<div style={{ marginTop: "10px" }}>
								<h3>{course.title}</h3>
								<p>${course.price}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default InstructorCourses;
