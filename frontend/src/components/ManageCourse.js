import React, { useState } from "react";
import Section from "./Section";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const ManageCourse = (props) => {
	const { id } = useParams();
	const [Sections, setSections] = useState([]);
	const auth = useSelector((state) => state.auth);

	if (auth.user == null || auth.user.type === "student") {
		props.history.replace("/");
	}
	return (
		<Container style={{ margin: "50px 0" }}>
			<div style={{ marginBottom: "30px" }}>
				<Link
					to="/instructor/course"
					style={{
						textDecoration: "none",
						color: "crimson",
					}}
				>
					Go back
				</Link>
			</div>
			<div>
				{Sections.map((Sec, index) => (
					<div
						style={{
							marginBottom: "20px",
							border: "1px solid #ccc",
							padding: "50px",
						}}
						key={index}
					>
						<Sec courseId={id} />
					</div>
				))}
			</div>
			<div>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => setSections([...Sections, Section])}
				>
					Add a new section
				</Button>
			</div>
		</Container>
	);
};

export default ManageCourse;
