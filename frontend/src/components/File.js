import React, { useState } from "react";
import axios from "axios";

const File = ({ sectionId }) => {
	const [file, setFile] = useState("");
	const [progress, setProgress] = useState(0);
	const [uploaded, setUploaded] = useState(false);

	const changeFileHandler = (e) => {
		setFile(e.target.files[0]);
	};

	const addFileHandler = (e) => {
		e.preventDefault();
		// send file using axios
		const formData = new FormData();
		formData.append("file", file);
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
			<form encType="multipart/form-data">
				<input type="file" name="file" onChange={changeFileHandler} />
				{!uploaded && (
					<button type="submit" onClick={addFileHandler}>
						Add File
					</button>
				)}
				{progress !== 0 && <span>{`${progress}%`}</span>}
			</form>
		</div>
	);
};

export default File;
