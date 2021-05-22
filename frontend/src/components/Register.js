import React, { useState } from "react";
import InstructorForm from "./Forms/InstructorForm";
import StudentForm from "./Forms/StudentForm";
import { Button } from "@material-ui/core";

const Register = () => {
	const [type, setType] = useState("student");
	return (
		<div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					marginTop: "30px",
				}}
			>
				<h1>Register as</h1>
				<div style={{ display: "flex" }}>
					<Button onClick={() => setType("student")}>Student</Button>
					<Button onClick={() => setType("instructor")}>
						Instructor
					</Button>
				</div>
			</div>
			{type === "student" ? <StudentForm /> : <InstructorForm />}
		</div>
	);
};

export default Register;
