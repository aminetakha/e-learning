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
}));

const Course = () => {
	const { title } = useParams();
	const [course, setCourse] = useState(null);
	const [rating, setRating] = useState(0);
	const classes = useStyles();

	useEffect(() => {
		axios
			.get(`http://localhost:5000/courses/${title}`)
			.then((res) => {
				const totalRating = res.data[0].reviews.reduce(
					(acc, curr) => acc.rating + curr.rating
				);
				const averageRating = totalRating / res.data[0].reviews.length;
				setCourse(res.data[0]);
				setRating(averageRating);
			})
			.catch((err) => console.log(err));
	}, [title]);

	return (
		<React.Fragment>
			{course === null ? (
				"loading"
			) : (
				<Grid container spacing={5} className={classes.root}>
					<Grid item xs={8} className={classes.info}>
						<CardContent>
							<Typography variant="h4" component="h1">
								{course.title}
							</Typography>
							<Typography>{course.description}</Typography>
							<Typography>
								{`${rating} (${course.reviews.length} ratings)`}
							</Typography>
							<Typography>
								{`Created At: ${course.createdAt}`}
							</Typography>
						</CardContent>
					</Grid>
					<Grid item xs={4}>
						<Card className={classes.imageCard}>
							<CardMedia
								className={classes.media}
								image={`http://localhost:5000/${course.thumbnail}`}
								title="Course"
							/>
							<CardContent className={classes.actions}>
								<Button>Add To Cart</Button>
								<Button>Buy Now</Button>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			)}
		</React.Fragment>
	);
};

export default Course;
