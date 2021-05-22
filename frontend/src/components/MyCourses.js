import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Grid } from "@material-ui/core";
import Spinner from "./UI/Spinner";

const MyCourses = () => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get("/students/my-courses", { withCredentials: true })
			.then((res) => {
				setCourses(res.data.courses.courses);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	if (loading) {
		return <Spinner />;
	}

	return (
		<Container>
			<h1 style={{ margin: "30px 0" }}>My Courses</h1>
			<div>
				{courses.length === 0 ? (
					<p style={{ marginTop: "30px", textAlign: "center" }}>
						You're not enrolled in any courses
					</p>
				) : (
					<Grid container spacing={5}>
						{courses.map((course) => (
							<Grid item sm={4} md={3} xs={12} key={course.id}>
								<div>
									<img
										src={`/${course.thumbnail}`}
										width="100%"
									/>
								</div>
								<div style={{ marginTop: "6px" }}>
									<h3>{course.title}</h3>
								</div>
								<div style={{ marginTop: "12px" }}>
									<Link
										to={`/learn/${course.title}`}
										style={{
											textDecoration: "none",
											color: "crimson",
											fontWeight: "bold",
										}}
									>
										Start course
									</Link>
								</div>
							</Grid>
						))}
					</Grid>
				)}
			</div>
		</Container>
	);
};

export default MyCourses;
