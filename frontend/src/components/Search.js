import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "./UI/Spinner";
import CourseCard from "./CourseCard";
import { useSelector } from "react-redux";

const Search = () => {
	const { course } = useParams();
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		let URL;
		if (
			!auth.isAuthenticated ||
			(auth.isAuthenticated && auth.user.type === "student")
		) {
			URL = `/courses/${course}/search`;
		}
		if (auth.isAuthenticated && auth.user.type === "instructor") {
			URL = `/instructors/${course}/courses/search`;
		}
		console.log(URL);
		axios
			.get(URL)
			.then((res) => {
				console.log(res.data);
				{
					auth.isAuthenticated && auth.user.type === "instructor"
						? setCourses(res.data.data)
						: setCourses(res.data.courses);
				}
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [course]);

	return (
		<div style={{ margin: "50px 0" }}>
			{loading ? (
				<Spinner />
			) : (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					{courses.length === 0 ? (
						<p>No courses with this name</p>
					) : (
						courses.map((course, index) => (
							<div key={index} style={{ width: "70%" }}>
								<CourseCard
									title={course.title}
									description={course.description}
									price={course.price}
									thumbnail={course.thumbnail}
									createdAt={course.createdAt}
								/>
							</div>
						))
					)}
				</div>
			)}
		</div>
	);
};

export default Search;
