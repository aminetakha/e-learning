import React, { useState, useEffect } from "react";
import axios from "axios";
import Course from "./Course";
import { Container } from "@material-ui/core";

const Popular = () => {
	const [courses, setCourses] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:5000/courses/popular")
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
		<div style={{ margin: "30px 0" }}>
			<Container>
				<div>
					<h1>Popular courses</h1>
				</div>
				<div style={styles}>
					{courses.length > 0 &&
						courses.map((course) => (
							<Course course={course} key={course.id} />
						))}
				</div>
			</Container>
		</div>
	);
};

export default Popular;
