import React, { useState, useEffect } from "react";
import {
	FormControl,
	InputLabel,
	Input,
	Grid,
	Button,
	Select,
	MenuItem,
} from "@material-ui/core";
import axios from "axios";
import { useSelector } from "react-redux";

const CreateCourse = (props) => {
	const [courseData, setCourseData] = useState({
		title: "",
		description: "",
		content: "",
		requirements: "",
		target: "",
		file: "",
		category: "",
		price: "",
	});

	const [categories, setCategories] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const auth = useSelector((state) => state.auth);

	if (auth.user == null || auth.user.type === "student") {
		props.history.replace("/");
	}

	useEffect(() => {
		axios
			.get("/categories/")
			.then((res) => {
				setCategories(res.data.categories);
				setCourseData({
					...courseData,
					category: res.data.categories[0].title,
				});
				setShowForm(true);
			})
			.catch((err) => console.log(err));
	}, []);

	const onChangeHandler = (e) => {
		setCourseData({
			...courseData,
			[e.target.name]: e.target.value,
		});
	};

	const onFileChangeHandler = (e) => {
		setCourseData({
			...courseData,
			[e.target.name]: e.target.files[0],
		});
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("title", courseData.title);
		formData.append("description", courseData.description);
		formData.append("content", courseData.content);
		formData.append("requirements", courseData.requirements);
		formData.append("target", courseData.target);
		formData.append("file", courseData.file);
		formData.append("category", courseData.category);
		formData.append("price", courseData.price);
		axios
			.post("/courses/create", formData)
			.then((res) => {
				props.history.push(`/course/${res.data.courseId}/manage`);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<h1 style={{ margin: "30px 0", textAlign: "center" }}>
				Create course
			</h1>
			{showForm && (
				<Grid
					container
					style={{
						display: "flex",
						justifyContent: "center",
						marginBottom: "50px",
					}}
				>
					<Grid item md={6} xs={12}>
						<form
							onSubmit={onSubmitHandler}
							encType="multipart/form-data"
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<FormControl
								style={{ width: "70%", marginBottom: "30px" }}
							>
								<InputLabel htmlFor="title">Title</InputLabel>
								<Input
									id="title"
									name="title"
									aria-describedby="title-text"
									value={courseData.title}
									onChange={onChangeHandler}
								/>
							</FormControl>
							<FormControl
								style={{ width: "70%", marginBottom: "30px" }}
							>
								<InputLabel htmlFor="description">
									Description
								</InputLabel>
								<Input
									id="description"
									name="description"
									aria-describedby="description-text"
									value={courseData.description}
									onChange={onChangeHandler}
								/>
							</FormControl>
							<FormControl
								style={{ width: "70%", marginBottom: "30px" }}
							>
								<InputLabel id="category">Category</InputLabel>
								<Select
									labelId="category"
									id="category"
									name="category"
									defaultValue={courseData.category}
									onChange={onChangeHandler}
								>
									{categories.map((category) => (
										<MenuItem
											value={category.title}
											key={category.id}
										>
											{category.title}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl
								style={{ width: "70%", marginBottom: "30px" }}
							>
								<InputLabel htmlFor="content">
									What you will learn
								</InputLabel>
								<Input
									id="content"
									name="content"
									aria-describedby="content-text"
									value={courseData.content}
									onChange={onChangeHandler}
								/>
							</FormControl>
							<FormControl
								style={{ width: "70%", marginBottom: "30px" }}
							>
								<InputLabel htmlFor="requirements">
									Requirements
								</InputLabel>
								<Input
									id="requirements"
									name="requirements"
									aria-describedby="requirement-text"
									value={courseData.requirements}
									onChange={onChangeHandler}
								/>
							</FormControl>
							<FormControl
								style={{ width: "70%", marginBottom: "30px" }}
							>
								<InputLabel htmlFor="price">Price</InputLabel>
								<Input
									id="price"
									name="price"
									aria-describedby="price-text"
									value={courseData.price}
									onChange={onChangeHandler}
								/>
							</FormControl>
							<FormControl
								style={{ width: "70%", marginBottom: "30px" }}
							>
								<InputLabel htmlFor="target">Target</InputLabel>
								<Input
									id="target"
									name="target"
									aria-describedby="target-text"
									value={courseData.target}
									onChange={onChangeHandler}
								/>
							</FormControl>
							<div style={{ marginBottom: "30px" }}>
								<FormControl>
									Upload File
									<input
										type="file"
										name="file"
										onChange={onFileChangeHandler}
									/>
								</FormControl>
							</div>
							<div>
								<Button
									type="submit"
									variant="contained"
									color="secondary"
									style={{ width: "40%" }}
								>
									Create
								</Button>
							</div>
						</form>
					</Grid>
				</Grid>
			)}
		</div>
	);
};

export default CreateCourse;
