import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CourseCard from "../components/CourseCard";
import Spinner from "../components/UI/Spinner";

const CategoryCoursesRoute = () => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const { category } = useParams();

	useEffect(() => {
		setLoading(true);
		axios
			.get(`http://localhost:5000/courses/category/${category}`)
			.then((res) => {
				setCourses(res.data[0].courses);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [category]);

	return (
		<Container>
			<Typography
				component="h1"
				variant="h4"
				style={{ marginTop: "30px" }}
			>{`${category} courses`}</Typography>

			{loading ? (
				<Spinner />
			) : courses.length === 0 ? (
				<h3 style={{ textAlign: "center", margin: "50px 0" }}>
					No courses are available so far for this category
				</h3>
			) : (
				courses.map((course) => (
					<CourseCard
						key={course.id}
						title={course.title}
						description={course.description}
						content={course.content}
						price={course.price}
						thumbnail={course.thumbnail}
						createdAt={course.createdAt}
					/>
				))
			)}
		</Container>
	);
};

export default CategoryCoursesRoute;
