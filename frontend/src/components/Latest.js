import React, { useState, useEffect } from "react";
import axios from "axios";
import Course from "./Course";

const Latest = () => {
	const [courses, setCourses] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:5000/courses/latest")
			.then((res) => {
				setCourses([...res.data]);
			})
			.catch((err) => console.log(err));
	}, []);

	const styles = {
		display: "flex",
		width: "100%",
		overflowX: "scroll",
	};
	return (
		<div>
			<div>
				<h1>Latest courses</h1>
			</div>
			<div style={styles}>
				{courses.length > 0 &&
					courses.map((course) => <Course course={course} />)}
			</div>
		</div>
	);
};

export default Latest;
