import React, { useState, useEffect } from "react";
import axios from "axios";
import File from "./File";

const Section = ({ courseId }) => {
	const [sectionName, setSectionName] = useState("");
	const [added, setAdded] = useState(false);
	const [update, setUpdate] = useState(false);
	const [Files, setFiles] = useState([]);
	const [createdSectionId, setCreatedSectionId] = useState("");

	const changeHandler = (e) => {
		setSectionName(e.target.value);
	};

	const updateHandler = (e) => {
		setAdded(false);
		setUpdate(true);
	};

	const addedHandler = () => {
		if (update) {
			axios
				.patch(`/courses/${createdSectionId}/section`, {
					title: sectionName,
				})
				.then((res) => alert(res.data.success))
				.catch((err) => alert(err));
		} else {
			axios
				.post(`/courses/${courseId}/section`, { title: sectionName })
				.then((res) => setCreatedSectionId(res.data.msg.id))
				.catch((err) => console.log(err));
		}
		setAdded(true);
		setUpdate(false);
	};

	return (
		<div>
			<div>
				{added && sectionName ? (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "10px",
						}}
					>
						<h3>{sectionName}</h3>
						<div>
							<button onClick={updateHandler}>Update</button>
						</div>
					</div>
				) : (
					<div>
						<input
							type="text"
							value={sectionName}
							onChange={changeHandler}
						/>
						{sectionName && (
							<button onClick={addedHandler}>
								{update ? "Save update" : "Add Section"}
							</button>
						)}
					</div>
				)}
				{added && (
					<div>
						{Files.map((File, index) => (
							<div key={index}>
								<File sectionId={createdSectionId} />
							</div>
						))}
						<div>
							<button onClick={() => setFiles([...Files, File])}>
								Add new File
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Section;
