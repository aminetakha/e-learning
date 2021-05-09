import React, { useState, useEffect } from "react";
import axios from "axios";

const InstructorCourses = ({ instructorId, limit }) => {
	const [courses, setCourses] = useState([]);
	useEffect(() => {
		axios
			.get(`http://localhost:5000/instructors/${instructorId}/courses`)
			.then((res) => {
				const allCourses = res.data.data.courses;
				if (limit) {
					setCourses([...courses, ...allCourses.slice(0, limit)]);
				} else {
					setCourses([...courses, ...allCourses]);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			{courses.map((course) => (
				<div key={course.id}>
					<div>
						<img
							src={`http://localhost:5000/${course.thumbnail}`}
						/>
						<div>
							<h3>{course.title}</h3>
							<p>${course.price}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default InstructorCourses;
