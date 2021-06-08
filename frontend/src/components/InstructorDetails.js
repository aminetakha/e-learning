import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "./UI/Spinner";
import { Container } from "@material-ui/core";
import web from "../assets/web.svg";
import github from "../assets/github.svg";
import youtube from "../assets/youtube.svg";
import twitter from "../assets/twitter.svg";
import InstructorCourses from "./InstructorCourses";

const InstructorDetails = () => {
	const { instructorId } = useParams();
	const [instructor, setInstructor] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get("/instructors/" + instructorId)
			.then((res) => {
				setInstructor(res.data.data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [instructorId]);

	const styles = {
		socials: {
			display: "flex",
			alignItems: "center",
			gap: "15px",
			margin: "12px 0",
		},
		a: { textDecoration: "none", color: "#196699" },
	};

	return (
		<Container>
			{loading ? (
				<Spinner />
			) : !instructor ? (
				<p>No instructor with this id</p>
			) : (
				<div style={{ margin: "50px 0" }}>
					<div>
						<img src={`/${instructor.photo}`} width="220px" />
					</div>
					<div style={{ marginTop: "30px", width: "60%" }}>
						<h3>{instructor.username}</h3>
						<p style={{ margin: "20px 0 30px" }}>
							{instructor.about}
						</p>
						<div style={styles.socials}>
							<div>
								<img src={web} width="30px" />
							</div>
							<a
								href={`${instructor.website}`}
								target="_blank"
								style={styles.a}
							>
								{instructor.website}
							</a>
						</div>
						<div style={styles.socials}>
							<div>
								<img src={twitter} width="30px" />
							</div>
							<a
								href={instructor.twitter}
								target="_blank"
								style={styles.a}
							>
								{instructor.twitter}
							</a>
						</div>
						<div style={styles.socials}>
							<div>
								<img src={youtube} width="30px" />
							</div>
							<a
								href={instructor.youtube}
								target="_blank"
								style={styles.a}
							>
								{instructor.youtube}
							</a>
						</div>
						<div style={styles.socials}>
							<div>
								<img src={github} width="30px" />
							</div>
							<a
								href={instructor.github}
								target="_blank"
								style={styles.a}
							>
								{instructor.github}
							</a>
						</div>
					</div>
				</div>
			)}
		</Container>
	);
};

export default InstructorDetails;
