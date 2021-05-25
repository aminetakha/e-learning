import React, { useEffect, useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import Spinner from "./UI/Spinner";

const useStyles = makeStyles((theme) => ({
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "300px",
		// [theme.breakpoints.up("sm")]: {
		// 	marginLeft: theme.spacing(3),
		// 	width: "auto",
		// },
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
		border: "1px solid black",
		borderRadius: "5px",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

const InstructorDashboard = (props) => {
	const classes = useStyles();
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const auth = useSelector((state) => state.auth);
	const [search, setSearch] = useState("");

	if (auth.user == null || auth.user.type === "student") {
		props.history.replace("/");
	}

	useEffect(() => {
		// the instrutor should be comming from jwt cookie but for now let's just use hardcoded id
		axios
			.get("/instructors/1/courses")
			.then((res) => {
				setCourses(res.data.data.courses);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	const searchHandler = (e) => {
		e.preventDefault();
		props.history.push(`/courses/${search}/search`);
	};

	return (
		<Container style={{ marginTop: "50px" }}>
			<div>
				<div>
					<h2>Courses</h2>
					<div
						style={{
							margin: "30px 0",
							display: "flex",
						}}
					>
						<form onSubmit={searchHandler}>
							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase
									placeholder="Search…"
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput,
									}}
									inputProps={{ "aria-label": "search" }}
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>
						</form>
						<div>
							<Link to="/course/create">
								<Button variant="contained" color="secondary">
									New course
								</Button>
							</Link>
						</div>
					</div>
				</div>
				<div>
					{loading ? (
						<Spinner />
					) : courses.length === 0 ? (
						<h1>
							You don't have any courses! Go ahead and make one
						</h1>
					) : (
						courses.map((course) => (
							<div
								key={course.key}
								style={{
									margin: "20px 0",
									display: "flex",
									alignItems: "center",
									border: "1px solid #ccc",
									boxShadow:
										"2px 2px 10px 0px rgba(0,0,0,0.22)",
								}}
							>
								<div
									style={{
										marginRight: "30px",
										display: "flex",
										alignItems: "center",
										flex: 2,
									}}
								>
									<div>
										<img
											src={`/${course.thumbnail}`}
											width="250px"
										/>
									</div>
									<div style={{ marginLeft: "30px" }}>
										<p>{course.title}</p>
									</div>
								</div>

								<div style={{ flex: 3 }}>
									<Link
										to={`/course/${course.id}/manage`}
										style={{
											textDecoration: "none",
											color: "crimson",
										}}
									>
										Add New Sections
									</Link>
									<Link
										to={`/course/${course.id}/stats`}
										style={{
											textDecoration: "none",
											color: "crimson",
										}}
									>
										View Course Statistics
									</Link>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</Container>
	);
};

export default InstructorDashboard;
