import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
		return <p>Loading ... </p>;
	}

	const styles = {
		container: {
			display: "grid",
			gridTemplateColumns: "1fr 1fr 1fr 1fr",
			gridGap: "15px",
		},
		course: {
			width: "230px",
			minHeight: "260px",
			border: "1px solid black",
			paddingBottom: "5px",
		},
		description: {
			padding: "5px",
		},
		root: {
			display: "flex",
			justifyContent: "center",
		},
	};

	return (
		<div>
			<h1>My Courses</h1>
			<div style={styles.root}>
				{courses.length === 0 ? (
					<p>You're not enrolled in any courses</p>
				) : (
					<div style={styles.container}>
						{courses.map((course) => (
							<div key={course.id} style={styles.course}>
								<div>
									<img
										src={`/${course.thumbnail}`}
										width="100%"
									/>
								</div>
								<div style={styles.description}>
									<h3>{course.title}</h3>
									<p>{course.description}</p>
								</div>
								<div style={styles.link}>
									<Link to={`/learn/${course.title}`}>
										Start course
									</Link>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default MyCourses;
