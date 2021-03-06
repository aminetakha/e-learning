import React, { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import CircularProgressWithLabel from "./UI/CircularProgressWithLabel";

const File = ({ sectionId }) => {
	const [file, setFile] = useState("");
	const [name, setName] = useState("");
	const [progress, setProgress] = useState(0);
	const [uploaded, setUploaded] = useState(false);

	const changeFileHandler = (e) => {
		setFile(e.target.files[0]);
		setName(e.target.files[0].name);
	};

	const addFileHandler = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", file);
		formData.append("name", name);
		axios
			.post(`/courses/${sectionId}/file`, formData, {
				onUploadProgress: (e) => {
					let p = ((e.loaded / e.total) * 100).toFixed(0);
					setProgress(p);
				},
			})
			.then((res) => {
				setProgress(0);
				setUploaded(true);
			});
	};

	return (
		<div>
			<form
				encType="multipart/form-data"
				style={{ display: "flex", alignItems: "center" }}
			>
				<input
					id="file"
					type="file"
					name="file"
					onChange={changeFileHandler}
				/>
				{!uploaded && (
					<Button type="submit" onClick={addFileHandler}>
						Add File
					</Button>
				)}
				{progress !== 0 && (
					<CircularProgressWithLabel value={progress} />
				)}
			</form>
		</div>
	);
};

export default File;
