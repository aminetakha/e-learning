import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CourseCard from "../components/CourseCard";

const CategoryCoursesRoute = () => {
	const [courses, setCourses] = useState([]);
	const { category } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:5000/courses/category/${category}`)
			.then((res) => setCourses(res.data[0].courses))
			.catch((err) => console.log(err));
	}, [category]);

	return (
		<Container>
			<Typography
				component="h1"
				variant="h4"
			>{`${category} courses`}</Typography>

			{courses.length === 0
				? "Loading..."
				: courses.map((course) => (
						<CourseCard
							key={course.id}
							title={course.title}
							description={course.description}
							content={course.content}
							price={course.price}
							thumbnail={course.thumbnail}
							createdAt={course.createdAt}
						/>
				  ))}
		</Container>
	);
};

export default CategoryCoursesRoute;
