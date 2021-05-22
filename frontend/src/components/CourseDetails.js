import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
	Button,
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	makeStyles,
	Container,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cart";
import { Link } from "react-router-dom";
import Content from "./Content";
import Instructor from "./Instructor";
import Review from "./Review";
import InstructorCourses from "./InstructorCourses";
import { addCourse } from "../actions/auth";
import MyRating from "./MyRating";
import Moment from "react-moment";
import Spinner from "./UI/Spinner";

const useStyles = makeStyles((theme) => ({
	media: {
		width: "100%",
		height: 200,
	},
	imageCard: {
		maxWidth: 300,
	},
	root: {
		paddingTop: 30,
		backgroundColor: "#1E1E1C",
		color: "white",
	},
	info: {
		paddingLeft: 50,
	},
	actions: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	content: {
		marginTop: "20px",
	},
}));

const CourseDetails = () => {
	const { title } = useParams();
	const [course, setCourse] = useState(null);
	const [rating, setRating] = useState(0);
	const [courseAdded, setCourseAdded] = useState(false);
	const [content, setContent] = useState([]);
	const classes = useStyles();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/courses/${title}`)
			.then((res) => {
				const totalRating =
					res.data.reviews.length > 0
						? res.data.reviews.reduce(
								(acc, curr) => acc.rating + curr.rating
						  )
						: 0;
				const averageRating =
					totalRating !== 0
						? totalRating / res.data.reviews.length
						: 0;
				setCourse(res.data);
				setRating(averageRating);
				let found;
				if (auth.isAuthenticated) {
					const courseId = res.data.id;
					axios
						.get(
							"http://localhost:5000/students/cart/course/" +
								courseId,
							{ withCredentials: true }
						)
						.then((res) => {
							if ("success" in res.data) {
								found = true;
							} else {
								found = false;
							}
							setCourseAdded(found);
						})
						.catch((err) => {
							found = false;
							setCourseAdded(found);
						});
				} else {
					found = cart.items.find((item) => item.id === res.data.id);
				}
				setCourseAdded(found);
				setContent((content) => [...content, ...res.data.sections]);
			})
			.catch((err) => console.log(err));
	}, [title]);

	const addToCartHandler = (item) => {
		dispatch(
			addToCart({
				id: item.id,
				title: item.title,
				price: item.price,
				thumbnail: item.thumbnail,
			})
		);
		setCourseAdded(true);
	};

	const addToStudentCartHandler = async (item) => {
		const data = {
			courseId: item.id,
		};
		const res = await axios.post(
			"http://localhost:5000/students/cart",
			data,
			{ withCredentials: true },
			{
				headers: { "content-type": "application/json" },
			}
		);
		if ("success" in res.data) {
			dispatch(addCourse());
			setCourseAdded(true);
		}
	};

	return (
		<React.Fragment>
			{course === null ? (
				<Spinner />
			) : (
				<>
					<Grid container spacing={5} className={classes.root}>
						<Grid item xs={12} sm={6} className={classes.info}>
							<CardContent>
								<Typography variant="h4" component="h1">
									{course.title}
								</Typography>
								<Typography>{course.description}</Typography>
								<Typography>
									<MyRating
										rating={rating}
										reviewsCount={course.reviews.length}
									/>
								</Typography>
								<div
									style={{
										display: "flex",
										alignItems: "center",
									}}
								>
									<p style={{ marginRight: "5px" }}>
										Created at:{" "}
									</p>
									<Moment format="DD-MM-YYYY">
										{course.createdAt}
									</Moment>
								</div>
							</CardContent>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}
							style={{
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Card
								className={classes.imageCard}
								style={{ width: "100%" }}
							>
								<CardMedia
									className={classes.media}
									image={`http://localhost:5000/${course.thumbnail}`}
									title="Course"
								/>
								<CardContent className={classes.actions}>
									{courseAdded ? (
										<Link
											to="/cart"
											style={{ textDecoration: "none" }}
										>
											<Button>Go To Cart</Button>
										</Link>
									) : (
										<Button
											onClick={() =>
												auth.isAuthenticated
													? addToStudentCartHandler(
															course
													  )
													: addToCartHandler(course)
											}
										>
											Add To Cart
										</Button>
									)}
									<Button>Buy Now</Button>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
					<Container style={{ marginBottom: "80px" }}>
						<Grid container className={classes.content} spacing={6}>
							<Grid item lg={6} sm={6} xs={12}>
								<Content course={course} />
							</Grid>
							<Grid item lg={6} sm={6} xs={12}>
								<Instructor instructor={course.instructor} />
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={12}>
								<Review reviews={course.reviews} />
							</Grid>
						</Grid>
						<Grid container xs={12}>
							<InstructorCourses
								instructorId={course.instructor.id}
								instructorName={course.instructor.username}
								limit={3}
							/>
						</Grid>
					</Container>
				</>
			)}
		</React.Fragment>
	);
};

export default CourseDetails;
