import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "./UI/Spinner";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";

const Instructors = () => {
	const [instructors, setInstructors] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get("/instructors")
			.then((res) => {
				setInstructors(res.data.data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Container>
			{loading ? (
				<Spinner />
			) : instructors.length === 0 ? (
				<p>There are no instructors at this moment</p>
			) : (
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
						gap: "50px",
						margin: "50px 0",
					}}
				>
					{instructors.map((instructor) => (
						<div key={instructor.id} style={{ width: "220px" }}>
							<div>
								<img
									src={`/${instructor.photo}`}
									width="100%"
									height="100%"
								/>
							</div>
							<div
								style={{
									margin: "0px",
									padding: "9px 12px",
									border: "1px solid #ccc",
								}}
							>
								<h3 style={{ marginBottom: "8px" }}>
									{instructor.username}
								</h3>
								<Link
									to={`/instructor/${instructor.id}`}
									style={{
										textDecoration: "none",
										color: "crimson",
										fontWeight: "bold",
									}}
								>
									View Details
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</Container>
	);
};

export default Instructors;
