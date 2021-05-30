import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {
	NotificationContainer,
	NotificationManager,
} from "react-notifications";
import File from "./File";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";

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
				.then((res) => {
					setFiles([]);
					NotificationManager.success(res.data.success, "Success");
				})
				.catch((err) =>
					NotificationManager.error("An error occured", "Error")
				);
		} else {
			axios
				.post(`/courses/${courseId}/section`, { title: sectionName })
				.then((res) => {
					NotificationManager.success(
						"Section added successfully",
						"Success"
					);
					setCreatedSectionId(res.data.msg.id);
				})
				.catch((err) => console.log(err));
		}
		setAdded(true);
		setUpdate(false);
	};

	return (
		<div>
			<NotificationContainer />
			<div>
				{added && sectionName ? (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "70px",
							marginBottom: "25px",
						}}
					>
						<h3>{sectionName}</h3>
						<div>
							<Button onClick={updateHandler}>
								Update section name
							</Button>
						</div>
					</div>
				) : (
					<div
						style={{
							display: "flex",
							alignItems: "center",
						}}
					>
						<FormControl>
							<InputLabel htmlFor="section">
								Section Name
							</InputLabel>
							<Input
								id="section"
								name="section"
								type="section"
								aria-describedby="section-text"
								value={sectionName}
								onChange={changeHandler}
							/>
						</FormControl>
						{sectionName && (
							<Button onClick={addedHandler}>
								{update ? "Save update" : "Add Section"}
							</Button>
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
						<div style={{ marginTop: "20px" }}>
							<Button
								variant="contained"
								color="secondary"
								onClick={() => setFiles([...Files, File])}
							>
								Add new File
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Section;
