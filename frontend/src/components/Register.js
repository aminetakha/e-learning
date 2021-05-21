import React, { useState } from "react";
import InstructorForm from "./Forms/InstructorForm";
import StudentForm from "./Forms/StudentForm";

const Register = () => {
	const [type, setType] = useState("student");
	return (
		<div>
			<div>Register as</div>
			<button onClick={() => setType("student")}>Student</button>
			<button onClick={() => setType("instructor")}>Instructor</button>
			{type === "student" ? <StudentForm /> : <InstructorForm />}
		</div>
	);
};

export default Register;
