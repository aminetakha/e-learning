import React, { useState } from "react";
import Section from "./Section";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ManageCourse = (props) => {
	const { id } = useParams();
	const [Sections, setSections] = useState([]);
	const auth = useSelector((state) => state.auth);

	if (auth.user == null || auth.user.type === "student") {
		props.history.replace("/");
	}
	return (
		<>
			<div>
				{Sections.map((Sec, index) => (
					<div
						style={{ margin: "30px", border: "1px solid black" }}
						key={index}
					>
						<Sec courseId={id} />
					</div>
				))}
			</div>
			<div>
				<button onClick={() => setSections([...Sections, Section])}>
					Add a new section
				</button>
			</div>
		</>
	);
};

export default ManageCourse;
